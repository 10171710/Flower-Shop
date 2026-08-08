/* =========================================================
   Bloomora – Cart, wishlist, toasts & subscribe popups
   ---------------------------------------------------------
   Depends on the shared navbar (#cart-toggle / #cart-count).
   Cart and wishlist persist to localStorage.
   ========================================================= */
(function () {
  'use strict';

  var CART_KEY = 'bloom-cart';
  var WISH_KEY = 'bloom-wishlist';
  var SUB_KEY = 'bloom-subscribers';

  function read(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  /* ---------- Product images ----------
     Name-to-image catalog keeps stored cart/order images pointing at the
     current files even if the src captured at add-time has since changed. */
  var PRODUCT_IMAGES = {
    'Sweet Serenade': 'assets/img/floral-pink-rose.jpg',
    'Dutch Romance': 'assets/img/floral-red-tulip.jpg',
    'Spring Meadow': 'assets/img/floral-spring-mix.jpg',
    'Ivory Grace': 'assets/img/floral-white.jpg',
    'Lavender Haze': 'assets/img/floral-lavender.jpg',
    'Golden Hour': 'assets/img/floral-sunflower.jpg',
    'Golden Sunflower Wrap': 'assets/img/featured-sunflower.jpg',
    'Purple & Lilac Posy': 'assets/img/featured-lavender.jpg',
    'Bridal White Elegance': 'assets/img/featured-white.jpg'
  };
  function normalizeImg(src) {
    if (!src) return '';
    var s = String(src);
    var i = s.indexOf('assets/');
    if (i !== -1) return 'assets/' + s.slice(i + 7);
    return s;
  }
  function productImage(item) {
    if (item && item.name && PRODUCT_IMAGES[item.name]) return PRODUCT_IMAGES[item.name];
    return normalizeImg(item && item.img);
  }

  /* ---------- Small helpers ---------- */
  function money(n) {
    return '$' + (Number(n) || 0).toFixed(2);
  }
  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  /* ---------- Toast ---------- */
  function toast(message, icon) {
    var wrap = document.getElementById('toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'toast-wrap';
      wrap.className = 'toast-wrap';
      document.body.appendChild(wrap);
    }
    var t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = '<i class="' + (icon || 'fa-solid fa-circle-check') + '"></i><span>' + message + '</span>';
    wrap.appendChild(t);
    setTimeout(function () {
      t.classList.add('out');
      setTimeout(function () { t.remove(); }, 300);
    }, 2600);
  }

  /* ---------- Centered success popup ---------- */
  function showPopup(title, sub) {
    var ov = document.createElement('div');
    ov.className = 'popup-overlay';
    ov.innerHTML =
      '<div class="popup-card" role="dialog" aria-live="polite">' +
      '<button type="button" class="popup-close" aria-label="Dismiss"><i class="fa-solid fa-xmark"></i></button>' +
      '<span class="pop-icon"><i class="fa-solid fa-circle-check"></i></span>' +
      '<h3 class="font-display text-xl font-semibold mt-4">' + title + '</h3>' +
      (sub ? '<p class="text-sm text-[color:var(--ink-soft)] mt-1.5">' + sub + '</p>' : '') +
      '</div>';
    document.body.appendChild(ov);
    requestAnimationFrame(function () { ov.classList.add('show'); });
    function close() {
      ov.classList.remove('show');
      setTimeout(function () { ov.remove(); }, 300);
    }
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    ov.querySelector('.popup-close').addEventListener('click', close);
    setTimeout(close, 3200);
  }

  /* ---------- Cart ---------- */
  function getCart() { return read(CART_KEY, []); }
  function saveCart(list) { write(CART_KEY, list); syncCount(); renderCart(); }
  function count() {
    return getCart().reduce(function (s, it) { return s + ((it.qty || 1)); }, 0);
  }
  function total() {
    return getCart().reduce(function (s, it) { return s + (Number(it.price) || 0) * (it.qty || 1); }, 0);
  }

  function extractProduct(el) {
    var card = el.closest('figure, article');
    var name = '', price = 0, img = '';
    if (card) {
      var h = card.querySelector('h3');
      if (h) name = h.textContent.trim();
      var pe = card.querySelector('span.font-bold');
      if (pe) {
        var m = /\$\s?(\d+(?:\.\d+)?)/.exec(pe.textContent);
        if (m) price = parseFloat(m[1]);
      }
      var im = card.querySelector('img');
      if (im) img = normalizeImg(im.getAttribute('src') || im.src);
    }
    return { id: slug(name) || 'item', name: name || 'Item', price: price, img: img };
  }

  function addToCart(product) {
    var list = getCart();
    var found = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === product.id) { found = list[i]; break; }
    }
    if (found) { found.qty = (found.qty || 1) + 1; }
    else { list.push({ id: product.id, name: product.name, price: product.price, img: product.img, qty: 1 }); }
    saveCart(list);
    bump();
    toast('Added to cart: ' + product.name, 'fa-solid fa-bag-shopping');
  }

  function setQty(id, qty) {
    var list = getCart();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        if (qty <= 0) list.splice(i, 1);
        else list[i].qty = qty;
        break;
      }
    }
    saveCart(list);
  }

  function removeItem(id) {
    saveCart(getCart().filter(function (it) { return it.id !== id; }));
    toast('Removed from cart', 'fa-solid fa-trash-can');
  }

  function syncCount() {
    var n = count();
    document.querySelectorAll('.cart-count, .m-cart-count').forEach(function (b) {
      b.textContent = String(n);
    });
  }

  function bump() {
    var btn = document.getElementById('cart-toggle');
    if (!btn) return;
    btn.classList.remove('bump');
    void btn.offsetWidth;
    btn.classList.add('bump');
  }

  /* ---------- Mini cart drawer ---------- */
  function openDrawer() {
    var d = document.getElementById('cart-drawer');
    var o = document.getElementById('cart-overlay');
    if (!d) return;
    renderCart();
    d.classList.add('show');
    if (o) o.classList.add('show');
    d.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    var d = document.getElementById('cart-drawer');
    var o = document.getElementById('cart-overlay');
    if (d) {
      d.classList.remove('show');
      d.setAttribute('aria-hidden', 'true');
    }
    if (o) o.classList.remove('show');
    document.body.style.overflow = '';
  }

  function renderCart() {
    var wrap = document.getElementById('cart-items');
    if (!wrap) return;
    var list = getCart();
    var badge = document.getElementById('cart-drawer-count');
    if (badge) badge.textContent = '(' + count() + ')';
    var sub = document.getElementById('cart-subtotal');
    if (!list.length) {
      wrap.innerHTML =
        '<div class="cart-empty"><i class="fa-solid fa-bag-shopping"></i>' +
        '<p>Your cart is empty.</p>' +
        '<a href="index-floral.html" class="btn btn-primary btn-sm mt-3">Shop Bouquets</a></div>';
      if (sub) sub.textContent = money(0);
      return;
    }
    wrap.innerHTML = list.map(function (it) {
      var img = productImage(it);
      return '<div class="cart-row">' +
        '<img src="' + img + '" alt="' + it.name + '">' +
        '<div class="cart-row-body">' +
        '<p class="cart-name">' + it.name + '</p>' +
        '<p class="cart-price">' + money(it.price) + '</p>' +
        '<div class="cart-qty">' +
        '<button type="button" data-qty="' + it.id + '" data-dir="-1" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>' +
        '<span>' + it.qty + '</span>' +
        '<button type="button" data-qty="' + it.id + '" data-dir="1" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>' +
        '</div>' +
        '</div>' +
        '<button type="button" class="cart-remove" data-remove="' + it.id + '" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>' +
        '</div>';
    }).join('');
    if (sub) sub.textContent = money(total());
  }

  function buildDrawer() {
    if (document.getElementById('cart-drawer')) return;

    var overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.id = 'cart-overlay';
    document.body.appendChild(overlay);

    var d = document.createElement('aside');
    d.className = 'cart-drawer';
    d.id = 'cart-drawer';
    d.setAttribute('aria-hidden', 'true');
    d.innerHTML =
      '<header class="cart-head">' +
      '<h3 class="font-display text-lg font-semibold">Your Cart <span id="cart-drawer-count">(0)</span></h3>' +
      '<button type="button" class="icon-btn" id="cart-close" aria-label="Close cart"><i class="fa-solid fa-xmark"></i></button>' +
      '</header>' +
      '<div class="cart-items" id="cart-items"></div>' +
      '<footer class="cart-foot">' +
      '<div class="cart-subtotal"><span>Subtotal</span><strong id="cart-subtotal">$0.00</strong></div>' +
      '<button type="button" class="btn btn-primary w-full" id="cart-checkout">Checkout <i class="fa-solid fa-arrow-right"></i></button>' +
      '<a href="cart.html" class="block text-center text-xs font-bold text-[color:var(--ink-soft)] mt-2.5 hover:text-[color:var(--primary)] transition-colors">View full cart</a>' +
      '</footer>';
    document.body.appendChild(d);

    document.getElementById('cart-close').addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });

    document.getElementById('cart-items').addEventListener('click', function (e) {
      var q = e.target.closest('[data-qty]');
      var rm = e.target.closest('[data-remove]');
      if (q) {
        var id = q.getAttribute('data-qty');
        var dir = parseInt(q.getAttribute('data-dir'), 10);
        var item = getCart().filter(function (x) { return x.id === id; })[0];
        if (item) setQty(id, (item.qty || 1) + dir);
        return;
      }
      if (rm) removeItem(rm.getAttribute('data-remove'));
    });

    document.getElementById('cart-checkout').addEventListener('click', function () {
      if (!getCart().length) { toast('Your cart is empty', 'fa-solid fa-circle-info'); return; }
      window.location.href = 'cart.html';
    });
  }

  /* ---------- Wishlist ---------- */
  function getWish() { return read(WISH_KEY, []); }
  function productName(el) {
    var card = el.closest('figure, article');
    if (!card) return '';
    var h = card.querySelector('h3');
    return h ? h.textContent.trim() : '';
  }

  function syncWishlist() {
    var list = getWish();
    document.querySelectorAll('.wishlist').forEach(function (b) {
      var name = productName(b);
      var active = list.indexOf(name) !== -1;
      b.classList.toggle('active', active);
      var i = b.querySelector('i');
      if (i) i.className = active ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    });
  }

  function toggleWishlist(b) {
    var name = productName(b);
    if (!name) return;
    var list = getWish();
    var idx = list.indexOf(name);
    var active;
    if (idx !== -1) { list.splice(idx, 1); active = false; }
    else { list.push(name); active = true; }
    write(WISH_KEY, list);
    b.classList.toggle('active', active);
    var i = b.querySelector('i');
    if (i) i.className = active ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    toast(
      active ? 'Added to wishlist: ' + name : 'Removed from wishlist: ' + name,
      active ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
    );
  }

  /* ---------- Subscribe popup ---------- */
  function setupSubscribe() {
    document.querySelectorAll('form.js-subscribe').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        var email = input ? input.value.trim() : '';
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          toast('Please enter a valid email address', 'fa-solid fa-triangle-exclamation');
          if (input) input.focus();
          return;
        }
        var subs = read(SUB_KEY, []);
        if (subs.indexOf(email) === -1) subs.push(email);
        write(SUB_KEY, subs);
        if (input) input.value = '';
        showPopup('Subscribed successfully!', 'Welcome to the Bloomora bloom letter.');
      });
    });
  }

  /* ---------- Bindings ---------- */
  function bind() {
    document.querySelectorAll('[data-add-cart]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        addToCart(extractProduct(el));
      });
    });

    document.querySelectorAll('.wishlist').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        toggleWishlist(b);
      });
    });

    ['cart-toggle', 'cart-toggle-mobile'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          openDrawer();
        });
      }
    });
  }

  /* ---------- Init ---------- */
  function init() {
    buildDrawer();
    bind();
    syncCount();
    syncWishlist();
    setupSubscribe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.BloomShop = {
    productImage: productImage,
    normalizeImg: normalizeImg,
    toast: toast,
    showPopup: showPopup
  };
})();
