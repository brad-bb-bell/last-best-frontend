<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Last Best Ski Resort App",
      resorts: [],
      user: {},
      // homeResort: "",
      // homeResortLogo: "",
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
        // var homeResortIndex = this.user.home_resort_id - 1;
        // this.homeResort = this.resorts[homeResortIndex].name;
        // this.homeResortLogo = this.resorts[homeResortIndex].logo;
      });
    },
    showUser: function () {
      axios.get("/users/" + localStorage.user_id + ".json").then((response) => {
        this.user = response.data;
        console.log("Current user", response.data);
      });
    },
    showResort: function (resort) {
      this.$router.push("/resorts/" + resort + ".json");
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>Welcome back {{ user.username }}!</h1>
  </div>
  <div v-for="resort in resorts" v-bind:key="resort.id">
    <h2>
      <a v-on:click="showResort(resort.id)">{{ resort.name }}</a>
    </h2>
    <p>Opening Day: {{ resort.opening_day }}</p>
  </div>
</template>

<style></style>
