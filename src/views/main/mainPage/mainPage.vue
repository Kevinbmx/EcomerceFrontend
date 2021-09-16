<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="12">
        <!-- <v-carousel height="auto" cycle hide-delimiters show-arrows-on-hover> -->
        <!-- <v-carousel-item :src="'https://picsum.photos/1440/500/?image=146'">
          </v-carousel-item> -->

        <!-- <v-carousel-item :src="'img/banner2.png'"> </v-carousel-item> -->
        <!-- <v-carousel-item>
            <v-img :src="'img/banner.jpg'" max-height="350"></v-img>
          </v-carousel-item> -->
        <!-- <v-carousel-item :src="'https://picsum.photos/2983/1542/?image=281'">
          </v-carousel-item>
          <v-carousel-item :src="'https://picsum.photos/2983/1542/?image=841'" :to="{ name: 'productDetail', params: { id: 1 } }">
          </v-carousel-item> -->
        <!-- </v-carousel> -->
        <v-carousel height="auto" v-if="this.sizeScreen > 450" cycle hide-delimiters show-arrows-on-hover>
          <v-carousel-item
            v-for="(carrusel, index) in carruseles"
            :key="index"
            :src="carrusel.pathFile"
            :href="carrusel.url"
          >
          </v-carousel-item>
        </v-carousel> 
        <v-carousel height="auto" v-else cycle hide-delimiters show-arrows-on-hover>
          <v-carousel-item
            v-for="(carrusel, index) in carruseles"
            :key="index"
            :src="carrusel.pathFileMobile"
            :href="carrusel.url"
          >
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
  carruselesHabilitadolUrl,
} from "@/packages/config";
export default {
  data: () => ({
    categoryRandom: "",
    productRandom: "",
    carruseles: [],
    imagenNoDisponible: imagenNoDisponibleUrl,
    sizeScreen: window.innerWidth,
  }),
  watch: {
    sizeScreen: function () {
    //   // this.sizeScreen = window.innerWidth;
    //   console.log(this.sizeScreen);
    },
  },
  created() {
    // window.addEventListener("resize", this.myEventHandler);
    this.fillCarrusel();
    this.fillCategoryRandom();
    this.fillProductRandom();
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    // console.log(this.sizeScreen);
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
    onResize() {
      this.sizeScreen = window.innerWidth;
    },
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
    fillCarrusel() {
      this.$myApi.get(carruselesHabilitadolUrl).then((response) => {
        this.carruseles = response.data.carrusel;
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
