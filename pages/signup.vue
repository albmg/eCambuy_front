<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="mx-auto">
        <v-form v-model="valid">
          <h2>Únete a eCambuy</h2>
          <h4>Crea una cuenta para intercambiar tus productos ecológicos</h4>
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Nombre de usuario"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            type="password"
            label="Contraseña"
            required
          ></v-text-field>

          <v-text-field
            v-model="repeatPassword"
            :rules="[checkPasswords]"
            type="password"
            label="Repetir Contraseña"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <div class="text-center">
            <v-btn type="submit" block color="primary" nuxt @click="signup">
              Enviar
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" class="mx-auto pt-3">
        <v-divider />
        <p class="mt-4 text-center">
          Ya tienes una cuenta?
          <v-btn color="primary" text nuxt to="/login">
            Inicia sesión
          </v-btn>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    username: '',
    usernameRules: [
      (v) => !!v || 'Introduzca un nombre de usuario',
      (v) =>
        v.length <= 40 ||
        'El nombre de usuario debe tener una longitud máxima de 40 caracteres',
      // (v) => !v.includes(' ') || 'El nombre no puede contener espacios',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Introduzca una contraseña',
      (v) =>
        v.length >= 6 ||
        'La contraseña debe tener una longitud mínima de 6 caracteres',
    ],
    repeatPassword: '',
    email: '',
    emailRules: [
      (v) => !!v || 'Introduzca e-mail',
      (v) =>
        /.+@.+/.test(v) ||
        'Introduzca una dirección de correo electrónica válida',
    ],
  }),
  computed: {
    checkPasswords() {
      return this.password === this.repeatPassword
        ? true
        : 'Las contraseñas no coinciden!'
    },
  },
  methods: {
    async signup() {
      const data = {
        user_username: this.username,
        user_password: this.password,
        user_email: this.email,
      }
      await this.$axios.$post('/auth/signup', data)
      this.$auth.loginWith('local', { data })
      this.$router.push('/')
    },
  },
}
</script>
