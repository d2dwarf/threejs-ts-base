const { join, resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = () => ({
  entry: {
    app: join(__dirname, 'src', 'entry.ts')
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.(glsl|vert|frag)$/,
        use: [
          {
            loader: 'webpack-glsl-loader',
            // options: {
            //   glsl: {
            //     chunkPath: resolve('/glsl/chunks')
            //   }
            // }
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: join(__dirname, 'public', 'index.html'),
      title: 'threejs+lensflare',
      filename: 'index.html',
      scriptLoading: 'defer'
    })
  ],
  resolve: {
    extensions: [
      '.js', '.jsx', '.ts', '.tsx', '.glsl', '.vert', '.frag'
    ]
  }
})