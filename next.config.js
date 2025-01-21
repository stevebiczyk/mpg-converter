/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Required for static site generation
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: "/mpg-converter",
};

export default nextConfig;
