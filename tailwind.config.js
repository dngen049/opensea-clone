module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,255,255,1)), url('https://lh3.googleusercontent.com/H-LDthYRKPWJdIKEI3WrZFFpxetO77jl1ALd3t4BJQ3Qj661B3WfopzTJ1iNtjD4JqjsLLqblkfWNtaHEzRUsCcbLsUZEiVGkNGE=s0')",
      }
    },
  },
  plugins: [],
}
