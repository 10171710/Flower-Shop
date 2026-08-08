/* =========================================================
   Bloomora – Blog article details
   ---------------------------------------------------------
   Renders blog-details.html content based on the ?slug=
   query parameter (defaults to "indoor-blooms"). Runs
   synchronously before main.js init so reveal animation
   binds to the freshly rendered DOM.
   ========================================================= */
(function () {
  'use strict';

  var current = null;

  var ARTICLES = {

    "indoor-blooms": {
      title: '10 Flowers That Bloom Beautifully Indoors',
      category: 'Care Guides',
      categoryCls: 'badge-primary',
      date: 'Feb 18, 2026',
      readTime: '6 min read',
      views: '2.4K views',
      author: 'Iris Bennett',
      initials: 'IB',
      role: 'Founder &amp; Head Florist',
      bio: 'Fourteen years turning flower-obsession into arrangements. Iris writes our care guides and leads the studio\u2019s sustainability programme.',
      img: 'assets/img/blog-indoor-blooms.jpg',
      imgAlt: 'Blooming indoor flowers arrangement',
      meta: 'Read our complete guide to 10 flowers that bloom beautifully indoors \u2014 light needs, care routine and styling tips from Bloomora\u2019s florists.',
      keywords: 'indoor flowers, blooming houseplants, flower care guide, indoor plant tips',
      tags: ['care', 'houseplants', 'indoors'],
      comments: [
        { initials: 'AC', cls: 'from-[#469a62] to-[#6ab681]', name: 'Amelia Chen', meta: 'Feb 19, 2026 \u00b7 09:42', text: 'My peace lily finally bloomed after following your light advice. Thank you!' },
        { initials: 'DO', cls: 'from-[#D985A5] to-[#E8A5BE]', name: 'Daniel Osei', meta: 'Feb 19, 2026 \u00b7 14:15', text: 'Great list. The kalanchoe is genuinely unkillable \u2014 perfect for my office desk.' },
        { initials: 'LN', cls: 'from-[#f59e0b] to-[#fbbf24]', name: 'Lena Novak', meta: 'Feb 20, 2026 \u00b7 11:03', text: 'The cyclamen tip about cool rooms works \u2014 mine lasted three months!' }
      ],
      content: [
        '<p class="text-lg text-[color:var(--ink-soft)] reveal">You don\u2019t need a greenhouse to live among blooms. With the right light, water discipline and a little patience, these ten flowers reward indoor gardeners with weeks of colour \u2014 even in apartments.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">1. Peace Lily (Spathiphyllum)</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">The peace lily blooms in low light \u2014 rare among flowering houseplants. Keep soil lightly moist, avoid direct sun, and it will thank you with white spathes from spring to autumn.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">2. African Violet (Saintpaulia)</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Compact, forgiving and endlessly blooming. Water from below (wet leaves spot), and give it a bright windowsill with no harsh midday sun.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">3. Kalanchoe</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">The ultimate beginner bloomer. Treat it like a succulent: lots of light, little water, and it reblooms readily through winter.</p>',

        '<div class="card p-6 my-8 flex gap-4 items-start reveal">',
        '<i class="fa-solid fa-lightbulb text-2xl text-[color:var(--honey)] mt-1"></i>',
        '<div><p class="font-bold">Florist\u2019s tip</p>',
        '<p class="text-sm text-[color:var(--ink-soft)] mt-1">If you only remember one rule: bright, indirect light beats everything. Most indoor bloomers fail from too little light, not too little water.</p></div>',
        '</div>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">4. Anthurium</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Glossy red or pink spathes that last for weeks. Warm room, steady moisture, and occasional misting in dry winters.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">5. Geranium (Zonal)</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">A sunny indoor spot turns geraniums into non-stop bloomers. Let the top inch of soil dry between waterings and deadhead spent heads weekly.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">6. Cyclamen</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Cool rooms (15\u201318\u00b0C) and bright light keep cyclamen flowering through the darkest months. Water sparingly from the saucer.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">7. Christmas Cactus (Schlumbergera)</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Give it a cool, dark rest for six weeks in autumn and it bursts into candy-coloured blooms right on cue for the holidays.</p>',

        '<div class="rounded-4xl overflow-hidden shadow-soft ring-1 ring-[color:var(--line)] my-8 reveal">',
        '<img src="assets/img/blog-body-indoor-blooms.jpg" alt="Seasonal blooms in a vase" class="w-full">',
        '</div>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">8. Begonia</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Fibrous begonias flower year-round in an east window. Keep consistently moist but never soggy \u2014 and feed monthly.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">9. Jasmine (Pink)</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Incredible fragrance, manageable size. Cool nights encourage buds; bright light and consistent moisture make them open.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">10. Phalaenopsis Orchid</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">The workhorse of indoor orchids. Bright indirect light, a weekly soak, and \u2014 crucially \u2014 a temperature drop at night to trigger reblooming.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-10 mb-3 reveal">A 5-minute care routine</h2>',
        '<ul class="space-y-3 text-[color:var(--ink-soft)] reveal">',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Check soil</strong> with your finger each Sunday \u2014 only water when the top inch is dry.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Rotate pots</strong> a quarter turn so growth stays even toward the light.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Feed monthly</strong> with a half-strength bloom fertiliser from spring to autumn.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Dust leaves</strong> \u2014 clean leaves photosynthesise better and bloom more.</span></li>',
        '</ul>'
      ]
    },

    "wedding-trends": {
      title: '2026 Wedding Flower Trends, Decoded',
      category: 'Trends',
      categoryCls: 'badge-honey',
      date: 'Feb 08, 2026',
      readTime: '7 min read',
      views: '3.1K views',
      author: 'Iris Bennett',
      initials: 'IB',
      role: 'Founder &amp; Head Florist',
      bio: 'Fourteen years turning flower-obsession into arrangements. Iris writes our care guides and leads the studio\u2019s sustainability programme.',
      img: 'assets/img/blog-wedding-trends.jpg',
      imgAlt: 'Wedding flower trends 2026',
      meta: 'From moody dahlias to wild meadow styling \u2014 the wedding flower trends shaping 2026, with the palettes and blooms our couples are booking.',
      keywords: 'wedding flowers, 2026 trends, bridal bouquet trends, wedding florals',
      tags: ['weddings', 'trends', '2026'],
      comments: [
        { initials: 'KM', cls: 'from-[#2b6340] to-[#6ab681]', name: 'Kira Mensah', meta: 'Feb 09, 2026 \u00b7 08:20', text: 'We booked the meadow look for June after reading this \u2014 can\u2019t wait!' },
        { initials: 'SR', cls: 'from-[#C06389] to-[#E8A5BE]', name: 'Sofia Rossi', meta: 'Feb 10, 2026 \u00b7 19:05', text: 'The moody dahlia palette is exactly what I was imagining.' }
      ],
      content: [
        '<p class="text-lg text-[color:var(--ink-soft)] reveal">Wedding florals for 2026 trade the predictable for the personal \u2014 looser silhouettes, deeper palettes and a lot less rose. Here\u2019s what our bridal studio is booking, decoded.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">1. Meadow styling is everywhere</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">The single biggest request this year: arrangements that look gathered from a field, not arranged by hand. Think grasses, poppies, ranunculus and airy stems flowing past the edge of the vase.</p>',

        '<div class="card p-6 my-8 flex gap-4 items-start reveal">',
        '<i class="fa-solid fa-wand-magic-sparkles text-2xl text-[color:var(--honey)] mt-1"></i>',
        '<div><p class="font-bold">How to wear it</p>',
        '<p class="text-sm text-[color:var(--ink-soft)] mt-1">Ask for five to seven different stem types and skip the foam \u2014 loose, chicken-wire construction keeps the meadow feel.</p></div>',
        '</div>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">2. Moody dahlias over blush</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Blush has had a good decade. 2026 couples are gravitating to burgundy, oxblood and caramel dahlias \u2014 saturated tones that photograph dramatically and hold up through an evening.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">3. Sustainable, seasonal and local</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Two in three bookings now ask for seasonal sourcing and compostable mechanics. Local growers, reusable structures and dried-stem keep-sakes are the default, not the upgrade.</p>',

        '<div class="rounded-4xl overflow-hidden shadow-soft ring-1 ring-[color:var(--line)] my-8 reveal">',
        '<img src="assets/img/blog-body-wedding-trends.jpg" alt="Elegant white bridal bouquet" class="w-full">',
        '</div>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">4. Statement backdrops, not just bouquets</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Couples are investing their budget in the moment of impact \u2014 floral arches, hanging installations and aisle lines \u2014 and scaling back on dozens of identical table centrepieces.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">5. Colour-blocked bouquets</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">One colour family, pushed to the limit \u2014 a monochrome coral bouquet, a single-tone cream cascade. It reads effortlessly modern and photographs timelessly.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-10 mb-3 reveal">Book with confidence</h2>',
        '<ul class="space-y-3 text-[color:var(--ink-soft)] reveal">',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Reserve 6\u201312 months out</strong> for peak season (April\u2013October).</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Share a mood board</strong> \u2014 photos beat adjectives every time.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Trust the seasonal swap</strong> \u2014 we keep the mood, not the exact stem.</span></li>',
        '</ul>'
      ]
    },

    "bouquet-fresh": {
      title: 'How to Keep a Bouquet Fresh for 7+ Days',
      category: 'Guides',
      categoryCls: 'badge-leaf',
      date: 'Jan 29, 2026',
      readTime: '4 min read',
      views: '1.8K views',
      author: 'Nina Delacroix',
      initials: 'ND',
      role: 'Studio Lead Florist',
      bio: 'Nina runs the studio floor and obsesses over vase life. Her rulebook on freshness has doubled our bouquets\u2019 lifespan.',
      img: 'assets/img/blog-bouquet-fresh.jpg',
      imgAlt: 'Fresh bouquet care in a vase',
      meta: 'The simple routine that keeps cut flowers looking fresh for a week or more \u2014 trimming, water, food and placement advice from Bloomora\u2019s studio.',
      keywords: 'bouquet care, fresh flowers longer, cut flower care, vase life',
      tags: ['care', 'fresh', 'vase'],
      comments: [
        { initials: 'TP', cls: 'from-[#b45309] to-[#f59e0b]', name: 'Tom Pham', meta: 'Jan 30, 2026 \u00b7 10:11', text: 'The cold-water-only rule changed everything for me.' },
        { initials: 'RG', cls: 'from-[#2b6340] to-[#469a62]', name: 'Rita Gupta', meta: 'Jan 31, 2026 \u00b7 16:47', text: 'Recutting at an angle daily is tedious but it really works.' }
      ],
      content: [
        '<p class="text-lg text-[color:var(--ink-soft)] reveal">Cut flowers are on a timer the moment they\u2019re picked \u2014 but a few simple habits can add five days or more of vase life. Here\u2019s the studio routine we hand out with every bouquet.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Start with a clean vase</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Bacteria is the number-one freshness killer. Wash the vase with hot soapy water before every new bunch \u2014 a rinse is not enough \u2014 then refill with cool, clean water.</p>',

        '<div class="card p-6 my-8 flex gap-4 items-start reveal">',
        '<i class="fa-solid fa-lightbulb text-2xl text-[color:var(--honey)] mt-1"></i>',
        '<div><p class="font-bold">Florist\u2019s tip</p>',
        '<p class="text-sm text-[color:var(--ink-soft)] mt-1">Keep flowers out of the fruit bowl. Ripening fruit releases ethylene gas that ages blooms fast.</p></div>',
        '</div>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Trim on a sharp angle, daily</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">A sharp knife or clean secateurs, cut 1\u20132cm on a 45-degree angle every morning. The angle opens more water channel and stops the stem resting flat against the vase bottom.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Feed them</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Use the flower food sachet included with your bouquet, mixed exactly to the label\u2019s ratio. If you\u2019re out, a teaspoon of sugar plus a few drops of bleach-free citrus sanitizer is a reliable stand-in.</p>',

        '<div class="rounded-4xl overflow-hidden shadow-soft ring-1 ring-[color:var(--line)] my-8 reveal">',
        '<img src="assets/img/blog-body-bouquet-fresh.jpg" alt="Fresh flowers in a clean vase" class="w-full">',
        '</div>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Cool, bright \u2014 never sunny or hot</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Bright but indirect light, away from radiators, TVs and direct sun. Cooler rooms (18\u201322\u00b0C) dramatically slow wilting.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Remove tired stems and foliage</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Strip any leaves that sit below the waterline \u2014 submerged leaves rot and feed bacteria. As stems go soft, remove them; the rest of the bouquet stays fresher without them.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-10 mb-3 reveal">The daily 60-second routine</h2>',
        '<ul class="space-y-3 text-[color:var(--ink-soft)] reveal">',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Morning:</strong> trim stems on an angle, top up cool water.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Every 2 days:</strong> full water change and re-mix flower food.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>As needed:</strong> remove wilting stems and any submerged foliage.</span></li>',
        '</ul>'
      ]
    },

    "flower-colours": {
      title: 'Flower Colour Meanings: What Your Bouquet Says',
      category: 'Trends',
      categoryCls: 'badge-honey',
      date: 'Jan 15, 2026',
      readTime: '5 min read',
      views: '2.2K views',
      author: 'Nina Delacroix',
      initials: 'ND',
      role: 'Studio Lead Florist',
      bio: 'Nina runs the studio floor and obsesses over vase life. Her rulebook on freshness has doubled our bouquets\u2019 lifespan.',
      img: 'assets/img/blog-flower-colours.jpg',
      imgAlt: 'Flower colour meanings',
      meta: 'The language of flower colours \u2014 what red, white, pink, yellow and blue bouquets communicate, plus how to read a palette at a glance.',
      keywords: 'flower colour meaning, flower language, floriography, bouquet meaning',
      tags: ['colour', 'meaning', 'guide'],
      comments: [
        { initials: 'LV', cls: 'from-[#0369a1] to-[#0ea5e9]', name: 'Luca Vieri', meta: 'Jan 16, 2026 \u00b7 12:30', text: 'Sent a yellow bouquet as a thank-you and the recipient loved the backstory.' },
        { initials: 'AN', cls: 'from-[#C06389] to-[#E8A5BE]', name: 'Aisha Noor', meta: 'Jan 18, 2026 \u00b7 21:14', text: 'This explains why my grandmother always chose white lilies.' }
      ],
      content: [
        '<p class="text-lg text-[color:var(--ink-soft)] reveal">Flowers have spoken a quiet language for centuries. Whether you\u2019re gifting or just choosing for the mantel, the colour palette says as much as the stems themselves.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Red \u2014 love, passion, respect</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">The classic. Deep red roses say romantic love; brighter reds (tulips, anthurium) lean admiration and bold energy. In many cultures red is also the colour of celebration and luck.</p>',

        '<div class="card p-6 my-8 flex gap-4 items-start reveal">',
        '<i class="fa-solid fa-wand-magic-sparkles text-2xl text-[color:var(--honey)] mt-1"></i>',
        '<div><p class="font-bold">Gifting note</p>',
        '<p class="text-sm text-[color:var(--ink-soft)] mt-1">A mixed red palette feels thoughtful rather than clich\u00e9d \u2014 think garden roses with dahlias, not a single red dozen.</p></div>',
        '</div>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">White \u2014 purity, remembrance, new beginnings</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">White speaks of sincerity and calm. It\u2019s the colour of weddings and sympathy alike \u2014 elegant, quiet and endlessly versatile alongside any other shade.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Pink \u2014 gratitude, grace, joy</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Soft pinks say thank you and I\u2019m thinking of you. Vivid magentas lean playful and celebratory. Pink is the most forgiving colour to gift \u2014 it suits almost everyone.</p>',

        '<div class="rounded-4xl overflow-hidden shadow-soft ring-1 ring-[color:var(--line)] my-8 reveal">',
        '<img src="assets/img/blog-body-flower-colours.jpg" alt="Pink and white flowers" class="w-full">',
        '</div>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Yellow \u2014 friendship, warmth, new hope</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Golden yellows radiate cheer and friendship. Sunflowers and golden tulips are perfect for congratulations, housewarmings and pick-me-ups.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Purple &amp; blue \u2014 mystery, respect, serenity</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Purple suggests admiration and a touch of mystery; true blues \u2014 rarer in the flower world \u2014 imply trust and calm. Both read sophisticated and slightly unexpected.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-10 mb-3 reveal">Read a bouquet at a glance</h2>',
        '<ul class="space-y-3 text-[color:var(--ink-soft)] reveal">',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>One colour, deep tones:</strong> a focused, considered message.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Warm mix (pink\u2013peach\u2013gold):</strong> celebration and affection.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Cool mix (white\u2013lilac\u2013blue):</strong> elegance, respect, remembrance.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Moody darks (oxblood\u2013burgundy):</strong> drama and quiet power.</span></li>',
        '</ul>'
      ]
    },

    "peonies-101": {
      title: 'Peonies 101: Buying, Storing &amp; Caring for Them',
      category: 'Seasons',
      categoryCls: 'badge-leaf',
      date: 'Jan 08, 2026',
      readTime: '5 min read',
      views: '2.7K views',
      author: 'Iris Bennett',
      initials: 'IB',
      role: 'Founder &amp; Head Florist',
      bio: 'Fourteen years turning flower-obsession into arrangements. Iris writes our care guides and leads the studio\u2019s sustainability programme.',
      img: 'assets/img/blog-peonies-101.jpg',
      imgAlt: 'Peonies in season',
      meta: 'Everything about peonies \u2014 how to buy them tight or open, store them for events, and coax the fullest bloom from every bud.',
      keywords: 'peonies, peony care, peony season, wedding peonies',
      tags: ['peonies', 'season', 'care'],
      comments: [
        { initials: 'MJ', cls: 'from-[#b45309] to-[#fbbf24]', name: 'Mara Jansen', meta: 'Jan 09, 2026 \u00b7 09:03', text: 'The cold-storage tip saved my June wedding budget!' },
        { initials: 'PW', cls: 'from-[#469a62] to-[#6ab681]', name: 'Pauline White', meta: 'Jan 10, 2026 \u00b7 18:22', text: 'I finally understand the marshmallow trick.' }
      ],
      content: [
        '<p class="text-lg text-[color:var(--ink-soft)] reveal">Peonies are the season\u2019s biggest personality \u2014 and its biggest mystery. Buy them wrong or water them lazily and they sulk in tight green balls. Here\u2019s how to master them.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Buy them at the right stage</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">For an event tomorrow, buy peonies already showing colour with soft, marshmallow-feel buds. For next week, buy tight buds and let them open slowly in the cool.</p>',

        '<div class="card p-6 my-8 flex gap-4 items-start reveal">',
        '<i class="fa-solid fa-lightbulb text-2xl text-[color:var(--honey)] mt-1"></i>',
        '<div><p class="font-bold">The marshmallow test</p>',
        '<p class="text-sm text-[color:var(--ink-soft)] mt-1">Gently squeeze a bud. If it feels like a marshmallow \u2014 soft with a little give \u2014 it\u2019s a day or two from full bloom. Rock hard means it\u2019s still a week out.</p></div>',
        '</div>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Store them cold, but not freezing</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">To delay blooms, hold peonies at 2\u20134\u00b0C in a sealed bag with paper towel moisture. They\u2019ll sit happily for a week \u2014 just recut stems and rehydrate before the event.</p>',

        '<div class="rounded-4xl overflow-hidden shadow-soft ring-1 ring-[color:var(--line)] my-8 reveal">',
        '<img src="assets/img/blog-body-peonies-101.jpg" alt="Peony bouquet in bloom" class="w-full">',
        '</div>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Open them on cue</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Need them open faster? Warm water (not hot), bright indirect light, and give the outer green sepals a gentle pull back. Some florists float buds in warm water for ten minutes.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Care once they\u2019re open</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Open peonies are top-heavy and thirsty. Use a short, sturdy vase, change water daily and keep them cool \u2014 warm rooms shorten the glorious stretch of petals fast.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-10 mb-3 reveal">Seasonal cheat sheet</h2>',
        '<ul class="space-y-3 text-[color:var(--ink-soft)] reveal">',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Peak season:</strong> April to June in most regions.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Best partners:</strong> ranunculus, garden roses and lisianthus.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Never:</strong> crowded stems, warm water after bloom, or direct sun.</span></li>',
        '</ul>'
      ]
    },

    "table-styling": {
      title: 'Table Styling Secrets from Our Event Florists',
      category: 'Weddings',
      categoryCls: 'badge-primary',
      date: 'Dec 29, 2025',
      readTime: '6 min read',
      views: '2.0K views',
      author: 'Nina Delacroix',
      initials: 'ND',
      role: 'Studio Lead Florist',
      bio: 'Nina runs the studio floor and obsesses over vase life. Her rulebook on freshness has doubled our bouquets\u2019 lifespan.',
      img: 'assets/img/blog-table-styling.jpg',
      imgAlt: 'Coffee table floral styling',
      meta: 'The spacing, height and flower-mix rules our event team follows to style tables that photograph beautifully and never block the conversation.',
      keywords: 'table styling, event florals, centrepiece ideas, tablescape',
      tags: ['styling', 'tables', 'events'],
      comments: [
        { initials: 'EB', cls: 'from-[#0ea5e9] to-[#38bdf8]', name: 'Eva Berg', meta: 'Dec 30, 2025 \u00b7 15:44', text: 'The 8-inch gap rule completely changed our reception layout.' },
        { initials: 'CS', cls: 'from-[#C06389] to-[#E8A5BE]', name: 'Chloe Singh', meta: 'Jan 01, 2026 \u00b7 11:09', text: 'We did three heights and it looked incredible in photos.' }
      ],
      content: [
        '<p class="text-lg text-[color:var(--ink-soft)] reveal">A great tablescape does three jobs: it sets the mood, frames the photograph and \u2014 crucially \u2014 stays out of the conversation. Here\u2019s the playbook our event team uses on every booking.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Rule 1: Think in heights</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Mix three levels across a table \u2014 low compotes, medium vases and one tall statement \u2014 for depth that photographs beautifully. Never let a centrepiece rise above eye level; guests should always see each other.</p>',

        '<div class="card p-6 my-8 flex gap-4 items-start reveal">',
        '<i class="fa-solid fa-wand-magic-sparkles text-2xl text-[color:var(--honey)] mt-1"></i>',
        '<div><p class="font-bold">Florist\u2019s rule of thumb</p>',
        '<p class="text-sm text-[color:var(--ink-soft)] mt-1">Keep at least 20cm of clear space between the edge of the arrangement and the plates \u2014 elbow room matters more than stem count.</p></div>',
        '</div>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Rule 2: Odd numbers and loose lines</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Arrangements in groups of three read more natural than symmetric pairs. Skip foam and let stems flow in looser, S-curved lines \u2014 symmetry is for architecture, not flowers.</p>',

        '<div class="rounded-4xl overflow-hidden shadow-soft ring-1 ring-[color:var(--line)] my-8 reveal">',
        '<img src="assets/img/blog-body-table-styling.jpg" alt="Styled event table with flowers" class="w-full">',
        '</div>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Rule 3: Repeat the palette, vary the stems</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Use the same two or three colours across every table, but swap the flowers from table to table \u2014 one table of dahlias, the next of garden roses. Cohesive from a distance, surprising up close.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-9 mb-3 reveal">Rule 4: Bring the room into it</h2>',
        '<p class="text-[color:var(--ink-soft)] reveal">Mirror the venue \u2014 warm wood tones, brass candlelight or pale marble \u2014 in your vessel and greenery choices. The tables should feel like the room grew them, not like they arrived.</p>',

        '<h2 class="font-display text-2xl font-semibold mt-10 mb-3 reveal">The pre-event checklist</h2>',
        '<ul class="space-y-3 text-[color:var(--ink-soft)] reveal">',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Walk the tables</strong> at sitting height before guests arrive.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Keep emergency water</strong> and a trim knife backstage.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Set candles</strong> on the same table plan as the flowers.</span></li>',
        '<li class="flex gap-3"><i class="fa-solid fa-circle-check text-[color:var(--leaf)] mt-1.5"></i> <span><strong>Assign one person</strong> to refresh water through the evening.</span></li>',
        '</ul>'
      ]
    }
  };

  var ORDER = ['indoor-blooms', 'wedding-trends', 'bouquet-fresh', 'flower-colours', 'peonies-101', 'table-styling'];

  function param(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  function setText(id, str) {
    var el = document.getElementById(id);
    if (el) el.textContent = str;
  }

  function setHtml(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function setAttr(id, attr, val) {
    var el = document.getElementById(id);
    if (el) el.setAttribute(attr, val);
  }

  function articleUrl(slug) {
    return 'blog-details.html?slug=' + slug;
  }

  function renderComments(list) {
    return list.map(function (c) {
      return '<div class="flex gap-4">' +
        '<span class="avatar-initials w-11 h-11 text-sm bg-gradient-to-br ' + c.cls + ' shrink-0">' + c.initials + '</span>' +
        '<div class="card p-5 flex-1">' +
        '<div class="flex flex-wrap items-center justify-between gap-2">' +
        '<p class="font-bold text-sm">' + c.name + '</p><span class="text-xs text-[color:var(--ink-soft)]">' + c.meta + '</span>' +
        '</div>' +
        '<p class="text-sm text-[color:var(--ink-soft)] mt-2">' + c.text + '</p>' +
        '<button type="button" class="text-xs font-bold text-[color:var(--primary)] mt-3 hover:underline">Reply</button>' +
        '</div></div>';
    }).join('');
  }

  function renderRecent(exclude) {
    return ORDER.filter(function (s) { return s !== exclude; }).slice(0, 3).map(function (slug) {
      var a = ARTICLES[slug];
      return '<li class="flex gap-3"><img src="' + a.img + '" alt="" class="w-16 h-16 shrink-0 rounded-xl object-cover">' +
        '<div><a href="' + articleUrl(slug) + '" class="font-bold text-sm leading-snug hover:text-[color:var(--primary)] transition-colors">' + a.title.toLowerCase() + '</a>' +
        '<p class="text-xs text-[color:var(--ink-soft)] mt-1">' + a.date + '</p></div></li>';
    }).join('');
  }

  function render(a, key) {
    document.title = a.title + ' | Bloomora';
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', a.meta);
    var kw = document.querySelector('meta[name="keywords"]');
    if (kw) kw.setAttribute('content', a.keywords);
    var og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute('content', a.title + ' | Bloomora');

    setText('bd-crumb', a.category);
    setHtml('bd-category', a.category);
    var badge = document.getElementById('bd-category');
    if (badge) badge.className = 'badge ' + a.categoryCls + ' reveal';
    setHtml('bd-title', a.title);
    setHtml('bd-meta',
      '<span class="flex items-center gap-2"><span class="avatar-initials w-8 h-8 text-xs bg-gradient-to-br from-[#F2C0D3] to-[#E8A5BE]">' + a.initials + '</span> ' + a.author + '</span>' +
      '<span class="flex items-center gap-1.5"><i class="fa-regular fa-calendar"></i> ' + a.date + '</span>' +
      '<span class="flex items-center gap-1.5"><i class="fa-regular fa-clock"></i> ' + a.readTime + '</span>' +
      '<span class="flex items-center gap-1.5"><i class="fa-regular fa-eye"></i> ' + a.views + '</span>');
    setAttr('bd-hero', 'src', a.img);
    setAttr('bd-hero', 'alt', a.imgAlt);
    setHtml('bd-content', a.content.join(''));
    setHtml('bd-comments', renderComments(a.comments));

    var url = encodeURIComponent('https://bloomora.com/blog-details.html?slug=' + key);
    var subject = encodeURIComponent('Bloomora Article');
    setAttr('bd-share-fb', 'href', 'https://www.facebook.com/sharer/sharer.php?u=' + url);
    setAttr('bd-share-x', 'href', 'https://x.com/intent/tweet?url=' + url);
    setAttr('bd-share-in', 'href', 'https://www.linkedin.com/sharing/share-offsite/?url=' + url);
    setAttr('bd-share-mail', 'href', 'mailto:?subject=' + subject + '&body=Check%20out%20this%20article%20' + url);

    var idx = ORDER.indexOf(key);
    var prev = idx > 0 ? ARTICLES[ORDER[idx - 1]] : null;
    var next = idx < ORDER.length - 1 ? ARTICLES[ORDER[idx + 1]] : null;

    var prevWrap = document.getElementById('bd-prev-wrap');
    var nextWrap = document.getElementById('bd-next-wrap');
    if (prevWrap) {
      prevWrap.style.display = prev ? '' : 'none';
      if (prev) {
        setAttr('bd-prev', 'href', articleUrl(ORDER[idx - 1]));
        setText('bd-prev-title', prev.title);
      }
    }
    if (nextWrap) {
      nextWrap.style.display = next ? '' : 'none';
      if (next) {
        setAttr('bd-next', 'href', articleUrl(ORDER[idx + 1]));
        setText('bd-next-title', next.title);
      }
    }

    var bio = document.getElementById('bd-author');
    if (bio) {
      setText('bd-author-name', a.author);
      setText('bd-author-role', a.role);
      setText('bd-author-bio', a.bio);
      var initials = bio.querySelector('.avatar-initials');
      if (initials) initials.textContent = a.initials;
    }

    var recent = document.getElementById('bd-recent');
    if (recent) recent.innerHTML = renderRecent(key);

    var catBadge = document.getElementById('bd-badge-cls');
    if (catBadge) catBadge.className = 'badge ' + a.categoryCls;

    current = a;
  }

  /* ---------- Comment form ---------- */
  function initialsOf(name) {
    var parts = String(name).trim().split(/\s+/);
    var out = '';
    for (var i = 0; i < Math.min(2, parts.length); i++) out += (parts[i][0] || '').toUpperCase();
    return out || 'GU';
  }

  function nowMeta() {
    var d = new Date();
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var h = d.getHours();
    var m = d.getMinutes();
    var ampm = h < 12 ? ' AM' : ' PM';
    h = h % 12 || 12;
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() +
      ' \u00b7 ' + h + ':' + (m < 10 ? '0' : '') + m + ampm;
  }

  function setupCommentForm() {
    var nameInput = document.getElementById('c-name');
    if (!nameInput) return;
    var form = nameInput.closest('form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = nameInput.value.trim();
      var email = document.getElementById('c-email').value.trim();
      var msg = document.getElementById('c-message').value.trim();
      if (!name || !msg || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
      if (!current) return;

      current.comments.unshift({
        initials: initialsOf(name),
        cls: 'from-[#F2C0D3] to-[#E8A5BE]',
        name: name,
        meta: nowMeta(),
        text: msg
      });

      setHtml('bd-comments', renderComments(current.comments));
      var count = document.getElementById('bd-comment-count');
      if (count) count.textContent = String(current.comments.length);

      nameInput.value = '';
      document.getElementById('c-email').value = '';
      document.getElementById('c-message').value = '';

      if (window.BloomShop && window.BloomShop.showPopup) {
        window.BloomShop.showPopup('Comment posted', 'Thanks, ' + name.split(' ')[0] + '! Your comment is now live.');
      }
    });
  }

  function init() {
    if (!document.getElementById('bd-title')) return;
    var key = param('slug');
    if (!ARTICLES.hasOwnProperty(key)) key = 'indoor-blooms';
    render(ARTICLES[key], key);
    setupCommentForm();
    window.bloomPostKey = key;
    window.bloomPostOrder = ORDER;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
