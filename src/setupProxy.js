const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://cijene-me-api.onrender.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
      logLevel: 'debug',  // Add more logging
      secure: false,      // Don't verify SSL cert
      onProxyReq: (proxyReq, req) => {
        console.log('Proxy Request:', {
          method: req.method,
          originalUrl: req.originalUrl,
          targetPath: proxyReq.path
        });
      }
    })
  );
}; 