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
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000',
          }
        ],
      },
      {
        // this page has both html and JS representation, we're only interested in HTML, as JS is hashed
        source: '/fullyStaticPage',
        headers: [
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=60, s-maxage=600, stale-while-revalidate=14400, stale-if-error=14400',
          }
        ],
      },
      {
        // this page would have both html and json representation of page data that both need to be cached with same policy for consistency
        source: '/(.*)(getStaticProps|getStaticProps\.json)',
        headers: [
          {
            // Example of Cloudflare custom header that takes priority over Cache-Control. Fastly for example hasSurrogate-Control
            key: 'CDN-Cache-Control',
            value: 'max-age=600, stale-while-revalidate=14400, stale-if-error=14400',
          },
        ],
      },
      {
        // we need to cover all json data for SPA navigations under the path that may have multiple params as well as the HTML page in section below
        source: '/(.*)/getStaticPaths/(.*)(json)',
        headers: [
          {
            // Example of Cloudflare custom header that takes priority over Cache-Control. Fastly for example hasSurrogate-Control
            key: 'CDN-Cache-Control',
            value: 'max-age=600, stale-while-revalidate=14400, stale-if-error=14400',
          },
        ],
      },
      {
        source: '/getStaticPaths/:name',
        headers: [
          {
            // Example of Cloudflare custom header that takes priority over Cache-Control. Fastly for example hasSurrogate-Control
            key: 'CDN-Cache-Control',
            value: 'max-age=600, stale-while-revalidate=14400, stale-if-error=14400',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
