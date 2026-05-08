class CountdownTimer {
    constructor() {
        this.targetDate = new Date(Date.UTC(2026, 5, 10, 12, 0, 0)).getTime();

        this.days = document.getElementById('days');
        this.hours = document.getElementById('hours');
        this.minutes = document.getElementById('minutes');

        if (!this.days || !this.hours || !this.minutes) return;

        this.start();
    }

    start() {
        this.update();

        this.interval = setInterval(() => {
            this.update();
        }, 1000); // лучше 1 секунда
    }

    update() {
        const now = Date.now();
        const diff = this.targetDate - now;

        if (diff <= 0) {
            this.set(0, 0, 0);
            clearInterval(this.interval);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        this.set(days, hours, minutes);
    }

    set(d, h, m) {
        this.days.textContent = String(d).padStart(2, '0');
        this.hours.textContent = String(h).padStart(2, '0');
        this.minutes.textContent = String(m).padStart(2, '0');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
});