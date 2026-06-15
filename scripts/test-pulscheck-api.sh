#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:8788}"
ORIGIN="${2:-http://localhost:8080}"
API="${BASE_URL%/}/api/pulscheck-lead"

pass=0
fail=0

assert_status() {
  local name="$1"
  local expected="$2"
  local method="$3"
  local body="${4:-}"
  local actual

  if [[ -n "$body" ]]; then
    actual=$(curl -s -o /tmp/pulscheck-test-body.txt -w "%{http_code}" -X "$method" "$API" \
      -H "Content-Type: application/json" \
      -H "Origin: $ORIGIN" \
      -d "$body")
  else
    actual=$(curl -s -o /tmp/pulscheck-test-body.txt -w "%{http_code}" -X "$method" "$API" \
      -H "Origin: $ORIGIN")
  fi

  if [[ "$actual" == "$expected" ]]; then
    echo "PASS  $name ($actual)"
    pass=$((pass + 1))
  else
    echo "FAIL  $name (expected $expected, got $actual)"
    echo "      $(cat /tmp/pulscheck-test-body.txt)"
    fail=$((fail + 1))
  fi
}

assert_json_error() {
  local name="$1"
  local expected_error="$2"
  local body="$3"
  local actual

  actual=$(curl -s -o /tmp/pulscheck-test-body.txt -w "%{http_code}" -X POST "$API" \
    -H "Content-Type: application/json" \
    -H "Origin: $ORIGIN" \
    -d "$body")

  if [[ "$actual" != "400" ]]; then
    echo "FAIL  $name (expected HTTP 400, got $actual)"
    echo "      $(cat /tmp/pulscheck-test-body.txt)"
    fail=$((fail + 1))
    return
  fi

  if grep -q "\"error\":\"$expected_error\"" /tmp/pulscheck-test-body.txt; then
    echo "PASS  $name ($expected_error)"
    pass=$((pass + 1))
  else
    echo "FAIL  $name (expected error $expected_error)"
    echo "      $(cat /tmp/pulscheck-test-body.txt)"
    fail=$((fail + 1))
  fi
}

echo "Testing $API"
echo "---"

assert_status "OPTIONS preflight" "204" "OPTIONS"
assert_json_error "invalid email" "invalid-email" \
  '{"email":"not-an-email","score":50,"classification":"Test","summary":"Summary"}'
assert_json_error "invalid score" "invalid-score" \
  '{"email":"test@example.com","score":150,"classification":"Test","summary":"Summary"}'
assert_json_error "missing classification" "invalid-payload" \
  '{"email":"test@example.com","score":50,"classification":"","summary":"Summary"}'

actual=$(curl -s -o /tmp/pulscheck-test-body.txt -w "%{http_code}" -X POST "$API" \
  -H "Content-Type: application/json" \
  -H "Origin: $ORIGIN" \
  -d '{"honeypot":"bot","email":"test@example.com","score":50,"classification":"Test","summary":"Summary"}')

if [[ "$actual" == "200" ]] && grep -q '"ok":true' /tmp/pulscheck-test-body.txt; then
  echo "PASS  honeypot silently accepted"
  pass=$((pass + 1))
else
  echo "FAIL  honeypot (expected 200 ok:true, got $actual)"
  echo "      $(cat /tmp/pulscheck-test-body.txt)"
  fail=$((fail + 1))
fi

actual=$(curl -s -o /tmp/pulscheck-test-body.txt -w "%{http_code}" -X POST "$API" \
  -H "Content-Type: application/json" \
  -H "Origin: $ORIGIN" \
  -d '{"email":"test@example.com","score":50,"classification":"Test","summary":"Summary","language":"de"}')

if [[ "$actual" == "500" ]] && grep -q '"error":"missing-config"' /tmp/pulscheck-test-body.txt; then
  echo "PASS  valid payload without RESEND_API_KEY → missing-config"
  pass=$((pass + 1))
elif [[ "$actual" == "200" ]] && grep -q '"ok":true' /tmp/pulscheck-test-body.txt; then
  echo "PASS  valid payload with RESEND_API_KEY → mail sent"
  pass=$((pass + 1))
else
  echo "FAIL  valid payload (expected missing-config or ok:true, got $actual)"
  echo "      $(cat /tmp/pulscheck-test-body.txt)"
  fail=$((fail + 1))
fi

echo "---"
echo "$pass passed, $fail failed"

if [[ "$fail" -gt 0 ]]; then
  exit 1
fi
