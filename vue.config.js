module.exports = {
  devServer: {
    open: true,
    port: 9999,
    proxy: {
      '/user': {
        target: 'http://127.0.0.1:3000',
        pathRewrite: {'': '/api'},
        // changeOrigin: true,
        // secure: false,
      }
    }
  }
}
