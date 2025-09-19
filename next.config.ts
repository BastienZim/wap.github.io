import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'
// IMPORTANT: If this repository name ends with .github.io it's a USER/ORG site and must NOT use basePath.
// Only project pages (repo DIFFERENT from <user>.github.io) require basePath/assetPrefix.
const repo = 'wap.github.io'

// Detect user/organisation site style: <user>.github.io
const isUserOrOrgSite = /\.github\.io$/i.test(repo)

const computedBasePath = isProd && !isUserOrOrgSite ? `/${repo}` : ''
const computedAssetPrefix = isProd && !isUserOrOrgSite ? `/${repo}/` : ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath: computedBasePath,
  assetPrefix: computedAssetPrefix,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: computedBasePath
  }
}

export default nextConfig
