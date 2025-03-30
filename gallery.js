document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sliders
    const allSliders = document.querySelectorAll('.city-slider');

    allSliders.forEach(slider => {
        const container = slider.querySelector('.slider-container');
        const track = container.querySelector('.slider-track');
        const prev = container.querySelector('.prev');
        const next = container.querySelector('.next');
        let isDown = false;
        let startX;
        let scrollLeft;

        // Arrow functionality
        prev.addEventListener('click', () => handleArrowClick(track, -1));
        next.addEventListener('click', () => handleArrowClick(track, 1));

        // Mouse events
        track.addEventListener('mousedown', (e) => startDragging(track, e));
        track.addEventListener('mouseup', () => stopDragging());
        track.addEventListener('mouseleave', () => stopDragging());
        track.addEventListener('mousemove', (e) => dragMove(track, e));

        // Touch events
        track.addEventListener('touchstart', (e) => startDragging(track, e.touches[0]));
        track.addEventListener('touchend', () => stopDragging());
        track.addEventListener('touchmove', (e) => dragMove(track, e.touches[0]));

        // Update arrows initially
        updateArrows(track, prev, next);
        
        // Update on scroll
        track.addEventListener('scroll', () => updateArrows(track, prev, next));
    });

    function handleArrowClick(track, direction) {
        const scrollAmount = track.offsetWidth * 0.33 * direction;
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    function startDragging(track, event) {
        isDown = true;
        startX = event.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    }

    function stopDragging() {
        isDown = false;
    }

    function dragMove(track, event) {
        if (!isDown) return;
        event.preventDefault();
        const x = event.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    }

    function updateArrows(track, prev, next) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        prev.classList.toggle('disabled', track.scrollLeft <= 10);
        next.classList.toggle('disabled', track.scrollLeft >= maxScroll - 10);
    }
});