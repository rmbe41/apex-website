(function () {
  var reduceMotion =
    typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DURATION_OUT = reduceMotion ? 0 : 220;
  var DURATION_QUIZ_OUT = reduceMotion ? 0 : 280;
  var AUTO_ADVANCE = reduceMotion ? 80 : 340;

  function pcData() {
    return window.ApexI18n ? window.ApexI18n.getPulscheck() : null;
  }

  function t(key) {
    return window.ApexI18n ? window.ApexI18n.get(key) : "";
  }

  function fmt(template, vars) {
    if (!template) return "";
    return template.replace(/\{\{(\w+)\}\}/g, function (_, k) {
      return vars[k] != null ? String(vars[k]) : "";
    });
  }

  function questions() {
    var d = pcData();
    return d && d.questions ? d.questions : [];
  }

  function levels() {
    var d = pcData();
    return d && d.levels ? d.levels : [];
  }

  function dimensions() {
    var d = pcData();
    return d && d.DIMENSIONS ? d.DIMENSIONS : [];
  }

  function stageLabels() {
    var d = pcData();
    return d && d.STAGE_LABEL ? d.STAGE_LABEL : [];
  }

  function movesForLevel(label) {
    var d = pcData();
    if (!d || !d.movesByLevel) return [];
    return d.movesByLevel[label] || [];
  }

  function collaborationForLevel(label) {
    var d = pcData();
    if (!d || !d.collaborationByLevel) return [];
    return d.collaborationByLevel[label] || [];
  }

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
  var lastResults = null;
  var leadSubmitting = false;

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
    var qs = questions();
    var q = qs[current];
    if (!q) return;
    updateLiveRegion(
      fmt(t("pulscheck.modal.liveQuestion"), {
        n: current + 1,
        dim: q.dimension,
        q: q.q,
      }),
    );
  }

  function setProgress() {
    var fill = el("pulscheck-prog-fill");
    if (!fill) return;
    var pct = ((current + 1) / 9) * 100;
    fill.style.width = pct + "%";
  }

  function render(noFocus) {
    var qs = questions();
    var q = qs[current];
    if (!q) return;
    var labels = stageLabels();
    el("pulscheck-q-counter").textContent = fmt(t("pulscheck.modal.questionCounter"), {
      n: current + 1,
    });
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
        labels[opt.score] +
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
      current === 8 ? t("pulscheck.modal.nextFinal") : t("pulscheck.modal.next");
    var answered = answers[current] !== null;
    nextBtn.disabled = !answered;
    nextBtn.classList.toggle("is-active", answered);
    el("pulscheck-btn-back").style.visibility = current === 0 ? "hidden" : "visible";

    var quizEl = el("pulscheck-quiz");
    if (quizEl) quizEl.classList.toggle("pulscheck-quiz--started", current > 0);

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
    var mailto = pcData() && pcData().mailto ? pcData().mailto : {};
    var subject = fmt(mailto.subject, { label: levelLabel, score: scaled });
    var body = fmt(mailto.body, { label: levelLabel, score: scaled });
    return (
      "mailto:info@apexpartners.tech?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body)
    );
  }

  function computeResults() {
    var qs = questions();
    var totalScore = answers.reduce(function (sum, ansIdx, qi) {
      return sum + (ansIdx !== null ? qs[qi].options[ansIdx].score : 0);
    }, 0);
    var scaled = Math.round((totalScore / (9 * 5)) * 100);
    var level =
      levels().find(function (l) {
        return scaled >= l.min && scaled <= l.max;
      }) || levels()[0];

    var dimScores = {};
    var dimMax = {};
    dimensions().forEach(function (d) {
      dimScores[d] = 0;
      dimMax[d] = 0;
    });
    qs.forEach(function (q, qi) {
      dimMax[q.dimension] += 5;
      if (answers[qi] !== null) {
        dimScores[q.dimension] += q.options[answers[qi]].score;
      }
    });

    return {
      scaled: scaled,
      level: level,
      dimScores: dimScores,
      dimMax: dimMax,
    };
  }

  function leadEndpoint() {
    return window.APEX_PULSCHECK_LEAD && window.APEX_PULSCHECK_LEAD.endpoint;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setLeadError(message) {
    var err = el("pulscheck-lead-error");
    if (!err) return;
    if (message) {
      err.textContent = message;
      err.hidden = false;
    } else {
      err.textContent = "";
      err.hidden = true;
    }
  }

  function setLeadSubmitting(active) {
    leadSubmitting = active;
    var btn = el("pulscheck-lead-submit");
    var input = el("pulscheck-lead-email");
    if (btn) {
      btn.disabled = active;
      btn.textContent = active
        ? t("pulscheck.modal.leadSubmitting")
        : t("pulscheck.modal.leadSubmit");
    }
    if (input) input.disabled = active;
  }

  function resetLeadCapture() {
    var formWrap = el("pulscheck-lead-form-wrap");
    var success = el("pulscheck-lead-success");
    var form = el("pulscheck-lead-form");
    if (form) form.reset();
    setLeadError("");
    setLeadSubmitting(false);
    if (formWrap) formWrap.hidden = false;
    if (success) success.hidden = true;
  }

  function buildLeadPayload(email) {
    var result = lastResults;
    var lang = window.ApexI18n ? window.ApexI18n.getLang() : "de";
    var dimRows = dimensions().map(function (d) {
      return {
        name: d,
        score: result.dimScores[d],
        max: result.dimMax[d],
        pct: Math.round((result.dimScores[d] / result.dimMax[d]) * 100),
      };
    });
    var nextSteps = movesForLevel(result.level.label).map(function (m) {
      return { title: m.title, body: m.body };
    });
    var collaborationSteps = collaborationForLevel(result.level.label).map(function (c) {
      return { title: c.title, body: c.body };
    });

    return {
      email: email,
      score: result.scaled,
      classification: result.level.label,
      summary: result.level.desc,
      collaborationSteps: collaborationSteps,
      dimensions: dimRows,
      nextSteps: nextSteps,
      language: lang,
      source: "pulscheck",
    };
  }

  function submitLeadCapture(payload) {
    var endpoint = leadEndpoint();
    if (!endpoint || !lastResults) {
      return Promise.reject(new Error("missing-endpoint"));
    }

    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    }).then(function (res) {
      if (!res.ok) throw new Error("submit-failed");
      return res.json().catch(function () {
        return {};
      });
    });
  }

  function onLeadSubmit(e) {
    e.preventDefault();
    if (leadSubmitting) return;

    var form = el("pulscheck-lead-form");
    var honey = form && form.querySelector('[name="_honey"]');
    if (honey && honey.value) return;

    var input = el("pulscheck-lead-email");
    var email = input ? input.value.trim() : "";
    setLeadError("");

    if (!isValidEmail(email)) {
      setLeadError(t("pulscheck.modal.leadErrorInvalid"));
      if (input) input.focus({ preventScroll: true });
      return;
    }

    var payload = buildLeadPayload(email);
    if (form) {
      var honeyField = form.querySelector('[name="_honey"]');
      if (honeyField && honeyField.value) {
        payload.honeypot = honeyField.value;
      }
    }

    setLeadSubmitting(true);
    submitLeadCapture(payload)
      .then(function () {
        var formWrap = el("pulscheck-lead-form-wrap");
        var success = el("pulscheck-lead-success");
        if (formWrap) formWrap.hidden = true;
        if (success) success.hidden = false;
        setLeadSubmitting(false);
      })
      .catch(function () {
        setLeadSubmitting(false);
        setLeadError(t("pulscheck.modal.leadErrorGeneric"));
      });
  }

  function fillResultsData() {
    var result = computeResults();
    lastResults = result;
    var scaled = result.scaled;
    var level = result.level;
    var dimScores = result.dimScores;
    var dimMax = result.dimMax;

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

    var grid = el("pulscheck-dim-grid");
    grid.innerHTML = "";
    dimensions().forEach(function (d) {
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

    var moves = movesForLevel(level.label);
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

    var collabWrap = el("pulscheck-collaboration");
    var collabList = el("pulscheck-collaboration-items");
    var collabItems = collaborationForLevel(level.label);
    if (collabWrap && collabList) {
      if (collabItems.length) {
        collabList.innerHTML = collabItems
          .map(function (item, index) {
            return (
              '<div class="pulscheck-move pulscheck-collab-move">' +
              '<span class="pulscheck-collab-num" aria-hidden="true">' +
              (index + 1) +
              "</span>" +
              '<div><p class="pulscheck-move-title">' +
              item.title +
              '</p><p class="pulscheck-move-body">' +
              item.body +
              "</p></div></div>"
            );
          })
          .join("");
        collabWrap.hidden = false;
      } else {
        collabList.innerHTML = "";
        collabWrap.hidden = true;
      }
    }

    el("pulscheck-btn-contact").setAttribute(
      "href",
      buildMailto(scaled, level.label),
    );
    updateLiveRegion(
      fmt(t("pulscheck.modal.liveResult"), {
        score: scaled,
        label: level.label,
      }),
    );
    resetLeadCapture();
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
      results.scrollTop = 0;
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

  el("pulscheck-btn-next").addEventListener("click", goForwardManual);
  el("pulscheck-btn-back").addEventListener("click", goBack);
  var leadForm = el("pulscheck-lead-form");
  if (leadForm) leadForm.addEventListener("submit", onLeadSubmit);

  var modal = el("pulscheck-modal");
  var openBtn = el("pulscheck-open");
  var previewOpen = document.querySelector(".pulscheck-preview-open");
  var modalClose = el("pulscheck-modal-close");
  var lastFocusEl = null;

  function setOpenExpanded(expanded) {
    if (openBtn) openBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
    if (previewOpen) previewOpen.setAttribute("aria-expanded", expanded ? "true" : "false");
  }

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
    setOpenExpanded(true);
    var results = el("pulscheck-results");
    if (results) results.scrollTop = 0;
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
    setOpenExpanded(false);
    if (lastFocusEl && typeof lastFocusEl.focus === "function") {
      lastFocusEl.focus({ preventScroll: true });
    }
    lastFocusEl = null;
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (previewOpen) previewOpen.addEventListener("click", openModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal) {
    var closeEls = modal.querySelectorAll("[data-pulscheck-close]");
    for (var ci = 0; ci < closeEls.length; ci++) {
      closeEls[ci].addEventListener("click", closeModal);
    }
  }

  function bootQuiz() {
    render(true);
  }

  function start() {
    if (window.ApexI18n && window.ApexI18n.whenReady) {
      window.ApexI18n.whenReady(bootQuiz);
    } else {
      bootQuiz();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  document.addEventListener("languagechange", function () {
    var results = el("pulscheck-results");
    if (results && !results.hidden) {
      fillResultsData();
    } else {
      render(true);
    }
  });
})();
