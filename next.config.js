/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    if (process.env.NODE_ENV !== 'production') {
      return [];
    }

    return [
      {
        source: '/:all*(css|js|gif|svg|jpg|jpeg|png|woff|woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          }
        ],
      }
    ];
  },
}

module.exports = nextConfig
