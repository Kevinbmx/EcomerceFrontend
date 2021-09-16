<template>
  <div style="background: white; color: #293f56">
    <v-row no-gutters class="mb-3" v-if="productDetail != ''">
      <v-col cols="12" md="6">
        <v-container>
          <v-row no-gutters class="mb-3 showTittleImage">
            <v-col cols="12">
              <span
                >Marca: <strong>{{ productDetail.brand }}</strong></span
              >
            </v-col>
            <v-col cols="12">
              <h2>{{ productDetail.name }}</h2>
            </v-col>
          </v-row>
        </v-container>
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
          <swiper-slide
            v-for="image in productDetail.file"
            :key="image.index"
            class="slide-img"
          >
            <v-img
              :src="
                image.length == 0 || image.path == null
                  ? imagenNoDisponible
                  : image.path
              "
              :lazy-src="
                image.length == 0 || image.path == null
                  ? imagenNoDisponible
                  : image.path
              "
              aspect-ratio="1.7"
              contain
            >
            </v-img>
          </swiper-slide>
          <div class="swiper-button-next" slot="button-next"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
        </swiper>
        <!-- swiper2 Thumbs -->
        <swiper
          :options="swiperOptionThumbs"
          class="gallery-thumbs"
          ref="swiperThumbs"
        >
          <swiper-slide
            v-for="image in productDetail.file"
            :key="image.index"
            class="slide-img"
          >
            <v-img
              :src="
                image.length == 0 || image.path == null
                  ? imagenNoDisponible
                  : image.path
              "
              :lazy-src="
                image.length == 0 || image.path == null
                  ? imagenNoDisponible
                  : image.path
              "
              aspect-ratio="2"
              contain
            >
            </v-img>
            <!-- <img :src="image.link" alt=""> -->
          </swiper-slide>
        </swiper>
      </v-col>
      <v-col cols="12" md="6" class="pa-4">
        <v-row no-gutters class="mb-3 showTittle">
          <v-col cols="12">
            <h2>{{ productDetail.name }}</h2>
          </v-col>
          <v-col cols="7">
            <span
              >Marca: <strong>{{ productDetail.brand }}</strong></span
            >
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row no-gutters class="mb-3">
          <v-col
            cols="12"
            md="12"
            class="mt-2"
            order="1"
            order-md="1"
            style="display: flex; color: #d90000"
          >
            <h2
              v-if="
                productDetail.unidad_medida == 'unidad' &&
                !productDetail.enable_kg_per_price
              "
              class="colordelprecio"
            >
              {{ productDetail.price | moneda }}Bs
            </h2>
            <h2
              class="colordelprecio"
              v-if="
                productDetail.unidad_medida == 'unidad' &&
                productDetail.enable_kg_per_price
              "
            >
              {{
                (parseFloat(productDetail.peso) *
                  parseFloat(productDetail.price))
                  | moneda
              }}
              Bs
            </h2>
            <h2
              v-if="
                productDetail.enable_kg_per_price &&
                productDetail.unidad_medida == 'kg'
              "
              class="colordelprecio"
            >
              {{ productDetail.price | moneda }} Bs / kg
            </h2>
          </v-col>
          <v-col
            v-if="this.productDetail.characteristic.length > 0"
            cols="12"
            md="12"
            order="4"
            order-md="2"
            class="mt-2"
          >
            <strong>Caracteristicas:</strong>
            <ul class="mt-2">
              <li
                v-for="(characteristic, index) in productDetail.characteristic"
                :key="index"
              >
                <span style="text-transform: none">
                  {{ characteristic.characteristic }}</span
                >
              </li>
            </ul>
          </v-col>
          <v-col
            v-if="productDetail.description != null"
            cols="12"
            md="12"
            order="5"
            order-md="3"
            class="mt-2"
          >
            <strong>Descripcion:</strong>
            <br />
            <span style="text-transform: none">{{
              productDetail.description
            }}</span>
          </v-col>
          <v-col cols="12" md="12" order="2" order-md="4" class="mt-3">
            <v-col
              v-if="productDetail.unidad_medida == 'unidad'"
              cols="4"
              md="3"
            >
              <v-select
                :items="cantidad"
                label="Cantidad"
                no-data-text="no hay stock"
                v-model="cantidadSelected"
                :error="errorComboBox"
              ></v-select>
            </v-col>
            <v-col
              v-if="
                productDetail.unidad_medida == 'kg' &&
                productDetail.enable_kg_per_price == true
              "
              cols="12"
              md="12"
            >
              <v-row>
                <v-col cols="12" md="12">
                  <strong>Elige cuanto va a llevar:</strong>
                </v-col>
                <!-- TODO: aqui va ir el componente de convertir a kg -->
                <convert-to-kg
                  :mdvarQuantityProducto="4"
                  :mdVarTipoMedida="3"
                  :price="productDetail.price"
                  ref="convert-to-kg"
                ></convert-to-kg>
              </v-row>
            </v-col>
          </v-col>

          <v-col cols="12" md="12" order="3" order-md="5" class="mt-2">
            <v-btn
              block
              color="secondary"
              @click="addCarrito"
              :loading="loading"
              dark
              >a&ntilde;adir al carrito
              <v-icon right dark>shopping_cart</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters v-if="productDetail != ''">
      <v-col cols="12" class="pa-3">
        <h3>Productos que te puedan interesar</h3>
      </v-col>
      <v-col
        cols="12"
        sm="4"
        md="2"
        class="px-2 pt-2"
        v-for="(product, index) in productRandom"
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
                    :aspect-ratio="1.3"
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
                </v-col>
                <v-col cols="7" sm="12" md="12" class="pl-2 pb-2">
                  <p>{{ product.name }}</p>
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
                  <span
                    style="color: rgb(217, 0, 0)"
                    class="colordelprecio"
                    v-else
                  >
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
    </v-row>
    <v-row no-gutters v-if="showNotFound">
      <v-col class="margenError" align="center" cols="12">
        <span class="titleCategory"
          >Lo sentimos, no se encontro ningun resultado.</span
        >
        <br />
        <v-btn text color="primary" :to="{ name: 'mainPage' }"
          >Ir al inicio
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="margenLoadingPage" v-if="productDetail == ''">
      <v-col align="center" cols="12">
        <v-progress-circular
          v-show="loadingPage"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import {
  ProductDetailUrl,
  relatedProductUrl,
  imagenNoDisponibleUrl,
} from "@/packages/config";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import convertToKg from "@/components/main/ConvertToKg";

