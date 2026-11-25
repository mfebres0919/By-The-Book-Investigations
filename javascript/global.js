/* ==========================================================================
   global.js: behavior shared by every page
   1. Phone menu   2. Back-to-top button   3. Tabs   4. Reveal on scroll   5. Footer year   6. Counting numbers   7. Smooth questions   8. Hero lines   9. CLEAR marks   10. Contact form
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
   c) watch every marked element and add "is-in" when it scrolls into view
      (or, for a data-reveal-together group, reveal everything inside it at once);
   d) add "is-drawn" where a data-draw element scrolls into view, for lines that draw themselves.
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
  //    show() reveals one element. When it has settled, the reveal attributes are removed so
  //    they can't interfere with the element's own hover effects (the step cards lift on
  //    hover, for example).
  function show(el) {
    el.classList.add('is-in');
    if (!el.hasAttribute('data-reveal')) return;
    var delay = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
    window.setTimeout(function () {
      el.removeAttribute('data-reveal');
      el.classList.remove('is-in');
    }, 700 + delay * 110);
  }
  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      watcher.unobserve(el);                            // each element animates once
      if (el.hasAttribute('data-reveal-together')) {
        // a "together" group: reveal everything inside it at the same moment
        Array.prototype.forEach.call(el.querySelectorAll('[data-reveal]'), show);
      } else {
        show(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  // d) Lines that draw themselves. An element marked data-draw is a tripwire: when it scrolls
  //    into view, the class "is-drawn" is added (and kept), and the CSS draws the lines.
  //    data-draw=".standard" puts the class on the nearest ancestor matching that selector;
  //    plain data-draw puts it on the element itself.
  var drawWatcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var selector = el.getAttribute('data-draw');
      var target = selector ? el.closest(selector) : el;
      if (target) target.classList.add('is-drawn');
      drawWatcher.unobserve(el);
    });
  }, { threshold: 0.35 });
  Array.prototype.forEach.call(document.querySelectorAll('[data-draw]'), function (el) { drawWatcher.observe(el); });

  root.classList.add('js');
  Array.prototype.forEach.call(document.querySelectorAll('[data-reveal], [data-split], [data-reveal-together]'), function (el) {
    // things inside a "together" group are not watched one by one: their group is watched instead
    if (el.hasAttribute('data-reveal') && el.closest('[data-reveal-together]')) return;
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

/* ---------- 7. Smooth questions (the accordion) ----------
   A <details> element opens and closes by itself, but in one jump. This makes it slide.
   The slide itself is CSS (styles.css, "Smooth open and close"); this script only adds or
   removes the class "is-open" at the right moment:
     opening: show the answer (open = true), then add the class so it slides down;
     closing: remove the class so it slides up, and only then hide it (open = false).
   With "reduce motion" on, the script does nothing and the browser's own instant
   open and close is used. */
(function () {
  var items = document.querySelectorAll('.faq__item');
  if (!items.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // No sliding: keep the class in step with the browser's own open/close, so the plus sign is right
    Array.prototype.forEach.call(items, function (item) {
      item.addEventListener('toggle', function () { item.classList.toggle('is-open', item.open); });
    });
    return;
  }

  var LENGTH = 300;   // milliseconds; matches the 0.3s in styles.css

  Array.prototype.forEach.call(items, function (item) {
    var summary = item.querySelector('summary');
    var timer = null;
    if (!summary) return;

    summary.addEventListener('click', function (event) {
      event.preventDefault();          // stop the browser's instant open/close; we do it below
      window.clearTimeout(timer);

      if (item.classList.contains('is-open')) {
        // Close: slide up first, then really close it once the slide has finished
        item.classList.remove('is-open');
        timer = window.setTimeout(function () { item.open = false; }, LENGTH);
      } else {
        // Open: make the answer exist, then (one frame later) let it slide down
        item.open = true;
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () { item.classList.add('is-open'); });
        });
      }
    });
  });
})();

/* ---------- 8. Hero lines (homepage) ----------
   The drawing behind the hero text. It tells the firm's story in about four and a half seconds:
     1. SCATTERED  thin lines lie across the hero at different heights and angles (the accounts);
     2. GATHER     they are drawn together into one bundle;
     3. REVIEW     the bundle is combed straight, from the right-hand side towards the left;
     4. FINDING    one bright, level line is drawn along it.
   It plays once and then rests: a small tangle at the left edge feeding one straight line.
   At rest the tangle keeps swaying, very slowly, so the hero never looks frozen. Because that
   movement never ends, there is a small pause button in the corner of the hero (an
   accessibility rule: anything that moves for more than 5 seconds must be pausable), and the
   movement also stops by itself while the hero is scrolled out of view.

   How it works: every line is a row of points. Many times a second we work out where each
   point should be at that moment and hand the browser the new shape (the "d" of a <path>).
   Nothing here is truly random: the "random" numbers come from a fixed seed, so the drawing
   is the same picture on every visit.

   With "reduce motion" on, nothing moves: the resting picture is shown straight away and
   the pause button stays hidden. */
