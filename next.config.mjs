/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: false,
        reactStrictMode:true
    },
    images:{unoptimized:true}
};

export default nextConfig;
