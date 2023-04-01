// @ts-check

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['images.pexels.com'],
  },

  reactStrictMode: true,

  webpack: (config) => {
    // Add support for `SVGR` which transforms SVG assets into React components.
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            titleProp: true,
          },
        },
      ],
    })

    return config
  },
}

module.exports = nextConfig
