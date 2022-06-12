module.exports = {
    env: { 'shared-node-browser': true, browser: true, node: true },
    extends: 'eslint:recommended',
    rules: {
    // A temporary hack related to IDE not resolving correct package.json
        'import/no-extraneous-dependencies': 'off',
        // Since React 17 and typescript 4.1 you can safely disable the rule
        'react/react-in-jsx-scope': 'off',
        'no-console': 'off',
        'global-require': 'off',
        'import/no-dynamic-require': 'off',
        'indent': [
            'warn',
            4
        ],
        'quotes': [
            'warn',
            'single'
        ],
        'prettier/prettier': 0,


    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
    },
    settings: {
        'import/resolver': {
            // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
            node: {},
            webpack: {
                config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
};
