document.addEventListener('DOMContentLoaded', () => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        
        // ★ Задержка через setTimeout, а не через CSS transition-delay
        setTimeout(() => {
          el.classList.add('is-visible');
        }, parseInt(delay));
        
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  // Все элементы с data-anim
  document.querySelectorAll('[data-anim]').forEach(el => {
    if (el.dataset.anim.includes('hero')) {
      // Hero — мгновенно
      const siblings = [...el.parentElement.children].filter(c => c.hasAttribute && c.hasAttribute('data-anim'));
      const index = siblings.indexOf(el);
      const delay = index * 150;
      el.style.transitionDelay = `${delay}ms`;
      setTimeout(() => el.classList.add('is-visible'), 100);
    } else {
      // Остальные — через observer
      observer.observe(el);
    }
  });
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length > 0) {
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3; // скорость: 0 = неподвижно, 1 = как скролл
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Элемент в зоне видимости?
        if (rect.top < windowHeight && rect.bottom > 0) {
          const offset = (scrolled - elementTop + windowHeight) * speed;
          el.style.transform = `translateY(-${offset}px)`;
        }
      });
      
      requestAnimationFrame(() => {}); // плавность
    }
    
    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax, { passive: true });
    
    updateParallax(); // первый запуск
  }

});

