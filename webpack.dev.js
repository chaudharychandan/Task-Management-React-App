const merge = require('webpack-merge');
const common = require('./webpack.common.js');
console.log(common);

module.exports = (env = {}) => {
  const commonConfig = common(env);
  return merge(commonConfig, {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    }
  });
};
