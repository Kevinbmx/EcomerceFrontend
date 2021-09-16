<template>
  <div style="background: white">
    <v-row no-gutters v-if="allCategory.length > 0 || allProduct.length > 0">
      <v-col cols="12" class="pa-2 mt-4 mb-3 text-md-center">
        <span class="titleCategory">Compra por categoria</span>
      </v-col>
      <v-layout row wrap style="padding: 0 16px">
        <v-flex
          xs6
          sm4
          md3
          xl2
          pa-1
          class="lg5-custom"
          v-for="(category, index) in allCategory"
          :key="index"
        >
          <!-- <v-col cols="12" sm="3" md="3" class="pa-2" v-for="(category,index) in allCategory" :key="index"> -->
          <v-card class="eliminar-shadow">
            <router-link :to="{ name: 'search', query: { id: category.id } }">
              <!-- <v-container class="fondoNameCategory">
            <v-layout style="color: white; ">
              <v-flex xs12 align-end flexbox class="quitarPadding">
                <span class="headline">{{category.name}}</span>
              </v-flex>
            </v-layout>
             </v-container>
            <v-img
              class="white--text"
              :aspect-ratio="1.6"
              :src="category.path == null ? imagenNoDisponible : category.path"
            >
            </v-img> -->
              <v-img
                class="white--text"
                :aspect-ratio="1.5"
                :src="
                  category.path == null ? imagenNoDisponible : category.path
                "
                :lazy-src="
                  category.path == null ? imagenNoDisponible : category.path
                "
              >
                <v-container class="fondoNameCategory">
                  <v-layout>
                    <v-flex xs12 align-end flexbox class="quitarPadding">
                      <span class="headline">{{ category.name }}</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </router-link>
          </v-card>
          <!-- </v-col> -->
        </v-flex>
      </v-layout>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters v-if="allCategory.length > 0 || allProduct.length > 0">
      <v-col
        cols="12"
        sm="4"
        md="2"
        class="mt-4 px-2 pt-2"
        v-for="(product, index) in allProduct"
        :key="index"
      >
        <v-hover>
          <v-card class="mx-auto eliminar-shadow">
            <router-link
              :to="{ name: 'productDetail', params: { id: product.id } }"
            >
              <v-row no-gutters>
                <v-col cols="5" sm="12" md="12">
                  <v-img
                    v-if="product.file.length > 0"
                    :aspect-ratio="1.3"
                    :src="
                      product.file[0].path == null
                        ? imagenNoDisponible
                        : product.file[0].path
                    "
                    :lazy-src="
                      product.file[0].path == null
                        ? imagenNoDisponible
                        : product.file[0].path
                    "
                    contain
                  ></v-img>
                  <v-img
                    v-else
                    :aspect-ratio="1.3"
                    :src="imagenNoDisponible"
                    :lazy-src="imagenNoDisponible"
                    contain
                  ></v-img>
                </v-col>
                <v-col cols="7" sm="12" md="12" class="pl-2 pb-2">
                  <p>{{ product.name }}</p>
                  <!-- <span style="color: rgb(217, 0, 0)"
                    >{{ product.price }}Bs.</span
                  > -->
                  <span
                    style="color: rgb(217, 0, 0)"
                    class="colordelprecio"
                    v-if="
                      product.unidad_medida == 'unidad' &&
                      !product.enable_kg_per_price
                    "
                  >
                    {{ product.price | moneda }}
                    Bs
                  </span>
                  <span style="color: rgb(217, 0, 0)" class="colordelprecio" v-else>
                    {{ product.price | moneda }}
                    Bs /
                    {{ product.unidad_medida }}
                  </span>
                </v-col>
              </v-row>
            </router-link>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12" sm="12" md="12" style="text-align: center">
        <div>
          <v-btn
            class="ma-2"
            :to="{
              name: 'search',
              query: {
                id: this.idQuery,
                q: this.qQuery,
                page: paginador.prev_page_url,
              },
            }"
            outlined
            color="secondary"
            exact
            :disabled="!paginador.prev_page_url"
          >
            anterior
          </v-btn>
          <span
            >Pagina {{ paginador.current_page }} de
            {{ paginador.last_page }}</span
          >
          <v-btn
            class="ma-2"
            :to="{
              name: 'search',
              query: {
                id: this.idQuery,
                q: this.qQuery,
                page: paginador.next_page_url,
              },
            }"
            outlined
            color="secondary"
            exact
            :disabled="!paginador.next_page_url"
          >
            siguiente
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters v-if="showNotFound">
      <v-col class="margenError" align="center" cols="12">
        <span class="titleCategory">{{ message }}</span>
        <br />
        <v-btn text color="primary" :to="{ name: 'mainPage' }"
          >Ir al inicio
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters v-if="allCategory.length == 0 && allProduct.length == 0">
      <v-col class="margenError" align="center" cols="12">
        <v-progress-circular
          v-show="loading"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  childPerCategoryUrl,
  relatedProductbyCategoryUrl,
  relatedProductAndCategorybySearch,
  imagenNoDisponibleUrl,
} from "@/packages/config";
export default {
  data() {
    return {
      loading: true,
      message: "",
      allCategory: "",
      allProduct: "",
      idQuery: "",
      pageQuery: "",
      qQuery: "",
      haveQquerydata: false,
      imagenNoDisponible: imagenNoDisponibleUrl,
      paginador: {},
      showNotFound: false,
    };
  },
  metaInfo() {
    return {
      titleTemplate: `%s | ${
        this.$route.query.q == null ? "" : this.$route.query.q
      } ${this.$route.query.id == null ? "" : this.$route.query.id}`,
    };
  },
  watch: {
    $route() {
      this.clearData();
      this.initializeData();
      this.haveQquery(this.haveQquerydata, this.qQuery, this.idQuery);
    },
  },
  created() {
    this.clearData();
    this.initializeData();
    this.haveQquery(this.haveQquerydata, this.qQuery, this.idQuery);
  },
  methods: {
    haveQquery($haveQquerydata, $qQuery, $idQuery) {
      if ($haveQquerydata) {
        this.FieldFillBySearch($qQuery, this.pageQuery);
        // console.log('hay query')
      } else {
        // console.log('no hay query')
        this.fillallCategory($idQuery);
        this.relatedProductbyCategory($idQuery, this.pageQuery);
      }
    },
    FieldFillBySearch($q, $page) {
      var urlFormada = "";
      if ($page == null) {
        urlFormada = relatedProductAndCategorybySearch + "/" + $q;
      } else {
        urlFormada =
          relatedProductAndCategorybySearch + "/" + $q + "?page=" + $page;
      }
      this.$myApi.get(urlFormada).then((response) => {
        // console.log(response.data)
        this.allCategory = response.data.category;
        this.allProduct = response.data.product.data;
        this.paginando(response.data.product);
        if (this.allCategory.length <= 0 && this.allProduct.length <= 0) {
          this.showNotFound = true;
          this.message = "Lo sentimos, no se encontro ningun resultado";
          this.loading = false;
        }
      });
    },
    fillallCategory($id) {
      this.$myApi.get(childPerCategoryUrl + "/" + $id).then((response) => {
        // console.log(response.data)
        this.allCategory = response.data;
      });
    },
    relatedProductbyCategory($id, $page) {
      var urlFormada = "";
      if ($page == null) {
        urlFormada = relatedProductbyCategoryUrl + "/" + $id;
      } else {
        urlFormada = relatedProductbyCategoryUrl + "/" + $id + "?page=" + $page;
      }
      this.$myApi.get(urlFormada).then((response) => {
        this.allProduct = response.data.data;
        this.paginando(response.data);
        if (this.allCategory.length <= 0 && this.allProduct.length <= 0) {
          this.showNotFound = true;
          this.message = "Lo sentimos, no se encontro ningun resultado";
          this.loading = false;
        }
        // this.allProduct = response.data
        // console.log(response.data.data)
      });
    },
    initializeData() {
      this.idQuery = this.$route.query.id == null ? null : this.$route.query.id;
      this.pageQuery =
        this.$route.query.page == null ? null : this.$route.query.page;
      this.qQuery = this.$route.query.q == null ? null : this.$route.query.q;
      if (this.qQuery !== null) {
        this.haveQquerydata = true;
      } else {
        this.haveQquerydata = false;
      }
    },
    paginando(data) {
      let objPaginador = {
        current_page: data.current_page,
        last_page: data.last_page,
        //le sumo mas 1 para sustraer la posicion correcta de mi string
        next_page_url:
          data.next_page_url == null
            ? null
            : data.next_page_url.substring(
                data.next_page_url.indexOf("=") + 1,
                data.next_page_url.length
              ),
        prev_page_url:
          data.prev_page_url == null
            ? null
            : data.prev_page_url.substring(
                data.prev_page_url.indexOf("=") + 1,
                data.prev_page_url.length
              ),
      };
      this.paginador = objPaginador;
    },
    clearData() {
      this.loading = true;
      this.paginador = {};
      this.message = "";
      this.allCategory = "";
      this.allProduct = "";
      this.idQuery = "";
      this.pageQuery = "";
      this.qQuery = "";
      this.showNotFound = false;
    },
  },
};
</script>

<style scoped>
ul li::before {
  content: "\2022";
  color: #111;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
  line-height: 23px;
}
span {
  font-size: 14px !important;
  line-height: 16px !important;
  font-style: normal !important;
  /* font-weight: regular !important; */
  text-transform: capitalize;
  /* padding: 10px 15px;
  background: rgba(0,0,0,0.3) */
}
.quitarPadding {
  text-align: center;
  padding: 0px 0px !important;
}
.eliminar-shadow {
  height: 100%;
}
.titleCategory {
  font-size: 24px !important;
  line-height: 16px !important;
  font-style: normal !important;
  text-transform: capitalize;
  text-align: center !important;
  color: #293f56;
}
.margenError {
  margin-top: 15%;
}
.breadCrumbs {
  background-color: whitesmoke;
  padding: 5px 12px;
}
.text-md-center {
  text-align: center;
}
.fondoNameCategory {
  /* padding: 5px; */
  padding: 10px 12px 5px 12px;
  background: rgba(0, 0, 0, 0.3);
}
.v-application p {
  margin-bottom: 0px;
}
@media (min-width: 1264px) and (max-width: 1903px) {
  .flex.lg5-custom {
    width: 20%;
    max-width: 20%;
    flex-basis: 20%;
  }
}
</style>
