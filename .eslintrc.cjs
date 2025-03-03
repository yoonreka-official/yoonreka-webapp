module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  globals: {
    JSX: true,
    NodeJS: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      "jsx": true // JSX 지원하도록 설정
    },
    sourceType: "module", // eslint-plugin-import 필수 설정 1
    ecmaVersion: 2020, // eslint-plugin-import 필수 설정 2
  },

  plugins: ['@typescript-eslint', 'react-hooks', 'prettier', 'perfectionist'],
  root: true,
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'import',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'objectLiteralProperty',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'function', // exported function (component, custom hook)
        format: ['PascalCase', 'camelCase'],
        // modifiers: ['exported'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "none",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }
    ],
    'comma-dangle': 0,
    'consistent-return': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-extra-semi': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': ['error', { props: false }],
    'no-shadow': 0,
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    'perfectionist/sort-exports': [
      'error',
      {
        ignoreCase: true,
        order: 'asc',
        type: 'alphabetical',
      },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        customGroups: {
          type: {},
          value: {
            style: ['*.scss', '*.css'],
            // react: ['react', 'react/**', 'react*', 'react*/**'],
            v2: ['~/v2/**'],
          },
        },
        environment: 'node',
        groups: [
          // 'react',
          'external',
          'builtin',
          'internal',
          'v2',
          ['parent', 'sibling', 'index'],
          'type',
          'internal-type',
          ['parent-type', 'sibling-type', 'index-type'],
          'style',
          'object',
          'unknown',
        ],
        ignoreCase: true,
        internalPattern: ['~/**'],
        maxLineLength: undefined,
        newlinesBetween: 'always',
        order: 'asc',
        type: 'alphabetical',
      },
    ],
    'perfectionist/sort-jsx-props': [
      'error',
      {
        customGroups: {
          callback: 'on*',
          form1: '{name,value}',
          form2: '{defaultValue,placeholder}',
          primary: '{key,id,title,label}',
          secondary: '{path,}',
        },
        groups: ['primary', 'secondary', 'form1', 'form2', 'unknown', 'shorthand', 'callback'],
        ignoreCase: true,
        ignorePattern: [],
        order: 'asc',
        type: 'alphabetical',
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'react/button-has-type': 0,
    'react/jsx-curly-brace-presence': [1, { children: 'never', props: 'never' }],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-sort-props': 0,
    'react/no-array-index-key': 0,
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
  },

  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    'import/resolver': {
      typescript: {
        // @alwaysTryTypes always try to resolve types under `<root>@types`
        // directory even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
        project: './tsconfig.json',
        extensions: ['.ts', '.tsx'],
      },
    },
  }
};
