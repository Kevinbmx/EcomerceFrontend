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
                  label="url que redirigirá ej: '/' si no redirige "
                  required
                >
                </v-text-field>
                <v-card>
                  <v-img
                    :src="image.path"
                    :lazy-src="image.path"
                    aspect-ratio="1"
                    contain
                    height="350"
                  >
                  </v-img>

                  <v-card-actions>
                    <v-btn text color="orange" @click="onPickFile()"
                      >Upload Image</v-btn
                    >
                    <input
                      type="file"
                      style="display: none"
                      ref="fileInput"
                      accept="image/*"
                      @change="onFilePicked"
                    />
                  </v-card-actions>
                  <v-checkbox v-model="enable" label="habilitar carrusel.">
                  </v-checkbox>
                </v-card>
                <v-btn outlined color="primary" :to="{ name: 'mainRole' }">
                  cancelar
                </v-btn>
                <v-btn color="primary" @click="save()" :loading="loading">
                  guardar
                </v-btn>
                <v-btn outlined color="primary" @click="obtainListOfFile()">
                  obtener lista firebase
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
import * as firebase from "firebase";
import { crearCarrusel } from "@/packages/libreriaDeAccesos";
import { carruselUrl } from "../../../packages/config";
export default {
  data() {
    return {
      descripcion: "",
      id: "",
      enable: true,
      pathFile: "",
      url: "",
      image: {
        file: "",
        uuid: "",
        path: "",
        pathName: "",
        oldPathName: "",
        state: "new",
      },

      maxLengthTextArea: 50,
      crearCarruselVar: crearCarrusel,
      loading: false,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    if (this.$route.meta.mode === "edit") {
      this.fillCarrusel(this.id);
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
          this.image.path = response.data.carrusel.pathFile;
          this.image.state = "old";
          this.image.pathName = response.data.carrusel.pathName;
          this.enable = response.data.carrusel.enable;
        } else {
          this.$router.push({ name: "withoutAccess" });
        }
      });
    },
    save() {
      this.$validator.validateAll().then((response) => {
        if (response) {
          this.loading = true;
          this.createImageCarrusel().then((response0) => {
            if (response0) {
              if (this.$route.meta.mode === "edit") {
                this.$myApi
                  .post(carruselUrl + "/" + this.id, {
                    descripcion: this.descripcion,
                    url: this.url,
                    pathFile: this.image.path,
                    pathName: this.image.pathName,
                    pathFileMobile: this.image.pathFileMobile,
                    pathNameMobile: this.image.pathNameMobile,
                    enable: this.enable,
                  })
                  .then((response1) => {
                    if (response1.data.hasPermission) {
                      this.$router.push({ name: "mainCarrusel" });
                    } else {
                      this.$router.push({ name: "withoutAccess" });
                    }
                  });
              } else {
                this.$myApi
                  .post(carruselUrl, {
                    descripcion: this.descripcion,
                    url: this.url,
                    pathFile: this.image.path,
                    pathName: this.image.pathName,
                    enable: this.enable,
                  })
                  .then((response2) => {
                    if (response2.data.hasPermission) {
                      this.$router.push({ name: "mainCarrusel" });
                    } else {
                      this.$router.push({ name: "withoutAccess" });
                    }
                  });
              }
            } else {
              this.$router.push({ name: "mainCarrusel" });
            }
          });
        }
      });
    },

    generateUUID() {
      var d = new Date().getTime();
      if (
        typeof performance !== "undefined" &&
        typeof performance.now === "function"
      ) {
        d += performance.now(); //use high-precision timer if available
      }
      var newGuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return newGuid;
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        let object = {
          path: fileReader.result,
          file: files,
          uuid: this.generateUUID(),
        };
        this.putImage(object);
      });
      fileReader.readAsDataURL(files[0]);
    },
    putImage(object) {
      if (this.image.state == "old") {
        this.image.oldPathName = this.image.pathName;
        this.image.state = "update";
      }
      this.image.file = object.file;
      this.image.path = object.path;
      this.image.pathName = "";
      this.image.uuid = object.uuid;
    },
    uploadImageFirebase(objImageForFirebase) {
      this.image.path = objImageForFirebase.urlFirebase;
      this.image.pathName = objImageForFirebase.name;
    },
    createImageCarrusel(rutaCarrusel) {
      return new Promise((resolve) => {
        if (this.image.state == "new" || this.image.state == "update") {
          if (this.image.state == "update") {
            firebase
              .auth()
              .signInWithEmailAndPassword(
                process.env.VUE_APP_FI_USER_FIREBASE,
                process.env.VUE_APP_FI_PASSWORK_FIREBASE
              )
              .then(() => {
                var storage = firebase.storage();
                var storageRef = storage.ref();
                var desertRef = storageRef.child(
                  process.env.VUE_APP_FI_CARRUSEL_FILE_URL +
                    "/" +
                    rutaCarrusel +
                    this.image.oldPathName
                );
                desertRef
                  .delete()
                  .then(function () {
                    // console.log('se elimino correctamente de firebase su imagen')
                  })
                  .catch(() => {
                    // Uh-oh, an error occurred!
                  });
              });
          }
          this.uploadImageCarruselFirebase().then((response) => {
            this.image.path = response.urlFirebase;
            this.image.pathName = response.name;
            resolve(true);
          });
        } else if (this.image.state == "old") {
          resolve(true);
        } else {
          resolve(false);
          return;
        }
      });
    },
    uploadImageCarruselFirebase() {
      return new Promise((resolve, reject) => {
        const element = this.image;
        const uuid = element.uuid;
        firebase
          .auth()
          .signInWithEmailAndPassword(
            process.env.VUE_APP_FI_USER_FIREBASE,
            process.env.VUE_APP_FI_PASSWORK_FIREBASE
          )
          .then(() => {
            var storageRef = firebase.storage().ref();
            var metadata = {
              contentType: element.file[0].type,
            };
            const filename = element.file[0].name;
            const ext = filename.slice(filename.lastIndexOf("."));
            var uploadTask = storageRef
              .child(
                process.env.VUE_APP_FI_CARRUSEL_FILE_URL + "/" + uuid + ext
              )
              .put(element.file[0], metadata);

            uploadTask.on(
              firebase.storage.TaskEvent.STATE_CHANGED,
              function (snapshot) {
                // var progress =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED:
                    // console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING:
                    // console.log('Upload is running');
                    break;
                }
              },
              function (error) {
                reject(error);
                switch (error.code) {
                  case "storage/unauthorized":
                    // User doesn't have permission to access the object
                    break;

                  case "storage/canceled":
                    // User canceled the upload
                    break;

                  case "storage/unknown":
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
              },
              function complete() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref
                  .getDownloadURL()
                  .then(function (downloadURL) {
                    let objectFile = {
                      name: uuid + ext,
                      urlFirebase: downloadURL,
                    };
                    // //   console.log('tama;o Imagen', state.maxUploadImage-1)

                    // console.log('File available at', downloadURL);
                    resolve(objectFile);
                  });
              }
            );
          });
      });
    },
    obtainListOfFile() {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          process.env.VUE_APP_FI_USER_FIREBASE,
          process.env.VUE_APP_FI_PASSWORK_FIREBASE
        )
        .then(() => {
          // Create a reference under which you want to list
          var storage = firebase.storage();
          var storageRef = storage.ref();
          var listRef = storageRef.child(
            process.env.VUE_APP_FI_CARRUSEL_FILE_URL + "/"
          );

          // Find all the prefixes and items.
          listRef
            .listAll()
            .then(function (res) {
              res.prefixes.forEach(function (folderRef) {
                console.log(folderRef);
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
              });
              res.items.forEach(function (itemRef) {
                console.log(itemRef);
                // All the items under listRef.
              });
            })
            .catch(function (error) {
              console.log(error);
              // Uh-oh, an error occurred!
            });
        });
    },
    // binarySearch() {
    //   var filtered = $.grep(fans, function (fan) {
    //     return fan == fans;
    //   });
    //   console.log(filtered);
    // },
  },
};
</script>