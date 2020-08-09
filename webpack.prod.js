const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const env = require('dotenv').config({path: './.env.production'});

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: env.BASENAME
    },
    plugins: [
        new Dotenv({
            path: './.env.production',
        })
    ]
});