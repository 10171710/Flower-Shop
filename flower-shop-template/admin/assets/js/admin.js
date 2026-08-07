/* =========================================================
   Bloomora Admin – dashboard behaviour
   ---------------------------------------------------------
   Sidebar, theme + RTL toggles, charts (Chart.js), table
   search/filter, message reader, tabs, switches, custom-order
   calculator.
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- Sidebar ---------- */
  function setupSidebar() {
    var body = document.getElementById('admin-body');
    var toggle = document.getElementById('sidebar-toggle');
    var backdrop = document.querySelector('.admin-sidebar-backdrop');
    if (!body || !toggle) return;
    function close() { body.classList.remove('sidebar-open'); }
    toggle.addEventListener('click', function () {
      body.classList.toggle('sidebar-open');
      toggle.setAttribute('aria-expanded', String(body.classList.contains('sidebar-open')));
    });
    if (backdrop) backdrop.addEventListener('click', close);
  }

  /* ---------- Theme + RTL ---------- */
  function syncThemeIcon() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var dark = root.classList.contains('dark');
    btn.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }
  function toggleTheme() {
    root.classList.toggle('dark');
    store('bloom-theme', root.classList.contains('dark') ? 'dark' : 'light');
    syncThemeIcon();
    window.dispatchEvent(new CustomEvent('themechange'));
  }

  function syncRtl() {
    var btn = document.getElementById('rtl-toggle');
    if (!btn) return;
    var isRtl = root.getAttribute('dir') === 'rtl';
    btn.querySelector('i').className = isRtl
      ? 'fa-solid fa-arrow-left-arrow-right'
      : 'fa-solid fa-arrow-right-arrow-left';
  }
  function toggleRtl() {
    var isRtl = root.getAttribute('dir') === 'rtl';
    if (isRtl) { root.removeAttribute('dir'); store('bloom-dir', 'ltr'); }
    else { root.setAttribute('dir', 'rtl'); store('bloom-dir', 'rtl'); }
    syncRtl();
    window.dispatchEvent(new CustomEvent('dirchange'));
  }

  /* ---------- Dropdowns ---------- */
  function setupDropdowns() {
    document.querySelectorAll('[data-dropdown]').forEach(function (wrap) {
      var btn = wrap.querySelector('[data-dropdown-btn]');
      var menu = wrap.querySelector('[data-dropdown-menu]');
      if (!btn || !menu) return;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = menu.classList.toggle('hidden');
        document.querySelectorAll('[data-dropdown-menu]').forEach(function (m) {
          if (m !== menu) m.classList.add('hidden');
        });
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('[data-dropdown-menu]').forEach(function (m) { m.classList.add('hidden'); });
    });
  }

  /* ---------- Table search ---------- */
  function setupTableSearch() {
    var input = document.getElementById('table-search');
    if (!input) return;
    var table = document.querySelector('.admin-table');
    if (!table) return;
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      table.querySelectorAll('tbody tr').forEach(function (tr) {
        tr.style.display = tr.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
      });
    });
  }

  /* ---------- Status filter chips ---------- */
  function setupStatusFilter() {
    var chips = document.querySelectorAll('[data-status-filter]');
    if (!chips.length) return;
    var table = document.querySelector('.admin-table');
    if (!table) return;
    var active = 'all';
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        active = chip.getAttribute('data-status-filter');
        table.querySelectorAll('tbody tr').forEach(function (tr) {
          var st = tr.getAttribute('data-status') || 'all';
          tr.style.display = (active === 'all' || st === active) ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Messages ---------- */
  function setupMessages() {
    var items = document.querySelectorAll('.msg-item');
    var pane = document.getElementById('msg-body');
    if (!items.length || !pane) return;
    var defaultBody = pane.innerHTML;
    items.forEach(function (item) {
      item.addEventListener('click', function () {
        items.forEach(function (i) { i.classList.remove('active'); });
        item.classList.add('active');
        var content = item.getAttribute('data-msg');
        pane.innerHTML = content || defaultBody;
      });
    });
  }

  /* ---------- Settings tabs ---------- */
  function setupTabs() {
    var btns = document.querySelectorAll('[data-tab-btn]');
    if (!btns.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        document.querySelectorAll('[data-tab-panel]').forEach(function (panel) {
          panel.classList.add('hidden');
        });
        var target = document.querySelector(btn.getAttribute('data-tab-btn'));
        if (target) target.classList.remove('hidden');
      });
    });
  }

  /* ---------- Custom order calculator ---------- */
  function setupOrderCalculator() {
    var form = document.getElementById('custom-order-form');
    if (!form) return;
    var sub = document.getElementById('calc-subtotal');
    var del = document.getElementById('calc-delivery');
    var total = document.getElementById('calc-total');
    var freeNote = document.getElementById('calc-free-delivery');

    function money(n) { return '$' + n.toFixed(2); }

    function recalc() {
      var base = 0;
      var radio = form.querySelector('input[name="size"]:checked');
      if (radio) base += parseFloat(radio.getAttribute('data-price') || 0);

      form.querySelectorAll('input[type="checkbox"][data-price]').forEach(function (cb) {
        if (cb.checked) base += parseFloat(cb.getAttribute('data-price') || 0);
      });

      var occasion = form.querySelector('select[name="occasion"]');
      if (occasion) base += parseFloat(occasion.options[occasion.selectedIndex].getAttribute('data-price') || 0);

      var delivery = form.querySelector('select[name="delivery"]');
      var dPrice = delivery ? parseFloat(delivery.options[delivery.selectedIndex].getAttribute('data-price') || 0) : 0;

      var fee = base >= 60 && dPrice === 8 ? 0 : dPrice;
      if (freeNote) freeNote.style.display = (dPrice === 8 && fee === 0) ? 'flex' : 'none';

      sub.textContent = money(base);
      del.textContent = money(fee);
      total.textContent = money(base + fee);
    }

    form.addEventListener('change', recalc);
    form.addEventListener('input', recalc);
    recalc();
  }

  /* ---------- Charts ---------- */
  var charts = [];
  var palette = {
    mauve: '#C06389',
    mauveSoft: '#F2C0D3',
    leaf: '#469a62',
    leafSoft: '#6ab681',
    honey: '#f59e0b',
    purple: '#8b5cf6',
    blue: '#38bdf8',
    red: '#f87171'
  };

  function gridColor() {
    return root.classList.contains('dark') ? 'rgba(220,215,206,0.12)' : 'rgba(43,39,34,0.08)';
  }
  function tickColor() {
    return root.classList.contains('dark') ? '#c2b9a9' : '#6f6251';
  }

  function chartDefaults() {
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
    Chart.defaults.color = tickColor();
  }

  function buildCharts() {
    charts.forEach(function (c) { c.destroy(); });
    charts = [];
    chartDefaults();

    var rev = document.getElementById('chartRevenue');
    if (rev) {
      charts.push(new Chart(rev, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          datasets: [{
            label: 'Revenue ($K)',
            data: [32, 28, 41, 55, 62, 58, 71, 84],
            backgroundColor: ['#FBEAF0', '#FBEAF0', '#F6D5E1', '#E8A5BE', '#F2C0D3', '#F2C0D3', '#A24B6E', '#853A58'],
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { grid: { color: gridColor() }, ticks: { color: tickColor() } }, x: { grid: { display: false }, ticks: { color: tickColor() } } }
        }
      }));
    }

    var orders = document.getElementById('chartOrders');
    if (orders) {
      charts.push(new Chart(orders, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Orders',
            data: [18, 24, 21, 30, 42, 58, 46],
            borderColor: palette.leaf,
            backgroundColor: 'rgba(70,154,98,0.12)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: palette.leaf
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { grid: { color: gridColor() }, ticks: { color: tickColor() } }, x: { grid: { display: false }, ticks: { color: tickColor() } } }
        }
      }));
    }

    var delivery = document.getElementById('chartDelivery');
    if (delivery) {
      charts.push(new Chart(delivery, {
        type: 'doughnut',
        data: {
          labels: ['Same-day', 'Next-day', 'Scheduled', 'Pickup'],
          datasets: [{
            data: [46, 24, 18, 12],
            backgroundColor: [palette.mauve, palette.leaf, palette.honey, palette.blue],
            borderWidth: 0,
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '68%',
          plugins: { legend: { position: 'bottom', labels: { color: tickColor(), usePointStyle: true, pointStyle: 'circle' } } }
        }
      }));
    }

    var cat = document.getElementById('chartCategories');
    if (cat) {
      charts.push(new Chart(cat, {
        type: 'bar',
        data: {
          labels: ['Valentine', 'Birthday', 'Wedding', 'Anniversary', 'Sympathy', 'New Home'],
          datasets: [{
            label: 'Orders this month',
            data: [142, 118, 96, 84, 63, 41],
            backgroundColor: [palette.mauve, palette.honey, palette.purple, palette.leaf, palette.blue, palette.red],
            borderRadius: 8
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { grid: { color: gridColor() }, ticks: { color: tickColor() } }, y: { grid: { display: false }, ticks: { color: tickColor() } } }
        }
      }));
    }

    var seasonal = document.getElementById('chartSeasonal');
    if (seasonal) {
      charts.push(new Chart(seasonal, {
        type: 'radar',
        data: {
          labels: ['Spring', 'Summer', 'Autumn', 'Winter'],
          datasets: [{
            label: 'Stock health',
            data: [92, 78, 61, 44],
            borderColor: palette.mauve,
            backgroundColor: 'rgba(192, 99, 137, 0.3)',
            pointBackgroundColor: palette.mauve
          }, {
            label: 'Demand',
            data: [70, 66, 58, 39],
            borderColor: palette.leaf,
            backgroundColor: 'rgba(70,154,98,0.12)',
            pointBackgroundColor: palette.leaf
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { color: tickColor(), usePointStyle: true, pointStyle: 'circle' } } },
          scales: { r: { beginAtZero: true, max: 100, grid: { color: gridColor() }, ticks: { color: tickColor(), backdropColor: 'transparent' }, angleLines: { color: gridColor() }, pointLabels: { color: tickColor() } } }
        }
      }));
    }
  }

  /* ---------- Init ---------- */
  function init() {
    setupSidebar();
    syncThemeIcon();
    syncRtl();
    setupDropdowns();
    setupTableSearch();
    setupStatusFilter();
    setupMessages();
    setupTabs();
    setupOrderCalculator();

    var t = document.getElementById('theme-toggle');
    if (t) t.addEventListener('click', toggleTheme);
    var r = document.getElementById('rtl-toggle');
    if (r) r.addEventListener('click', toggleRtl);

    if (typeof Chart !== 'undefined') {
      buildCharts();
      window.addEventListener('themechange', buildCharts);
      window.addEventListener('dirchange', buildCharts);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
