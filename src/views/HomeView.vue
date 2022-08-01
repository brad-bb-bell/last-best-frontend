<script>
/* global mapboxgl */

import axios from "axios";
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating,
  },
  data: function () {
    return {
      resorts: [],
      resort_id: "",
      resortOfTheDay: "",
      user: {},
      newConditionsReport: {},
      token: process.env.VUE_APP_MAPBOX_KEY,
      places: [
        { lat: 45.8174, lng: -110.8966, description: "Bridger Bowl" },
        { lat: 45.2458, lng: -111.3745, description: "Yellowstone Club" },
        { lat: 45.2857, lng: -111.4012, description: "Big Sky" },
        { lat: 48.4806, lng: -114.3503, description: "Whitefish" },
        { lat: 45.1908, lng: -109.3364, description: "Red Lodge" },
        { lat: 45.6923, lng: -113.9521, description: "Lost Trail" },
        { lat: 46.2496, lng: -113.2384, description: "Discovery" },
        { lat: 46.7531, lng: -112.3135, description: "Great Divide" },
        { lat: 47.0144, lng: -113.9996, description: "Montana Snowbowl" },
        { lat: 45.4339, lng: -113.1286, description: "Maverick Mountain" },
        { lat: 46.8384, lng: -110.7005, description: "Showdown" },
        { lat: 48.0148, lng: -114.3696, description: "Blacktail Mountain" },
        { lat: 48.605, lng: -115.6308, description: "Turner Mountain" },
        { lat: 47.9298, lng: -112.811, description: "Teton Pass" },
        { lat: 48.5184, lng: -109.1279, description: "Bear Paw Ski Bowl" },
        { lat: 44.9751, lng: -109.4348, description: "Beartooth Basin" },
        { lat: 47.456, lng: -115.69753, description: "Lookout Pass" },
      ],
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
      this.isModalVisible = true;
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
  mounted: function () {
    mapboxgl.accessToken = this.token;
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/outdoors-v11", // style URL
      center: [-112.2097, 47.0], // starting position [lng, lat]
      zoom: 6, // starting zoom
    });
    this.places.forEach((place) => {
      new mapboxgl.Marker().setLngLat([place.lng, place.lat]).addTo(map);
      new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([place.lng, place.lat])
        .setHTML("<small>" + place.description + "</small>")
        .addTo(map);
    });
    console.log(map);
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
            Did you ski or snowboard today? Rate your day and submit a conditions report to help community members get a
            sense of the current conditions.
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
            <p class="mb-3">{{ resortOfTheDay.fun_facts[0].fact }}</p>
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
  <div>
    <div id="map"></div>
  </div>

  <dialog id="conditions-report">
    <form method="dialog" class="conditions">
      <h2 class="section-heading mb-4">How was it out there?</h2>
      <label for="resort">Resort: &nbsp;</label>
      <select name="resort" id="" v-on:change="onChange($event)">
        <option v-for="resort in resorts" v-bind:key="resort.id" v-bind:value="resort.id">{{ resort.name }}</option>
      </select>
      <p></p>
      Rate your day from 1 to 5 stars:
      <star-rating :show-rating="false" v-model:rating="newConditionsReport.rating"></star-rating>
      <p></p>
      <div>
        Briefly describe today's conditions:
        <p></p>
        <textarea cols="45" v-model="newConditionsReport.comment"></textarea>
        <p></p>
        <p>
          <button type="button" class="btn btn-primary btn-lg btn-block" v-on:click="submitConditionsReport()">
            Save
          </button>
          &nbsp;
          <button class="btn btn-primary btn-lg btn-block">Cancel</button>
        </p>
      </div>
    </form>
  </dialog>
</template>

<style>
#map {
  position: absolute;
  top: 100;
  bottom: 100;
  width: 1150px;
  height: 600px;
}
.mapboxgl-popup-content {
  position: relative;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2pxrgba (0, 0, 0, 0.1);
  padding: 5px 15px 0px;
  pointer-events: auto;
}
#conditions-report {
  background: #073a6d;
  color: #e6a756;
  font-family: var(--bs-body-font-family);
}
textarea {
  resize: none;
}
</style>
