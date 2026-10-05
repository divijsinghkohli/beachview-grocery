# Beachview Grocery website

Static site with no build step. Open `index.html` in a browser to preview.

## Editing the menu

Everything you'd normally change lives in `js/menu.js`:

- `STORE` has the phone number, address and hours. The open/closed badge and hours table read from here.
- `MENU` has one entry per menu tab. A tab has either a flat `items` list or `groups` (for example Steaks / Beef, Pork & Chicken / Brats). Prices can be a single number, a per-pound price (`unit: "lb"`), or a list of sizes like `[["12 pk", 12.99], ["30 pk", 24.99]]`.

Items marked `// confirmed` come from customer reviews. **All other items and every price are placeholders** until the store confirms them.

If you change the hours, also update the footer in `index.html` and the `openingHoursSpecification` block in its `<head>` (that block is what Google reads).

## Files

- `index.html` holds the page structure, hero, location and footer
- `css/styles.css` holds all the styling
- `js/menu.js` holds the store info and menu data
- `js/main.js` renders the menu tabs, hours and open/closed status

## Hosting

Upload the folder as-is to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).
