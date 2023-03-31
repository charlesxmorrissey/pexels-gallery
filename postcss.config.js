const path = require('path')

module.exports = {
  plugins: {
    'postcss-normalize': {},
    'postcss-pxtorem': {
      minPixelValue: 2,
      propList: ['*'],
      rootValue: 16,
    },
    'postcss-import': {},
    'postcss-mixins': {
      mixinsDir: path.join(__dirname, './src/assets/styles'),
    },
    'postcss-custom-media': {
      importFrom: path.join(
        __dirname,
        './src/assets/styles/base/variables.css'
      ),
    },
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      features: {
        'custom-media-queries': true,
        'custom-properties': false,
      },
      stage: 3,
    },
  },
}
