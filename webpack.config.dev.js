import path from 'path';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

export default {

	entry: path.join(__dirname, '/client/src/app.js'),
	output: {
		path: '/',
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