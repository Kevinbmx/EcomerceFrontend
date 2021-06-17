<template>
  <v-row>
    <v-col cols="6" :md="mdvarQuantityProducto">
      <v-text-field
        min="0"
        v-validate="'required'"
        name="quantityProduct"
        single-line
        label="cantidad ej: 1 ; 0.5"
        type="number"
        step="0.01"
        v-model="varCantidadEscrito"
      >
      </v-text-field>
    </v-col>

    <v-col cols="6" :md="mdVarTipoMedida">
      <v-select
        :items="varTipoMedida"
        label="tipo de medida"
        no-data-text="no hay stock"
        v-model="tipoMedidaSelected"
      ></v-select>
    </v-col>
    <v-col cols="12" md="12">
      peso en kg: {{ this.totalKilogramo | weight }} Subtotal:
      {{ subtotalProduct | moneda }}
      <div v-if="this.errorTotalKilogramo" class="theme--light error--text">
        <span>El producto debe ser mayor a {{ minimoProductoKg }} kg.</span>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    price: { type: Number },
    mdvarQuantityProducto: { type: Number },
    mdVarTipoMedida: { type: Number },
    // geterrorTotalKilogramo: { type: Function },
    // getTotalKilogramo: { type: Function },
    // getminimoProducto: { type: Function },
  },
  data() {
    return {
      varTipoMedida: ["kg", "gr", "lb", "@", "Bs"],
      varCantidadEscrito: null,
      tipoMedidaSelected: "kg",
      subtotalProduct: "",
      totalKilogramo: "",
      errorTotalKilogramo: false,
      minimoProductoKg: 0.1,
    };
  },
  mounted() {
    // this.$emit("geterrorTotalKilogramo", this.errorTotalKilogramo);
    // this.$emit("getTotalKilogramo", this.totalKilogramo);
    // this.$emit("getminimoProducto", this.minimoProducto);
  },
  watch: {
    tipoMedidaSelected: function (val) {
      this.errorTotalKilogramo = false;
      if (val == "kg") {
        this.totalKilogramo = this.varCantidadEscrito;
      }
      if (val == "gr") {
        this.totalKilogramo = this.convertGrToKg(this.varCantidadEscrito);
      }
      if (val == "lb") {
        this.totalKilogramo = this.convertLbToKg(this.varCantidadEscrito);
      }
      if (val == "@") {
        this.totalKilogramo = this.convertArrobaToKg(this.varCantidadEscrito);
      }
      if (val == "Bs") {
        this.totalKilogramo = this.convertPriceTokg(this.varCantidadEscrito);
      }
      if (this.minimoProductoKg > this.totalKilogramo) {
        this.errorTotalKilogramo = true;
      }
      this.subtotalProduct = this.convertKgToPrice(this.totalKilogramo);
    },
    varCantidadEscrito: function (val) {
      this.errorTotalKilogramo = false;
      if (this.tipoMedidaSelected == "kg") {
        this.totalKilogramo = val;
      }
      if (this.tipoMedidaSelected == "gr") {
        this.totalKilogramo = this.convertGrToKg(val);
      }
      if (this.tipoMedidaSelected == "lb") {
        this.totalKilogramo = this.convertLbToKg(val);
      }
      if (this.tipoMedidaSelected == "@") {
        this.totalKilogramo = this.convertArrobaToKg(val);
      }
      if (this.tipoMedidaSelected == "Bs") {
        this.totalKilogramo = this.convertPriceTokg(this.varCantidadEscrito);
      }
      if (this.minimoProductoKg > this.totalKilogramo) {
        this.errorTotalKilogramo = true;
      }
      this.subtotalProduct = this.convertKgToPrice(this.totalKilogramo);
    },
  },
  methods: {
    convertGrToKg(pesoALlevar) {
      return pesoALlevar * 0.001;
    },
    convertLbToKg(pesoALlevar) {
      return pesoALlevar * 0.453592;
    },
    convertArrobaToKg(pesoALlevar) {
      return pesoALlevar * 11.339;
    },
    convertKgToPrice(pesoALlevar) {
      return pesoALlevar * this.price;
    },
    convertPriceTokg(precioALlevar) {
      return precioALlevar / this.price;
    },
  },
};
</script>
