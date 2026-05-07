<template>
  <Navbar :page="page" @change-page="changePage" />

  <!-- Захищені сторінки -->
  <MainPage v-if="page === 'main'" />
  <ProfilePage v-if="page === 'profile'" @logout="handleLogout" />

  <!-- Відкриті сторінки -->
  <AboutPage v-if="page === 'about'" />

  <LoginPage v-if="page === 'login'" @login-success="handleLogin" />

  <RegistrationPage
    v-if="page === 'registration'"
    @registered="page = 'login'"
  />
</template>

<script>
import api from "./services/api";

import Navbar from "./components/Navbar.vue";
import MainPage from "./components/MainPage.vue";
import AboutPage from "./components/AboutPage.vue";
import LoginPage from "./components/LoginPage.vue";
import RegistrationPage from "./components/RegistrationPage.vue";
import ProfilePage from "./components/ProfilePage.vue";

export default {
  components: {
    Navbar,
    MainPage,
    AboutPage,
    LoginPage,
    RegistrationPage,
    ProfilePage,
  },

  data() {
    return {
      page: "login", // за замовчуванням
      user: null,
    };
  },

  async mounted() {
    try {
      const res = await api.getCurrentUser();
      this.user = res.data;

      if (this.user) {
        this.page = "main";
      } else {
        this.page = "login";
      }
    } catch (e) {
      this.page = "login";
    }
  },

  methods: {
    changePage(newPage) {
      const protectedPages = ["main", "profile"];

      if (protectedPages.includes(newPage) && !this.user) {
        alert("Спочатку увійдіть у систему");
        this.page = "login";
        return;
      }

      this.page = newPage;
    },

    handleLogin(user) {
      this.user = user;
      this.page = "main";
    },

    handleLogout() {
      this.user = null;
      this.page = "login";
    },
  },
};
</script>
