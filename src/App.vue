<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app 
        class="app mx-auto overflow-hidden"
        height="400"
      >
            <v-main>
            <app-toolbar ></app-toolbar>
            <app-drawer ></app-drawer>
              <!-- Page Header -->
              <page-header v-if="$route.meta.breadcrumb"></page-header>
              <div class="page-wrapper">
                <router-view></router-view>
              </div>   
              <!-- App Footer -->
              <footers></footers>
            <!-- Go to top -->
            <app-fab></app-fab>
            <!-- theme setting -->
            </v-main>
        
      </v-app>
    </template>
    <template v-else>
      <v-app class="app" >
        <toolbar></toolbar>
        <router-view :key="$route.fullpath" style="height:100%"></router-view>
        <main-footer></main-footer>
      </v-app>
    </template>
    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark text @click.native="snackbar.show = false" icon> 
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>    
  </div>
</template>
<script>
import AppDrawer from '@/components/admin_client/layout/AppDrawer';
import AppToolbar from '@/components/admin_client/layout/AppToolbar';
import AppFab from '@/components/admin_client/layout/AppFab';
import PageHeader from '@/components/admin_client/layout/PageHeader';
import Footers from '@/components/admin_client/layout/Footers';
import MainFooter from '@/components/main/Footer';

// import AppEvents from  '@/event';
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import './index'
import toolbar from '@/components/main/Toolbar';

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    Footers,
    toolbar,
    MainFooter
  },
  data: () => ({
    expanded: true,
    // rightDrawer: false,
    snackbar: {
      show: false,
      text: '',
      color: '',
    }
  }),
   metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'niño tienda',
    // all titles will be injected into this template
    titleTemplate: '%s | Tienda online donde encontraras de todo'
  },
  created () {
    this.retrieveAcceso()
    window.getApp = this;
  },
  methods: {
    retrieveAcceso(){
      //console.log('esta viendo los accesos')
      this.$store.dispatch('retrieveAcceso')
    }
  },
};
</script>
<style scoped>
 .setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}
.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}
</style>
