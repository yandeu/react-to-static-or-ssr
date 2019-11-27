const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const CopyPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

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
      filename: devMode ? 'js/bundle.js' : 'js/bundle.[contenthash].js',
      chunkFilename: devMode ? 'js/chunk.[id].js' : 'js/chunk.[id].[contenthash].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/'
    },
    plugins: [
      new CopyPlugin([{ from: 'public', to: '' }]),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? 'css/styles.css' : 'css/styles.[contenthash].css',
        chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash].css',
        ignoreOrder: false
      }),
      // TODO: replace WebpackAssetsManifest by ManifestPlugin
      new WebpackAssetsManifest({ output: 'assets.json' }),
      new ManifestPlugin({ fileName: 'assets-manifest.json' })
    ]
  }
}
