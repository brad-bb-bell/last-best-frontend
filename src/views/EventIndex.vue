<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "All Upcoming Events",
      events: [],
    };
  },
  created: function () {
    this.indexEvents();
  },
  methods: {
    indexEvents: function () {
      axios.get("/events.json").then((response) => {
        this.events = response.data;
        console.log("Events", response.data);
      });
    },
    showEvent: function (event) {
      this.$router.push("/events/" + event + ".json");
    },
  },
};
</script>

<template>
  <div class="events">
    <h1>{{ message }}</h1>
  </div>
  <div v-for="event in events" v-bind:key="event.id">
    <h2>
      <a v-on:click="showEvent(event.id)">{{ event.name }}</a>
    </h2>
    <p>Date: {{ event.date }} Resort: {{ event.resort }}</p>
  </div>
</template>

<style></style>
