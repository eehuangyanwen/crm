module.exports = {
  devServer: {
    port: 8888, // 端口号，如果端口号被占用，会自动提升1
    host: "localhost", //主机名， 127.0.0.1，  真机 0.0.0.0
    https: false, //协议
    open: true, //启动服务时自动打开浏览器访问
    proxy: {
      // "/": {
      //   target: "http://121.37.244.41:7300",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/": "/mock/5f058e1a97853e6b92f3454c/example_copy/"
      //   }
      // },
      '/api': {
        target: "http://121.37.244.41:7300/mock/5f058e1a97853e6b92f3454c/example_copy",
        changeOrigin: true,
        pathRewrite: {
          ['^/api']: ''
        }
      }
    }
  },
  lintOnSave: false, // 关闭格式检查
  productionSourceMap: false // 打包时不会生成 .map 文件，加快打包速度
};
