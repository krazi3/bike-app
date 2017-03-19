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
    ]
  },
  devServer: {
    contentBase: './public'
  }
}
