(function () {
  "use strict";

  function assetRoot() {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].getAttribute("src");
      if (src && src.indexOf("site-nav.js") !== -1) {
        return src.replace(/site-nav\.js(\?.*)?$/, "");
      }
    }
    return "";
  }

  var root = assetRoot();
  var header = document.getElementById("header");
  var toggle = document.querySelector(".nav-toggle");
  var mobile = document.getElementById("mobile-nav");
  var headerLogo = document.getElementById("header-logo");
  var logoSrcWhite = root + "assets/brand/Apex%20Partners%20-%20Logo%20White.svg";
  var logoSrcNavy = root + "assets/brand/Apex%20Partners%20-%20Logo%20Navy.svg";

  function bandUnderNav() {
    if (!header) return "light";
    var navRect = header.getBoundingClientRect();
    var x = Math.min(window.innerWidth - 4, Math.max(4, window.innerWidth / 2));
    var y = Math.min(window.innerHeight - 4, navRect.bottom + 6);
    var el = document.elementFromPoint(x, y);
    var guard = 0;
    while (el && guard++ < 50) {
      if (el.classList) {
        if (el.classList.contains("band--dark")) return "dark";
        if (el.classList.contains("band--light")) return "light";
      }
      el = el.parentElement;
    }
    var probeY = Math.min(window.innerHeight - 2, navRect.bottom + 12);
    var bands = document.querySelectorAll(".band");
    for (var i = 0; i < bands.length; i++) {
      var r = bands[i].getBoundingClientRect();
      if (probeY >= r.top && probeY < r.bottom && r.width > 0) {
        if (bands[i].classList.contains("band--dark")) return "dark";
        if (bands[i].classList.contains("band--light")) return "light";
      }
    }
    return "light";
  }

  function onScroll() {
    if (!header) return;
    var surface = bandUnderNav();
    header.classList.toggle("site-header--surface-dark", surface === "dark");
    header.classList.toggle("site-header--surface-light", surface === "light");
    if (headerLogo) {
      headerLogo.src = surface === "dark" ? logoSrcWhite : logoSrcNavy;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  if (toggle && mobile) {
    function menuAriaLabel(open) {
      if (window.ApexI18n) {
        return window.ApexI18n.get(open ? "nav.menuClose" : "nav.menuOpen");
      }
      return open ? "Menü schließen" : "Menü öffnen";
    }
    toggle.addEventListener("click", function () {
      var open = mobile.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", menuAriaLabel(open));
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", menuAriaLabel(false));
      });
    });
    document.addEventListener("languagechange", function () {
      var isOpen = mobile.classList.contains("is-open");
      toggle.setAttribute("aria-label", menuAriaLabel(isOpen));
    });
  }
})();
