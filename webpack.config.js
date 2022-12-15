const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

module.exports={
  //Режим проекта и точка входа
  mode: 'development',
  entry: path.resolve(__dirname,'./src/main.js'),
  optimization: {
    runtimeChunk: 'single',
  },
  //Настройки сервера
  devServer: {
    watchFiles: [path.resolve(__dirname,"src")],
    historyApiFallback: true,
    port:3000,
    hot:true,
  },
  //Выходной main файл
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader",'css-loader']
      },
      {
        //Компиляция из scss в css
        test: /\.(sass)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', {
          loader: 'sass-loader'
      }]},{
        //Обработка картинок, иконок, svg
        test: /\.(ico)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
        }}]}]
  },
  plugins: [new HtmlWebpackPlugin({template: path.resolve(__dirname,'./src/index.html')}),
   new CleanWebpackPlugin()]
}