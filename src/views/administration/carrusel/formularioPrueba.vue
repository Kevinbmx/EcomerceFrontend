<template>
  <div id="pageIndexCarrusel">
    <v-container grid-list-xl fluid>
      <v-card>
        <v-card-title>
          Agregar Carrusel
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-form>
          <v-container>
            <v-layout wrap justify-space-between>
              <v-col xs12 md6>
                <v-textarea
                  :maxlength="maxLengthTextArea"
                  v-validate="'required'"
                  name="descripcion"
                  label="una pequeña descripcion del banner"
                  type="text"
                  :error-messages="errors.collect('descripcion')"
                  data-vv-name="descripcion"
                  required
                  v-model="descripcion"
                >
                </v-textarea>

                <v-text-field
                  :maxlength="maxLengthTextArea"
                  v-validate="'required'"
                  data-vv-name="url"
                  :error-messages="errors.collect('url')"
                  v-model="url"
                  label="url que redirigirá ej: '/#' si no redirige "
                  required
                >
                </v-text-field>
                <label>para desktop</label>
                <subir-imagen
                  :img="imagenDescktop"
                  @datoImagen="imagenDescktop = $event"
                ></subir-imagen>
                <label style="color: #ff5252" v-if="error_img_descktop">
                  suba una imagen</label
                >
                <br />
                <label>para movil</label>
                <subir-imagen
                  :img="imagenMobile"
                  @datoImagen="imagenMobile = $event"
                ></subir-imagen>
                <label style="color: #ff5252" v-if="error_img_mobile">
                  suba una imagen</label
                >

                <v-checkbox
                  v-model="enable"
                  label="habilitar carrusel."
                ></v-checkbox>
                <v-btn outlined color="primary" :to="{ name: 'mainRole' }">
                  cancelar
                </v-btn>
                <v-btn color="primary" @click="save()" :loading="loading">
                  guardar
                </v-btn>
              </v-col>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import subirImagen from "@/components/admin_client/layout/subirImagen";
import fire from "@/util/subirAFirebase.js";
import { carruselUrl } from "../../../packages/config";
import { crearCarrusel } from "@/packages/libreriaDeAccesos";

export default {
  data() {
    return {
      descripcion: "",
      url: "",
      carruselUrl: carruselUrl,
      maxLengthTextArea: 50,
      imagenDescktop: {
        file: "",
        uuid: "",
        path: "",
        pathName: "",
        oldPathName: "",
        state: "new",
      },
      imagenMobile: {
        file: "",
        uuid: "",
        path: "",
        pathName: "",
        oldPathName: "",
        state: "new",
      },
      enable: true,
      crearCarruselVar: crearCarrusel,
      loading: false,
      error_img_descktop: false,
      error_img_mobile: false,
    };
  },
  components: {
    subirImagen,
  },
  mounted() {
    this.id = this.$route.params.id;
    if (this.$route.meta.mode === "edit") {
      this.fillCarrusel(this.id);
      this.carruselUrl = this.carruselUrl + "/" + this.id;
    } else {
      this.$store
        .dispatch("hasThisPermission", this.crearCarruselVar)
        .then((response) => {
          if (!response) {
            this.$router.push({ name: "withoutAccess" });
          }
        });
    }
  },
  methods: {
    fillCarrusel(id) {
      this.$myApi.get(carruselUrl + "/" + id).then((response) => {
        if (response.data.hasPermission) {
          // console.log(response.data.carrusel)
          this.descripcion = response.data.carrusel.descripcion;
          this.url = response.data.carrusel.url;
          this.imagenDescktop.path = response.data.carrusel.pathFile;
          this.imagenDescktop.pathName = response.data.carrusel.pathName;
          this.imagenDescktop.state =
            response.data.carrusel.pathFile == "" ? "new" : "old";

          this.imagenMobile.path = response.data.carrusel.pathFileMobile;
          this.imagenMobile.pathName = response.data.carrusel.pathNameMobile;
          this.imagenMobile.state =
            response.data.carrusel.pathFileMobile == "" ? "new" : "old";
          this.enable = response.data.carrusel.enable;
        } else {
          this.$router.push({ name: "withoutAccess" });
        }
      });
    },
    subirYEliminarImagenAFirebases(imagen, rutaCarrusel) {
      return new Promise((resolve) => {
        if (imagen.state == "new" || imagen.state == "update") {
          if (imagen.state == "update") {
            fire.borrarImagenAFirebase(imagen.oldPathName, rutaCarrusel).then(() => {
              fire
                .subirImagenAFirebase(imagen, rutaCarrusel)
                .then((responseImagenDestop) => {
                  console.log(
                    "lista de url en el formulario",
                    responseImagenDestop
                  );
                  resolve(responseImagenDestop);
                });
              console.log("borro exitosamente");
            });
          } else {
            fire
              .subirImagenAFirebase(imagen, rutaCarrusel)
              .then((responseImagenDestop) => {
                console.log(
                  "lista de url en el formulario",
                  responseImagenDestop
                );
                resolve(responseImagenDestop);
              });
          }
        } else {
          resolve(false);
        }
      });
    },
    save() {
      this.$validator.validateAll().then(async (response) => {
        if (response) {
          if (this.imagenDescktop.path == "") {
            // console.log(this.imagenDescktop.path);
            this.error_img_descktop = true;
          } else if (this.imagenMobile.path == "") {
            // console.log(this.imagenMobile.path);
            this.error_img_mobile = true;
          } else {
            console.log("aqui entra");
            var rutaCarrusel = process.env.VUE_APP_FI_CARRUSEL_FILE_URL;
            this.error_img_descktop = false;
            this.error_img_mobile = false;
            // this.loading = true;
            let responseImagenDestop =
              await this.subirYEliminarImagenAFirebases(
                this.imagenDescktop,
                rutaCarrusel + "/desktop"
              );
            if (responseImagenDestop) {
              this.imagenDescktop.path = responseImagenDestop.urlFirebase;
              this.imagenDescktop.pathName = responseImagenDestop.name;
            }
            let responseImagenMobile =
              await this.subirYEliminarImagenAFirebases(
                this.imagenMobile,
                rutaCarrusel + "/mobile"
              );
            if (responseImagenMobile) {
              this.imagenMobile.path = responseImagenMobile.urlFirebase;
              this.imagenMobile.pathName = responseImagenMobile.name;
            }
            let insertCarrusel = await this.$myApi.post(this.carruselUrl, {
              descripcion: this.descripcion,
              url: this.url,
              pathFile: this.imagenDescktop.path,
              pathName: this.imagenDescktop.pathName,
              pathFileMobile: this.imagenMobile.path,
              pathNameMobile: this.imagenMobile.pathName,
              enable: this.enable,
            });

            if (insertCarrusel.data.hasPermission) {
              this.$router.push({ name: "mainCarrusel" });
            } else {
              this.$router.push({ name: "withoutAccess" });
            }
          }
        }
      });
    },
  },
};
</script>

<style>
</style>