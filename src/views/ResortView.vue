<script>
import axios from "axios";
export default {
  data: function () {
    return {
      resort: {},
      events: [],
    };
  },
  created: function () {
    axios.get("/resorts/" + this.$route.params.id).then((response) => {
      this.resort = response.data;
      this.events = this.resort.events;
      console.log(response.data);
      console.log(this.events);
    });
    this.showResort(this.resort);
  },
  methods: {
    showResort: function (resort) {
      console.log(resort);
    },
  },
};
</script>

<template>
  <div class="resorts-show">
    <h1>{{ resort.name }}</h1>
    <p>Opening Day: {{ resort.opening_day }}</p>
    <p>Ticket Price: ${{ resort.ticket_price }}</p>
  </div>
  <div class="resorts-show-events">
    <h1>Upcoming Events</h1>
    <div v-for="event in events" v-bind:key="event.id">
      <h3>{{ event.name }}</h3>
      <p>{{ event.date }} - {{ event.description }}</p>
    </div>
  </div>
</template>

<style></style>
