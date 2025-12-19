/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss',
    'stylelint-config-recommended',
  ],
  rules: {
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'function-comma-space-after': 'always',
    'value-no-vendor-prefix': true,
    'property-no-unknown': true,
  },
};
