const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const commonConfig = {
  entry: './src/index.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
};

const webConfig = {
  ...commonConfig,
  target: 'web',
  output: {
    filename: 'bundle.js',
    libraryTarget: 'umd',
    library: 'Terra',
    path: path.resolve(__dirname, 'dist'),
  },
  // plugins: [new BundleAnalyzerPlugin()],
};

const nodeConfig = {
  ...commonConfig,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: 'bundle.node.js',
  },
};

module.exports = [webConfig, nodeConfig];
