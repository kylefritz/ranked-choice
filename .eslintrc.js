module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "amd": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:compat/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": [0], // no prop-types
        "react/no-unescaped-entities": ["error", { "forbid": [">", "}"] }], // quotes ok
    },
    "settings": {
        "react": {
            "version": "detect", // React version. "detect" automatically picks the version you have installed.
        },
    }
};
