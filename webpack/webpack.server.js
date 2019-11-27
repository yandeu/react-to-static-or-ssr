const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  entry: {
    spa: path.resolve(__dirname, '../server/src/spa.tsx'),
    ssr: path.resolve(__dirname, '../server/src/ssr.tsx'),
    static: path.resolve(__dirname, '../server/src/static.tsx')
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    rules: [
      {
        // For pure CSS (without CSS modules)
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ['isomorphic-style-loader', 'css-loader']
      },
      {
        // For CSS modules
        test: /\.module\.css$/i,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: []
            }
          },
          'ts-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../server/dist'),
    publicPath: '/'
  },
  externals: [nodeExternals()]
}
