# KI Puls-Check Lead Magnet — Go-Live (Vercel + Resend)

Anleitung für den optionalen E-Mail-Versand nach dem Puls-Check: **Vercel** hostet Website und API, **Resend** verschickt die Mails.

## Architektur

```
Browser (Puls-Check abgeschlossen)
  → POST /api/pulscheck-lead          (Vercel Serverless Function)
  → Resend API                        (Ergebnis-Mail an Nutzer)
  → Resend API                        (Benachrichtigung an info@apexpartners.tech)
```

| Komponente | Rolle |
|------------|--------|
| **Vercel** | Statische Website (`index.html`, Assets) + API-Route `/api/pulscheck-lead` |
| **Resend** | Transaktionaler E-Mail-Versand (HTML-Ergebnis + interne Lead-Mail) |
| **Cloudflare** | Nicht nötig für dieses Feature |

Frontend-Endpunkt (bereits konfiguriert in `index.html`):

```js
window.APEX_PULSCHECK_LEAD = { endpoint: "/api/pulscheck-lead" };
```

---

## 1. Resend einrichten

1. Account auf [resend.com](https://resend.com) anlegen.
2. Domain **`apexpartners.tech`** hinzufügen und verifizieren:
   - Resend → Domains → Add domain
   - DNS-Einträge setzen (SPF, DKIM; DMARC empfohlen — siehe Abschnitt **Zustellbarkeit** unten)
   - Status **Verified** abwarten
3. API Key erzeugen:
   - Resend → API Keys → Create API Key
   - Berechtigung: **Sending access** (für den Start ausreichend)
   - Key kopieren (`re_...`) — wird nur einmal angezeigt
4. Absender prüfen:
   - Standard: `Apex Partners <pulscheck@apexpartners.tech>` (transaktional, Reply-To bleibt `info@`)
   - Domain muss verifiziert sein, sonst schlagen Sends fehl

---

## 2. API Key in Vercel hinterlegen

**Nicht** ins Git-Repo committen. **Nicht** in `wrangler.toml` oder öffentliche Config-Dateien.

### Production & Preview

1. [vercel.com](https://vercel.com) → dein Projekt (apex-website / apexraw)
2. **Settings** → **Environments** (Environment Variables)
3. Variable anlegen:

| Name | Wert | Environments |
|------|------|--------------|
| `RESEND_API_KEY` | `re_...` | Production, Preview |

Optional (haben sinnvolle Defaults im Code):

| Name | Default |
|------|---------|
| `PULSCHECK_FROM_EMAIL` | `Apex Partners <pulscheck@apexpartners.tech>` |
| `PULSCHECK_NOTIFY_EMAIL` | `info@apexpartners.tech` |
| `PULSCHECK_SITE_URL` | `https://www.apexpartners.tech` |

4. **Save** → danach **Redeploy** auslösen (Deployments → … → Redeploy), damit die Variable aktiv ist.

### Lokal (optional)

Nur nötig für `npx vercel dev`. Für Production reicht der Key in Vercel.

`.env.local` im **Projektroot** (nicht unter `docs/`), siehe [`.env.local.example`](../.env.local.example):

```bash
cp .env.local.example .env.local
# oder: npx vercel env pull
```

---

## 3. API-Route auf Vercel

Die Serverless Function liegt unter [`api/pulscheck-lead.js`](../api/pulscheck-lead.js) (gemeinsame Logik in [`lib/pulscheck-lead.js`](../lib/pulscheck-lead.js)):

```
api/pulscheck-lead.js   →   POST /api/pulscheck-lead
                            OPTIONS /api/pulscheck-lead  (CORS Preflight)
```

Nach Push auf `main` deployt Vercel automatisch. Danach prüfen:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X OPTIONS \
  https://www.apexpartners.tech/api/pulscheck-lead \
  -H "Origin: https://www.apexpartners.tech"
# Erwartung: 204
```

**404?** → API-Datei fehlt unter `api/` oder Deployment noch nicht durchgelaufen.

**500 + `"error":"missing-config"`?** → `RESEND_API_KEY` in Vercel setzen und redeployen.

---

## 4. Deploy

1. Änderungen auf den mit Vercel verbundenen Branch pushen (z. B. `main`).
2. Vercel baut automatisch:
   - statische Dateien aus dem Repo-Root
   - Serverless Functions aus `api/`
3. Deployment-Log prüfen: keine Build-Fehler in `api/`.

Manuelles Deploy (optional):

```bash
npx vercel --prod
```

---

## 5. Lokal testen

```bash
# .env.local mit RESEND_API_KEY anlegen
npx vercel dev
```

Standard-URL: `http://localhost:3000`

1. Puls-Check durchspielen
2. E-Mail im Ergebnis-Formular absenden
3. Automatisierte API-Tests:

```bash
./scripts/test-pulscheck-api.sh http://localhost:3000 http://localhost:3000
```

Production-Test:

```bash
./scripts/test-pulscheck-api.sh https://www.apexpartners.tech https://www.apexpartners.tech
```

---

## 6. End-to-End-Checkliste

- [ ] Domain in Resend verifiziert
- [ ] `RESEND_API_KEY` in Vercel (Production) gesetzt + redeployed
- [ ] `api/pulscheck-lead.js` deployed (kein 404)
- [ ] OPTIONS `/api/pulscheck-lead` → `204`
- [ ] Ungültige E-Mail → `400` + `invalid-email`
- [ ] Honeypot befüllt → `200` + `{ "ok": true }` (keine Mail)
- [ ] Gültiger Submit → Nutzer erhält Ergebnis-Mail (HTML + Plain-Text)
- [ ] `info@apexpartners.tech` erhält Lead-Benachrichtigung; Reply-To = Lead
- [ ] Englische Site → englische Mail
- [ ] Datenschutz-Link im Formular → `#datenschutz` im Footer

---

## 7. Marketing

- Direktlink: `https://apexpartners.tech/#pulscheck`
- Ablauf: Quiz → Ergebnis on-screen → optional E-Mail → automatische Auswertung + interne Benachrichtigung
- Follow-up: auf die interne Mail antworten oder Lead manuell kontaktieren

---

## Troubleshooting

| Symptom | Ursache | Fix |
|---------|---------|-----|
| `404` auf `/api/pulscheck-lead` | Keine Vercel Function unter `api/` | Route anlegen / redeployen |
| `missing-config` | Kein `RESEND_API_KEY` | In Vercel Env Vars setzen + redeploy |
| `result-email-failed` | Resend lehnt ab | Domain/Absender in Resend prüfen, Resend-Logs checken |
| Mail im Spam | DNS / Content / Reputation | Abschnitt **Zustellbarkeit** unten |
| CORS-Fehler lokal | Origin nicht erlaubt | `localhost:3000` in ALLOWED_ORIGINS der API ergänzen |

---

## Zustellbarkeit (Mails landen im Spam)

### Schnell-Check (lokal)

```bash
./scripts/check-pulscheck-dns.sh apexpartners.tech
```

Ziel: **0 FAIL**, möglichst keine WARN. Extern zusätzlich: [dns.email](https://dns.email/?domain=apexpartners.tech).

### DNS-Einträge (IONOS / Domain-Registrar)

Resend richtet **DMARC nicht automatisch** ein. Aktuell bei `apexpartners.tech`:

| Record | Status | Empfohlener Wert |
|--------|--------|------------------|
| `resend._domainkey` (DKIM) | sollte vorhanden sein | aus Resend → Domains kopieren |
| SPF auf Root | oft nur IONOS | `v=spf1 include:_spf-eu.ionos.com include:amazonses.com ~all` |
| `_dmarc` (TXT) | oft ohne Reports | `v=DMARC1; p=none; rua=mailto:info@apexpartners.tech;` |

- `p=none` = nur Monitoring, blockiert nichts (sicher für den Start)
- Nach 1–2 Wochen stabiler Zustellung optional `p=quarantine`

DNS-Änderungen brauchen bis zu 48 h Propagation. Resend → Domains muss **Verified** zeigen.

### Code (bereits umgesetzt)

Die Ergebnis-Mail wird als **HTML + Plain-Text** versendet (`buildResultText` in [`lib/pulscheck-lead.js`](../lib/pulscheck-lead.js)). Resend warnt sonst unter Deliverability Insights mit „Missing plain text versions“.

Defaults im Code:

- Absender: `pulscheck@apexpartners.tech` (Reply-To: `info@apexpartners.tech`)
- Links in der Mail: `https://www.apexpartners.tech/#kontakt`

In **Vercel → Environment Variables** dieselben Werte setzen (oder weglassen für Code-Defaults), dann **Redeploy**.

### Resend Deliverability Insights

1. Resend Dashboard → **Emails** → gesendete Puls-Check-Mail öffnen
2. **Deliverability Insights** prüfen (DMARC, Plain-Text, Link-Domain)
3. Warnungen der Reihe nach beheben

### mail-tester.com

1. Test-Adresse auf [mail-tester.com](https://www.mail-tester.com) holen
2. Puls-Check auf Production durchspielen, Mail an diese Adresse senden
3. Ziel: **Score ≥ 8/10**
4. Fehlende Punkte (meist DMARC oder SPF) im Report abarbeiten

### Wenn es danach noch im Spam landet

- **Google Postmaster Tools** für `apexpartners.tech` einrichten (Domain-Reputation bei Gmail)
- Subdomain `mail.apexpartners.tech` in Resend verifizieren und von dort senden
- Domain Warm-up: erst wenige Mails/Tag, dann steigern
- Gmail-Spam-Banner lesen („ähnlich wie früher als Spam“ → Reputation; „gefährlich“ → Links/Content prüfen)
- Empfänger bitten, „Kein Spam“ zu markieren und Absender zu kontaktieren
