/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:5001/api/v1/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001'
      }
    ],
  },
};

module.exports = nextConfig;
