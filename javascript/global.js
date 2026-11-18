/* ==========================================================================
   global.js: behavior shared by every page
   1. Phone menu   2. Back-to-top button   3. Tabs
   Loaded with "defer", so the HTML is ready by the time this runs.
   ========================================================================== */

/* ---------- 1. Phone menu ----------
   The button adds or removes the class "nav-open" on <html>.
   All of the animation lives in global.css; JavaScript only flips the class. */
(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  // Matches the desktop breakpoint in global.css (62rem)
  var desktop = window.matchMedia('(min-width: 62rem)');

  function setMenu(open) {
    root.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function isOpen() {
    return root.classList.contains('nav-open');
  }

  toggle.addEventListener('click', function () {
    setMenu(!isOpen());
  });

  // Escape closes the menu and puts focus back on the button
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Tapping a link closes the menu (matters for same-page links such as #contact)
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenu(false);
  });

  // If the window grows to desktop size while the menu is open, close it
  desktop.addEventListener('change', function (event) {
    if (event.matches) setMenu(false);
  });
})();

/* ---------- 2. Back-to-top button ----------
   Hidden at the top of the page; appears after scrolling about 60% of one screen. */
(function () {
  var button = document.querySelector('.back-to-top');
  if (!button) return;

  var waiting = false;

  function update() {
    button.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    waiting = false;
  }

  // requestAnimationFrame limits the check to once per screen refresh
  window.addEventListener('scroll', function () {
    if (!waiting) {
      waiting = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });

  update();
})();

/* ---------- 3. Tabs ----------
   Works for any block marked data-tabs (the three pillars on the homepage).
   Without this script every panel simply shows. With it: the row of tab buttons is revealed
   and one panel shows at a time. Click a tab, or use the arrow keys, Home and End. */
(function () {
  var groups = document.querySelectorAll('[data-tabs]');

  Array.prototype.forEach.call(groups, function (group) {
    var list = group.querySelector('[role="tablist"]');
    var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
    if (!list || !tabs.length) return;

    function select(tab, moveFocus) {
      tabs.forEach(function (other) {
        var active = other === tab;
        other.setAttribute('aria-selected', active ? 'true' : 'false');
        other.tabIndex = active ? 0 : -1;        // only the open tab is in the Tab-key order
        var panel = document.getElementById(other.getAttribute('aria-controls'));
        if (panel) panel.classList.toggle('is-active', active);
      });
      if (moveFocus) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { select(tab, false); });

      tab.addEventListener('keydown', function (event) {
        var next = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = tabs[(index + 1) % tabs.length];
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = tabs[(index - 1 + tabs.length) % tabs.length];
        if (event.key === 'Home') next = tabs[0];
        if (event.key === 'End') next = tabs[tabs.length - 1];
        if (next) { event.preventDefault(); select(next, true); }
      });
    });

    list.hidden = false;                 // show the tab buttons
    group.classList.add('is-ready');     // switch the CSS from "show everything" to "one at a time"
  });
})();
