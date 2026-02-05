# Curated Picks - Build System

## How It Works

**You only need to edit `data/products.json`** — the site is automatically rebuilt.

## Adding Products

Edit `data/products.json`:

```json
{
  "categories": [
    {
      "id": "unique-id",
      "number": "01",
      "title": "Category Name",
      "intro": "Category description.",
      "products": [
        {
          "name": "Product Name",
          "emoji": "📦",
          "shortDesc": "Short one-liner for the card",
          "description": "Full description (optional, for future use)",
          "features": ["Feature 1", "Feature 2"],
          "amazonUrl": "https://amzn.to/your-link",
          "linkText": "See on Amazon"
        }
      ]
    }
  ]
}
```

## Local Preview

```bash
node scripts/build.js
# Then open index.html in browser
```

## Auto-Build (GitHub Actions)

When you push changes to `data/products.json`:
1. GitHub Actions automatically runs `node scripts/build.js`
2. The updated `index.html` is committed
3. GitHub Pages deploys the new version

**Note:** For this to work, your repo needs:
- GitHub Actions enabled
- Write permissions for the workflow (Settings → Actions → General → Workflow permissions → Read and write)
