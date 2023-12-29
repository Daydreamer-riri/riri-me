import ririd from '@ririd/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default ririd(
  { formatters: true },
  ...compat.config({
    extends: ['plugin:astro/recommended'],
    overrides: [
      {
        // Define the configuration for `.astro` file.
        files: ['*.astro'],
        // Allows Astro components to be parsed.
        parser: 'astro-eslint-parser',
        // Parse the script in `.astro` as TypeScript by adding the following configuration.
        // It's the setting you need when using TypeScript.
        parserOptions: {
          parser: '@typescript-eslint/parser',
          extraFileExtensions: ['.astro'],
        },
        rules: {
          'react/jsx-key': 'off',
          'react/no-unknown-property': 'off',
          'react/jsx-no-undef': 'off',
          'react/jsx-indent': 'off',
          'react/jsx-max-props-per-line': 'off',
        },
      },
    ],
  }),
)
