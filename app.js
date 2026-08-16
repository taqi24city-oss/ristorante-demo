/* ============================================================================
   LA TABLE DU BOULANGER — SCRIPT PRINCIPAL
   ----------------------------------------------------------------------------
   Injecte les données de config.js dans la page, gère la navigation mobile
   et les légères animations d'apparition.
   Aucune donnée du restaurant n'est définie ici : tout se trouve dans
   RESTAURANT_CONFIG (fichier config.js).
   ============================================================================ */

(function () {
  'use strict';

  if (typeof RESTAURANT_CONFIG === 'undefined') {
    return;
  }
  var cfg = RESTAURANT_CONFIG;

  /* ---------- Utilitaires ---------- */

  function $(selector, context) {
    return (context || document).querySelector(selector);
  }

  function $all(selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text != null) { node.textContent = text; }
    return node;
  }

  /* ---------- Données dérivées de la configuration ---------- */

  var LINKS = {
    tel: 'tel:' + cfg.phone.international,
    maps: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(cfg.address.full),
    facebook: cfg.links.facebookUrl || '#'
  };

  var firstOpenDay = cfg.hours[0] || { days: '', time: '' };

  var TEXT = {
    name: cfg.name,
    subtitle: cfg.subtitle,
    type: cfg.type,
    addressStreet: cfg.address.street,
    addressCity: cfg.address.city,
    addressCityLine: cfg.address.postalCode + ' ' + cfg.address.city,
    addressCountry: cfg.address.country,
    addressFull: cfg.address.full,
    phoneDisplay: cfg.phone.display,
    ratingLine: cfg.rating.display + ' / ' + cfg.rating.max + ' — ' + cfg.rating.reviewsLabel,
    ratingShort: cfg.rating.display + ' / ' + cfg.rating.max,
    hoursSummary: firstOpenDay.days + ' · ' + firstOpenDay.time
  };

  var STAR_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.7l2.85 5.77 6.38.93-4.62 4.5 1.09 6.36L12 17.28l-5.7 2.98 1.09-6.36-4.62-4.5 6.38-.93z"/></svg>';

  var ICONS = {
    cutlery: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 2v5a2 2 0 0 0 4 0V2"/><path d="M9 9.5V22"/><path d="M17 2c-1.7 1.6-2.3 4.4-1.3 7.1.2.5.7.9 1.3.9"/><path d="M17 2v20"/></svg>',
    pin: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 21.5c-4.3-3.7-6.8-7.2-6.8-10.5a6.8 6.8 0 1 1 13.6 0c0 3.3-2.5 6.8-6.8 10.5z"/><circle cx="12" cy="10.6" r="2.7"/></svg>',
    clock: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.6"/><path d="M12 7.2V12l3.3 2"/></svg>',
    star: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2.7l2.85 5.77 6.38.93-4.62 4.5 1.09 6.36L12 17.28l-5.7 2.98 1.09-6.36-4.62-4.5 6.38-.93z"/></svg>'
  };

  document.title = cfg.name + ' — ' + cfg.subtitle;

  /* ---------- 1. Injection des textes et des liens ---------- */

  $all('[data-config]').forEach(function (node) {
    var key = node.getAttribute('data-config');
    if (key in TEXT) { node.textContent = TEXT[key]; }
  });

  $all('[data-config-href]').forEach(function (link) {
    var key = link.getAttribute('data-config-href');
    if (!(key in LINKS)) { return; }
    link.setAttribute('href', LINKS[key]);
    if (key === 'maps' || key === 'facebook') {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    }
  });

  /* Lien Facebook non configuré : le désactiver proprement. */
  $all('[data-config-href="facebook"]').forEach(function (link) {
    if (cfg.links.facebookUrl) {
      $all('.coming-soon', link).forEach(function (hint) { hint.remove(); });
    } else {
      link.classList.add('is-placeholder');
      link.setAttribute('aria-disabled', 'true');
      link.addEventListener('click', function (event) { event.preventDefault(); });
    }
  });

  /* ---------- 2. Points forts (introduction) ---------- */

  $all('[data-highlights]').forEach(function (wrap) {
    var items = [
      { icon: 'cutlery', label: cfg.type },
      { icon: 'pin', label: TEXT.addressCityLine },
      { icon: 'clock', label: TEXT.hoursSummary },
      { icon: 'star', label: 'Note Google : ' + TEXT.ratingShort }
    ];
    items.forEach(function (item) {
      var chip = el('span', 'fact-chip');
      chip.innerHTML = ICONS[item.icon];
      chip.appendChild(el('span', null, item.label));
      wrap.appendChild(chip);
    });
  });

  /* ---------- 3. Horaires ---------- */

  $all('[data-hours-list]').forEach(function (list) {
    cfg.hours.forEach(function (entry) {
      var row = el('li', 'hours-row' + (entry.closed ? ' is-closed' : ''));
      row.appendChild(el('span', 'hours-days', entry.days));
      row.appendChild(el('span', 'hours-time', entry.time));
      list.appendChild(row);
    });
  });

  /* ---------- 4. Note Google (étoiles) ---------- */

  $all('[data-rating]').forEach(function (wrap) {
    wrap.appendChild(el('span', 'sr-only',
      'Note Google : ' + cfg.rating.display + ' sur ' + cfg.rating.max + ', ' + cfg.rating.reviewsLabel + '.'));
    var stars = el('span', 'rating-stars');
    stars.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 5; i++) {
      var remaining = cfg.rating.score - i;
      var star = el('span', 'star');
      star.innerHTML = STAR_SVG;
      if (remaining >= 1) {
        star.className = 'star star-full';
      } else if (remaining > 0) {
        star.className = 'star star-half';
        var layer = el('span', 'star-layer');
        layer.innerHTML = STAR_SVG;
        star.appendChild(layer);
      } else {
        star.className = 'star star-empty';
      }
      stars.appendChild(star);
    }
    wrap.appendChild(stars);
    wrap.appendChild(el('span', 'rating-text', TEXT.ratingLine));
  });

  /* ---------- 5. Menu du jour ---------- */

  (function renderMenu() {
    var root = $('[data-menu-root]');
    if (!root) { return; }
    var categories = (cfg.menu && cfg.menu.categories) || [];
    var list = $('[data-menu-categories]', root);
    if (!categories.length || !list) { return; }

    categories.forEach(function (category) {
      var wrap = el('div', 'menu-category');
      wrap.appendChild(el('h3', 'menu-category-title', category.title));
      var items = el('ul', 'menu-items');
      (category.items || []).forEach(function (item) {
        var li = el('li', 'menu-item');
        var head = el('div', 'menu-item-head');
        head.appendChild(el('span', 'menu-item-name', item.name));
        head.appendChild(el('span', 'menu-item-dots'));
        if (item.price != null) {
          head.appendChild(el('span', 'menu-item-price', item.price));
        }
        li.appendChild(head);
        if (item.description) {
          li.appendChild(el('p', 'menu-item-desc', item.description));
        }
        items.appendChild(li);
      });
      wrap.appendChild(items);
      list.appendChild(wrap);
    });

    var emptyState = $('[data-menu-empty]', root);
    if (emptyState) { emptyState.hidden = true; }
    list.hidden = false;
  })();

  /* ---------- 6. Année du pied de page ---------- */

  $all('[data-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  /* ---------- 7. Navigation mobile ---------- */

  var header = $('.site-header');
  var navToggle = $('#nav-toggle');

  function setNav(open) {
    if (!header || !navToggle) { return; }
    header.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation');
  }

  if (header && navToggle) {
    navToggle.addEventListener('click', function () {
      setNav(!header.classList.contains('nav-open'));
    });

    $all('.site-nav a').forEach(function (link) {
      link.addEventListener('click', function () { setNav(false); });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && header.classList.contains('nav-open')) {
        setNav(false);
        navToggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (header.classList.contains('nav-open') && !header.contains(event.target)) {
        setNav(false);
      }
    });

    var desktop = window.matchMedia('(min-width: 900px)');
    var onDesktopChange = function () { setNav(false); };
    if (desktop.addEventListener) {
      desktop.addEventListener('change', onDesktopChange);
    } else if (desktop.addListener) {
      desktop.addListener(onDesktopChange);
    }
  }

  /* ---------- 8. Ombre de l'en-tête au défilement ---------- */

  function onScroll() {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 9. Apparition douce des sections ---------- */

  var revealTargets = $all('[data-reveal]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduceMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (node) { observer.observe(node); });
  } else {
    revealTargets.forEach(function (node) { node.classList.add('is-visible'); });
  }
})();
