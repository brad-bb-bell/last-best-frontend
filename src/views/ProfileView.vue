<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Profile Page",
      user: {},
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
    });
  },
  methods: {},
};
</script>

<template>
  <div class="profile">
    <h1>{{ user.username }}</h1>
  </div>
  home resort: {{ user.home_resort_id }}
  <br />
  ski days this season: {{ user.days_skied }}
  <div v-for="toDoResort in toDoResorts" v-bind:key="toDoResort.id">to do resort: {{ toDoResort.name }}</div>
  <div v-for="favoriteResort in favoriteResorts" v-bind:key="favoriteResort.id">
    favorite resort: {{ favoriteResort.name }}
  </div>
</template>

<style></style>
