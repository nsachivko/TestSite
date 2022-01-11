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
		//'./pages/**/*.js'
	],
	plugins: [
		require('@tailwindcss/ui'),
	]
}