/* ============================================================
   js/nav.js  —  Hamburger / mobile drawer navigation
   ============================================================ */

(function () {
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobile-nav');
  const overlay    = document.getElementById('nav-overlay');

  if (!hamburger || !mobileNav || !overlay) return;

  function openNav() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';   // prevent background scroll
  }

  function closeNav() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeNav() : openNav();
  });

  // Close when clicking the overlay
  overlay.addEventListener('click', closeNav);

  // Close when a nav link is tapped (single-page feel)
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });
})();