<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Телефонний довідник AllContacts</h1>
  </div>
  <div class="container table-responsive">
    <table
      class="table table-striped table-hover table-bordered text-center align-middle"
    >
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Ім’я</th>
          <th>Прізвище</th>
          <th>Номер телефону</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(contact, index) in contacts"
          :key="contact.id"
          :class="{ 'table-secondary': selectedContact?.id === contact.id }"
          @click="selectContact(contact)"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ contact.firstName }}</td>
          <td>{{ contact.lastName }}</td>
          <td>{{ contact.phone }}</td>
          <td>{{ contact.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="container d-flex justify-content-center flex-wrap gap-3 mt-4">
    <button class="btn btn-secondary" @click="openAddForm">Додати</button>
    <button class="btn btn-secondary" @click="openEditForm">Редагувати</button>
    <button class="btn btn-secondary" @click="deleteContact">Видалити</button>
    <button class="btn btn-secondary" @click="sortContacts">
      Відсортувати
    </button>
  </div>
  <div class="container mt-4" v-if="showForm">
    <form class="card p-4 shadow" @submit.prevent="saveContact">
      <h4>{{ editMode ? "Редагувати контакт" : "Додати контакт" }}</h4>
      <div class="mb-3">
        <label class="form-label">Ім’я</label>
        <input
          v-model="form.firstName"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Прізвище</label>
        <input
          v-model="form.lastName"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Номер телефону</label>
        <input v-model="form.phone" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          required
        />
      </div>
      <button class="btn btn-primary w-100" type="submit">Зберегти</button>
    </form>
  </div>
</template>
<script>
import api from "../services/api";
export default {
  data() {
    return {
      contacts: [],
      selectedContact: null,
      showForm: false,
      editMode: false,
      form: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      },
    };
  },
  async mounted() {
    await this.loadContacts();
  },
  methods: {
    async loadContacts() {
      const response = await api.getContacts();
      this.contacts = response.data;
    },
    selectContact(contact) {
      this.selectedContact = contact;
    },
    openAddForm() {
      this.editMode = false;
      this.showForm = true;
      this.form = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      };
    },
    openEditForm() {
      if (!this.selectedContact) {
        alert("Оберіть контакт");
        return;
      }
      this.editMode = true;
      this.showForm = true;
      this.form = { ...this.selectedContact };
    },
    async saveContact() {
      if (this.editMode) {
        await api.updateContact(this.form.id, this.form);
      } else {
        await api.addContact(this.form);
      }
      this.showForm = false;
      this.selectedContact = null;
      await this.loadContacts();
    },
    async deleteContact() {
      if (!this.selectedContact) {
        alert("Оберіть контакт");
        return;
      }
      await api.deleteContact(this.selectedContact.id);
      this.selectedContact = null;
      await this.loadContacts();
    },
    sortContacts() {
      this.contacts.sort((a, b) =>
        (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName),
      );
    },
  },
};
</script>
