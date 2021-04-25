<template>
    <div id="pageIndexModule">
        <v-container grid-list-xl fluid>
            <v-col cols="12" style="border: 1px solid rgba(0,0,0,0.12); margin-bottom: 24px; padding:0px">
                 <v-row style="background-color: rgba(0,0,0,0.12); margin:0px">
                     <v-col cols="7" sm="2" md="2" class="display-flex" >
                        <div>
                          <span> FECHA PEDIDO:</span>
                        </div>
                        <div>
                            <p> {{order.updated_at|date}}</p>
                       </div>
                    </v-col>
                    <v-col cols="5" sm="2" md="2" class="display-flex" >
                        <div>
                            <span>TOTAL:</span>
                        </div>
                        <div>
                            <h4 class="price">{{order.total | moneda }} Bs.</h4>
                        </div>
                        <!-- <p>{{order.total}}</p> -->
                    </v-col>
                    <v-col cols="12" sm="3" md="4" class="display-flex" >
                        <div>
                            <span>ENVIAR:</span>
                        </div>
                        <div>
                            <p v-if="order.direction">{{order.direction.direction}}</p>
                        </div>
                    </v-col>
                    <v-col cols="5" sm="2" md="2" class="display-flex" >
                        <div>
                            <span>ESTADO:</span>
                        </div>
                        <div>
                            <p>{{order.estado}} </p>
                        </div>
                    </v-col>
                    <v-col cols="7" sm="3" md="2" class="display-flex" >
                        <div>
                            <span>PEDIDO N°: {{order.id}}</span> 
                        </div>
                        <div>
                            <v-btn
                            class="pa-0"
                            v-if="order.estado=='confirmado'"
                            
                            text 
                            rounded
                            color="red"
                            dark
                            @click="openDialog(order.id,index)"
                            >
                            Cancelar Pedido
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
                <v-row v-for="(cart,index) in order.carrito" :key="index" class="ma-1" >
                    <v-col cols="12" sm="2" md="2">
                                <!-- <v-avatar > -->
                        <v-badge bordered  color="green" :content="cart.quantity">
                                <v-img
                                 :src="cart.product.file[0].path == null ? imagenNoDisponible : cart.product.file[0].path"
                                :lazy-src="cart.product.file[0].path == null ? imagenNoDisponible : cart.product.file[0].path"
                                aspect-ratio="2"
                                contain
                                >
                                </v-img>
                        </v-badge>
                                <!-- </v-avatar> -->
                        </v-col>
                    <!-- {{cart.product.file[0].path}} -->
                    <v-col cols="12" sm="7" md="7" >
                            <h4 class="text-justify">{{cart.product.name}}</h4>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" style="display:flex; color: #D90000; " >
                        <h4 class="price">{{cart.product.price | moneda }} Bs.</h4>
                    </v-col>
                </v-row>
            </v-col>
            <v-fab-transition>
                        <v-btn  dark
                                :to="{ name: 'createProduct' }"
                                right
                                fixed
                                bottom
                                title="nuevo producto"
                                fab slot="activator" color="primary">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                    </v-fab-transition>
        </v-container>
    </div>
</template>
<script>
import {pedidoByIdAdminUrl,imagenNoDisponibleUrl} from '@/packages/config'
export default {
     data () {
        return {
            order : {},
            imagenNoDisponible : imagenNoDisponibleUrl
        }
     },
     created(){
        this.getPedidoById(this.$route.params.idPedido)
    },
    methods:{
        getPedidoById(id){
            this.$myApi.get(pedidoByIdAdminUrl + '/' + id)
            .then(response => {
                this.order = response.data.pedido;
            });
        },
        openDialog(){

        }
    }
}
</script>
<style scoped>
    .v-badge {
        display: initial;
    }
    .v-application p{
        margin-bottom: 0px;
    }
</style>