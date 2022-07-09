<script>
// import { throwStatement } from "@babel/types";
import axios from "axios";
export default {
  data: function () {
    return {
      resort: {},
      resortName: "",
      events: [],
      conditions_reports: [],
      currentEvent: {},
      userToDos: [],
      userFavs: [],
      newTodoResort: {},
      toDoResortId: "",
      newFavResort: {},
      favResortId: "",
      isToDo: false,
      isFavorite: false,
    };
  },
  created: function () {
    axios.get("/resorts/" + this.$route.params.id).then((response) => {
      this.resort = response.data;
      this.resortName = this.resort.name;
      this.events = this.resort.events;
      this.conditions_reports = this.resort.conditions_reports.reverse();
      console.log(response.data);
    });
    axios.get("/users/" + localStorage.user_id + ".json").then((response) => {
      this.userToDos = response.data.to_do_resorts;
      this.userFavs = response.data.favorite_resorts;
      this.userToDos.forEach((toDoResort) => {
        if (this.resortName === toDoResort.name) {
          this.isToDo = true;
          this.toDoResortId = toDoResort.id;
          console.log("to do id", this.toDoResortId);
        }
      });
      this.userFavs.forEach((favResort) => {
        if (this.resortName === favResort.name) {
          this.isFavorite = true;
          this.favResortId = favResort.id;
          console.log("fav id", this.favResortId);
        }
      });
    });
  },
  methods: {
    showEvent: function (event) {
      this.$router.push("/events/" + event + ".json");
    },
    toDoResort: function () {
      if (this.isToDo == false) {
        this.newTodoResort.user_id = localStorage.user_id;
        this.newTodoResort.resort_id = this.resort.id;
        axios.post("/to_do_resorts/", this.newTodoResort).then((response) => {
          console.log("Success", response.data);
          this.toDoResortId = response.data.id;
        });
      } else {
        axios.delete("/to_do_resorts/" + this.toDoResortId + ".json").then((response) => {
          console.log("Success,", response.data);
        });
      }
    },
    favoriteResort: function () {
      if (this.isFavorite == false) {
        this.newFavResort.user_id = localStorage.user_id;
        this.newFavResort.resort_id = this.resort.id;
        axios.post("/favorite_resorts/", this.newFavResort).then((response) => {
          console.log("Success", response.data);
          this.favResortId = response.data.id;
        });
      } else {
        axios.delete("/favorite_resorts/" + this.favResortId + ".json").then((response) => {
          console.log("Success,", response.data);
        });
      }
    },
  },
};
</script>

<template>
  <section class="page-section">
    <div class="container">
      <div class="product-item">
        <div class="product-item-title d-flex">
          <div class="bg-faded p-5 d-flex ms-auto rounded">
            <h2 class="section-heading mb-0">
              <span class="section-heading-upper">
                <input type="checkbox" v-model="isToDo" v-on:click="toDoResort()" />
                To Do
              </span>
              <span class="section-heading-upper">
                <input type="checkbox" v-model="isFavorite" v-on:click="favoriteResort()" />
                Favorite
              </span>
            </h2>
          </div>
        </div>
        <img
          class="img-fluid rounded about-heading-img mb-3 mb-lg-0"
          v-bind:src="resort.image"
          v-bind:alt="resort.name"
        />
        <div class="product-item-description d-flex me-auto">
          <div class="bg-faded p-5 rounded">
            <span class="section-heading-upper">
              <h1>{{ resort.name }}</h1>
            </span>
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
  <section class="page-section cta">
    <div class="container">
      <div class="row">
        <div class="col-xl-9 mx-auto">
          <div class="cta-inner bg-faded text-center rounded">
            <h2 class="section-heading mb-5">
              <span class="section-heading-upper">{{ resort.name }}</span>
              <span class="section-heading-lower">Recent conditions reports</span>
            </h2>
            <ul
              class="list-unstyled list-hours mb-5 text-left mx-auto"
              v-for="conditions_report in conditions_reports"
              v-bind:key="conditions_report.id"
            >
              <li class="list-unstyled-item list-hours-item d-flex">
                {{ conditions_report.rating }}/5
                <span class="ms-auto">{{ conditions_report.reported_by }} on {{ conditions_report.created_at }}</span>
              </li>
              <li class="list-unstyled-item list-hours-item d-flex">
                {{ conditions_report.comment }}
              </li>
            </ul>
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
            <h2 class="section-heading mb-5">
              <span class="section-heading-upper">{{ resort.name }}</span>
              <span class="section-heading-lower">Upcoming Events</span>
            </h2>
            <ul class="list-unstyled list-hours mb-5 text-left mx-auto" v-for="event in events" v-bind:key="event.id">
              <li class="list-unstyled-item list-hours-item d-flex">
                {{ event.date }}
                <span class="ms-auto">
                  <a v-bind:href="event.link">{{ event.name }}</a>
                </span>
              </li>
              <li class="list-unstyled-item list-hours-item d-flex">
                {{ resort.name }}
                <span class="ms-auto">9:00 AM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
