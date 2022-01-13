const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	purge: [
		//TODO: figure out how to get purge to work properly
		'./components/util/*.js',
		'./components/*.js',
		'./modules/*js',
		'./pages/*.js',
		'./pageTemplates/*.js'
	],
	plugins: [
		require('@tailwindcss/ui'),
	]
}