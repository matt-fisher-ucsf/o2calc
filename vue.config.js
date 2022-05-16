module.exports = {
  "transpileDependencies": [
    "vuetify",
    "vuex-persist"
  ],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },

  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "Oxygen Calculator";
        return args;
      })
  },
}
