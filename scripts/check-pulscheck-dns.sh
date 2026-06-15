#!/usr/bin/env bash
# Verify SPF, DKIM, and DMARC for Puls-Check email deliverability (Resend).
set -euo pipefail

DOMAIN="${1:-apexpartners.tech}"
pass=0
fail=0
warn=0

check() {
  local name="$1"
  local ok="$2"
  local detail="$3"
  if [[ "$ok" == "pass" ]]; then
    echo "PASS  $name — $detail"
    pass=$((pass + 1))
  elif [[ "$ok" == "warn" ]]; then
    echo "WARN  $name — $detail"
    warn=$((warn + 1))
  else
    echo "FAIL  $name — $detail"
    fail=$((fail + 1))
  fi
}

txt_records() {
  dig +short TXT "$1" 2>/dev/null | tr -d '"' | paste -sd " " -
}

echo "DNS deliverability check for $DOMAIN"
echo "---"

dmarc=$(txt_records "_dmarc.$DOMAIN")
if [[ -n "$dmarc" ]] && echo "$dmarc" | grep -qi "v=DMARC1"; then
  if echo "$dmarc" | grep -qi "rua="; then
    check "DMARC" "pass" "$dmarc"
  else
    check "DMARC" "warn" "record exists but no rua= (add: v=DMARC1; p=none; rua=mailto:info@$DOMAIN;)"
  fi
else
  check "DMARC" "fail" "missing _dmarc TXT (add: v=DMARC1; p=none; rua=mailto:info@$DOMAIN;)"
fi

spf=$(txt_records "$DOMAIN")
if echo "$spf" | grep -qi "v=spf1"; then
  if echo "$spf" | grep -qi "amazonses.com"; then
    check "SPF (root)" "pass" "$spf"
  else
    check "SPF (root)" "warn" "missing include:amazonses.com for Resend (merge with IONOS: v=spf1 include:_spf-eu.ionos.com include:amazonses.com ~all)"
  fi
else
  check "SPF (root)" "fail" "no SPF TXT on $DOMAIN"
fi

dkim=$(txt_records "resend._domainkey.$DOMAIN")
if [[ -n "$dkim" ]] && echo "$dkim" | grep -q "p="; then
  check "DKIM (resend)" "pass" "resend._domainkey present"
else
  check "DKIM (resend)" "fail" "missing resend._domainkey TXT (copy from Resend → Domains)"
fi

echo "---"
echo "$pass passed, $warn warnings, $fail failed"
echo ""
echo "Also verify in Resend Dashboard → Domains → $DOMAIN → Verified"
echo "External check: https://dns.email/?domain=$DOMAIN"
echo "Send test: https://www.mail-tester.com (Puls-Check → paste test address, target score ≥ 8/10)"

if [[ "$fail" -gt 0 ]]; then
  exit 1
fi
