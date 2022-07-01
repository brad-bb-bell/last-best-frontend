<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Last Best Ski Resort App",
      resorts: [],
      user: {},
      homeResort: "",
    };
  },
  created: function () {
    this.indexResorts();
    this.showUser();
  },
  methods: {
    indexResorts: function () {
      axios.get("/resorts.json").then((response) => {
        this.resorts = response.data;
        console.log("Resorts", response.data);
        var homeResortIndex = this.user.home_resort_id - 1;
        this.homeResort = this.resorts[homeResortIndex].name;
      });
    },
    showUser: function () {
      axios.get("/users/" + localStorage.user_id).then((response) => {
        this.user = response.data;
        console.log("Current user", response.data);
      });
    },
    showResort: function () {},
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ user.username }}</h1>
    <p>Home resort: {{ homeResort }}</p>
  </div>
  <div v-for="resort in resorts" v-bind:key="resort.id">
    <h2>{{ resort.name }}</h2>
    <p>Opening Day: {{ resort.opening_day }}</p>
    <p><a v-bind:href="`/resorts/${resort.id}.json`">More info</a></p>
  </div>
</template>

<style></style>
