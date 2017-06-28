const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

	entry: {
		app: './client/src/app.js'
	},
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
			    exclude: /(node_modules)/,
			    loader: 'babel-loader',
			    query: {
			    	presets: ['react', 'es2015']
			    },
			},
			{
				test: /\.scss$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					use: [
					    {
					    	loader: "css-loader"
					    },
					    {
					    	loader: "sass-loader"
					    }
					],
					fallback: "style-loader"
				}))
				
			}
		]

	},
	plugins: [
	    new ExtractTextPlugin({filename: './styles.css', allChunks: true})
	],
}