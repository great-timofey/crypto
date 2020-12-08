module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          $components: './src/components',
          $navigation: './src/navigation',
          $screens: './src/screens',
          $global: './src/global',
          $services: './src/services',
          $assets: './assets',
          $redux: './src/redux',
          $i18n: './src/i18n',
          $contexts: './src/contexts',
          $hooks: './src/hooks',
        },
      },
    ],
  ],
};
