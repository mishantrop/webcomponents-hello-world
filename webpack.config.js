const { resolve } = require('path')
const { join } = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        polyfills: './polyfills.ts',
        main: './index.ts',
    },
    output: {
        path: join(__dirname, 'dist'),
        publicPath: 'auto',
        filename: '[name].js',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: resolve(__dirname, 'dist'),
        open: false,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader', 'eslint-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new ESLintPlugin({
            extensions: ['js', 'ts', 'jsx', 'tsx'],
            context: 'src',
            lintDirtyModulesOnly: true,
            threads: 3,
        }),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'index.html'),
        }),
    ],
}
