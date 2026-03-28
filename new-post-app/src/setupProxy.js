const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://dummyjson.com/',
            changeOrigin: true,
        })
    );
    // Add more rules as needed
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'https://dummyjson.com/',
            changeOrigin: true,
        })
    );
};
