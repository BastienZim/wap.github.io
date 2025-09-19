import type { NextConfig } from 'next'

/**
 * GitHub Pages handling
 * --------------------------------------------------
 * There are two kinds of GH Pages deployments:
 * 1. User/Org site  -> repo name EXACTLY <username>.github.io  (served at https://<username>.github.io/)
 * 2. Project site   -> any other repo (optionally ending with .github.io) served at https://<username>.github.io/<repo>/
 *
 * The previous implementation treated ANY repo ending in .github.io as a user site, which is incorrect
 * for this project because the repository is named 'wap.github.io' but the user account is different.
 * As a result, no basePath/assetPrefix was set in production and CSS/JS assets were requested from
 * '/_next/...' instead of '/wap.github.io/_next/...', producing 404s and a page with no styling.
 */

const isProd = process.env.NODE_ENV === 'production'

// Hard‑code the repo name used on GitHub
const repo = 'wap.github.io'

// Attempt to derive the owner when building in GitHub Actions (GITHUB_REPOSITORY = owner/repo)
const ownerFromEnv = process.env.GITHUB_REPOSITORY?.split('/')[0]

// Fallback to the known username if not in CI (adjust if the GitHub username changes)
const owner = ownerFromEnv || 'BastienZim'

// True only if repo EXACTLY matches <owner>.github.io
const isUserOrOrgSite = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`

// For project pages we must prefix routes & assets with /<repo>
const computedBasePath = isProd && !isUserOrOrgSite ? `/${repo}` : ''
const computedAssetPrefix = isProd && !isUserOrOrgSite ? `/${repo}/` : ''

const nextConfig: NextConfig = {
  output: 'export',          // static export -> files emitted to ./out
  basePath: computedBasePath,
  assetPrefix: computedAssetPrefix,
  images: { unoptimized: true }, // needed for static export
  env: {
    NEXT_PUBLIC_BASE_PATH: computedBasePath,
  },
}

export default nextConfig
