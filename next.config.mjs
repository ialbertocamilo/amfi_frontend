const nextConfig = {
  reactStrictMode: false,
  eslint: {
    dirs: ['pages', 'components', 'lib'],},
  typescript: {
    ignoreBuildErrors: false,
  },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/login',
          permanent: true, 
        },
      ];
    },
  };
  
  export default nextConfig;