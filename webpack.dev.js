const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
		historyApiFallback: true,
    },
    devtool: 'inline-source-map',
    output: {
		publicPath: '/'
    },
    plugins: [
        new Dotenv({
            path: './.env.development',
        })
    ]

});