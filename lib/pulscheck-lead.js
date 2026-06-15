const ALLOWED_ORIGINS = [
  "https://apexpartners.tech",
  "https://www.apexpartners.tech",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
];

function corsHeaders(origin) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatTimestamp(lang) {
  const locale = lang === "en" ? "en-GB" : "de-DE";
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(new Date());
}

function copy(lang) {
  if (lang === "en") {
    return {
      resultSubject: (score, label) => `Your AI Pulse Check result — ${score}/100 · ${label}`,
      resultTitle: "Your AI Pulse Check result",
      scoreLabel: "out of 100",
      dimensionsTitle: "Dimension scores",
      nextStepsTitle: "Recommendations",
      collaborationTitle: "How we work together",
      ctaLabel: "Discuss your results",
      footer: "Apex Partners · AI consulting for mid-market companies & scaleups",
      notifySubject: (email, score) => `Pulse Check lead · ${email} · ${score}/100`,
      notifyTitle: "New Pulse Check lead",
      notifyEmail: "Email",
      notifyScore: "Score",
      notifyLanguage: "Language",
      notifyTime: "Time",
      notifyStatus: "Status",
      notifyStatusValue: "Result email sent automatically",
      notifyReply: "Reply",
    };
  }

  return {
    resultSubject: (score, label) => `Ihr KI Puls-Check Ergebnis — ${score}/100 · ${label}`,
    resultTitle: "Ihr KI Puls-Check Ergebnis",
    scoreLabel: "von 100",
    dimensionsTitle: "Dimensionen",
    nextStepsTitle: "Handlungsempfehlungen",
    collaborationTitle: "Zusammenarbeit",
    ctaLabel: "Ergebnis besprechen",
    footer: "Apex Partners · KI-Beratung für Mittelstand & Scaleups",
    notifySubject: (email, score) => `Puls-Check Lead · ${email} · ${score}/100`,
    notifyTitle: "Neuer Puls-Check Lead",
    notifyEmail: "E-Mail",
    notifyScore: "Score",
    notifyLanguage: "Sprache",
    notifyTime: "Zeit",
    notifyStatus: "Status",
    notifyStatusValue: "Ergebnis-Mail automatisch versendet",
    notifyReply: "Antworten",
  };
}

