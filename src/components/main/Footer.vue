<template>
  <v-footer padless style="color: #293f56;">
    <v-col cols="12" md="12" class="text-center">
      <!-- <a href="https://api.whatsapp.com/send?phone=59175057204">Envíanos un mensaje de WhatsApp</a> -->
      <h2> Contactanos</h2>
      <v-btn href="https://www.facebook.com/Ni%C3%B1o-Tienda-111040967171644" color="primary" icon  fab small dark>
              <v-icon>facebook</v-icon>
      </v-btn>
         <v-btn href="https://api.whatsapp.com/send?phone=59175057204" color="primary" icon  fab small dark>
            <v-icon>mdi-whatsapp</v-icon>
      </v-btn>
      <!-- <v-btn href="https://www.instagram.com/ninotienda/" color="primary" icon  fab small dark>
        <v-icon>mdi-instagram</v-icon>
      </v-btn> -->
      <v-btn href="mailto:ninotienda.com@gmail.com" color="primary" icon  fab small dark>
              <v-icon>mail_outline</v-icon>
      </v-btn>
      <v-btn href="https://goo.gl/maps/eFPJf3jcPjgRVZhd8" color="primary" icon  fab small dark>
              <v-icon>directions</v-icon>
      </v-btn>
    </v-col>
    <v-col
      class="text-center"
      cols="12"
      style="background-color: #293F56;"
    >
    <span style="color:#ffff">
      {{ new Date().getFullYear() }} — <strong>ni&ntilde;o tienda</strong></span>
    </v-col>
  </v-footer>
</template>
<style scoped>
.theme--light.v-foote{
  /* background-color:#DBDBDB;
  background-color:#a0a0a0; */
  background-color:#686868;
}
.v-application ul{
  padding-left: 13px;
}
ul li{
  line-height: 30px;
}
</style>