document.addEventListener('DOMContentLoaded', () => {
  //ini that CAROUSELL
  function initCarousel(carouselIndex) {
    const carouselContainer = document.querySelectorAll('.carousel-container')[carouselIndex];
    const slides = carouselContainer.querySelectorAll('.carousel-slide');
    const indicators = carouselContainer.querySelectorAll('.indicator');
    const prevBtn = carouselContainer.querySelector('.carousel-arrow.prev');
    const nextBtn = carouselContainer.querySelector('.carousel-arrow.next');
    let currentSlide = 0;
    let interval;

    function showSlide(index) {
      const carouselSlides = carouselContainer.querySelector('.carousel-slides');
      const offset = -index * 100;
      carouselSlides.style.transform = `translateX(${offset}%)`;

      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    }

    function showNextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function showPrevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    function startAutoSlide() {
      interval = setInterval(showNextSlide, 3500);
    }

       nextBtn?.addEventListener('click', () => {
      showNextSlide();
      resetTimer();
    });

    prevBtn?.addEventListener('click', () => {
      showPrevSlide();
      resetTimer();
    });

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetTimer();
      });
    });

    // Initial load
    showSlide(currentSlide);
    startAutoSlide();
  }

  
  initCarousel(0);  // For the first carousel
  initCarousel(1);  //second
});

//fucntion for the donation button
document.getElementById("donate-btn").addEventListener("click", function () {
  document.getElementById("domination").scrollIntoView({
    behavior: "smooth"
  });
});

