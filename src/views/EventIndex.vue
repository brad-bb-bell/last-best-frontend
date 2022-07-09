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
        console.log("Events", response.data);
      });
    },
    showEvent: function (event) {
      this.$router.push("/events/" + event + ".json");
    },
    showResort: function (resort) {
      this.$router.push("/resorts/" + resort + ".json");
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
    <section class="page-section about-heading">
      <div class="container">
        <img class="img-fluid rounded about-heading-img mb-3 mb-lg-0" src="assets/img/about.jpg" alt="..." />
        <div class="about-heading-content">
          <div class="row">
            <div class="col-xl-9 col-lg-10 mx-auto">
              <div class="bg-faded rounded p-5">
                <h2 class="section-heading mb-4">
                  <span class="section-heading-upper">Strong Coffee, Strong Roots</span>
                  <span class="section-heading-lower">About Our Cafe</span>
                </h2>
                <p>
                  Founded in 1987 by the Hernandez brothers, our establishment has been serving up rich coffee sourced
                  from artisan farmers in various regions of South and Central America. We are dedicated to travelling
                  the world, finding the best coffee, and bringing back to you here in our cafe.
                </p>
                <p class="mb-0">
                  We guarantee that you will fall in
                  <em>lust</em>
                  with our decadent blends the moment you walk inside until you finish your last sip. Join us for your
                  daily routine, an outing with friends, or simply just to enjoy some alone time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>

<style></style>
