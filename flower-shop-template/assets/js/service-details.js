/* =========================================================
   Bloomora – Service details
   ---------------------------------------------------------
   Renders service-details.html content based on the
   ?service= query parameter (defaults to "wedding").
   Runs synchronously before main.js init so reveal and
   accordion behaviour bind to the freshly rendered DOM.
   ========================================================= */
(function () {
  'use strict';

  var SERVICES = {
    wedding: {
      name: 'Wedding Florals',
      meta: 'Wedding floral design at Bloomora — bridal bouquets, ceremony styling, reception florals. Packages, FAQs and pricing from $890.',
      heroA: 'Wedding',
      heroB: 'Florals',
      intro: 'Bespoke bridal and ceremony florals designed around your story — from intimate elopements to full-scale receptions.',
      badges: [
        { icon: 'fa-solid fa-star', cls: 'badge-primary', text: 'Rated 4.9/5' },
        { icon: 'fa-solid fa-seedling', cls: 'badge-leaf', text: '480+ weddings styled' },
        { icon: 'fa-solid fa-bolt', cls: 'badge-honey', text: 'Book by June for 2026 dates' }
      ],
      img: 'assets/img/service-wedding.jpg',
      imgAlt: 'Elegant white bridal bouquet',
      aboutTitle: 'Your dream day, in full bloom',
      aboutText: 'From the first mood board to the final petal, a dedicated senior designer walks with you. We source seasonally, tastefully, and within your budget.',
      features: [
        { t: 'Dedicated designer', d: 'One point of contact from consultation to teardown.' },
        { t: 'On-site setup & styling', d: 'Ceremony, aisle, arch and reception delivered and arranged.' },
        { t: 'Sample arrangement', d: 'A trial of your bridal bouquet four weeks before the day.' },
        { t: 'Seasonal, sustainable stems', d: 'Local growers first, composted waste, zero single-use plastic.' }
      ],
      packTitle: 'Wedding florals, priced simply',
      packNote: 'All packages are customisable. Final quotes depend on season, scale and venue access.',
      packages: [
        { featured: false, name: 'Elopement', tag: 'For the small, intimate "I do".', price: '$890',
          items: ['Bridal bouquet', 'Buttonholes ×2', 'Ceremony posy', 'Delivery & setup'] },
        { featured: true, badge: 'Most popular', name: 'Signature', tag: 'The full floral experience.', price: '$2,400',
          items: ['Bridal bouquet + trial', 'Bridesmaids ×4', 'Ceremony arch & aisle', 'Reception tables ×8', 'On-site styling team'] },
        { featured: false, name: 'Grand Affair', tag: 'Nothing left unflowered.', price: '$4,800',
          items: ['Everything in Signature', 'Floral walls / installations', 'Up to 16 reception tables', 'Welcome table & sweetheart'] }
      ],
      faqTitle: 'Wedding flower questions',
      faqSub: 'Still curious? <a href="contact.html" class="font-bold text-[color:var(--primary)] underline underline-offset-4">Ask us anything</a>.',
      faqs: [
        { q: 'How far in advance should we book?', a: 'We recommend 6–12 months for peak season (April–October). Elopement dates can often be accommodated within 4–6 weeks.' },
        { q: 'Can you work with seasonal or specific flowers?', a: 'Absolutely. We will propose the best seasonal alternatives that keep the mood of your brief, and flag rare imports separately.' },
        { q: 'Do you deliver outside the metro area?', a: 'Yes — travel within 80km is included in packages. Further venues may incur a small logistics fee confirmed at quote stage.' },
        { q: 'What happens if flowers are damaged on the day?', a: 'Our styling team stays until the first dance. Any damaged arrangement is replaced on the spot — we always carry backup stems.' },
        { q: 'Is a deposit required?', a: 'A 30% deposit reserves your date. The balance is due 14 days before your wedding. Free date-change once up to 60 days out.' }
      ],
      related: [
        { s: 'event', icon: 'fa-solid fa-champagne-glasses', cls: 'text-[color:var(--leaf)]', label: 'Event Styling', price: 'from $450' },
        { s: 'subscription', icon: 'fa-solid fa-calendar-check', cls: 'text-[color:var(--honey)]', label: 'Flower Subscriptions', price: 'from $39/mo' },
        { s: 'corporate', icon: 'fa-solid fa-building', cls: 'text-[color:var(--primary)]', label: 'Corporate Arrangements', price: 'from $120/mo' }
      ],
      ctaBg: 'linear-gradient(135deg,#5E2639,#A24B6E)',
      ctaTitle: "Let's design your wedding flowers",
      ctaText: 'Book a free 30-minute consultation with a senior designer.'
    },

    event: {
      name: 'Event Styling',
      meta: 'Event floral styling at Bloomora — installations, tablescapes and floral walls for birthdays, launches and soirées. Pricing from $450.',
      heroA: 'Event',
      heroB: 'Styling',
      intro: 'Installations, tablescapes and floral walls for birthdays, launches and social soirées — designed around your theme and built to be photographed.',
      badges: [
        { icon: 'fa-solid fa-star', cls: 'badge-primary', text: 'Rated 4.8/5' },
        { icon: 'fa-solid fa-seedling', cls: 'badge-leaf', text: '300+ events styled' },
        { icon: 'fa-solid fa-bolt', cls: 'badge-honey', text: '72-hour turnaround on small events' }
      ],
      img: 'assets/img/service-event.jpg',
      imgAlt: 'Colourful event installation with flowers',
      aboutTitle: 'Every party, in full colour',
      aboutText: 'From birthday bashes to brand launches, we design statement florals that anchor the room — installed, styled and refreshed before your guests arrive.',
      features: [
        { t: 'Dedicated event designer', d: 'One creative lead from mood board to teardown.' },
        { t: 'Setup & teardown team', d: 'Full installation before doors open, tidy removal after.' },
        { t: 'Floral walls & backdrops', d: 'Sturdy, photo-ready installations in any colour story.' },
        { t: 'Custom colour briefs', d: 'We match your brand or party palette exactly.' }
      ],
      packTitle: 'Event styling, priced by scope',
      packNote: 'Every event is quoted on scope and scale. Rush bookings (under 7 days) may carry a small fast-track fee.',
      packages: [
        { featured: false, name: 'Soirée', tag: 'Birthday or gathering, beautifully set.', price: '$450',
          items: ['Birthday tablescape', 'Centrepieces ×6', 'Balloon & paper accents', 'Setup & teardown'] },
        { featured: true, badge: 'Most popular', name: 'Centre Stage', tag: 'The wow moment, guaranteed.', price: '$1,200',
          items: ['Everything in Soirée', 'Floral wall / photo backdrop', 'Aisle or stage styling', 'On-site event coordinator'] },
        { featured: false, name: 'Grand Production', tag: 'Multiple rooms, one cohesive look.', price: '$3,500',
          items: ['Everything in Centre Stage', 'Multiple installations', 'Lighting & drape coordination', 'Two-day build + full crew'] }
      ],
      faqTitle: 'Event flower questions',
      faqSub: 'Planning something special? <a href="contact.html" class="font-bold text-[color:var(--primary)] underline underline-offset-4">Tell us about it</a>.',
      faqs: [
        { q: 'How soon can you set up an event?', a: 'Small soirées can often be turned around within 72 hours. Large productions are booked 4–8 weeks out, with a site walkthrough two weeks prior.' },
        { q: 'Can you match a specific theme or brand palette?', a: 'Yes — send a mood board or brand guide and we will match colours, textures and silhouette exactly.' },
        { q: 'Do you provide decor beyond flowers?', a: 'We coordinate balloons, drapes and lighting through trusted partners, or work with your existing vendors.' },
        { q: 'What if the venue has its own restrictions?', a: 'We handle all venue permissions, fire-safety certificates and installation timings on your behalf.' },
        { q: 'Is there a minimum spend for weekends?', a: 'Saturday bookings from $800; weekday soirées are welcome from the Soirée package.' }
      ],
      related: [
        { s: 'wedding', icon: 'fa-solid fa-ring', cls: 'text-[color:var(--primary-dark)]', label: 'Wedding Florals', price: 'from $890' },
        { s: 'corporate', icon: 'fa-solid fa-building', cls: 'text-[color:var(--honey)]', label: 'Corporate Arrangements', price: 'from $120/mo' },
        { s: 'plant', icon: 'fa-solid fa-leaf', cls: 'text-[color:var(--leaf)]', label: 'Interior Plant Design', price: 'from $199' }
      ],
      ctaBg: 'linear-gradient(135deg,#2b6340,#469a62)',
      ctaTitle: "Let's style your next event",
      ctaText: 'Tell us the date, the venue and your vision — we handle the rest.'
    },

    corporate: {
      name: 'Corporate Arrangements',
      meta: 'Corporate flower arrangements at Bloomora — lobby, reception and desk rotations with a dedicated account manager. From $120/month.',
      heroA: 'Corporate',
      heroB: 'Arrangements',
      intro: 'Elevate lobbies, desks and boardrooms with fresh weekly rotations — plus a dedicated account manager and monthly reports.',
      badges: [
        { icon: 'fa-solid fa-star', cls: 'badge-primary', text: 'Rated 4.7/5' },
        { icon: 'fa-solid fa-seedling', cls: 'badge-leaf', text: '60+ corporate clients' },
        { icon: 'fa-solid fa-file-invoice', cls: 'badge-honey', text: 'Net-30 invoicing' }
      ],
      img: 'assets/img/service-corporate.jpg',
      imgAlt: 'Fresh corporate lobby arrangement',
      aboutTitle: 'A greener workplace, on schedule',
      aboutText: 'Fresh flowers make lobbies feel alive and boardrooms feel intentional. We design, deliver and maintain them so your team never has to think about it.',
      features: [
        { t: 'Dedicated account manager', d: 'A single contact for scheduling, swaps and billing.' },
        { t: 'Weekly refresh rotations', d: 'Arrangements replaced and hydrated on a fixed day.' },
        { t: 'Monthly floral reports', d: 'Spend, coverage and renewal summaries every month.' },
        { t: 'Brand-aligned styling', d: 'Vessels and palettes matched to your office aesthetic.' }
      ],
      packTitle: 'Corporate care, priced monthly',
      packNote: 'All plans include design, delivery, maintenance and replacement stems. Annual contracts get two months free.',
      packages: [
        { featured: false, name: 'Desk Bloom', tag: 'A touch of green at every desk.', price: '$120/mo',
          items: ['1 desktop arrangement weekly', 'Refreshed by our team', 'Care & hydration service', 'Monthly billing'] },
        { featured: true, badge: 'Most popular', name: 'Lobby Presence', tag: 'Reception that welcomes.', price: '$450/mo',
          items: ['Reception statement piece', 'Weekly rotations ×2', 'Seasonal redesigns', 'Dedicated account manager'] },
        { featured: false, name: 'Full-Service Portfolio', tag: 'Every floor, every room.', price: '$1,200/mo',
          items: ['All lobbies, desks & boardrooms', 'Twice-weekly service', 'Quarterly floral reports', 'Priority same-day swap'] }
      ],
      faqTitle: 'Corporate flower questions',
      faqSub: 'Need a proposal for your office? <a href="contact.html" class="font-bold text-[color:var(--primary)] underline underline-offset-4">Request one</a>.',
      faqs: [
        { q: 'Can we pause during holidays or closures?', a: 'Yes — pause or downsize for any period. Credits roll forward to your next scheduled service.' },
        { q: 'Are the flowers suitable for offices with allergies?', a: 'We recommend low-scent, low-pollen stems and can swap any species your team flags.' },
        { q: 'How does invoicing work?', a: 'Monthly invoicing with net-30 terms for approved accounts. Itemised by location and arrangement.' },
        { q: 'What if an arrangement is damaged?', a: 'We replace any damaged arrangement within 24 hours, free of charge, as part of your plan.' },
        { q: 'Can you handle multiple locations?', a: 'Yes — we service multi-site portfolios across the metro area with a single account manager.' }
      ],
      related: [
        { s: 'subscription', icon: 'fa-solid fa-calendar-check', cls: 'text-[color:var(--honey)]', label: 'Flower Subscriptions', price: 'from $39/mo' },
        { s: 'plant', icon: 'fa-solid fa-leaf', cls: 'text-[color:var(--leaf)]', label: 'Interior Plant Design', price: 'from $199' },
        { s: 'event', icon: 'fa-solid fa-champagne-glasses', cls: 'text-[color:var(--primary-dark)]', label: 'Event Styling', price: 'from $450' }
      ],
      ctaBg: 'linear-gradient(135deg,#b45309,#f59e0b)',
      ctaTitle: 'Bring Bloomora into your office',
      ctaText: 'Get a same-day proposal for your lobbies, desks and meeting rooms.'
    },

    sympathy: {
      name: 'Sympathy Tributes',
      meta: 'Sympathy flower tributes at Bloomora — wreaths, sprays and casket flowers with discreet, timely delivery. From $95.',
      heroA: 'Sympathy',
      heroB: 'Tributes',
      intro: 'Considerate wreaths, stands and sprays with discreet, timely delivery — so you can focus on what matters most.',
      badges: [
        { icon: 'fa-solid fa-star', cls: 'badge-primary', text: 'Rated 4.9/5' },
        { icon: 'fa-solid fa-truck-fast', cls: 'badge-leaf', text: 'Same-day placement' },
        { icon: 'fa-solid fa-lock', cls: 'badge-honey', text: 'Discreet delivery' }
      ],
      img: 'assets/img/service-sympathy.jpg',
      imgAlt: 'White sympathy flower tribute',
      aboutTitle: 'Quietly, thoughtfully arranged',
      aboutText: 'We handle the tribute with care and discretion — coordinating with venues and families so the right flowers arrive at the right place, at the right time.',
      features: [
        { t: 'Discreet handling', d: 'Unbranded delivery and no-drama coordination with venues.' },
        { t: 'Same-day placement', d: 'Order before noon for delivery and placement the same day.' },
        { t: 'Family consultation', d: 'Our florist helps families choose wording, blooms and scale.' },
        { t: 'Thoughtful follow-up', d: 'A follow-up arrangement or donation arrangement on request.' }
      ],
      packTitle: 'Tributes, priced with care',
      packNote: 'Every tribute can be personalised with ribbon, wording and flower choice at no extra design fee.',
      packages: [
        { featured: false, name: 'Quiet Tribute', tag: 'A graceful hand-tied bouquet.', price: '$95',
          items: ['Sympathy hand-tie', 'Card & ribbon', 'Discreet delivery', 'Care instructions'] },
        { featured: true, badge: 'Most popular', name: 'Standing Spray', tag: 'A classic, upright tribute.', price: '$180',
          items: ['Designer standing spray', 'Easel included', 'Same-day placement', 'Family consultation'] },
        { featured: false, name: 'Full Service', tag: 'Complete floral arrangements.', price: '$450',
          items: ['Wreath, sprays & casket flowers', 'Venue coordination', 'Dedicated florist', 'Follow-up arrangement'] }
      ],
      faqTitle: 'Sympathy flower questions',
      faqSub: 'Need something specific? <a href="contact.html" class="font-bold text-[color:var(--primary)] underline underline-offset-4">Talk to a florist</a>.',
      faqs: [
        { q: 'Can you deliver directly to a venue or cemetery?', a: 'Yes — we coordinate placement directly with the venue, church or cemetery and confirm once delivered.' },
        { q: 'Do you offer cremation-friendly tributes?', a: 'We offer natural, bio-degradable tributes and small keepsake pieces suited to cremation services.' },
        { q: 'Can we send flowers without a card?', a: 'Absolutely. All deliveries are unbranded unless you ask us to include a card.' },
        { q: 'What if we need a rush order?', a: 'Call us before 11am and we will do everything possible for same-day placement.' },
        { q: 'Is it possible to contribute to a memorial instead?', a: 'We can arrange a memorial donation of stems to a hospital or charity on your behalf.' }
      ],
      related: [
        { s: 'wedding', icon: 'fa-solid fa-ring', cls: 'text-[color:var(--primary-dark)]', label: 'Wedding Florals', price: 'from $890' },
        { s: 'subscription', icon: 'fa-solid fa-calendar-check', cls: 'text-[color:var(--honey)]', label: 'Flower Subscriptions', price: 'from $39/mo' },
        { s: 'plant', icon: 'fa-solid fa-leaf', cls: 'text-[color:var(--leaf)]', label: 'Interior Plant Design', price: 'from $199' }
      ],
      ctaBg: 'linear-gradient(135deg,#374151,#6b7280)',
      ctaTitle: 'We are here to help',
      ctaText: 'Our florists will guide you gently through the right tribute for the moment.'
    },

    subscription: {
      name: 'Flower Subscriptions',
      meta: 'Flower subscriptions at Bloomora — designer\u2019s choice arrangements weekly, bi-weekly or monthly. Pause or swap anytime. From $39/month.',
      heroA: 'Flower',
      heroB: 'Subscriptions',
      intro: "A designer's choice arrangement on your doorstep weekly, bi-weekly or monthly. Skip, pause or swap anytime.",
      badges: [
        { icon: 'fa-solid fa-star', cls: 'badge-primary', text: 'Rated 4.8/5' },
        { icon: 'fa-solid fa-seedling', cls: 'badge-leaf', text: '2,100+ active subscriptions' },
        { icon: 'fa-solid fa-pause', cls: 'badge-honey', text: 'Pause anytime' }
      ],
      img: 'assets/img/service-subscription.jpg',
      imgAlt: 'Fresh seasonal subscription bouquet',
      aboutTitle: 'Fresh flowers, without the effort',
      aboutText: 'Let our designers choose. Each delivery is a seasonal, hand-tied arrangement — different every time, and fresher than anything off a shelf.',
      features: [
        { t: 'Flexible schedule', d: 'Weekly, bi-weekly or monthly — change it anytime.' },
        { t: 'Pause or skip', d: 'Skip a delivery or pause for holidays in two clicks.' },
        { t: 'Designer\u2019s choice', d: 'Seasonal stems curated by our in-house florists.' },
        { t: 'Free local delivery', d: 'No delivery fee within the metro delivery zone.' }
      ],
      packTitle: 'Subscriptions, priced weekly-friendly',
      packNote: 'Skip, pause or cancel anytime from your account. No lock-in contracts, ever.',
      packages: [
        { featured: false, name: 'Fresh Start', tag: 'A monthly touch of fresh.', price: '$39/mo',
          items: ['Bouquet monthly', 'Seasonal stems', 'Free local delivery', 'Skip or pause anytime'] },
        { featured: true, badge: 'Most popular', name: 'Bloom Boost', tag: 'Flowers that never run out.', price: '$65/mo',
          items: ['Weekly or bi-weekly', 'Premium blooms', 'Vase included (1st delivery)', 'Swap flower types'] },
        { featured: false, name: 'Luxe Line', tag: 'The full studio experience.', price: '$120/mo',
          items: ['Signature arrangements', 'Two deliveries monthly', 'Unlimited swaps', 'Gift wrapping & notes'] }
      ],
      faqTitle: 'Subscription questions',
      faqSub: 'Not sure which plan fits? <a href="contact.html" class="font-bold text-[color:var(--primary)] underline underline-offset-4">Ask us</a>.',
      faqs: [
        { q: 'Can I skip a week or pause completely?', a: 'Yes — skip any delivery or pause your subscription for up to 6 months from your account, no questions asked.' },
        { q: 'What if I do not like the flowers?', a: 'Tell us within 48 hours and we will credit the delivery or send a replacement bouquet you will love.' },
        { q: 'Can I send deliveries to different addresses?', a: 'Yes — set a recurring or one-off different address for any delivery.' },
        { q: 'Do subscriptions auto-renew?', a: 'Yes, monthly. You can cancel at any time with no fee and no lock-in.' },
        { q: 'Are vases included?', a: 'Bloom Boost includes a vase on your first delivery; add vases to any plan for $15 each.' }
      ],
      related: [
        { s: 'corporate', icon: 'fa-solid fa-building', cls: 'text-[color:var(--honey)]', label: 'Corporate Arrangements', price: 'from $120/mo' },
        { s: 'plant', icon: 'fa-solid fa-leaf', cls: 'text-[color:var(--leaf)]', label: 'Interior Plant Design', price: 'from $199' },
        { s: 'wedding', icon: 'fa-solid fa-ring', cls: 'text-[color:var(--primary-dark)]', label: 'Wedding Florals', price: 'from $890' }
      ],
      ctaBg: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
      ctaTitle: 'Start your subscription today',
      ctaText: 'Pick a plan and your first arrangement ships this week.'
    },

    plant: {
      name: 'Interior Plant Design',
      meta: 'Interior plant design at Bloomora — plant schemes, green walls and care plans designed around your light and schedule. From $199.',
      heroA: 'Interior Plant',
      heroB: 'Design',
      intro: 'Stylish plant schemes, care plans and green wall installations designed around your light, humidity and schedule.',
      badges: [
        { icon: 'fa-solid fa-star', cls: 'badge-primary', text: 'Rated 4.9/5' },
        { icon: 'fa-solid fa-seedling', cls: 'badge-leaf', text: '120+ green walls' },
        { icon: 'fa-solid fa-clipboard-check', cls: 'badge-honey', text: 'Care plans included' }
      ],
      img: 'assets/img/service-plant.jpg',
      imgAlt: 'Green interior plant wall in a bright room',
      aboutTitle: 'Breathe life into your space',
      aboutText: 'Plants that thrive, not just survive. We design schemes around your light and lifestyle, install them, and hand over an easy care plan.',
      features: [
        { t: 'Light & humidity survey', d: 'We assess every corner before recommending species.' },
        { t: 'Stylish planters', d: 'Vessels chosen to complement your interior.' },
        { t: 'Green walls & moss walls', d: 'Living installations with integrated irrigation.' },
        { t: 'Care plan & support', d: 'A simple schedule plus maintenance visits if you want them.' }
      ],
      packTitle: 'Plant design, priced by space',
      packNote: 'Add monthly maintenance to any plan for a fixed annual fee. Health guarantee included.',
      packages: [
        { featured: false, name: 'Plant Styling', tag: 'Pot-perfect styling for one room.', price: '$199',
          items: ['Design consultation', 'Up to 8 pots & plants', 'Delivery & placement', '30-day care plan'] },
        { featured: true, badge: 'Most popular', name: 'Living Wall', tag: 'A statement green wall.', price: '$1,400',
          items: ['Custom green wall design', 'Irrigation system', 'Installation & testing', 'Monthly maintenance'] },
        { featured: false, name: 'Full Office Green', tag: 'The whole space, transformed.', price: '$3,000',
          items: ['Whole-space plant scheme', 'Seasonal swaps', 'Monthly care visits', 'Quarterly health report'] }
      ],
      faqTitle: 'Plant design questions',
      faqSub: 'Wondering what will grow in your space? <a href="contact.html" class="font-bold text-[color:var(--primary)] underline underline-offset-4">Book a survey</a>.',
      faqs: [
        { q: 'What if my space has very little light?', a: 'Plenty of plants thrive in low light. We include grow-lights in our survey if your corners need them.' },
        { q: 'Are the plants guaranteed?', a: 'Yes — every plant carries a 6-month health guarantee, with replacements for any plant that fails.' },
        { q: 'Do you maintain the plants for us?', a: 'Maintenance is optional, from monthly visits to full care on the Living Wall and Full Office plans.' },
        { q: 'Can you build a green wall in a rented space?', a: 'Yes — our walls are freestanding or freestanding-friendly with reversible mounting systems.' },
        { q: 'Do you service outdoor spaces too?', a: 'We specialise indoors, but offer seasonal balcony and courtyard styling on request.' }
      ],
      related: [
        { s: 'corporate', icon: 'fa-solid fa-building', cls: 'text-[color:var(--honey)]', label: 'Corporate Arrangements', price: 'from $120/mo' },
        { s: 'subscription', icon: 'fa-solid fa-calendar-check', cls: 'text-[color:var(--primary)]', label: 'Flower Subscriptions', price: 'from $39/mo' },
        { s: 'event', icon: 'fa-solid fa-champagne-glasses', cls: 'text-[color:var(--leaf)]', label: 'Event Styling', price: 'from $450' }
      ],
      ctaBg: 'linear-gradient(135deg,#047857,#10b981)',
      ctaTitle: 'Make your space greener',
      ctaText: 'Book a free plant survey and get a scheme designed for your space.'
    },

    occasions: {
      name: 'Occasion Bouquets',
      meta: 'Occasion bouquets at Bloomora — Valentine\u2019s, birthday, anniversary and celebration arrangements designed to make someone\u2019s day. From $65.',
      heroA: 'Occasion',
      heroB: 'Bouquets',
      intro: 'Bespoke bouquets for birthdays, anniversaries, Valentine\u2019s and every moment in between — styled to the mood, not the template.',
      badges: [
        { icon: 'fa-solid fa-star', cls: 'badge-primary', text: 'Rated 4.9/5' },
        { icon: 'fa-solid fa-seedling', cls: 'badge-leaf', text: '25,000+ bouquets delivered' },
        { icon: 'fa-solid fa-bolt', cls: 'badge-honey', text: 'Same-day delivery option' }
      ],
      img: 'assets/img/service-occasions.jpg',
      imgAlt: 'Celebration bouquet in warm tones',
      aboutTitle: 'A bouquet for every reason to celebrate',
      aboutText: 'Tell us the occasion and the feeling — we translate it into colour, scent and shape. Gifting notes, wrapping and same-day delivery make it effortless.',
      features: [
        { t: 'Occasion styling', d: 'Palettes and stems matched to the moment being celebrated.' },
        { t: 'Gift wrapping & notes', d: 'Beautiful wrap, ribbon and a handwritten card included.' },
        { t: 'Same-day delivery', d: 'Order before 2pm for door-to-door delivery today.' },
        { t: 'Photo follow-up', d: 'We send a photo of your arrangement after delivery.' }
      ],
      packTitle: 'Occasion bouquets, priced by size',
      packNote: 'Add chocolates, balloons or a vase to any bouquet for a small extra. Same-day delivery available in the metro zone.',
      packages: [
        { featured: false, name: 'Simply Sweet', tag: 'A thoughtful hand-tied bouquet.', price: '$65',
          items: ['Hand-tied seasonal bouquet', 'Gift wrap & ribbon', 'Personalised card', 'Standard delivery'] },
        { featured: true, badge: 'Most popular', name: 'Signature Occasion', tag: 'The gesture worth remembering.', price: '$95',
          items: ['Designer occasion bouquet', 'Premium seasonal blooms', 'Vase included', 'Same-day delivery'] },
        { featured: false, name: 'Grand Gesture', tag: 'Make the moment unmissable.', price: '$150',
          items: ['Oversized statement bouquet', 'Chocolate add-on box', 'Priority same-day delivery', 'Photo follow-up'] }
      ],
      faqTitle: 'Occasion bouquet questions',
      faqSub: 'Want something extra special? <a href="contact.html" class="font-bold text-[color:var(--primary)] underline underline-offset-4">Ask our florists</a>.',
      faqs: [
        { q: 'How quickly can you deliver?', a: 'Order before 2pm and we deliver within the metro zone the same day. Outside the zone, next-day delivery is standard.' },
        { q: 'Can I add a gift with the bouquet?', a: 'Yes — chocolates, balloons, vases and plush accents are all available at checkout or by request.' },
        { q: 'Can you match a specific colour theme?', a: 'Absolutely. Share your theme or a photo and we will design around it, recommending seasonal stems that match.' },
        { q: 'What if the recipient is not home?', a: 'We leave the bouquet in a safe, shaded spot and send a delivery confirmation photo.' },
        { q: 'Do you offer corporate occasion orders?', a: 'Yes — bulk orders for employee birthdays and client milestones are handled by our corporate team with net-30 invoicing.' }
      ],
      related: [
        { s: 'wedding', icon: 'fa-solid fa-ring', cls: 'text-[color:var(--primary-dark)]', label: 'Wedding Florals', price: 'from $890' },
        { s: 'subscription', icon: 'fa-solid fa-calendar-check', cls: 'text-[color:var(--honey)]', label: 'Flower Subscriptions', price: 'from $39/mo' },
        { s: 'event', icon: 'fa-solid fa-champagne-glasses', cls: 'text-[color:var(--leaf)]', label: 'Event Styling', price: 'from $450' }
      ],
      ctaBg: 'linear-gradient(135deg,#C06389,#E8A5BE)',
      ctaTitle: "Let's make their day bloom",
      ctaText: 'Order by 2pm for same-day delivery, or call us to design something one-of-a-kind.'
    },

    workshop: {
      name: 'Floristry Workshops',
      meta: 'Floristry workshops at Bloomora — hands-on classes in bouquet making, tablescaping and seasonal stems. From $85 per seat.',
      heroA: 'Floristry',
      heroB: 'Workshops',
      intro: 'Hands-on classes for beginners and budding florists — learn to condition, style and design like the studio pros.',
      badges: [
        { icon: 'fa-solid fa-star', cls: 'badge-primary', text: 'Rated 4.9/5' },
        { icon: 'fa-solid fa-seedling', cls: 'badge-leaf', text: '40+ classes a year' },
        { icon: 'fa-solid fa-users', cls: 'badge-honey', text: 'Small groups of 12' }
      ],
      img: 'assets/img/service-workshop.jpg',
      imgAlt: 'Floristry workshop table with fresh stems',
      aboutTitle: 'Learn the craft, hands-on',
      aboutText: 'From a two-hour bouquet workshop to a six-week professional series, our florists teach the techniques behind every Bloomora arrangement — in small, friendly groups.',
      features: [
        { t: 'All materials included', d: 'Stems, vessels, tools and aprons provided on the day.' },
        { t: 'Take-home arrangement', d: 'Every student leaves with the piece they designed.' },
        { t: 'Small groups', d: 'Max 12 seats so you get real one-on-one coaching.' },
        { t: 'Professional series', d: 'A six-week track for those serious about floristry.' }
      ],
      packTitle: 'Workshops, priced per seat',
      packNote: 'Gift vouchers available. Private groups can book any session for a custom date and theme.',
      packages: [
        { featured: false, name: 'Bloom Basics', tag: 'The perfect first class.', price: '$85',
          items: ['2-hour hands-on workshop', 'All stems & materials', 'Take-home bouquet', 'Tea & refreshments'] },
        { featured: true, badge: 'Most popular', name: 'Signature Series', tag: 'Become a confident designer.', price: '$320',
          items: ['Four-week course', '4 take-home designs', 'Vase & tool kit included', 'Completion certificate'] },
        { featured: false, name: 'Private Group', tag: 'A floral event for your crew.', price: '$500',
          items: ['Up to 12 guests', 'Your venue or ours', 'Custom theme & palette', 'Team-building option'] }
      ],
      faqTitle: 'Workshop questions',
      faqSub: 'Not sure which class fits? <a href="contact.html" class="font-bold text-[color:var(--primary)] underline underline-offset-4">Ask the studio</a>.',
      faqs: [
        { q: 'Do I need any experience?', a: 'None at all. Bloom Basics assumes zero experience; the Signature Series is designed to take you from beginner to confident designer.' },
        { q: 'What do I take home?', a: 'Every arrangement you make, plus — for the Signature Series — a vase, professional tools and your certificate.' },
        { q: 'Can I book a private group?', a: 'Yes, for up to 12 guests. We can host at the studio or come to your venue with all materials.' },
        { q: 'Are workshops available as gifts?', a: 'Gift vouchers are available for every session and never expire.' },
        { q: 'What is your cancellation policy?', a: 'Reschedule for free up to 72 hours before a session; we also run public sessions most weekends.' }
      ],
      related: [
        { s: 'subscription', icon: 'fa-solid fa-calendar-check', cls: 'text-[color:var(--honey)]', label: 'Flower Subscriptions', price: 'from $39/mo' },
        { s: 'plant', icon: 'fa-solid fa-leaf', cls: 'text-[color:var(--leaf)]', label: 'Interior Plant Design', price: 'from $199' },
        { s: 'event', icon: 'fa-solid fa-champagne-glasses', cls: 'text-[color:var(--primary-dark)]', label: 'Event Styling', price: 'from $450' }
      ],
      ctaBg: 'linear-gradient(135deg,#b45309,#f59e0b)',
      ctaTitle: 'Come design with us',
      ctaText: 'Book a seat at our next workshop, or bring a group for a private session.'
    }
  };

  var ORDER = ['wedding', 'event', 'corporate', 'sympathy', 'subscription', 'plant', 'occasions', 'workshop'];

  function param(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  function text(sel, html) {
    var el = document.getElementById(sel);
    if (el) el.innerHTML = html;
  }

  function setText(sel, str) {
    var el = document.getElementById(sel);
    if (el) el.textContent = str;
  }

  function setAttr(sel, attr, val) {
    var el = document.getElementById(sel);
    if (el) el.setAttribute(attr, val);
  }

  function packageCard(p) {
    var featured = !!p.featured;
    var card = '<div class="card p-8 reveal' + (featured ? ' price-card featured' : '') + '">';
    if (p.badge) {
      card += '<span class="badge badge-honey absolute -top-3 start-6">' + p.badge + '</span>';
    }
    card += '<h3 class="font-display text-xl font-semibold">' + p.name + '</h3>';
    card += '<p class="mt-2 text-sm ' + (featured ? 'opacity-85' : 'text-[color:var(--ink-soft)]') + '">' + p.tag + '</p>';
    card += '<p class="mt-5 font-display text-4xl font-semibold ' + (featured ? 'text-[color:var(--honey)]' : 'text-[color:var(--primary)]') + '">' + p.price + '</p>';
    card += '<ul class="mt-6 space-y-3 text-sm' + (featured ? '' : ' text-[color:var(--ink-soft)]') + '">';
    p.items.forEach(function (it) {
      card += '<li class="flex items-center gap-3"><i class="fa-solid fa-check ' + (featured ? 'text-[color:var(--honey)]' : 'text-[color:var(--leaf)]') + '"></i> ' + it + '</li>';
    });
    card += '</ul>';
    card += '<a href="contact.html" class="btn ' + (featured ? 'btn-primary' : 'btn-outline') + ' w-full mt-8">Choose ' + p.name + '</a>';
    card += '</div>';
    return card;
  }

  function renderService(svc) {
    document.title = svc.name + ' – Service Details | Bloomora';
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', svc.meta);

    setText('sd-breadcrumb', svc.name);
    text('sd-title', svc.heroA + ' <span class="text-gradient">' + svc.heroB + '</span>');
    setText('sd-intro', svc.intro);
    setAttr('sd-about-img', 'src', svc.img);
    setAttr('sd-about-img', 'alt', svc.imgAlt);
    setText('sd-about-title', svc.aboutTitle);
    setText('sd-about-text', svc.aboutText);

    text('sd-badges', svc.badges.map(function (b) {
      return '<span class="badge ' + b.cls + '"><i class="' + b.icon + '"></i> ' + b.text + '</span>';
    }).join(''));

    text('sd-about-list', svc.features.map(function (f) {
      return '<li class="flex gap-4"><i class="fa-solid fa-circle-check text-xl text-[color:var(--leaf)] mt-0.5"></i>' +
        '<div><h3 class="font-bold">' + f.t + '</h3><p class="text-sm text-[color:var(--ink-soft)]">' + f.d + '</p></div></li>';
    }).join(''));

    setText('sd-pack-title', svc.packTitle);
    setText('sd-pack-note', svc.packNote);
    text('sd-packages', svc.packages.map(packageCard).join(''));

    setText('sd-faq-title', svc.faqTitle);
    text('sd-faq-sub', svc.faqSub);
    text('sd-faqs', svc.faqs.map(function (f) {
      return '<div class="accordion-item reveal">' +
        '<button type="button" class="accordion-btn">' + f.q + ' <i class="fa-solid fa-chevron-down"></i></button>' +
        '<div class="accordion-body"><div class="accordion-body-inner">' + f.a + '</div></div></div>';
    }).join(''));

    text('sd-related', svc.related.map(function (r) {
      return '<a href="service-details.html?service=' + r.s + '" class="card card-hover p-7 flex items-center gap-4 reveal">' +
        '<i class="' + r.icon + ' text-3xl ' + r.cls + '"></i>' +
        '<div><h3 class="font-bold">' + r.label + '</h3><p class="text-sm text-[color:var(--ink-soft)]">' + r.price + '</p></div></a>';
    }).join(''));

    var cta = document.getElementById('sd-cta');
    if (cta) cta.style.background = svc.ctaBg;
    setText('sd-cta-title', svc.ctaTitle);
    setText('sd-cta-text', svc.ctaText);
  }

  function init() {
    if (!document.getElementById('sd-title')) return;
    var key = param('service');
    if (!SERVICES.hasOwnProperty(key)) key = 'wedding';
    renderService(SERVICES[key]);
    window.bloomServiceKey = key;
    window.bloomServiceOrder = ORDER;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
