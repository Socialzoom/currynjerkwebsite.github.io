/* Curry N Jerk: original interactions implemented in plain JavaScript. */
(() => {
  'use strict';

  const websiteRoot = new URL('./', document.currentScript.src);
  const absoluteUrl = (relative) => new URL(relative, websiteRoot).href;

  // Preserve the original event queue. No analytics service is added.
  window.dataLayer = window.dataLayer || [];
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element
      ? event.target.closest('[data-event]') : null;
    if (!target) return;
    const parameters = new URLSearchParams(location.search);
    window.dataLayer.push({
      event: target.dataset.event,
      button_location: target.dataset.location || 'unknown',
      page_path: location.pathname,
      device_type: matchMedia('(max-width:767px)').matches ? 'mobile' : 'desktop',
      campaign_source: parameters.get('utm_source') || document.referrer || 'direct',
    });
  });

  // FormSubmit returns visitors to this copy on whichever host it uses.
  document.querySelectorAll('[data-cnj-return-url]').forEach((field) => {
    field.value = absoluteUrl(field.dataset.cnjReturnUrl);
  });

  const data = window.CNJ_MENU_DATA;
  const search = document.querySelector('[data-menu-search]');
  if (!data || !search) return;

  const content = document.querySelector('.vmenu-content');
  const resultText = document.querySelector('.vmenu-intro > p');
  const sections = [...document.querySelectorAll('.vmenu-section')].map((element) => ({
    element,
    grid: element.querySelector('.vmenu-grid'),
    title: element.querySelector('.vmenu-section-heading h2').textContent,
    cards: [...element.querySelectorAll('.vmenu-card')],
  }));
  const empty = document.createElement('div');
  empty.className = 'vmenu-empty';
  empty.setAttribute('role', 'status');
  empty.innerHTML = '<p class="eyebrow">No exact match</p><h2>Try another craving.</h2>' +
    '<p>Search for a dish, protein, side or category—or clear the search to see the full menu.</p>' +
    '<button class="button primary" type="button" data-clear-search>Clear Search</button>';

  const items = new Map();
  data.sections.forEach((section) => section.items.forEach(([name, price, description]) => {
    items.set(name, { name, price, description, section: section.title });
  }));
  const dishDetail = (name) => data.dishes.find((dish) => dish.name === name || dish.menuName === name);
  const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);

  function filterMenu() {
    const query = search.value;
    const normalized = query.trim().toLowerCase();
    let visibleCount = 0;
    empty.remove();
    sections.forEach((section) => {
      const matching = section.cards.filter((card) => {
        const item = items.get(card.dataset.menuItem);
        return !normalized || `${item.name} ${item.description} ${section.title}`.toLowerCase().includes(normalized);
      });
      section.grid.replaceChildren(...matching);
      section.element.remove();
      if (matching.length) content.append(section.element);
      visibleCount += matching.length;
    });
    resultText.textContent = query
      ? `${visibleCount} menu ${visibleCount === 1 ? 'item' : 'items'} match “${query}.”`
      : `${visibleCount} dishes, sides and sweets—built from one shared menu source.`;
    if (!visibleCount) content.append(empty);
  }
  search.addEventListener('input', filterMenu);

  let modal = null;
  let previousOverflow = '';
  function closeModal() {
    if (!modal) return;
    modal.remove();
    modal = null;
    document.body.style.overflow = previousOverflow;
  }

  function openModal(name) {
    const selected = items.get(name);
    if (!selected) return;
    closeModal();
    const detail = dishDetail(name);
    const options = data.options[name];
    const image = detail
      ? `<div class="vmenu-modal-image"><img alt="${escapeHtml(detail.alt)}" src="${escapeHtml(absoluteUrl(detail.image))}" loading="lazy" decoding="async" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"></div>`
      : '';
    const variants = options
      ? `<div class="vmenu-modal-options"><h3>Current options</h3><ul>${options.variants.map((variant) => `<li>${escapeHtml(variant)}</li>`).join('')}</ul></div>`
      : '';
    const detailLink = detail
      ? `<a class="button outline" href="${escapeHtml(absoluteUrl(`menu/${detail.slug}/`))}">Full Dish Page</a>`
      : '';
    const customize = options
      ? `<a class="plain-link" href="${escapeHtml(options.toastItemUrl)}" target="_blank" rel="noreferrer" data-event="dish_order_click" data-location="visual_menu_options_${slugify(name)}">Customize this item on Toast ↗</a>`
      : '';

    modal = document.createElement('div');
    modal.className = 'vmenu-modal-backdrop';
    modal.setAttribute('role', 'presentation');
    modal.innerHTML = `<section class="vmenu-modal" role="dialog" aria-modal="true" aria-labelledby="vmenu-modal-title">
      <button class="vmenu-modal-close" type="button" data-close-modal aria-label="Close dish details">×</button>
      ${image}
      <div class="vmenu-modal-copy">
        <p class="eyebrow">${escapeHtml(selected.section)}</p>
        <h2 id="vmenu-modal-title">${escapeHtml(selected.name)}</h2>
        <b class="vmenu-modal-price">${escapeHtml(selected.price)}</b>
        <p>${escapeHtml(selected.description)}</p>
        ${variants}
        <div class="actions"><a class="vmenu-order" href="${escapeHtml(data.site.orderUrl)}" aria-label="Order Curry N Jerk online through Toast" data-event="order_now_click" data-location="visual_menu_modal_${slugify(name)}">Order Now<span aria-hidden="true">↗</span></a>${detailLink}${customize}</div>
      </div>
    </section>`;
    modal.addEventListener('mousedown', (event) => {
      if (event.target === modal) closeModal();
    });
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.append(modal);
  }

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('[data-close-modal]')) {
      closeModal();
    } else if (event.target.closest('[data-clear-search]')) {
      search.value = '';
      filterMenu();
    } else {
      const opener = event.target.closest('[data-open-item]');
      if (opener) openModal(opener.dataset.openItem);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
})();
