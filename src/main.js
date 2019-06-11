import Vue from "vue";
import VueRouter from 'vue-router'
import "./plugins/vuetify"
import App from "./App.vue";
import routes from './routes'
import store from './store/store'
import VeeValidate from 'vee-validate'
import * as firebase from 'firebase'
import VueAwesomeSwiper from 'vue-awesome-swiper'


Vue.use(VeeValidate)
// import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueRouter)
const router = new VueRouter({
  mode:'history',
  routes
})
Vue.use(VueAwesomeSwiper, /* { default global options } */)

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
        name: 'mainpage',
      })
    } else {
      next()
    }
  } else {
    next()
  }
},

)




Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDpFix5gQVbbgdkgI5FLBIrZ0mMjEMDud8',
      authDomain: 'trovare-f9aac.firebaseapp.com',
      databaseURL: 'https://trovare-f9aac.firebaseio.com',
      projectId: 'trovare-f9aac',
      storageBucket:'gs://trovare-f9aac.appspot.com/',
      messagingSenderId: '170619233712'
    })
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.$store.dispatch('autoSignIn', user)
    //   }
    // })
    // this.$store.dispatch('loadMeetups')
},
  render: h => h(App)
}).$mount("#app");
