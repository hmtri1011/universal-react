const WebpackConfigHelpers = require('razzle-dev-utils/WebpackConfigHelpers');
const Helpers = new WebpackConfigHelpers(process.cwd());

const adjustPostCSS = config => {
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
}

const configWebpack = config => {
  adjustPostCSS(config);
}

module.exports = configWebpack;