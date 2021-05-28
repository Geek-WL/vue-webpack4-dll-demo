const path = require('path')
const Webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    // vendors: ['jquery', 'lodash'], // 需要dll打包的第三方库  (将jquery和lodash打包到同一个文件)
    jquery: ['jquery'], // 分别打包
    lodash: ['lodash'] // 分别打包
  },
  output: {
    filename: '[name].dll.js', // 生成的bundle文件 -> vendors.dll.js
    path: path.resolve(__dirname, 'dll'), // 最终输出的目录
    library: '[name]' // 生成库，可以通过库名访问
  },
  plugins: [
    /*
    Webpack自带DllPlugin插件
    DllPlugin 在打包第三方库的时候生成清单 (有了清单之后，dll打包过的第三库不会再次被打包)
    */
    new Webpack.DllPlugin({
      name: '[name]', // 暴露出的 DLL 的函数名  与 output.library 对应
      path: path.resolve(__dirname, 'dll/[name].manifest.json') // 生成文件名
    })
  ]
}
