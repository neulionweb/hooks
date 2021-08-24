module.exports = {
  plugins: ['@babel/plugin-proposal-class-properties', 'babel-plugin-lodash'],
  env: {
    development: {
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      plugins: ['@babel/plugin-transform-runtime'],
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            loose: true,
          },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: ['@babel/plugin-transform-runtime'],
    },
  },
};
