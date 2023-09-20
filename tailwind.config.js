module.exports = {
    content: ["./*.html","./src/*.js"],
    darkMode : "class",
    theme: {
        extend: {
            fontFamily : {
                nunitoSans : "'Nunito Sans', sans-serif"
            },
            colors : {
                darkBlue:  'hsl(209, 23%, 22%)',
                veryDarkBlueBg: 'hsl(207, 26%, 17%)',
                veryDarkBlueText: 'hsl(200, 15%, 8%)',
                darkGray: "hsl(0, 0%, 52%)",
                veryLightGray: 'hsl(0, 0%, 98%)',
                whiteDarkModeText: 'hsl(0, 0%, 100%)'
            }
            /* gridTemplateColumns: {
                // Simple 16 column grid
                '2-col-max-content': 'auto auto'
            } */
        },
    },
    plugins: [],
    }