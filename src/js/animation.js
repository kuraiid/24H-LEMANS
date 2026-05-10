// Этот файл я сгенерирвоал в  нейросети, что бы можно было чуть удобнее анимации разные добавить 

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
  

});

