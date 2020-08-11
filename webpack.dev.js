const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const env = require('dotenv').config({path: './.env.development'});

module.exports = merge(common, {
    mode: 'development',
    devServer: {
      historyApiFallback: true,
      port:8080,
      host: '0.0.0.0',
      public: 'localhost:8080'
    },
    devtool: 'inline-source-map',
    output: {
		publicPath: env.parsed.BASENAME,
  },
    plugins: [
        new Dotenv({
            path: './.env.development',
        })
    ]

});