function initFaqToggles() {
  const toggleButtons = document.querySelectorAll('.faq-toggle');
  const faqBoxes = document.querySelectorAll('.faq-box');
  
  if (toggleButtons.length === 0) {
    setTimeout(initFaqToggles, 100);
    return;
  }
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const item = this.closest('.faq-item');
      item.classList.toggle('active');
    });
  });
  
  faqBoxes.forEach(box => {
    box.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      item.classList.toggle('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', initFaqToggles);
window.addEventListener('load', initFaqToggles);

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initFaqToggles, 1);
} //CHOUR INTERACTIVE

document.getElementById("ispay").addEventListener("click", function () {
  document.getElementById("sched-text-1").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("howtobook").addEventListener("click", function () {
  document.getElementById("sched-text-2").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("angrates").addEventListener("click", function () {
  document.getElementById("sched-text-3").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("surgeri").addEventListener("click", function () {
  document.getElementById("sched-text-4").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("fowk").addEventListener("click", function () {
  document.getElementById("FOKK").scrollIntoView({ behavior: "smooth" });
});
