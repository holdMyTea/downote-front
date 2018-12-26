import HtmlPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'

export default {
  mode: 'development',
  entry: path.join(__dirname, '/src/index.jsx'),
  output: {
    filename: 'malformed.js',
    path: path.join(__dirname, '/build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, '/public/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true
  }
}
