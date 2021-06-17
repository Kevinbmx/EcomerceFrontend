<template>
  <div>
    <div v-if="this.$store.state.carrito.carrito.length > 0">
      <v-row no-gutters>
        <v-col cols="2" md="8" sm="8"> productos </v-col>
        <v-col cols="5" md="2" sm="2" style="padding-left: 2%"> Precio </v-col>
        <v-col cols="5" md="2" sm="2" style="padding-left: 2%">
          Subtotal
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        no-gutters
        v-for="(cart, index) in this.getCarrito"
        :key="index"
        class="align-center pt-2 pb-2"
        style="border-bottom: 1px solid; border-color: rgba(0, 0, 0, 0.12)"
      >
        <v-col cols="12" md="12" sm="12" class="align-rigth">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                icon
                v-bind="attrs"
                v-on="on"
                @click="eliminarItem(cart)"
                color="pink"
              >
                <v-icon color="pink"> clear </v-icon>
              </v-btn>
            </template>
            <span>eliminar</span>
          </v-tooltip>
        </v-col>
        <v-col cols="12" md="2" sm="2">
          <router-link
            :to="{ name: 'productDetail', params: { id: cart.product.id } }"
          >
            <v-img
              :src="
                cart.product.file[0].path == null
                  ? imagenNoDisponible
                  : cart.product.file[0].path
              "
              :lazy-src="
                cart.product.file[0].path == null
                  ? imagenNoDisponible
                  : cart.product.file[0].path
              "
              aspect-ratio="2"
              contain
            >
            </v-img>
          </router-link>
        </v-col>
        <v-col cols="12" md="6" sm="6">
          <v-row>
            <v-col cols="12" md="12" class="d-flex justify-center">
              <router-link
                :to="{ name: 'productDetail', params: { id: cart.product_id } }"
              >
                <span class="texto-carrito justify-center">{{
                  cart.product.name
                }}</span>
                <br />
                <span class="texto-carrito price show-price-mobile"
                  >{{ cart.product.price | moneda }} Bs.</span
                >
              </router-link>
            </v-col>
          </v-row>
          <v-row
            class="d-flex justify-center"
            v-if="
              cart.product.unidad_medida == 'kg' &&
              cart.product.enable_kg_per_price == true
            "
          >
            <v-expansion-panels popout>
              <v-expansion-panel hide-actions>
                <v-expansion-panel-header>
                  <v-row align="center" class="spacer" no-gutters>
                    <v-col sm="12" md="12">
                      <span> Cantidad ({{ cart.quantity | weight }} kg.)</span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-divider></v-divider>
                  <convert-to-kg
                    :price="cart.product.price"
                    ref="convert-to-kg"
                    class="pl-9 pr-9"
                  ></convert-to-kg>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        :loading="cart.isChanging"
                        @click="
                          changeQuantityCarrito({
                            cart: cart,
                            action: 'actualizar',
                          })
                        "
                        color="secondary"
                      >
                        actualizar
                      </v-btn>
                    </template>
                    <span>actualizar</span>
                  </v-tooltip>
                  <!--<v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="
                          changeQuantityCarrito({
                            cart: cart,
                            action: 'aumentarKg',
                          })
                        "
                        color="primary"
                      >
                        <v-icon> add </v-icon>
                      </v-btn>
                    </template>
                    <span>aumentar</span>
                  </v-tooltip> -->
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
          <v-row v-else class="d-flex justify-center">
            <v-spacer></v-spacer>
            <v-col md="4" class="pa-0">
              <!-- aqui hago un casteo de la cantidad del carrito para que mi v-select
            acepte el valor en el v-model -->
              <div class="d-none">
                {{ (cantidad = parseFloat(cart.quantity)) }}
              </div>
              <!-- -------------------------------------------------------------- -->
              <v-select
                :items="fillComboBoxCantidad(parseFloat(cart.product.quantity))"
                label="Cantidad"
                no-data-text="no hay stock"
                v-model="cantidad"
                :loading="cart.isChanging"
                dense
                @change="
                  changeQuantityCarrito({
                    cart: cart,
                    action: 'change',
                    changeValue: cantidad,
                  })
                "
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <!-- <v-row v-else class="d-flex justify-center">
            <v-col cols="3" md="2" sm="2" class="pa-0">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="changeQuantityCarrito(cart, 'restar')"
                    color="red"
                  >
                    <v-icon> remove </v-icon>
                  </v-btn>
                </template>
                <span>disminuir</span>
              </v-tooltip>
            </v-col>
            <v-col cols="6" md="2" sm="1" class="pa-0">
              <p v-if="cart.unidad_medida == 'unidad'">
                {{ parseInt(cart.quantity) }}
              </p>
              <p v-else>{{ cart.quantity | weight }}</p>
            </v-col>
            <v-col cols="3" md="2" sm="2" class="pa-0">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="changeQuantityCarrito(cart, 'sumar')"
                    color="primary"
                  >
                    <v-icon> add </v-icon>
                  </v-btn>
                </template>
                <span>aumentar</span>
              </v-tooltip>
            </v-col>
          </v-row> -->
        </v-col>
        <v-col
          cols="6"
          md="2"
          sm="2"
          style="display: flex; color: #d90000 !important; padding-left: 2%"
        >
          <span class="texto-carrito price show-price-pc"
            >{{ cart.product.price | moneda }} Bs.</span
          >
          <!-- <p class="margin-price">&nbsp; Bs.</p> -->
        </v-col>
        <v-col
          cols="12"
          md="2"
          sm="2"
          style="display: flex; color: #d90000 !important; padding-left: 2%"
        >
          <span class="texto-carrito price"
            >{{
              (parseFloat(cart.product.price) * parseFloat(cart.quantity))
                | moneda
            }}
            Bs.</span
          >
          <!-- <h3 class="price margin-price">&nbsp; Bs.</h3> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="2" sm="2">
          <v-img src="img/transport.png" aspect-ratio="2" contain> </v-img>
        </v-col>
        <v-col cols="12" md="6" sm="6" style="text-align: center">
          <v-col cols="12" md="12">
            <span class="texto-carrito"
              >Envio dentro del 1er y 2do anillo de Montero</span
            >
            <span class="texto-carrito">
              (o si no contactanos para poder hacertelo llegar)</span
            >
          </v-col>
        </v-col>
        <v-col
          cols="12"
          md="4"
          sm="4"
          style="display: flex; color: #d90000 !important"
        >
          <span class="texto-carrito price"
            >{{ this.precioTransporte | moneda }} Bs.</span
          >
          <!-- <p class="margin-price">&nbsp; Bs.</p> -->
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" style="display: flex; justify-content: flex-end">
          <p>
            subtotal({{
              this.$store.getters.getCantidadCarrito + " productos"
            }}): &nbsp;
          </p>
          <span style="color: #d90000"
            >{{ this.$store.getters.getSubtotalCarrito | moneda }} Bs.</span
          >
        </v-col>
        <v-col cols="12" class="align-rigth">
          <v-btn color="primary" @click="validate()"> Siguiente </v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      Tu carrito est&aacute; vac&iacute;o
      <v-btn :to="{ name: 'categories' }" color="primary">
        Ir a categorias
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import convertToKg from "@/components/main/ConvertToKg";

