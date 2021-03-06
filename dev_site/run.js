const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');

new WebpackDevServer(webpack({
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3002',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    '@babel/polyfill',
    './index.tsx',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: 'scripts/[name].chunk.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Component Test Site',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '../dev_site'),
          path.join(__dirname, '../src'),
        ],
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ],
  },
  mode: 'development',
}), {
  publicPath: '/',
  hot: true,
  open: true,
  historyApiFallback: true,
  stats: { colors: true },
}).listen(3002, 'localhost', (error) => {
  if (error) {
    throw error;
  }
});
