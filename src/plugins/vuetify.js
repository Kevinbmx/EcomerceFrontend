
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {
    themes: {
      light: {
        primary:'#293F56',
        secondary: colors.teal.lighten2,
        accent: colors.indigo.base 
      },
    },
  },
})

export default vuetify