(function () {
  "use strict";

  var STORAGE_KEY = "apex-lang";
  var SUPPORTED = ["de", "en"];
  var CONTENT_BASE = "content/";
  var currentLang = "de";
  var translations = null;
  var ready = false;
  var readyWaiters = [];

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
    if (!translations) return undefined;
    return resolve(translations[currentLang], key);
  }

  function getPulscheck() {
    if (!translations) return null;
    var block = translations[currentLang];
    return block && block.pulscheck ? block.pulscheck.data : null;
  }

  function apply() {
    if (!translations) return;
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

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var val = get(el.getAttribute("data-i18n-placeholder"));
      if (val != null) el.setAttribute("placeholder", val);
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

  function markReady() {
    ready = true;
    readyWaiters.forEach(function (fn) {
      fn();
    });
    readyWaiters = [];
    document.dispatchEvent(new CustomEvent("i18nready"));
  }

  function whenReady(fn) {
    if (ready) fn();
    else readyWaiters.push(fn);
  }

  function loadTranslations() {
    return Promise.all(
      SUPPORTED.map(function (lang) {
        return fetch(CONTENT_BASE + lang + ".json")
          .then(function (res) {
            if (!res.ok) throw new Error("Failed to load " + lang + ".json");
            return res.json();
          })
          .then(function (data) {
            return { lang: lang, data: data };
          });
      }),
    ).then(function (entries) {
      translations = {};
      entries.forEach(function (entry) {
        translations[entry.lang] = entry.data;
      });
    });
  }

  window.ApexI18n = {
    getLang: getLang,
    setLang: setLang,
    get: get,
    getPulscheck: getPulscheck,
    apply: apply,
    whenReady: whenReady,
  };

  loadStoredLang();

  function onReady() {
    loadTranslations()
      .then(function () {
        apply();
        initLangToggle();
        markReady();
      })
      .catch(function (err) {
        console.error("[i18n] Could not load content JSON:", err);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();
