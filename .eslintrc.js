module.exports = {
    root: true,
    parser: `@typescript-eslint/parser`,
    parserOptions: {
        project: `./tsconfig.json`
    },
    extends: [
        '@react-native-community',
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react'
    ],
    rules: {
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'global-require': 'off',
        'no-console': 'off',
        'react-native/no-inline-styles': 'off',
        'import/prefer-default-export': 'off',
        'consistent-return': 'off',
        'react-hooks/exhaustive-deps': 'off',
        "react/jsx-props-no-spreading": "off",
    }
};