(function () {
  var svg = document.querySelector('.hero__lines');
  if (!svg) return;
  var group = svg.querySelector('.hero__threads');
  var finding = svg.querySelector('.hero__finding');
  var fade = svg.querySelector('#hero-finding-fade');
  if (!group || !finding || !fade) return;
  var pauseButton = document.querySelector('.hero__pause');

  // ----- Settings you can safely change -----
  var COUNT = 18;          // how many lines
  var POINTS = 150;        // points per line (more = smoother curves, a little more work)
  var SEED = 11;           // a different whole number gives a different arrangement
  var TIMES = {            // milliseconds from the start of the animation
    gatherLength: 1500,    // how long one line takes to join the bundle
    gatherSpread: 500,     // lines set off at different moments within this window
    combStart: 1200,       // the straightening starts...
    combEnd: 3800,         // ...and ends
    findingStart: 3500,    // the bright line starts...
    findingEnd: 4500       // ...and ends (keep the total under 5 seconds)
  };
  var START_DELAY = 200;   // a short wait after the page loads
  var SWAY = 0.22;         // how fast the resting tangle sways (0 = still; 0.22 is one slow rise and fall in roughly 20 to 30 seconds)

  // A small "random" number maker with a fixed starting point (gives 0 to 1)
  var seed = SEED;
  function random() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  // Describe each line once. The numbers are proportions, turned into pixels when drawing.
  var threads = [];
  var order = [];
  var i;
  for (i = 0; i < COUNT; i++) order.push(i);
  // Shuffle, so a line's starting height has nothing to do with its place in the bundle
  for (i = COUNT - 1; i > 0; i--) {
    var j = Math.floor(random() * (i + 1));
    var swap = order[i]; order[i] = order[j]; order[j] = swap;
  }
  for (i = 0; i < COUNT; i++) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'hero__thread');
    path.setAttribute('stroke-opacity', (0.2 + random() * 0.4).toFixed(2));
    group.appendChild(path);
    threads.push({
      path: path,
      startAt: 0.05 + 0.9 * (order[i] + random() * 0.8) / COUNT,  // scattered: how far down the hero (0 top, 1 bottom)
      tilt: (random() - 0.5) * 0.5,                               // scattered: how much it slopes
      fan: Math.pow(random(), 1.4) * 1.2 - 0.2,                   // resting tangle: how far above (+) or below (-) the level line it starts
      waves: [                                                    // two waves added together make an irregular curve
        { length: 260 + random() * 420, height: 0.08 + random() * 0.14, shift: random() * 6.283 },
        { length: 120 + random() * 160, height: 0.015 + random() * 0.04, shift: random() * 6.283 }
      ],
      delay: random()                                             // when it sets off (0 first, 1 last)
    });
  }

  var width = 0, height = 0, base = 0, up = 0, reach = 0;

  // Read the size of the hero and work out the measurements that depend on it
  function measure() {
    var box = svg.getBoundingClientRect();
    width = box.width;
    height = box.height;
    var phone = width < 768;
    base = height - (phone ? 44 : 60);                              // the level line: this far above the bottom
    up = phone ? Math.min(height * 0.2, 110) : Math.min(height * 0.5, 360);   // how tall the resting tangle is
    reach = phone ? 0.55 : 0.4;                                     // how far across the tangle reaches (0.4 = 40% of the width)
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);

    // The bright line starts where the tangle has all but closed, and fades in over its first stretch
    var from = width * reach * 0.86;
    finding.setAttribute('d', 'M' + from.toFixed(1) + ' ' + base.toFixed(1) + 'H' + width.toFixed(1));
    fade.setAttribute('x1', from.toFixed(1));
    fade.setAttribute('x2', (from + Math.min(260, width * 0.3)).toFixed(1));
  }

  function clamp(n) { return n < 0 ? 0 : n > 1 ? 1 : n; }
  function ease(n) { n = clamp(n); return n * n * (3 - 2 * n); }   // starts and stops gently, no bounce

  // Draw every line as it should look "time" milliseconds into the animation.
  // "sway" is the number of seconds the lines have been moving; it slides each wave sideways
  // a little, which is what makes the loose ends rise and fall. The straight part never moves.
  function draw(time, sway) {
    // "front" is how far the tangle still reaches: past the right edge at first, then back to its resting place
    var combed = ease((time - TIMES.combStart) / (TIMES.combEnd - TIMES.combStart));
    var front = (1 + reach) - combed;
    for (var t = 0; t < threads.length; t++) {
      var thread = threads[t];
      var gathered = ease((time - thread.delay * TIMES.gatherSpread) / TIMES.gatherLength);
      var fanTo = thread.fan > 0 ? -thread.fan * up : -thread.fan * 26;   // above the line it may climb; below, only a little
      var d = '';
      for (var p = 0; p <= POINTS; p++) {
        var across = p / POINTS;                 // 0 = left edge, 1 = right edge
        var x = across * width;
        // "loose" is 1 where the line is still free to wander and 0 where it has been combed straight
        var loose = Math.pow(clamp((front - across) / reach), 2.2);
        var wave = 0;
        for (var k = 0; k < thread.waves.length; k++) {
          // each line sways at its own speed, and its two waves slide in opposite directions
          var slide = sway * SWAY * (0.6 + thread.delay * 0.8) * (k ? -1.4 : 1);
          wave += Math.sin(x / thread.waves[k].length * 6.283 + thread.waves[k].shift + slide) * thread.waves[k].height;
        }
        var scattered = (thread.startAt + thread.tilt * (across - 0.5)) * height;
        var bundled = base + fanTo * loose;
        var y = scattered + (bundled - scattered) * gathered + wave * up * loose * (0.45 + 0.55 * Math.abs(thread.fan));
        d += (p ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
      thread.path.setAttribute('d', d);
    }
    var drawn = clamp((time - TIMES.findingStart) / (TIMES.findingEnd - TIMES.findingStart));
    finding.style.setProperty('--drawn', drawn.toFixed(3));
  }

  var END = TIMES.findingEnd;
  var clock = 0;          // how far into the opening animation we are (milliseconds)
  var swayClock = 0;      // how long the lines have been swaying (seconds)
  var last = null;        // the time of the previous frame
  var paused = false;     // true after the visitor presses the pause button
  var inView = true;      // false while the hero is scrolled off the screen
  var running = false;    // true while frames are being drawn
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function frame(now) {
    if (paused || !inView) { running = false; last = null; return; }
    // Count only real, visible time: if the tab was in the background, carry on from where it was
    if (last !== null) {
      var step = Math.min(now - last, 50);
      clock = Math.min(clock + step, END);
      swayClock += step / 1000;
    }
    last = now;
    draw(clock, swayClock);
    window.requestAnimationFrame(frame);
  }
  function start() {
    if (running || paused || !inView || still) return;
    running = true;
    window.requestAnimationFrame(frame);
  }

  measure();
  if (still) {
    clock = END;
    draw(END, 0);         // no movement: go straight to the resting picture
  } else {
    draw(0, 0);
    window.setTimeout(start, START_DELAY);
  }

  // The pause button: stops and restarts the movement, and changes its own label and icon
  if (pauseButton && !still) {
    pauseButton.hidden = false;
    pauseButton.addEventListener('click', function () {
      paused = !paused;
      pauseButton.classList.toggle('is-paused', paused);
      pauseButton.setAttribute('aria-label', paused ? 'Play background animation' : 'Pause background animation');
      start();
    });
  }

  // Stop drawing while the hero is off the screen (saves battery), and carry on when it returns
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      start();
    }).observe(svg);
  }

  // If the hero changes size (window resized, phone turned, fonts finish loading), redraw to fit
  if ('ResizeObserver' in window) {
    new ResizeObserver(function () {
      measure();
      draw(clock, swayClock);
    }).observe(svg);
  }
})();

