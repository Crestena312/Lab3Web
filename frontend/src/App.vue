<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#" @click.prevent="page = 'main'">SKR</a>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="openProtected('main')">
              Main
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="page = 'about'">
              About
            </a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click.prevent="openProtected('profile')"
            >
              Profile
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="page = 'signin'">
              Sign in
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="page = 'registration'">
              Registration
            </a>
          </li>
        </ul>

        <button
          v-if="currentUser"
          class="btn btn-outline-light btn-sm"
          @click="logout"
        >
          Вийти
        </button>
      </div>
    </div>
  </nav>

  <main class="container mt-5">
    <div v-if="message" class="alert" :class="messageType">
      {{ message }}
    </div>

    <section v-if="page === 'main'">
      <h1 class="text-center mb-4">Телефонний довідник AllContacts</h1>

      <table class="table table-striped table-bordered text-center">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Ім’я</th>
            <th>Прізвище</th>
            <th>Телефон</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(contact, index) in contacts"
            :key="contact.id"
            @click="selectedContact = contact"
            :class="{ 'table-secondary': selectedContact?.id === contact.id }"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ contact.firstName }}</td>
            <td>{{ contact.lastName }}</td>
            <td>{{ contact.phone }}</td>
            <td>{{ contact.email }}</td>
          </tr>
        </tbody>
      </table>

      <div class="d-flex justify-content-center gap-3 mt-4">
        <button class="btn btn-secondary" @click="openAddForm">Додати</button>
        <button class="btn btn-secondary" @click="openEditForm">
          Редагувати
        </button>
        <button class="btn btn-secondary" @click="deleteContact">
          Видалити
        </button>
        <button class="btn btn-secondary" @click="sortContacts">
          Відсортувати
        </button>
      </div>

      <div v-if="showContactForm" class="card shadow p-4 mt-4">
        <h4>{{ editMode ? "Редагувати контакт" : "Додати контакт" }}</h4>

        <form @submit.prevent="saveContact">
          <div class="row g-3">
            <div class="col-md-3">
              <input
                v-model="contactForm.firstName"
                class="form-control"
                placeholder="Ім’я"
                required
              />
            </div>

            <div class="col-md-3">
              <input
                v-model="contactForm.lastName"
                class="form-control"
                placeholder="Прізвище"
                required
              />
            </div>

            <div class="col-md-3">
              <input
                v-model="contactForm.phone"
                class="form-control"
                placeholder="Телефон"
                required
              />
            </div>

            <div class="col-md-3">
              <input
                v-model="contactForm.email"
                type="email"
                class="form-control"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <button class="btn btn-primary mt-3">Зберегти</button>
          <button
            type="button"
            class="btn btn-outline-secondary mt-3 ms-2"
            @click="showContactForm = false"
          >
            Скасувати
          </button>
        </form>
      </div>
    </section>
    <section v-if="page === 'about'">
      <h1 class="text-center mb-4">About Web-Site</h1>

      <div class="card shadow p-4">
        <h3>Про сайт "AddContacts"</h3>
        <p>
          Веб-сайт є телефонним довідником для збереження, перегляду та
          керування контактною інформацією користувачів.
        </p>

        <h3>Основні можливості</h3>
        <p>Додавання, редагування, видалення та сортування контактів.</p>

        <h3>Автор</h3>
        <p>Shvydko Kristina</p>
      </div>
    </section>

    <section v-if="page === 'signin'" class="d-flex justify-content-center">
      <form
        class="bg-secondary text-white text-center rounded p-5"
        style="width: 700px"
        @submit.prevent="login"
      >
        <h1 class="fw-bold display-5 mb-4">Welcome back!</h1>

        <input
          v-model="loginForm.email"
          type="email"
          class="form-control w-75 mx-auto rounded-pill"
          placeholder="Enter Email address..."
          required
        />

        <input
          v-model="loginForm.password"
          type="password"
          class="form-control w-75 mx-auto rounded-pill mt-3"
          placeholder="Password"
          required
        />

        <button class="btn btn-dark w-75 rounded-pill mt-4">Log in</button>

        <button
          type="button"
          class="btn btn-dark w-75 rounded-pill mt-3"
          @click="page = 'registration'"
        >
          Register an account
        </button>
      </form>
    </section>

    <section
      v-if="page === 'registration'"
      class="d-flex justify-content-center"
    >
      <form
        class="bg-secondary text-white text-center rounded-4 p-5 shadow w-100"
        style="max-width: 900px"
        @submit.prevent="register"
      >
        <h1 class="fw-bold mb-4">Create an account!</h1>

        <div class="row justify-content-center g-3">
          <div class="col-md-4">
            <input
              v-model="registerForm.firstName"
              class="form-control rounded-pill"
              placeholder="First name"
              required
            />
          </div>

          <div class="col-md-4">
            <input
              v-model="registerForm.lastName"
              class="form-control rounded-pill"
              placeholder="Second name"
              required
            />
          </div>
        </div>

        <input
          v-model="registerForm.email"
          type="email"
          class="form-control w-75 mx-auto rounded-pill mt-3"
          placeholder="Email"
          required
        />

        <div class="row justify-content-center mt-3 g-3">
          <div class="col-md-4">
            <input
              v-model="registerForm.password"
              type="password"
              class="form-control rounded-pill"
              placeholder="Password"
              required
            />
          </div>

          <div class="col-md-4">
            <input
              v-model="registerForm.repeatPassword"
              type="password"
              class="form-control rounded-pill"
              placeholder="Repeat Password"
              required
            />
          </div>
        </div>

        <div class="row justify-content-center mt-3 g-3">
          <div class="col-md-4">
            <input
              v-model="registerForm.sex"
              class="form-control rounded-pill"
              placeholder="Sex"
            />
          </div>

          <div class="col-md-4">
            <input
              v-model="registerForm.birthDate"
              type="date"
              class="form-control rounded-pill"
            />
          </div>
        </div>

        <button class="btn btn-dark w-50 rounded-pill mt-4">
          Register account
        </button>
      </form>
    </section>

    <section v-if="page === 'profile' && currentUser">
      <h1 class="text-center mb-4">Profile</h1>

      <div class="card shadow p-4">
        <h4>User Settings</h4>

        <div class="row g-3">
          <div class="col-md-4">
            <input
              v-model="profileForm.firstName"
              class="form-control"
              placeholder="Ім’я"
            />
          </div>

          <div class="col-md-4">
            <input
              v-model="profileForm.lastName"
              class="form-control"
              placeholder="Прізвище"
            />
          </div>

          <div class="col-md-4">
            <input
              v-model="profileForm.status"
              class="form-control"
              placeholder="Статус"
            />
          </div>

          <div class="col-md-4">
            <input
              v-model="profileForm.email"
              class="form-control"
              placeholder="Email"
            />
          </div>

          <div class="col-md-4">
            <input
              v-model="profileForm.phone"
              class="form-control"
              placeholder="Телефон"
            />
          </div>

          <div class="col-md-4">
            <input
              v-model="profileForm.city"
              class="form-control"
              placeholder="Місто"
            />
          </div>
        </div>

        <button class="btn btn-secondary mt-3" @click="saveProfile">
          Зберегти зміни
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import api from "./services/api";

