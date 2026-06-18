74 percent of companies plan to deploy autonomous AI agents within two years. But only 21 percent today have a mature model for governing them. This gap — high ambition with minimal governance — is one of the riskiest developments of the year. And it meets a technology that, according to Stanford, is least reliable precisely where it is meant to act independently.

## The Finding

After years of simple chatbots, agents are arriving that set goals, reason through multi-step tasks, use tools and interfaces, and coordinate work with people or other agents. According to Deloitte, 23 percent of companies use agentic AI at least moderately today; in two years, 74 percent plan to.

But ambition and maturity diverge sharply. The Stanford AI Index 2026 makes the gap measurable: real deployment remains in single-digit percentages across nearly all business functions; on real computer tasks, agents succeed around two thirds of the time and fail on about every third attempt; and documented AI incidents rose to 362, from 233 the prior year. Research also warns against false assumptions about autonomy: the paper "Levels of Autonomy for AI Agents" (2025) describes five autonomy levels and shows that more autonomy does not simply mean "better" — it forces trade-offs between benefit, efficiency, accountability, and cost. A prominent counterposition (Mitchell et al., "Fully Autonomous AI Agents Should Not Be Developed," 2025) argues that fully autonomous agents without human control should not be developed at all. Together, this means autonomy is a design decision with consequences, not an automatic default.

## Why It Stalls

The decisive difference from classical AI: agents do not give recommendations that a human reviews and executes. They act directly — they make purchases, send communications, change systems. With a technology that misses roughly every third time, that is a delicate combination.

That is why governance is a new discipline. A central research work (Chan et al., "Visibility into AI Agents," 2024) names three visibility mechanisms without which accountability becomes impossible: clear agent identifiers, real-time monitoring, and complete activity logs. This is exactly where the gap lies: only about one in five companies has a mature governance model for agents. A practical consequence is what research calls the "problem of many hands": when many agents collaborate, responsibility spreads across so many decision points that it can hardly be assigned to a single entity. Without clear identity, logging, and ownership, an efficiency gain quickly becomes loss of control.

## What Leaders Do Differently

The use cases are real and wide-ranging. A financial services firm has agents capture meeting actions and follow up; an airline handles standard processes such as rebookings; a manufacturer balances trade-offs like cost and time-to-market in product development; in the public sector, agents bridge staffing gaps. 85 percent of companies want to adapt agents to their needs.

McKinsey illustrates what good control looks like technically with self-healing systems: agents act autonomously but within fixed guardrails and only for predefined scenarios; as soon as a genuinely new situation arises, a human takes over. This principle — automation for the known, human judgment for the unknown — aligns with research autonomy levels. Regulation now offers concrete templates: Singapore's "Model AI Governance Framework for Agentic AI" (January 2026) is considered the world's first national framework specifically for agentic systems and names four dimensions — risk limitation, human accountability, technical controls, and end-user responsibility — and makes clear that organizations remain legally responsible for their agents' behavior. In the United States, the NIST AI Agent Standards Initiative (February 2026) addresses interoperability, security, and testing and evaluation; the OWASP Top 10 for Agentic Applications provide a practical risk checklist. A practitioner in the Deloitte report captures the human side succinctly: they thought they were automating jobs, but in fact they gave employees a force multiplier — initially more work, not less, because people monitor agents and intervene at human-in-the-loop points.

## What This Means for Scaleups and Mid-Market

The temptation to roll out agents quickly and broadly is strong — and dangerous. Those who scale without guardrails risk faulty purchases, unauthorized communication, and uncontrolled system changes. Waiting is equally wrong: with expected tripling of adoption, hesitation risks falling behind. The way out is a third path: start under control. For resource-constrained organizations, that is good news — governance does not need to be perfect on day one; it must grow with use. The frameworks cited (Singapore, NIST, OWASP) provide free, immediately usable templates.

## Action Items for Practice

1. **Start with low-risk use cases.** Begin where a mistake has manageable consequences — internal assistance, research, routine processing.
2. **Choose the autonomy level deliberately.** Decide per use case how much independence the agent truly needs — more is not automatically better.
3. **Build visibility from the start.** Ensure clear agent identifiers, real-time monitoring, and complete activity logs.
4. **Assign responsibility clearly.** Avoid the problem of many hands by making every agent action traceable to a responsible person or role.
5. **Automate only for predefined scenarios.** Let agents handle the known independently, but route every new or unclear situation to a human.
6. **Use a framework as a template.** Orient to Singapore's agentic AI framework, the NIST initiative, or the OWASP Top 10 instead of starting from zero.
7. **Set up cross-functional governance.** Bring IT, legal, compliance, and business units together to set rules and manage escalations.
8. **Capture and learn from incidents systematically.** Maintain an incident register and sharpen guardrails regularly.

## Conclusion

AI agents are the next big step: instead of only making suggestions, they complete tasks themselves. That is powerful — and precisely why it is dangerous when no one has set clear rules. The technology is still unreliable enough to cause real harm without oversight, and incidents are rising. Research agrees that more autonomy is not an end in itself but a trade-off, and that accountability requires three things: knowing which agent is acting, what it is doing, and who is responsible. The right approach is neither blind launch nor fearful waiting but a third path: start small, draw clear boundaries, make every action traceable, and let humans decide whenever a situation is new or critical. Those who build rules before broad rollout — along existing frameworks — can ultimately automate more boldly than someone who starts without guardrails.

## At a Glance

- 74% plan to deploy autonomous agents within two years; 23% today (Deloitte).
- Only 21% have a mature governance model for agents (Deloitte).
- Agents solve roughly two thirds of real computer tasks but fail on about every third attempt; AI incidents: 362 vs. 233 (Stanford).
- Accountability requires three visibility mechanisms: agent IDs, real-time monitoring, activity logs (Chan et al.).
- Concrete templates: Singapore Agentic AI Framework (Jan. 2026), NIST AI Agent Standards (Feb. 2026), OWASP Top 10 for Agentic Applications.

## Sources

- Deloitte, "State of AI in the Enterprise — The untapped edge" (January 2026), sections "Agentic AI" (Fig. 7) and "Managing the risks of agentic AI."
- Stanford HAI, "AI Index Report 2026" (April 2026), Top Takeaways 4, 6, and 9.
- "Levels of Autonomy for AI Agents" (arXiv:2506.12469, 2025); Mitchell et al., "Fully Autonomous AI Agents Should Not Be Developed" (arXiv:2502.02649, 2025).
- Chan et al., "Visibility into AI Agents" (FAccT/arXiv, 2024) on agent IDs, monitoring, and activity logs.
- Singapore Model AI Governance Framework for Agentic AI (January 2026); NIST AI Agent Standards Initiative (February 2026); OWASP Top 10 for Agentic Applications (2026).
- McKinsey, "Stable, secure, and scalable…" (May 2026), section "Automated remediation and self-healing systems."
