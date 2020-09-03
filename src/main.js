import Vue from "vue";
import VueRouter from 'vue-router'
import "./plugins/vuetify"
import App from "./App.vue";
import routes from './routes'
import store from './store/store'
import VeeValidate from 'vee-validate'
import * as firebase from 'firebase'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import api from '@/services/custom_axios'
import "./filters/filters.js";
import * as VueGoogleMaps from 'vue2-google-maps'
// import firebase from 'firebase/app';
// import 'firebase/storage';

Vue.use(VeeValidate)
// Vue.use(moneda)
// import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueRouter)
const router = new VueRouter({
  mode:'history',
  routes
})
Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GM_KEY,
    // libraries: 'places', 
    libraries: 'places,drawing'
  },
  installComponents: true
})

router.beforeEach((to, from, next) => {
  let isDelegated = false;

  for (let matched = (to.matched || []), i = matched.length; i--;) {
      let route = matched[i];

      if (route.meta.beforeEach) {
          isDelegated = true;
          route.meta.beforeEach(to, from, next);
      }
  }

  // !isDelegated && next();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.visitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'mainPage',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

Vue.config.productionTip = false;

new Vue({
  delimiters: ['[[',']]'] ,
  render: h => h(App),
  api,
  router,
  store,
  created () {
    firebase.initializeApp({
      apiKey: process.env.VUE_APP_FI_API_KEY,
      authDomain: process.env.VUE_APP_FI_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_FI_DATABASE_URL,
      projectId: process.env.VUE_APP_FI_PROJECT_ID,
      storageBucket:process.env.VUE_APP_FI_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_FI_MESSAGING_SENDER_ID
    })
}
}).$mount("#app");
