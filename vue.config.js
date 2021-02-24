const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
// 项目的主要配置文件
module.exports = {
  // webpack 配置进行更细粒度的修改  https://cli.vuejs.org/zh/config/#chainwebpack
  chainWebpack: (config) => {
    // 修改文件引入自定义路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('style', resolve('src/assets/style'))
    if (process.env.NODE_ENV === 'production') {
      // #region 忽略生成环境打包的文件
      var externals = {
        vue: 'Vue',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        vuex: 'Vuex'
      }
      config.externals(externals)

      // 在html文件中引入相关CDN
      const cdn = {
        css: [
          // element-ui css
          'https://cdn.bootcss.com/element-ui/2.13.2/theme-chalk/index.css'
        ],
        js: [
          // vue
          'https://cdn.staticfile.org/vue/2.6.11/vue.min.js',
          // vue-router
          'https://cdn.staticfile.org/vue-router/3.2.0/vue-router.min.js',
          // vuex
          'https://cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
          // element-ui js
          'https://cdn.bootcss.com/element-ui/2.13.2/index.js'
        ]
      }
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
    }
    // .set('mtoken', resolve('src/assets/js/mtoken.js'))
  },
  publicPath: './'
}
