// api地址
const api1 = 'http://47.112.29.135:9094';
const api2 = 'http://api.springernature.com';
// const api = 'http://192.168.30.17:9094';
//引入webpack
const webpack = require('webpack');

module.exports = {
    // 部署应用时的基本 URL
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    // 打包后生成的文件目录名称
    outputDir: "dist",
    // 打包后静态文件的目录名称
    assetsDir: "static",
    // 开发环境配置（它支持webPack-dev-server的所有选项）
    devServer: {
        host: "localhost",
        port: 8080,
        https: false,
        open: true, //配置自动启动浏览器
        proxy: api1,// 配置跨域处理,只有一个代理
        // 配置多个代理
        // proxy: {
        //   "/": {
        //     target: api1,
        //     changeOrigin: true,   //是否跨域
        //     pathRewrite: {
        //       '^/': ''
        //     }
        //   },
        // }
        disableHostCheck: true,
    },
    // 插件
    configureWebpack: {
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
