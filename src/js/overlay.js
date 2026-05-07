const menuButton = document.getElementById('menu-button');
const overlay = document.getElementById('fullscreenInfo');
const closeButton = document.querySelector('.overlay__button-close');

menuButton.addEventListener('click', () => {
    const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';

    overlay.classList.add('overlay--active');
});

closeButton.addEventListener('click', () => {
    overlay.classList.remove('overlay--active');

    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
});