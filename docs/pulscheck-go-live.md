# KI Puls-Check Lead Magnet — Go-Live

This guide covers Resend, Cloudflare Pages secrets, deployment verification, and testing for `/api/pulscheck-lead`.

## 1. Resend setup

1. Create an account at [resend.com](https://resend.com).
2. Add and verify domain **`apexpartners.tech`**:
   - Resend → Domains → Add domain
   - Add the DNS records Resend shows (SPF, DKIM; add DMARC if recommended)
   - Wait until status is **Verified**
3. Create an API key:
   - Resend → API Keys → Create API Key
   - Scope: **Sending access** (or full access for initial setup)
   - Copy the key (`re_...`) — it is shown only once
4. Confirm sender address:
   - Default in [`wrangler.toml`](../wrangler.toml): `Apex Partners <kontakt@apexpartners.tech>`
   - The domain must be verified before mail sends successfully

## 2. Cloudflare Pages secrets

In **Cloudflare Dashboard → Workers & Pages → apexraw (or your project) → Settings → Environment variables**:

| Variable | Production | Preview | Encrypted |
|----------|------------|---------|-----------|
| `RESEND_API_KEY` | `re_...` | same or separate | Yes |

Optional overrides (already set in `wrangler.toml` `[vars]`):

| Variable | Default |
|----------|---------|
| `PULSCHECK_FROM_EMAIL` | `Apex Partners <kontakt@apexpartners.tech>` |
| `PULSCHECK_NOTIFY_EMAIL` | `kontakt@apexpartners.tech` |
| `PULSCHECK_SITE_URL` | `https://apexpartners.tech` |

CLI alternative (after `npx wrangler login`):

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name apexraw
```

## 3. Deploy and verify Functions

The frontend and API live in the same repo:

- Static site: repo root (`index.html`, assets, …)
- Pages Function: [`functions/api/pulscheck-lead.js`](../functions/api/pulscheck-lead.js) → `POST /api/pulscheck-lead`

After push to the production branch:

1. Open the deployment in Cloudflare → **View details**
2. Confirm build log contains **Compiled Worker successfully** and **Uploading Functions**
3. If you see `No routes found when building Functions directory`, check that handlers use `export async function onRequestPost` (not bare `function`)

Quick production check:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X OPTIONS \
  https://www.apexpartners.tech/api/pulscheck-lead \
  -H "Origin: https://www.apexpartners.tech"
# Expected: 204 (not 404)
```

**Current status:** If the API returns `404 NOT_FOUND`, Functions are not deployed yet — redeploy after confirming the `functions/` folder is in the connected branch and project root matches the repo root.

## 4. Local development

```bash
cp .dev.vars.example .dev.vars
# Edit .dev.vars and set RESEND_API_KEY

npx wrangler pages dev . --port 8788
```

Open `http://localhost:8788`, complete the Puls-Check, submit an email.

Run automated validation tests:

```bash
./scripts/test-pulscheck-api.sh http://localhost:8788
```

## 5. End-to-end test checklist

- [ ] OPTIONS `/api/pulscheck-lead` → `204`
- [ ] Invalid email → `400` + `invalid-email`
- [ ] Invalid score → `400` + `invalid-score`
- [ ] Honeypot filled → `200` + `{ "ok": true }` (no mail sent)
- [ ] Valid payload + `RESEND_API_KEY` → user receives HTML result mail
- [ ] Valid payload → `kontakt@apexpartners.tech` receives text notification; Reply-To is the lead
- [ ] Switch site to EN → English subject and body in result mail
- [ ] Lead form shows privacy link → `#datenschutz` in footer

## 6. Marketing use

- Direct link: `https://apexpartners.tech/#pulscheck`
- Flow: quiz → on-screen result → optional email capture → automated result mail + internal lead notification
- Follow-up: reply to the internal notification or contact the lead manually
