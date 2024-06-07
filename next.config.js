/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://demo.slopepay.com',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://slopepay.retool.com',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