/* ---------- 9. CLEAR marks (homepage) ----------
   Each of the five CLEAR marks draws itself the first time it scrolls into view: its five
   thin lines start loose and out of place, then settle into the mark's shape, and its accent
   (the brackets, the dot, the ring...) fades in at the end. When several marks are on screen
   together they go one after another, and the thin line joining one phase to the next grows
   once that phase's mark has finished. Each mark plays once and then stays still.

   The marks are complete drawings in the HTML, so this script only ADDS movement:
     1. it measures each finished line as a row of points;
     2. it invents a loose version of that line (the same points, pushed up and down);
     3. over about a second it slides every point from the loose place to the true place;
     4. at the end it puts the original, exact drawing back.
   With "reduce motion" on, or in a very old browser, it does nothing and the marks simply show. */
(function () {
  var list = document.querySelector('.clear');
  var marks = document.querySelectorAll('.clear__mark');
  if (!list || !marks.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ----- Settings you can safely change -----
  var LENGTH = 1100;   // milliseconds one mark takes to settle
  var GAP = 350;       // wait between one mark starting and the next
  var POINTS = 40;     // points measured along each line
  var LOOSE = 1;       // how far out of place the lines start (0.5 = half as far, 2 = twice as far)

  // The same fixed "random" number maker as the hero, so the loose shapes are the same every visit
  var seed = 23;
  function random() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }
  function clamp(n) { return n < 0 ? 0 : n > 1 ? 1 : n; }
  function ease(n) { n = clamp(n); return n * n * (3 - 2 * n); }   // starts and stops gently, no bounce

  // Steps 1 and 2: measure every line and give it a loose starting shape
  var prepared = Array.prototype.map.call(marks, function (mark) {
    var lines = Array.prototype.map.call(mark.querySelectorAll('.clear__line'), function (path) {
      var total = path.getTotalLength();
      var points = [];
      for (var p = 0; p <= POINTS; p++) points.push(path.getPointAtLength(total * p / POINTS));
      return {
        path: path,
        exact: path.getAttribute('d'),            // the true drawing, put back at the end
        points: points,
        shift: (random() - 0.5) * 34,             // moved up or down as a whole
        tilt: (random() - 0.5) * 40,              // and tipped
        waves: [                                  // and made wavy (two waves added together)
          { turns: 0.8 + random() * 1.2, height: 5 + random() * 8, start: random() * 6.283 },
          { turns: 2 + random() * 1.5, height: 2 + random() * 3, start: random() * 6.283 }
        ]
      };
    });
    return { mark: mark, step: mark.closest('.clear__step'), lines: lines };
  });

  // Step 3: draw one line "settled" of the way home (0 = fully loose, 1 = exactly in place)
  function shape(line, settled) {
    var loose = (1 - settled) * LOOSE;
    var d = '';
    for (var p = 0; p < line.points.length; p++) {
      var along = p / POINTS;
      var push = line.shift + line.tilt * (along - 0.5);
      for (var k = 0; k < line.waves.length; k++) {
        push += Math.sin(along * line.waves[k].turns * 6.283 + line.waves[k].start) * line.waves[k].height;
      }
      d += (p ? 'L' : 'M') + line.points[p].x.toFixed(2) + ' ' + (line.points[p].y + push * loose).toFixed(2);
    }
    line.path.setAttribute('d', d);
  }

  // Start every mark in its loose state, with its accent hidden, and hold back the joining lines
  list.classList.add('clear--animated');
  prepared.forEach(function (item) {
    item.mark.classList.add('is-waiting');
    item.lines.forEach(function (line) { shape(line, 0); });
  });

  function play(item) {
    var began = null;
    function frame(now) {
      if (began === null) began = now;
      var time = now - began;
      // the five lines set off a moment apart, so they don't move as one block
      item.lines.forEach(function (line, n) {
        shape(line, ease((time - n * 60) / (LENGTH - 240)));
      });
      if (time > LENGTH * 0.7) item.mark.classList.remove('is-waiting');   // the accent fades in
      if (time < LENGTH) { window.requestAnimationFrame(frame); return; }
      // Step 4: finished. Put the exact drawing back and let the joining line grow.
      item.lines.forEach(function (line) { line.path.setAttribute('d', line.exact); });
      if (item.step) item.step.classList.add('is-drawn');
    }
    window.requestAnimationFrame(frame);
  }

  // Watch for each mark coming into view. "nextFree" makes marks that arrive together take turns.
  var nextFree = 0;
  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      watcher.unobserve(entry.target);
      var item = prepared[Array.prototype.indexOf.call(marks, entry.target)];
      var now = performance.now();
      var startAt = Math.max(now, nextFree);
      nextFree = startAt + GAP;
      window.setTimeout(function () { play(item); }, startAt - now);
    });
  }, { threshold: 0.6 });
  Array.prototype.forEach.call(marks, function (mark) { watcher.observe(mark); });
})();

