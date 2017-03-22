const path = require('path');

module.exports = {
  entry: './client/app.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'app.js',
  },
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ["react", "latest", "stage-0"]} },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(eot|svg|ttf|woff|woff2)\?*.*$/, loader: 'file-loader'},
    ]
  },
  devServer: {
    contentBase: './public'
  }
}