export default {
  computed: {
    ...mapState({
      precioTransporte: (state) => state.carrito.precioTransporte,
    }),
    ...mapGetters({
      getCarrito: "getCarrito",
    }),
  },
  data() {
    return {
      carrito: "",
    };
  },
  components: {
    convertToKg,
  },
  methods: {
    eliminarItem(cart) {
      this.$store.dispatch("eliminarItem", cart);
    },
    changeQuantityCarrito({ cart, action, changeValue }) {
      let objcarrito = {
        pedido_id: cart.pedido_id,
        product_id: cart.product_id,
        quantity: parseFloat(cart.quantity),
        price: cart.product.price,
        unidad_medida: cart.unidad_medida,
      };
      this.$store.dispatch("isChanging", objcarrito.product_id);
      var quantityProduct = cart.product.quantity;
      if (action == "actualizar") {
        var varErrorTotalKilogramo =
          this.$refs["convert-to-kg"][0].errorTotalKilogramo;
        if (
          cart.product.unidad_medida == "kg" &&
          cart.product.enable_kg_per_price == true &&
          !varErrorTotalKilogramo
        ) {
          var totalkilogramochildren = parseFloat(
            this.$refs["convert-to-kg"][0].totalKilogramo
          );
          objcarrito.quantity = totalkilogramochildren;
          if (
            objcarrito.quantity > 0 &&
            objcarrito.quantity <= quantityProduct &&
            !varErrorTotalKilogramo
          ) {
            // console.log("entra");
            this.$store.dispatch("createAndUpdateCarrito", objcarrito);
          } else {
            // console.log("no entras");
            this.$store.dispatch("isChanging", objcarrito.product_id);
          }
        } else {
          // console.log("is changing");
          this.$store.dispatch("isChanging", objcarrito.product_id);
        }
      } else if (action == "change") {
        objcarrito.quantity = changeValue;
        if (objcarrito.quantity > 0 && objcarrito.quantity <= quantityProduct) {
          this.$store.dispatch("createAndUpdateCarrito", objcarrito);
        }
      }
    },
    validate() {
      this.$validator.validate().then((result) => {
        if (result) {
          if (this.$store.state.auth.token == null) {
            this.$router.push({ name: "login" });
          } else {
            window.fbq("track", "InitiateCheckout", {
              num_items: this.$store.getters.getCantidadCarrito,
            });
            this.$emit("next-step");
          }
        }
      });
    },
    fillComboBoxCantidad(cantidad) {
      var varCantidad = [];
      var cantidadDefaul = 30;
      if (cantidad > 0 && cantidad <= cantidadDefaul) {
        for (var x = 0; x < cantidad; x++) {
          varCantidad.push(x + 1);
        }
      } else {
        for (var x1 = 0; x1 < cantidadDefaul; x1++) {
          varCantidad.push(x1 + 1);
        }
      }
      return varCantidad;
    },
  },
};
</script>

<style  scoped>
.align-rigth {
  text-align: right;
}
.align-center {
  text-align: center;
}
.margin-price {
  margin-bottom: 0px;
  margin-top: 0px;
}
p {
  margin: 0px;
}
.texto-carrito {
  font-size: 15px;
}
.show-price-pc {
  display: initial;
}
.show-price-mobile {
  display: none;
}
.v-expansion-panel-header {
  padding: 0px;
  border-bottom: 1px solid;
  border-color: #949494;
}
.v-expansion-panel::before {
  position: initial;
}

@media only screen and (max-width: 600px) {
  .show-price-mobile {
    display: initial;
  }
  .show-price-pc {
    display: none;
  }
  .texto-carrito {
    margin: 0 auto;
  }
}
</style>