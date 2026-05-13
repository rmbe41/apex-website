(function () {
  var reduceMotion =
    typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DURATION_OUT = reduceMotion ? 0 : 220;
  var DURATION_QUIZ_OUT = reduceMotion ? 0 : 280;
  var AUTO_ADVANCE = reduceMotion ? 80 : 340;

  var DIMENSIONS = [
    "Strategie & Führung",
    "Talent & Kultur",
    "Tools & Infrastruktur",
    "Prozesse & Betrieb",
    "Produkt",
    "Governance & Risiko",
  ];

  var STAGE_LABEL = ["Stufe 0", "Stufe 1", "Stufe 2", "Stufe 3", "Stufe 4", "Stufe 5"];

  var questions = [
    {
      dimension: "Strategie & Führung",
      q: "Wie zentral steht KI in der Strategie und auf der Roadmap Ihres Unternehmens?",
      options: [
        { score: 0, text: "Es gibt keine KI-Strategie — Thema steht auf dem Backlog." },
        {
          score: 1,
          text: "Einzelne Personen experimentieren eigenverantwortlich mit KI-Tools.",
        },
        {
          score: 2,
          text: "Es gibt eine informelle KI-Initiative in einem Team oder einer Funktion.",
        },
        {
          score: 3,
          text: "KI ist in der Roadmap, aber (noch) keine strategische Priorität.",
        },
        {
          score: 4,
          text: "KI ist benannte strategische Säule mit Budget und klar verantwortlichen Personen.",
        },
        {
          score: 5,
          text: "KI prägt wesentliche Entscheidungen — Produkte, Hiring, Ops und Vision.",
        },
      ],
    },
    {
      dimension: "Strategie & Führung",
      q: "Nutzt Ihre Führungsriege KI-Tools selbst praktisch, hands-on?",
      options: [
        { score: 0, text: "Nein — Führung liest höchstens über KI." },
        { score: 1, text: "Einzelne Führungskräfte nutzen KI gelegentlich für persönliche Aufgaben." },
        {
          score: 2,
          text: "Mehrere Führungskräfte arbeiten regelmäßig mit KI an eigenen Themen.",
        },
        {
          score: 3,
          text: "Der Großteil der Führungsriege hat einen aktiven KI-Workflow.",
        },
        {
          score: 4,
          text: "Führung ist mit KI vertraut und macht die Nutzung im Unternehmen vor.",
        },
        {
          score: 5,
          text: "Führung baut mit KI — Prompts, Agenten, Evals — und nutzt es nicht nur oberflächlich.",
        },
      ],
    },
    {
      dimension: "Talent & Kultur",
      q: "Wie berücksichtigen Sie KI-Kompetenz bei Einstellung und Entwicklung?",
      options: [
        { score: 0, text: "KI spielt weder in Hiring noch in Weiterbildung eine Rolle." },
        { score: 1, text: "In Stellenanzeigen taucht KI gelegentlich auf." },
        { score: 2, text: "Es gibt optionale KI-Schulungen für Interessierte." },
        {
          score: 3,
          text: "KI-Kompetenz ist für ausgewählte Rollen in Leistungsgesprächen relevant.",
        },
        {
          score: 4,
          text: "KI-Skills sind Kriterium beim Einstieg und Teil des Onboardings für alle Rollen.",
        },
        {
          score: 5,
          text: "Wir messen und entwickeln KI-Kompetenz unternehmensweit — sie ist Kernkompetenz.",
        },
      ],
    },
    {
      dimension: "Talent & Kultur",
      q: "Wie sicher fühlen sich Mitarbeitende beim Experimentieren mit KI und beim Teilen von Learnings?",
      options: [
        { score: 0, text: "Es gibt keine KI-Kultur — jede:r macht für sich." },
        {
          score: 1,
          text: "Einzelne experimentieren, Erkenntnisse werden selten geteilt.",
        },
        {
          score: 2,
          text: "Es gibt informelle Kanäle (z. B. Slack), in denen KI-Tipps geteilt werden.",
        },
        {
          score: 3,
          text: "Strukturierte Formate (Show & Tell, Demos, Guilds) fördern den Austausch.",
        },
        {
          score: 4,
          text: "Psychologische Sicherheit beim KI-Experimentieren ist ausdrücklich gewollt.",
        },
        {
          score: 5,
          text: "„Fail forward“ bei KI ist gewollt; Learnings fließen in Systeme und Prozesse ein.",
        },
      ],
    },
    {
      dimension: "Tools & Infrastruktur",
      q: "Wie sieht es bei Ihnen mit KI-Tools und Infrastruktur aus?",
      options: [
        {
          score: 0,
          text: "Mitarbeitende nutzen kostenlose Consumer-Tools auf privaten Konten, unkoordiniert.",
        },
        {
          score: 1,
          text: "Ein oder zwei lizenzierte KI-Tools, genutzt von spezifischen Teams.",
        },
        {
          score: 2,
          text: "Ein abgestimmtes KI-Tool-Set ist definiert und breit ausgerollt.",
        },
        {
          score: 3,
          text: "Freigegebene KI-Tools mit Nutzungsrichtlinien und SSO.",
        },
        {
          score: 4,
          text: "Eigene Integrationen, Prompt-Bibliotheken oder interne Copilots auf APIs.",
        },
        {
          score: 5,
          text: "Eigene Modelle, Fine-Tuning oder KI-Infrastruktur passend zur Domäne.",
        },
      ],
    },
    {
      dimension: "Tools & Infrastruktur",
      q: "Wie messen Sie Wirkung und ROI von KI in der Organisation?",
      options: [
        { score: 0, text: "Wir messen keine KI-Wirkung — höchstens qualitativ." },
        { score: 1, text: "Wir sehen Adoptions-Kennzahlen (Sitze, Logins), keine Business-Outcomes." },
        {
          score: 2,
          text: "Teams erfassen KI-Metriken uneinheitlich für sich.",
        },
        {
          score: 3,
          text: "Gemeinsame Kennzahlen (z. B. gesparte Zeit, Automatisierung, Qualität).",
        },
        {
          score: 4,
          text: "KI-Wirkung wird auf Führungsebene mit klaren KPIs berichtet.",
        },
        {
          score: 5,
          text: "KI-Ergebnisse fließen in OKRs, Personalkapazität und Investitionsentscheidungen.",
        },
      ],
    },
    {
      dimension: "Prozesse & Betrieb",
      q: "In welchem Maß haben Sie Abläufe um KI herum neu gedacht — statt KI nur anzudocken?",
      options: [
        {
          score: 0,
          text: "Prozesse sind unverändert — KI wird wie eine Suchmaschine genutzt.",
        },
        {
          score: 1,
          text: "Einzelne haben persönliche Workflows mit KI leicht angepasst.",
        },
        {
          score: 2,
          text: "Es gab Experimente, die meisten Prozesse sind aber unverändert.",
        },
        {
          score: 3,
          text: "Kernprozesse (z. B. Vertrieb, Support, Entwicklung) sind mit KI neu gestaltet.",
        },
        {
          score: 4,
          text: "Querschnittliche Prozesse sind KI-nativ; Menschen übernehmen Ausnahmen.",
        },
        {
          score: 5,
          text: "Systematisches Audit: die meisten Prozesse sind KI-first ausgelegt.",
        },
      ],
    },
    {
      dimension: "Produkt",
      q: "Wie tief ist KI in Ihr Kernprodukt oder Ihre Kernleistung eingebettet?",
      options: [
        { score: 0, text: "KI ist nicht Teil des Produkts." },
        { score: 1, text: "Ein kleines KI-Feature, das wenig genutzt wird." },
        { score: 2, text: "KI sichtbar im Produkt und für manche Kund:innen wertvoll." },
        {
          score: 3,
          text: "KI trägt merklich zum Kerndifferenzierungsversprechen bei.",
        },
        {
          score: 4,
          text: "KI ist zentral — die meisten Nutzer:innen interagieren regelmäßig damit.",
        },
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
        {
          score: 3,
          text: "Formale KI-Richtlinie inkl. Datenschutz und zulässiger Nutzung.",
        },
        {
          score: 4,
          text: "Aktives KI-Governance-Set: Richtlinien, Freigaben, Incident-Prozesse.",
        },
        {
          score: 5,
          text: "KI-Ethik-Rahmen, regelmäßige Audits, klar benannte Responsible-AI-Rolle.",
        },
      ],
    },
  ];

  var levels = [
    {
      min: 0,
      max: 20,
      label: "KI-neugierig",
      desc:
        "Sie stehen am Anfang der KI-Reise. Das ist die Norm — die Lücke zwischen heutigem Stand und Chancen ist groß, aber gut schließbar.",
    },
    {
      min: 21,
      max: 40,
      label: "KI-bewusst",
      desc:
        "Es gibt erste Bewegung, doch KI ist noch randständig. Einzelne Inseln der Nutzung — ohne zusammenhängende Strategie oder Kultur.",
    },
    {
      min: 41,
      max: 60,
      label: "KI-aktiv",
      desc:
        "KI ist im Alltag angekommen: Tools, erste Kultur, echte Hebel. Jetzt geht es darum, Breite und Tiefe auszubauen.",
    },
    {
      min: 61,
      max: 80,
      label: "KI-versiert",
      desc:
        "KI steckt merklich in Strategie, Tooling, Kultur und Ergebnissen — Sie sind vielen voraus. Nächster Schritt: systemischer Vorsprung.",
    },
    {
      min: 81,
      max: 100,
      label: "KI-nativ",
      desc:
        "Sie operieren nah an der Grenze: KI prägt Bau, Betrieb und Wettbewerb. Die Aufgabe ist, diesen Vorsprung nachhaltig zu halten und auszubauen.",
    },
  ];

  var movesByLevel = {
    "KI-neugierig": [
      {
        icon: "target",
        title: "Einen starken Hebel-Prozess mit KI anpacken",
        body:
          "Nicht alles auf einmal. Ein repetitiver, zeitfressender Ablauf (Support-Triage, Erstentwürfe, Datenfassungen) — dafür einen funktionierenden KI-Prototyp bauen.",
      },
      {
        icon: "users",
        title: "Interne KI-Champions finden",
        body:
          "In jedem Unternehmen gibt es schon 1–3 Machende. Geben Sie Rückendeckung, Budget und eine Bühne zum Teilen — sie ziehen andere mit.",
      },
      {
        icon: "book",
        title: "Führung hands-on an KI heranführen",
        body:
          "Ein halber Tag Workshop: Jede Führungskraft baut selbst etwas mit KI — keine reine Demo. Kompetenz kommt vom Machen.",
      },
    ],
    "KI-bewusst": [
      {
        icon: "map",
        title: "KI-Roadmap mit klarer Verantwortung",
        body:
          "Benannte KI-Leitung, 90 Tage: Ist-Analyse, drei gezielte Hebel, Plan für das Quartal.",
      },
      {
        icon: "tool",
        title: "Toolstack standardisieren und ausrollen",
        body:
          "Wildwuchs reduzieren: ein gemeinsames KI-Set, SSO, Richtlinie, einfacher Zugang — sicher und ohne Reibung.",
      },
      {
        icon: "chart",
        title: "Erste KI-Erfolgskennzahl definieren",
        body:
          "Eine KPI, die KI messbar bewegen soll (Bearbeitungszeit Tickets, Output-Volumen, Review-Geschwindigkeit). Vorher/Nachher — die ROI-Geschichte.",
      },
    ],
    "KI-aktiv": [
      {
        icon: "refresh",
        title: "Prozess-Audit über alle Funktionen",
        body:
          "Pro Bereich die Top-5-Wiederkehrer-Abläufe. KI-Potenzial bewerten, Top-10 org-weit priorisieren — mit Ownern und Terminen.",
      },
      {
        icon: "school",
        title: "KI-Kompetenz-Baseline für die Organisation",
        body:
          "Skills erfassen, Schulungsbudget darauf ausrichten, KI in Feedback-Gespräche einbinden.",
      },
      {
        icon: "api",
        title: "Von Tools zu Integrationen",
        body:
          "APIs nutzen: Vorlagen, interne Copilots, maßgeschneiderte Assistenten — hier wächst Hebel multiplikativ.",
      },
    ],
    "KI-versiert": [
      {
        icon: "robot",
        title: "Ersten agentischen Workflow launchen",
        body:
          "Über Einzelprompts hinaus: mehrstufige Agenten, die einen Prozess Ende-zu-Ende automatisieren (z. B. Lead-Quali → Kontakt → CRM).",
      },
      {
        icon: "shield",
        title: "Formale KI-Governance aufsetzen",
        body:
          "Risiko-Owner, Responsible-AI-Richtlinie, Freigabeprozess für neue KI-Tools vor Rollout.",
      },
      {
        icon: "bulb",
        title: "KI in die Kernwertschöpfung des Produkts verankern",
        body:
          "Wo kann KI das Produkt für Kund:innen 10× verbessern — nicht nur als Feature, sondern als Mechanismus der Wertschöpfung.",
      },
    ],
    "KI-nativ": [
      {
        icon: "trophy",
        title: "KI-Playbook dokumentieren und teilen",
        body:
          "Was funktioniert, intern festhalten (Kultur) und nach außen zeigen (Talent, Markt).",
      },
      {
        icon: "trending",
        title: "Evals und Feedback in jedes KI-System",
        body:
          "Evaluation wie Production Software: Tests, Monitoring, Incident Response.",
      },
      {
        icon: "world",
        title: "Fine-Tuning oder domänenspezifische Modelle prüfen",
        body:
          "Standardmodelle sind kommodifiziert — Ihre Daten und Expertise nicht. RAG oder Fine-Tuning für echten Vorsprung.",
      },
    ],
  };

  var MOVE_ICONS = {
    target:
      '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    users:
      '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    chart:
      '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    refresh:
      '<path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
    school:
      '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    api: '<path d="M8 16l4-4-4-4M16 8l-4 4 4 4"/><line x1="4" y1="12" x2="20" y2="12"/>',
    robot:
      '<rect x="5" y="8" width="14" height="10" rx="2"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M9 17h6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 13c1 1 2 3 2 5h4c0-2 1-4 2-5a7 7 0 0 0-4-13z"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14v4M14 14v4M18 2H6v7a6 6 0 0 0 12 0V2z"/>',
    trending: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    world:
      '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  };

  function moveIconMarkup(iconKey) {
    var inner = MOVE_ICONS[iconKey];
    if (!inner) return "";
    return (
      '<span class="pulscheck-move-icon-wrap" aria-hidden="true"><svg class="pulscheck-move-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
      inner +
      "</svg></span>"
    );
  }

  var current = 0;
  var answers = Array(9).fill(null);
  var pendingTimer = null;

  function clearPending() {
    if (pendingTimer) {
      clearTimeout(pendingTimer);
      pendingTimer = null;
    }
  }

  function el(id) {
    return document.getElementById(id);
  }

  function updateLiveRegion(text) {
    var live = el("pulscheck-live");
    if (live) live.textContent = text;
  }

  function renderLiveAnnouncement() {
    var q = questions[current];
    var part =
      "Frage " +
      (current + 1) +
      " von 9. Dimension: " +
      q.dimension +
      ". " +
      q.q;
    updateLiveRegion(part);
  }

  function setProgress() {
    var fill = el("pulscheck-prog-fill");
    if (!fill) return;
    var pct = ((current + 1) / 9) * 100;
    fill.style.width = pct + "%";
  }

  function render(noFocus) {
    var q = questions[current];
    el("pulscheck-q-counter").textContent =
      "Frage " + (current + 1) + " von 9";
    el("pulscheck-q-dim").textContent = q.dimension;
    el("pulscheck-dim-tag").textContent = q.dimension;
    el("pulscheck-q-text").textContent = q.q;
    setProgress();

    var list = el("pulscheck-options");
    list.innerHTML = "";
    q.options.forEach(function (opt, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "pulscheck-option" + (answers[current] === i ? " is-selected" : "");
      btn.setAttribute(
        "aria-pressed",
        answers[current] === i ? "true" : "false",
      );
      btn.innerHTML =
        '<span class="pulscheck-opt-label">' +
        STAGE_LABEL[opt.score] +
        '</span><span class="pulscheck-opt-text">' +
        opt.text +
        "</span>";
      btn.addEventListener("click", function () {
        selectOption(i);
      });
      list.appendChild(btn);
    });

    var nextBtn = el("pulscheck-btn-next");
    nextBtn.textContent =
      current === 8 ? "Zum Ergebnis" : "Weiter";
    var answered = answers[current] !== null;
    nextBtn.disabled = !answered;
    nextBtn.classList.toggle("is-active", answered);
    el("pulscheck-btn-back").style.visibility = current === 0 ? "hidden" : "visible";

    renderLiveAnnouncement();
    if (!noFocus) {
      el("pulscheck-q-text").focus({ preventScroll: true });
    }
  }

  function selectOption(index) {
    clearPending();
    answers[current] = index;
    document.querySelectorAll(".pulscheck-option").forEach(function (b, idx) {
      b.classList.toggle("is-selected", idx === index);
      b.setAttribute("aria-pressed", idx === index ? "true" : "false");
    });
    var nextBtn = el("pulscheck-btn-next");
    nextBtn.classList.add("is-active");
    nextBtn.disabled = false;

    pendingTimer = setTimeout(function () {
      pendingTimer = null;
      if (current === 8) {
        transitionToResults();
      } else {
        runStepTransition(function () {
          current++;
          render(false);
        });
      }
    }, AUTO_ADVANCE);
  }

  function runStepTransition(afterOut) {
    var stepBody = el("pulscheck-step-body");
    if (!stepBody || reduceMotion) {
      afterOut();
      return;
    }
    stepBody.classList.add("pulscheck-step--out");
    setTimeout(function () {
      afterOut();
      stepBody.classList.remove("pulscheck-step--out");
      stepBody.classList.add("pulscheck-step--in");
      setTimeout(function () {
        stepBody.classList.remove("pulscheck-step--in");
      }, 380);
    }, DURATION_OUT);
  }

  function buildMailto(scaled, levelLabel) {
    var subject =
      "KI Puls-Check — " + levelLabel + " (" + scaled + "/100)";
    var body =
      "Hallo Apex Partners,\n\n" +
      "mein KI Puls-Check Ergebnis: " +
      scaled +
      "/100 (" +
      levelLabel +
      ").\n\n" +
      "Ich möchte mein KI Puls-Check Ergebnis gern kurz mit Ihnen besprechen.\n\n" +
      "Viele Grüße";
    return (
      "mailto:kontakt@apexpartners.tech?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body)
    );
  }

  function fillResultsData() {
    var totalScore = answers.reduce(function (sum, ansIdx, qi) {
      return sum + (ansIdx !== null ? questions[qi].options[ansIdx].score : 0);
    }, 0);
    var scaled = Math.round((totalScore / (9 * 5)) * 100);
    var level =
      levels.find(function (l) {
        return scaled >= l.min && scaled <= l.max;
      }) || levels[0];

    el("pulscheck-res-label").textContent = level.label;
    el("pulscheck-res-desc").textContent = level.desc;
    el("pulscheck-score-num").textContent = String(scaled);

    var ring = el("pulscheck-ring-dash");
    if (ring) {
      ring.style.strokeDashoffset = "364.42";
      if (reduceMotion) {
        ring.style.strokeDashoffset = String(364.42 - (scaled / 100) * 364.42);
      } else {
        setTimeout(function () {
          ring.style.strokeDashoffset = String(
            364.42 - (scaled / 100) * 364.42,
          );
        }, 120);
      }
    }

    var dimScores = {};
    var dimMax = {};
    DIMENSIONS.forEach(function (d) {
      dimScores[d] = 0;
      dimMax[d] = 0;
    });
    questions.forEach(function (q, qi) {
      dimMax[q.dimension] += 5;
      if (answers[qi] !== null) {
        dimScores[q.dimension] += q.options[answers[qi]].score;
      }
    });

    var grid = el("pulscheck-dim-grid");
    grid.innerHTML = "";
    DIMENSIONS.forEach(function (d) {
      var pct = Math.round((dimScores[d] / dimMax[d]) * 100);
      var card = document.createElement("div");
      card.className = "pulscheck-dim-card";
      card.innerHTML =
        '<div class="pulscheck-dim-name">' +
        d +
        '</div><div class="pulscheck-dim-bar-track"><div class="pulscheck-dim-bar-fill" style="width:0%" data-pct="' +
        pct +
        '"></div></div><div class="pulscheck-dim-score-label">' +
        dimScores[d] +
        " / " +
        dimMax[d] +
        "</div>";
      grid.appendChild(card);
    });

    var delayBars = reduceMotion ? 0 : 200;
    setTimeout(function () {
      document.querySelectorAll(".pulscheck-dim-bar-fill").forEach(function (bar) {
        bar.style.width = bar.getAttribute("data-pct") + "%";
      });
    }, delayBars);

    var moves = movesByLevel[level.label] || movesByLevel["KI-neugierig"];
    el("pulscheck-moves").innerHTML = moves
      .map(function (m) {
        return (
          '<div class="pulscheck-move">' +
          moveIconMarkup(m.icon) +
          "<div><p class=\"pulscheck-move-title\">" +
          m.title +
          '</p><p class="pulscheck-move-body">' +
          m.body +
          "</p></div></div>"
        );
      })
      .join("");

    el("pulscheck-btn-contact").setAttribute(
      "href",
      buildMailto(scaled, level.label),
    );
    updateLiveRegion(
      "KI Puls-Check: " +
      scaled +
      " von 100 Punkten. Einordnung: " +
      level.label +
      ".",
    );
  }

  function transitionToResults() {
    clearPending();
    var quiz = el("pulscheck-quiz");
    var results = el("pulscheck-results");
    if (!reduceMotion) quiz.classList.add("pulscheck-quiz--out");
    setTimeout(function () {
      quiz.hidden = true;
      results.hidden = false;
      if (!reduceMotion) quiz.classList.remove("pulscheck-quiz--out");
      fillResultsData();
      var labelEl = el("pulscheck-res-label");
      if (labelEl) {
        labelEl.setAttribute("tabindex", "-1");
        labelEl.focus({ preventScroll: true });
      }
    }, DURATION_QUIZ_OUT);
  }

  function goForwardManual() {
    clearPending();
    if (answers[current] === null) return;
    if (current === 8) {
      transitionToResults();
      return;
    }
    runStepTransition(function () {
      current++;
      render(false);
    });
  }

  function goBack() {
    clearPending();
    if (current === 0) return;
    runStepTransition(function () {
      current--;
      render(false);
    });
  }

  function restart() {
    clearPending();
    current = 0;
    answers = Array(9).fill(null);
    var quiz = el("pulscheck-quiz");
    var results = el("pulscheck-results");
    results.hidden = true;
    quiz.hidden = false;
    quiz.classList.remove("pulscheck-quiz--out");
    render(false);
  }

  el("pulscheck-btn-next").addEventListener("click", goForwardManual);
  el("pulscheck-btn-back").addEventListener("click", goBack);
  el("pulscheck-btn-restart").addEventListener("click", restart);

  var modal = el("pulscheck-modal");
  var openBtn = el("pulscheck-open");
  var modalClose = el("pulscheck-modal-close");
  var lastFocusEl = null;

  function isFocusableVisible(node) {
    if (!node || !modal.contains(node)) return false;
    if (node.closest("[hidden]")) return false;
    var st = window.getComputedStyle(node);
    if (st.display === "none" || st.visibility === "hidden") return false;
    return true;
  }

  function getFocusableElements() {
    if (!modal || modal.hidden) return [];
    var sel =
      "button:not([disabled]), a[href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex='-1'])";
    return Array.prototype.filter.call(modal.querySelectorAll(sel), function (n) {
      return isFocusableVisible(n);
    });
  }

  function onModalKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key !== "Tab") return;
    var focusables = getFocusableElements();
    if (focusables.length === 0) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openModal() {
    if (!modal) return;
    lastFocusEl = document.activeElement;
    modal.removeAttribute("hidden");
    document.body.classList.add("pulscheck-modal-open");
    document.addEventListener("keydown", onModalKeydown);
    if (openBtn) openBtn.setAttribute("aria-expanded", "true");
    requestAnimationFrame(function () {
      var qt = el("pulscheck-q-text");
      if (qt) qt.focus({ preventScroll: true });
    });
  }

  function closeModal() {
    if (!modal) return;
    clearPending();
    modal.setAttribute("hidden", "");
    document.body.classList.remove("pulscheck-modal-open");
    document.removeEventListener("keydown", onModalKeydown);
    if (openBtn) openBtn.setAttribute("aria-expanded", "false");
    if (lastFocusEl && typeof lastFocusEl.focus === "function") {
      lastFocusEl.focus({ preventScroll: true });
    }
    lastFocusEl = null;
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal) {
    var closeEls = modal.querySelectorAll("[data-pulscheck-close]");
    for (var ci = 0; ci < closeEls.length; ci++) {
      closeEls[ci].addEventListener("click", closeModal);
    }
  }

  render(true);
})();
