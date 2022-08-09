<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
      resorts: [],
    };
  },
  created: function () {
    this.indexResorts();
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    compare: function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    },
    indexResorts: function () {
      axios.get("/resorts.json").then((response) => {
        this.resorts = response.data;
        this.resorts = this.resorts.sort(this.compare);
        console.log("Resorts", response.data);
      });
    },
    onChange: function (resort) {
      this.newUserParams.home_resort_id = resort.target.value;
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
              <span class="section-heading-upper">New User</span>
              <span class="section-heading-lower">Signup</span>
            </h2>
            <form v-on:submit.prevent="submit()">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div>
                <input type="username" placeholder="Username" v-model="newUserParams.username" />
              </div>
              <div>
                <input type="email" placeholder="Email" v-model="newUserParams.email" />
              </div>
              <div>
                <input type="password" placeholder="Password" v-model="newUserParams.password" />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password Confirmation"
                  v-model="newUserParams.password_confirmation"
                />
              </div>
              <p></p>
              <label for="resort">Choose Home Resort: &nbsp;</label>
              <br />
              <select name="resort" id="" v-on:change="onChange($event)">
                <option v-for="resort in resorts" v-bind:key="resort.id" v-bind:value="resort.id">
                  {{ resort.name }}
                </option>
              </select>
              <p></p>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
