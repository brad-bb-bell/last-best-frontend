<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
      user_id: null,
    };
  },
  created: function () {
    this.user_id = localStorage.user_id;
  },
  methods: {},
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
};
</script>

<template>
  <header>
    <h1 class="site-heading text-center text-faded d-none d-lg-block">
      <span class="site-heading-upper text-primary mb-3">A Montana Ski Resort Web App</span>
      <span class="site-heading-lower">Last Best</span>
    </h1>
  </header>
  <nav class="navbar navbar-expand-lg navbar-dark py-lg-4" id="mainNav">
    <div class="container">
      <a class="navbar-brand text-uppercase fw-bold d-lg-none" href="/">Last Best</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item px-lg-4"><a class="nav-link text-uppercase" href="/">Home</a></li>
          <li class="nav-item px-lg-4"><a class="nav-link text-uppercase" href="/resorts">Resorts</a></li>
          <li class="nav-item px-lg-4"><a class="nav-link text-uppercase" href="/events">Events</a></li>
          <li class="nav-item px-lg-4" v-if="!isLoggedIn">
            <router-link class="nav-link text-uppercase" to="/signup" v-if="!isLoggedIn">Signup</router-link>
          </li>
          <li class="nav-item px-lg-4" v-if="!isLoggedIn">
            <router-link class="nav-link text-uppercase" to="/login" v-if="!isLoggedIn">Login</router-link>
          </li>
          <li class="nav-item px-lg-4">
            <router-link class="nav-link text-uppercase" v-if="isLoggedIn" :to="`/users/${user_id}`">
              Profile
            </router-link>
          </li>
          <li class="nav-item px-lg-4">
            <router-link class="nav-link text-uppercase" to="/logout" v-if="isLoggedIn">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
  <footer class="footer text-faded text-center py-5">
    <div class="container"><p class="m-0 small"></p></div>
  </footer>
</template>

<style></style>
