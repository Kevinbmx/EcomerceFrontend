<template>
  <div style="background:white;" id="categories">
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 sm6 md3 v-for="(category,index) in childCategory" :key="index">
          <v-card>
            <router-link :to="{ name: 'search',query: { id: category.id } }">
            <v-img
              class="white--text"
              :aspect-ratio="1.6"
              :src="category.path == null ? imagenNoDisponible : category.path"
              :lazy-src="category.path == null ? imagenNoDisponible : category.path"
            >
            <v-container class="fondoNameCategory">
              <v-layout>
                <v-flex xs12 align-end flexbox class="quitarPadding">
                  <span class="headline">{{category.name}}</span>
                </v-flex>
              </v-layout>
            </v-container>
            </v-img>
            </router-link>
            <v-card-title v-show="category.children.length > 0">
              <div>
                <!-- <strong><span class="grey--text">deporte</span><br></strong> -->
              <ul>
                  <li v-for="(children,index) in category.children" :key="index">
                    <router-link style="text-transform: capitalize;" :to="{ name: 'search',query: { id: children.id } }">
                      {{children.name}}
                    </router-link>
                    </li>
                  <!-- <li>futbol</li>
                  <li>voleibol</li> -->
              </ul>
              </div>
            </v-card-title>

          </v-card>
        </v-flex>
      </v-layout>
        <v-row no-gutters >
          <v-col align="center" class="margenError" cols="12">
              <v-progress-circular
              v-show="loading"
                indeterminate
                color="primary"
              ></v-progress-circular>
          </v-col>
        </v-row>
    </v-container>  
    </div>
</template>

<script>
import {childCategoryUrl} from '@/packages/config'
export default {
  data () {
    return {
      loading : false,
      childCategory:'' 
    }
  },
  created(){
    this.fillchildCategory()
  },
  methods:{
    fillchildCategory(){
      this.loading = true
      this.$myApi.get(childCategoryUrl)
      .then(response => {
        this.childCategory = response.data
        this.loading = false
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
.fondoNameCategory{
  padding: 12px;
  background: rgba(0,0,0,0.3)
}

#categories{
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  line-height: 1.5;
}

.quitarPadding span{
  color: white !important;
}
.margenError{
  margin-top: 15%;
}
.headline{
  text-transform: capitalize;
}
</style>
