/* =========================================================
   Bloomora – Global UI behaviour
   ---------------------------------------------------------
   Theme + RTL toggles, mobile nav, dropdowns, reveal on
   scroll, stagger, counters, accordions, tabs, pricing
   switch, services grid/list switch, testimonial arrows,
   tilt + spotlight cards, scroll progress, back-to-top,
   coming-soon countdown.
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  function store(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }

  function reduceMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------- Theme toggle ---------- */
  function syncThemeIcon() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var dark = root.classList.contains('dark');
    btn.innerHTML = dark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }
  function toggleTheme() {
    root.classList.toggle('dark');
    store('bloom-theme', root.classList.contains('dark') ? 'dark' : 'light');
    syncThemeIcon();
  }

  /* ---------- RTL / LTR toggle ---------- */
  function syncRtlState() {
    var btn = document.getElementById('rtl-toggle');
    if (!btn) return;
    var isRtl = root.getAttribute('dir') === 'rtl';
    btn.setAttribute('aria-pressed', String(isRtl));
    btn.classList.toggle('active', isRtl);
    btn.title = isRtl ? 'Switch to LTR layout' : 'Switch to RTL layout';
  }
  function toggleRtl() {
    var isRtl = root.getAttribute('dir') === 'rtl';
    if (isRtl) {
      root.removeAttribute('dir');
      root.lang = 'en';
      store('bloom-dir', 'ltr');
      stripSentenceMarks();
    } else {
      root.setAttribute('dir', 'rtl');
      root.lang = 'ar';
      store('bloom-dir', 'rtl');
      fixSentenceDotsRTL();
    }
    syncRtlState();
  }

  /* In RTL the bidi algorithm pulls a sentence's terminal dot to the LEFT
     (e.g. ".the metro area") and detaches a leading number or symbol (e.g.
     "reserved. © 2026"). Insert an LRM after each sentence-ending mark and
     before leading digits/symbols so the dot stays on the RIGHT and the
     line stays anchored. Harmless in LTR. */
  function fixSentenceDotsRTL() {
    if (root.getAttribute('dir') !== 'rtl') return;
    var LRM = '\u200E';
    var nodes = [];
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      var p = n.parentNode;
      if (!p || p.nodeType !== 1 || /^(SCRIPT|STYLE|TEMPLATE|NOSCRIPT|TEXTAREA)$/.test(p.nodeName)) return;
      var t = n.textContent;
      if (!t || (t.indexOf('.') === -1 && t.indexOf('?') === -1 && t.indexOf('!') === -1 && !/\d/.test(t))) return;
      var out = '';
      var changed = false;
      var lineStart = true;
      for (var i = 0; i < t.length; i++) {
        var c = t[i];
        if (lineStart && !/\s/.test(c) && c !== LRM && c !== '.' && c !== '?' && c !== '!' && !(c >= 'A' && c <= 'Z') && !(c >= 'a' && c <= 'z')) {
          out += LRM;
          changed = true;
          lineStart = false;
        } else if (c === LRM) {
          lineStart = false;
        } else if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) {
          lineStart = false;
        }
        out += c;
        if (c === '.' || c === '?' || c === '!') {
          var prev = i > 0 ? t[i - 1] : '';
          var next = t[i + 1];
          var ellipsis = prev === '.';
          var decimal = prev >= '0' && prev <= '9';
          var midWord = !!next && /[A-Za-z0-9]/.test(next);
          var already = next === LRM;
          if (!ellipsis && !decimal && !midWord && !already) {
            out += LRM;
            changed = true;
            lineStart = true;
          }
        }
      }
      if (changed) n.textContent = out;
    });
  }
  function stripSentenceMarks() {
    var LRM = '\u200E';
    var nodes = [];
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      var p = n.parentNode;
      if (!p || p.nodeType !== 1 || /^(SCRIPT|STYLE|TEMPLATE|NOSCRIPT|TEXTAREA)$/.test(p.nodeName)) return;
      if (n.textContent.indexOf(LRM) === -1) return;
      n.textContent = n.textContent.split(LRM).join('');
    });
  }

  /* Fix dots in content injected after init (shop lists, blog filters…). */
  function observeSentenceMarks() {
    if (observeSentenceMarks._obs) return;
    var scheduled = false;
    observeSentenceMarks._obs = new MutationObserver(function () {
      if (root.getAttribute('dir') !== 'rtl') return;
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        fixSentenceDotsRTL();
      });
    });
    observeSentenceMarks._obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* ---------- Mobile menu ---------- */
  function setupMobileMenu() {
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;
    function closeMenu() {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      var i = toggle.querySelector('i');
      if (i) i.className = 'fa-solid fa-bars';
    }
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('i').className = open
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars';
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) closeMenu();
    });
  }

  /* ---------- Hover feedback fallback ----------
     Device-mode / touch emulation suppresses CSS :hover on mouse move.
     Track real mouse movement with a class so card hover effects still show. */
  function setupHoverFallback() {
    var SELECTOR = '.card, .stats-card, .spotlight';
    document.addEventListener('mouseover', function (e) {
      var el = e.target.closest ? e.target.closest(SELECTOR) : null;
      if (el) el.classList.add('m-hover');
    });
    document.addEventListener('mouseout', function (e) {
      var el = e.target.closest ? e.target.closest(SELECTOR) : null;
      if (!el) return;
      var to = e.relatedTarget;
      if (to && to.closest && to.closest(SELECTOR) === el) return;
      el.classList.remove('m-hover');
    });
  }

  /* ---------- Dropdowns (touch / click) ---------- */
  function setupDropdowns() {
    var groups = document.querySelectorAll('.nav-group');
    groups.forEach(function (g) {
      g.querySelector('.nav-drop-trigger').addEventListener('click', function (e) {
        e.preventDefault();
        var open = g.classList.contains('open');
        groups.forEach(function (o) { o.classList.remove('open'); });
        g.classList.toggle('open', !open);
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-group')) {
        groups.forEach(function (g) { g.classList.remove('open'); });
      }
    });
  }

  /* ---------- Back to top ---------- */
  function setupBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Scroll progress + navbar scrolled state ---------- */
  function setupScrollChrome() {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var navRoot = document.querySelector('.nav-root');
    var ticking = false;
    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = 'scaleX(' + p + ')';
      if (navRoot) navRoot.classList.toggle('scrolled', window.scrollY > 10);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Staggered reveal ---------- */
  function setupStagger() {
    var groups = document.querySelectorAll('[data-stagger]');
    if (!groups.length) return;
    function prepare(group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.style.setProperty('--st', (i * 0.08) + 's');
      });
    }
    groups.forEach(prepare);
    if (!('IntersectionObserver' in window) || reduceMotion()) {
      groups.forEach(function (g) { g.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    groups.forEach(function (g) { io.observe(g); });
  }

  /* ---------- Tilt on hover ---------- */
  function setupTilt() {
    if (reduceMotion() || !('PointerEvent' in window)) return;
    document.querySelectorAll('.tilt').forEach(function (el) {
      var max = 8;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width;
        var y = (e.clientY - r.top) / r.height;
        el.style.transform =
          'perspective(900px) rotateX(' + ((0.5 - y) * max).toFixed(2) + 'deg) rotateY(' +
          ((x - 0.5) * max).toFixed(2) + 'deg)';
      });
      el.addEventListener('pointerleave', function () {
        el.style.transform = '';
      });
    });
  }

  /* ---------- Spotlight following the cursor ---------- */
  function setupSpotlight() {
    if (reduceMotion() || !('PointerEvent' in window)) return;
    document.querySelectorAll('.spotlight').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function setupReveal() {
    var items = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .sweep, .sweep-center');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add('in');
      } else {
        io.observe(el);
      }
    });
  }

  /* ---------- Counters ---------- */
  function setupCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;
      var duration = 1400;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target * eased;
        el.textContent = val.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in window)) {
      counters.forEach(run);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Accordions ---------- */
  function setupAccordions() {
    document.querySelectorAll('.accordion-item').forEach(function (item) {
      var btn = item.querySelector('.accordion-btn');
      var body = item.querySelector('.accordion-body');
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        item.closest('.accordion') && item.closest('.accordion').querySelectorAll('.accordion-item.open').forEach(function (o) {
          o.classList.remove('open');
          o.querySelector('.accordion-body').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  }

  /* ---------- Tabs ---------- */
  function setupTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (wrap) {
      var btns = wrap.querySelectorAll('.tab-btn');
      var panels = wrap.querySelectorAll('[data-panel]');
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          btns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          panels.forEach(function (p) {
            p.hidden = p.getAttribute('data-panel') !== btn.getAttribute('data-tab');
          });
        });
      });
    });
  }

  /* ---------- Pricing monthly / yearly ---------- */
  function setupPricingSwitch() {
    var sw = document.getElementById('pricing-switch');
    if (!sw) return;
    var lblM = document.getElementById('lbl-monthly');
    var lblY = document.getElementById('lbl-yearly');
    function update() {
      var yearly = sw.checked;
      document.querySelectorAll('.price-monthly').forEach(function (el) { el.style.display = yearly ? 'none' : 'block'; });
      document.querySelectorAll('.price-yearly').forEach(function (el) { el.style.display = yearly ? 'block' : 'none'; });
      if (lblM) lblM.classList.toggle('active', !yearly);
      if (lblY) lblY.classList.toggle('active', yearly);
    }
    update();
    sw.addEventListener('change', update);
  }

  /* ---------- Services grid / list switch ---------- */
  function setupServicesSwitch() {
    var wrap = document.getElementById('services-layout');
    if (!wrap) return;
    var gridBtn = document.getElementById('view-grid');
    var listBtn = document.getElementById('view-list');
    if (!gridBtn || !listBtn) return;
    gridBtn.addEventListener('click', function () {
      wrap.classList.remove('services-list');
      wrap.classList.add('services-grid');
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
    });
    listBtn.addEventListener('click', function () {
      wrap.classList.remove('services-grid');
      wrap.classList.add('services-list');
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
    });
  }

  /* ---------- Testimonial slider arrows ---------- */
  function setupSliderArrows() {
    document.querySelectorAll('[data-scroll-slider]').forEach(function (wrap) {
      var track = wrap.querySelector('.testi-track');
      var prev = wrap.querySelector('[data-slide="prev"]');
      var next = wrap.querySelector('[data-slide="next"]');
      if (!track) return;
      function move(dir) {
        var card = track.querySelector('.testi-card');
        var amount = card ? card.offsetWidth + 24 : 320;
        track.scrollBy({ left: dir * amount, behavior: 'smooth' });
      }
      if (prev) prev.addEventListener('click', function () { move(-1); });
      if (next) next.addEventListener('click', function () { move(1); });
    });
  }

  /* ---------- Coming soon countdown ---------- */
  function setupCountdown() {
    var el = document.getElementById('countdown');
    if (!el) return;
    var end = Date.now() + 1000 * 60 * 60 * 24 * 12 + 1000 * 60 * 60 * 7;
    var boxes = {
      d: el.querySelector('[data-unit="days"]'),
      h: el.querySelector('[data-unit="hours"]'),
      m: el.querySelector('[data-unit="minutes"]'),
      s: el.querySelector('[data-unit="seconds"]')
    };
    function tick() {
      var diff = Math.max(0, end - Date.now());
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      var pad = function (n) { return String(n).padStart(2, '0'); };
      boxes.d.textContent = pad(d);
      boxes.h.textContent = pad(h);
      boxes.m.textContent = pad(m);
      boxes.s.textContent = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Parallax drift (respects reduced motion) ---------- */
  function setupParallax() {
    if (reduceMotion()) return;
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    if (!els.length) return;
    var ticking = false;
    function apply() {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var center = r.top + r.height / 2 - vh / 2;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        el.style.transform = 'translate3d(0,' + (center * -speed).toFixed(1) + 'px,0)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    }, { passive: true });
    apply();
  }

  /* ---------- Magnetic buttons (desktop pointer only) ---------- */
  function setupMagnetic() {
    if (reduceMotion() || !('PointerEvent' in window)) return;
    if (window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.magnetic').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.22;
        var y = (e.clientY - r.top - r.height / 2) * 0.22;
        el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* Cart + wishlist now live in assets/js/shop.js */

  /* ---------- Open social apps (deep link with web fallback) ---------- */
  function setupAppLinks() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest ? e.target.closest('[data-app]') : null;
      if (!el) return;
      var appUrl = el.getAttribute('data-app');
      if (!appUrl) return;
      e.preventDefault();
      var timer = setTimeout(function () { window.location.href = el.getAttribute('href'); }, 900);
      window.addEventListener('pagehide', function () { clearTimeout(timer); }, { once: true });
      window.location.href = appUrl;
    });
  }

  /* ---------- Contact form ---------- */
  function setupContactForm() {
    var nameInput = document.getElementById('ct-name');
    if (!nameInput) return;
    var form = nameInput.closest('form');
    if (!form) return;

    var phoneInput = document.getElementById('ct-phone');
    var phoneHint = document.getElementById('ct-phone-err');

    function showPhoneError(msg) {
      if (phoneHint) {
        phoneHint.textContent = msg;
        phoneHint.classList.remove('hidden');
      }
      if (phoneInput) phoneInput.classList.add('field-error');
    }
    function hidePhoneError() {
      if (phoneHint) phoneHint.classList.add('hidden');
      if (phoneInput) phoneInput.classList.remove('field-error');
    }

    if (phoneInput && phoneHint) {
      phoneInput.addEventListener('beforeinput', function (e) {
        if (e.data && !/^\d*$/.test(e.data)) {
          e.preventDefault();
          showPhoneError('Only numbers are allowed.');
        }
      });
      phoneInput.addEventListener('input', function () {
        var cleaned = phoneInput.value.replace(/\D/g, '');
        if (cleaned !== phoneInput.value) {
          phoneInput.value = cleaned;
          showPhoneError('Only numbers are allowed.');
        } else if (cleaned.length === 10) {
          hidePhoneError();
        }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = nameInput.value.trim();
      var email = document.getElementById('ct-email').value.trim();
      var msg = document.getElementById('ct-message').value.trim();
      var phone = phoneInput ? phoneInput.value.trim() : '';
      if (!name || !msg || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
      if (phone.length !== 10) {
        showPhoneError('Phone number must be exactly 10 digits.');
        return;
      }

      form.reset();
      if (window.BloomShop && window.BloomShop.showPopup) {
        window.BloomShop.showPopup('Message sent', 'Thanks, ' + name.split(' ')[0] + '! We\u2019ll reply within one business day.');
      }
    });
  }

  /* ---------- Init ---------- */
  function init() {
    syncThemeIcon();
    syncRtlState();
    fixSentenceDotsRTL();
    observeSentenceMarks();
    setupMobileMenu();
    setupDropdowns();
    setupHoverFallback();
    setupBackToTop();
    setupReveal();
    setupStagger();
    setupTilt();
    setupSpotlight();
    setupScrollChrome();
    setupCounters();
    setupAccordions();
    setupTabs();
    setupPricingSwitch();
    setupServicesSwitch();
    setupSliderArrows();
    setupCountdown();
    setupParallax();
    setupMagnetic();
    setupAppLinks();
    setupContactForm();

    document.body.classList.add('loaded');

    var t = document.getElementById('theme-toggle');
    if (t) t.addEventListener('click', toggleTheme);
    var r = document.getElementById('rtl-toggle');
    if (r) r.addEventListener('click', toggleRtl);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
