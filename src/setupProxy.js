const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://3.35.147.177:8080',
      changeOrigin: true,
    })
  );
};