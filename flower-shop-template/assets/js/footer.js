/* =========================================================
   Bloomora – Shared footer
   ---------------------------------------------------------
   Renders the site footer into <footer id="site-footer">.
   Edit once here to update every page.
   ========================================================= */
(function () {
  'use strict';

  var footer =
    '<div class="footer-root">' +
    '<div class="container-x py-16">' +
    '<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">' +

    /* brand column */
    '<div>' +
    '<a class="flex items-center mb-4" href="index.html">' +
    '<img src="assets/img/logo.svg" alt="Bloomora" class="w-10 h-10">' +
    '<span class="font-display font-semibold text-2xl tracking-tight">Bloomora</span></a>' +
    '<p class="text-sm text-[color:var(--ink-soft)] mb-5 max-w-xs">' +
    'Fresh, handcrafted floral arrangements and event styling delivered with care — for every occasion, every season.</p>' +
    '<div class="flex gap-2.5">' +
    '<a href="https://www.facebook.com" data-app="fb://" target="_blank" rel="noopener" class="social-btn" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>' +
    '<a href="https://www.instagram.com" data-app="instagram://" target="_blank" rel="noopener" class="social-btn" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>' +
    '<a href="https://x.com" data-app="twitter://" target="_blank" rel="noopener" class="social-btn" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>' +
    '<a href="https://www.youtube.com" data-app="vnd.youtube://" target="_blank" rel="noopener" class="social-btn" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>' +
    '</div>' +
    '</div>' +

    /* quick links */
    '<div>' +
    '<h3 class="footer-title mb-4">Quick Links</h3>' +
    '<ul class="space-y-2.5 text-sm text-[color:var(--ink-soft)]">' +
    '<li><a class="footer-link" href="about.html">About Us</a></li>' +
    '<li><a class="footer-link" href="services.html">Our Services</a></li>' +
    '<li><a class="footer-link" href="pricing.html">Pricing Plans</a></li>' +
    '<li><a class="footer-link" href="blog.html">Journal</a></li>' +
    '<li><a class="footer-link" href="contact.html">Contact Us</a></li>' +
    '<li><a class="footer-link" href="index-floral.html">Shop Bouquets</a></li>' +
    '</ul>' +
    '</div>' +

    /* services */
    '<div>' +
    '<h3 class="footer-title mb-4">Services</h3>' +
    '<ul class="space-y-2.5 text-sm text-[color:var(--ink-soft)]">' +
    '<li><a class="footer-link" href="service-details.html?service=wedding">Wedding Florals</a></li>' +
    '<li><a class="footer-link" href="service-details.html?service=event">Event Styling</a></li>' +
    '<li><a class="footer-link" href="service-details.html?service=corporate">Corporate Arrangements</a></li>' +
    '<li><a class="footer-link" href="service-details.html?service=subscription">Flower Subscriptions</a></li>' +
    '<li><a class="footer-link" href="service-details.html?service=plant">Interior Plant Design</a></li>' +
    '</ul>' +
    '</div>' +

    /* newsletter + contact */
    '<div>' +
    '<h3 class="footer-title mb-4">Stay in Bloom</h3>' +
    '<p class="text-sm text-[color:var(--ink-soft)] mb-4">Seasonal flower tips and exclusive offers, once a week.</p>' +
    '<form class="flex gap-2 js-subscribe" onsubmit="return false;">' +
    '<label class="sr-only" for="footer-email">Email Address</label>' +
    '<input id="footer-email" class="form-input !rounded-full" type="email" required placeholder="Your Email">' +
    '<button class="btn btn-primary btn-sm shrink-0" type="submit" aria-label="Subscribe"><i class="fa-solid fa-paper-plane"></i></button>' +
    '</form>' +
    '<ul class="mt-5 space-y-2 text-sm text-[color:var(--ink-soft)]">' +
    '<li class="flex items-center gap-2.5"><i class="fa-solid fa-location-dot text-[color:var(--primary)]"></i> 128 Rosewood Ave, Springfield</li>' +
    '<li class="flex items-center gap-2.5"><i class="fa-solid fa-phone text-[color:var(--primary)]"></i> <a href="tel:+15550142026" class="footer-link">+1 (555) 014-2026</a></li>' +
    '<li class="flex items-center gap-2.5"><i class="fa-solid fa-envelope text-[color:var(--primary)]"></i> <a href="mailto:hello@bloomora.com" class="footer-link">hello@bloomora.com</a></li>' +
    '</ul>' +
    '</div>' +
    '</div>' +

    /* bottom bar */
    '<hr class="footer-topline mt-12">' +
    '<div class="border-t border-[color:var(--line)] mt-6 pt-6 pb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[color:var(--ink-soft)]">' +
    '<p>© 2026 Bloomora. All rights reserved.</p>' +
    '<div class="flex items-center gap-5">' +
    '<a class="footer-link" href="#">Privacy Policy</a>' +
    '<a class="footer-link" href="#">Terms of Service</a>' +
    '<div class="flex items-center gap-1.5 text-xs">' +
    '<i class="fa-brands fa-cc-visa text-xl"></i>' +
    '<i class="fa-brands fa-cc-mastercard text-xl"></i>' +
    '<i class="fa-brands fa-cc-paypal text-xl"></i>' +
    '<i class="fa-brands fa-cc-apple-pay text-xl"></i>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  var host = document.getElementById('site-footer');
  if (host) { host.innerHTML = footer; }
})();
