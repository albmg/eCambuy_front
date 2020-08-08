<template>
  <v-container>
    <v-row>
      <v-btn raised class="primary" @click="onPickFile"
        ><v-icon left>mdi-camera-plus-outline</v-icon>Seleccionar imagen</v-btn
      >
      <input
        ref="fileInput"
        type="file"
        style="display: none;"
        accept="image/*"
        @change="OnFilePicked"
      />
      <v-col cols="12" sm="8" md="10" lg="6" class="mx-auto">
        <v-card v-if="imagePreview">
          <v-img :src="imagePreview" height="200" width="350"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SelectImage',
  data() {
    return {
      imagePreview: null,
    }
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click()
    },
    OnFilePicked(e) {
      const files = this.$refs.fileInput.files
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imagePreview = e.target.result
          this.uploadFile(files[0])
        }
        reader.readAsDataURL(files[0])
      }
    },
    async uploadFile(file) {
      const storageRef = this.$fireStorage.ref().child(file.name)
      try {
        await storageRef.put(file, {
          contentType: 'image/*',
        })
        this.getFileUrl(file.name)
      } catch (e) {
        alert(e.message)
      }
    },
    async getFileUrl(fileName) {
      const storageRef = this.$fireStorage.ref().child(fileName)
      try {
        const url = await storageRef.getDownloadURL()
        this.$emit('imagePreview', url)
      } catch (e) {
        alert(e.message)
      }
    },
  },
}
</script>
