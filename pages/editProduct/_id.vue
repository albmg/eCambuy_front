<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="mx-auto edit-product">
        <v-form v-model="valid">
          <h2>Editar producto</h2>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="nombre"
            required
          ></v-text-field>

          <p>
            Modificar imagen:
            <SelectImage v-model="image" @imageURL="setImageURL" />
          </p>

          <v-textarea
            v-model="description"
            :rules="descriptionRules"
            :counter="325"
            label="descripción"
            required
          ></v-textarea>

          <div class="mb-2">
            <p>Trámite</p>
            {{ procedure.procedureName }}
          </div>

          <v-expansion-panels class="mb-8">
            <v-expansion-panel>
              <v-expansion-panel-header>
                Modificar trámite</v-expansion-panel-header
              >
              <v-divider></v-divider>
              <v-expansion-panel-content class="text-center">
                <SelectProcedure />

                <div v-if="selectedProcedure === 'Venta'">
                  <v-expansion-panel>
                    <v-text-field
                      v-model="price"
                      label="precio"
                      prepend-inner-icon="mdi-currency-eur"
                    >
                    </v-text-field>
                  </v-expansion-panel>
                </div>
                <div v-if="selectedProcedure === 'Otros'">
                  <v-expansion-panel>
                    <v-text-field
                      v-model="more"
                      label="Añade información"
                      required
                    ></v-text-field>
                  </v-expansion-panel>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <div v-if="procedure.procedureName === 'Venta'" class="mb-2">
            <p>precio:</p>
            <v-icon class="mr-2">mdi-currency-eur</v-icon>{{ price }} /Kg
            <!--<v-text-field
              v-model="price"
              label="precio"
              prepend-inner-icon="mdi-currency-eur"
            >
            </v-text-field>-->
          </div>

          <v-divider></v-divider>

          <div class="mt-4 mb-4">
            <p>localización:</p>

            {{ island.name }} - {{ location.name }}
          </div>

          <v-expansion-panels class="mb-8">
            <v-expansion-panel>
              <v-expansion-panel-header>
                Modificar localización</v-expansion-panel-header
              >
              <v-divider></v-divider>
              <v-expansion-panel-content class="text-center">
                <SelectLocation />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-btn block color="#5c8d89" dark @click="updateProduct">
            Enviar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import SelectImage from '~/components/SelectImage'
import SelectLocation from '~/components/SelectLocation'
import SelectProcedure from '~/components/SelectProcedure'

export default {
  middleware: 'auth',
  components: {
    SelectImage,
    SelectLocation,
    SelectProcedure,
  },
  data() {
    return {
      id: this.$route.params.id,
      valid: false,
      name: '',
      nameRules: [
        (v) => !!v || 'Nombre es requerido',
        (v) => v.length <= 40 || 'Longitud máxima 40 caracteres',
      ],
      image: '',
      imageRules: [(v) => !!v || 'Imagen requerida'],
      description: '',
      descriptionRules: [
        (v) => !!v || 'Descripción requerida',
        (v) => v.length <= 325 || 'Longitud máxima 325 caracteres',
      ],
      price: '',
      island: '',
      location: '',
      procedure: '',
      more: '',
    }
  },
  computed: {
    ...mapState([
      'selectedIsland',
      'selectedMunicipality',
      'selectedProcedure',
    ]),
  },
  async created() {
    // console.log('tramite ->', this.selectedProcedure)
    // console.log('municipio ->', this.selectedMunicipality)
    // console.log('isla ->', this.selectedIsland)

    const response = await this.$axios.$get(`/products/${this.id}`)
    console.log('a ver si encuentro el fallo', response)
    this.name = response.name
    this.image = response.image
    this.description = response.description
    this.price = response.price
    this.more = response.more
    this.island = response.productIsland
    this.location = response.location
    this.procedure = response.procedure

    console.log('tramite2 ->', this.procedure)
    console.log('island2 ->', this.island)
    console.log('muni2 ->', this.municipality)
  },

  methods: {
    async updateProduct() {
      const data = {
        name: this.name.toUpperCase(),
        image: this.image,
        description: this.description,
        price: this.price,
        more: this.more,
        location: this.selectedMunicipality,
        productIsland: this.selectedIsland,
        procedure: this.selectedProcedure,
      }
      await this.$axios.$put(`/products/me/${this.id}`, data)
      this.$router.push(`/productList/${this.id}`)
    },
    setImageURL(imageURL) {
      this.image = imageURL
    },
  },
}
</script>
<style scoped>
.edit-product p {
  color: #74b49b;
}
</style>
