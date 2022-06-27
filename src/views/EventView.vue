<script>
import axios from "axios";
export default {
  data: function () {
    return {
      event: [],
    };
  },
  created: function () {
    axios.get("/events/" + this.$route.params.id).then((response) => {
      this.event = response.data;
      console.log(response.data);
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
  <div class="events-show">
    <h1>{{ event.name }}</h1>
    <p>Date: {{ event.date }}</p>
    <p>
      <a v-on:click="showResort(event.resort_id)">{{ event.resort }}</a>
    </p>
    <p>Description: {{ event.description }}</p>
    <p>Link: {{ event.link }}</p>
  </div>
</template>

<style></style>
