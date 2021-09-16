<template>
  <div id="pageIndexCategory">
    <v-container grid-list-xl fluid>
      <v-app id="inspire">
        <v-card>
          <v-card-title>
            Banner
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="carruseles"
              :search="search"
              :items-per-page-options="[
                10,
                25,
                { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 },
              ]"
            >
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td class="text-xs-left">{{ item.descripcion }}</td>
                    <td class="text-xs-right">{{ item.url }}</td>
                    <td class="justify-center">
                      <!-- {{ item.pathFile }} -->
                      <v-img
                        :src="item.pathFile"
                        :aspect-ratio="16 / 9"
                        contain
                      >
                      </v-img>
                    </td>
                    <td class="justify-center">
                      <!-- {{ item.pathFile }} -->
                      <v-img
                        :src="item.pathFileMobile"
                        :aspect-ratio="16 / 9"
                        contain
                      >
                      </v-img>
                    </td>
                    <td class="justify-center px-0">
                      <v-switch
                        class="mt-0"
                        :v-model="item.enable"
                        :input-value="item.enable"
                        @change="changeEnableCarrusel(item.id, item.enable)"
                      ></v-switch>
                    </td>
                    <td class="justify-center px-0">
                      <v-btn
                        text
                        icon
                        title="editar"
                        v-if="hasPermission(actualizarCarruselVar)"
                        color="primary"
                        :to="{ name: 'editCarrusel', params: { id: item.id } }"
                      >
                        <v-icon small> edit </v-icon>
                      </v-btn>
                      <v-btn
                        text
                        icon
                        title="eliminar"
                        v-if="hasPermission(eliminarCarruselVar)"
                        color="red"
                        @click="openDialog(item)"
                      >
                        <v-icon small> delete </v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="warning"
              >
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card-text>
          <v-card-text style="position: relative">
            <v-fab-transition>
              <v-btn
                dark
                v-if="hasPermission(crearCarruselVar)"
                :to="{ name: 'createCarrusel' }"
                right
                fixed
                bottom
                title="nuevo Carrusel"
                fab
                slot="activator"
                color="primary"
              >
                <v-icon dark>add</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-card-text>
          <v-dialog
            v-if="hasPermission(eliminarCarruselVar)"
            v-model="dialog"
            persistent
            max-width="450"
          >
            <v-card>
              <v-card-title class="text-h5">
                <span class="headline">¿Quieres eliminar esta propaganda?</span>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog()"
                  >cerrar</v-btn
                >
                <v-btn color="red" :loading="loading" text @click="eliminar()"
                  >confirmar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-app>
    </v-container>
  </div>
</template>
<script>
import {
  listarCarrusel,
  crearCarrusel,
  actualizarCarrusel,
  eliminarCarrusel,
} from "@/packages/libreriaDeAccesos";
import { mapGetters } from "vuex";
import fire from "@/util/subirAFirebase.js";
import { carruselUrl, habilitarCarruselUrl } from "@/packages/config";
export default {
  name: "CarruselIndex",
  data() {
    return {
      search: "",
      carruseles: [],
      headers: [
        {
          text: "Descripcion",
          align: "left",
          sortable: false,
          value: "descripcion",
        },
        { text: "url de la propaganda", value: "modelo" },
        { text: "imagen pc", value: "quantity" },
        { text: "imagen mobile", value: "quantity" },
        { text: "habilitado", value: "brand" },
        { text: "Actions", value: "name", sortable: false },
      ],
      listarCarruselVar: listarCarrusel,
      crearCarruselVar: crearCarrusel,
      actualizarCarruselVar: actualizarCarrusel,
      eliminarCarruselVar: eliminarCarrusel,
      dialog: false,
      loading: false,
      carrusel_id: "",
      datoCarrusel: "",
    };
  },
  computed: {
    ...mapGetters(["hasPermission"]),
  },
  created() {
    this.fillCarrusel();
  },
  methods: {
    async fillCarrusel() {
      await this.$myApi.get(carruselUrl).then((response) => {
        if (response.data.hasPermission) {
          this.carruseles = response.data.carrusel;
        } else {
          this.$router.push({ name: "withoutAccess" });
        }
      });
    },
    async changeEnableCarrusel(id, enable) {
      enable = !enable;
      await this.$myApi
        .post(habilitarCarruselUrl + "/" + id, {
          enable: enable,
        })
        .then((response) => {
          if (response.data.hasPermission) {
            this.fillCarrusel();
          } else {
            this.$router.push({ name: "withoutAccess" });
          }
        });
    },
    async eliminar() {
      var rutaCarrusel = process.env.VUE_APP_FI_CARRUSEL_FILE_URL;
      await fire.borrarImagenAFirebase(
        this.datoCarrusel.pathName,
        rutaCarrusel + "/desktop"
      );
      await fire.borrarImagenAFirebase(
        this.datoCarrusel.pathNameMobile,
        rutaCarrusel + "/mobile"
      );
      await this.$myApi
        .delete(carruselUrl + "/" + this.datoCarrusel.id)
        .then((response) => {
          if (response.data.hasPermission) {
            this.fillCarrusel();
          } else {
            this.$router.push({ name: "withoutAccess" });
          }
        });
    },
    openDialog(datoCarrusel) {
      console.log(datoCarrusel);
      this.datoCarrusel = datoCarrusel;
      this.dialog = true;
    },
    closeDialog() {
      this.datoCarrusel = "";
      this.dialog = false;
    },
  },
};
</script>
