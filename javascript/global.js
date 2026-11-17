/* ==========================================================================
   global.js: behavior shared by every page
   1. Phone menu   2. Back-to-top button
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
