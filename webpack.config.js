const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './src/typescript/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css']
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
      filename: 'css/Leaflet.StyleEditor.min.css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new UnminifiedWebpackPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'javascript/Leaflet.StyleEditor.min.js',
    library: 'leafletstyleeditor'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
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
            presets: [
              [
                '@babel/preset-env',
                {
                  'targets': 'defaults'
                }
              ]
            ]
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
