<template>
  <div style="background:white;">
    <!-- <v-breadcrumbs class="breadCrumbs" :items="items" divider=">"></v-breadcrumbs> -->
      <v-layout row wrap>
       
        <v-flex md12>
          <v-layout row wrap mb-4 class="text-md-center" v-show="childCategory.length > 0"> 
           <v-flex xs12 sm12 md12 lg12 mt-4 mb-3  > 
               <span class="titleCategory">Compra por Categoria</span>
              <!-- <h3 class="text-md-center">Compra por Categoria</h3> -->
           </v-flex>
            <v-flex xs6 sm3 md3 pa-2 v-for="(category,index) in childCategory" :key="index">
              <v-card class="eliminar-shadow">
                <router-link :to="{ name: 'perCategory',query: { id: category.id } }">
                  <v-layout class="fondoNameCategory">
                    <v-flex xs12 align-end flexbox class="quitarPadding">
                      <span class="headline">{{category.name}}</span>
                    </v-flex>
                  </v-layout>
                <v-img
                  class="white--text"
                  :aspect-ratio="1.6"
                  :src="category.path"
                >
                </v-img>
                </router-link>
                <!-- <v-card-title v-show="category.children.length > 0">
                  <div>
                    <ul>
                        <li v-for="(children,index) in category.children" :key="index">
                          <router-link :to="{ name: 'perCategory',params: { id: children.id } }">
                            {{children.name}}
                          </router-link>
                          </li>
                    </ul>
                  </div>
                </v-card-title> -->
              </v-card>
            </v-flex>
          </v-layout>
           <v-divider></v-divider>
            <v-layout row wrap mt-4>
              <v-flex xs12 sm4 md2 lg2 px-2 pt-2 v-for="(product,index) in allProductByCategories" :key="index">
                <!-- {{product}} -->
                <v-hover>
                  <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto eliminar-shadow"
                  >
                  <router-link :to="{ name: 'productDetail',params: { id: product.id} }" >
                <v-layout row wrap mpb-1>
                  <v-flex xs5 sm12 md12>
                  <v-img
                    :aspect-ratio="1.3"
                    :src="product.file[0].path"
                    :lazy-src="product.file[0].path"
                    contain
                  ></v-img>
                  </v-flex>
                  <v-flex xs7 sm12 md12 pl-2 pb-2 >
                  <p>{{product.name}}</p>
                  <span  style="color:rgb(217, 0, 0);">{{product.price}}Bs.</span>
                  </v-flex>
                  </v-layout>
                  </router-link>
                </v-card>
                </v-hover>
                      <v-divider ></v-divider>
              </v-flex>

          </v-layout>
        </v-flex>
      </v-layout>
     
    </div>
</template>

