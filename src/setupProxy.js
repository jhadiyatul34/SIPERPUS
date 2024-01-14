const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/auth', // path yang ingin di-proksi
    createProxyMiddleware({
      target: 'http://localhost:1603', // URL server backend Anda
      changeOrigin: true,
    })
  );
  app.use(
    '/api', // path yang ingin di-proksi
    createProxyMiddleware({
      target: 'http://localhost:1603', // URL server backend Anda
      changeOrigin: true,
    })
  );
};
