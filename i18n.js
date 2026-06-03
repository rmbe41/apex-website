(function () {
  "use strict";

  var STORAGE_KEY = "apex-lang";
  var SUPPORTED = ["de", "en"];
  var currentLang = "de";
  var translations;
  /** German use-case copy: captured once from index.html (single source of truth). */
  var deUseCasesCapture = null;

  function buildDe() {
    return {
      meta: {
        title: "Apex Partners | KI-Systeme für den Mittelstand",
        description:
          "Funktionale KI-Systeme für Kernprozesse — diskret, messbar, maßgeschneidert für den Mittelstand.",
      },
      nav: {
        logoAria: "Apex Partners Startseite",
        navAria: "Hauptnavigation",
        mobileNavAria: "Mobile Navigation",
        pulscheck: "KI Puls-Check",
        useCases: "Use Cases",
        howItWorks: "Wie es funktioniert",
        contact: "Kontakt",
        cta: "Erstgespräch vereinbaren",
        menuOpen: "Menü öffnen",
        menuClose: "Menü schließen",
      },
      hero: {
        eyebrow: "KI-Systeme für den Mittelstand",
        titleHtml: "Ihre Erfahrung.<br />Skaliert durch <em>KI</em>.",
        lead:
          "Funktionale KI-Systeme für Ihr Unternehmen in wenigen Wochen. Diskret in der Umsetzung, messbar im Ergebnis, maßgeschneidert für den Mittelstand.",
        cta: "Erstgespräch vereinbaren",
        pulscheck: "KI Puls-Check",
        videoPlayAria: "Film über Apex Partners abspielen",
        customersAria: "Kunden und Partner",
        pills: ["Umsetzungsstark", "Ergebnisorientiert", "Diskret", "Datenkonform", "Zukunftssicher"],
      },
      pulscheck: {
        label: "KI Puls-Check",
        title: "Wo stehen Sie mit KI?",
        lead: "Wir zeigen Ihnen, wo KI in Ihrem Unternehmen heute bereits wirken könnte.",
        panelTitle: "Finden Sie es jetzt heraus!",
        previewOpenAria: "KI Puls-Check starten",
        metaAria: "Kurzinfos zum Fragebogen",
        metaDuration: "~10 Minuten",
        metaQuestions: "9 Fragen",
        metaBrowser: "Nur im Browser",
        leadHtml:
          "Der <strong>KI Puls-Check</strong>: neun Fragen, sechs Dimensionen — etwa zehn Minuten. Ihre Antworten werden nur in diesem Browser ausgewertet und nicht übertragen.",
        dimsAria: "Bewertete Dimensionen",
        cta: "KI-Puls Check starten",
        preview: {
          badge: "KI Puls-Check",
          questionCounter: "Frage 1 von 9",
          dimension: "Strategie & Führung",
        },
        modal: {
          closeAria: "Fragebogen schließen",
          dialogTitle: "KI Puls-Check",
          badge: "KI Puls-Check",
          badgeResult: "KI Puls-Check · Ergebnis",
          title: "Los geht's",
          sub: "Antippen oder auswählen — Sie gelangen automatisch zur nächsten Frage. Am Ende sehen Sie eine Einordnung von 0 bis 100.",
          questionCounter: "Frage {{n}} von 9",
          back: "Zurück",
          next: "Weiter",
          nextFinal: "Zum Ergebnis",
          scoreMax: "von 100",
          nextStepsTitle: "Empfohlene nächste Schritte",
          contactBtn: "Ergebnis besprechen",
          restartBtn: "KI Puls-Check erneut starten",
          liveQuestion: "Frage {{n}} von 9. Dimension: {{dim}}. {{q}}",
          liveResult: "KI Puls-Check: {{score}} von 100 Punkten. Einordnung: {{label}}.",
        },
        data: buildPulscheckDataDe(),
      },
      useCases: buildUseCasesDe(),
      principles: {
        label: "Wie es funktioniert",
        title: "Wie wir arbeiten",
        lead: "Drei Grundsätze. Ein gemeinsamer Weg.",
        step1Title: "Für Ihr Unternehmen entwickelt.",
        step1Body:
          "Jede Lösung entsteht im Dialog mit Ihren Fachbereichen – entwickelt für Ihre konkreten Abläufe, nicht für den allgemeinen Fall.",
        step2Title: "In Ihre bestehenden Systeme integriert.",
        step2Body:
          "Wir verbinden neue Technologie mit den Systemen, in denen Ihre Prozesse bereits laufen – ohne Brüche, ohne Parallelstrukturen.",
        step3Title: "Ihre Daten bleiben unter Ihrer Kontrolle.",
        step3Body:
          "Ihre Daten bleiben in Europa. Die Infrastruktur bleibt unter Ihrer Kontrolle. Kein Lock-in, keine versteckten Abhängigkeiten.",
      },
      contact: {
        label: "Kontakt",
        titleHtml: "Ein Gespräch.<br />Ein nächster Schritt.",
        lead:
          "Wir hören zuerst zu und verstehen Ihren Kontext. Dann entscheiden wir gemeinsam, ob und wie wir weiterarbeiten.",
        cta: "Erstgespräch vereinbaren",
        mailtoHref:
          "mailto:kontakt@apexpartners.tech?subject=Mandatsanfrage%20%E2%80%93%20Erstgespr%C3%A4ch",
      },
      footer: {
        tagline:
          "KI-Systeme für den Mittelstand — von der ersten Sichtung bis zur selbstverständlichen Nutzung im Alltag.",
        legalName: "Apex Partners",
        legalEntity: "Marke der Robin Betz Unternehmensberatung",
        legalRep: "vertreten durch Robin Miguel Betz",
        legalAddress: "Rottmannstraße 20, 80333 München",
        copyright: "© 2026 Apex Partners",
        email: "kontakt@apexpartners.tech",
      },
      lang: {
        choose: "Sprache wählen",
        de: "Deutsch",
        en: "English",
        switchToEn: "Auf Englisch wechseln",
        switchToDe: "Auf Deutsch wechseln",
      },
    };
  }

  function buildEn() {
    return {
      meta: {
        title: "Apex Partners | AI systems for mid-market companies",
        description:
          "Functional AI systems for core processes — discreet, measurable, tailored for mid-market companies.",
      },
      nav: {
        logoAria: "Apex Partners homepage",
        navAria: "Main navigation",
        mobileNavAria: "Mobile navigation",
        pulscheck: "AI Pulse Check",
        useCases: "Use cases",
        howItWorks: "How it works",
        contact: "Contact",
        cta: "Book an initial consultation",
        menuOpen: "Open menu",
        menuClose: "Close menu",
      },
      hero: {
        eyebrow: "AI systems for mid-market companies",
        titleHtml: "Your expertise.<br />Scaled through <em>AI</em>.",
        lead:
          "Functional AI systems for your business in a matter of weeks. Discreet in delivery, measurable in results, tailored for mid-market companies.",
        cta: "Book an initial consultation",
        pulscheck: "AI Pulse Check",
        videoPlayAria: "Play video about Apex Partners",
        customersAria: "Clients and partners",
        pills: ["Execution-focused", "Results-driven", "Discreet", "Data-compliant", "Future-ready"],
      },
      pulscheck: {
        label: "AI Pulse Check",
        title: "Where do you stand with AI?",
        lead: "We show you where AI could already make an impact in your organization today.",
        panelTitle: "Find out now!",
        previewOpenAria: "Start AI Pulse Check",
        metaAria: "Quick facts about the questionnaire",
        metaDuration: "~10 minutes",
        metaQuestions: "9 questions",
        metaBrowser: "Browser only",
        leadHtml:
          "The <strong>AI Pulse Check</strong>: nine questions, six dimensions — about ten minutes. Your answers are evaluated only in this browser and are not transmitted.",
        dimsAria: "Dimensions assessed",
        cta: "Start AI Pulse Check",
        preview: {
          badge: "AI Pulse Check",
          questionCounter: "Question 1 of 9",
          dimension: "Strategy & leadership",
        },
        modal: {
          closeAria: "Close questionnaire",
          dialogTitle: "AI Pulse Check",
          badge: "AI Pulse Check",
          badgeResult: "AI Pulse Check · Results",
          title: "Let's begin",
          sub: "Tap or select an answer — you'll move to the next question automatically. At the end you'll see a score from 0 to 100.",
          questionCounter: "Question {{n}} of 9",
          back: "Back",
          next: "Next",
          nextFinal: "View results",
          scoreMax: "out of 100",
          nextStepsTitle: "Recommended next steps",
          contactBtn: "Discuss your results",
          restartBtn: "Restart AI Pulse Check",
          liveQuestion: "Question {{n}} of 9. Dimension: {{dim}}. {{q}}",
          liveResult: "AI Pulse Check: {{score}} out of 100 points. Classification: {{label}}.",
        },
        data: buildPulscheckDataEn(),
      },
      useCases: buildUseCasesEn(),
      principles: {
        label: "How it works",
        title: "How we work",
        lead: "Three principles. One shared path.",
        step1Title: "Built for your company.",
        step1Body:
          "Every solution is developed in dialogue with your teams — designed for your specific workflows, not for a generic use case.",
        step2Title: "Integrated into your existing systems.",
        step2Body:
          "We connect new technology with the systems where your processes already run — without disruption, without parallel structures.",
        step3Title: "Your data stays under your control.",
        step3Body:
          "Your data stays in Europe. The infrastructure stays under your control. No lock-in, no hidden dependencies.",
      },
      contact: {
        label: "Contact",
        titleHtml: "One conversation.<br />One next step.",
        lead:
          "We listen first and understand your context. Then we decide together whether and how to move forward.",
        cta: "Book an initial consultation",
        mailtoHref:
          "mailto:kontakt@apexpartners.tech?subject=Engagement%20inquiry%20%E2%80%93%20Initial%20consultation",
      },
      footer: {
        tagline:
          "AI systems for mid-market companies — from first exploration to everyday use.",
        legalName: "Apex Partners",
        legalEntity: "A brand of Robin Betz Unternehmensberatung",
        legalRep: "represented by Robin Miguel Betz",
        legalAddress: "Rottmannstraße 20, 80333 Munich, Germany",
        copyright: "© 2026 Apex Partners",
        email: "kontakt@apexpartners.tech",
      },
      lang: {
        choose: "Choose language",
        de: "German",
        en: "English",
        switchToEn: "Switch to English",
        switchToDe: "Switch to German",
      },
    };
  }

  function buildPulscheckDataDe() {
    return {
      DIMENSIONS: [
        "Strategie & Führung",
        "Talent & Kultur",
        "Tools & Infrastruktur",
        "Prozesse & Betrieb",
        "Produkt",
        "Governance & Risiko",
      ],
      STAGE_LABEL: ["Stufe 0", "Stufe 1", "Stufe 2", "Stufe 3", "Stufe 4", "Stufe 5"],
      questions: [
        {
          dimension: "Strategie & Führung",
          q: "Wie zentral steht KI in der Strategie und auf der Roadmap Ihres Unternehmens?",
          options: [
            { score: 0, text: "Es gibt keine KI-Strategie — Thema steht auf dem Backlog." },
            { score: 1, text: "Einzelne Personen experimentieren eigenverantwortlich mit KI-Tools." },
            { score: 2, text: "Es gibt eine informelle KI-Initiative in einem Team oder einer Funktion." },
            { score: 3, text: "KI ist in der Roadmap, aber (noch) keine strategische Priorität." },
            { score: 4, text: "KI ist benannte strategische Säule mit Budget und klar verantwortlichen Personen." },
            { score: 5, text: "KI prägt wesentliche Entscheidungen — Produkte, Hiring, Ops und Vision." },
          ],
        },
        {
          dimension: "Strategie & Führung",
          q: "Nutzt Ihre Führungsriege KI-Tools selbst praktisch, hands-on?",
          options: [
            { score: 0, text: "Nein — Führung liest höchstens über KI." },
            { score: 1, text: "Einzelne Führungskräfte nutzen KI gelegentlich für persönliche Aufgaben." },
            { score: 2, text: "Mehrere Führungskräfte arbeiten regelmäßig mit KI an eigenen Themen." },
            { score: 3, text: "Der Großteil der Führungsriege hat einen aktiven KI-Workflow." },
            { score: 4, text: "Führung ist mit KI vertraut und macht die Nutzung im Unternehmen vor." },
            { score: 5, text: "Führung baut mit KI — Prompts, Agenten, Evals — und nutzt es nicht nur oberflächlich." },
          ],
        },
        {
          dimension: "Talent & Kultur",
          q: "Wie berücksichtigen Sie KI-Kompetenz bei Einstellung und Entwicklung?",
          options: [
            { score: 0, text: "KI spielt weder in Hiring noch in Weiterbildung eine Rolle." },
            { score: 1, text: "In Stellenanzeigen taucht KI gelegentlich auf." },
            { score: 2, text: "Es gibt optionale KI-Schulungen für Interessierte." },
            { score: 3, text: "KI-Kompetenz ist für ausgewählte Rollen in Leistungsgesprächen relevant." },
            { score: 4, text: "KI-Skills sind Kriterium beim Einstieg und Teil des Onboardings für alle Rollen." },
            { score: 5, text: "Wir messen und entwickeln KI-Kompetenz unternehmensweit — sie ist Kernkompetenz." },
          ],
        },
        {
          dimension: "Talent & Kultur",
          q: "Wie sicher fühlen sich Mitarbeitende beim Experimentieren mit KI und beim Teilen von Learnings?",
          options: [
            { score: 0, text: "Es gibt keine KI-Kultur — jede:r macht für sich." },
            { score: 1, text: "Einzelne experimentieren, Erkenntnisse werden selten geteilt." },
            { score: 2, text: "Es gibt informelle Kanäle (z. B. Slack), in denen KI-Tipps geteilt werden." },
            { score: 3, text: "Strukturierte Formate (Show & Tell, Demos, Guilds) fördern den Austausch." },
            { score: 4, text: "Psychologische Sicherheit beim KI-Experimentieren ist ausdrücklich gewollt." },
            { score: 5, text: "„Fail forward“ bei KI ist gewollt; Learnings fließen in Systeme und Prozesse ein." },
          ],
        },
        {
          dimension: "Tools & Infrastruktur",
          q: "Wie sieht es bei Ihnen mit KI-Tools und Infrastruktur aus?",
          options: [
            { score: 0, text: "Mitarbeitende nutzen kostenlose Consumer-Tools auf privaten Konten, unkoordiniert." },
            { score: 1, text: "Ein oder zwei lizenzierte KI-Tools, genutzt von spezifischen Teams." },
            { score: 2, text: "Ein abgestimmtes KI-Tool-Set ist definiert und breit ausgerollt." },
            { score: 3, text: "Freigegebene KI-Tools mit Nutzungsrichtlinien und SSO." },
            { score: 4, text: "Eigene Integrationen, Prompt-Bibliotheken oder interne Copilots auf APIs." },
            { score: 5, text: "Eigene Modelle, Fine-Tuning oder KI-Infrastruktur passend zur Domäne." },
          ],
        },
        {
          dimension: "Tools & Infrastruktur",
          q: "Wie messen Sie Wirkung und ROI von KI in der Organisation?",
          options: [
            { score: 0, text: "Wir messen keine KI-Wirkung — höchstens qualitativ." },
            { score: 1, text: "Wir sehen Adoptions-Kennzahlen (Sitze, Logins), keine Business-Outcomes." },
            { score: 2, text: "Teams erfassen KI-Metriken uneinheitlich für sich." },
            { score: 3, text: "Gemeinsame Kennzahlen (z. B. gesparte Zeit, Automatisierung, Qualität)." },
            { score: 4, text: "KI-Wirkung wird auf Führungsebene mit klaren KPIs berichtet." },
            { score: 5, text: "KI-Ergebnisse fließen in OKRs, Personalkapazität und Investitionsentscheidungen." },
          ],
        },
        {
          dimension: "Prozesse & Betrieb",
          q: "In welchem Maß haben Sie Abläufe um KI herum neu gedacht — statt KI nur anzudocken?",
          options: [
            { score: 0, text: "Prozesse sind unverändert — KI wird wie eine Suchmaschine genutzt." },
            { score: 1, text: "Einzelne haben persönliche Workflows mit KI leicht angepasst." },
            { score: 2, text: "Es gab Experimente, die meisten Prozesse sind aber unverändert." },
            { score: 3, text: "Kernprozesse (z. B. Vertrieb, Support, Entwicklung) sind mit KI neu gestaltet." },
            { score: 4, text: "Querschnittliche Prozesse sind KI-nativ; Menschen übernehmen Ausnahmen." },
            { score: 5, text: "Systematisches Audit: die meisten Prozesse sind KI-first ausgelegt." },
          ],
        },
        {
          dimension: "Produkt",
          q: "Wie tief ist KI in Ihr Kernprodukt oder Ihre Kernleistung eingebettet?",
          options: [
            { score: 0, text: "KI ist nicht Teil des Produkts." },
            { score: 1, text: "Ein kleines KI-Feature, das wenig genutzt wird." },
            { score: 2, text: "KI sichtbar im Produkt und für manche Kund:innen wertvoll." },
            { score: 3, text: "KI trägt merklich zum Kerndifferenzierungsversprechen bei." },
            { score: 4, text: "KI ist zentral — die meisten Nutzer:innen interagieren regelmäßig damit." },
            { score: 5, text: "KI ist das Produkt. Differenzierung und Vorteil sind KI-nativ." },
          ],
        },
        {
          dimension: "Governance & Risiko",
          q: "Wie steuern Sie KI-Risiken, Sicherheit und verantwortungsvolle Nutzung?",
          options: [
            { score: 0, text: "Keine Richtlinien zu KI oder Datenweitergabe." },
            { score: 1, text: "Informelle Normen, nichts Dokumentiertes." },
            { score: 2, text: "Grundlegende Nutzungsleitlinien für Mitarbeitende." },
            { score: 3, text: "Formale KI-Richtlinie inkl. Datenschutz und zulässiger Nutzung." },
            { score: 4, text: "Aktives KI-Governance-Set: Richtlinien, Freigaben, Incident-Prozesse." },
            { score: 5, text: "KI-Ethik-Rahmen, regelmäßige Audits, klar benannte Responsible-AI-Rolle." },
          ],
        },
      ],
      levels: [
        {
          min: 0,
          max: 20,
          label: "KI-neugierig",
          desc: "Sie stehen am Anfang der KI-Reise. Das ist die Norm — die Lücke zwischen heutigem Stand und Chancen ist groß, aber gut schließbar.",
        },
        {
          min: 21,
          max: 40,
          label: "KI-bewusst",
          desc: "Es gibt erste Bewegung, doch KI ist noch randständig. Einzelne Inseln der Nutzung — ohne zusammenhängende Strategie oder Kultur.",
        },
        {
          min: 41,
          max: 60,
          label: "KI-aktiv",
          desc: "KI ist im Alltag angekommen: Tools, erste Kultur, echte Hebel. Jetzt geht es darum, Breite und Tiefe auszubauen.",
        },
        {
          min: 61,
          max: 80,
          label: "KI-versiert",
          desc: "KI steckt merklich in Strategie, Tooling, Kultur und Ergebnissen — Sie sind vielen voraus. Nächster Schritt: systemischer Vorsprung.",
        },
        {
          min: 81,
          max: 100,
          label: "KI-nativ",
          desc: "Sie operieren nah an der Grenze: KI prägt Bau, Betrieb und Wettbewerb. Die Aufgabe ist, diesen Vorsprung nachhaltig zu halten und auszubauen.",
        },
      ],
      movesByLevel: {
        "KI-neugierig": [
          {
            icon: "target",
            title: "Einen starken Hebel-Prozess mit KI anpacken",
            body: "Nicht alles auf einmal. Ein repetitiver, zeitfressender Ablauf (Support-Triage, Erstentwürfe, Datenfassungen) — dafür einen funktionierenden KI-Prototyp bauen.",
          },
          {
            icon: "users",
            title: "Interne KI-Champions finden",
            body: "In jedem Unternehmen gibt es schon 1–3 Machende. Geben Sie Rückendeckung, Budget und eine Bühne zum Teilen — sie ziehen andere mit.",
          },
          {
            icon: "book",
            title: "Führung hands-on an KI heranführen",
            body: "Ein halber Tag Workshop: Jede Führungskraft baut selbst etwas mit KI — keine reine Demo. Kompetenz kommt vom Machen.",
          },
        ],
        "KI-bewusst": [
          {
            icon: "map",
            title: "KI-Roadmap mit klarer Verantwortung",
            body: "Benannte KI-Leitung, 90 Tage: Ist-Analyse, drei gezielte Hebel, Plan für das Quartal.",
          },
          {
            icon: "tool",
            title: "Toolstack standardisieren und ausrollen",
            body: "Wildwuchs reduzieren: ein gemeinsames KI-Set, SSO, Richtlinie, einfacher Zugang — sicher und ohne Reibung.",
          },
          {
            icon: "chart",
            title: "Erste KI-Erfolgskennzahl definieren",
            body: "Eine KPI, die KI messbar bewegen soll (Bearbeitungszeit Tickets, Output-Volumen, Review-Geschwindigkeit). Vorher/Nachher — die ROI-Geschichte.",
          },
        ],
        "KI-aktiv": [
          {
            icon: "refresh",
            title: "Prozess-Audit über alle Funktionen",
            body: "Pro Bereich die Top-5-Wiederkehrer-Abläufe. KI-Potenzial bewerten, Top-10 org-weit priorisieren — mit Ownern und Terminen.",
          },
          {
            icon: "school",
            title: "KI-Kompetenz-Baseline für die Organisation",
            body: "Skills erfassen, Schulungsbudget darauf ausrichten, KI in Feedback-Gespräche einbinden.",
          },
          {
            icon: "api",
            title: "Von Tools zu Integrationen",
            body: "APIs nutzen: Vorlagen, interne Copilots, maßgeschneiderte Assistenten — hier wächst Hebel multiplikativ.",
          },
        ],
        "KI-versiert": [
          {
            icon: "robot",
            title: "Ersten agentischen Workflow launchen",
            body: "Über Einzelprompts hinaus: mehrstufige Agenten, die einen Prozess Ende-zu-Ende automatisieren (z. B. Lead-Quali → Kontakt → CRM).",
          },
          {
            icon: "shield",
            title: "Formale KI-Governance aufsetzen",
            body: "Risiko-Owner, Responsible-AI-Richtlinie, Freigabeprozess für neue KI-Tools vor Rollout.",
          },
          {
            icon: "bulb",
            title: "KI in die Kernwertschöpfung des Produkts verankern",
            body: "Wo kann KI das Produkt für Kund:innen 10× verbessern — nicht nur als Feature, sondern als Mechanismus der Wertschöpfung.",
          },
        ],
        "KI-nativ": [
          {
            icon: "trophy",
            title: "KI-Playbook dokumentieren und teilen",
            body: "Was funktioniert, intern festhalten (Kultur) und nach außen zeigen (Talent, Markt).",
          },
          {
            icon: "trending",
            title: "Evals und Feedback in jedes KI-System",
            body: "Evaluation wie Production Software: Tests, Monitoring, Incident Response.",
          },
          {
            icon: "world",
            title: "Fine-Tuning oder domänenspezifische Modelle prüfen",
            body: "Standardmodelle sind kommodifiziert — Ihre Daten und Expertise nicht. RAG oder Fine-Tuning für echten Vorsprung.",
          },
        ],
      },
      mailto: {
        subject: "KI Puls-Check — {{label}} ({{score}}/100)",
        body:
          "Hallo Apex Partners,\n\nmein KI Puls-Check Ergebnis: {{score}}/100 ({{label}}).\n\nIch möchte mein KI Puls-Check Ergebnis gern kurz mit Ihnen besprechen.\n\nViele Grüße",
      },
    };
  }

  function buildPulscheckDataEn() {
    return {
      DIMENSIONS: [
        "Strategy & leadership",
        "Talent & culture",
        "Tools & infrastructure",
        "Processes & operations",
        "Product",
        "Governance & risk",
      ],
      STAGE_LABEL: ["Stage 0", "Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5"],
      questions: [
        {
          dimension: "Strategy & leadership",
          q: "How central is AI in your company's strategy and roadmap?",
          options: [
            { score: 0, text: "There is no AI strategy — the topic is on the backlog." },
            { score: 1, text: "Individuals experiment with AI tools on their own initiative." },
            { score: 2, text: "There is an informal AI initiative in one team or function." },
            { score: 3, text: "AI is on the roadmap but not yet a strategic priority." },
            { score: 4, text: "AI is a named strategic pillar with budget and clear owners." },
            { score: 5, text: "AI shapes major decisions — products, hiring, operations, and vision." },
          ],
        },
        {
          dimension: "Strategy & leadership",
          q: "Does your leadership team use AI tools hands-on in practice?",
          options: [
            { score: 0, text: "No — leadership at most reads about AI." },
            { score: 1, text: "Individual leaders occasionally use AI for personal tasks." },
            { score: 2, text: "Several leaders regularly work with AI on their own topics." },
            { score: 3, text: "Most of the leadership team has an active AI workflow." },
            { score: 4, text: "Leadership is fluent with AI and models usage across the company." },
            { score: 5, text: "Leadership builds with AI — prompts, agents, evals — not just surface use." },
          ],
        },
        {
          dimension: "Talent & culture",
          q: "How do you factor AI skills into hiring and development?",
          options: [
            { score: 0, text: "AI plays no role in hiring or training." },
            { score: 1, text: "AI appears occasionally in job postings." },
            { score: 2, text: "Optional AI training is available for interested employees." },
            { score: 3, text: "AI skills matter in performance reviews for selected roles." },
            { score: 4, text: "AI skills are a hiring criterion and part of onboarding for all roles." },
            { score: 5, text: "We measure and develop AI skills company-wide — they are a core competency." },
          ],
        },
        {
          dimension: "Talent & culture",
          q: "How safe do employees feel experimenting with AI and sharing learnings?",
          options: [
            { score: 0, text: "There is no AI culture — everyone works in isolation." },
            { score: 1, text: "Individuals experiment; insights are rarely shared." },
            { score: 2, text: "Informal channels (e.g. Slack) exist for sharing AI tips." },
            { score: 3, text: "Structured formats (show & tell, demos, guilds) encourage exchange." },
            { score: 4, text: "Psychological safety for AI experimentation is explicitly encouraged." },
            { score: 5, text: "“Fail forward” with AI is encouraged; learnings feed into systems and processes." },
          ],
        },
        {
          dimension: "Tools & infrastructure",
          q: "What does your AI tooling and infrastructure look like?",
          options: [
            { score: 0, text: "Employees use free consumer tools on personal accounts, uncoordinated." },
            { score: 1, text: "One or two licensed AI tools, used by specific teams." },
            { score: 2, text: "A coordinated AI tool set is defined and rolled out broadly." },
            { score: 3, text: "Approved AI tools with usage policies and SSO." },
            { score: 4, text: "Custom integrations, prompt libraries, or internal copilots on APIs." },
            { score: 5, text: "Own models, fine-tuning, or AI infrastructure tailored to your domain." },
          ],
        },
        {
          dimension: "Tools & infrastructure",
          q: "How do you measure AI impact and ROI across the organization?",
          options: [
            { score: 0, text: "We do not measure AI impact — at most qualitatively." },
            { score: 1, text: "We track adoption metrics (seats, logins), not business outcomes." },
            { score: 2, text: "Teams capture AI metrics inconsistently on their own." },
            { score: 3, text: "Shared metrics (e.g. time saved, automation, quality)." },
            { score: 4, text: "AI impact is reported to leadership with clear KPIs." },
            { score: 5, text: "AI outcomes feed into OKRs, capacity planning, and investment decisions." },
          ],
        },
        {
          dimension: "Processes & operations",
          q: "To what extent have you redesigned workflows around AI — rather than bolting AI on?",
          options: [
            { score: 0, text: "Processes are unchanged — AI is used like a search engine." },
            { score: 1, text: "Individuals have lightly adapted personal workflows with AI." },
            { score: 2, text: "There have been experiments; most processes remain unchanged." },
            { score: 3, text: "Core processes (e.g. sales, support, engineering) are redesigned with AI." },
            { score: 4, text: "Cross-functional processes are AI-native; people handle exceptions." },
            { score: 5, text: "Systematic audit: most processes are designed AI-first." },
          ],
        },
        {
          dimension: "Product",
          q: "How deeply is AI embedded in your core product or service?",
          options: [
            { score: 0, text: "AI is not part of the product." },
            { score: 1, text: "A small AI feature that sees little use." },
            { score: 2, text: "AI is visible in the product and valuable for some customers." },
            { score: 3, text: "AI noticeably supports the core differentiation promise." },
            { score: 4, text: "AI is central — most users interact with it regularly." },
            { score: 5, text: "AI is the product. Differentiation and advantage are AI-native." },
          ],
        },
        {
          dimension: "Governance & risk",
          q: "How do you manage AI risk, security, and responsible use?",
          options: [
            { score: 0, text: "No policies on AI or data sharing." },
            { score: 1, text: "Informal norms, nothing documented." },
            { score: 2, text: "Basic usage guidelines for employees." },
            { score: 3, text: "Formal AI policy including privacy and permitted use." },
            { score: 4, text: "Active AI governance: policies, approvals, incident processes." },
            { score: 5, text: "AI ethics framework, regular audits, clear responsible-AI role." },
          ],
        },
      ],
      levels: [
        {
          min: 0,
          max: 20,
          label: "AI-curious",
          desc: "You are at the start of your AI journey. That is the norm — the gap between today's baseline and the opportunity is large, but closable.",
        },
        {
          min: 21,
          max: 40,
          label: "AI-aware",
          desc: "There is early movement, but AI remains peripheral. Islands of use — without a connected strategy or culture.",
        },
        {
          min: 41,
          max: 60,
          label: "AI-active",
          desc: "AI is part of everyday work: tools, early culture, real levers. The focus now is scaling breadth and depth.",
        },
        {
          min: 61,
          max: 80,
          label: "AI-advanced",
          desc: "AI is visible in strategy, tooling, culture, and outcomes — you are ahead of most peers. Next step: systematic advantage.",
        },
        {
          min: 81,
          max: 100,
          label: "AI-native",
          desc: "You operate near the frontier: AI shapes how you build, run, and compete. The task is to sustain and extend that lead.",
        },
      ],
      movesByLevel: {
        "AI-curious": [
          {
            icon: "target",
            title: "Tackle one high-leverage process with AI",
            body: "Not everything at once. One repetitive, time-consuming workflow (support triage, first drafts, data capture) — build a working AI prototype for it.",
          },
          {
            icon: "users",
            title: "Find internal AI champions",
            body: "Every company already has 1–3 builders. Give them backing, budget, and a stage to share — they pull others along.",
          },
          {
            icon: "book",
            title: "Bring leadership hands-on to AI",
            body: "A half-day workshop: every leader builds something with AI — not a demo-only session. Competence comes from doing.",
          },
        ],
        "AI-aware": [
          {
            icon: "map",
            title: "AI roadmap with clear ownership",
            body: "Named AI lead, 90 days: baseline assessment, three targeted levers, plan for the quarter.",
          },
          {
            icon: "tool",
            title: "Standardize and roll out the tool stack",
            body: "Reduce sprawl: one shared AI set, SSO, policy, easy access — secure and low friction.",
          },
          {
            icon: "chart",
            title: "Define a first AI success metric",
            body: "One KPI AI should move measurably (ticket handling time, output volume, review speed). Before/after — the ROI story.",
          },
        ],
        "AI-active": [
          {
            icon: "refresh",
            title: "Process audit across functions",
            body: "Per area, top five recurring workflows. Assess AI potential, prioritize top ten org-wide — with owners and dates.",
          },
          {
            icon: "school",
            title: "AI skills baseline for the organization",
            body: "Map skills, align training budget, embed AI in feedback conversations.",
          },
          {
            icon: "api",
            title: "From tools to integrations",
            body: "Use APIs: templates, internal copilots, tailored assistants — that's where leverage compounds.",
          },
        ],
        "AI-advanced": [
          {
            icon: "robot",
            title: "Launch your first agentic workflow",
            body: "Beyond single prompts: multi-step agents that automate a process end to end (e.g. lead qual → outreach → CRM).",
          },
          {
            icon: "shield",
            title: "Establish formal AI governance",
            body: "Risk owner, responsible-AI policy, approval process for new AI tools before rollout.",
          },
          {
            icon: "bulb",
            title: "Anchor AI in core product value creation",
            body: "Where can AI improve the product 10× for customers — not as a feature alone, but as how value is created.",
          },
        ],
        "AI-native": [
          {
            icon: "trophy",
            title: "Document and share your AI playbook",
            body: "Capture what works internally (culture) and signal it externally (talent, market).",
          },
          {
            icon: "trending",
            title: "Evals and feedback in every AI system",
            body: "Evaluation like production software: tests, monitoring, incident response.",
          },
          {
            icon: "world",
            title: "Explore fine-tuning or domain-specific models",
            body: "Foundation models are commoditized — your data and expertise are not. RAG or fine-tuning for real advantage.",
          },
        ],
      },
      mailto: {
        subject: "AI Pulse Check — {{label}} ({{score}}/100)",
        body:
          "Hello Apex Partners,\n\nmy AI Pulse Check result: {{score}}/100 ({{label}}).\n\nI would like to briefly discuss my AI Pulse Check results with you.\n\nBest regards",
      },
    };
  }

  function trimText(el) {
    return el ? String(el.textContent).replace(/\s+/g, " ").trim() : "";
  }

  /** Read German use-case strings from the DOM (index.html is the source of truth). */
  function captureUseCasesFromDom() {
    var root = document.getElementById("use-cases");
    if (!root) return null;

    var tablist = root.querySelector(".use-cases-tabs");
    var tabsAriaEl = tablist || root.querySelector("[data-i18n-aria]");

    var section = {
      label: trimText(root.querySelector('[data-i18n="useCases.label"]')),
      title: trimText(root.querySelector('[data-i18n="useCases.title"]')),
      lead: trimText(root.querySelector('[data-i18n="useCases.lead"]')),
      navLabel: trimText(root.querySelector('[data-i18n="useCases.navLabel"]')),
      tabsAria: tabsAriaEl ? tabsAriaEl.getAttribute("aria-label") || "Use Cases" : "Use Cases",
    };

    var labels = {
      challenge: trimText(root.querySelector('[data-i18n="useCases.labels.challenge"]')),
      build: trimText(root.querySelector('[data-i18n="useCases.labels.build"]')),
      outcome: trimText(root.querySelector('[data-i18n="useCases.labels.outcome"]')),
      suitable: trimText(root.querySelector('[data-i18n="useCases.labels.suitable"]')),
    };

    var tabs = [];
    root.querySelectorAll(".use-cases-tab").forEach(function (tab) {
      tabs.push(trimText(tab));
    });

    function panelField(panel, index, field) {
      var el = panel.querySelector('[data-i18n="useCases.' + index + "." + field + '"]');
      return trimText(el);
    }

    var panels = [];
    root.querySelectorAll(".use-case-panel").forEach(function (panel, index) {
      var buildItems = [];
      var list = panel.querySelector("[data-i18n-list]");
      if (list) {
        list.querySelectorAll("li").forEach(function (li) {
          buildItems.push(trimText(li));
        });
      }
      panels.push({
        title: panelField(panel, index, "title"),
        tagline: panelField(panel, index, "tagline"),
        challenge: panelField(panel, index, "challenge"),
        buildItems: buildItems,
        outcome: panelField(panel, index, "outcome"),
        suitable: panelField(panel, index, "suitable"),
      });
    });

    return { section: section, labels: labels, tabs: tabs, panels: panels };
  }

  function buildUseCasesDe() {
    if (!deUseCasesCapture) {
      return buildUseCasesFromPanels("de", [], [], null, null);
    }
    return buildUseCasesFromPanels(
      "de",
      deUseCasesCapture.panels,
      deUseCasesCapture.tabs,
      deUseCasesCapture.section,
      deUseCasesCapture.labels,
    );
  }

  function buildUseCasesEn() {
    return buildUseCasesFromPanels("en", UC_PANELS_EN, UC_TABS_EN, null, null);
  }

  function buildUseCasesFromPanels(lang, panels, tabs, sectionDe, labelsDe) {
    var labels =
      labelsDe ||
      (lang === "de"
        ? {
            challenge: "Herausforderung",
            build: "Was wir gemeinsam aufbauen",
            outcome: "Typische Ergebnisse",
            suitable: "Geeignet für",
          }
        : {
            challenge: "Challenge",
            build: "What we build together",
            outcome: "Typical outcomes",
            suitable: "Best suited for",
          });
    var section =
      sectionDe ||
      (lang === "de"
        ? {
            label: "Use Cases",
            title: "Was wir gemeinsam aufbauen.",
            lead:
              "Ein Überblick über die Bereiche, in denen wir Sie begleiten – von der Strategie bis zur Umsetzung.",
            navLabel: "Bereiche",
            tabsAria: "Use Cases",
          }
        : {
            label: "Use cases",
            title: "What we build together.",
            lead:
              "An overview of the areas where we support you — from strategy through to implementation.",
            navLabel: "Areas",
            tabsAria: "Use cases",
          });
    var out = {
      label: section.label,
      title: section.title,
      lead: section.lead,
      navLabel: section.navLabel,
      tabsAria: section.tabsAria,
      labels: labels,
      tab: {},
    };
    tabs.forEach(function (label, i) {
      out.tab[String(i)] = label;
      var p = panels[i];
      out[String(i)] = {
        title: p.title,
        tagline: p.tagline,
        challenge: p.challenge,
        buildItems: p.buildItems,
        outcome: p.outcome,
        suitable: p.suitable,
      };
    });
    return out;
  }

  var UC_TABS_EN = [
    "Context layer",
    "Corporate management",
    "Sales & customer acquisition",
    "HR & recruiting",
    "Customer service",
    "Finance",
    "Legal & regulatory",
    "Marketing",
    "Data & analytics",
  ];


  var UC_PANELS_EN = [
    {
      title: "Context layer",
      tagline: "The foundation for applied AI in your organization.",
      challenge:
        "AI is only as useful as the information it can access. In most companies, knowledge is scattered across systems, departments, and people — making it unusable for AI. We change that.",
      buildItems: [
        "Company-wide search across all relevant systems and repositories",
        "Knowledge structures that map relationships between projects, customers, and topics",
        "Automated documentation that captures knowledge before it leaves the organization",
        "A unified knowledge base as the foundation for all AI systems",
      ],
      outcome:
        "Faster access to information, more precise internal assistants, knowledge stays in the company — regardless of turnover.",
      suitable:
        "Companies with distributed teams, grown system landscapes, or ongoing AI projects with disappointing results.",
    },
    {
      title: "Corporate management",
      tagline: "Sound decisions. Based on all available information.",
      challenge:
        "Leaders decide daily on incomplete information. AI closes that gap systematically.",
      buildItems: [
        "Executive assistants that monitor KPIs, explain variances, and surface options",
        "Scenario analysis for operational and strategic decisions — traceable and quantified",
        "Early warning systems based on operational and market signals",
        "Strategic decision briefs from automatically aggregated data — without manual research",
      ],
      outcome:
        "Stronger decision foundations, shorter paths from data to recommendations, strategic choices made earlier.",
      suitable:
        "Executive management, boards, C-level, and strategy or operations teams with complex steering requirements.",
    },
    {
      title: "Sales & customer acquisition",
      tagline: "More revenue per employee. Less effort per close.",
      challenge:
        "Sales teams spend a large share of time on data upkeep, research, and follow-up — away from actual selling. AI takes on that load.",
      buildItems: [
        "Sales assistants that handle first contact, coordinate follow-up, and qualify prospects",
        "CRM automation with contextual next steps and up-to-date customer data",
        "Early pipeline risk detection — not only at quarter end",
        "Automated meeting prep from internal and public data",
      ],
      outcome: "Higher contact volume, less CRM maintenance, more reliable revenue forecasts.",
      suitable: "B2B sales, inside sales teams, companies with longer or complex sales cycles.",
    },
    {
      title: "HR & recruiting",
      tagline: "Faster hiring. Better decisions.",
      challenge:
        "Open roles stay vacant longer than necessary — not because candidates are missing, but because screening, coordination, and onboarding tie up HR disproportionately.",
      buildItems: [
        "Automated CV screening ranked against individual requirement profiles",
        "Interview assistants with structured questions and evaluation documentation",
        "Personalized onboarding assistants for new hires' first weeks",
        "Internal HR agents for standard requests and skills analysis to identify gaps",
      ],
      outcome:
        "Shorter time to fill, better comparability of candidates, HR teams with more capacity for strategic work.",
      suitable:
        "Growing companies, HR departments with high application volume, industries with specific requirement profiles.",
    },
    {
      title: "Customer service",
      tagline: "Resolve more requests. With the same or a smaller team.",
      challenge:
        "Service effort grows with the customer base. AI decouples those curves — without sacrificing quality.",
      buildItems: [
        "AI service assistants for recurring standard requests",
        "Intelligent intake routing by priority, category, and ownership",
        "Automatic detection of critical customer situations with immediate escalation",
        "Customer satisfaction scoring for early churn risk detection",
      ],
      outcome:
        "A substantial share of requests resolved without manual intervention, faster response times, service teams focus on high-value cases.",
      suitable:
        "Companies with high request volume, critical customer relationships, or growing customer bases with a stable team.",
    },
    {
      title: "Finance",
      tagline: "Less manual process. Better decision foundations.",
      challenge:
        "Finance teams lose capacity to repetitive tasks — at the expense of analysis and steering.",
      buildItems: [
        "Automated invoice processing and reconciliation",
        "Continuous spend analysis with savings potential detection",
        "Liquidity and revenue forecasts from historical and current data",
        "Procurement and approval automation plus structured contract analysis",
      ],
      outcome:
        "Reduced manual effort, faster month-end close, more capacity for strategic finance steering.",
      suitable:
        "Mid-market companies, organizations with repetitive finance processes, finance leaders before or after restructuring.",
    },
    {
      title: "Legal & regulatory",
      tagline: "Legal certainty without the usual delay.",
      challenge:
        "In regulated environments, careful legal handling is non-negotiable — but it does not have to be slow.",
      buildItems: [
        "Automated contract review with clause extraction and risk assessment",
        "Alignment of internal policies with regulatory requirements",
        "Documentation for privacy and industry-specific regulation",
        "Audit assistants for evidence and audit trails",
        "Internal legal assistant for standard legal questions — without burdening legal counsel",
      ],
      outcome:
        "Contract review in a fraction of the previous time, earlier risk detection, legal capacity freed for complex matters.",
      suitable:
        "Companies under high regulatory pressure whose legal or compliance teams spend most capacity on recurring review tasks.",
    },
    {
      title: "Marketing",
      tagline: "Consistent brand communication. At greater scale.",
      challenge:
        "Producing high-quality content takes time — regardless of team size or budget. AI fundamentally shifts the effort-to-outcome ratio.",
      buildItems: [
        "Content creation for SEO, advertising, social, and email — in your brand voice",
        "Personalization logic by audience, channel, and buying stage",
        "Automated testing of content variants with systematic evaluation",
        "Consistent brand language and visibility analysis in AI-powered search environments",
      ],
      outcome:
        "Higher content output per employee, more precise audience targeting, more capacity for concept and strategy.",
      suitable:
        "Companies with ambitious communication goals, marketing teams under resource pressure, organizations with multiple audiences or markets.",
    },
    {
      title: "Data & analytics",
      tagline: "Data-driven decisions — for everyone, not only specialists.",
      challenge:
        "Many companies have a solid data foundation, but access stays limited to a few people. AI opens that access — without sacrificing quality.",
      buildItems: [
        "Natural-language database queries — questions in plain language, answers from the system",
        "Automated reporting that adapts to changing requirements",
        "Explanatory analytics: not only what happened, but why",
        "Automatic anomaly detection and data cleansing for reliable data quality",
      ],
      outcome:
        "Business units answer data questions independently, analytics more widely accessible, data specialists focus on complex work.",
      suitable:
        "Companies with existing analytics systems, business units with regular analysis needs, organizations with growing data landscapes.",
    },
  ];

  function initTranslations() {
    translations = {
      de: buildDe(),
      en: buildEn(),
    };
  }

  function resolve(obj, path) {
    if (!path) return undefined;
    var keys = path.split(".");
    var cur = obj;
    for (var i = 0; i < keys.length; i++) {
      if (cur == null) return undefined;
      cur = cur[keys[i]];
    }
    return cur;
  }

  function getLang() {
    return currentLang;
  }

  function get(key) {
    return resolve(translations[currentLang], key);
  }

  function getPulscheck() {
    return translations[currentLang].pulscheck.data;
  }

  function apply() {
    var t = translations[currentLang];
    document.documentElement.lang = currentLang;
    document.title = t.meta.title;

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t.meta.description);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var val = get(el.getAttribute("data-i18n"));
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var val = get(el.getAttribute("data-i18n-html"));
      if (val != null) el.innerHTML = val;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var val = get(el.getAttribute("data-i18n-aria"));
      if (val != null) el.setAttribute("aria-label", val);
    });

    document.querySelectorAll("[data-i18n-href]").forEach(function (el) {
      var val = get(el.getAttribute("data-i18n-href"));
      if (val != null) el.setAttribute("href", val);
    });

    document.querySelectorAll("[data-i18n-list]").forEach(function (el) {
      var val = get(el.getAttribute("data-i18n-list"));
      if (!Array.isArray(val)) return;
      var items = el.querySelectorAll("li");
      for (var li = 0; li < val.length && li < items.length; li++) {
        items[li].textContent = val[li];
      }
    });

    document.querySelectorAll("[data-i18n-items]").forEach(function (el) {
      var val = get(el.getAttribute("data-i18n-items"));
      if (!Array.isArray(val)) return;
      var children = el.children;
      for (var ci = 0; ci < val.length && ci < children.length; ci++) {
        children[ci].textContent = val[ci];
      }
    });

    document.querySelectorAll("[data-i18n-dims]").forEach(function (el) {
      var dims = getPulscheck().DIMENSIONS;
      el.querySelectorAll(".pulscheck-dim-chip").forEach(function (chip, di) {
        if (dims[di]) chip.textContent = dims[di];
      });
    });

    updateLangToggle();
  }

  function updateLangToggle() {
    var trigger = document.getElementById("lang-toggle");
    var icon = document.getElementById("lang-toggle-icon");
    if (icon) {
      var deFlag = icon.querySelector(".lang-flag--de");
      var enFlag = icon.querySelector(".lang-flag--en");
      if (deFlag && enFlag) {
        deFlag.hidden = currentLang !== "de";
        enFlag.hidden = currentLang !== "en";
      }
    }
    if (trigger) {
      trigger.setAttribute(
        "aria-label",
        get("lang.choose") || (currentLang === "de" ? "Sprache wählen" : "Choose language"),
      );
    }
    document.querySelectorAll(".lang-dropdown__option").forEach(function (opt) {
      var selected = opt.getAttribute("data-lang") === currentLang;
      opt.setAttribute("aria-selected", selected ? "true" : "false");
      opt.classList.toggle("is-selected", selected);
    });
  }

  function closeLangMenu() {
    var dropdown = document.getElementById("lang-dropdown");
    var trigger = document.getElementById("lang-toggle");
    var menu = document.getElementById("lang-menu");
    if (!dropdown || !trigger || !menu) return;
    dropdown.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  }

  function openLangMenu() {
    var dropdown = document.getElementById("lang-dropdown");
    var trigger = document.getElementById("lang-toggle");
    var menu = document.getElementById("lang-menu");
    if (!dropdown || !trigger || !menu) return;
    dropdown.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    menu.hidden = false;
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    if (lang === currentLang) return;
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    closeLangMenu();
    apply();
    document.dispatchEvent(
      new CustomEvent("languagechange", { detail: { lang: lang } }),
    );
  }

  function initLangToggle() {
    var dropdown = document.getElementById("lang-dropdown");
    var trigger = document.getElementById("lang-toggle");
    var menu = document.getElementById("lang-menu");
    if (!dropdown || !trigger || !menu || dropdown._apexI18nBound) return;
    dropdown._apexI18nBound = true;

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      if (dropdown.classList.contains("is-open")) {
        closeLangMenu();
      } else {
        openLangMenu();
      }
    });

    menu.querySelectorAll(".lang-dropdown__option").forEach(function (opt) {
      opt.addEventListener("click", function () {
        var lang = opt.getAttribute("data-lang");
        closeLangMenu();
        if (lang) setLang(lang);
      });
    });

    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) closeLangMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLangMenu();
    });
  }

  function loadStoredLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.indexOf(stored) !== -1) currentLang = stored;
    } catch (e) {}
  }

  window.ApexI18n = {
    getLang: getLang,
    setLang: setLang,
    get: get,
    getPulscheck: getPulscheck,
    apply: apply,
  };

  loadStoredLang();

  function onReady() {
    deUseCasesCapture = captureUseCasesFromDom();
    initTranslations();
    apply();
    initLangToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();
