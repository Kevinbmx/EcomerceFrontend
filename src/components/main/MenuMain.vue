<template>
  <div>
    <v-list class="pa-1">
      <v-list-tile avatar>
        <v-icon medium>person</v-icon>
        <v-list-tile-content>
          <v-list-tile-title>{{getUser.name}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="item.to"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click="cerrarSesion">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title > Cerrar Sesion</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        items: [
          { title: 'Tus Pedidos', icon: 'list_alt',to:{name:'pedido'}},
          // { title: 'Tus Direcciones', icon: 'directions',to:{name:'mainPage'}},
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
        this.$store.dispatch('destroyToken')
        .then(response => {
          this.$router.push({ name: 'login' })
        })
      },
    }
  }
</script>
