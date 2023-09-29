/** @type {import('next').NextConfig} */

import analyzeBundle from '@next/bundle-analyzer'

const withBundleAnalyzer = analyzeBundle({
  enabled: process.env.ANALYZE === 'true',
})

const config = withBundleAnalyzer({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})

export default config
