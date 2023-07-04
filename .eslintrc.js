module.exports = {
    env: { 'shared-node-browser': true, node: true, browser: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['import', 'react'],
    rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-console': 'off',
        'global-require': 'off',
        'import/no-dynamic-require': 'off',
        indent: ['warn', 4],
        quotes: ['warn', 'single'],
        'prettier/prettier': 0,
        'object-curly-spacing': ['warn', 'always'],
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'semi': 'warn'
    },
    parserOptions: {
        ecmaVersion: 2021,
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
                config: require.resolve(
                    './.erb/configs/webpack.config.eslint.ts'
                ),
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
};
