module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
        'banner': "url('/src/assets/images/banner.jpg')"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        manufacture: {
          primary: "#0FCFEC",
          secondary: "#19D3AE",
          accent: "#3A4256",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
}
