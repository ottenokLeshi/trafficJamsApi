const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

	entry: "",

	output: {
		path: path.resolve(__dirname, './public'),
		filename: "bundle.js",
		publicPath: '/public/'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: path.join(__dirname, 'src'),
			},
			{
				test: /.css/,
				loader: 'style!css',
				include: path.join(__dirname, 'src')
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
		})
	],

	devtool: NODE_ENV == 'development' ? 'eval' : null
};
