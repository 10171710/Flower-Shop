/* =========================================================
   Bloomora – Shared navigation bar
   ---------------------------------------------------------
   Renders the site header into <header id="site-header">.
   Edit once here to update every page.
   Includes: desktop menu (Home dropdown only), mobile menu,
   dark/light toggle, RTL/LTR toggle and a Login/Sign Up CTA.
   ========================================================= */
(function () {
  'use strict';

  /* Resolve the current file name to highlight the active link */
  var path = window.location.pathname.split('/').pop() || 'index.html';

  function current() { return path; }

  function linkTo(href, label, icon, extra) {
    var active = (href === current() ? ' active' : '') + (extra || '');
    var iconHtml = icon ? '<i class="' + icon + '"></i>' : '';
    return '<a class="nav-link' + active + '" href="' + href + '">' + iconHtml + ' ' + label + '</a>';
  }

  function dropdown(label, icon, items) {
    var list = items.map(function (it) {
      var cls = it.href === current() ? 'active' : '';
      return '<a class="' + cls + '" href="' + it.href + '">' +
        (it.icon ? '<i class="' + it.icon + '"></i>' : '') + it.label + '</a>';
    }).join('');
    return '<li class="nav-group">' +
      '<button type="button" class="nav-link nav-drop-trigger" aria-haspopup="true" aria-expanded="false">' +
      (icon ? '<i class="' + icon + '"></i> ' : '') + label +
      ' <i class="fa-solid fa-chevron-down text-[0.65em] opacity-60"></i></button>' +
      '<div class="dropdown-menu" role="menu">' + list + '</div>' +
      '</li>';
  }

  var nav = [
    dropdown('Home', 'fa-solid fa-house', [
      { label: 'Home – Services', href: 'index.html', icon: 'fa-solid fa-briefcase' },
      { label: 'Home – Floral Shop', href: 'index-floral.html', icon: 'fa-solid fa-seedling' }
    ]),
    linkTo('about.html', 'About', 'fa-solid fa-circle-info'),
    linkTo('services.html', 'Services', 'fa-solid fa-spa'),
    linkTo('pricing.html', 'Pricing', 'fa-solid fa-tags'),
    linkTo('blog.html', 'Blog', 'fa-solid fa-pen-nib'),
    linkTo('contact.html', 'Contact', 'fa-solid fa-envelope')
  ].join('');

  var logo = '<a class="flex items-center" href="index.html" aria-label="Bloomora home">' +
    '<img src="assets/img/logo.svg" alt="Bloomora" class="w-10 h-10">' +
    '<span class="font-display font-semibold text-2xl tracking-tight">Bloomora</span>' +
    '</a>';

  var cart =
    '<a href="#" class="icon-btn cart-btn" id="cart-toggle" title="Shopping cart" aria-label="Shopping cart">' +
    '<i class="fa-solid fa-bag-shopping"></i>' +
    '<span class="cart-count" id="cart-count">0</span>' +
    '</a>';

  var auth = window.BloomAuth ? window.BloomAuth.current() : null;
  var userName = auth ? (((auth.firstName || '').trim() || '') || (auth.email ? auth.email.split('@')[0] : '')) : '';
  userName = userName || 'User';
  var userInitial = userName.charAt(0).toUpperCase();
  function userDropdown(logoutId) {
    return '<div class="dropdown-menu dropdown-menu-end" role="menu">' +
      '<a href="orders.html"><i class="fa-solid fa-box"></i> My Orders</a>' +
      '<a href="#" id="' + logoutId + '"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>' +
      '</div>';
  }
  var authArea = auth
    ? '<div class="nav-group hidden lg:block">' +
      '<button type="button" class="nav-drop-trigger user-btn" aria-haspopup="true" aria-expanded="false">' +
      '<i class="fa-solid fa-circle-user"></i> ' + userName +
      ' <i class="fa-solid fa-chevron-down text-[0.65em] opacity-70"></i></button>' +
      userDropdown('logout-btn') +
      '</div>' +
      '<div class="nav-group lg:hidden">' +
      '<button type="button" class="nav-drop-trigger avatar-btn" aria-haspopup="true" aria-expanded="false" aria-label="Account menu" title="My Account">' +
      '<span class="avatar-badge">' + userInitial + '</span>' +
      '</button>' +
      userDropdown('logout-btn-top') +
      '</div>'
    : '<a href="login.html" class="btn btn-outline btn-sm hidden lg:inline-flex"><i class="fa-solid fa-right-to-bracket"></i> Login</a>' +
      '<a href="register.html" class="btn btn-primary btn-sm hidden lg:inline-flex"><i class="fa-solid fa-user-plus"></i> Sign Up</a>';

  var mobileAuth = auth
    ? '<div class="m-user">' +
      '<span class="m-avatar">' + userInitial + '</span>' +
      '<div class="m-user-meta"><strong>' + userName + '</strong><span>' + (auth.email || '') + '</span></div>' +
      '</div>' +
      '<a href="orders.html"><i class="fa-solid fa-box"></i> My Orders</a>' +
      '<a href="#" class="m-cta" id="logout-btn-mobile"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>'
    : '<a href="login.html"><i class="fa-solid fa-right-to-bracket"></i> Login</a>' +
      '<a href="register.html" class="m-cta"><i class="fa-solid fa-user-plus"></i> Sign Up</a>';

  var header = '<div class="nav-root">' +
    '<div class="nav-shell">' +
    '<nav class="container-x flex items-center justify-between gap-4 py-3.5" aria-label="Main navigation">' +
    logo +
    '<ul class="nav-menu flex items-center gap-6">' + nav + '</ul>' +
    '<div class="flex items-center gap-2.5">' +
    '<button type="button" class="icon-btn" id="rtl-toggle" title="Switch to RTL layout" aria-label="Toggle text direction" aria-pressed="false">' +
    '<i class="fa-solid fa-arrow-right-arrow-left"></i></button>' +
    '<button type="button" class="icon-btn" id="theme-toggle" title="Toggle dark / light mode" aria-label="Toggle color theme">' +
    '<i class="fa-solid fa-moon"></i></button>' +
    cart +
    authArea +
    '<button type="button" class="icon-btn nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">' +
    '<i class="fa-solid fa-bars"></i></button>' +
    '</div>' +
    '</nav>' +
    '</div>' +
    '<div class="mobile-menu" id="mobile-menu">' +
    '<a href="index.html">Home – Services</a>' +
    '<a href="index-floral.html">Home – Floral Shop</a>' +
    '<a href="about.html">About Us</a>' +
    '<a href="services.html">Services</a>' +
    '<a href="pricing.html">Pricing</a>' +
    '<a href="blog.html">Blog</a>' +
    '<a href="contact.html">Contact Us</a>' +
    '<a href="#" class="m-cart" id="cart-toggle-mobile"><i class="fa-solid fa-bag-shopping"></i> Shopping Cart <span class="m-cart-count">0</span></a>' +
    mobileAuth +
    '</div>' +
    '</div>';

  var host = document.getElementById('site-header');
  if (host) { host.innerHTML = header; }

  function bindLogout() {
    if (!window.BloomAuth) return;
    var logout = function (e) {
      e.preventDefault();
      window.BloomAuth.logout();
      window.location.reload();
    };
    var btn = document.getElementById('logout-btn');
    if (btn) btn.addEventListener('click', logout);
    var top = document.getElementById('logout-btn-top');
    if (top) top.addEventListener('click', logout);
    var mb = document.getElementById('logout-btn-mobile');
    if (mb) mb.addEventListener('click', logout);
  }
  bindLogout();
})();
