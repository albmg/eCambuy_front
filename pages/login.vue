<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="mx-auto">
        <v-form v-model="valid">
          <h2>Bienvenido</h2>
          <h4>Inicia sesión para comprar y vender productos</h4>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            required
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <div class="text-center">
            <v-btn block color="primary" nuxt @click="login">
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
          <v-btn color="primary" text nuxt to="/signup">
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
        (v) => !!v || 'Password is required',
        (v) => v.length >= 6 || 'Password must be at least 6 characters',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
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
