const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const env = require('dotenv').config({path: './.env.production'});
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    output: {
		publicPath: env.parsed.BASENAME,
    },
    plugins: [
        new Dotenv({
            path: './.env.production',
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // Also generate a 404.html this is needed when github pages is used as a hosting platform
        new HtmlWebpackPlugin({ 
            filename: '404.html',
            template: 'src/index.html'
        })
    ]
});