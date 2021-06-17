<template>
  <div>
    <v-form>
      <v-layout wrap justify-space-between>
        <v-flex xs12 md6>
          <v-text-field
            v-validate="'required'"
            name="nameProduct"
            label="name Product"
            type="text"
            :error-messages="errors.collect('nameProduct')"
            data-vv-name="nameProduct"
            required
            v-model="nameProduct"
          >
          </v-text-field>

          <v-text-field
            v-validate="'required'"
            name="brandProduct"
            label="brand"
            type="text"
            :error-messages="errors.collect('brandProduct')"
            data-vv-name="brandProduct"
            required
            v-model="brandProduct"
          >
          </v-text-field>

          <v-text-field
            v-validate="'required'"
            name="modeloProduct"
            label="modelo"
            type="text"
            :error-messages="errors.collect('modeloProduct')"
            data-vv-name="modeloProduct"
            required
            v-model="modeloProduct"
          >
          </v-text-field>

          <v-text-field
            v-validate="'required'"
            name="quantityProduct"
            label="cantidad"
            :error-messages="errors.collect('quantityProduct')"
            data-vv-name="quantityProduct"
            required
            type="number"
            step="0.01"
            v-model="quantityProduct"
          >
          </v-text-field>

          <v-text-field
            v-validate="{
              required: true,
              regex: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
            }"
            name="priceProduct"
            label="price"
            type="number"
            step="0.01"
            :error-messages="errors.collect('priceProduct')"
            data-vv-name="priceProduct"
            required
            suffix="Bs"
            v-model="priceProduct"
          >
          </v-text-field>
          <v-text-field
            v-validate="{
              required: true,
              regex: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
            }"
            name="pesoProduct"
            label="peso"
            :error-messages="errors.collect('pesoProduct')"
            data-vv-name="pesoProduct"
            required
            suffix="kg"
            type="number"
            step="0.001"
            v-model="pesoProduct"
          >
          </v-text-field>
          <v-checkbox v-model="enableProduct" label="publicar producto.">
          </v-checkbox>
        </v-flex>
        <v-flex xs12 md6>
          <label class="form__label">Elija un estado</label>
          <treeselect
            v-model="statusProduct_id"
            v-validate="'required'"
            data-vv-name="statusProduct_id"
            :required="true"
            :multiple="false"
            :options="statusGetter"
            :normalizer="normalizerStatus"
          />
          <div
            v-if="errors.has('statusProduct_id')"
            class="theme--light error--text"
          >
            <span>{{ errors.first("statusProduct_id") }}</span>
          </div>

          <label class="form__label">Unidad de medida</label>
          <treeselect
            v-model="unidad_medidaProduct"
            v-validate="'required'"
            data-vv-name="unidad_medidaProduct"
            :multiple="false"
            :options="unidad_medidaGetter"
          />
          <div
            v-if="errors.has('unidad_medidaProduct')"
            class="theme--light error--text"
          >
            <span>{{ errors.first("unidad_medidaProduct") }}</span>
          </div>
          <label class="form__label">Elija una categoria</label>
          <treeselect
            v-model="category_idProduct"
            v-validate="'required'"
            data-vv-name="category_idProduct"
            :multiple="false"
            :options="categoriesGetter"
            :normalizer="normalizer"
          />
          <div
            v-if="errors.has('category_idProduct')"
            class="theme--light error--text"
          >
            <span>{{ errors.first("category_idProduct") }}</span>
          </div>

          <v-text-field
            v-validate="{
              required: true,
              regex: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
            }"
            name="altoProduct"
            label="alto"
            :error-messages="errors.collect('altoProduct')"
            data-vv-name="altoProduct"
            required
            suffix="cm"
            type="number"
            step="0.01"
            v-model="altoProduct"
          >
          </v-text-field>

          <v-text-field
            v-validate="{
              required: true,
              regex: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
            }"
            name="anchoProduct"
            label="ancho"
            :error-messages="errors.collect('anchoProduct')"
            data-vv-name="anchoProduct"
            required
            suffix="cm"
            type="number"
            step="0.01"
            v-model="anchoProduct"
          >
          </v-text-field>
          <v-text-field
            v-validate="{
              required: true,
              regex: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
            }"
            name="fondoProduct"
            label="fondo"
            :error-messages="errors.collect('fondoProduct')"
            data-vv-name="fondoProduct"
            required
            suffix="cm"
            type="number"
            step="0.01"
            v-model="fondoProduct"
          >
          </v-text-field>

          <v-checkbox
            v-model="enable_kg_per_priceProduct"
            label="habilitar conversion de Kg. a precio."
          >
          </v-checkbox>
        </v-flex>
      </v-layout>
      <v-btn color="primary" @click="validate()"> Continue </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Treeselect from "@riophae/vue-treeselect";

