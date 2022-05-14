const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonConfig = {
  mode: 'production',
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
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /wordlists\/(french|spanish|italian|korean|chinese_simplified|chinese_traditional|japanese|czech|portuguese)\.json$/,
    }),
    new webpack.IgnorePlugin({
      checkResource(resource) {
        return resource === './CLIKey'
      }
    }),
  ],
};

const webConfig = {
  ...commonConfig,
  target: 'web',
  output: {
    filename: 'bundle.js',
    libraryTarget: 'umd',
    library: 'Terra',
  },
  resolve: {
    ...commonConfig.resolve,
    fallback: {
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
    },
  },
  plugins: [
    ...commonConfig.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    // new BundleAnalyzerPlugin(),
  ],
};

const nodeConfig = {
  ...commonConfig,
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    filename: 'bundle.node.js',
  },
};

module.exports = [webConfig, nodeConfig];
