<template>
  <div class="container mt-5 d-flex justify-content-center">
    <form
      class="bg-secondary text-white text-center rounded p-5"
      style="width: 700px"
      @submit.prevent="login"
    >
      <h1 class="fw-bold display-4 mb-4">Welcome back!</h1>
      <div class="d-flex justify-content-center">
        <input
          v-model="form.email"
          type="email"
          class="form-control w-50 rounded-pill"
          placeholder="Enter Email address..."
        />
      </div>
      <div class="d-flex justify-content-center mt-3">
        <input
          v-model="form.password"
          type="password"
          class="form-control w-50 rounded-pill"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn btn-dark w-50 rounded-pill mt-4">
        Log in
      </button>
    </form>
  </div>
</template>
<script>
import api from "../services/api";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      const response = await api.login(this.form);
      alert(response.data.message);
      if (response.data.success) {
        this.$emit("login-success", response.data.user);
      }
    },
  },
};
</script>
