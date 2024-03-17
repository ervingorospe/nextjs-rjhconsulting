/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: 'https://www.rjhconsulting.com/',
  generateRobotsTxt: true, // (optional)
  changefreq: 'daily',
  generateIndexSitemap: false,
  exclude: ['/home', '/services', '/favicon.ico']
  // ...other options
}

module.exports = config