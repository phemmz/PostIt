import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {

  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/src/app.js')
  ],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map'
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client')
        ],
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ],
          fallback: 'style-loader'
        }))
      },
      {
        test: /\.(jpg|png|gif|svg)$/i,
        loaders: [
          'file-loader?name=/[name].[ext]',
          'image-webpack-loader'
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({ filename: './styles.css', allChunks: true })
  ],
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
