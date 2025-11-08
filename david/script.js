document.addEventListener('DOMContentLoaded', function () {
  const loader = document.getElementById('loader');
  const page = document.getElementById('page');
  const revealElements = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactLinks = document.querySelectorAll('.contact-link');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');

  // hide loader and show page
  setTimeout(() => {
    loader.classList.add('hidden');
    page.classList.remove('hidden');
    revealAll();
  }, 700);

  // reveal on scroll
  function revealAll() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', revealAll);
  window.addEventListener('resize', revealAll);

  // smooth internal links with fade transition
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (!targetId.startsWith('#')) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      // fade out page, then scroll, then fade in
      page.classList.add('fade-out');
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // after scroll, remove fade-out to fade back in
        setTimeout(() => page.classList.remove('fade-out'), 450);
      }, 200);
      // close mobile nav if open
      if (window.innerWidth <= 900 && nav.classList.contains('open')) {
        nav.classList.remove('open');
      }
    });
  });

  // contact links: these are placeholders; they will be replaced by user
  contactLinks.forEach(link => {
    link.addEventListener('click', function(e){
      // default behavior: open href; if href is '#', show hint
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
        alert('Silakan edit file index.html untuk menambahkan link sosial media Anda.');
      }
    });
  });

  // menu toggle for small screens
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      if (nav.classList.contains('open')) nav.style.display = 'flex';
      else nav.style.display = '';
    });
  }
});
