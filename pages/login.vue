<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="mx-auto">
        <v-form v-model="valid">
          <h2 class="main-title">Bienvenido</h2>
          <h4>Inicia sesión para comprar y vender productos</h4>
          <v-text-field
            v-model="email"
            class="mt-4"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            class="mt-4"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            required
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <div class="text-center mt-8">
            <v-btn block color="#5c8d89" dark nuxt @click="login">
              Enviar
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" class="mx-auto pt-3">
        <v-divider></v-divider>
        <p class="mt-4 text-center">
          No tienes cuenta? Crea una
          <v-btn color="#5c8d89" text nuxt to="/signup">
            Regístrate
          </v-btn>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      valid: false,
      password: '',
      passwordRules: [
        (v) => !!v || 'Contraseña requerida',
        (v) => v.length >= 6 || 'La contraseña es demasiado corta',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'e-mail requerido',
        (v) => /.+@.+/.test(v) || 'El e-mail debe tener un formato válido',
      ],
    }
  },
  methods: {
    login() {
      const data = {
        user_email: this.email,
        user_password: this.password,
      }
      this.$auth.loginWith('local', { data })
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.main-title {
  color: #5c8d89;
}
</style>
