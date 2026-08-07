/* Bloomora – dark / light theme bootstrapper.
   Runs synchronously in <head> BEFORE first paint to avoid FOUC.
   Persists user preferences in localStorage. */
(function () {
  'use strict';
  var root = document.documentElement;
  try {
    var theme = localStorage.getItem('bloom-theme');
    if (theme === 'dark') root.classList.add('dark');

    var dir = localStorage.getItem('bloom-dir');
    if (dir === 'rtl') {
      root.setAttribute('dir', 'rtl');
      root.lang = 'ar';
    }
  } catch (e) { /* storage unavailable – defaults apply */ }
})();
