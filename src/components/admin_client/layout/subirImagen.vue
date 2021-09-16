<template>
  <v-card>
    <v-img
      :src="img.path == '' ? imagenNoDisponible : img.path"
      :lazy-src="img.path == '' ? imagenNoDisponible : img.path"
      aspect-ratio="1"
      contain
      height="350"
    >
    </v-img>

    <v-card-actions>
      <v-btn outlined color="orange" @click="onPickFile()">subir Imagen</v-btn>
      <input
        type="file"
        style="display: none"
        ref="fileInput"
        accept="image/*"
        @change="onFilePicked"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { imagenNoDisponibleUrl } from "@/packages/config";
import util from "@/util/index.js";

export default {
  props: ['img'],
  data() {
    return {
      image: {
        file: "",
        uuid: "",
        path: "",
        pathName: "",
        oldPathName: "",
        state: "new",
      },
      imagenNoDisponible: imagenNoDisponibleUrl,
    };
  },
  methods: {
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
          uuid: util.generateUUID(),
        };
        this.putImage(object);
      });
      fileReader.readAsDataURL(files[0]);
    },
 
    putImage(object) {
      this.image = this.img
      if (this.image.state == "old") {
        this.image.oldPathName = this.image.pathName;
        this.image.state = "update";
      }
      this.image.file = object.file;
      this.image.path = object.path;
      this.image.pathName = "";
      this.image.uuid = object.uuid;
      this.$emit("datoImagen", this.image);
    },
  },
};
</script>

<style>
</style>