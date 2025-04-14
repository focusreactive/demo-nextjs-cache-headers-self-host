/** @type {import('next').NextConfig} */
const nextConfig = {
  // only for ISR pages
  expireTime: 9600, // otherwise max value s-maxage=<revalidate-time>, stale-while-revalidate=31535400

  async headers() {
    if (process.env.NODE_ENV !== 'production') {
      return [];
    }

    return [
      {
        // Force cache on all assets, including images, that by default do not have strict cache headers
        source: '/:all*(css|js|gif|svg|jpg|jpeg|png|woff|woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        // this page has both html and JS representation, we're only interested in HTML, as JS is hashed
        source: '/appRouter/fullyStaticPage',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=600, stale-while-revalidate=14400, stale-if-error=14400',
          }
        ],
      },
      {
        // this page will be fetched as an HTML document and RSC payload, both will be synchonized and have the same headers
        source: '/appRouter/getStaticProps',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=600, stale-while-revalidate=14400, stale-if-error=14400',
          },
          {
            // Example of Cloudflare custom header that takes priority over Cache-Control. Fastly for example has Surrogate-Control
            key: 'CDN-Cache-Control',
            value: 'max-age=600, stale-while-revalidate=14400, stale-if-error=14400',
          },
        ],
      },
      {
        source: '/appRouter/getStaticPropsRevalidate/:name',
        headers: [
          // SWR value for ISR page such as this can be globally configured using `expireTime` at the root of `nextConfig`
          // But if you need to override any other part of Cache-control, like setting browser cache with max-age, you can't rely on `expireTime` anymore
          {
            key: 'Cache-Control',
            value: 'public, max-age=600, stale-while-revalidate=14400, stale-if-error=14400',
          },
        ],
      },

      // **
      // BELOW EXAMPLES FOR PAGES ROUTER
      // **

      {
        // this page has both html and JS representation, we're only interested in HTML, as JS is hashed
        source: '/fullyStaticPage',
        headers: [
          {
            key: 'Cache-Control',
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
