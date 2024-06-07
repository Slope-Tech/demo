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
            value: 'demo.slopepay.com',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'slopepay.retool.com',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
