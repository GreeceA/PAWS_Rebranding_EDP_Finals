

function initFaqToggles() {
  const toggleButtons = document.querySelectorAll('.faq-toggle');
  const faqItems = document.querySelectorAll('.faq-item');

  toggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const item = this.closest('.faq-item');
      const isActive = item.classList.contains('active');
      // Close all
      faqItems.forEach(faq => faq.classList.remove('active'));
      // If it was not active, open it
      if (!isActive) {
        item.classList.add('active');
      }
      // If it was active, it stays closed (toggled)
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFaqToggles);
} else {
  initFaqToggles();
}


function initSidebarMenu() {
  const menuMap = [
    { btn: 'ispay', target: 'sched-text-1' },
    { btn: 'howtobook', target: 'sched-text-2' },
    { btn: 'angrates', target: 'sched-text-3' },
    { btn: 'surgeri', target: 'sched-text-4' },
    { btn: 'fowk', target: 'FOKK' }
  ];
  menuMap.forEach(({ btn, target }) => {
    const btnEl = document.getElementById(btn);
    const targetEl = document.getElementById(target);
    if (btnEl && targetEl) {
      btnEl.addEventListener('click', function(e) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebarMenu);
} else {
  initSidebarMenu();
}
