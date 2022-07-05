<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Last Best Ski Resort App",
      resorts: [],
      resort_id: "",
      resortOfTheDay: "",
      user: {},
      newConditionsReport: {},
    };
  },
  created: function () {
    this.indexResorts();
    this.showUser();
  },
  methods: {
    compare: function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    },
    indexResorts: function () {
      axios.get("/resorts.json").then((response) => {
        this.resorts = response.data;
        this.resorts = this.resorts.sort(this.compare);
        this.resortOfTheDay = this.resorts[Math.floor(Math.random() * this.resorts.length)];
        console.log("ROTD", this.resortOfTheDay);
        this.newConditionsReport.resort_id = this.resorts[0].id;
        this.newConditionsReport.user_id = localStorage.user_id;
        console.log("Resorts", response.data);
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
    createConditionsReport: function () {
      document.querySelector("#conditions-report").showModal();
    },
    submitConditionsReport: function () {
      this.resort_id = this.newConditionsReport.resort_id;
      axios.post("/conditions_reports", this.newConditionsReport).then((response) => {
        console.log("Success", response.data);
        this.$router.push("/resorts/" + this.resort_id + ".json");
      });
      axios.patch("/users/" + localStorage.user_id + ".json");
      this.newConditionsReport = {};
    },
    onChange: function (resort) {
      this.newConditionsReport.resort_id = resort.target.value;
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>Welcome back {{ user.username }}!</h1>
    Did you ski today?
    <button v-on:click="createConditionsReport()">Yes</button>
    Total ski days this season: {{ user.days_skied }}
    <p></p>
  </div>
  <div>
    <h3>Resort of the day: {{ resortOfTheDay.name }}</h3>
    <img v-bind:src="resortOfTheDay.image" v-bind:key="resortOfTheDay.id" v-bind:alt="resortOfTheDay.name" />
  </div>

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
    <tbody v-for="resort in resorts" v-bind:key="resort.id">
      <tr>
        <th scope="row">
          <a v-on:click="showResort(resort.id)">{{ resort.name }}</a>
        </th>
        <td>{{ resort.vertical }}'</td>
        <td>{{ resort.acres }}</td>
        <td>{{ resort.elevation_top }}'</td>
        <td>{{ resort.elevation_base }}'</td>
        <td>{{ resort.avg_snowfall }}"</td>
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
  <dialog id="conditions-report">
    <form method="dialog">
      <h1>How was it out there?</h1>
      <label for="resort">Resort:</label>
      <select name="resort" id="" v-on:change="onChange($event)">
        <option v-for="resort in resorts" v-bind:key="resort.id" v-bind:value="resort.id">{{ resort.name }}</option>
      </select>
      <br />
      Rating 1-5:
      <input type="text" v-model="newConditionsReport.rating" />
      <div>
        Conditions:
        <input type="text" v-model="newConditionsReport.comment" />
        <p>
          <button v-on:click="submitConditionsReport()">Save</button>
          <button on:click="close">Cancel</button>
        </p>
      </div>
    </form>
  </dialog>
</template>

<style></style>
