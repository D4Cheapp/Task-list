const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  //Режим проекта и точка входа
  mode: 'development',
  entry: path.resolve(__dirname,'src/main.js'),
  //Настройка сервера
  devServer: {
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
        //Обработка html файлов
        test: /\.html$/,
        loader: 'html-loader',
      },{
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
        //Обработка иконок
        test: /\.ico$/,
        use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
      }}]
      },{
        //Применение babel к js
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
      }}},
  ]},
  plugins: [// Настройка плагина HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    })]
};
