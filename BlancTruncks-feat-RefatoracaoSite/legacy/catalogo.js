/* Catálogo — renderização, navegação sticky, pills e scroll */
(function () {
  const page = document.querySelector('.page-catalog');
  if (!page) return;

  const categories = window.CATALOG_CATEGORIES || [];
  const lines = window.CATALOG_LINES || [];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function buildProductCard(product, index, total) {
    const num = String(index + 1).padStart(2, '0');
    const totalStr = String(total).padStart(2, '0');
    const classes = ['product-card'];
    if (product.hero) classes.push('product-card--hero');
    if (product.spotlight) classes.push('product-card--spotlight');

    let badge = '';
    if (product.badge) {
      const badgeClass =
        product.badge === 'Novo'
          ? 'product-badge product-badge--new'
          : product.badge === 'Edição limitada'
            ? 'product-badge product-badge--drop'
            : 'product-badge';
      badge = `<span class="${badgeClass}">${escapeHtml(product.badge)}</span>`;
    }

    return `
      <article class="${classes.join(' ')}">
        ${badge}
        <div class="product-number">${num} / ${totalStr}</div>
        <div class="product-img">
          <img src="${escapeHtml(product.img)}" alt="${escapeHtml(product.name)}" loading="lazy" width="800" height="600" decoding="async">
        </div>
        <h3 class="product-name">${escapeHtml(product.name)}</h3>
        <p class="product-desc">${escapeHtml(product.desc)}</p>
        <div class="product-price">R$ ${product.price}</div>
      </article>
    `;
  }

  function renderCatalog() {
    lines.forEach((line) => {
      const mount = document.querySelector(`[data-catalog-mount="${line.gender}"]`);
      if (!mount) return;

      const fragment = document.createDocumentFragment();

      categories.forEach((cat) => {
        const products = line.products.filter((p) => p.category === cat.slug);
        if (!products.length) return;

        const section = document.createElement('section');
        section.className = 'catalog-category reveal';
        section.id = `${line.prefix}-${cat.slug}`;

        section.innerHTML = `
          <div class="catalog-category-head">
            <h3 class="catalog-category-title">${escapeHtml(cat.title)}</h3>
            <span class="catalog-category-count">${products.length} peças</span>
          </div>
          <div class="catalog-grid"></div>
        `;

        const grid = section.querySelector('.catalog-grid');
        grid.innerHTML = products
          .map((p, i) => buildProductCard(p, i, products.length))
          .join('');

        fragment.appendChild(section);
      });

      mount.replaceChildren(fragment);
    });
  }

  renderCatalog();

  const genderTabs = document.querySelectorAll('.catalog-gender-tab');
  const pillBar = document.getElementById('catalog-pills');
  const genderSections = document.querySelectorAll('.catalog-gender');

  const pillsByGender = {
    masculino: categories.map((c) => ({
      href: `#m-${c.slug}`,
      label: c.title,
    })),
    feminino: categories.map((c) => ({
      href: `#f-${c.slug}`,
      label: c.title,
    })),
  };

  function renderPills(gender) {
    if (!pillBar) return;
    const items = pillsByGender[gender] || pillsByGender.masculino;
    pillBar.innerHTML = items
      .map(
        (p) =>
          `<a href="${p.href}" class="catalog-pill" data-pill>${escapeHtml(p.label)}</a>`
      )
      .join('');
    bindPillClicks();
    observeCategories();
  }

  function smoothScrollTo(el) {
    if (!el) return;
    const behavior = prefersReducedMotion ? 'auto' : 'smooth';
    el.scrollIntoView({ behavior, block: 'start' });
  }

  function bindPillClicks() {
    if (!pillBar) return;
    pillBar.querySelectorAll('.catalog-pill').forEach((pill) => {
      pill.addEventListener('click', (e) => {
        const id = pill.getAttribute('href')?.slice(1);
        const target = id ? document.getElementById(id) : null;
        if (target) {
          e.preventDefault();
          smoothScrollTo(target);
        }
      });
    });
  }

  genderTabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      const href = tab.getAttribute('href');
      if (!href?.startsWith('#')) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        smoothScrollTo(target);
      }
    });
  });

  const genderObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        const gender = id === 'feminino' ? 'feminino' : 'masculino';
        genderTabs.forEach((t) => {
          const active = t.getAttribute('href') === `#${id}`;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        renderPills(gender);
      });
    },
    { rootMargin: '-40% 0px -45% 0px', threshold: 0 }
  );

  genderSections.forEach((section) => genderObserver.observe(section));

  let categoryObserver;

  function observeCategories() {
    if (categoryObserver) categoryObserver.disconnect();
    categoryObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible || !pillBar) return;
        const id = visible.target.id;
        pillBar.querySelectorAll('.catalog-pill').forEach((pill) => {
          pill.classList.toggle('is-active', pill.getAttribute('href') === `#${id}`);
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    );
    document.querySelectorAll('.catalog-category').forEach((cat) => {
      categoryObserver.observe(cat);
    });
  }

  renderPills('masculino');

  const packGallery = document.querySelector('[data-pack-gallery]');
  if (packGallery) {
    const slides = [...packGallery.querySelectorAll('.catalog-pack-slides .catalog-pack-slide')];
    const prevBtn = packGallery.querySelector('.catalog-pack-arrow--prev');
    const nextBtn = packGallery.querySelector('.catalog-pack-arrow--next');
    const thumbsWrap = packGallery.querySelector('[data-pack-thumbs]');
    const counterEl = packGallery.querySelector('[data-pack-counter]');
    let activeIndex = slides.findIndex((s) => s.classList.contains('is-active'));
    if (activeIndex < 0) activeIndex = 0;

    function pad(n) {
      return String(n).padStart(2, '0');
    }

    function setActive(index) {
      const n = slides.length;
      activeIndex = ((index % n) + n) % n;

      slides.forEach((slide, i) => {
        const on = i === activeIndex;
        slide.classList.toggle('is-active', on);
        slide.setAttribute('aria-hidden', on ? 'false' : 'true');
      });

      thumbsWrap?.querySelectorAll('.catalog-pack-thumb').forEach((thumb, i) => {
        thumb.classList.toggle('is-active', i === activeIndex);
        thumb.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
      });

      if (counterEl) {
        counterEl.textContent = `${pad(activeIndex + 1)} / ${pad(n)}`;
      }
    }

    if (thumbsWrap) {
      slides.forEach((slide, i) => {
        const img = slide.querySelector('img');
        const thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.className = 'catalog-pack-thumb';
        thumb.setAttribute('role', 'tab');
        thumb.setAttribute('aria-label', img?.alt || `Foto ${i + 1}`);
        thumb.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
        if (i === activeIndex) thumb.classList.add('is-active');

        const thumbImg = document.createElement('img');
        thumbImg.src = img?.src || '';
        thumbImg.alt = '';
        thumbImg.loading = 'lazy';
        thumbImg.decoding = 'async';
        thumb.appendChild(thumbImg);

        thumb.addEventListener('click', () => setActive(i));
        thumbsWrap.appendChild(thumb);
      });
    }

    prevBtn?.addEventListener('click', () => setActive(activeIndex - 1));
    nextBtn?.addEventListener('click', () => setActive(activeIndex + 1));

    packGallery.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActive(activeIndex - 1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActive(activeIndex + 1);
      }
    });

    let touchStartX = 0;
    packGallery.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );
    packGallery.addEventListener(
      'touchend',
      (e) => {
        const dx = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(dx) < 40) return;
        setActive(dx < 0 ? activeIndex + 1 : activeIndex - 1);
      },
      { passive: true }
    );

    setActive(activeIndex);
  }

  document.querySelectorAll('.reveal').forEach((el) => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
  });
})();
