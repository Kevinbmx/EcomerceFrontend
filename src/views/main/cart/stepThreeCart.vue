<template>
    <div>
        <!-- {{dir}} -->
            <v-layout wrap justify-space-between>
                <v-flex xs12 md12 sm12>
                    <h3>Seleccione una fecha y hora de entrega</h3>
                    <p>(entrega minima 2 dias)</p>
                </v-flex>
                <v-flex>
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
                </v-flex>
        </v-layout>
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
                maxDate: '2019-12-31',
                date: '2019-10-04',
                // disabledDates: { weekdays: [1, 7] },
        }
    },
    mounted() {
        // this.minDate = ;
        this.getdate()
    },
    computed: {
       
    },
    methods: {
        getdate(){
            var auxminDate = moment().format('YYYY-MM-DD')
            auxminDate=  moment(auxminDate).days()
            // this.date = moment().format('YYYY-MM-DD')
            this.minDate = moment("2019-10-04").add(2, 'days').format('YYYY-MM-DD')
            // var auxminDate = moment("2019-10-04").add(1, 'days').days()
            console.log(auxminDate)
        },
        allowedDates: val => ![5,6].includes(new Date(val).getDay())
    }
}

</script>
<style scoped>
  
</style>
