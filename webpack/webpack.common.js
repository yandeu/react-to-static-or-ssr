const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')

module.exports = env => {
  const devMode = env && env.production ? false : true
  console.log('devMode', devMode)

  return {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    module: {
      rules: [
        {
          // For pure CSS (without CSS modules)
          test: /\.css$/i,
          exclude: /\.module\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        },
        {
          // For CSS modules
          test: /\.module\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css']
    },
    output: {
      filename: devMode ? 'static/bundle.js' : 'static/bundle.[contenthash].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? 'static/styles.css' : 'static/styles.[contenthash].css',
        chunkFilename: devMode ? 'static/[id].css' : 'static/[id].[contenthash].css',
        ignoreOrder: false
      }),
      new WebpackAssetsManifest({
        output: 'assets.json'
      })
    ]
  }
}
