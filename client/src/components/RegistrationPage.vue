<template>
  <div class="container mt-5 d-flex justify-content-center">
    <form
      class="bg-secondary text-white text-center rounded-4 p-4 p-md-5 shadow w-100"
      style="max-width: 900px"
      @submit.prevent="register"
    >
      <h1 class="fw-bold mb-4">Create an account!</h1>
      <div class="row justify-content-center g-3">
        <div class="col-12 col-md-4">
          <input
            v-model="form.firstName"
            type="text"
            class="form-control rounded-pill"
            placeholder="First name"
          />
        </div>
        <div class="col-12 col-md-4">
          <input
            v-model="form.lastName"
            type="text"
            class="form-control rounded-pill"
            placeholder="Second name"
          />
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-12 col-md-8">
          <input
            v-model="form.email"
            type="email"
            class="form-control rounded-pill"
            placeholder="Email"
          />
        </div>
      </div>
      <div class="row justify-content-center mt-3 g-3">
        <div class="col-12 col-md-4">
          <input
            v-model="form.password"
            type="password"
            class="form-control rounded-pill"
            placeholder="Password"
          />
        </div>
        <div class="col-12 col-md-4">
          <input
            v-model="form.repeatPassword"
            type="password"
            class="form-control rounded-pill"
            placeholder="Repeat Password"
          />
        </div>
      </div>
      <div class="row justify-content-center mt-3 g-3">
        <div class="col-12 col-md-4">
          <input
            v-model="form.sex"
            type="text"
            class="form-control rounded-pill"
            placeholder="Sex"
          />
        </div>
        <div class="col-12 col-md-4">
          <input
            v-model="form.birthDate"
            type="date"
            class="form-control rounded-pill"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-dark w-50 rounded-pill mt-4">
        Register account
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
        sex: "",
        birthDate: "",
      },
    };
  },
  methods: {
    async register() {
      if (Object.values(this.form).includes("")) {
        alert("Заповніть всі поля");
        return;
      }
      if (this.form.password !== this.form.repeatPassword) {
        alert("Паролі не співпадають");
        return;
      }
      const response = await api.register(this.form);
      alert(response.data.message);
      if (response.data.success) {
        this.$emit("registered");
      }
    },
  },
};
</script>
