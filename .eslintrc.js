module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
            // jsx: true,
        },
    },
    plugins: [
        '@typescript-eslint',
        'import',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/default-param-last': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/member-delimiter-style': ['error', {
            multiline: {
                delimiter: 'semi',
                requireLast: true,
            },
            singleline: {
                delimiter: 'semi',
                requireLast: true,
            },
            multilineDetection: 'brackets',
        }],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-types': [
            'error',
            {}
        ],
        'babel/camelcase': 0,
        'camelcase': 0,
        'eslint-disable-next-line no-nested-ternary': 0,
        'comma-dangle': ['error', {
            arrays: 'only-multiline',
            objects: 'always-multiline',
            imports: 'only-multiline',
            exports: 'only-multiline',
            functions: 'only-multiline',
        }],
        'complexity': ['warn', 64],
        'global-require': 0,
        'import/extensions': ['warn', 'always', {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
        }],
        'line-comment-position': 0,
        'no-shadow': 0,
        'no-console': ['warn', { allow: ['warn', 'info', 'error'] }],
        'no-magic-numbers': 0,
        'no-mixed-operators': [
            'error',
            {
                groups: [
                    ['+', '-', '*', '/', '%', '**'],
                    ['&', '|', '^', '~', '<<', '>>', '>>>'],
                    ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                    ['&&', '||'],
                    ['in', 'instanceof']
                ],
                allowSamePrecedence: true,
            }
        ],
        'no-multiple-empty-lines': ['error', { max: 1 }],
        'no-trailing-spaces': ['error', {
            skipBlankLines: false,
            ignoreComments: false,
        }],
        'no-undefined': 0,
        'no-unused-vars': ['error', { ignoreRestSiblings: true }],
        'no-warning-comments': 0,
        'no-use-before-define': 'off',
        'promise/always-return': 0,
        'promise/prefer-await-to-then': 0,
        'sonarjs/max-switch-cases': 0,
        'sonarjs/no-duplicate-string': 0,
        'sonarjs/no-small-switch': 0,
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always',
        }],
        'valid-jsdoc': 0,
        'default-param-last': 'off',
    },
    settings: {
        'import/extensions': [
            '.ts',
            '.tsx',
            '.js',
            '.jsx'
        ],
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
            webpack: {
                config: './webpack.config.js',
            },
        },
    },
    env: { browser: true },
    ignorePatterns: [
        'node_modules/**/*',
        '*.config.js',
        '.eslintrc*'
    ],
}
