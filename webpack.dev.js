const { join } = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common(), {
  mode: 'development',
  module: {
    rules: [
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
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      }
    ]
  },
  devServer: {
    static: {
      directory: join(__dirname, 'src')
    },
    port: 4000,
    open: false
  }
})