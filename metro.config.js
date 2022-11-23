// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  resolver: {
    sourceExts:
      process.env.EX_APP_MODE === 'mocked'
        ? ['mock.ts', ...defaultConfig.resolver.sourceExts]
        : defaultConfig.resolver.sourceExts,
  },
};
