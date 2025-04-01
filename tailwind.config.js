/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                customBlue: 'rgb(134, 122, 238)',
                customGray: 'rgb(169, 169, 176)',
                customDarkGray: 'rgb(25, 25, 41)',
                customGrayTags: 'rgb(44, 44, 60)',
            },
        },
    },
    plugins: [],
};
