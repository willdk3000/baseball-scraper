const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy API request and remove /api
  app.use(proxy('/api',
    { target: 'http://localhost:8000/', pathRewrite: { '^/api': '' } }
  ))
}