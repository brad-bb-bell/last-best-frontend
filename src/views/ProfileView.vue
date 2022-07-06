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
      console.log("to do", this.user.to_do_resorts);
      console.log("favorites", this.user.favorite_resorts);
      this.toDoResorts = this.user.to_do_resorts;
      this.favoriteResorts = this.user.favorite_resorts;
      axios.get("/resorts/" + localStorage.home_resort_id + ".json").then((response) => {
        this.homeResort = response.data;
        console.log("home resort", this.homeResort);
      });
    });
  },
  methods: {},
};
</script>

<template>
  <div class="profile">
    <h1>{{ user.username }}</h1>
    ski days this season: {{ user.days_skied }}
  </div>
  home resort: {{ homeResort.name }}
  <img v-bind:src="homeResort.logo" v-bind:key="homeResort.id" v-bind:alt="homeResort.name" />
  <br />
  <div v-for="toDoResort in toDoResorts" v-bind:key="toDoResort.id">
    to do resort: {{ toDoResort.name }}
    <img v-bind:src="toDoResort.logo" v-bind:key="toDoResort.id" v-bind:alt="toDoResort.name" />
  </div>
  <div v-for="favoriteResort in favoriteResorts" v-bind:key="favoriteResort.id">
    favorite resort: {{ favoriteResort.name }}
    <img v-bind:src="favoriteResort.logo" v-bind:key="favoriteResort.id" v-bind:alt="favoriteResort.name" />
  </div>
</template>

<style></style>
