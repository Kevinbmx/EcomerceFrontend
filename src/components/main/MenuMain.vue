<template>
  <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          fixed
          >
    <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-icon medium>person</v-icon>{{ getUser.name}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item 
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="cerrarSesion">
          <v-list-item-icon>
             <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Cerrar Sesion</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
   </v-navigation-drawer>     
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        rightDrawer: true,
        items: [
          { title: 'Tus Pedidos', icon: 'list_alt',to:{name:'pedido'}},
          // { title: 'Tus Direcciones', icon: 'directions',to:{name:'pedido'}},
        ],
      }
    },
    computed: {
      ...mapGetters([
        'getUser',
      ])
    },
    methods:{
      cerrarSesion() {
        // this.$store.dispatch('destroyToken')
        // .then(() => {
          this.openMenuMain()
        // })
      },
      // openMenuMain() {
      //   console.log(this)
      //   // this.openMenuMain();
      // },
      openMenuMain() {
          console.log('entro al menu')
        if(!localStorage.getItem('access_token')){
          this.$router.push({name: 'login'})
        }else{
          this.$vuetify.goTo(0);
          this.rightDrawer = (!this.rightDrawer);
        }
      },
    }
  }
</script>
<style scoped>
  .v-list-item--link:before {
    background-color: initial;
  }
</style>