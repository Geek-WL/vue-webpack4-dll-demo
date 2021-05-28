const path = require('path')
const fs = require('fs')
const Webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin') // 将 dll打包的文件注入到生成的 html 模板中

const dllPath = path.resolve(__dirname, 'dll')
const dllFiles = fs.readdirSync(dllPath)

module.exports = {
  // entry: './src/main.js', // vu-cli中默认 main.js
  // outputDir: 'dist', // 默认
  // assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 默认 /
  productionSourceMap: false, // 不需要生产环境的source map，加速构建
  devServer: {
    open: true, // 自动打开浏览器
    port: 9999, // 预打包运行服务端口
    // 本地代理
    proxy: {
      '/user': {
        target: 'http://127.0.0.1:3000', // http://127.0.0.1:3000/user
        pathRewrite: {'': '/api'}, // 路径重写 -> 在 /user 接口前添加 /api 即 http://127.0.0.1:3000/api/user
        // changeOrigin: true, // ip地址代理不需要开启，域名代理需开启
        // secure: false, // 请求协议为https时开启此项配置
      }
    }
  },
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.css', '.scss', '.png', '.jpg'],
      // 设置路径别名
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, 'src'),
        // '@page': resolve('src/views'),
        // '@cp': resolve('src/components'),
        // '@cm': resolve('src/common'),
        // '@assets': resolve('src/assets'),
        '@root': path.resolve(__dirname)
      }
    }

    // dll
    dllFiles.forEach(file => {
      if (file.endsWith('.js')) {
        config.plugins.push(new AddAssetHtmlPlugin({
          // dll文件位置（需要把dll打包好的文件注入）
          filepath: path.resolve(__dirname, 'dll', file),
          // dll引用路径
          // publicPath: './vendors',
          // dll最终输出的目录
          outputPath: './vendors' // 表示打包后输出至（存放的目录）dist/vendors/   默认dist/
        }))
      } else if (file.endsWith('.json')) {
        config.plugins.push(new Webpack.DllReferencePlugin({
          // context: process.cwd(),
          manifest: path.resolve(__dirname, 'dll', file)
        }))
      }
    })
    /*
    config.plugins.push(
      // 通过清单（生成的manifest.json文件）告诉webpack打包时不需要打包已经通过dll打包过的第三方库
      new Webpack.DllReferencePlugin({
        // context: process.cwd(),
        manifest: path.resolve(__dirname, 'dll/vendors.manifest.json')
      })
    )
    config.plugins.push(
      // 此插件将dll打包的文件注入到生成的 html 模板中
      new AddAssetHtmlPlugin({
        // dll文件位置（需要把dll打包好的文件注入）
        filepath: path.resolve(__dirname, 'dll/vendors.dll.js'),
        // dll引用路径
        // publicPath: './vendor',
        // dll最终输出的目录
        // outputPath: './vendor'
      })
    )
    */
  }
}
