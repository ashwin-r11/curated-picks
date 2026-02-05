/**
 * Products Renderer
 * Loads products.json and renders product blocks dynamically.
 * Edit data/products.json to add, modify, or remove products.
 */

(function () {
    'use strict';

    const PRODUCTS_URL = 'data/products.json';
    const CONTAINER_ID = 'products-container';

    // Render a single product block
    function renderProduct(product) {
        const featuresHtml = product.features
            .map(f => `<li>${escapeHtml(f)}</li>`)
            .join('');

        const imageHtml = product.image
            ? `<div class="product-block__image">
           <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">
         </div>`
            : '';

        return `
      <article class="product-block">
        ${imageHtml}
        <div class="product-block__content">
          <h3 class="product-block__name">${escapeHtml(product.name)}</h3>
          <p class="product-block__desc">${escapeHtml(product.description)}</p>
          <ul class="product-block__features">${featuresHtml}</ul>
          <p class="product-block__link">
            <a href="${escapeHtml(product.amazonUrl)}" rel="nofollow noopener sponsored" target="_blank">
              ${escapeHtml(product.linkText)} →
            </a>
          </p>
        </div>
      </article>
    `;
    }

    // Render a category section
    function renderCategory(category) {
        const productsHtml = category.products
            .map(renderProduct)
            .join('');

        return `
      <section class="category" id="${escapeHtml(category.id)}">
        <div class="container">
          <div class="category__header">
            <div class="category__number">Category ${escapeHtml(category.number)}</div>
            <h2 class="category__title">${escapeHtml(category.title)}</h2>
            <p class="category__intro">${escapeHtml(category.intro)}</p>
          </div>
          <div class="category__products">
            ${productsHtml}
          </div>
        </div>
      </section>
    `;
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Load and render products
    async function init() {
        const container = document.getElementById(CONTAINER_ID);
        if (!container) {
            console.warn('Products container not found');
            return;
        }

        try {
            const response = await fetch(PRODUCTS_URL);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            const html = data.categories.map(renderCategory).join('');
            container.innerHTML = html;
        } catch (error) {
            console.error('Failed to load products:', error);
            container.innerHTML = `
        <div class="container">
          <p style="padding: 2rem; text-align: center; opacity: 0.7;">
            Unable to load products. Please refresh the page.
          </p>
        </div>
      `;
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
