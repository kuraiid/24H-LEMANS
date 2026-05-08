document.addEventListener('DOMContentLoaded', () => {
    const points = document.querySelectorAll('.track-point');
    let activePopup = null;

    // Открыть/закрыть popup
    points.forEach(point => {
        point.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const popup = point.querySelector('.track-point__popup');
            
            // Если кликнули по уже активной точке — закрываем
            if (point.classList.contains('active')) {
                point.classList.remove('active');
                popup.classList.remove('active');
                activePopup = null;
                return;
            }
            
            // Закрываем все открытые
            points.forEach(p => {
                p.classList.remove('active');
                p.querySelector('.track-point__popup').classList.remove('active');
            });
            
            // Открываем текущую
            point.classList.add('active');
            popup.classList.add('active');
            activePopup = popup;
        });
    });

    // Клик вне точек и попапов — закрываем
    document.addEventListener('click', (e) => {
        const isClickOnPoint = e.target.closest('.track-point');
        const isClickOnPopup = e.target.closest('.track-point__popup');
        
        if (!isClickOnPoint && !isClickOnPopup) {
            points.forEach(p => {
                p.classList.remove('active');
                p.querySelector('.track-point__popup').classList.remove('active');
            });
            activePopup = null;
        }
    });

    // ESC — закрываем
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            points.forEach(p => {
                p.classList.remove('active');
                p.querySelector('.track-point__popup').classList.remove('active');
            });
            activePopup = null;
        }
    });
});