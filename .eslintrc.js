module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2020': true,
    },
    'extends': [
        'google',
    ],
    'parserOptions': {
        'ecmaVersion': 11,
    },
    'rules': {
        'indent': ['error', 4],
        'max-len': ['error', {code: 120}],
    },
};
