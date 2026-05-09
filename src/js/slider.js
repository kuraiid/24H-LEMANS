document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    const track = slider.querySelector('.slider__track');
    const slides = slider.querySelectorAll('.slider__slide');
    const prev = slider.querySelector('.slider__arrow--prev');
    const next = slider.querySelector('.slider__arrow--next');
    const progress = slider.querySelector('.slider__progress-fill');

    let index = 0;

    function getSlidesPerView() {
        if (window.innerWidth <= 960) return 1;
        if (window.innerWidth <= 1400) return 2;
        return 3;
    }

    function getMaxIndex() {
        return slides.length - getSlidesPerView();
    }

    function update() {
        const slideWidth = slides[0].offsetWidth + 20;

        track.style.transform = `translateX(-${index * slideWidth}px)`;

        const max = getMaxIndex();
        const progressPercent = max === 0 ? 100 : (index / max) * 100;

        progress.style.width = `${progressPercent}%`;

        prev.disabled = index === 0;
        next.disabled = index >= max;
    }

    function nextSlide() {
        const max = getMaxIndex();
        if (index < max) {
            index++;
            update();
        }
    }

    function prevSlide() {
        if (index > 0) {
            index--;
            update();
        }
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);
    let startX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const diff = startX - e.changedTouches[0].clientX;

        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
        }
    });


    window.addEventListener('resize', () => {
        const max = getMaxIndex();
        if (index > max) index = max;
        update();
    });

    update();
});