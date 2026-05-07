
class CountdownTimer {
    constructor() {
        this.targetDate = new Date(Date.UTC(2026, 5, 10, 12, 0, 0)).getTime();
        
        this.daysElement = document.getElementById('days');
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        
        this.intervalId = null;
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        if (!this.daysElement || !this.hoursElement || !this.minutesElement) {
            console.error('Countdown elements not found!');
            return;
        }
        
        console.log('✅ Countdown initialized');
        this.start();
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.updateTimer();
        
        this.intervalId = setInterval(() => {
            this.updateTimer();
        }, 60000); // 60000 мс = 1 минута
    }
    
    updateTimer() {
        const now = Date.now();
        const distance = this.targetDate - now;
        
        if (distance <= 0) {
            this.daysElement.textContent = '00';
            this.hoursElement.textContent = '00';
            this.minutesElement.textContent = '00';
            
            clearInterval(this.intervalId);
            this.isRunning = false;
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        this.daysElement.textContent = String(days).padStart(2, '0');
        this.hoursElement.textContent = String(hours).padStart(2, '0');
        this.minutesElement.textContent = String(minutes).padStart(2, '0');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const countdown = new CountdownTimer();
    }, 100);
});