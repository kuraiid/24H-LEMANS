
document.addEventListener('DOMContentLoaded', () => {
    const allEvents = document.querySelectorAll('.calendar__event');
    
    allEvents.forEach(event => {
        const stroke = event.querySelector('.calendar__stroke');
        const plusBtn = event.querySelector('.calendar__plus');
        const content = event.querySelector('.calendar__content');
        
        // Добавляем обработчик ТОЛЬКО на stroke (всю строку с датой и плюсом)
        stroke.addEventListener('click', (e) => {
            // Закрываем все другие события
            allEvents.forEach(otherEvent => {
                if (otherEvent !== event) {
                    const otherContent = otherEvent.querySelector('.calendar__content');
                    const otherBtn = otherEvent.querySelector('.calendar__plus');
                    const otherStroke = otherEvent.querySelector('.calendar__stroke');
                    
                    otherContent.classList.remove('calendar__content--open');
                    otherBtn.textContent = '+';
                    otherBtn.setAttribute('aria-expanded', 'false');
                    otherStroke.classList.remove('calendar__stroke--active');
                }
            });
            
            // Переключаем текущее
            const isOpen = content.classList.contains('calendar__content--open');
            
            if (isOpen) {
                // Закрываем
                content.classList.remove('calendar__content--open');
                plusBtn.textContent = '+';
                plusBtn.setAttribute('aria-expanded', 'false');
                stroke.classList.remove('calendar__stroke--active');
            } else {
                // Открываем
                content.classList.add('calendar__content--open');
                plusBtn.textContent = '−';
                plusBtn.setAttribute('aria-expanded', 'true');
                stroke.classList.add('calendar__stroke--active');
            }
        });
    });
});