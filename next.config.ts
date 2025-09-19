import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'
const repo = 'wap.github.io' // ⬅️ put your repo name here (e.g. 'wap.github.io')

const nextConfig: NextConfig = {
  // For GitHub Pages
  output: 'export',
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: { unoptimized: true },

  // Optional: handy in client code for string paths (plain <img> or CSS)
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : ''
  }
}

export default nextConfig
