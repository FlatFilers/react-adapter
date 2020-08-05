const path = require('path');
const webpack = require('webpack');

const PORT = parseInt(process.env.PORT || '8080', 10);

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  stats: {
    errorDetails: true,
    colors: true,
    modules: true,
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
    publicPath: process.env.DEPLOY_URL || '/',
    library: 'react-adapter',
  },
  bail: true,
  devServer: {
    host: process.env.DOCKER_HOST || 'localhost',
    contentBase: 'public',
    historyApiFallback: true,
    liveReload: true,
    hot: true,
    port: PORT,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.(svg|otf|png)$/,
        loader: 'file-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve('src'),
    },
    extensions: ['.tsx', '.js', '.ts'],
  },
};
