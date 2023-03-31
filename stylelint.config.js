module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'color-hex-length': 'short',
    'color-named': 'never',
    'color-no-hex': true,
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands'],
      },
    ],
    'comment-whitespace-inside': 'always',
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['after-custom-property', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block'],
      },
    ],
    'declaration-block-single-line-max-declarations': 1,
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-declaration', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block'],
      },
    ],
    'function-name-case': 'lower',
    'function-url-no-scheme-relative': true,
    'import-notation': null,
    'length-zero-no-unit': true,
    'no-invalid-position-at-import-rule': null,
    'order/properties-order': [
      ['composes'],
      {
        unspecified: 'bottomAlphabetical',
      },
    ],
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
    'selector-pseudo-element-colon-notation': 'double',
    'selector-type-case': 'lower',
    'value-keyword-case': null,
  },
}
