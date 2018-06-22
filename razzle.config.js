const WebpackConfigHelpers = require('razzle-dev-utils/WebpackConfigHelpers');
const Helpers = new WebpackConfigHelpers(process.cwd());

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    const cssLoader = config.module.rules.find(Helpers.makeLoaderFinder('postcss-loader'))

    if (cssLoader) {
      const loaderRegex = /\bpostcss-loader\b/;
      const postCSSLoader = cssLoader.use.find(loader => loaderRegex.test(loader.loader))

      if (postCSSLoader) {
        const currentPlugins = postCSSLoader.options.plugins();
        postCSSLoader.options.plugins = () => [
          require('precss'),
          ...currentPlugins
        ]; 
      }
    }

    return config
  }
}
