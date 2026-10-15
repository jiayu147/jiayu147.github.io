document.addEventListener('DOMContentLoaded', function () {
    const list = document.querySelector('#moment-list');
    const navigation = document.querySelector('#moment-pagination');
    if (!list || !navigation) return;
    const posts = Array.from(list.querySelectorAll('.news-item'));
    const pageSize = 10;
    const pageCount = Math.max(1, Math.ceil(posts.length / pageSize));

    function render() {
        const url = new URL(window.location.href);
        let anchor = '';
        try { anchor = decodeURIComponent(url.hash.slice(1)); } catch {}
        const target = posts.findIndex(post => post.id === anchor);
        const requested = Number(url.searchParams.get('page'));
        const page = target >= 0 ? Math.floor(target / pageSize) + 1
            : Math.min(pageCount, Math.max(1, Number.isInteger(requested) ? requested : 1));
        posts.forEach(function (post, index) {
            post.hidden = index < (page - 1) * pageSize || index >= page * pageSize;
        });
        navigation.replaceChildren();
        function addLink(label, destination, current) {
            const link = document.createElement('a');
            const href = new URL(window.location.href);
            href.searchParams.set('page', destination);
            href.hash = '';
            link.href = href.pathname + href.search;
            link.textContent = label;
            if (current) link.setAttribute('aria-current', 'page');
            navigation.append(link);
        }
        if (page > 1) addLink('Previous', page - 1, false);
        for (let number = 1; number <= pageCount; number++) {
            addLink(String(number), number, number === page);
        }
        if (page < pageCount) addLink('Next', page + 1, false);
        if (target >= 0) posts[target].scrollIntoView();
    }

    render();
    window.addEventListener('hashchange', render);
});
