<template>
  <v-container>
    <v-row>
      <v-btn raised class="primary" @click="onPickFile"
        >Seleccionar imagen</v-btn
      >
      <input
        ref="fileInput"
        type="file"
        style="display: none;"
        accept="image/*"
        @change="OnFilePicked"
      />
      <v-col cols="12" sm="8" md="10" lg="6" class="mx-auto">
        <v-card>
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
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imagePreview = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.imagePreview = files[0].name
      }
    },
  },
}
</script>
