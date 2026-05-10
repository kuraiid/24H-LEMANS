document.addEventListener('DOMContentLoaded', () => {

    const categories = {
        hypercar: {
            name: 'HYPERCAR',
            data: [
                { position: 1, number: 51, team: 'Ferrari', photo: 'src/images/teams/hypercar/ferrari51.jpg', points: 385 },
                { position: 2, number: 15, team: 'BMW', photo: 'src/images/teams/hypercar/bmw15.jpg', points: 350 },
                { position: 3, number: 83, team: 'Ferrari', photo: 'src/images/teams/hypercar/ferrari83.webp', points: 320 },
                { position: 4, number: 7, team: 'Aston Martin', photo: 'src/images/teams/hypercar/aston007.webp', points: 298 },
                { position: 5, number: 8, team: 'Toyota', photo: 'src/images/teams/hypercar/toyota8.jpg', points: 275 },
                { position: 6, number: 12, team: 'Cadillac', photo: 'src/images/teams/hypercar/cadillac12.jpg', points: 275 },
                { position: 7, number: 17, team: 'Genesis', photo: 'src/images/teams/hypercar/genesis17.jpg', points: 275 },
            ]
        },
        lmp2: {
            name: 'LMP2',
            data: [
                { position: 1, number: 3, team: 'DKR ENGINEERING', photo: 'src/images/teams/lmp2/dkr3.jpg', points: 185 },
                { position: 2, number: 23, team: 'ALGARVE PRO RACING', photo: 'src/images/teams/lmp2/algarve25.jpg', points: 170 },
                { position: 3, number: 9, team: 'PROTON COMPETITION', photo: 'src/images/teams/lmp2/proton9.webp', points: 155 },
            ]
        },
        lmgte: {
            name: 'LMGT3',
            data: [
                { position: 1, number: 81, team: 'TF SPORT', photo: 'src/images/teams/lmgt3/tf9.webp', points: 165 },
                { position: 2, number: 9, team: 'GARAGE 59', photo: 'src/images/teams/lmgt3/garage23.jpg', points: 150 },
                { position: 3, number: 21, team: 'VISTA AF CORSE', photo: 'src/images/teams/lmgt3/vista21.avif', points: 140 },
            ]
        }
    };

    const order = ['hypercar', 'lmp2', 'lmgte'];
    let currentIndex = 0;

    const list = document.getElementById('leaderboardList');
    const categoryName = document.querySelector('.leaderboard__category-name');
    const prev = document.querySelector('.leaderboard__arrow--prev');
    const next = document.querySelector('.leaderboard__arrow--next');

    const hoverImage = document.createElement('div');
    hoverImage.className = 'leaderboard__hover-image';
    document.body.appendChild(hoverImage);


    function render(categoryKey) {
        const category = categories[categoryKey];
        if (!category) return;

        list.innerHTML = category.data.map((item) => `
            <div class="leaderboard__row"
                data-photo="${item.photo}"
                data-team="${item.team}">

                <div class="leaderboard__cell">${item.position}</div>
                <div class="leaderboard__cell">${item.number}</div>
                <div class="leaderboard__cell">${item.team}</div>
                <div class="leaderboard__cell"></div>
                <div class="leaderboard__cell leaderboard__cell--right">${item.points}</div>

            </div>
        `).join('');

        attachHover();
    }


    function move(e) {
        hoverImage.style.left = `${e.clientX + 20}px`;
        hoverImage.style.top = `${e.clientY - 120}px`;
    }

    function show(row, e) {
        const photo = row.dataset.photo;
        if (!photo) return;

        hoverImage.style.backgroundImage = `url(${photo})`;
        hoverImage.classList.add('visible');

        move(e);
    }

    function hide() {
        hoverImage.classList.remove('visible');
    }

    function attachHover() {
        const rows = document.querySelectorAll('.leaderboard__row');

        rows.forEach(row => {
            row.addEventListener('mouseenter', (e) => show(row, e));
            row.addEventListener('mousemove', move);
            row.addEventListener('mouseleave', hide);
        });
    }


    function switchCategory(newIndex) {
        if (newIndex < 0 || newIndex >= order.length) return;

        currentIndex = newIndex;
        const key = order[currentIndex];

        categoryName.textContent = categories[key].name;

        render(key);
    }

    prev?.addEventListener('click', () => switchCategory(currentIndex - 1));
    next?.addEventListener('click', () => switchCategory(currentIndex + 1));

    switchCategory(0);
});