document.addEventListener('DOMContentLoaded', function () {
    async function updateLatestPosts() {
        const latest = document.querySelector('.home-page .news-list');
        if (!latest) return;
        try {
            const response = await fetch('moment.html', { cache: 'no-cache' });
            if (!response.ok) return;
            const archive = new DOMParser().parseFromString(await response.text(), 'text/html');
            const posts = Array.from(archive.querySelectorAll('.news-list .news-item'))
                .filter(post => post.id && post.querySelector('h3') &&
                    /^\d{4}-\d{2}-\d{2}$/.test(post.querySelector('time')?.getAttribute('datetime') || ''))
                .sort((a, b) => b.querySelector('time').getAttribute('datetime')
                    .localeCompare(a.querySelector('time').getAttribute('datetime')))
                .slice(0, 3);
            if (!posts.length) return;
            const entries = posts.map(post => {
                const entry = post.cloneNode(true);
                entry.id = 'home-' + post.id;
                const heading = entry.querySelector('h3');
                heading.id = entry.id + '-title';
                entry.setAttribute('aria-labelledby', heading.id);
                const link = document.createElement('a');
                const sourceLink = post.querySelector('h3 a');
                link.setAttribute('href', sourceLink?.getAttribute('href') || 'moment.html#' + encodeURIComponent(post.id));
                link.innerHTML = sourceLink ? sourceLink.innerHTML : heading.innerHTML;
                heading.replaceChildren(link);
                return entry;
            });
            latest.replaceChildren(...entries);
            latest.dataset.source = 'moments';
        } catch {
            // Keep the three embedded posts available if the archive cannot be loaded.
        }
    }
    updateLatestPosts();

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

    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    document.querySelectorAll('.nav-menu a').forEach(function (link) {
        const target = link.getAttribute('href').split('/').pop();
        const active = target === currentPage || (currentPage.startsWith('moment-') && target === 'moment.html');
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
});
