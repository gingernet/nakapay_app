const webpack = require('webpack-cli');
const path = require('path');
const fs = require('fs');
const { VueLoaderPlugin } = require('vue-loader')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const vConsolePlugin = require('vconsole-webpack-plugin');

const minify = {
    minify: { // 移除注释 清除空格回车
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false,
    },
    hash: true,
};

const SRC_PATH = path.resolve(__dirname, './src');

const argv = require('yargs')
    .describe('debug', true) // use 'webpack --debug'
    .argv;
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name][hash:8].js',
    },
    devServer: {
        open: true,
        port: 8099,
        contentBase: SRC_PATH, // 指定托管的根目录
        hot: true,
        host: '0.0.0.0',
        historyApiFallback: true,
        useLocalIp: true,
        proxy: {
            '/api': 'http://39.99.187.24:8081/',
            '/photo': 'http://39.99.187.24:8081/media',
            '/material_file': 'http://39.99.187.24:8081/media'
        }
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js',
            '@': path.resolve('src')
        }
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },

    // 加载器
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            // 转化ES6的语法
            {
                test: /\.js$/, // use: 'babel-loader', exclude: /node_modules/ ,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        "babelrc": false, // 不采用.babelrc的配置
                        "plugins": [
                            "dynamic-import-webpack"
                        ]
                    }
                }]
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.less$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // publicPath: './',
                        outputPath: './image',
                        esModule: false,
                        limit: 8192, // 限制打包图片的大小
                        name: '[name].[hash:8].[ext]', //css中的images图片将会打包在build/image下;

                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, //处理字体文件
                loader: 'url-loader',
                options: {
                    publicPath: './',
                    limit: 10000,
                    name: 'fonts/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [path.resolve('src/icons')],
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            { test: /\.ejs$/, use: ['underscore-template-loader'] },
            { test: /\.(html|tpl)$/, use: ['html-loader'] },
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: "[name]-buddle[hash:8].css", publicPath: './' }),
        new vConsolePlugin({ enable: !!argv.debug }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
            filename: 'index.html',
            ...minify,
            chunks: ['main']
        }),
    ]
};

console.log('(*^_^*)webpack打包中...')
