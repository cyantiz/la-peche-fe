// import { color } from './theme/color'
// this line above doesn't work because cannot use import statement outside a module

module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
    ],
    theme: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            serif: ['Playfair Display', 'serif'],
        },
        extend: {
            colors: {
                'bitter-sweet': '#FB7B64',
                'raisin-black': '#221D23',
                'cafe-noir': '#4F3824',
                'gold-metallic': '#DDB967',
                'yellow-green-crayola': '#D0E37F',
                'almost-white': '#FEFEFE',
                inactive: '#687079',
                'inactive-base': '#F8FAFB',

            },
        },
    },
    plugins: [],
}
