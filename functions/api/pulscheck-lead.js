import { handlePulscheckLead } from "../../lib/pulscheck-lead.js";

export async function onRequestOptions(context) {
  return handlePulscheckLead(context.request, context.env);
}

export async function onRequestPost(context) {
  return handlePulscheckLead(context.request, context.env);
}
