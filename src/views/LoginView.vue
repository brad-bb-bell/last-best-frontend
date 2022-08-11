<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          console.log("user_id:", response.data.user_id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
};
</script>

<template>
  <section class="page-section cta">
    <div class="container">
      <div class="row">
        <div class="col-xl-9 mx-auto">
          <div class="cta-inner bg-faded text-center rounded">
            <h2 class="section-heading mb-4">
              <span class="section-heading-upper">Welcome Back</span>
              <span class="section-heading-lower">Login</span>
            </h2>
            <p class="mb-3">
              Guest Login
              <br />
              Email: guest@test.com
              <br />
              Password: password
            </p>
            <form v-on:submit.prevent="submit()">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div>
                <input type="email" placeholder="Email" v-model="newSessionParams.email" />
              </div>
              <div>
                <input type="password" placeholder="Password" v-model="newSessionParams.password" />
              </div>
              <p></p>
              <input type="submit" value="Login" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
