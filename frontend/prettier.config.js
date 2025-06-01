/** @type {import('prettier').Config} */
const config = {
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  arrowParens: 'always',
  jsxSingleQuote: true,
  importOrder: [
    '^react$', // React itself first
    '^react-dom(.*)$', // React DOM and related packages
    '^react-native$', // React Native core
    '^react-native/(.*)$', // React Native submodules
    '^@react-native/(.*)$', // React Native scoped packages
    '^react-native-(.*)$', // React Native community packages
    '^[^@.].*(?!/assets)(.*)$', // External packages excluding assets
    '^[@~]/(.*)$', // Aliased imports (both @ and ~)
    '^[./](?!.*.(css|scss)).*$', // Relative imports excluding styles
    '^[.]/(.*)$', // Current directory imports
    '^[..]/(.*)$', // Parent directory imports
    '^(.*).(css|scss)$', // Style imports last
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
}

module.exports = config
