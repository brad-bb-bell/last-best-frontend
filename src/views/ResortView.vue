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
      this.conditions_reports = this.resort.conditions_reports.reverse();
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
    <table class="table table-hover table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Resort</th>
          <th scope="col">Vertical</th>
          <th scope="col">Acres</th>
          <th scope="col">Elevation Top</th>
          <th scope="col">Elevation Base</th>
          <th scope="col">Avg Snowfall</th>
          <th scope="col">Chair lifts</th>
          <th scope="col">Surface Lifts</th>
          <th scope="col">Total lifts</th>
          <th scope="col">Terrain Park</th>
          <th scope="col">Night Skiing</th>
          <th scope="col">Ticket Price</th>
          <th scope="col">Opening Day</th>
          <th scope="col">Closing Day</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{{ resort.name }}</th>
          <td>{{ resort.vertical_gain }}'</td>
          <td>{{ resort.acres }}</td>
          <td>{{ resort.elevation_top }}'</td>
          <td>{{ resort.elevation_base }}'</td>
          <td>{{ resort.average_snowfall }}"</td>
          <td>{{ resort.chairlifts }}</td>
          <td>{{ resort.surface_lifts }}</td>
          <td>{{ resort.total_lifts }}</td>
          <td>{{ resort.terrain_park }}</td>
          <td>{{ resort.night_skiing }}</td>
          <td>${{ resort.ticket_price }}</td>
          <td>{{ resort.opening_day }}</td>
          <td>{{ resort.closing_day }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="resorts-show-conditions">
    <h2>Latest Conditions Reports</h2>
    <p></p>
    <div v-for="conditions_report in conditions_reports" v-bind:key="conditions_report.id">
      {{ conditions_report.created_at }} by {{ conditions_report.reported_by }}
      <br />
      <h4>{{ conditions_report.rating }}/5: {{ conditions_report.comment }}</h4>
      <p></p>
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
