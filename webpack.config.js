const path = require('path')

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
  output: {
    path: path.resolve(__dirname, 'dist/javascript/'),
    filename: 'Leaflet.StyleEditor.min.js',
    library: 'leafletstyleeditor'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
