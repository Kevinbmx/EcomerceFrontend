<template>
    <v-app-bar
      color="primary"
      dark
    >
    <v-toolbar-title class="ml-0 pl-3">
      <v-app-bar-nav-icon @click.stop="handleDrawerToggle"></v-app-bar-nav-icon>
    </v-toolbar-title>
    <v-spacer></v-spacer>
      
    <v-btn icon @click="handleFullScreen()">
      <v-icon>fullscreen</v-icon>
    </v-btn>
      <v-toolbar-title class="ml-0 pl-3">{{getUser.name}}</v-toolbar-title>
 </v-app-bar>

</template>
<script>
import { mapGetters } from 'vuex'
import Util from '@/util';
export default {
  name: 'app-toolbar',
  data: () => ({
  
  }),
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    },
        ...mapGetters([
        'getUser',
      ])
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    }
  }
};
</script>
