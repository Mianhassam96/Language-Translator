/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '/MianLingo',
  assetPrefix: '/MianLingo/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
