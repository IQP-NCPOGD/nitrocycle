const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require('path');
module.exports = (env, argv) => {
   let rootPath = argv.mode === 'development' ? '/' : '/nitrocycle';
   return {
      context: __dirname,
      entry: './src/index.js',
      output: {
         path: path.resolve(__dirname, 'dist'),
         filename: 'main.js',
         publicPath: rootPath,
      },
      devServer: {
         historyApiFallback: true
      },
      module: {
         rules: [
            {
               test: /\.js$/,
               use: 'babel-loader',
            },
            {
               test: /\.css$/,
               use: ['style-loader', 'css-loader'],
            }, {
               test: /\.(png|j?g|svg|gif)?$/,
               use: 'file-loader'
            }
         ]
      },
      plugins: [
         new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
         }),
         new CopyWebpackPlugin({
            patterns: [
               { from: "./node_modules/@ar-js-org/artoolkit5-js/data/", to: "data/" },
               { from: "./data/", to: "data/" },
            ],
         }),
      ]
   }
};
