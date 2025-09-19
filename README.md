This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on GitHub Pages

This repository is deployed as a **project site** on GitHub Pages (not a user root site). That means all assets and routes must be served under `/<repo>` — here: `/wap.github.io`. The `next.config.ts` sets `basePath` and `assetPrefix` automatically in production so exported HTML points to the correct `_next` assets.

Important details:
1. Static Export: We use `next build && next export` (configured via the `export` script) producing a static `out/` directory.
2. `.nojekyll`: Added at the repo root (and also created inside `out/` during preview/deploy) so GitHub Pages does not run Jekyll and ignore the `_next/` directory.
3. Fonts & Images: `images.unoptimized = true` allows `next export` to emit `<img>` tags directly.

### One‑off manual deploy

```bash
npm run export
# resulting static site in ./out
```

Serve locally to verify:
```bash
npm run preview:pages
```
Then publish by pushing the contents of `out/` to the `gh-pages` branch (or to the root of the `main` branch if Pages is configured that way). Example using a separate branch:

```bash
git checkout -B gh-pages
git add -f out
git commit -m "Deploy"
git subtree push --prefix out origin gh-pages
```

### Convenience script

`npm run deploy:gh-pages` performs the build/export and leaves the `out/` folder ready. You still need to commit and push (or rely on a workflow).

### GitHub Actions (optional)

You can automate deployment with a workflow like:

```yaml
name: Deploy
on:
	push:
		branches: [ main ]
jobs:
	build-deploy:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- uses: actions/setup-node@v4
				with:
					node-version: 20
					cache: npm
			- run: npm ci
			- run: npm run export
			- name: Add .nojekyll
				run: touch out/.nojekyll
			- name: Deploy to GitHub Pages
				uses: peaceiris/actions-gh-pages@v4
				with:
					github_token: ${{ secrets.GITHUB_TOKEN }}
					publish_dir: ./out
```

This ensures the CSS and `_next` assets load correctly on the published site.
