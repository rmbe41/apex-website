(function () {
  "use strict";

  var CAL_UI = {
    theme: "dark",
    cssVarsPerTheme: {
      dark: {
        "cal-brand": "#fafafa",
        "cal-brand-text": "#0a1f33",
        "cal-brand-emphasis": "#e2e8f0",
        "cal-bg": "#0a1f33",
        "cal-bg-emphasis": "#0f2d4a",
        "cal-border": "rgba(255, 255, 255, 0.08)",
        "cal-border-booker": "rgba(255, 255, 255, 0.1)",
        "cal-text": "rgba(248, 250, 252, 0.92)",
        "cal-text-emphasis": "#f8fafc",
        "cal-text-subtle": "rgba(248, 250, 252, 0.55)",
        "radius-md": "10px",
        "radius-lg": "14px",
      },
    },
    hideEventTypeDetails: false,
    layout: "month_view",
    styles: {
      body: {
        background: "transparent",
      },
    },
  };

  function el(id) {
    return document.getElementById(id);
  }

  var modal = el("booking-modal");
  var modalClose = el("booking-modal-close");
  var calRoot = el("my-cal-inline-30min");
  var calInitialized = false;
  var lastFocusEl = null;
  var calObserver = null;

  function hideCalBranding() {
    if (!calRoot) return;
    var links = calRoot.querySelectorAll('a[href*="cal.eu"], a[href*="cal.com"]');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var label = (link.textContent || link.getAttribute("href") || "").toLowerCase();
      if (label.indexOf("cal.com") === -1 && label.indexOf("cal.eu") === -1) continue;
      var host = link.closest("[class*='footer'], [class*='branding'], [data-testid*='powered']");
      if (host) {
        host.style.display = "none";
      } else {
        link.style.display = "none";
      }
    }
  }

  function watchCalEmbed() {
    if (!calRoot || calObserver) return;
    hideCalBranding();
    calObserver = new MutationObserver(hideCalBranding);
    calObserver.observe(calRoot, { childList: true, subtree: true });
  }

  function initCalEmbed() {
    if (calInitialized) return;
    calInitialized = true;

    (function (C, A, L) {
      var p = function (a, ar) {
        a.q.push(ar);
      };
      var d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          var cal = C.Cal;
          var ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            var api = function () {
              p(api, arguments);
            };
            var namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.eu/embed/embed.js", "init");

    Cal("init", "30min", { origin: "https://app.cal.eu" });
    Cal.ns["30min"]("inline", {
      elementOrSelector: "#my-cal-inline-30min",
      config: {
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
        theme: "dark",
      },
      calLink: "apexpartners/30min",
    });
    Cal.ns["30min"]("ui", CAL_UI);
    watchCalEmbed();
  }

  function onModalKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }
  }

  function openModal(e) {
    if (e) e.preventDefault();
    if (!modal) return;
    lastFocusEl = document.activeElement;
    initCalEmbed();
    modal.removeAttribute("hidden");
    document.body.classList.add("booking-modal-open");
    document.addEventListener("keydown", onModalKeydown);
    requestAnimationFrame(function () {
      hideCalBranding();
      if (modalClose) modalClose.focus({ preventScroll: true });
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute("hidden", "");
    document.body.classList.remove("booking-modal-open");
    document.removeEventListener("keydown", onModalKeydown);
    if (lastFocusEl && typeof lastFocusEl.focus === "function") {
      lastFocusEl.focus({ preventScroll: true });
    }
    lastFocusEl = null;
  }

  document.querySelectorAll("[data-booking-open]").forEach(function (btn) {
    btn.addEventListener("click", openModal);
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal) {
    var closeEls = modal.querySelectorAll("[data-booking-close]");
    for (var i = 0; i < closeEls.length; i++) {
      closeEls[i].addEventListener("click", closeModal);
    }
  }
})();
