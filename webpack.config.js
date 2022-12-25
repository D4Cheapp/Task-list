const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  //Режим проекта и точка входа
  mode: 'development',
  entry: path.resolve(__dirname,'src/main.js'),
  //Настройка сервера
  devServer: {
    watchFiles: path.resolve(__dirname,"src/index.html"),
    port: 3000,
    hot: true,
  },
  //Выходные файлы
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        //Обработка css файлов
        test: /\.css$/,
        use: ["style-loader",'css-loader']
      },{
        //Компиляция из sass в css
        test: /\.(sass)$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('postcss-preset-env')],
          }}},{
          loader: 'sass-loader'
      }]
      },{
        //Обработка ico и svg
        test: /\.(svg|ico)$/,
        type: 'asset/resource'
      },{
        //Обработка картинок
        test: /\.(jpg|png)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path]/[name].[ext]'
      }}]}
  ]},
  plugins: [// Настройка плагина HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname,'src/favicon.svg'),
      template: path.resolve(__dirname,'src/index.html')})]
};
