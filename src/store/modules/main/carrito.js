// import Vue from 'vue'
import { pedidoUrl, carritoUrl, pedidoByUserIdUrl, pedidoByIdUrl, directionUrl, updateProductAccordingPedidoUrl } from '../../../packages/config'

const state = {
    pedido: null,
    carrito: [],
    new_direction: {
        name: '',
        direction: '',
        latitud: '',
        longitud: '',
        phone_number: ''
    },
    directions: [],
    hasDirection: false,
    precioTransporte: 10
}

const getters = {
    searchCarritoById: state => product_id => {
        return state.carrito.filter(cart => cart.product_id === product_id)
    },
    getCantidadCarrito(state) {
        var productoNocontable = 0
        var productocontable = 0
        var cantitad_total = 0
        for (let x = 0; x < state.carrito.length; x++) {
            if (state.carrito[x].unidad_medida != 'unidad') {
                productoNocontable++
            } else {
                productocontable = parseInt(productocontable) + parseInt(state.carrito[x].quantity)
            }
        }
        cantitad_total = parseInt(productocontable) + parseInt(productoNocontable)
        return cantitad_total
    },
    getSubtotalCarrito(state) {
        var subtotal = 0
        for (let x = 0; x < state.carrito.length; x++) {
            subtotal = subtotal + (state.carrito[x].price * state.carrito[x].quantity)
        }
        return subtotal + state.precioTransporte
    },
    getCarrito(state) {
        return state.carrito
    }
}

const mutations = {
    selectPedidoByUserId(state, response) {
        if (response !== null) {
            state.pedido = response
            localStorage.setItem('pedido_id', response.id)
        }
    },
    selectCarritoByPedidoId(state, response) {
        // state.carrito = []
        for (let index = 0; index < response.length; index++) {
            response[index].isChanging = false
        }
        state.carrito = response
    },
    createAndUpdateCarrito(state, response) {
        for (let index = 0; index < response.length; index++) {
            response[index].isChanging = false
        }
        state.carrito = response
    },
    createPedido(state, response) {
        state.pedido = response
        localStorage.setItem('pedido_id', response.id)
    },

    getDirectionsByUserId(state, response) {
        state.directions = response
        if (state.directions.length > 0) {
            state.hasDirection = true
        }
    },
    setHasDirection(state) {
        state.hasDirection = !state.hasDirection
    },
    name(state, changeDirection) {
        state.new_direction.name = changeDirection
    },
    direction(state, changeDirection) {
        state.new_direction.direction = changeDirection
    },
    phone_number(state, changeDirection) {
        state.new_direction.phone_number = changeDirection
    },
    latitud_latitud(state, objPosition) {
        state.new_direction.latitud = objPosition.latitud
        state.new_direction.longitud = objPosition.longitud
    },
    selectDirection(state, direction_id) {
        state.pedido.direction_id = direction_id
    },
    insertDirection(state, objDirection) {
        state.new_direction = objDirection
    },
    updateProductAccordingPedido(state, objProduct) {
        state.carrito.product = objProduct
    },
    updatePedido(state, objPedido) {
        state.pedido = objPedido
        // localStorage.removeItem('pedido_id')
    },
    fecha_entrega(state, date) {
        state.pedido.fecha_entrega = date
    },
    updateTotalPedido(state, total) {
        state.pedido.total = total
    },
    change_estado_pedido(state, estado) {
        state.pedido.estado = estado
    },
    change_user_id_pedido(state, estado) {
        state.pedido.user_id = estado
    },
    pedidoAndCarritoVaciar(state) {
        state.pedido = null
        state.carrito = []
    },
    isChanging(state, productId) {
        const index = state.carrito.findIndex(item => item.product_id == productId)
        state.carrito[index].isChanging = !state.carrito[index].isChanging
    }
}

