/* =============================================
   BLANCK TRUNCKS — script.js
   ============================================= */

/* ------------------------------------------
   CUSTOM CURSOR
------------------------------------------ */

const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

const prefersCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;

if (cursor && cursorRing && !prefersCoarsePointer) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });
}

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';

  requestAnimationFrame(animateRing);
}

if (cursor && cursorRing && !prefersCoarsePointer) {
  animateRing();
}

/* Cursor hover effect on interactive elements */
const interactiveEls = document.querySelectorAll(
  'a, button, .product-card, .partner-card, .nav-cta, .stat-item, .nav-toggle'
);

/* ------------------------------------------
   NAV MOBILE
------------------------------------------ */

const siteNav = document.getElementById('site-nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

function setNavOpen(isOpen) {
  if (!siteNav || !navToggle) return;
  siteNav.classList.toggle('nav-open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('nav-open', isOpen);
}

function closeNav() {
  setNavOpen(false);
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = !siteNav.classList.contains('nav-open');
    setNavOpen(isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) closeNav();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
}

if (!prefersCoarsePointer) {
interactiveEls.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform      = 'translate(-50%, -50%) scale(2)';
    cursorRing.style.width      = '60px';
    cursorRing.style.height     = '60px';
    cursorRing.style.opacity    = '0.5';
  });

  el.addEventListener('mouseleave', () => {
    cursor.style.transform      = 'translate(-50%, -50%) scale(1)';
    cursorRing.style.width      = '36px';
    cursorRing.style.height     = '36px';
    cursorRing.style.opacity    = '1';
  });
});
}

/* ------------------------------------------
   SCROLL REVEAL (IntersectionObserver)
------------------------------------------ */

const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ------------------------------------------
   STATS BAR — contagem, links e teclado
------------------------------------------ */

const statsBar = document.getElementById('stats');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function formatStatValue(value, suffix = '') {
  return `${Math.round(value)}${suffix}`;
}

function animateStatNumber(el, target, suffix = '', duration = 1600) {
  if (prefersReducedMotion) {
    el.textContent = formatStatValue(target, suffix);
    return;
  }

  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatStatValue(target * eased, suffix);
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function initStatItems() {
  if (!statsBar) return;

  statsBar.querySelectorAll('.stat-item').forEach((item) => {
    const numEl = item.querySelector('.stat-num');
    if (!numEl) return;

    const href = numEl.dataset.statHref;
    if (!href) return;

    item.setAttribute('role', 'link');
    item.setAttribute('tabindex', '0');

    const go = () => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    };

    item.addEventListener('click', go);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go();
      }
    });
  });
}

function runStatsCounters() {
  if (!statsBar || statsBar.dataset.counted === '1') return;
  statsBar.dataset.counted = '1';

  statsBar.querySelectorAll('.stat-num').forEach((el, index) => {
    const symbol = el.dataset.symbol;
    if (symbol) {
      el.textContent = symbol;
      return;
    }

    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;

    const suffix = el.dataset.suffix || '';
    const delay = prefersReducedMotion ? 0 : index * 120;
    window.setTimeout(() => animateStatNumber(el, target, suffix), delay);
  });
}

if (statsBar) {
  initStatItems();

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        runStatsCounters();
        statsObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );

  statsObserver.observe(statsBar);
}

/* MANIFESTO — boneco começa a voar assim que a secção encosta na tela */
const MANIFESTO_MARKS_AFTER_FLY_FRAC = 0.14;

const manifestoSection = document.querySelector('#manifesto');
const manifestoFlyer   = document.querySelector('.manifesto-flyer');

if (manifestoSection && manifestoFlyer) {
  const manifestoTitle = document.querySelector('.manifesto-title');

  const scheduleManifestoMarksReveal = () => {
    if (!manifestoTitle || manifestoTitle.classList.contains('manifesto-title--marks-out')) return;
    if (manifestoFlyer.dataset.marksRevealScheduled === '1') return;

    manifestoFlyer.dataset.marksRevealScheduled = '1';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      manifestoTitle.classList.add('manifesto-title--marks-out');
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const anims = manifestoFlyer.getAnimations();
        const flyAnim = anims.find((a) => a.animationName === 'manifestoFlyAcross');
        let durationMs = 22000;

        if (flyAnim && flyAnim.effect && typeof flyAnim.effect.getTiming === 'function') {
          const raw = flyAnim.effect.getTiming().duration;
          durationMs = typeof raw === 'number' ? raw : parseFloat(String(raw)) || 22000;
        }

        const delayMs = Math.round(durationMs * MANIFESTO_MARKS_AFTER_FLY_FRAC);

        window.setTimeout(() => {
          manifestoTitle.classList.add('manifesto-title--marks-out');
        }, delayMs);
      });
    });
  };

  const flyerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || manifestoFlyer.dataset.flyStarted === '1') return;

        manifestoFlyer.dataset.flyStarted = '1';
        manifestoFlyer.classList.add('manifesto-flyer--playing');
        scheduleManifestoMarksReveal();
      });
    },
    { threshold: 0 }
  );
  flyerObserver.observe(manifestoSection);
}

/* ------------------------------------------
   NEWSLETTER FORM — basic feedback
------------------------------------------ */

const newsletterBtn   = document.querySelector('.newsletter-btn');
const newsletterInput = document.querySelector('.newsletter-input');

if (newsletterBtn && newsletterInput) {
  newsletterBtn.addEventListener('click', () => {
    const email = newsletterInput.value.trim();

    if (!email || !email.includes('@')) {
      newsletterInput.style.borderColor = 'rgba(200, 80, 80, 0.6)';
      newsletterInput.focus();
      return;
    }

    newsletterInput.style.borderColor = 'rgba(200, 184, 154, 0.6)';
    newsletterBtn.textContent          = 'Inscrito ✓';
    newsletterBtn.style.background     = '#c8b89a';
    newsletterInput.value              = '';
    newsletterBtn.disabled             = true;
  });

  newsletterInput.addEventListener('input', () => {
    newsletterInput.style.borderColor = '';
  });
}

/* ------------------------------------------
   SMOOTH SCROLL for anchor links
------------------------------------------ */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ------------------------------------------
   NAV — background on scroll
------------------------------------------ */

const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(10, 10, 10, 0.97)';
    nav.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
  } else {
    nav.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.95), transparent)';
    nav.style.borderBottom = 'none';
  }
});

/* Hero vídeo — respeitar prefers-reduced-motion */
const heroVideo = document.querySelector('.hero-video__media');
if (heroVideo && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroVideo.pause();
  heroVideo.removeAttribute('autoplay');
}