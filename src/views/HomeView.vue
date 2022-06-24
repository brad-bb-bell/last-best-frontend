<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Last Best Ski Resort App",
      resorts: [],
    };
  },
  created: function () {
    this.indexResorts();
  },
  methods: {
    indexResorts: function () {
      axios.get("http://localhost:3000/resorts.json").then((response) => {
        this.resorts = response.data;
        console.log(response.data);
      });
    },
    showResort: function () {},
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
  <div v-for="resort in resorts" v-bind:key="resort.id">
    <h2>{{ resort.name }}</h2>
    <p>Opening Day: {{ resort.opening_day }}</p>
    <p><a v-bind:href="`/resorts/${resort.id}.json`">More info</a></p>
  </div>
</template>

<style></style>
