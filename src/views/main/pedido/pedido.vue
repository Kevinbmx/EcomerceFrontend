<template>
  <v-container grid-list-xl>
    <v-row no-gutters v-if="!loadingPage">
      <v-col>
        <h2>Tus pedidos</h2>
      </v-col>
    </v-row>
    <v-row no-gutters v-if="this.pedido.length > 0">
      <v-col
        cols="12"
        v-for="(order, index) in this.pedido"
        :key="index"
        style="
          border: 1px solid rgba(0, 0, 0, 0.12);
          margin-bottom: 24px;
          padding: 0px;
        "
      >
        <v-row style="background-color: rgba(0, 0, 0, 0.12); margin: 0px">
          <v-col cols="7" sm="2" md="2" class="display-flex">
            <div>
              <strong> FECHA PEDIDO:</strong>
            </div>
            <div>
              <p>{{ order.updated_at | date }}</p>
            </div>
          </v-col>
          <v-col cols="5" sm="2" md="2" class="display-flex">
            <div>
              <strong>TOTAL:</strong>
            </div>
            <div>
              <h4 class="price">{{ order.total | moneda }} Bs.</h4>
            </div>
            <!-- <p>{{order.total}}</p> -->
          </v-col>
          <v-col cols="12" sm="3" md="4" class="display-flex">
            <div>
              <strong>ENVIAR:</strong>
            </div>
            <div>
              <p>{{ order.direction.direction }}</p>
            </div>
          </v-col>
          <v-col cols="5" sm="2" md="2" class="display-flex">
            <div>
              <strong>ESTADO:</strong>
            </div>
            <div>
              <p>{{ order.estado }}</p>
            </div>
          </v-col>
          <v-col cols="7" sm="3" md="2" class="display-flex">
            <div>
              <strong>PEDIDO N°: {{ order.id }}</strong>
            </div>
            <div>
              <v-btn
                class="pa-0"
                v-if="order.estado == 'confirmado'"
                text
                rounded
                color="red"
                dark
                @click="openDialog(order.id, index)"
              >
                Cancelar Pedido
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row
          v-for="(cart, index) in order.carrito"
          :key="index"
          class="ma-1"
          style="border-bottom: 1px solid; border-color: rgba(0, 0, 0, 0.12)"
        >
          <v-col cols="12" sm="2" md="2">
            <router-link
              :to="{ name: 'productDetail', params: { id: cart.product.id } }"
            >
              <!-- <v-avatar > -->
              <v-badge  v-if="cart.unidad_medida == 'unidad'" bordered color="green" :content="parseFloat(cart.quantity)">
                <v-img
                  :src="cart.product.file[0].path"
                  aspect-ratio="2"
                  contain
                >
                </v-img>
              </v-badge>
                 <v-badge v-else bordered color="green" :content="(cart.quantity) | weight">
                <v-img
                  :src="cart.product.file[0].path"
                  aspect-ratio="2"
                  contain
                >
                </v-img>
              </v-badge>
              <!-- </v-avatar> -->
            </router-link>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <router-link
              :to="{ name: 'productDetail', params: { id: cart.product_id } }"
            >
              <span class="texto-carrito justify-center">{{
                cart.product.name
              }}</span>
            </router-link>
          </v-col>
          <v-col cols="6" sm="2" md="2" style="display: flex; color: #d90000">
            <span class="price">{{ cart.product.price | moneda }} Bs.</span>
          </v-col>
          <v-col cols="6" sm="2" md="2" style="display: flex; color: #d90000">
            <span class="price">
              {{
                (parseFloat(cart.product.price) * parseFloat(cart.quantity))
                  | moneda
              }}
              Bs.
            </span>
          </v-col>
        </v-row>
        <v-row class="ma-1">
          <v-col cols="12" sm="2" md="2">
            <v-img src="img/transport.png" aspect-ratio="2" contain> </v-img>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <span class="texto-carrito text-justify">
              Envio dentro del 1er y 2do anillo de Montero
            </span>
          </v-col>
          <v-col cols="6" sm="2" md="2" style="display: flex; color: #d90000">
            <span class="price">{{ precioTransporte | moneda }} Bs.</span>
          </v-col>
        
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <div>
          <v-btn
            class="ma-2"
            :to="{ name: 'pedido', query: { page: paginador.prev_page_url } }"
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
            :to="{ name: 'pedido', query: { page: paginador.next_page_url } }"
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

    <v-row no-gutters v-else>
      <v-col v-if="!loadingPage"> No tienes ningun pedido echo. </v-col>
      <v-col align="center" class="margenError" cols="12">
        <v-progress-circular
          v-if="loadingPage"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Anular Pedido</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-textarea
              v-validate="'required'"
              name="motivoAnulacion"
              :error-messages="errors.collect('motivoAnulacion')"
              v-model="motivoAnulacion"
              label="Motivo de anulacion de Pedido"
              maxlength="130"
              counter
              required
            >
            </v-textarea>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog()"
            >cerrar</v-btn
          >
          <v-btn
            color="red"
            :disabled="loadingButton"
            text
            @click="motivoAnularPedido()"
            :loading="loadingButton"
            >confirmar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import { mapState } from "vuex";
