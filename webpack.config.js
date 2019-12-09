var path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      { test: /\.(js||jsx)$/, 
      	exclude: /node_modules/, 
      	use: {
      		loader: 'babel-loader',
      		options: {
      			presets: ['@babel/preset-env']
      		}
      	}
      	
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  performance: {
    hints: false
  },
  mode: 'development'

};