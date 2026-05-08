document.addEventListener('DOMContentLoaded', () => {

    const cursor = document.getElementById('cursor');
    const aura = document.getElementById('aura');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let auraX = mouseX;
    let auraY = mouseY;

    // =========================
    // Mouse move
    // =========================

    document.addEventListener('mousemove', (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.classList.remove('hidden');
        aura.classList.remove('hidden');

    });

    // =========================
    // Smooth animation
    // =========================

    function animate() {

        // плавное отставание aura
        auraX += (mouseX - auraX) * 0.12;
        auraY += (mouseY - auraY) * 0.12;

        // маленькая точка
        cursor.style.transform =
            `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        // aura
        aura.style.transform =
            `translate3d(${auraX - 20}px, ${auraY - 20}px, 0)`;

        requestAnimationFrame(animate);
    }

    animate();

    // =========================
    // Hide on leave
    // =========================

    document.addEventListener('mouseleave', () => {
        cursor.classList.add('hidden');
        aura.classList.add('hidden');
    });

    document.addEventListener('mouseenter', () => {
        cursor.classList.remove('hidden');
        aura.classList.remove('hidden');
    });

    const hoverElements = document.querySelectorAll(
        'a, button, .cursor-hover'
    );

    hoverElements.forEach(el => {

        el.addEventListener('mouseenter', () => {

            aura.classList.add('link-hover');
            cursor.classList.add('active');

        });

        el.addEventListener('mouseleave', () => {

            aura.classList.remove('link-hover');
            cursor.classList.remove('active');

        });

    });

});