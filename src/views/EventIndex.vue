<script>
import axios from "axios";

export default {
  data: function () {
    return {
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
        this.events = this.events.sort(this.compare);
        console.log("Events", response.data);
      });
    },
    showEvent: function (event) {
      this.$router.push("/events/" + event + ".json");
    },
    showResort: function (resort) {
      this.$router.push("/resorts/" + resort + ".json");
    },
    compare: function (a, b) {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    },
  },
};
</script>

<template>
  <body>
    <section class="page-section cta">
      <div class="container">
        <div class="row">
          <div class="col-xl-9 mx-auto">
            <div class="cta-inner bg-faded text-center rounded">
              <h2 class="section-heading mb-5">
                <span class="section-heading-upper">Montana Ski Resorts</span>
                <span class="section-heading-lower">All Upcoming Events</span>
              </h2>
              <ul class="list-unstyled list-hours mb-5 text-left mx-auto" v-for="event in events" v-bind:key="event.id">
                <li class="list-unstyled-item list-hours-item d-flex">
                  {{ event.date }}
                  <span class="ms-auto">
                    <a v-bind:href="event.link">{{ event.name }}</a>
                  </span>
                </li>
                <li class="list-unstyled-item list-hours-item d-flex">
                  <a v-on:click="showResort(event.resort_id)">{{ event.resort }}</a>
                  <span class="ms-auto">9:00 AM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>

<style></style>
