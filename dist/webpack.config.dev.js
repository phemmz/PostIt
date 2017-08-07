'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  entry: ['webpack-hot-middleware/client', _path2.default.join(__dirname, '/client/src/app.js')],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map'
  },
  devtool: '#source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      include: [_path2.default.join(__dirname, 'client')],
      exclude: /node_modules/,
      loaders: ['react-hot-loader', 'babel-loader']
    }, {
      test: /\.scss$/,
      use: ['css-hot-loader'].concat(_extractTextWebpackPlugin2.default.extract({
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }],
        fallback: 'style-loader'
      }))
    }, {
      test: /\.(jpg|png|gif|svg)$/i,
      loaders: ['file-loader?name=/[name].[ext]', 'image-webpack-loader']
    }]
  },
  plugins: [new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.optimize.OccurrenceOrderPlugin(), new _extractTextWebpackPlugin2.default({ filename: './styles.css', allChunks: true })]
};