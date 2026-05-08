document.addEventListener('DOMContentLoaded', () => {
    const points = document.querySelectorAll('.track-point');
    let activePopup = null;

    points.forEach(point => {
        point.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const popup = point.querySelector('.track-point__popup');
            

            if (point.classList.contains('active')) {
                point.classList.remove('active');
                popup.classList.remove('active');
                activePopup = null;
                return;
            }
            

            points.forEach(p => {
                p.classList.remove('active');
                p.querySelector('.track-point__popup').classList.remove('active');
            });
            

            point.classList.add('active');
            popup.classList.add('active');
            activePopup = popup;
        });
    });

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