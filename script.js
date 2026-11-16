document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Drawer
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!isHidden));
      iconOpen.classList.toggle('hidden', !isHidden);
      iconClose.classList.toggle('hidden', isHidden);
    });

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      });
    });
  }

  // 2. Print / Download Resume Triggers
  document.querySelectorAll('.print-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      }
      window.print();
    });
  });

  // 3. Copy Email + Toast Notification
  const copyBtn = document.getElementById('copy-email-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const toast = document.getElementById('toast');
  const emailAddress = 'ayushmogaveera079@gmail.com';
  let toastTimer;

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
      } catch {
        const tempInput = document.createElement('textarea');
        tempInput.value = emailAddress;
        tempInput.style.position = 'fixed';
        tempInput.style.opacity = '0';
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      copyBtnText.textContent = 'Copied';
      toast.classList.add('show');

      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        copyBtnText.textContent = 'Copy';
        toast.classList.remove('show');
      }, 2800);
    });
  }

  // 4. LinkedIn Placeholder Tooltip (handles mobile tap + desktop click)
  ['hero-linkedin', 'contact-linkedin'].forEach((id) => {
    const link = document.getElementById(id);
    if (!link) return;

    link.addEventListener('click', (event) => {
      event.preventDefault();
      const wrapper = link.closest('.tooltip-wrapper');
      if (!wrapper) return;

      wrapper.classList.add('show-tooltip');
      setTimeout(() => wrapper.classList.remove('show-tooltip'), 2200);
    });
  });

  // 5. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }
});