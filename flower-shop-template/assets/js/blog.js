/* =========================================================
   Bloomora – Blog list page behaviour
   ---------------------------------------------------------
   Live search + category filtering + pagination-ish nav.
   Cards carry data-title, data-category and data-tags.
   ========================================================= */
(function () {
  'use strict';

  var grid = document.getElementById('blog-grid');
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.blog-card'));
  var search = document.getElementById('blog-search');
  var empty = document.getElementById('blog-empty');
  var chips = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));

  var more = document.getElementById('blog-more');
  if (more && cards.length > 3) {
    more.innerHTML = cards.slice(3).map(function (card) {
      var link = card.querySelector('h2 a');
      var img = card.querySelector('img');
      var meta = card.querySelector('.flex.gap-3.text-xs');
      var date = meta ? meta.querySelectorAll('span')[1] : null;
      return '<li class="flex gap-3">' +
        '<img src="' + (img ? img.getAttribute('src') : '') + '" alt="" class="w-16 h-16 shrink-0 rounded-xl object-cover">' +
        '<div><a href="' + (link ? link.getAttribute('href') : '#') + '" class="font-bold text-sm leading-snug hover:text-[color:var(--primary)] transition-colors">' + (link ? link.textContent : '') + '</a>' +
        '<p class="text-xs text-[color:var(--ink-soft)] mt-1">' + (date ? date.textContent : '') + '</p></div></li>';
    }).join('');
  }

  var activeCategory = 'all';

  function normalizeForMatch(str) {
    return String(str).toLowerCase().split(/\s+/).map(function (w) {
      return w.length > 1 && w.slice(-1) === 's' ? w.slice(0, -1) : w;
    }).join(' ');
  }

  function applyFilters() {
    var query = search ? normalizeForMatch(search.value) : '';
    var visible = 0;

    cards.forEach(function (card) {
      var title = normalizeForMatch(card.getAttribute('data-title') || '');
      var category = card.getAttribute('data-category') || 'other';
      var tags = normalizeForMatch(card.getAttribute('data-tags') || '');

      var matchesCategory = activeCategory === 'all' || category === activeCategory;
      var matchesSearch = !query ||
        title.indexOf(query) !== -1 ||
        tags.indexOf(query) !== -1 ||
        normalizeForMatch(category).indexOf(query) !== -1;

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    if (empty) empty.style.display = visible === 0 ? 'flex' : 'none';
  }

  if (search) search.addEventListener('input', applyFilters);

  var searchBtn = document.getElementById('blog-search-btn');
  var searchIcon = document.getElementById('blog-search-icon');
  if (searchBtn) searchBtn.addEventListener('click', function () { if (search) { search.focus(); applyFilters(); } });
  if (searchIcon) searchIcon.addEventListener('click', function () { if (search) { search.focus(); applyFilters(); } });

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-filter');
      applyFilters();
    });
  });

  applyFilters();
})();
