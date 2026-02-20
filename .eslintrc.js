// eslint-disable-next-line import/no-commonjs
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    env: {
        browser: true,
        es6: true,
        jest: true,
        mocha: true,
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'comma-dangle': 'off',
        'indent-legacy': 'off',
        'react/prop-types': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
        'import/extensions': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/camelcase': 'off',
        'react/no-unused-prop-types': 'off',
        'react/require-default-props': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
        'react/jsx-no-literals': [
            'error',
            { noStrings: true, noAttributeStrings: false, ignoreProps: true },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
            },
        },
    },
};
