/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7999' : 'https://pastebin-incubator.firebase.com'
}

module.exports = nextConfig
