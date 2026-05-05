<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Profile</h1>
    <div v-if="!user" class="alert alert-warning">
      Спочатку увійдіть у систему.
    </div>
    <div v-else class="row">
      <div class="col-12 col-md-4 text-center mb-4">
        <img
          src="/ava.JPG"
          alt="Kristina"
          width="200"
          class="rounded-circle shadow"
        />
        <div class="mt-3">
          <button class="btn btn-secondary">Редагувати фото</button>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <h4>User Settings</h4>
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>Ім'я</th>
              <td>
                <input
                  v-model="user.firstName"
                  type="text"
                  class="form-control"
                />
              </td>
            </tr>
            <tr>
              <th>Прізвище</th>
              <td>
                <input
                  v-model="user.lastName"
                  type="text"
                  class="form-control"
                />
              </td>
            </tr>
            <tr>
              <th>Статус</th>
              <td>
                <input v-model="user.status" type="text" class="form-control" />
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-secondary" @click="saveProfile">
          Зберегти зміни
        </button>
        <h4 class="mt-4">Contact Settings</h4>
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>Email</th>
              <td>
                <input v-model="user.email" type="text" class="form-control" />
              </td>
            </tr>
            <tr>
              <th>Телефон</th>
              <td>
                <input v-model="user.phone" type="text" class="form-control" />
              </td>
            </tr>
            <tr>
              <th>Місто</th>
              <td>
                <input v-model="user.city" type="text" class="form-control" />
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-danger mt-3" @click="logout">Вийти</button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../services/api";
export default {
  data() {
    return {
      user: null,
    };
  },
  async mounted() {
    const response = await api.getCurrentUser();
    this.user = response.data;
  },
  methods: {
    async saveProfile() {
      const response = await api.updateCurrentUser(this.user);
      this.user = response.data;
      alert("Зміни збережено");
    },
    async logout() {
      await api.logout();
      this.$emit("logout");
    },
  },
};
</script>
