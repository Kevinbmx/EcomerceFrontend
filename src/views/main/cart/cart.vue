<template>
    <div id="pageIndexCategory">
        <v-container grid-list-xl >
            <v-stepper v-model="stepper">
                <v-stepper-header>
                    <div class="step" v-for="(step, index) in steps" :key=index>
                    <v-stepper-step
                        :edit-icon="'check'"
                        :complete-icon="'edit'"
                        :step="index + 1"
                        :complete="(index + 1 ) <= stepper"
                        :editable="(index + 1) < stepper">{{ step.label }}</v-stepper-step>
                    <v-divider></v-divider>
                </div>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content  step="1" style="pading: 0px;">
                        <step-one-cart @next-step="nextStep(2)"></step-one-cart>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <step-two-cart @next-step="nextStep(3)"></step-two-cart>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <step-three-cart @next-step="finish()" ></step-three-cart>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-container>
    </div>
</template>

<script>
import stepOneCart from '@/views/main/cart/stepOneCart'
import stepTwoCart from '@/views/main/cart/stepTwoCart'
import stepThreeCart from '@/views/main/cart/stepThreeCart'
export default {
    data () {
        return {
            stepper: 1,
            steps: [
                {
                    label: 'Carrito',
                    completed: false,
                },
                {
                    label: 'Direccion',
                    completed: false,
                },
                {
                    label: 'Fecha entrega',
                    completed: false,
                },
            ],
            }
    },
    components:{
        stepOneCart,
        stepTwoCart,
        stepThreeCart
    },
    methods:{
        nextStep(step){
            this.stepper = step
            // console.log('next')
        },
        updateProductAndPedido(){
            this.$swal.fire({
                text: 'se esta confirmando tu pedido, espere un momento...',
                icon: 'success',
                showConfirmButton: false,
            })
            this.$store.dispatch('updateProductAccordingPedido')
            .then(response2 =>{
                // console.log(response2)
                if(response2 != false){
                    this.$store.dispatch('updatePedido',localStorage.pedido_id)
                    .then(response3=>{
                        if (response3 == true){
                            // para elegir tipo de entrega
                            // in_store
                            // curbside
                            // home_delivery
                            window.fbq('track', 'Purchase', {event_source_url:location.href,delivery_category:'home_delivery',content_type: 'product',currency: "BOB", value: this.$store.getters.getSubtotalCarrito,order_id:this.$store.state.carrito.pedido.id});
                            localStorage.removeItem('pedido_id')
                            this.$router.push({ name: 'pedido' })
                            location.reload()
                        }
                    })
                }
            })
        },
        finish(){
            // ,event_source_url:location.href,order_id:this.$store.state.carrito.carrito.id
// console.log(location)
            if(this.$store.state.carrito.pedido.direction_id == null){
                this.$store.dispatch('insertDirection')
                .then(response =>{
                    if(response != null){
                        this.$store.dispatch('selectDirection',response.id)
                        .then(response1 =>{
                            if(response1){
                                this.updateProductAndPedido()
                            }
                        })
                    }
                })
            }else{
                this.updateProductAndPedido()
            }
            // console.log('se realizo tu pedido con exito')
        },
    }
}
</script>

<style scoped>
</style>
