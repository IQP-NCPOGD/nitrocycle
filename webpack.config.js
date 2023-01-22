const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
	entry: "./src/index.js",
	mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'nitrocycle.bundle.js',
  },
	module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
	resolve: {
  	fallback: {
   		async_hooks: false,
   		zlib: false,
			querystring: false 
  	},
	}
};

