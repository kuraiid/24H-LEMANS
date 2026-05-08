class HorizontalScroll {
    constructor(speed = 1) {
        this.section = document.querySelector('.js-horizontal-scroll');
        if (!this.section) return;

        this.track = this.section.querySelector('.horizontal-scroll__track');
        this.slides = this.section.querySelectorAll('.horizontal-scroll__slide');

        this.maxScroll = 0;
        this.speed = speed;

        this.init();
    }

    init() {
        this.calculate();

        window.addEventListener('resize', () => this.calculate());
        window.addEventListener('scroll', () => this.onScroll());
    }

    calculate() {

        this.maxScroll = this.track.scrollWidth - window.innerWidth;

        this.section.style.height = `${window.innerHeight + this.maxScroll / this.speed}px`;
    }

    onScroll() {
        const rect = this.section.getBoundingClientRect();
        const scrollProgress = -rect.top;

        const current = Math.max(0, Math.min(scrollProgress, this.maxScroll / this.speed));

        this.track.style.transform = `translateX(-${current * this.speed}px)`;
    }
}

document.addEventListener('DOMContentLoaded', () => {

    new HorizontalScroll(1); 
});