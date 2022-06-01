const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    basePath: '',
    images: {
        domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    target: "serverless"
}

module.exports = nextConfig