import {
  tusPedidoConfirmadoUrl,
  MotivoAnularPedidoUrl,
} from "../../../packages/config";
export default {
  data() {
    return {
      loadingButton: false,
      loadingPage: true,
      paginador: {},
      pedido: {},
      pageQuery: "",
      dialog: false,
      pedidoId: null,
      motivoAnulacion: "",
      maxLengthTextArea: 130,
      indexDelPedidoAEliminar: "",
    };
  },
  computed: {
    ...mapState({
      precioTransporte: (state) => state.carrito.precioTransporte,
    }),
  },
  watch: {
    $route() {
      this.clearData();
      this.initializeData();
      this.getTusPedidos();
    },
  },
  created() {
    this.clearData();
    this.initializeData();
    this.getTusPedidos();
  },
  methods: {
    getTusPedidos() {
      var urlFormada = "";
      if (this.pageQuery == null) {
        urlFormada = tusPedidoConfirmadoUrl;
      } else {
        urlFormada = tusPedidoConfirmadoUrl + "?page=" + this.pageQuery;
      }
      this.$myApi.get(urlFormada).then((response) => {
        this.paginando(response.data.pedido);
        this.pedido = response.data.pedido.data;
        this.loadingPage = false;
      });
    },
    initializeData() {
      this.pageQuery =
        this.$route.query.page == null ? null : this.$route.query.page;
    },
    motivoAnularPedido() {
      // console.log(this.pedido[this.indexDelPedidoAEliminar].carrito)
      this.loadingButton = true;
      this.$validator.validate().then((result) => {
        if (result) {
          let objPedido = {
            motivo_anulacion: this.motivoAnulacion,
            // fecha_anulacion: moment().format('YYYY-MM-DD HH:MM'),
            pedido_id: this.pedidoId,
            carrito: this.pedido[this.indexDelPedidoAEliminar].carrito,
          };
          this.$myApi
            .post(MotivoAnularPedidoUrl, objPedido)
            .then((response) => {
              // console.log(response)
              if (response.data.pedido == 1) {
                this.getTusPedidos();
                this.closeDialog();
              }
            });
        }
      });
    },

    openDialog(pedId, index) {
      this.pedidoId = pedId;
      this.dialog = true;
      this.indexDelPedidoAEliminar = index;
    },
    closeDialog() {
      this.pedidoId = null;
      this.dialog = false;
      this.motivoAnulacion = "";
      this.loadingButton = false;
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
      (this.loadingPage = true),
        (this.paginador = {}),
        (this.pedido = {}),
        (this.pageQuery = ""),
        (this.dialog = false),
        (this.pedidoId = null),
        (this.motivoAnulacion = ""),
        (this.maxLengthTextArea = 130),
        (this.indexDelPedidoAEliminar = "");
    },
  },
};
</script>
<style scoped>
span {
  color: #293f56;
  /* font-weight: bold; */
}
p {
  color: #293f56;
}
.v-badge {
  display: initial;
}
.display-flex {
  display: box;
}
.v-application p {
  margin-bottom: 0px;
}
.margenError {
  margin-top: 15%;
}
.texto-carrito {
  font-size: 15px;
}
</style>