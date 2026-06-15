import { handlePulscheckLead } from "../lib/pulscheck-lead.js";

export default async function handler(req, res) {
  const origin = req.headers.origin || "";

  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Origin",
      origin && [
        "https://apexpartners.tech",
        "https://www.apexpartners.tech",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
      ].includes(origin)
        ? origin
        : "https://apexpartners.tech",
    );
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).end();
    return;
  }

  const request = new Request(`https://${req.headers.host || "localhost"}${req.url || "/api/pulscheck-lead"}`, {
    method: req.method,
    headers: req.headers,
    body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
  });

  const response = await handlePulscheckLead(request, process.env);

  res.status(response.status);
  response.headers.forEach(function (value, key) {
    res.setHeader(key, value);
  });
  res.send(await response.text());
}
