document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.calendar__event');

    items.forEach(item => {
        const stroke = item.querySelector('.calendar__stroke');

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