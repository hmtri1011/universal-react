const webpackConfigHelper = require('./config/webpack');
module.exports = {
  modify: (config, { target, dev }, webpack) => {
    webpackConfigHelper(config, target, dev);

    return config
  }
}
