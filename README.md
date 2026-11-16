# yash1200.github.io

Personal site of Yash Johri, built with SvelteKit 3 and Svelte 5, prerendered with `adapter-static`.

Live: https://yash1200.github.io

## Develop

```sh
npm install
npm run dev      # local dev server
npm run check    # type + svelte checks
npm run build    # static output in build/
```

Content (experience, projects, stack, socials) lives in `src/lib/content.ts`.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
Pages must be set to **Settings → Pages → Source: GitHub Actions**.
