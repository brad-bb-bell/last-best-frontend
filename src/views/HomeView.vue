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
        localStorage.setItem("home_resort_id", response.data.home_resort_id);
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
  <section class="page-section clearfix">
    <div class="container">
      <div class="intro">
        <a v-on:click="showResort(resortOfTheDay.id)">
          <img
            class="intro-img img-fluid mb-3 mb-lg-0 rounded"
            v-bind:src="resortOfTheDay.image"
            v-bind:alt="resortOfTheDay.name"
          />
        </a>
        <div class="intro-text left-0 text-center bg-faded p-5 rounded">
          <h2 class="section-heading mb-4">
            <span class="section-heading-upper">Welcome Back</span>
            <span class="section-heading-lower">{{ user.username }}</span>
            <span class="section-heading-upper">ski days: {{ user.days_skied }}</span>
          </h2>
          <p class="mb-3">
            Did you ski or snowboard today? Please take the time to rate your day and submit a conditions report to help
            community members get an honest sense of the current conditions.
          </p>
          <div class="intro-button mx-auto">
            <a class="btn btn-primary btn-xl" v-on:click="createConditionsReport()">Conditions Report</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="page-section cta">
    <div class="container">
      <div class="row">
        <div class="col-xl-9 mx-auto">
          <div class="cta-inner bg-faded text-center rounded">
            <h2 class="section-heading mb-4">
              <span class="section-heading-upper">Resort of the Day</span>
              <span class="section-heading-lower">
                <a v-on:click="showResort(resortOfTheDay.id)">{{ resortOfTheDay.name }}</a>
              </span>
            </h2>
            <p class="mb-3">A fun fact will be here. It will be interesting and/or cool.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

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
