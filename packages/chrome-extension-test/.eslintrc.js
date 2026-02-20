module.exports = {
    root: true,
    extends: '@cargurus/eslint-config',
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                project: ['./tsconfig.json', './tsconfig.node.json'],
                tsconfigRootDir: __dirname,
            },
        },
        {
            files: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],

            rules: {
                'testing-library/await-async-events': 'error',
            },
        },
    ],

    ignorePatterns: ['dist/', 'coverage/'],
};
