document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.stands__item');

    items.forEach(item => {
        const stroke = item.querySelector('.stands__stroke');

        stroke.addEventListener('click', () => {

        
            items.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });
});