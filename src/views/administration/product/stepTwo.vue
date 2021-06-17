<template>
  <div>
    <v-form>
      <v-layout
        wrap
        justify-space-between
      >
        <v-flex
              xs12
              md12
        >
          <v-textarea
            name="nameProduct" 
            label="descripcion del producto" 
            type="text" 
            data-vv-name="description"
            rows="8"
            v-model="description">
          </v-textarea>
        </v-flex>
      </v-layout>
      <v-layout
       v-for="(charact, index) in characteristics" :key="index"
        wrap
        justify-space-between
      >
        <v-flex xs9 sm11 md11 v-show="charact.state !== 'delete'">
          <v-text-field
            :label="'caracteristica '+ (index+1)" 
            type="text" 
            :data-vv-name="'characteristica '+(index+1)"
            v-model="charact.characteristicName">
          </v-text-field>
        </v-flex>
        <v-flex xs3 sm1 md1 v-show="charact.state !== 'delete'" >
            <v-btn title="eliminar caracteristica" @click="deleteCharacteristic(index)" text icon color="red">
              <v-icon>delete</v-icon>
            </v-btn>
        </v-flex>
      </v-layout>
      <v-layout  wrap
        justify-space-between>
        <v-flex xs12
              md12>
            <v-btn title="añadir nueva caracteristica" @click="addCharacteristic()" text icon color="primary">
              <v-icon>add_circle</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs12
              md12>
          <v-btn
            color="primary"
            @click="validate()"
            >
            Continue
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import { mapMultiRowFields } from "vuex-map-fields";
  export default {
    data () {
      return {
    
      }
    },
    computed:{
      ...mapMultiRowFields(["characteristics"]),
        description: {
        get () {
            return this.$store.state.product.productObj.description
        },
        set (value) {
            this.$store.commit('updateDescription', value)
        }
        },
    },
    methods:{
      validate(){
      this.$validator.validate().then(result => {
        if (result) {
          this.$emit('next-step')
        }
      });
    },
    addCharacteristic(){
       this.$validator.validate().then(result => {
        if (result) {
          this.$store.dispatch('addCharacteristic')
        }
      });
    },
    deleteCharacteristic(index){
      var state = this.$route.meta.mode
      let obj = {
        index : index,
        state :state
      }
      this.$store.dispatch('deleteCharacteristic',obj)
    }
    }
  }
</script>
<style>

</style>
