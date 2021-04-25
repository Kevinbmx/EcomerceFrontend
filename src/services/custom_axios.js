import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

const myApi = axios.create({
    // baseURL: 'http://webtrovare.test/',
    // baseURL: 'http://localhost:8090/',
    baseURL: process.env.VUE_APP_BU_BASE_URL,
    // baseURL: 'https://www.api.ninotienda.com/',//para produccion
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
});

// another api service example
// var amazonApi = axios.create({
//     baseURL: 'https://amazon-domain.com/api/',
//     timeout: 2000,
//     headers: {'X-Custom-Header': 'CustomHeader2'}
// });

//----------para utilizarlo en cualquier componente----------
Vue.prototype.$myApi = myApi
// ----------------------------------------------------------

//-------------para utilizar en el store o vuex--------------
Vuex.Store.prototype.$myApi = myApi
// ----------------------------------------------------------

export default myApi
    // amazonApi
