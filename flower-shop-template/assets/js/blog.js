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

  var activeCategory = 'all';

  function applyFilters() {
    var query = search ? search.value.trim().toLowerCase() : '';
    var visible = 0;

    cards.forEach(function (card) {
      var title = (card.getAttribute('data-title') || '').toLowerCase();
      var category = card.getAttribute('data-category') || 'other';
      var tags = (card.getAttribute('data-tags') || '').toLowerCase();

      var matchesCategory = activeCategory === 'all' || category === activeCategory;
      var matchesSearch = !query ||
        title.indexOf(query) !== -1 ||
        tags.indexOf(query) !== -1;

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
