<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a
        class="navbar-brand"
        href="#"
        @click.prevent="$emit('change-page', 'main')"
      >
        <img src="/SKR.svg" alt="logo" width="60" />
      </a>

      <div class="collapse navbar-collapse show">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click.prevent="$emit('change-page', 'main')"
            >
              Main
            </a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click.prevent="$emit('change-page', 'about')"
            >
              About
            </a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click.prevent="$emit('change-page', 'profile')"
            >
              Profile
            </a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click.prevent="$emit('change-page', 'login')"
            >
              Sign in
            </a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click.prevent="$emit('change-page', 'registration')"
            >
              Registration
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
