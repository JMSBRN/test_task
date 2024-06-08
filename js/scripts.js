document.addEventListener('DOMContentLoaded', function() {
    var menuButton = document.querySelector('.header__menu-button');
    var modalMenu = document.querySelector('.modal-menu');
    var closeButton = document.querySelector('.modal-menu__close-btn');

    function showModal() {
        modalMenu.classList.remove('hidden-element');
    }

    function hideModal() {
        modalMenu.classList.add('hidden-element');
    }

    menuButton.addEventListener('click', showModal);
    closeButton.addEventListener('click', hideModal);

    window.addEventListener('resize', hideModal);
    window.addEventListener('scroll', hideModal);

    if (document.querySelector('.customer-reviews')) {
        // Slider dragging
        const slider = document.querySelector('.customer-reviews');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            cancelMomentumTracking();
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
            beginMomentumTracking();
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX); //scroll-fast
            var prevScrollLeft = slider.scrollLeft;
            slider.scrollLeft = scrollLeft - walk;
            velX = slider.scrollLeft - prevScrollLeft;
        });

        // Momentum 
        var velX = 0;
        var momentumID;

        slider.addEventListener('wheel', (e) => {
            cancelMomentumTracking();
        });

        function beginMomentumTracking() {
            cancelMomentumTracking();
            momentumID = requestAnimationFrame(momentumLoop);
        }

        function cancelMomentumTracking() {
            cancelAnimationFrame(momentumID);
        }

        function momentumLoop() {
            slider.scrollLeft += velX * 2;
            velX *= 0.95;
            if (Math.abs(velX) > 0.5) {
                momentumID = requestAnimationFrame(momentumLoop);
            }
        }

        // Scroll
        const scrollContainer = document.querySelector(".customer-reviews");

        scrollContainer.addEventListener("wheel", (evt) => {
            evt.preventDefault();

            window.requestAnimationFrame(() => {
                scrollContainer.scrollTo({ top: 0, left: scrollContainer.scrollLeft + (evt.deltaY * 2), behavior: "smooth" });
            });
        });
    }
});