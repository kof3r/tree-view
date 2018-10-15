
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve('build')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: 'file-loader',
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        use: 'file-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'util.lib': path.resolve('src', 'util'),
    }
  },
  plugins: [
    new HTMLWebpackPlugin({ template: 'index.html' }),
    new webpack.DefinePlugin({
      'process.env': {
        DATA_SOURCE: JSON.stringify(process.env.DATA_SOURCE),
        CONTROLLER: JSON.stringify(process.env.CONTROLLER),
      }
    }),
  ],
  devServer: {
    historyApiFallback: true,
  }
};