const actions = {
    selectPedidoByUserId(context) {
        return new Promise((resolve, reject) => {
            this.$myApi.get(pedidoByUserIdUrl)
                .then(response => {
                    resolve(response.data.pedido)
                    context.commit('selectPedidoByUserId', response.data.pedido)
                })
                .catch(error => {
                    // console.log(error)
                    reject(error)
                })
        })
    },
    selectPedidoById(context, id) {
        return new Promise((resolve, reject) => {
            this.$myApi.get(pedidoByIdUrl + '/' + id)
                .then(response => {
                    // console.log('by id', response)
                    context.commit('updatePedido', response.data.pedido)
                    resolve(response.data.pedido)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    selectCarritoByPedidoId(context, pedido_id) {
        return new Promise((resolve, reject) => {
            this.$myApi.get(carritoUrl + '/' + pedido_id)
                .then(response => {
                    // console.log('carrito1',response.data.carrito)
                    resolve(response.data.carrito)
                    context.commit('selectCarritoByPedidoId', response.data.carrito)
                }).catch(error => {
                    reject(error)
                })
        })
    },
    pedidoAndCarritoVaciar(context) {
        context.commit('pedidoAndCarritoVaciar')
    },
    addCarrito({ dispatch, getters }, obj) {
        return new Promise((resolve) => {
            var cartObtained = getters.searchCarritoById(obj.product.id)
            let objCart = {
                product_id: obj.product.id,
                pedido_id: obj.pedido.id,
                quantity: parseFloat(obj.cantidadSelected),
                price: obj.product.price,
                unidad_medida: obj.unidad_medida
            }
            if (cartObtained.length > 0) {
                var canidadCartObtanin = parseFloat(cartObtained[0].quantity)
                var sumQuantity = canidadCartObtanin + objCart.quantity
                if (sumQuantity <= parseFloat(obj.product.quantity) && sumQuantity > canidadCartObtanin) {
                    objCart.quantity = sumQuantity
                    dispatch('createAndUpdateCarrito', objCart)
                        .then(response => {
                            resolve(response)
                        })
                } else {
                    resolve(false)
                }
            } else {
                dispatch('createAndUpdateCarrito', objCart)
                    .then(response => {
                        resolve(response)
                    })
            }
        })
    },
    async createPedido(context) {
        try {
            let response = await this.$myApi.post(pedidoUrl)
            // console.log('se esta añadiendo un pedido',response)
            context.commit('createPedido', response.data.pedido)
        } catch (ex) {
            // console.log(ex)
        }
        // this.$myApi.post(pedidoUrl)
        // .then(response=>{
        //     // console.log('pedido',response.data.pedido)
        //     context.commit('createPedido',response.data.pedido)
        // })
    },
    createAndUpdateCarrito(context, obj) {
        return new Promise((resolve, reject) => {
            this.$myApi.post(carritoUrl, {
                product_id: obj.product_id,
                pedido_id: obj.pedido_id,
                quantity: obj.quantity,
                price: obj.price,
                unidad_medida: obj.unidad_medida
            })
                .then(response => {
                    context.commit('createAndUpdateCarrito', response.data.carrito)
                    // console.log(response.data)
                    resolve(response.data.create)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    deletePedidoAndCarritoByPedidoId(context, pedidoId) {
        return new Promise((resolve, reject) => {
            this.$myApi.delete(pedidoUrl + '/' + pedidoId)
                .then(response => {
                    resolve(response.data.delete)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    eliminarItem({ dispatch }, obj) {
        return new Promise((resolve, reject) => {
            this.$myApi.post(carritoUrl + '/' + obj.product_id + '/' + obj.pedido_id)
                .then(response => {
                    if (response.data.deleted) {
                        dispatch('selectCarritoByPedidoId', obj.pedido_id)
                    }
                    resolve(response.data.deleted)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getDirectionsByUserId(context) {
        this.$myApi.get(directionUrl)
            .then(response => {
                if (response.data.direction != null) {
                    context.commit('getDirectionsByUserId', response.data.direction)
                }
            })
    },
    selectDirection(context, direction_id) {
        return new Promise((resolve) => {
            context.commit('selectDirection', direction_id)
            resolve(true)
        })
    },
    insertDirection({ state, commit }) {
        return new Promise((resolve, reject) => {
            this.$myApi.post(directionUrl, state.new_direction)
                .then(response => {
                    if (response.data.direction != null) {
                        commit('insertDirection', response.data.direction)
                        resolve(response.data.direction)
                    }
                }).catch(error => {
                    reject(error)
                })
        })
    },
    updatePedido({ state, commit }, pedido_id) {
        return new Promise((resolve, reject) => {
            this.$myApi.post(pedidoUrl + '/' + pedido_id, state.pedido)
                .then(response => {
                    if (response.data.pedido != null) {
                        commit('updatePedido', response.data.pedido)
                        resolve(true)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    updateProductAccordingPedido({ state }) {
        return new Promise((resolve, reject) => {
            this.$myApi.post(updateProductAccordingPedidoUrl, state.carrito)
                .then(response => {
                    resolve(response.data.update)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    fecha_entrega(context, date) {
        context.commit('fecha_entrega', date)
    },
    updateTotalPedido({ getters, commit }) {
        commit('updateTotalPedido', getters.getSubtotalCarrito)
    },
    change_estado_pedido(context, estado) {
        context.commit('change_estado_pedido', estado)
    },
    change_user_id_pedido(context, estado) {
        context.commit('change_user_id_pedido', estado)
    },
    isChanging(context, productId) {
        context.commit('isChanging', productId)
    }
}


export default {
    state, getters, mutations, actions
}
