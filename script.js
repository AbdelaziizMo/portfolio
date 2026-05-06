/* =========================================
   ALEX MERCER — AI ENGINEER PORTFOLIO
   script.js
   ========================================= */

'use strict';

/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');
  if (!cursor || !trail) return;

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    trail.style.left = trailX + 'px';
    trail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    trail.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    trail.style.opacity = '1';
  });
})();


/* ── TYPED TEXT EFFECT ── */
(function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'Data Engineer',
    'ETL Pipeline Architect',
    'Data Warehouse Designer',
    'Apache Airflow Engineer',
    'SQL & Python Developer',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  const SPEED_TYPE   = 75;
  const SPEED_DELETE = 38;
  const PAUSE_END    = 1800;
  const PAUSE_START  = 400;

  function tick() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
      setTimeout(tick, SPEED_TYPE);
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
      setTimeout(tick, SPEED_DELETE);
    }
  }

  setTimeout(tick, 900);
})();


/* ── NAV: scroll shadow + active link ── */
(function initNav() {
  const nav       = document.getElementById('nav');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
  const toggle    = document.getElementById('navToggle');
  const linksList = document.getElementById('navLinks');

  // Hamburger toggle
  toggle?.addEventListener('click', () => {
    const open = linksList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    // Animate spans
    const spans = toggle.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      linksList.classList.remove('open');
      const spans = toggle?.querySelectorAll('span');
      spans?.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // Scroll spy
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        active?.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));

  // Nav shadow on scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();


/* ── SCROLL REVEAL ── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();


/* ── SKILL BARS ── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width || '0';
        // Small stagger based on position
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
})();


/* ── CONTACT FORM ── */
(function initForm() {
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic validation
    if (!name || !email || !message) {
      status.textContent = '⚠ Please fill in all fields.';
      status.style.color = '#ff6b6b';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = '⚠ Please enter a valid email address.';
      status.style.color = '#ff6b6b';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.style.color = 'var(--accent)';
    status.textContent = '';

    // Simulate async send (replace with real endpoint)
    await new Promise(r => setTimeout(r, 1400));

    status.textContent = '✓ Message sent! I\'ll get back to you soon.';
    status.style.color = 'var(--accent)';
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message →';

    setTimeout(() => { status.textContent = ''; }, 5000);
  });
})();


/* ── SMOOTH ANCHOR SCROLL ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ── PARALLAX HERO GRID ── */
(function initParallax() {
  const gridBg = document.querySelector('.hero-grid-bg');
  if (!gridBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      gridBg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });
})();


/* ── PROJECT CARD TILT ── */
(function initTilt() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 4;
      card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ── ACTIVE NAV LINK STYLE ── */
const navStyle = document.createElement('style');
navStyle.textContent = `.nav-link.active { color: var(--accent); }
.nav-link.active::after { width: 100%; }`;
document.head.appendChild(navStyle);


/* ── THEME TOGGLE ── */
(function initTheme() {
  const btn  = document.getElementById('themeToggle');
  const root = document.documentElement;

  // Restore saved preference
  const saved = localStorage.getItem('theme');
  if (saved === 'light') root.setAttribute('data-theme', 'light');

  btn?.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
})();


/* ── FIX: cursor-trail z-index vs nav ── */
/* The cursor trail sits at z-index 9999 globally which can
   visually overlap nav items. We cap pointer-events: none
   already, but we also ensure the trail shrinks when over nav */
(function fixCursorNav() {
  const trail = document.getElementById('cursorTrail');
  const nav   = document.getElementById('nav');
  if (!trail || !nav) return;

  document.addEventListener('mousemove', e => {
    const navRect = nav.getBoundingClientRect();
    const overNav = e.clientY <= navRect.bottom;
    trail.style.opacity = overNav ? '0' : '1';
  });
})();
