import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

const webpackConfig = {

  entry: [
    path.join(__dirname, '/client/src/App.jsx')
  ],
  output: {
    path: `${__dirname}/dist/client/public/`,
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map'
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
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
        test: /\.(jpg|png|gif|ico|svg)$/i,
        loaders: [
          'file-loader?name=/[name].[ext]',
          'image-webpack-loader'
        ]
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: './styles.css', allChunks: true }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};

export default webpackConfig;
