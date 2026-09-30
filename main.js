const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.menu-btn');
const cancelBtn = document.querySelector('.cancel-btn');

if (menuBtn) {
  menuBtn.onclick = () => {
    navbar.classList.add('show');
    menuBtn.classList.add('hide');
    menuBtn.setAttribute('aria-expanded', 'true');
    if (cancelBtn) cancelBtn.focus();
  };
}

if (cancelBtn) {
  cancelBtn.onclick = () => {
    navbar.classList.remove('show');
    menuBtn.classList.remove('hide');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.focus();
  };
}

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const logoImage = document.getElementById('logo-image');
  const windowPosition = window.scrollY > 40;
  nav.classList.toggle('scroll-active', windowPosition);
  logoImage.classList.toggle('logo-scroll', windowPosition);
});

// Category nav active state
const navCategories = document.querySelectorAll('.nav-category');

if (navCategories.length > 0) {
  const sectionIds = Array.from(navCategories).map(a => a.dataset.section).filter(Boolean);
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const categoryNavHeight = 175;

  const updateActive = () => {
    let current = sectionIds[0];
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= categoryNavHeight + 10) {
        current = section.id;
      }
    });
    navCategories.forEach(a => {
      a.classList.toggle('active', a.dataset.section === current);
    });
  };

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  navCategories.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(a.dataset.section);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - categoryNavHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// Scroll reveal
(function revealOnScroll() {
  if (!('IntersectionObserver' in window)) return;

  const selectors = [
    '.historia-block',
    '.value-item',
    '.feature-item',
    '.info-item',
    '.contacto-form-wrapper',
    '.food-type',
    '.reservaciones-wrapper',
  ];

  const els = [];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.setAttribute('data-reveal', '');
      els.push(el);
    });
  });

  if (els.length === 0) return;

  // Stagger siblings that share the same direct parent
  const groups = new Map();
  els.forEach(el => {
    const p = el.parentElement;
    if (!groups.has(p)) groups.set(p, []);
    groups.get(p).push(el);
  });
  groups.forEach(siblings => {
    if (siblings.length > 1) {
      siblings.forEach((el, i) => el.style.setProperty('--reveal-delay', `${i * 90}ms`));
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => observer.observe(el));
})();

// Inicio grid-section child reveals
(function gridReveal() {
  const grids = document.querySelectorAll('.presentation .grid-area');
  if (!grids.length || !('IntersectionObserver' in window)) return;

  const childSelectors = [
    '.invitation', '.paragraph-container', '.logo-restaurante',
    '#green-breathe', '#cream-separator', '.montecasino-title', '.small-text-container',
  ];

  grids.forEach(grid => {
    grid.setAttribute('data-grid', '');
    childSelectors.forEach(sel => {
      grid.querySelectorAll(sel).forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'none';
      });
    });
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  grids.forEach(g => obs.observe(g));
})();
