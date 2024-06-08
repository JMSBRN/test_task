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
});