export default {
  components: {
    swiper,
    swiperSlide,
    convertToKg,
  },
  data() {
    return {
      loading: false,
      loadingPage: false,
      cantidad: [],
      cantidadSelected: null,
      errorComboBox: true,
      productDetail: "",
      productRandom: "",
      swiperOptionTop: {
        initialSlide: 0,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperOptionThumbs: {
        initialSlide: 0,
        spaceBetween: 20,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
      imagenNoDisponible: imagenNoDisponibleUrl,
      cantidadEscrito: null,
      totalKilogramo: "",
      showNotFound: false,
    };
  },
  metaInfo() {
    return {
      titleTemplate: `%s | ${this.productDetail.name}`,
      meta: [
        {
          property: "og:title",
          content: `${this.productDetail.name}`,
        },
        { property: "og:type", content: "article" },
        {
          property: "og:description",
          content: `${this.productDetail.description}`,
        },
        {
          property: "og:url",
          content: `${
            process.env.VUE_APP_BU_BASE_URL_FRONTEND + this.$route.fullPath
          }`,
        },
        {
          property: "og:image",
          content: `${
            this.productDetail.file == null ||
            this.productDetail.file.length == 0
              ? this.imagenNoDisponible
              : this.productDetail.file[0].path
          }`,
        },
        { property: "product:brand", content: `${this.productDetail.brand}` },
        { property: "product:availability", content: "in stock" },
        { property: "product:condition", content: "new" },
        {
          property: "product:price:amount",
          content: `${this.productDetail.price}`,
        },
        { property: "product:price:currency", content: "BOB" },
        { property: "product:retailer_item_id", content: "1000920140437541" },
      ],
    };
  },
  created() {
    this.fillProductDetail(this.$route.params.id);
    // this.fillProductRandom();
    //  this.fetchData()
  },
  methods: {
    async fillProductDetail($id) {
      this.clearData();
      this.loadingPage = true;
      await this.$myApi.get(ProductDetailUrl + "/" + $id).then((response) => {
        window.scrollTo(0, 0);
        var product = response.data.product[0];
        if (product != null) {
          this.productDetail = product;
          window.fbq("track", "ViewContent", {
            content_name: this.productDetail.name,
            content_ids: this.productDetail.id,
            content_type: "product",
            value: this.productDetail.price,
            currency: "BOB",
          });
          this.loadingPage = false;
          this.fillComboBoxCantidad(product.quantity);
          this.fillProductRandom();
        } else {
          this.showNotFound = true;
          this.loadingPage = false;
        }
      });
    },
    fillProductRandom() {
      var minProductoRelacionado = 12;
      this.$myApi
        .get(
          relatedProductUrl +
            "/" +
            this.productDetail.category_id +
            "/" +
            minProductoRelacionado
        )
        .then((response) => {
          this.productRandom = response.data;
        });
    },

    fillComboBoxCantidad(cantidad) {
      this.cantidad = [];
      var cantidadDefaul = 30;
      if (cantidad >= 0 && cantidad <= cantidadDefaul) {
        // console.log(cantidad)
        for (var x = 0; x < cantidad; x++) {
          this.cantidad.push(x + 1);
        }
      } else {
        // console.log(cantidad)

        for (var x1 = 0; x1 < cantidadDefaul; x1++) {
          this.cantidad.push(x1 + 1);
        }
      }
    },
    async addCarrito() {
      this.loading = true;
      var message = "añade una cantidad.";
      if (
        this.productDetail.unidad_medida == "kg" &&
        this.productDetail.enable_kg_per_price == true
      ) {
        var errorTotalKilogramo = this.geterrorTotalKilogramoMethod();
        var totalKilogramo = this.getTotalKilogramo();
        var minimoProductoKg = this.getminimoProducto();
        if (errorTotalKilogramo) {
          message = "tiene que ser mayo a " + minimoProductoKg + "Kg.";
        }
      }
      if (
        localStorage.getItem("pedido_id") == null ||
        this.$store.state.carrito.pedido == null
      ) {
        await this.$store.dispatch("createPedido");
        // console.log('entro a crear pedido')
      }

      if (this.cantidadSelected != null || totalKilogramo > minimoProductoKg) {
        var cantidad = totalKilogramo || this.cantidadSelected;
        let object = {
          pedido: this.$store.state.carrito.pedido,
          cantidadSelected: cantidad,
          product: this.productDetail,
          unidad_medida:
            this.productDetail.unidad_medida == "unidad" ? "unidad" : "kg",
        };
        await this.$store.dispatch("addCarrito", object).then((response) => {
          // console.log(response)
          if (response) {
            this.$swal.fire({
              text: "Se agrego al carrito",
              icon: "success",
              showConfirmButton: false,
            });
            window.fbq("track", "AddToCart", {
              content_type: "product",
              content_name: this.productDetail.name,
              content_ids: [this.productDetail.id],
              currency: "BOB",
              value: this.productDetail.price,
            });
            this.loading = false;
          } else {
            this.loading = false;
            this.$swal.fire({
              text: "No se puedo agregar al carrito",
              icon: "error",
              showConfirmButton: false,
            });
          }
        });
      } else {
        this.loading = false;
        this.$swal.fire({
          text: "No se puedo agregar al carrito, " + message,
          icon: "error",
          showConfirmButton: false,
        });
      }
    },
    clearData() {
      (this.loading = false),
        (this.loadingPage = false),
        (this.cantidad = []),
        (this.cantidadSelected = null),
        (this.errorComboBox = true),
        (this.productDetail = ""),
        (this.productRandom = ""),
        (this.imagenNoDisponible = imagenNoDisponibleUrl),
        (this.cantidadEscrito = null),
        (this.showNotFound = false);
    },
    geterrorTotalKilogramoMethod() {
      return this.$refs["convert-to-kg"].errorTotalKilogramo;
    },
    getTotalKilogramo() {
      return this.$refs["convert-to-kg"].totalKilogramo;
    },
    getminimoProducto() {
      return this.$refs["convert-to-kg"].minimoProductoKg;
    },
  },
  watch: {
    productDetail: function (val) {
      if (val != "") {
        this.$nextTick(() => {
          const swiperTop = this.$refs.swiperTop.swiper;
          const swiperThumbs = this.$refs.swiperThumbs.swiper;
          swiperTop.controller.control = swiperThumbs;
          swiperThumbs.controller.control = swiperTop;
        });
      }
    },
    "$route.params.id": function (search) {
      // console.log(search);
      this.fillProductDetail(search);
    },
    cantidadSelected() {
      this.errorComboBox = false;
    },
  },
};
</script>

<style scoped>
.gallery-thumbs .swiper-slide {
  width: 100px;
  height: 100px;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
img {
  width: inherit;
  height: inherit;
}

.showTittleImage {
  display: none;
}
@media screen and (max-width: 425px) {
  .gallery-thumbs.gallery-thumbs .swiper-slide {
    width: 56px;
  }
}
@media screen and (max-width: 768px) {
  .showTittleImage {
    display: block;
  }
  .showTittle {
    display: none;
  }
}
p {
  margin-bottom: 0px;
  margin-top: 16px;
}

ul li::before {
  content: "\2022";
  color: #111;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
  line-height: 23px;
}
.slide-img {
  height: 100% !important;
}
a {
  text-decoration: none;
}
span {
  line-height: 23px;
}
.breadCrumbs {
  background-color: whitesmoke;
  padding: 5px 12px;
}
.colordelprecio {
  color: #d90000 !important;
}
.margenLoadingPage {
  margin-top: 15%;
}
.margenError {
  margin-top: 15%;
}
.titleCategory {
  font-size: 24px !important;
  line-height: 16px !important;
  font-style: normal !important;
  text-transform: capitalize;
  text-align: center !important;
  color: #293f56;
}
</style>
