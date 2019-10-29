const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    app: './src/javascript/Leaflet.StyleEditor.js'
  },
  externals: {
    leaflet: {
      commonjs: 'leaflet',
      amd: 'leaflet',
      root: 'L'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      path: './',
      filename: 'css/Leaflet.StyleEditor.min.css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'javascript/Leaflet.StyleEditor.min.js',
    library: 'leafletstyleeditor'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          {
            loader: 'css-loader',
            options: {
              url: true
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  }
}
