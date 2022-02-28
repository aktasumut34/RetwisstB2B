const Color = require('color');

module.exports = {
  content: [
    'app.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'components/**/*.vue',
    'utils/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        facebook: '#3b5998',
        twitter: '#1da1f2',
        instagram: '#e1306c',
        youtube: '#ff0000',
        linkedin: '#0077b5',
        github: '#24292e',
        retwisst: {
          purple: {
            lightest: Color('#a72886').lighten(0.1).rgb().string(),
            light: Color('#a72886').lighten(0.05).rgb().string(),
            normal: '#a72886',
            dark: Color('#a72886').darken(0.05).rgb().string(),
            darkest: Color('#a72886').darken(0.1).rgb().string()
          },
          green: {
            lightest: Color('#96cba0').lighten(0.1).rgb().string(),
            light: Color('#96cba0').lighten(0.05).rgb().string(),
            normal: '#96cba0',
            dark: Color('#96cba0').darken(0.05).rgb().string(),
            darkest: Color('#96cba0').darken(0.1).rgb().string()
          }
        }
      }
    }
  },
  plugins: []
};
