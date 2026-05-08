
// js/leaderboard.js
document.addEventListener('DOMContentLoaded', () => {

    const categories = {
        hypercar: {
            name: 'HYPERCAR',
            folder: 'hypercar',
            data: [
                { position: 1, number: 51, team: 'Ferrari', photo: '../images/teams/hypercar/ferrari51.jpg', points: 385 },
                { position: 2, number: 15, team: 'BMW', photo: '../images/teams/hypercar/bmw15.jpg', points: 350 },
                { position: 3, number: 83, team: 'Ferrari', photo: '../images/teams/hypercar/ferrari83.jpg', points: 320 },
                { position: 4, number: 7, team: 'Aston Martin', photo: '../images/teams/hypercar/aston007.jpg', points: 298 },
                { position: 5, number: 8, team: 'Toyota', photo: '../images/teams/hypercar/toyota8', points: 275 },
                { position: 6, number: 12, team: 'Cadillac', photo: '../images/teams/hypercar/cadillac12.jpg"', points: 275 },
                { position: 7, number: 17, team: 'Genesis', photo: '../images/teams/hypercar/genesis17.jpg', points: 275 },

            ]
        },
        lmp2: {
            name: 'LMP2',
            folder: 'lmp2',
            data: [
                { position: 1, number: 3, team: 'DKR ENGINEERING', photo: '../images/teams/lmp2/dkr3.jpg', points: 185 },
                { position: 2, number: 23, team: 'ALGARVE PRO RACING', photo: '../images/teams/lmp2/algarve25.jpg', points: 170 },
                { position: 3, number: 9, team: 'PROTON COMPETITIO', photo: '../images/teams/lmp2/proton9.jpg', points: 155 },
            ]
        },
        lmgte: {
            name: 'LMGT3',
            folder: 'lmgte',
            data: [
                { position: 1, number: 81, team: 'TF SPORT', photo: '../images/teams/lmgt3/tf9.jpg', points: 165 },
                { position: 2, number: 9, team: 'GARAGE 59', photo: '../images/teams/lmgt3/garage23.jpg', points: 150 },
                { position: 3, number: 21, team: 'VISTA AF CORSE', photo: '../images/teams/lmgt3/vista21.jpg', points: 140 },
            ]
        }
    };
    
    // Порядок должен совпадать с ключами в categories
    const categoryOrder = ['hypercar', 'lmp2', 'lmgte'];
    let currentIndex = 0;
    
    // Исправлено: убрана точка, правильный ID
    const leaderboardList = document.getElementById('leaderboardList');
    const categoryNameSpan = document.querySelector('.leaderboard__category-name');
    const prevArrow = document.querySelector('.leaderboard__arrow--prev');
    const nextArrow = document.querySelector('.leaderboard__arrow--next');
    
    // Создаём элемент для ховер-изображения
    const hoverImage = document.createElement('div');
    hoverImage.className = 'leaderboard__hover-image';
    document.body.appendChild(hoverImage);
    
    let activeRow = null;
    
    // Функция обновления позиции изображения
    function updateImagePosition(e) {
        let x = e.clientX + 20;
        let y = e.clientY - 120;
        
        const maxX = window.innerWidth - 280;
        const maxY = window.innerHeight - 280;
        
        x = Math.min(Math.max(x, 10), maxX);
        y = Math.min(Math.max(y, 10), maxY);
        
        hoverImage.style.left = `${x}px`;
        hoverImage.style.top = `${y}px`;
    }
    
    // Функция показа изображения
    function showImage(row, event) {
    const photo = row.dataset.photo;
    if (!photo) return;
    
    // Если уже есть активная строка и это другая строка
    if (activeRow && activeRow !== row) {
        // Плавно скрываем текущее изображение
        hoverImage.classList.remove('visible');
        
        // Ждем завершения анимации скрытия перед показом нового
        setTimeout(() => {
            updateAndShowNewImage(row, photo, event);
        }, 300); // Время должно совпадать с transition в CSS
    } else if (!activeRow) {
        // Если нет активной строки, показываем сразу
        updateAndShowNewImage(row, photo, event);
    }
    
    row.classList.add('leaderboard__row--hover');
    activeRow = row;
}
    function updateAndShowNewImage(row, photo, event) {
    // Сначала делаем изображение невидимым
    hoverImage.style.opacity = '0';
    hoverImage.style.display = 'block';
    
    // Меняем фон
    hoverImage.style.backgroundImage = `url('${photo}')`;
    hoverImage.style.backgroundSize = 'cover';
    hoverImage.style.backgroundPosition = 'center';
    
    // Обновляем позицию
    updateImagePosition(event);
    
    // Плавно показываем
    requestAnimationFrame(() => {
        hoverImage.style.transition = 'opacity 0.3s ease, left 0.2s ease, top 0.2s ease';
        hoverImage.style.opacity = '1';
        hoverImage.classList.add('visible');
    });
}
    // Функция скрытия изображения
    function hideImage(row) {
    hoverImage.classList.remove('visible');
    hoverImage.style.opacity = '0';
    
    // Убираем display только после завершения анимации
    setTimeout(() => {
        if (!hoverImage.classList.contains('visible')) {
            hoverImage.style.display = 'none';
        }
    }, 300);
    
    row.classList.remove('leaderboard__row--hover');
    if (activeRow === row) {
        activeRow = null;
    }
}
    
    // Функция рендеринга таблицы
    function renderLeaderboard(categoryKey) {
        const category = categories[categoryKey];
        if (!category) return;
        
        const items = category.data;
        
        leaderboardList.innerHTML = items.map((item, index) => `
            <div class="leaderboard__row" 
                data-team="${item.team}" 
                data-photo="${item.photo}"
                data-category="${categoryKey}"
                data-index="${index}">
                <div class="leaderboard__cell leaderboard__cell--position">${item.position}</div>
                <div class="leaderboard__cell">${item.number}</div>
                <div class="leaderboard__cell leaderboard__cell--team">${item.team}</div>
                <div class="leaderboard__cell leaderboard__cell--photo"></div>
                <div class="leaderboard__cell leaderboard__cell--points leaderboard__cell--right">${item.points}</div>
            </div>
        `).join('');
        
        attachRowEvents();
    }
    
    // Функция привязки событий к строкам
    function attachRowEvents() {
        const rows = document.querySelectorAll('.leaderboard__row');
        
        rows.forEach(row => {
            // Удаляем старые обработчики, если есть
            row.removeEventListener('mouseenter', row._mouseEnterHandler);
            row.removeEventListener('mousemove', row._mouseMoveHandler);
            row.removeEventListener('mouseleave', row._mouseLeaveHandler);
            
            // Создаём новые обработчики
            const mouseEnterHandler = (e) => {
                if (activeRow === row) return;
                if (activeRow) {
                    hoverImage.classList.remove('visible');
                    hoverImage.style.display = 'none';
                    activeRow.classList.remove('leaderboard__row--hover');
                }
                showImage(row, e);
            };
            
            const mouseMoveHandler = (e) => {
                if (activeRow === row && hoverImage.classList.contains('visible')) {
                    updateImagePosition(e);
                }
            };
            
            const mouseLeaveHandler = () => {
                if (activeRow === row) {
                    hideImage(row);
                }
            };
            
            // Сохраняем обработчики
            row._mouseEnterHandler = mouseEnterHandler;
            row._mouseMoveHandler = mouseMoveHandler;
            row._mouseLeaveHandler = mouseLeaveHandler;
            
            // Добавляем обработчики
            row.addEventListener('mouseenter', mouseEnterHandler);
            row.addEventListener('mousemove', mouseMoveHandler);
            row.addEventListener('mouseleave', mouseLeaveHandler);
        });
    }
    
    // Клик по изображению
    hoverImage.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeRow) {
            const team = activeRow.dataset.team;
            console.log(`Переход на страницу: ${team}`);
            window.location.href = `/team/${encodeURIComponent(team)}`;
        }
    });
    
    // Скрываем изображение при движении мыши вне окна
    document.body.addEventListener('mouseleave', () => {
        if (activeRow) {
            hideImage(activeRow);
        }
    });
    
    // Функция смены категории
    function switchCategory(newIndex) {
        if (newIndex === currentIndex) return;
        if (newIndex < 0 || newIndex >= categoryOrder.length) return;
        
        // Скрываем текущее изображение
        if (activeRow) {
            hideImage(activeRow);
        }
        
        const newCategoryKey = categoryOrder[newIndex];
        const newCategory = categories[newCategoryKey];
        
        categoryNameSpan.classList.add('leaderboard__category-name--fade-out');
        
        setTimeout(() => {
            categoryNameSpan.textContent = newCategory.name;
            categoryNameSpan.classList.remove('leaderboard__category-name--fade-out');
            categoryNameSpan.classList.add('leaderboard__category-name--fade-in');
            
            renderLeaderboard(newCategoryKey);
            
            setTimeout(() => {
                categoryNameSpan.classList.remove('leaderboard__category-name--fade-in');
            }, 200);
        }, 200);
        
        currentIndex = newIndex;
    }
    
    // Обработчики стрелок
    if (prevArrow) prevArrow.addEventListener('click', () => switchCategory(currentIndex - 1));
    if (nextArrow) nextArrow.addEventListener('click', () => switchCategory(currentIndex + 1));
    
    // Инициализация
    renderLeaderboard('hypercar');
});