// api地址
// const api1 = 'http://47.112.29.135:9094';
// const api2 = 'http://api.springernature.com';/papersearch/customer-service
const api1 = 'http://47.108.117.89:9085';
//引入webpack
const webpack = require('webpack');
//当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳
const Timestamp = new Date().getTime();
module.exports = {
    // 部署应用时的基本 URL
    publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
    // 打包后生成的文件目录名称
    outputDir: "dist",
    // 打包后静态文件的目录名称
    assetsDir: "static",
    // 开发环境配置（它支持webPack-dev-server的所有选项）
    devServer: {
        host: "localhost",
        port: 8080,
        https: false,
        open: false, //配置自动启动浏览器
        // proxy: api1,// 配置跨域处理,只有一个代理
        // 配置多个代理
        proxy: {
          "/api": {
            target: api1,
            changeOrigin: true,   //是否跨域
            pathRewrite: {
              '^/api': '/customer-service'
            }
          },
        },
        disableHostCheck: true,
    },
    // 插件
    configureWebpack: {
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `static/js/[name].${Timestamp}.js`,
            chunkFilename: `static/js/[name].${Timestamp}.js`
        },
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery'
            })
        ]
    },
    productionSourceMap: false,
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Index Page',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    }
};
