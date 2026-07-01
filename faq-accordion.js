(function () {
  "use strict";

  var CHEVRON =
    '<svg class="site-faq__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">' +
    '<path d="M2.5 4.25L6 7.75L9.5 4.25" stroke="currentColor" stroke-width="1.25" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function closeItem(item) {
    item.classList.remove("is-open");
    var trigger = item.querySelector(".site-faq__trigger");
    var panel = item.querySelector(".site-faq__panel");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    if (panel) panel.hidden = true;
  }

  function openItem(item) {
    item.classList.add("is-open");
    var trigger = item.querySelector(".site-faq__trigger");
    var panel = item.querySelector(".site-faq__panel");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    if (panel) panel.hidden = false;
  }

  function bindFaq(list) {
    if (!list || list._apexFaqBound) return;
    list._apexFaqBound = true;

    var items = list.querySelectorAll(".site-faq__item");
    items.forEach(function (item) {
      var trigger = item.querySelector(".site-faq__trigger");
      if (!trigger) return;

      trigger.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        items.forEach(closeItem);
        if (!isOpen) openItem(item);
      });
    });
  }

  function renderFaq(root, data) {
    if (!root) return;

    if (!data || !Array.isArray(data.items) || !data.items.length) {
      root.innerHTML = "";
      root.hidden = true;
      return;
    }

    root.hidden = false;
    var html = '<div class="site-faq__list">';

    data.items.forEach(function (item, idx) {
      var triggerId = "site-faq-trigger-" + idx;
      var panelId = "site-faq-panel-" + idx;
      html +=
        '<div class="site-faq__item">' +
        '<button type="button" class="site-faq__trigger" id="' +
        triggerId +
        '" aria-expanded="false" aria-controls="' +
        panelId +
        '">' +
        '<span class="site-faq__question">' +
        escapeHtml(item.question) +
        "</span>" +
        '<span class="site-faq__icon">' +
        CHEVRON +
        "</span></button>" +
        '<div class="site-faq__panel" id="' +
        panelId +
        '" role="region" aria-labelledby="' +
        triggerId +
        '" hidden>' +
        '<div class="site-faq__answer"><p>' +
        escapeHtml(item.answer) +
        "</p></div></div></div>";
    });

    html += "</div>";
    root.innerHTML = html;
    bindFaq(root.querySelector(".site-faq__list"));
  }

  function init() {
    var root = document.getElementById("home-faq");
    if (!root) return;
    var data = window.ApexI18n ? window.ApexI18n.get("homeFaq") : null;
    renderFaq(root, data);
  }

  function onReady() {
    if (window.ApexI18n && window.ApexI18n.whenReady) {
      window.ApexI18n.whenReady(init);
    } else {
      init();
    }
    document.addEventListener("languagechange", init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();
