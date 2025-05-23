/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
      mdxRs: true,
      serverComponentsExternalPackages: ['mongoose']
    },
    images: {
        remotePatterns: [
          {
            
            protocol: 'https',
            hostname: 'img.clerk.com',
            port: '',
            pathname: '/eyJ0eXBlIjoi**',
          
    },
        ],
      },
  }
  
  module.exports = nextConfig
  