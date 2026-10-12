document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) { menuToggle.innerHTML = '<i data-lucide="menu"></i>'; if (window.lucide) lucide.createIcons(); }
  }));

  const progress = document.getElementById('scrollProgress');
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add('visible'));

  const navAnchors = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }), { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const words = ['web experiences', 'useful interfaces', 'creative projects'];
  const typing = document.getElementById('typingText');
  let wordIndex = 0, charIndex = words[0].length, deleting = true;
  function typeLoop() {
    if (!typing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const current = words[wordIndex];
    if (deleting) {
      charIndex--;
      typing.textContent = current.slice(0, charIndex);
      if (charIndex <= 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; }
      setTimeout(typeLoop, 45);
    } else {
      const next = words[wordIndex];
      charIndex++;
      typing.textContent = next.slice(0, charIndex);
      if (charIndex >= next.length) { deleting = true; setTimeout(typeLoop, 1450); }
      else setTimeout(typeLoop, 75);
    }
  }
  if (typing && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) setTimeout(typeLoop, 1500);

  const toast = document.getElementById('toast');
  let toastTimer;
  document.querySelectorAll('[data-placeholder-link]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const label = link.getAttribute('data-placeholder-link') || 'this link';
    if (toast) {
      toast.textContent = `Add your real ${label} link in index.html first.`;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
    }
  }));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