function buildResultHtml(data, siteUrl, lang) {
  const t = copy(lang);
  const dimensions = Array.isArray(data.dimensions) ? data.dimensions : [];
  const nextSteps = Array.isArray(data.nextSteps) ? data.nextSteps : [];
  const collaborationSteps = Array.isArray(data.collaborationSteps) ? data.collaborationSteps : [];
  const score = Number(data.score);
  const label = escapeHtml(data.classification);
  const summary = escapeHtml(data.summary);
  const collaboration = escapeHtml(data.collaboration || "");
  const contactUrl = `${siteUrl}/#kontakt`;
  const logoUrl = `${siteUrl}/assets/brand/Apex%20Partners%20-%20Logo%20White.svg`;

  const dimRows = dimensions
    .map(function (d) {
      const name = escapeHtml(d.name);
      const pct = Number(d.pct) || 0;
      return (
        "<tr>" +
        `<td style="padding:10px 0;border-bottom:1px solid #e8edf2;color:#0a1f33;font-size:14px;">${name}</td>` +
        `<td style="padding:10px 0;border-bottom:1px solid #e8edf2;color:#5a7184;font-size:14px;text-align:right;white-space:nowrap;">${escapeHtml(d.score)} / ${escapeHtml(d.max)}</td>` +
        `<td style="padding:10px 0 10px 16px;border-bottom:1px solid #e8edf2;width:120px;">` +
        `<div style="height:6px;background:#e8edf2;border-radius:99px;overflow:hidden;"><div style="height:6px;width:${pct}%;background:#0a1f33;border-radius:99px;"></div></div>` +
        "</td></tr>"
      );
    })
    .join("");

  const steps = nextSteps
    .map(function (step, index) {
      return (
        `<tr><td style="padding:0 0 16px;vertical-align:top;color:#0a1f33;font-size:14px;line-height:1.55;">` +
        `<strong style="display:block;margin-bottom:4px;">${index + 1}. ${escapeHtml(step.title)}</strong>` +
        `${escapeHtml(step.body)}` +
        "</td></tr>"
      );
    })
    .join("");

  const collabRows = collaborationSteps
    .map(function (step, index) {
      return (
        `<tr><td style="padding:0 0 16px;vertical-align:top;color:#0a1f33;font-size:14px;line-height:1.55;">` +
        `<strong style="display:block;margin-bottom:4px;">${index + 1}. ${escapeHtml(step.title)}</strong>` +
        `${escapeHtml(step.body)}` +
        "</td></tr>"
      );
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="${lang}">
  <body style="margin:0;padding:0;background:#f4f7fa;font-family:Arial,Helvetica,sans-serif;color:#0a1f33;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fa;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #e8edf2;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 12px;background:#0a1f33;color:#ffffff;">
                <img src="${logoUrl}" alt="Apex Partners" width="160" height="25" style="display:block;margin:0 0 14px;border:0;max-width:160px;height:auto;" />
                <div style="font-size:24px;line-height:1.3;font-weight:700;">${t.resultTitle}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
                  <tr>
                    <td align="center" style="font-size:48px;line-height:1;font-weight:700;color:#0a1f33;">${score}</td>
                  </tr>
                  <tr>
                    <td align="center" style="font-size:13px;color:#5a7184;padding-top:6px;">${t.scoreLabel}</td>
                  </tr>
                  <tr>
                    <td align="center" style="font-size:22px;line-height:1.35;font-weight:700;padding-top:18px;color:#0a1f33;">${label}</td>
                  </tr>
                  <tr>
                    <td align="center" style="font-size:15px;line-height:1.65;color:#5a7184;padding-top:10px;">${summary}</td>
                  </tr>
                </table>
                <div style="font-size:16px;font-weight:700;margin-bottom:12px;color:#0a1f33;">${t.dimensionsTitle}</div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${dimRows}</table>
                ${
                  steps
                    ? `<div style="font-size:16px;font-weight:700;margin:28px 0 12px;color:#0a1f33;">${t.nextStepsTitle}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${steps}</table>`
                    : ""
                }
                ${
                  collabRows
                    ? `<div style="font-size:16px;font-weight:700;margin:28px 0 12px;color:#0a1f33;">${t.collaborationTitle}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${collabRows}</table>`
                    : collaboration
                      ? `<div style="font-size:16px;font-weight:700;margin:28px 0 12px;color:#0a1f33;">${t.collaborationTitle}</div><div style="font-size:15px;line-height:1.65;color:#5a7184;">${collaboration}</div>`
                      : ""
                }
                <div style="text-align:center;margin-top:28px;">
                  <a href="${contactUrl}" style="display:inline-block;background:#0a1f33;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:10px;font-size:15px;font-weight:700;">${t.ctaLabel}</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 24px;border-top:1px solid #e8edf2;font-size:12px;line-height:1.5;color:#5a7184;">${t.footer}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildResultText(data, siteUrl, lang) {
  const t = copy(lang);
  const dimensions = Array.isArray(data.dimensions) ? data.dimensions : [];
  const nextSteps = Array.isArray(data.nextSteps) ? data.nextSteps : [];
  const collaborationSteps = Array.isArray(data.collaborationSteps) ? data.collaborationSteps : [];
  const score = Number(data.score);
  const contactUrl = `${siteUrl}/#kontakt`;

  const lines = [
    t.resultTitle,
    "",
    `${score} ${t.scoreLabel}`,
    data.classification,
    data.summary,
    "",
    t.dimensionsTitle,
    "─────────────────────",
  ];

  dimensions.forEach(function (d) {
    lines.push(`${d.name}: ${d.score} / ${d.max}`);
  });

  if (nextSteps.length) {
    lines.push("");
    lines.push(t.nextStepsTitle);
    lines.push("─────────────────────");
    nextSteps.forEach(function (step, index) {
      lines.push(`${index + 1}. ${step.title}`);
      lines.push(step.body);
      lines.push("");
    });
  }

  if (collaborationSteps.length) {
    lines.push(t.collaborationTitle);
    lines.push("─────────────────────");
    collaborationSteps.forEach(function (step, index) {
      lines.push(`${index + 1}. ${step.title}`);
      lines.push(step.body);
      lines.push("");
    });
  } else if (data.collaboration) {
    lines.push(t.collaborationTitle);
    lines.push("─────────────────────");
    lines.push(data.collaboration);
    lines.push("");
  }

  lines.push(`${t.ctaLabel}: ${contactUrl}`);
  lines.push("");
  lines.push(t.footer);

  return lines.join("\n");
}

function buildNotifyText(data, lang) {
  const t = copy(lang);
  const timestamp = formatTimestamp(lang);
  return [
    t.notifyTitle,
    "─────────────────────",
    `${t.notifyEmail}:    ${data.email}`,
    `${t.notifyScore}:    ${data.score}/100 — ${data.classification}`,
    `${t.notifyLanguage}:   ${lang.toUpperCase()}`,
    `${t.notifyTime}:      ${timestamp}`,
    `${t.notifyStatus}:  ${t.notifyStatusValue}`,
    `${t.notifyReply}: ${data.email}`,
  ].join("\n");
}

async function sendEmail(env, payload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`resend:${response.status}:${detail}`);
  }
}

