import Vue from "vue";
import moment from 'moment'

//---------------------funciones-----------------------
function weight(value){
    let val = (value/1).toFixed(3).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ".")
}
function formatPrice(value) {
    let val = (value/1).toFixed(2).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
function formatName(value) {
    let val = value.split(' ')[0];
    return val
}
function date(date) {
    return moment(date).format('DD-MMM-YYYY h:mm:ss a');
}

//-------------filtros--------------------------
Vue.filter('moneda', (val) => {
    return formatPrice(val)
})
Vue.filter('weight', (val) => {
    return weight(val)
})
Vue.filter('name', (val) => {
    return formatName(val)
})
Vue.filter('date', (val) => {
    return date(val)
})