/* ---------- 10. Contact form (contact page) ----------
   The form is sent to Netlify Forms (see the notes above the form in contact/index.html).
   What this script adds:
   a) A link can choose the topic in advance: contact/?topic=investigations or ?topic=readiness.
   b) Checking: when "Send message" is pressed, every empty or wrongly filled field gets a
      message in words under it (and aria-invalid="true"), the status line says how many need
      attention, and the cursor moves to the first one. Messages clear as the visitor fixes them.
   c) Sending without leaving the page: the form's answers are posted to Netlify in the
      background. If it worked, the form is swapped for the thank-you message (d). If not, the
      status line says so and gives the email address, and nothing typed is lost.
   Without JavaScript none of this runs: the browser checks the "required" fields itself and
   the form posts the normal way. */
(function () {
  var form = document.querySelector('.enquiry-form');
  if (!form) return;
  var status = form.querySelector('.enquiry-form__status');
  var sendButton = form.querySelector('.enquiry-form__send');
  var done = document.querySelector('.enquiry-done');

  // From here on the script does the checking, so switch off the browser's own pop-ups
  form.setAttribute('novalidate', '');

  // a) Topic chosen by the link
  var wanted = new URLSearchParams(window.location.search).get('topic');
  if (wanted) {
    var preset = form.querySelector('.choice__input[data-topic="' + wanted.replace(/[^a-z-]/g, '') + '"]');
    if (preset) preset.checked = true;
  }

  // b) Checking. Each rule returns the message to show, or "" when the field is fine.
  var rules = {
    name: function (v) { return v ? '' : 'Please enter your name.'; },
    email: function (v, field) {
      if (!v) return 'Please enter your email address.';
      return field.validity.typeMismatch ? 'Please enter an email address like name@example.com.' : '';
    },
    topic: function () { return form.querySelector('input[name="topic"]:checked') ? '' : 'Please choose what this is about.'; },
    message: function (v) { return v ? '' : 'Please write a short message.'; }
  };

  // The element that gets aria-invalid: the input itself, or the whole group for the topic
  function targetFor(name) {
    return name === 'topic' ? form.querySelector('.choices') : form.elements[name];
  }

  function check(name) {
    var target = targetFor(name);
    var field = form.elements[name];
    var value = field && field.value !== undefined ? String(field.value).trim() : '';
    var message = rules[name](value, field);
    var errorBox = document.getElementById(target.getAttribute('aria-describedby').split(' ').pop());
    errorBox.textContent = message;
    if (message) target.setAttribute('aria-invalid', 'true');
    else target.removeAttribute('aria-invalid');
    return message === '';
  }

  // Once a field has shown an error, re-check it as the visitor types, so the message goes away
  form.addEventListener('input', function (event) {
    var name = event.target.name;
    if (rules[name] && targetFor(name).hasAttribute('aria-invalid')) check(name);
  });
  form.addEventListener('change', function (event) {
    if (event.target.name === 'topic' && targetFor('topic').hasAttribute('aria-invalid')) check('topic');
  });

  // d) The change from form to thank-you message. The form fades and lifts away, then the
  //    thank-you panel rises in and its mark draws itself (the animation lives in contact.css,
  //    under "is-leaving" and "is-arriving"). For visitors who ask for less motion, the swap is
  //    instant. Focus moves to the thank-you heading so screen readers announce it.
  function showThanks() {
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var title = done.querySelector('.enquiry-done__title');

    function swap() {
      form.hidden = true;
      done.hidden = false;
      if (!calm) done.classList.add('is-arriving');
      title.focus({ preventScroll: true });
      // The form was tall, so the message may now sit above the screen: bring it into view
      var box = done.getBoundingClientRect();
      if (box.top < 0 || box.bottom > window.innerHeight) {
        done.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'center' });
      }
    }

    if (calm) { swap(); return; }
    form.classList.add('is-leaving');
    window.setTimeout(swap, 450);   // matches the 0.45s fade in contact.css
  }

  // c) Sending
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var problems = Object.keys(rules).filter(function (name) { return !check(name); });
    if (problems.length) {
      status.textContent = problems.length === 1
        ? 'One field needs attention.'
        : problems.length + ' fields need attention.';
      var first = problems[0] === 'topic' ? form.querySelector('.choice__input') : form.elements[problems[0]];
      first.focus();
      return;
    }

    status.textContent = '';
    sendButton.disabled = true;
    sendButton.textContent = 'Sending…';

    // Netlify expects the answers in the same format a normal form post uses
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Netlify answered ' + response.status);
        showThanks();
        // When Google Analytics is added, this counts the sent message as a lead
        if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form_name: 'contact' });
      })
      .catch(function () {
        status.textContent = 'Sorry, your message could not be sent. Please try again, or email us at hello@bythebookinvestigations.com.';
        sendButton.disabled = false;
        sendButton.textContent = 'Send message';
      });
  });
})();
