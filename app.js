(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const menu = $('.menu-toggle');
  const nav = $('#site-nav');
  const mobile = window.matchMedia('(max-width: 760px)');
  let menuOpen = false;
  function setMenu(open, returnFocus = false) {
    menuOpen = mobile.matches && open;
    menu.setAttribute('aria-expanded', String(menuOpen));
    menu.setAttribute('aria-label', menuOpen ? 'Close navigation' : 'Open navigation');
    nav.hidden = mobile.matches && !menuOpen;
    if (returnFocus) menu.focus();
  }
  menu.addEventListener('click', () => setMenu(!menuOpen));
  mobile.addEventListener('change', () => setMenu(false));
  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    setMenu(false);
    const target = $(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({preventScroll: true});
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOpen) setMenu(false, true);
  });
  document.addEventListener('click', (event) => {
    if (menuOpen && !event.target.closest('.header-inner')) setMenu(false);
  });
  setMenu(false);

  const themes = {
    ecotones: {category:'COMMUNITY INTERACTIONS',question:'How do plants shape the mangrove–salt marsh boundary?',description:'I investigate how competition and environmental gradients influence interactions between mangroves and invasive Spartina alterniflora in southern China.',method:'Controlled field experiments that separate aboveground and belowground competition.',href:'#competition-project',label:'Explore the field experiment'},
    gradients: {category:'GLOBAL CHANGE ECOLOGY',question:'How do salinity and inundation influence coastal plants?',description:'I explore how salinity, tidal inundation, and disturbance affect coastal plant communities and their life-history strategies.',method:'In-situ mesocosm arrays at estuarine sites spanning tidal elevation and salinity gradients.',href:'#mesocosm-project',label:'Explore the mesocosm array'},
    clonal: {category:'PLANT STRATEGIES',question:'How do growth and plasticity support persistence?',description:'I study how clonal growth, plant traits, and life-history strategies contribute to persistence in changing salt marshes.',method:'Controlled field research connecting environmental gradients with plant growth and life-history responses.',href:'#publications',label:'Explore related publications'}
  };
  const tabs = $$('.theme-tab');
  function selectTheme(tab, focus = false) {
    const item = themes[tab.dataset.theme];
    tabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      t.classList.toggle('active', selected);
    });
    $('#research-panel').setAttribute('aria-labelledby', tab.id);
    $('#research-category').textContent = item.category;
    $('#research-question').textContent = item.question;
    $('#research-description').textContent = item.description;
    $('#research-method').textContent = item.method;
    $('#research-project-link').href = item.href;
    $('#research-project-link').textContent = item.label + ' →';
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTheme(tab));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {event.preventDefault();selectTheme(tabs[next], true);}
    });
  });

  const pubs = $$('.publication');
  const search = $('#publication-search');
  const year = $('#publication-year');
  const firstAuthor = $('#first-author-filter');
  function filterPublications() {
    const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const firstOnly = firstAuthor.getAttribute('aria-pressed') === 'true';
    let count = 0;
    pubs.forEach((pub) => {
      const text = pub.textContent.toLowerCase();
      const matches = terms.every((term) => text.includes(term)) && (year.value === 'all' || pub.dataset.year === year.value) && (!firstOnly || pub.dataset.firstAuthor === 'true');
      pub.hidden = !matches;
      if (matches) count++;
    });
    $('#publication-count').textContent = `${count} ${count === 1 ? 'publication' : 'publications'} · Newest first`;
    $('#no-publications').hidden = count !== 0;
  }
  search.addEventListener('input', filterPublications);
  year.addEventListener('change', filterPublications);
  firstAuthor.addEventListener('click', () => {
    firstAuthor.setAttribute('aria-pressed', String(firstAuthor.getAttribute('aria-pressed') !== 'true'));
    filterPublications();
  });
  $('.publication-controls').addEventListener('submit', (event) => event.preventDefault());
  $('#reset-filters').addEventListener('click', () => {
    search.value = '';year.value = 'all';firstAuthor.setAttribute('aria-pressed', 'false');filterPublications();search.focus();
  });

  let toastTimer;
  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {toast.hidden = true;}, 3500);
  }
  const dialog = $('#copy-dialog');
  const textArea = $('#copy-text');
  async function copyText(text, label) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      showToast(label + ' copied.');
    } catch {
      $('#copy-dialog-title').textContent = 'Copy ' + label.toLowerCase();
      textArea.value = text;
      dialog.showModal();
      textArea.focus();textArea.select();
    }
  }
  $$('.copy-citation').forEach((button) => button.addEventListener('click', () => {
    const pub = button.closest('.publication');
    const title = pub.querySelector('h3').textContent.replace(/\s*↗\s*$/, '').trim();
    const authors = pub.querySelector('.pub-authors').textContent.trim();
    const journal = pub.querySelector('.pub-journal').textContent.trim();
    const doi = pub.querySelector('.doi').textContent.trim();
    copyText(`${authors} (${pub.dataset.year}). ${title}. ${journal}. https://doi.org/${doi}`, 'Citation');
  }));
  $('#copy-email').addEventListener('click', () => copyText('wangjy147@foxmail.com', 'Email address'));
  $('#close-copy-dialog').addEventListener('click', () => dialog.close());
  $('#select-copy-text').addEventListener('click', () => {textArea.focus();textArea.select();});

  if ('IntersectionObserver' in window) {
    const links = $$('#site-nav a');
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const id = '#' + visible[0].target.id;
      links.forEach((link) => {
        if (link.getAttribute('href') === id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin:'-15% 0px -55% 0px',threshold:[0,0.1,0.4]});
    ['about','research','publications','projects','contact'].forEach((id) => observer.observe($('#' + id)));
  }
})();
