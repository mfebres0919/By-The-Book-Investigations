/* ==========================================================================
   global.js: behavior shared by every page
   1. Phone menu   2. Back-to-top button   3. Tabs   4. Reveal on scroll   5. Footer year   6. Counting numbers
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


/* ---------- 4. Reveal on scroll ----------
   Three jobs:
   a) split headings marked data-split into words or letters, so they can arrive one by one;
   b) number the children of each data-reveal-group, so they arrive one after another;
   c) watch every marked element and add "is-in" when it scrolls into view.
   The class "js" on <html> is what lets the CSS hide things first. It is only added once we
   know the browser can do the watching, so content can never be left hidden. */
(function () {
  if (!('IntersectionObserver' in window)) return;     // very old browser: leave everything visible
  var root = document.documentElement;

  // a) Split headings. The full text goes in aria-label and the pieces are hidden from
  //    screen readers, so the heading is still read as one normal sentence.
  function splitNode(node, mode, counter) {
    Array.prototype.slice.call(node.childNodes).forEach(function (child) {
      if (child.nodeType === 1) { splitNode(child, mode, counter); return; }   // an element such as <span class="nowrap">
      if (child.nodeType !== 3) return;
      var frag = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach(function (piece) {
        if (!piece) return;
        if (/^\s+$/.test(piece)) { frag.appendChild(document.createTextNode(' ')); return; }
        var word = document.createElement('span');
        word.setAttribute('aria-hidden', 'true');
        if (mode === 'letters') {
          word.className = 'split__word';
          piece.split('').forEach(function (letter) {
            var span = document.createElement('span');
            span.className = 'split__part';
            span.style.setProperty('--i', counter.n++);
            span.textContent = letter;
            word.appendChild(span);
          });
        } else {
          word.className = 'split__part';
          word.style.setProperty('--i', counter.n++);
          word.textContent = piece;
        }
        frag.appendChild(word);
      });
      node.replaceChild(frag, child);
    });
  }
  var splits = document.querySelectorAll('[data-split]');
  Array.prototype.forEach.call(splits, function (el) {
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    splitNode(el, el.getAttribute('data-split'), { n: 0 });
  });

  // b) Children of a group arrive in order: the first has no delay, the second one step, and so on.
  Array.prototype.forEach.call(document.querySelectorAll('[data-reveal-group]'), function (group) {
    var n = 0;
    Array.prototype.forEach.call(group.children, function (child) {
      if (child.hasAttribute('data-reveal')) child.style.setProperty('--d', n++);
    });
  });

  // c) Watch for elements entering the screen.
  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('is-in');
      watcher.unobserve(el);                            // each element animates once
      // When it has settled, remove the reveal attributes so they can't interfere with
      // the element's own hover effects (the step cards lift on hover, for example).
      if (el.hasAttribute('data-reveal')) {
        var delay = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
        window.setTimeout(function () {
          el.removeAttribute('data-reveal');
          el.classList.remove('is-in');
        }, 700 + delay * 110);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  root.classList.add('js');
  Array.prototype.forEach.call(document.querySelectorAll('[data-reveal], [data-split]'), function (el) {
    watcher.observe(el);
  });
})();

/* ---------- 5. Footer year ----------
   Keeps the copyright year current without anyone editing the page each January. */
(function () {
  var year = String(new Date().getFullYear());
  Array.prototype.forEach.call(document.querySelectorAll('.js-year'), function (el) { el.textContent = year; });
})();

/* ---------- 6. Counting numbers ----------
   A span marked data-count="2000" counts up from 0 to that number once, when it scrolls into
   view. The page already contains the finished figure, so with JavaScript off (or "reduce
   motion" on) the visitor simply sees the final number. */
(function () {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function run(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var length = 1200;                       // milliseconds the count takes
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / length, 1);          // 0 to 1, at a steady (linear) pace
      el.textContent = Math.round(target * progress).toLocaleString('en-US') + suffix;
      if (progress < 1) window.requestAnimationFrame(frame);
    }
    el.textContent = '0' + suffix;
    window.requestAnimationFrame(frame);
  }

  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      watcher.unobserve(entry.target);
      run(entry.target);
    });
  }, { threshold: 0.6 });

  Array.prototype.forEach.call(counters, function (el) { watcher.observe(el); });
})();
