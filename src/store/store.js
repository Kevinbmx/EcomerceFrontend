import Vue from "vue";
import Vuex from "vuex";


// import userStore from './modules/userStore'
import auth from './modules/auth'
import category from './modules/admin/category'
import product from './modules/admin/product'
import carrito from './modules/main/carrito'
// import pedido from './modules/main/pedido'

Vue.use(Vuex) 
// Vue.config.productionTip = false;
const debug =  process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules:{
    // userStore,
    category,
    auth,
    product,
    carrito,
    // pedido
  },
  strict:debug
  // strict:false
})
