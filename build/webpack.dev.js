const path = require('path')
const { merge } = require('webpack-merge')
const baseconfig = require('./webpack.base')
// 热更新上面已经在devServer中配置hot为true, 
// 在webpack4中,还需要在插件中添加了HotModuleReplacementPlugin,
// 在webpack5中,只要devServer.hot为true了,该插件就已经内置了。
// ReactRefreshWebpackPlugin =>不需要刷新浏览器的前提下模块热更新,并且能够保留react组件的状态。
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
module.exports = merge(baseconfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',//源码映射
    devServer: {
        hot: true,
        port: 8080,
        compress: false,// gzip压缩,开发环境不开启,提升热更新速度
        historyApiFallback: true, // 解决history路由404问题
        static: {
            directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
        }
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),// 添加热更新插件
    ]
})