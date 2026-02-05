/**
 * Build Script for Curated Picks
 * 
 * Reads products.json and generates index.html from template.
 * Run: node scripts/build.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const ROOT = path.join(__dirname, '..');
const TEMPLATE_PATH = path.join(ROOT, 'templates', 'index.template.html');
const PRODUCTS_PATH = path.join(ROOT, 'data', 'products.json');
const OUTPUT_PATH = path.join(ROOT, 'index.html');

/**
 * Generate filter pill HTML for a category
 */
function generateFilterPill(category) {
    return `<button class="filter-pill" data-filter="${category.id}">${category.title}</button>`;
}

/**
 * Generate product card HTML
 * Uses data-categories with space-separated category IDs for multi-category support
 */
function generateProductCard(product) {
    const categoryIds = product.categories.join(' ');
    return `
          <article class="product-card" data-categories="${categoryIds}">
            <div class="product-card__image">${product.emoji}</div>
            <div class="product-card__content">
              <h3 class="product-card__name">${escapeHtml(product.name)}</h3>
              <p class="product-card__desc">${escapeHtml(product.shortDesc)}</p>
              <a href="${product.amazonUrl}" class="product-card__link" rel="nofollow noopener sponsored" target="_blank">
                ${product.linkText || 'See on Amazon'}
              </a>
            </div>
          </article>`;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, char => map[char]);
}

/**
 * Main build function
 */
function build() {
    console.log('🔨 Building index.html from products.json...\n');

    // Read files
    const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    const data = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf8'));

    // Generate filter pills
    const filterPills = data.categories
        .map(generateFilterPill)
        .join('\n          ');

    // Generate product cards (each product appears only once)
    const productCards = data.products
        .map(product => generateProductCard(product))
        .join('');

    // Replace placeholders
    let html = template
        .replace('{{FILTER_PILLS}}', filterPills)
        .replace('{{PRODUCT_CARDS}}', productCards);

    // Write output
    fs.writeFileSync(OUTPUT_PATH, html);

    // Summary
    console.log(`✅ Generated index.html`);
    console.log(`   - ${data.categories.length} categories`);
    console.log(`   - ${data.products.length} products`);
}

// Run
build();
