const path = require('path') // 引入path模块
function resolve (dir) {
  return path.join(__dirname, dir) // path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: './',
  outputDir: 'dist', // 输出文件目录
  // configureWebpack: {
  //     devtool: 'source-map',
  // },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src/"),
      },
    },
    devtool: "source-map",
  },
  devServer: {
    // overlay: {
    //     warnings: true,
    //     errors: true,
    // },
    open: true,
    // port: 8083,
    proxy: {
  
      '/api': {
        target: 'https://zhfwq.jchc.cn/isa_server/',
        changeOrigin: true,
        ws: true,
        secure: false,
        // logLevel: 'debug',
        pathRewrite: {
          '^/api': '/'
        }
      },


    }
  },
  productionSourceMap: false,
  lintOnSave: false,
  css: {
    extract: false, // false表示开发环境,true表示生成环境
    sourceMap: false

  },
   // 配置svg
   chainWebpack: config => {
    // svg 规则
    const svgRule = config.module.rule('svg') // 找到原有的svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不清除会在原有loader之后再使用当前loader规则
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
        .test(/\.svg$/)
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]',
        })

    // 修改images loader，添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/assets/svg'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
},

}
