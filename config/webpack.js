const WebpackConfigHelpers = require('razzle-dev-utils/WebpackConfigHelpers');
const Helpers = new WebpackConfigHelpers(process.cwd());
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const entries = require('./entries');

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

const addMutipleEntries = (config, { target, dev }) => {
  if (target === 'web') {
    const clientEntry = config.entry.client;
    
    // production
    config.output.filename = 'static/js/bundle.[name].[chunkhash:8].js';
    const oldCSSExtractPlugin = config.plugins.find(p => p instanceof MiniCssExtractPlugin);

    if (oldCSSExtractPlugin) {
      oldCSSExtractPlugin.options.filename = 'static/css/bundle.[name].[contenthash:8].css';
    }

    // change entry client to apps/main
    const clientEntrySource = clientEntry[clientEntry.length - 1];
    clientEntry[clientEntry.length - 1] = clientEntrySource.replace("src/client", "src/apps/main/client");

    const [ polyfill, hotDev ] = clientEntry;

    // add more entries
    Object.keys(entries).forEach((entryName) => {
      const entrySource = entries[entryName];
      config.entry[entryName] = [polyfill, entrySource]
    });

    if (dev) {
      config.output.filename = '[name].js';

      // enable hotDevReload for entry points
      Object.keys(entries).forEach((entryName) => {
        const entrySource = entries[entryName];
        config.entry[entryName].unshift(hotDev);
      });
    }
  }
}

const configWebpack = (config, option) => {
  adjustPostCSS(config);
  addMutipleEntries(config, option);
}

module.exports = configWebpack;