module.exports = {
	"parser": "@typescript-eslint/parser",
	"env": {
		"es6": true,
		"browser": true,
		"node": true
	},
	"extends": [
        "plugin:react/recommended",
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true,
			"modules": true
		},
		"ecmaVersion": 2017,
		"sourceType": "module"
	},

	"globals": {
		"module": true,
		"process": true,
		"require": true,
		"React": true,
		"__dirname": true,
	},

	"rules": {
		"object-curly-spacing": [2, "always"],
		"react/jsx-uses-vars": 2,
		"camelcase": 0,
		"no-unused-vars": 0,
		"no-console": 0,
		"no-undefined": 1,
		"eqeqeq": 2,
		"no-debugger": 2,
		"no-extra-parens": 0,
		"no-irregular-whitespace": 2,
		"no-unreachable": 1,
		"use-isnan": 2,
		"valid-jsdoc": 2,
		"no-alert": 2,
		"no-multi-spaces": 1,
		"no-native-reassign": 1,
		"no-octal": 1,
		"strict": 2,
		"no-undef": 2,
		"no-undef-init": 2,
		"consistent-this": 2,
		"eol-last": 2,
		"no-nested-ternary": 1,
		"no-trailing-spaces": 1,
		"quotes": 0,
		"space-infix-ops": 1,
		"no-var": 2
	},
	"plugins": [
		"react",
		"react-hooks"
	]
}

