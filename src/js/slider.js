
// slider.js
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const track = slider.querySelector('.slider__track');
    const slides = Array.from(track.querySelectorAll('.slider__slide'));
    const prevButton = slider.querySelector('.slider__arrow--prev');
    const nextButton = slider.querySelector('.slider__arrow--next');
    const progressFill = slider.querySelector('.slider__progress-fill');
    
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let totalSlides = slides.length;
    
    // Определяем количество видимых слайдов в зависимости от ширины экрана
    function getSlidesPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    // Вычисляем максимальный индекс
    function getMaxIndex() {
        return totalSlides - slidesPerView;
    }
    
    // Обновляем позицию слайдера
    function updateSlider() {
        const slideWidth = slides[0].offsetWidth;
        const gap = 20; // 2rem = 32px (подгони под свой gap)
        const offset = currentIndex * (slideWidth + gap);
        
        track.style.transform = `translateX(-${offset}px)`;
        
        // Обновляем прогресс-бар
        const maxIndex = getMaxIndex();
        const progress = (currentIndex / maxIndex) * 100;
        progressFill.style.width = `${progress}%`;
        
        // Обновляем состояние кнопок
        updateButtons();
    }
    
    // Включаем/выключаем кнопки
    function updateButtons() {
        const maxIndex = getMaxIndex();
        
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;
    }
    
    // Листаем вперёд
    function goToNext() {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    }
    
    // Листаем назад
    function goToPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }
    
    // Обработчики нажатий
    nextButton.addEventListener('click', goToNext);
    prevButton.addEventListener('click', goToPrev);
    
    // Свайпы для мобильных
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                goToNext(); // Свайп влево
            } else {
                goToPrev(); // Свайп вправо
            }
        }
    }
    
    // Обновление при ресайзе
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            slidesPerView = getSlidesPerView();
            
            // Сбрасываем индекс, если вышли за границы
            const maxIndex = getMaxIndex();
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            
            updateSlider();
        }, 250);
    });
    
    // Инициализация
    updateSlider();
});