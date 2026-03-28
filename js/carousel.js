/* ============================================================
   js/carousel.js  —  Auto-sliding carousel (both instances)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  function initCarousel(carouselIndex) {
    const containers = document.querySelectorAll('.carousel-container');
    if (!containers[carouselIndex]) return;

    const container   = containers[carouselIndex];
    const slides      = container.querySelectorAll('.carousel-slide');
    const indicators  = container.querySelectorAll('.indicator');
    const slidesTrack = container.querySelector('.carousel-slides');

    let currentSlide = 0;
    let interval;

    function showSlide(index) {
      slidesTrack.style.transform = `translateX(${-index * 100}%)`;
      indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));
      currentSlide = index;
    }

    function nextSlide() {
      showSlide((currentSlide + 1) % slides.length);
    }

    function startTimer() {
      clearInterval(interval);
      interval = setInterval(nextSlide, 3500);
    }

    function resetTimer() {
      clearInterval(interval);
      startTimer();
    }

    // Indicator clicks
    indicators.forEach((ind, i) => {
      ind.addEventListener('click', () => {
        showSlide(i);
        resetTimer();
      });
    });

    // Optional arrow buttons (if added to markup)
    const prevBtn = container.querySelector('.carousel-arrow.prev');
    const nextBtn = container.querySelector('.carousel-arrow.next');

    prevBtn?.addEventListener('click', () => {
      showSlide((currentSlide - 1 + slides.length) % slides.length);
      resetTimer();
    });

    nextBtn?.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });

    // Touch / swipe support
    let touchStartX = 0;
    container.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    container.addEventListener('touchend', e => {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) {
        delta < 0 ? nextSlide() : showSlide((currentSlide - 1 + slides.length) % slides.length);
        resetTimer();
      }
    }, { passive: true });

    showSlide(0);
    startTimer();
  }

  initCarousel(0);
  initCarousel(1);

  // ---- Donate button smooth scroll ----
  const donateBtn = document.getElementById('donate-btn');
  const domination = document.getElementById('domination');

  if (donateBtn && domination) {
    donateBtn.addEventListener('click',   () => domination.scrollIntoView({ behavior: 'smooth' }));
    donateBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') domination.scrollIntoView({ behavior: 'smooth' });
    });
  }
});