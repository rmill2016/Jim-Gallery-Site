module.exports = {
    mode: 'jit',
    content: [
        './pages/**/*.{html,js,jsx,ts,tsx}',
        './components/**/*.{html,js,jsx,ts,tsx}',
    ],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '992px',
            xl: '1440px',
            '2xl': '1920px',
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif'],
            },
            colors: {
                primary: '#1D3541',
                accent: '#FBD784',
                white: '#FFF',
                black: '#000',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('tw-elements/dist/plugin')],
}
