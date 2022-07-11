<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Profile Page",
      user: {},
      homeResort: {},
      toDoResorts: [],
      favoriteResorts: [],
    };
  },
  created: function () {
    axios.get("/users/" + this.$route.params.id + ".json").then((response) => {
      this.user = response.data;
      console.log(response.data);
      this.toDoResorts = this.user.to_do_resorts;
      this.favoriteResorts = this.user.favorite_resorts;
      axios.get("/resorts/" + localStorage.home_resort_id + ".json").then((response) => {
        this.homeResort = response.data;
        console.log("home resort", this.homeResort);
      });
    });
  },
  methods: {
    showResort: function (resort) {
      this.$router.push("/resorts/" + resort + ".json");
    },
  },
};
</script>

<template>
  <section class="page-section">
    <div class="container">
      <div class="product-item">
        <div class="product-item-title d-flex">
          <div class="bg-faded p-5 d-flex me-auto rounded">
            <h2 class="section-heading mb-0">
              <span class="section-heading-upper">ski days: {{ user.days_skied }}</span>
              <span class="section-heading-lower">{{ user.username }}</span>
              <span class="section-heading-upper">home resort:</span>
              {{ homeResort.name }}
            </h2>
          </div>
        </div>
        <img
          class="img-fluid rounded about-heading-img mb-3 mb-lg-0"
          v-bind:src="homeResort.image"
          v-bind:alt="homeResort.name"
        />
        <div class="product-item-description d-flex ms-auto">
          <div class="bg-faded p-5 rounded">
            <p class="mb-0">
              ⭐⭐⭐⭐⭐: 5 days, 33%
              <br />
              ⭐⭐⭐⭐: 3 days, 20%
              <br />
              ⭐⭐⭐: 4 days, 27%
              <br />
              ⭐⭐: 2 days, 13%
              <br />
              ⭐: 1 day, 7%
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="page-section about-heading">
    <div class="container">
      <img class="img-fluid rounded about-heading-img mb-3 mb-lg-0" src="/assets/img/profile.png" alt="skiing powder" />
      <div class="about-heading-content">
        <div class="row">
          <div class="col-xl-9 col-lg-10 mx-auto">
            <div class="bg-faded rounded p-5">
              <h2 class="section-heading mb-4">
                <span class="section-heading-upper">To Do List:</span>
              </h2>
              <ul
                class="list-unstyled list-hours mb-5 text-left mx-auto"
                v-for="toDoResort in toDoResorts"
                v-bind:key="toDoResort.id"
              >
                <li class="list-unstyled-item list-hours-item d-flex">
                  <a v-on:click="showResort(toDoResort.resort_id)">{{ toDoResort.name }}</a>
                </li>
              </ul>
              <h2 class="section-heading mb-4">
                <span class="section-heading-upper">Favorites List:</span>
              </h2>
              <ul
                class="list-unstyled list-hours mb-5 text-left mx-auto"
                v-for="favoriteResort in favoriteResorts"
                v-bind:key="favoriteResort.id"
              >
                <li class="list-unstyled-item list-hours-item d-flex">
                  <a v-on:click="showResort(favoriteResort.resort_id)">{{ favoriteResort.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
