<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="12">
        <v-carousel height="400" cycle hide-delimiters show-arrows-on-hover>
          <!-- <v-carousel-item
          :src="'//cdn.shopify.com/s/files/1/0177/6500/7432/files/bike-to-school-2019.08.15_1800x533.jpg?v=1565890178'"
          >
          </v-carousel-item> -->
          <v-carousel-item :src="'https://picsum.photos/2983/1542/?image=146'">
          </v-carousel-item>
          <v-carousel-item :src="'https://picsum.photos/2983/1542/?image=281'">
          </v-carousel-item>
          <v-carousel-item :src="'https://picsum.photos/2983/1542/?image=841'">
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="pa-2">
        <h3>Busca por categorias</h3>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        cols="6"
        sm="6"
        md="3"
        class="pa-2"
        v-for="(category, index) in categoryRandom"
        :key="index"
      >
        <v-card class="eliminar-shadow">
          <router-link :to="{ name: 'search', query: { id: category.id } }">
            <v-img class="white--text" :aspect-ratio="1.6" :src="category.path">
              <!-- <v-container > -->
              <v-layout class="fondoNameCategory">
                <v-flex xs12 align-end flexbox class="quitarPadding">
                  <span class="headline">{{ category.name }}</span>
                </v-flex>
              </v-layout>
              <!-- </v-container> -->
            </v-img>
          </router-link>

          <!-- <router-link :to="{ name: 'search',query: { id: category.id } }">
              <v-img
                :aspect-ratio="1.7"
                :src="category.path"
                :lazy-src="category.path"
              ></v-img>
              <h4>{{category.name}}</h4>
            </router-link> -->
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="pa-2">
        <h3>Algunos de nuestros productos</h3>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        cols="6"
        sm="4"
        md="2"
        class="pa-2"
        v-for="(product, index) in productRandom"
        :key="index"
      >
        <v-card class="mx-auto eliminar-shadow">
          <!-- {{product}} -->
          <router-link
            :to="{ name: 'productDetail', params: { id: product.id } }"
          >
            <v-img
              :aspect-ratio="1.1"
              :src="
                product.file.length == 0 || product.file[0].path == null
                  ? imagenNoDisponible
                  : product.file[0].path
              "
              :lazy-src="
                product.file.length == 0 || product.file[0].path == null
                  ? imagenNoDisponible
                  : product.file[0].path
              "
              contain
            ></v-img>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {
  categoryRandomUrl,
  productRandomUrl,
  imagenNoDisponibleUrl,
} from "@/packages/config";
export default {
  data: () => ({
    categoryRandom: "",
    productRandom: "",
    imagenNoDisponible: imagenNoDisponibleUrl,
  }),
  created() {
    this.fillCategoryRandom();
    this.fillProductRandom();
  },
  mounted() {
    //   this.mySiema = new Siema({
    //      perPage: {
    //        300:2,
    //        750:3,
    //   800: 4,
    //   1240: 5
    // }
    //   })
  },
  methods: {
    fillCategoryRandom() {
      this.$myApi.get(categoryRandomUrl).then((response) => {
        this.categoryRandom = response.data;
      });
    },
    fillProductRandom() {
      this.$myApi.get(productRandomUrl + "/" + 12).then((response) => {
        this.productRandom = response.data;
      });
    },
  },
};
</script>

<style>
.eliminar-shadow {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
a {
  text-decoration: none;
}
.fondoNameCategory {
  padding: 5px;
  background: rgba(0, 0, 0, 0.3);
}
</style>
