const path = require('path');
const escape = require('escape-string-regexp');
const {getDefaultConfig} = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');

const modules = Object.keys({
  ...pak.peerDependencies,
});

const config = getDefaultConfig(__dirname);

config.watchFolders = [root];

config.resolver.blockList = exclusionList(
  modules.map(
    (m) =>
      new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
  )
);

config.resolver.extraNodeModules = {
  ...modules.reduce((acc, name) => {
    acc[name] = path.join(__dirname, 'node_modules', name);
    return acc;
  }, {}),
  '@optimove-inc/react-native': path.join(root, 'src'),
};

module.exports = config;
