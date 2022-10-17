const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 对于图片文件,webpack4使用file-loader和url-loader来处理的,但webpack5不使用这两个loader了,
// 而是采用自带的asset-module来处理
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// console.log('NODE_ENV', process.env.NODE_ENV)//开发模式
// console.log('BASE_ENV', process.env.BASE_ENV)//业务环境
// 这里需要把process.env.BASE_ENV注入到业务代码里面
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式
module.exports = {
    entry: path.join(__dirname, "../src/index.tsx"),
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        path: path.join(__dirname, '../dist'),
        clean: true,// webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了,
        publicPath: '/' // 打包后文件的公共前缀路径
    },
    module: {
        rules: [
            {
                // 比如需要引入antd的css,需要单独把antd的文件目录路径添加解析css规则到include里面
                test: /\.css$/,
                include: [path.resolve(__dirname, '../src'),path.resolve(__dirname, '../node_modules/antd/dist/antd.css')],
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
                    'css-loader', 
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                include: [path.resolve(__dirname, '../src')],
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
                    'css-loader', 
                    'postcss-loader',
                    {
                        loader:'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        }
                    }
                ]
            },
            {
                // 其他loader也是相同的配置方式,如果除src文件外也还有需要解析的
                test: /\.(ts|tsx)$/,
                include: [path.resolve(__dirname, '../src')], //只对项目src文件的ts,tsx进行loader解析
                use: ['thread-loader', 'babel-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{ 
                    filename:'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
            {
                test:/\.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                  dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于10kb转base64位
                  }
                },
                generator:{ 
                  filename:'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
            {
                test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{ 
                    filename:'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            }
        ]
    },
    resolve: {
        // 在引入模块时不带文件后缀时，会来该配置数组里面依次添加后缀查找文件，因为ts不支持引入以 .ts, tsx为后缀的文件
        // 这里只配置js, tsx和ts，其他文件引入都要求带后缀，可以提升构建速度。
        extensions: ['.js', '.tsx', '.ts'],
        alias: {
            '@': path.join(__dirname, '../src')
        },
        // 缩小模块搜索范围  node里面模块有三种 node核心模块 node_modules模块 自定义文件模块
        // 使用require和import引入模块时如果有准确的相对或者绝对路径,就会去按路径查询,如果引入的模块没有路径,
        // 会优先查询node核心模块,如果没有找到会去当前目录下node_modules中寻找,
        // 如果没有找到会查从父级文件夹查找node_modules,一直查到系统node全局模块。
        // 这样会有两个问题,一个是当前项目没有安装某个依赖,但是上一级目录下node_modules或者全局模块有安装,就也会引入成功
        // ,但是部署到服务器时可能就会找不到造成报错,另一个问题就是一级一级查询比较消耗时间。
        // 可以告诉webpack搜索目录范围,来规避这两个问题。
        modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true, // 自动注入静态资源
        }),
        // 就可以通过该环境变量设置对应环境的接口地址和其他数据,要借助webpack.DefinePlugin插件
        // 配置后会把值注入到业务代码里面去 比如用来处理接口环境axios
        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
        })
    ],
    cache: {
        type: 'filesystem', // 使用文件缓存
    }
}