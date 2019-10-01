const moneda = {}

function formatPrice(value) {
    let val = (value/1).toFixed(2).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

moneda.install = function (Vue){
    Vue.filter('moneda', (val) => {
        return formatPrice(val)
    })
}

export default moneda