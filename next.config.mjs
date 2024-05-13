/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    eslint:false,
    typescript: {
        ignoreBuildErrors: true
    }
};

export default nextConfig;
