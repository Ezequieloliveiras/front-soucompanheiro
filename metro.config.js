const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

module.exports = function (baseConfig) {
  const defaultConfig = mergeConfig(baseConfig, getDefaultConfig(__dirname));
  const {resolver: {assetExts, sourceExts}} = defaultConfig;

  return mergeConfig(
    defaultConfig,
    {
      resolver: {
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
      },
    },
  );
};


// const { getDefaultConfig } = require('expo/metro-config');

// const config = getDefaultConfig(__dirname);

// const { transformer, resolver } = config;

// config.transformer = {
// ...transformer,
// babelTransformerPath: require.resolve("react-native-svg-transformer"),
// }

// config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
//     sourceExts: [...resolver.sourceExts, "svg"],
//   };

// module.exports = config;