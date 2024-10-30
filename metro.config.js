const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
    resolver: {
      sourceExts: ['jsx', 'js', 'ts', 'tsx','mjs', 'cjs', 'json'] // Add your extensions here
      },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