export async function handlePulscheckLead(request, env) {
  const origin = request.headers.get("Origin") || "";

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(origin),
    });
  }

  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "method-not-allowed" }, 405, origin);
  }

  let body;
  try {
    body = await request.json();
  } catch (_) {
    return jsonResponse({ ok: false, error: "invalid-json" }, 400, origin);
  }

  if (body.honeypot) {
    return jsonResponse({ ok: true }, 200, origin);
  }

  const email = String(body.email || "").trim().toLowerCase();
  const score = Number(body.score);
  const classification = String(body.classification || "").trim();
  const summary = String(body.summary || "").trim();
  const language = body.language === "en" ? "en" : "de";

  if (!isValidEmail(email)) {
    return jsonResponse({ ok: false, error: "invalid-email" }, 400, origin);
  }
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    return jsonResponse({ ok: false, error: "invalid-score" }, 400, origin);
  }
  if (!classification || !summary) {
    return jsonResponse({ ok: false, error: "invalid-payload" }, 400, origin);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse({ ok: false, error: "missing-config" }, 500, origin);
  }

  const fromEmail = env.PULSCHECK_FROM_EMAIL || "Apex Partners <pulscheck@apexpartners.tech>";
  const notifyEmail = env.PULSCHECK_NOTIFY_EMAIL || "info@apexpartners.tech";
  const siteUrl = (env.PULSCHECK_SITE_URL || "https://www.apexpartners.tech").replace(/\/$/, "");
  const t = copy(language);

  const data = {
    email,
    score,
    classification,
    summary,
    dimensions: body.dimensions,
    nextSteps: body.nextSteps,
    collaborationSteps: body.collaborationSteps,
    collaboration: String(body.collaboration || "").trim(),
  };

  try {
    await sendEmail(env, {
      from: fromEmail,
      to: [email],
      reply_to: notifyEmail,
      subject: t.resultSubject(score, classification),
      html: buildResultHtml(data, siteUrl, language),
      text: buildResultText(data, siteUrl, language),
    });
  } catch (_) {
    return jsonResponse({ ok: false, error: "result-email-failed" }, 502, origin);
  }

  try {
    await sendEmail(env, {
      from: fromEmail,
      to: [notifyEmail],
      reply_to: email,
      subject: t.notifySubject(email, score),
      text: buildNotifyText(data, language),
    });
  } catch (_) {
    // User already received their result email.
  }

  return jsonResponse({ ok: true }, 200, origin);
}
