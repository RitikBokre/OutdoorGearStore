# Outdoor Gear Store PDP

Premium outdoor gear product detail page built with React 18, Vite, and SCSS modules.

## Setup

```bash
npm install
npm run dev
```

Build verification:

```bash
npm run build
```

## Implementation Notes

- Product data is fetched from [Fake Store API](https://fakestoreapi.com) using product id `3`.
- Fake Store does not provide color, size, gallery, or inventory data, so those PDP-specific details live in `src/data/productEnhancements.js`.
- Cart state persists in `localStorage` under `outdoor-gear-cart`.
- Gallery image index and selected product details tab also persist in `localStorage`.
- Selected `color` and `size` are reflected in the URL query string for deep linking.
- React Context API owns global cart state; product and variant UI state stay local to the PDP.

## Trade-offs

The gallery uses hosted image URLs so the submission stays lightweight and realistic without committing large assets. In a production build I would replace those with CDN-backed product photography and add responsive `srcset` images.

The desktop hover zoom is CSS-based for speed and reliability. It gives the expected PDP interaction without adding a heavier zoom package.

## Live URL

Not hosted for this submission.
