<template>
     <div>
       <v-row >
           <v-col cols="12" sm="12" md="12">
                <h3>Seleccione una fecha y hora de entrega</h3>
                <p>(puedes escoger la fecha de entrega de tu pedido no mayor a 5 dias)</p>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-date-picker
                    v-model="date"
                    :scrollable = true
                    first-day-of-week = 1
                    locale = 'es-bo'
                    :allowed-dates="allowedDates"
                    class="mt-3"
                    :min= minDate
                    :max= maxDate
                ></v-date-picker>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-time-picker v-model="picker" min="08:00" max="18:00" @click:minute="fechaEntrega" scrollable></v-time-picker>
            </v-col>
       </v-row>
        <div v-if="showMarkDate" class="theme--light error--text"> <span>marque fecha y hora de su entrega por favor</span></div>

        <v-row>
            <v-col cols="12" sm="12" md="12" class="align-rigth">
                <v-btn
                color="primary"
                @click="validate()"
                >
                Confirmar pedido
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import moment from 'moment'
export default {
  
    $_veeValidate: {
        validator: 'new'
    },
    data () {
        return {
                minDate: '',
                maxDate: '',
                date: '',
                picker: null,
                showMarkDate: false
                // disabledDates: { weekdays: [1, 7] },
        }
    },
    mounted() {
        // this.minDate = ;
        this.getdate()
    },

    methods: {
        getdate(){
            // var auxminDate = moment().format('YYYY-MM-DD')
            // auxminDate=  moment(auxminDate).days()
            this.date = moment().format('YYYY-MM-DD')
            this.maxDate = moment().add(1, 'week').format('YYYY-MM-DD')
            this.minDate = moment().add(1, 'days').format('YYYY-MM-DD')
            // console.log(auxminDate)
        },
        allowedDates: val => ![5,6].includes(new Date(val).getDay()),
        
        fechaEntrega(){
            var date = this.date+' '+this.picker
            this.$store.dispatch('fecha_entrega', date)
        },
        chageEstadoPedido(){
            this.$store.dispatch('change_estado_pedido', 'confirmado')
        },
        updateTotalPedido(){
             this.$store.dispatch('updateTotalPedido')
        },
        validate(){
            var dateMark = moment(this.date).days()
            var dateNow = moment().days()
            if (dateMark != dateNow && this.picker != null) {
                this.showMarkDate = false
                this.fechaEntrega()
                this.chageEstadoPedido()
                this.updateTotalPedido()
                this.$emit('next-step')
            }else{
                this.showMarkDate = true
            }
        },
    }
}

</script>
<style scoped>
    .align-rigth{
        text-align: right;
    }
    .v-stepper__content{
        padding: 0px !important;
    }
</style>
