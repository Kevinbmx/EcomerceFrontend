import Vue from "vue";
import App from "./App.vue";
import VueRouter from 'vue-router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import routes from './routes'
import store from './store/store'
import VeeValidate from "vee-validate";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import * as firebase from "firebase/app";
import api from '@/services/custom_axios'
import "./filters/filters.js";
import * as VueGoogleMaps from 'vue2-google-maps'
import 'firebase/storage';
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

Vue.use(PerfectScrollbar)

Vue.use(VeeValidate);
Vue.use(VueSweetalert2);
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes
})
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GM_KEY,
    // libraries: 'places', 
    libraries: 'places,drawing'
  },
  installComponents: true
})

router.beforeEach((to, from, next) => {
  for (let matched = (to.matched || []), i = matched.length; i--;) {
    let route = matched[i];
    if (route.meta.beforeEach) {
      route.meta.beforeEach(to, from, next);
    }
  }

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

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FI_API_KEY,
  authDomain: process.env.VUE_APP_FI_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FI_DATABASE_URL,
  projectId: process.env.VUE_APP_FI_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FI_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FI_MESSAGING_SENDER_ID,
  // appId: process.env.VUE_APP_FI_APP_ID
})

new Vue({
  vuetify,
  delimiters: ['[[', ']]'],
  render: h => h(App),
  api,
  router,
  store,
}).$mount("#app");
