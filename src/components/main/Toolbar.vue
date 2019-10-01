<template>
  <v-card dark class="primary"> 
    <v-layout row wrap  >
      <v-flex xs6 sm2 md2 order-xs1 order-sm1 order-md1>
        <!-- <v-card dark color="primary">
          <v-card-text class="px-0">Trovare</v-card-text>
        </v-card> -->
        <v-card-text class="text-md-center">
          <router-link class="estiloTitulo" :to="{ name: 'mainPage' }"><span> Trovare</span></router-link>
          <!-- Trovare -->
        </v-card-text>
      </v-flex>
      <v-flex xs12 sm8 md8 order-xs3 order-sm2 order-md2>
        <v-text-field
        class="mx-3 mt-2"
        flat
        dark
        label="Buscar"
        prepend-inner-icon="search"
        solo-inverted
        v-model="searchField"
        @keyup.enter="search"
        ></v-text-field>
      </v-flex>

      <v-flex xs6 sm2 md2 order-xs2 order-sm3 order-md3>
        <v-content class="text-xs-right text-md-center">
            <v-bottom-nav class="remove-shadow"
            absolute
              color="primary"
            >
              <v-btn flat color="white">
                <span>Mi Cuenta</span>
                <v-icon size="18">account_circle</v-icon>
                
              </v-btn>
              <router-link :to="{ name: 'carrito'}">
                <v-btn flat color="white" >
                  <span>carrito({{this.$store.getters.getCantidadCarrito}})</span>
                  <v-icon size="18">shopping_cart</v-icon>
                  
                </v-btn>
              </router-link>
          </v-bottom-nav>
            
        </v-content>
      </v-flex>
      <v-flex sm-12  order-xs4 order-sm4 order-md4>
        <v-tabs
          slot="extension"
          v-model="tabs"
          left
          grow
          color="transparent"
        >
        <v-tab :to="{name:'categories'}">
          <v-menu :full-width=true open-on-hover nudge-bottom=40 class="full-with" >
            <v-btn
              class="remove-shadow full-with"
              slot="activator"
              color="transparent"
              dark
            >
              Categorias
            </v-btn>
            <v-list>
              <v-list-tile
                v-for="(category, index) in categories"
                :key="index"
                :to="{name:'search',query: { id: category.id}}"
              >
                <v-list-tile-title>{{ category.name }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-tab>
        <v-tab>
          Ayuda
            <!-- <v-icon right dark>help_outline</v-icon> -->
        </v-tab>
        <v-tab>
          Direccion de invio
          <v-icon right dark>location_on</v-icon>
        </v-tab>
          <!-- <v-tab
            v-for="n in 3"
            :key="n"
          >
            Item {{ n }}
          </v-tab> -->
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import {categoryParentUrl} from '@/packages/config'
export default {
    data () {
      return {
        tabs: null,
        searchField:'',
        categories: [
        
      ],
      }
    },
    created(){
      if(this.$store.state.auth.token !==null){
        this.fillCategory()
        this.fillCarrito()
      }
    },
    methods:{
      fillCategory(){
          this.$myApi.get(categoryParentUrl)
          .then(response =>{
            this.categories = response.data
          })
        
      },
      search(){
        if(this.searchField == null || this.searchField == ""){
          this.$router.push({name:'mainPage'})
        }else{
        this.$router.push({ name: 'search', query: { q: this.searchField } })
        }
      },
      fillCarrito(){
        // var auth =this.$store.state.auth.token
        // console.log('carrito') 
        var pedido_id = localStorage.getItem('pedido_id')
        if(pedido_id == null || this.$store.state.carrito.pedido == null){
          this.$store.dispatch('selectPedidoByUserId')
          .then(response => {
            if(response !== null){
              console.log('entra',response.id)
              this.$store.dispatch('selectCarritoByPedidoId',response.id)
              .then(response =>{
                console.log('carrito ',response)
              })
            }
          })
        }
      }
    }
}
</script>

<style>
  .v-text-field__details{
    display: none;
  }
  .v-item-group.v-bottom-nav .v-btn{
    min-width: 62px;
  }
  .remove-shadow{
    -webkit-box-shadow:none !important;
    box-shadow:none !important;
  }
  .full-with{
    width: 100%;
  }
  .estiloTitulo{
    color:#fff;
    text-decoration:none;   
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
  }
</style>
