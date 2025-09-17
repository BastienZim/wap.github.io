import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // static export → ./out
  images: { unoptimized: true }, // required for next/image with export
  trailingSlash: true,       // use folder-style routes (/about/ → about/index.html)
  // No basePath or assetPrefix needed for a user/organization GitHub Pages repo
};

export default nextConfig;
