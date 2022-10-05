const isDEV = process.env.NODE_ENV === 'development' // 是否是开发模式

module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
                "useBuiltIns": "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                "corejs": 3, // 配置使用core-js低版本
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        isDEV && require.resolve('react-refresh/babel') // 如果是开发模式,就启动react热更新插件
    ].filter(Boolean) // 过滤空值
}