const page = ref("signin");

const currentUser = ref(
  JSON.parse(localStorage.getItem("currentUser") || "null"),
);

const contacts = ref([]);
const selectedContact = ref(null);
const showContactForm = ref(false);
const editMode = ref(false);

const message = ref("");
const messageType = ref("alert-success");

const loginForm = reactive({
  email: "",
  password: "",
});

const registerForm = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
  sex: "",
  birthDate: "",
});

const profileForm = reactive({
  firstName: "",
  lastName: "",
  status: "",
  email: "",
  phone: "",
  city: "",
});

const contactForm = reactive({
  id: null,
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
});

function showMessage(text, type = "success") {
  message.value = text;
  messageType.value = type === "success" ? "alert-success" : "alert-danger";

  setTimeout(() => {
    message.value = "";
  }, 3000);
}

function setUser(user) {
  currentUser.value = user;
  localStorage.setItem("currentUser", JSON.stringify(user));
  Object.assign(profileForm, user);
}

async function logout() {
  await api.logout();

  currentUser.value = null;
  localStorage.removeItem("currentUser");
  page.value = "signin";

  showMessage("Ви вийшли з акаунта");
}

function openProtected(targetPage) {
  if (!currentUser.value) {
    page.value = "signin";
    showMessage("Спочатку увійдіть у систему", "error");
    return;
  }

  page.value = targetPage;

  if (targetPage === "main") {
    loadContacts();
  }
}

async function register() {
  if (registerForm.password !== registerForm.repeatPassword) {
    showMessage("Паролі не співпадають", "error");
    return;
  }

  try {
    const { data } = await api.register(registerForm);

    if (!data.success) {
      showMessage(data.message, "error");
      return;
    }

    setUser(data.user);
    page.value = "main";

    await loadContacts();

    showMessage(data.message);
  } catch (error) {
    console.log(error);
    showMessage("Помилка реєстрації", "error");
  }
}

async function login() {
  try {
    const { data } = await api.login(loginForm);

    if (!data.success) {
      showMessage(data.message, "error");
      return;
    }

    setUser(data.user);
    page.value = "main";

    await loadContacts();

    showMessage(data.message);
  } catch (error) {
    console.log(error);
    showMessage("Помилка входу", "error");
  }
}

async function saveProfile() {
  try {
    const { data } = await api.updateCurrentUser(profileForm);

    setUser(data);
    showMessage("Профіль оновлено");
  } catch (error) {
    console.log(error);
    showMessage("Помилка оновлення профілю", "error");
  }
}

async function loadContacts() {
  try {
    const { data } = await api.getContacts();
    contacts.value = data;
  } catch (error) {
    console.log(error);
    showMessage("Помилка завантаження контактів", "error");
  }
}

function openAddForm() {
  Object.assign(contactForm, {
    id: null,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  editMode.value = false;
  showContactForm.value = true;
}

function openEditForm() {
  if (!selectedContact.value) {
    showMessage("Оберіть контакт у таблиці", "error");
    return;
  }

  Object.assign(contactForm, selectedContact.value);

  editMode.value = true;
  showContactForm.value = true;
}

async function saveContact() {
  try {
    if (editMode.value) {
      await api.updateContact(contactForm.id, contactForm);
      showMessage("Контакт оновлено");
    } else {
      await api.addContact(contactForm);
      showMessage("Контакт додано");
    }

    showContactForm.value = false;
    selectedContact.value = null;

    await loadContacts();
  } catch (error) {
    console.log(error);
    showMessage("Помилка збереження контакту", "error");
  }
}

async function deleteContact() {
  if (!selectedContact.value) {
    showMessage("Оберіть контакт у таблиці", "error");
    return;
  }

  try {
    await api.deleteContact(selectedContact.value.id);

    selectedContact.value = null;

    await loadContacts();

    showMessage("Контакт видалено");
  } catch (error) {
    console.log(error);
    showMessage("Помилка видалення контакту", "error");
  }
}

function sortContacts() {
  contacts.value = [...contacts.value].sort((a, b) =>
    (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName),
  );
}

onMounted(() => {
  if (currentUser.value) {
    Object.assign(profileForm, currentUser.value);
    page.value = "main";
    loadContacts();
  }
});
</script>
