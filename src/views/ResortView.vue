<script>
import axios from "axios";
export default {
  data: function () {
    return {
      resort: {},
      events: [],
      conditions_reports: [],
      currentEvent: {},
    };
  },
  created: function () {
    axios.get("/resorts/" + this.$route.params.id).then((response) => {
      this.resort = response.data;
      this.events = this.resort.events;
      this.conditions_reports = this.resort.conditions_reports;
      console.log(response.data);
    });
  },
  methods: {
    showEvent: function (event) {
      this.$router.push("/events/" + event + ".json");
    },
  },
};
</script>

<template>
  <div class="resorts-show">
    <h1>{{ resort.name }}</h1>
    <p><img v-bind:src="resort.image" v-bind:key="resort.id" v-bind:alt="resort.name" /></p>
    <p>Opening Day: {{ resort.opening_day }}</p>
    <p>Ticket Price: ${{ resort.ticket_price }}</p>
  </div>
  <div class="resorts-show-conditions">
    <h1>Conditions Reports</h1>
    <div v-for="conditions_report in conditions_reports" v-bind:key="conditions_report.id">
      <h3>{{ conditions_report.created_at }}</h3>
      <p>{{ conditions_report.rating }}/5 - {{ conditions_report.comment }}</p>
    </div>
  </div>
  <div class="resorts-show-events">
    <h1>Upcoming Events</h1>
    <div v-for="event in events" v-bind:key="event.id">
      <h3>
        <a v-on:click="showEvent(event.id)">{{ event.name }}</a>
      </h3>
    </div>
  </div>
</template>

<style></style>
