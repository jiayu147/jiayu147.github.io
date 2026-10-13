document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.hamburger');
    const menu = document.querySelector('.nav-menu');
    const mobile = window.matchMedia('(max-width: 768px)');

    function setMenu(open) {
        if (!button || !menu) return;
        menu.classList.toggle('active', open);
        button.classList.toggle('active', open);
        button.setAttribute('aria-expanded', String(open));
        button.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        menu.inert = mobile.matches && !open;
        menu.setAttribute('aria-hidden', String(mobile.matches && !open));
    }

    if (button && menu) {
        setMenu(false);
        button.addEventListener('click', function () {
            setMenu(button.getAttribute('aria-expanded') !== 'true');
        });
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { setMenu(false); });
        });
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.nav-container')) setMenu(false);
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
                setMenu(false);
                button.focus();
            }
        });
        mobile.addEventListener('change', function () { setMenu(false); });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(function (link) {
        const active = link.getAttribute('href').split('/').pop() === currentPage;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
});
