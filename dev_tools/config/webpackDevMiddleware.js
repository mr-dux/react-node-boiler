const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./webpack.config.dev.js');
const compiler = webpack(config);

module.exports = webpackDevMiddleware(compiler, {publicPath: config.output.publicPath});