export default {
  $_veeValidate: {
    validator: "new",
  },
  data() {
    return {
      isEditing: false,
      model: "2",
      normalizer(node) {
        return {
          label: node.name,
        };
      },
      normalizerStatus(node) {
        return {
          label: node.statusName,
        };
      },
      // normalizerUnidadMedida(node){
      //   return{
      //     label:node.label
      //   }
      // }
    };
  },
  created() {
    this.fillCategory();
    this.fillStatus();
  },
  components: {
    Treeselect,
  },
  computed: {
    ...mapGetters(["categoriesGetter", "statusGetter", "unidad_medidaGetter"]),
    nameProduct: {
      get() {
        return this.$store.state.product.productObj.name;
      },
      set(value) {
        this.$store.commit("NameProduct", value);
      },
    },
    modeloProduct: {
      get() {
        return this.$store.state.product.productObj.modelo;
      },
      set(value) {
        this.$store.commit("modeloProduct", value);
      },
    },
    quantityProduct: {
      get() {
        return this.$store.state.product.productObj.quantity;
      },
      set(value) {
        this.$store.commit("quantityProduct", value);
      },
    },
    brandProduct: {
      get() {
        return this.$store.state.product.productObj.brand;
      },
      set(value) {
        this.$store.commit("brandProduct", value);
      },
    },
    priceProduct: {
      get() {
        return this.$store.state.product.productObj.price;
      },
      set(value) {
        this.$store.commit("priceProduct", value);
      },
    },
    category_idProduct: {
      get() {
        return this.$store.state.product.productObj.category_id;
      },
      set(value) {
        this.$store.commit("category_idProduct", value);
      },
    },
    pesoProduct: {
      get() {
        return this.$store.state.product.productObj.peso;
      },
      set(value) {
        this.$store.commit("pesoProduct", value);
      },
    },
    altoProduct: {
      get() {
        return this.$store.state.product.productObj.alto;
      },
      set(value) {
        this.$store.commit("altoProduct", value);
      },
    },
    anchoProduct: {
      get() {
        return this.$store.state.product.productObj.ancho;
      },
      set(value) {
        this.$store.commit("anchoProduct", value);
      },
    },
    fondoProduct: {
      get() {
        return this.$store.state.product.productObj.fondo;
      },
      set(value) {
        this.$store.commit("fondoProduct", value);
      },
    },
    statusProduct_id: {
      get() {
        return this.$store.state.product.productObj.statusProduct_id;
      },
      set(value) {
        this.$store.commit("statusProduct_idProduct", value);
      },
    },
    unidad_medidaProduct: {
      get() {
        return this.$store.state.product.productObj.unidad_medida;
      },
      set(value) {
        this.$store.commit("unidad_medidaProduct", value);
      },
    },
    enable_kg_per_priceProduct: {
      get() {
        return this.$store.state.product.productObj.enable_kg_per_price;
      },
      set(value) {
        this.$store.commit("enable_kg_per_priceProduct", value);
      },
    },
    enableProduct: {
      get() {
        return this.$store.state.product.productObj.enable;
      },
      set(value) {
        this.$store.commit("enableProduct", value);
      },
    },
  },
  methods: {
    fillCategory() {
      this.$store.dispatch("fillcategories");
    },
    fillStatus() {
      this.$store.dispatch("fillStatus");
    },
    validate() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.$emit("next-step");
        }
      });
    },
  },
};
</script>

<style>
</style>
