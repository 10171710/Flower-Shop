/* =========================================================
   Bloomora – Cart page & Payment page logic
   ---------------------------------------------------------
   Reads/writes the same localStorage cart as shop.js
   (key "bloom-cart"). Loaded on cart.html and payment.html
   after shop.js.
   ========================================================= */
(function () {
  'use strict';

  var CART_KEY = 'bloom-cart';
  var ORDERS_KEY = 'bloom-orders';
  var FREE_DELIVERY_OVER = 60;
  var DELIVERY_FEE = 9;
  var TAX_RATE = 0.05;
  var COD_FEE = 5;

  var coupon = null;

  function read(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  function getCart() { return read(CART_KEY, []); }
  function getOrders() { return read(ORDERS_KEY, []); }

  function money(n) {
    return '$' + (Number(n) || 0).toFixed(2);
  }

  function syncCount() {
    var n = getCart().reduce(function (s, i) { return s + (i.qty || 1); }, 0);
    document.querySelectorAll('.cart-count, .m-cart-count').forEach(function (b) {
      b.textContent = String(n);
    });
  }

  function cartTotals() {
    var cart = getCart();
    var sub = cart.reduce(function (s, i) { return s + (Number(i.price) || 0) * (i.qty || 1); }, 0);
    var delivery = (sub >= FREE_DELIVERY_OVER) ? 0 : DELIVERY_FEE;
    var tax = Math.round(sub * TAX_RATE * 100) / 100;
    var discount = coupon ? coupon.discount : 0;
    return {
      sub: sub,
      delivery: delivery,
      tax: tax,
      discount: discount,
      total: sub + delivery + tax - discount
    };
  }

  function set(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

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

  /* ================= Cart page ================= */
  function initCartPage() {
    var wrap = document.getElementById('cart-page-items');
    if (!wrap) return;
    var empty = document.getElementById('cart-empty');
    var full = document.getElementById('cart-full');

    function renderSummary() {
      var t = cartTotals();
      set('cart-subtotal', money(t.sub));
      set('cart-delivery', t.delivery ? money(t.delivery) : 'Free');
      set('cart-tax', money(t.tax));
      set('cart-total', money(t.total));
      var dRow = document.getElementById('cart-discount-row');
      if (dRow) {
        if (coupon) { dRow.classList.remove('hidden'); set('cart-discount', '-' + money(t.discount)); }
        else { dRow.classList.add('hidden'); }
      }
      var free = document.getElementById('cart-free-delivery');
      if (free) free.classList.toggle('hidden', !(t.sub >= FREE_DELIVERY_OVER));
    }

    function render() {
      var cart = getCart();
      syncCount();
      if (!cart.length) {
        wrap.innerHTML = '';
        if (empty) empty.classList.remove('hidden');
        if (full) full.classList.add('hidden');
        return;
      }
      if (empty) empty.classList.add('hidden');
      if (full) full.classList.remove('hidden');
      wrap.innerHTML = cart.map(function (it, idx) {
        var img = (window.BloomShop && window.BloomShop.productImage(it)) || '';
        var thumb = img
          ? '<img src="' + img + '" alt="' + it.name + '">'
          : '<span class="cart-line-thumb"><i class="fa-solid fa-seedling"></i></span>';
        return '<div class="cart-line">' + thumb +
          '<div class="flex-1 min-w-0">' +
          '<p class="cart-name">' + it.name + '</p>' +
          '<p class="text-xs text-[color:var(--ink-soft)] mt-0.5">' + money(it.price) + ' each</p>' +
          '<div class="cart-qty mt-2">' +
          '<button type="button" data-idx="' + idx + '" data-dir="-1" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>' +
          '<span>' + it.qty + '</span>' +
          '<button type="button" data-idx="' + idx + '" data-dir="1" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>' +
          '</div>' +
          '</div>' +
          '<div class="text-end">' +
          '<p class="font-bold text-[color:var(--primary-dark)]">' + money((Number(it.price) || 0) * (it.qty || 1)) + '</p>' +
          '<button type="button" class="cart-remove" data-idx="' + idx + '" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>' +
          '</div>' +
          '</div>';
      }).join('');
      renderSummary();
    }

    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-idx]');
      if (!btn) return;
      var cart = getCart();
      var idx = parseInt(btn.getAttribute('data-idx'), 10);
      var item = cart[idx];
      if (!item) return;
      if (btn.hasAttribute('data-dir')) {
        var dir = parseInt(btn.getAttribute('data-dir'), 10);
        var qty = (item.qty || 1) + dir;
        if (qty <= 0) cart.splice(idx, 1);
        else item.qty = qty;
      } else {
        cart.splice(idx, 1);
        toast('Removed from cart', 'fa-solid fa-trash-can');
      }
      write(CART_KEY, cart);
      render();
    });

    var apply = document.getElementById('coupon-apply');
    if (apply) apply.addEventListener('click', function () {
      var input = document.getElementById('coupon-input');
      var msg = document.getElementById('coupon-msg');
      var code = (input ? input.value : '').trim().toUpperCase();
      if (code === 'BLOOM10') {
        var d = Math.round(cartTotals().sub * 0.10 * 100) / 100;
        coupon = { code: code, discount: d };
        if (msg) { msg.textContent = '\u2713 ' + code + ' applied \u2014 ' + money(d) + ' off'; msg.className = 'text-sm font-bold text-[color:var(--leaf)] mt-1.5'; }
      } else if (code === 'FRESH20') {
        coupon = { code: code, discount: 20 };
        if (msg) { msg.textContent = '\u2713 ' + code + ' applied \u2014 $20.00 off'; msg.className = 'text-sm font-bold text-[color:var(--leaf)] mt-1.5'; }
      } else {
        coupon = null;
        if (msg) { msg.textContent = 'Invalid coupon code.'; msg.className = 'text-sm font-bold text-red-600 mt-1.5'; }
      }
      renderSummary();
    });

    var clearBtn = document.getElementById('cart-clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', function () {
      write(CART_KEY, []);
      coupon = null;
      render();
      toast('Cart cleared', 'fa-solid fa-trash-can');
    });

    var checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', function () {
      if (!getCart().length) { toast('Your cart is empty', 'fa-solid fa-circle-info'); return; }
      var loggedIn = window.BloomAuth && window.BloomAuth.current();
      window.location.href = loggedIn ? 'payment.html' : 'login.html?next=payment.html';
    });

    render();
  }

  /* ================= Payment page ================= */
  function initPaymentPage() {
    var formArea = document.getElementById('pay-form-area');
    if (!formArea) return;

    var authReq = document.getElementById('pay-auth-required');
    var user = window.BloomAuth && window.BloomAuth.current();
    if (!user) {
      formArea.classList.add('hidden');
      if (authReq) authReq.classList.remove('hidden');
      var loginNext = document.getElementById('pay-login-next');
      var registerNext = document.getElementById('pay-register-next');
      if (loginNext) loginNext.setAttribute('href', 'login.html?next=' + encodeURIComponent('payment.html'));
      if (registerNext) registerNext.setAttribute('href', 'register.html?next=' + encodeURIComponent('payment.html'));
      return;
    }

    var selected = null;
    var selectedBank = null;
    var selectedUpi = null;

    function recalcTotal() {
      var t = cartTotals();
      var codFee = (selected === 'cod') ? COD_FEE : 0;
      set('pay-subtotal', money(t.sub));
      set('pay-delivery', t.delivery ? money(t.delivery) : 'Free');
      set('pay-tax', money(t.tax));
      set('pay-total', money(t.total + codFee));
      var codRow = document.getElementById('pay-cod-row');
      if (codRow) {
        codRow.classList.toggle('hidden', !codFee);
        set('pay-cod-fee', money(codFee));
      }
    }

    function renderItems() {
      var el = document.getElementById('pay-items');
      if (!el) return;
      var cart = getCart();
      if (!cart.length) {
        el.innerHTML = '<p class="text-sm text-center py-6 text-[color:var(--ink-soft)]">Your cart is empty. <a href="index-floral.html" class="font-bold text-[color:var(--primary)] hover:underline">Shop bouquets</a></p>';
        return;
      }
      el.innerHTML = cart.map(function (it) {
        var imgSrc = (window.BloomShop && window.BloomShop.productImage(it)) || '';
        var img = imgSrc ? '<img src="' + imgSrc + '" alt="' + it.name + '">' : '';
        return '<div class="order-review-item">' + img +
          '<div class="flex-1 min-w-0">' +
          '<p class="text-sm font-bold leading-tight">' + it.name + '</p>' +
          '<p class="text-xs text-[color:var(--ink-soft)] mt-0.5">Qty: ' + it.qty + '</p>' +
          '</div>' +
          '<div class="text-sm font-bold text-[color:var(--primary-dark)]">' + money((Number(it.price) || 0) * (it.qty || 1)) + '</div>' +
          '</div>';
      }).join('');
    }

    function selectMethod(method, card) {
      selected = method;
      document.querySelectorAll('.pay-method-card').forEach(function (c) {
        c.classList.remove('selected');
        var inp = c.querySelector('input[type="radio"]');
        if (inp) inp.checked = false;
      });
      document.querySelectorAll('.pay-detail').forEach(function (d) { d.classList.remove('show'); });
      card.classList.add('selected');
      var radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      var det = document.getElementById('detail-' + method);
      if (det) det.classList.add('show');
      recalcTotal();
    }

    document.querySelectorAll('.pay-method-card').forEach(function (card) {
      card.addEventListener('click', function () {
        selectMethod(card.getAttribute('data-method'), card);
      });
    });

    document.querySelectorAll('.upi-app').forEach(function (b) {
      b.addEventListener('click', function () {
        document.querySelectorAll('.upi-app').forEach(function (x) { x.classList.remove('selected'); });
        b.classList.add('selected');
        selectedUpi = b.getAttribute('data-app');
      });
    });

    document.querySelectorAll('.bank-option').forEach(function (b) {
      b.addEventListener('click', function () {
        document.querySelectorAll('.bank-option').forEach(function (x) { x.classList.remove('selected'); });
        b.classList.add('selected');
        selectedBank = b.getAttribute('data-bank');
      });
    });

    var cardNum = document.getElementById('card-number');
    if (cardNum) cardNum.addEventListener('input', function () {
      var v = cardNum.value.replace(/\D/g, '').substring(0, 16);
      cardNum.value = v.replace(/(.{4})/g, '$1 ').trim();
    });
    var cardExp = document.getElementById('card-expiry');
    if (cardExp) cardExp.addEventListener('input', function () {
      var v = cardExp.value.replace(/\D/g, '').substring(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
      cardExp.value = v;
    });

    function setFieldError(id, hasError) {
      var el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle('field-error', hasError);
      var hint = el.closest('.field-group');
      if (hint) {
        var h = hint.querySelector('.field-hint');
        if (h) h.classList.toggle('hidden', !hasError);
      }
    }

    function validateAddress() {
      var checks = {
        'del-name': /^[a-zA-Z\s]{2,}$/,
        'del-phone': /^\d{10}$/,
        'del-address': /.{5,}/,
        'del-city': /.{2,}/,
        'del-state': /.{2,}/,
        'del-pin': /^\d{5,6}$/
      };
      var ok = true;
      for (var id in checks) {
        var el = document.getElementById(id);
        if (!el) continue;
        var pass = checks[id].test(el.value.trim());
        setFieldError(id, !pass);
        if (!pass) ok = false;
      }
      if (!ok) toast('Please fix the highlighted delivery fields.', 'fa-solid fa-circle-info');
      return ok;
    }

    document.getElementById('pay-place-order').addEventListener('click', function () {
      if (!getCart().length) { toast('Your cart is empty.', 'fa-solid fa-circle-info'); return; }
      if (!selected) { toast('Please select a payment method.', 'fa-solid fa-circle-info'); return; }
      if (!validateAddress()) return;
      if (selected === 'netbanking' && !selectedBank) { toast('Please choose your bank.', 'fa-solid fa-circle-info'); return; }
      if (selected === 'upi') {
        var upiId = document.getElementById('upi-id');
        if (!selectedUpi && !(upiId && upiId.value.trim())) { toast('Please choose a UPI app or enter your UPI ID.', 'fa-solid fa-circle-info'); return; }
      }
      if (selected === 'card') {
        var cn = document.getElementById('card-number');
        if (!cn || cn.value.replace(/\D/g, '').length !== 16) { toast('Please enter a valid 16-digit card number.', 'fa-solid fa-circle-info'); return; }
      }
      placeOrder();
    });

    function placeOrder() {
      var orderId = 'BLM-' + Date.now().toString().slice(-7);
      var label = {
        upi: 'UPI Payment',
        netbanking: 'Net Banking (' + (selectedBank || 'Bank') + ')',
        card: 'Credit / Debit Card',
        cod: 'Cash on Delivery',
        emi: 'EMI'
      }[selected] || 'Payment';
      var t = cartTotals();
      var codFee = (selected === 'cod') ? COD_FEE : 0;
      var user = window.BloomAuth && window.BloomAuth.current();
      var val = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var order = {
        id: orderId,
        email: (user && (user.email || '')) || 'guest',
        date: new Date().toISOString(),
        items: getCart(),
        payment: label,
        address: {
          name: val('del-name'),
          phone: val('del-phone'),
          address: val('del-address'),
          city: val('del-city'),
          state: val('del-state'),
          pin: val('del-pin')
        },
        totals: { sub: t.sub, delivery: t.delivery, tax: t.tax, codFee: codFee, total: t.total + codFee }
      };
      var orders = getOrders();
      orders.unshift(order);
      write(ORDERS_KEY, orders);
      write(CART_KEY, []);
      syncCount();
      var modal = document.getElementById('pay-success-modal');
      if (modal) {
        var oid = document.getElementById('pay-order-id');
        if (oid) oid.textContent = '#' + orderId;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
      toast('Order placed \u2014 ' + label + '. Thank you!', 'fa-solid fa-circle-check');
    }

    function closeModal() {
      var modal = document.getElementById('pay-success-modal');
      if (modal) modal.classList.remove('show');
      document.body.style.overflow = '';
    }

    var closeBtn = document.getElementById('pay-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    var ov = document.getElementById('pay-success-modal');
    if (ov) ov.addEventListener('click', function (e) { if (e.target === ov) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

    renderItems();
    recalcTotal();
  }

  /* ================= Orders page ================= */
  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return ''; }
  }

  function initOrdersPage() {
    var listEl = document.getElementById('orders-list');
    if (!listEl) return;
    var authReq = document.getElementById('orders-auth');
    var empty = document.getElementById('orders-empty');
    var user = window.BloomAuth && window.BloomAuth.current();
    if (!user) {
      listEl.classList.add('hidden');
      if (empty) empty.classList.add('hidden');
      if (authReq) authReq.classList.remove('hidden');
      var ln = document.getElementById('orders-login-next');
      var rn = document.getElementById('orders-register-next');
      if (ln) ln.setAttribute('href', 'login.html?next=' + encodeURIComponent('orders.html'));
      if (rn) rn.setAttribute('href', 'register.html?next=' + encodeURIComponent('orders.html'));
      return;
    }
    if (authReq) authReq.classList.add('hidden');
    var email = user.email || '';
    var orders = getOrders().filter(function (o) { return o.email === email; });
    if (!orders.length) {
      listEl.classList.add('hidden');
      if (empty) empty.classList.remove('hidden');
      return;
    }
    listEl.classList.remove('hidden');
    if (empty) empty.classList.add('hidden');
    listEl.innerHTML = orders.map(function (o) {
      var items = (o.items || []).map(function (it) {
        var img = (window.BloomShop && window.BloomShop.productImage(it)) || '';
        var thumb = img
          ? '<img src="' + img + '" alt="' + it.name + '">'
          : '<span class="order-item-thumb"><i class="fa-solid fa-seedling"></i></span>';
        return '<div class="order-item">' + thumb +
          '<div class="flex-1 min-w-0"><p class="text-sm font-bold leading-tight">' + it.name + '</p>' +
          '<p class="text-xs text-[color:var(--ink-soft)] mt-0.5">Qty: ' + it.qty + ' \u00d7 ' + money(it.price) + '</p></div>' +
          '<div class="text-sm font-bold text-[color:var(--primary-dark)]">' + money((Number(it.price) || 0) * (it.qty || 1)) + '</div>' +
          '</div>';
      }).join('');
      var t = o.totals || {};
      var addr = o.address || {};
      var addrLine = [addr.address, addr.city, addr.state, addr.pin].filter(Boolean).join(', ');
      var itemCount = (o.items || []).reduce(function (s, it) { return s + (it.qty || 1); }, 0);
      var delivery = t.delivery ? money(t.delivery) : 'Free';
      return '<article class="card p-6 sm:p-7">' +
        '<div class="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--line)] pb-4">' +
        '<div>' +
        '<p class="text-xs font-bold uppercase tracking-wider text-[color:var(--ink-soft)]">Order <span class="text-[color:var(--primary-dark)]">#' + o.id + '</span></p>' +
        '<p class="text-sm font-bold mt-1">Placed on <span class="text-[color:var(--ink-soft)]">' + fmtDate(o.date) + '</span></p>' +
        '</div>' +
        '<span class="badge badge-leaf">Confirmed</span>' +
        '</div>' +
        '<div class="mt-4 space-y-3">' + items + '</div>' +
        '<div class="mt-5 grid gap-4 sm:grid-cols-2 sm:items-end">' +
        '<div>' +
        '<p class="text-xs font-bold uppercase tracking-wider text-[color:var(--ink-soft)]">Payment</p>' +
        '<p class="mt-1 text-sm font-bold">' + (o.payment || '—') + '</p>' +
        (addrLine ? '<p class="text-xs text-[color:var(--ink-soft)] mt-1">Deliver to: ' + (addr.name || '') + ', ' + addrLine + '</p>' : '') +
        '</div>' +
        '<div class="sm:text-end">' +
        '<p class="text-xs font-bold uppercase tracking-wider text-[color:var(--ink-soft)]">Total</p>' +
        '<p class="font-display text-2xl font-semibold text-[color:var(--primary-dark)] mt-1">' + money(t.total) + '</p>' +
        '<p class="text-xs text-[color:var(--ink-soft)] mt-1">' + itemCount + ' item(s) \u00b7 delivery ' + delivery + '</p>' +
        '</div>' +
        '</div>' +
        '</article>';
    }).join('');
  }

  /* ================= Init ================= */
  function init() {
    if (document.getElementById('cart-page-items')) initCartPage();
    if (document.getElementById('pay-form-area')) initPaymentPage();
    if (document.getElementById('orders-list')) initOrdersPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
