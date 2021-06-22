const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
      include: path.resolve(__dirname, '../'),
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@app': path.resolve(__dirname, '../src/'),
    };
    config.module.rules.push({
      test: /\.js$/,
      loader: require.resolve('babel-loader'),
      options: {
        babelrc: false,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['last 2 Chrome major versions'],
                node: true,
              },
            },
          ],
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
        ],
        plugins: [
          ['@babel/plugin-proposal-nullish-coalescing-operator'],
          ['@babel/plugin-proposal-optional-chaining'],
          ['babel-plugin-styled-components'],
        ],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');

    // Return the altered config
    return config;
  },
};
