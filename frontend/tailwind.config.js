module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: {
                cinema: "url('../img/cinema.jpg')",
                camera: "url('../img/camera1.jpg')",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
