/* ==========================================================================
   NAVIGATION MODULE // SPA VIEW ROUTING & BANK SELECTOR STATE
   ========================================================================== */

const VALID_VIEWS = new Set(['home', 'post1', 'post2', 'post3', 'conferencing']);

/**
 * Initializes top console bank switches, brand home trigger, and home bank cards.
 * @param {Object} callbacks - Map of view lifecycle hooks (e.g. onEnterPost3)
 */
export function initNavigation(callbacks = {}) {
  const tabBtns = document.querySelectorAll('.bank-btn[data-target]');
  const pageViews = document.querySelectorAll('.page-view');
  const brandHeader = document.querySelector('.rack-brand');
  const bankCards = document.querySelectorAll('.bank-card[data-nav]');

  async function switchPage(targetKey, updateHash = true) {
    if (!VALID_VIEWS.has(targetKey)) {
      targetKey = 'home';
    }

    tabBtns.forEach(btn => {
      const isActive = btn.dataset.target === targetKey;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    pageViews.forEach(view => {
      const isTarget = view.id === `view-${targetKey}`;
      view.classList.toggle('active', isTarget);
      view.hidden = !isTarget;
    });

    if (targetKey === 'post3' && typeof callbacks.onEnterPost3 === 'function') {
      await callbacks.onEnterPost3();
    }

    if (updateHash) {
      history.replaceState(null, '', `#${targetKey}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchPage(btn.dataset.target));
  });

  if (brandHeader) {
    brandHeader.addEventListener('click', () => switchPage('home'));
    brandHeader.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchPage('home');
      }
    });
  }

  bankCards.forEach(card => {
    card.addEventListener('click', () => switchPage(card.dataset.nav));
  });

  window.addEventListener('hashchange', () => {
    const hashTarget = window.location.hash.replace('#', '');
    if (VALID_VIEWS.has(hashTarget)) {
      switchPage(hashTarget, false);
    }
  });

  // Initial route resolution
  const initialHash = window.location.hash.replace('#', '');
  switchPage(VALID_VIEWS.has(initialHash) ? initialHash : 'home', false);

  return { switchPage };
}