<script>
import axios from 'axios'
import {childPerCategoryUrl,relatedProductbyCategoryUrl} from '@/packages/config'
export default {
   data () {
      return {
         childCategory:'' ,
        //  allProductByCategories:[ { "id": 5, "name": "Vans Lock-On Grips-130mm", "modelo": "lock on", "quantity": 1, "brand": "odi & vans", "price": 280, "category_id": 46, "peso": "0.150", "alto": "18", "ancho": "13", "fondo": "5", "parent_id": 0, "uniqueCode": "d0b5f5c0-532c-11e9-a7d5-0774fc5985e7", "user_id": 1, "statusProduct_id": 1, "created_at": "2019-03-30", "updated_at": "2019-03-30 21:23:13", "description": "ESTILO: superficie con textura, delgada y con trabas con diseño de plantillas VANS\nAJUSTE DE BARRA: 7/8 \"\nLONGITUD: 5.1 \"/ 130mm\nDIÁMETRO EXTERIOR: 1.16 \"/ 30mm\nCERRADURAS: 4 cerraduras de aleación con tornillos, incluidas.\nFINES DE BARRAS: tapas de plástico ODI" }, { "id": 2, "name": "Pedales para bicicleta de m-424", "modelo": "m-424", "quantity": 4, "brand": "SHIMANO", "price": 525, "category_id": 49, "peso": "1.04", "alto": "24", "ancho": "12", "fondo": "12", "parent_id": 0, "uniqueCode": "ad533960-5323-11e9-a427-adbbe56ba391", "user_id": 1, "statusProduct_id": 1, "created_at": "2019-03-30", "updated_at": "2019-03-30 21:26:48", "description": "El Shimano pd-m424 es un clip de dos cara con pedales diseñado para fácil en y estabilidad extra. El resorte cargado posiciones de forma automática la plataforma de pedal en el ángulo perfecto para montaje sin tornillos en – -todo el rider tiene que hacer es poner un pie en el pedal y presione hacia abajo. La facilidad de operación hace de este pedal particularmente bien adaptados a City Riders que necesitan Clip en y en el aviso de un momento y a agresivo para bicicleta de montaña Riders abordar terreno técnico. La plataforma también ofrece una mayor estabilidad y se puede Ridden sin zapatos especiales para impromptu jaunts a la tienda de comestibles. Incluye un par de calas SPD two-bolt." }, { "id": 6, "name": "pedal ODYSSEY Triple-Trap", "modelo": "triple-trap", "quantity": 1, "brand": "odyssey", "price": 420, "category_id": 50, "peso": "0.5", "alto": "18", "ancho": "13", "fondo": "5", "parent_id": 0, "uniqueCode": "7bdd15f0-534a-11e9-b3df-abb64d67b9de", "user_id": 1, "statusProduct_id": 1, "created_at": "2019-03-31", "updated_at": "2019-03-31 00:18:18", "description": "El Pedal de triple trampa Odyssey tiene un cuerpo y una jaula de aleación livianos para enfrentar cualquier aventura con excelente tracción. El diseño de la jaula es extremadamente agresivo cuando se necesita una tracción seria. El huso de chromoly está diseñado para resistir el abuso pesado. Disponible en tamaño 1/2 y 9/16." } ]
        allProductByCategories:'',
        items: [
          {
            text: 'Dashboard',
            disabled: false,
            href: 'breadcrumbs_dashboard'
          },
          {
            text: 'Link 1',
            disabled: false,
            href: 'breadcrumbs_link_1'
          },
          {
            text: 'Link 2',
            disabled: true,
            href: 'breadcrumbs_link_2'
          }
        ],
      }
    },
    watch: { 
     '$route.query.id': function(search) {
       console.log(search);
         this.fillchildCategory(search)
         this.relatedProductbyCategory(search,this.$route.query.page)
      },
      '$route.query.page': function(page) {
       console.log(page);
         this.fillchildCategory(page)
         this.relatedProductbyCategory(this.$route.query.id,page)
      }
},
    created(){
      this.fillchildCategory(this.$route.query.id)
      if(Object.keys(this.$route.query).length !== 0){
        this.relatedProductbyCategory(this.$route.query.id,this.$route.query.page)
      }
      else{
          this.relatedProductbyCategory(this.$route.query.id,'')
      }
    },
     methods:{
      fillchildCategory($id){
        axios.get(childPerCategoryUrl+'/'+$id)
        .then(response => {
           console.log(response.data)
          this.childCategory = response.data
        })
      },
      relatedProductbyCategory($id,$page){
        var urlFormada = ''
         var vm = this
        if($page == null){
          urlFormada = relatedProductbyCategoryUrl+'/'+$id
        }
        else{
          urlFormada = relatedProductbyCategoryUrl+'/'+$id+'?page='+$page
        }
        axios.get(urlFormada)
        .then(response => {
           this.allProductByCategories = response.data.data
          // this.allProductByCategories = response.data
          console.log(response.data.data)
        })
      },

      
     }
}
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
span{
  font-size: 14px !important;
    line-height: 16px !important;
        font-style: normal!important;
    /* font-weight: regular !important; */
  text-transform: uppercase;
  /* padding: 10px 15px;
  background: rgba(0,0,0,0.3) */
}
.quitarPadding{
  text-align: center;
  padding: 0px 0px !important;
}
.eliminar-shadow{
  height: 100%;
}
.titleCategory{
  font-size: 19px !important;
    line-height: 16px !important;
    font-style: normal!important;
    text-transform: uppercase;
}
.breadCrumbs{
  background-color: whitesmoke;
  padding: 5px 12px;
}
.text-md-center{
  text-align: center;
}
</style>
