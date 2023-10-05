/** @type {import('next').NextConfig} */

import analyzeBundle from '@next/bundle-analyzer'

const withBundleAnalyzer = analyzeBundle({
  enabled: process.env.ANALYZE === 'true',
})

const config = withBundleAnalyzer({
  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new webpack.DefinePlugin({
          'globalThis.__DEV__': false,
        })
      )
    }

    return config
  },
})

export default config
