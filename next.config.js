/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

module.exports = {
  ...nextConfig,
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/:alias',
          destination: '/api/:alias'
        },
        {
          source: '/',
          destination: '/api'
        }
      ]
    };
  }
};
