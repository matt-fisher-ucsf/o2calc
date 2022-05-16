import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    themes: {
      light: {
        primary: {
          base: '#052049',
          lighten5: '#f3f8fb'},
        secondary: '#0787c0',
        accent: '#ffb617',
        error: '#b71c1c',
      },
    },
    options: { customProperties: true },
  }
});
