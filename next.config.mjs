/** @type {import('next').NextConfig} */
const nextConfig = {
  // R3F creates a WebGL root on the canvas element. React StrictMode
  // double-invokes mount effects in dev, which makes R3F attempt to create
  // a second root on the same canvas ("createRoot on a container that has
  // already been passed to createRoot") and drops the WebGL context.
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
