<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-container>
        <v-layout v-if="isAuthenticated" mt-4 column align-center>
          <v-flex>
            <v-avatar size="100"
              ><v-img :src="loggedInUser.photo">></v-img></v-avatar
            >
          </v-flex>
          <v-flex>
            <p class="accent--text mt-3 headline">
              <nuxt-link class="profile-link" to="/profile">{{
                loggedInUser.username
              }}</nuxt-link>
            </p>
          </v-flex>
        </v-layout>
      </v-container>
      <v-list class="left-menu">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-container>
        <div v-if="isAuthenticated" class="text-center">
          <v-btn color="#5c8d89" outlined text @click="logout">
            <v-icon left>mdi-logout</v-icon>Desconectar</v-btn
          >
        </div>
        <div v-else>
          <div class="text-center mb-3">
            <v-btn color="#5c8d89" dark to="/login">
              <v-icon left>mdi-login</v-icon>Iniciar sesión</v-btn
            >
          </div>
          <div class="text-center"></div>
        </div>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar app class="navbar">
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-col cols="8" md="4">
        <nuxt-link to="/"
          ><img class="mt-2" height="50" src="/logo.png"
        /></nuxt-link>
      </v-col>

      <v-spacer />
      <v-toolbar-items class="hidden-xs-only mt-6">
        <div class="mr-4">
          <v-btn color="white" text to="/productList">
            <v-icon left>mdi-format-list-checkbox</v-icon>Lista de productos
          </v-btn>
        </div>

        <div class="mr-4">
          <v-btn color="white" text nuxt to="/addProductForm">
            <v-icon left>mdi-currency-eur</v-icon> Vender
          </v-btn>
        </div>
        <div v-if="isAuthenticated">
          <v-btn class="mr-2" color="white" text to="/profile"
            ><v-icon left>mdi-account</v-icon>
            {{ loggedInUser.username }}</v-btn
          >
          <v-btn color="white" text @click="logout">
            <v-icon left>mdi-logout</v-icon>Desconectar</v-btn
          >
        </div>
        <div v-else>
          <v-btn color="#ffa83a" dark to="/login">
            <v-icon left>mdi-login</v-icon>Iniciar sesión</v-btn
          >
        </div>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer dark class="footer-page" :absolute="!fixed" app>
      <v-col cols="12" class="text-center">
        eCambuy
        <span>&copy; {{ new Date().getFullYear() }}</span>
        <v-icon>mdi-code-tags</v-icon> Alberto Merino Guerra
        <v-icon>mdi-code-tags</v-icon>
        <v-btn
          class="mb-1"
          icon
          href="https://github.com/albmg"
          target="_blank"
        >
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Inicio',
          to: '/',
        },
        {
          icon: 'mdi-format-list-checkbox',
          title: 'Lista de productos',
          to: '/productList',
        },
        {
          icon: 'mdi-currency-eur',
          title: 'Vender',
          to: '/addProductForm',
        },
      ],
      title: 'eCambuy',
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style scoped>
.navbar {
  background-color: #74b49b !important;
}
.footer-page {
  background-color: #5c8d89;
}
.left-menu {
  color: #5c8d89;
}
.profile-link {
  color: #5c8d89;
}
</style>
