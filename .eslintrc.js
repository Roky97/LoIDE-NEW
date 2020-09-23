module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ["eslint:recommended", "plugin:react/recommended", 'plugin:@typescript-eslint/recommended'],
    parserOptions: {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    rule: {
        "react/prop-types": 0,
        "no-unused-vars": [
            "warn",
            { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }
        ]
    },
    env: {
        "es6": true,
        "browser": true
    },

    globals: {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "io": "readonly",
        "module": "readonly",
        "ace": "readonly"
    },
    plugins: ["react"]
}
