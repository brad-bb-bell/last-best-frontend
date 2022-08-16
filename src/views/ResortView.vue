<script>
import axios from "axios";
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating,
  },
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
      key: process.env.VUE_APP_WEATHER_KEY,
      currentTemp: "",
      currentWeather: "",
      currentWeatherIcon: "",
      currentFeelsLike: "",
      forecast: {},
      forecastDayOne: {},
      forecastDayOneHigh: "",
      forecastDayTwo: {},
      forecastDayThree: {},
      splitString: [],
    };
  },
  created: function () {
    axios.get("/users/" + localStorage.user_id + ".json").then((response) => {
      this.userToDos = response.data.to_do_resorts;
      this.userFavs = response.data.favorite_resorts;
      this.userToDos.forEach((toDoResort) => {
        if (this.resortName === toDoResort.name) {
          this.isToDo = true;
          this.toDoResortId = toDoResort.id;
        }
      });
      this.userFavs.forEach((favResort) => {
        if (this.resortName === favResort.name) {
          this.isFavorite = true;
          this.favResortId = favResort.id;
        }
      });
    });
    axios.get("/resorts/" + this.$route.params.id).then((response) => {
      this.resort = response.data;
      this.resortName = this.resort.name;
      this.events = this.resort.events;
      this.conditions_reports = this.resort.conditions_reports.reverse();
      console.log(response.data);
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          this.resort.lat +
          "&lon=" +
          this.resort.long +
          "&appid=" +
          this.key +
          "&units=imperial"
      )
        .then(function (resp) {
          return resp.json();
        })
        .then((data) => {
          console.log(data);
          this.currentWeather = data.weather[0].description;
          this.currentWeatherIcon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
          this.currentTemp = data.main.temp;
          this.currentFeelsLike = data.main.feels_like;
        });
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          this.resort.lat +
          "&lon=" +
          this.resort.long +
          "&lang={en}&units=imperial&exclude=current,minutely,hourly,alerts&appid=" +
          this.key
      )
        .then(function (resp) {
          return resp.json();
        })
        .then((data) => {
          console.log(data);
          this.forecast = data;
          for (let index = 0; index < 3; index++) {
            if (index === 0) {
              this.forecastDayOne = this.forecast.daily[index];
              let unixTimestamp = this.forecastDayOne.dt;
              this.forecastDayOneDate = new Date(unixTimestamp * 1000);
              this.forecastDayOneDate = this.forecastDayOneDate.getDay();
              this.forecastDayOneDate = this.forecastDay(this.forecastDayOneDate);
            } else if (index === 1) {
              this.forecastDayTwo = this.forecast.daily[index];
              let unixTimestamp = this.forecastDayTwo.dt;
              this.forecastDayTwoDate = new Date(unixTimestamp * 1000);
              this.forecastDayTwoDate = this.forecastDayTwoDate.getDay();
              this.forecastDayTwoDate = this.forecastDay(this.forecastDayTwoDate);
            } else if (index === 2) {
              this.forecastDayThree = this.forecast.daily[index];
              let unixTimestamp = this.forecastDayThree.dt;
              this.forecastDayThreeDate = new Date(unixTimestamp * 1000);
              this.forecastDayThreeDate = this.forecastDayThreeDate.getDay();
              this.forecastDayThreeDate = this.forecastDay(this.forecastDayThreeDate);
            }
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
    forecastDay(integer) {
      if (integer === 1) {
        return "Monday";
      } else if (integer === 2) {
        return "Tuesday";
      } else if (integer === 3) {
        return "Wednesday";
      } else if (integer === 4) {
        return "Thursday";
      } else if (integer === 5) {
        return "Friday";
      } else if (integer === 6) {
        return "Saturday";
      } else {
        return "Sunday";
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
              <img v-bind:src="currentWeatherIcon" />
              Currently:
              <b>{{ currentWeather }}</b>
              <br />
              Temp:
              <strong>{{ Math.round(currentTemp) }}&deg;</strong>
              , Feels like:
              <strong>{{ Math.round(currentFeelsLike) }}&deg;</strong>

              <p></p>
              <span class="section-heading-lower"><h3>3 Day Forecast</h3></span>
              {{ this.forecastDayOneDate }}:
              <strong>{{ forecastDayOne.weather[0].description }},</strong>
              Temps:
              <strong>{{ Math.round(forecastDayOne.temp.max) }}&deg;</strong>
              /
              <strong>{{ Math.round(forecastDayOne.temp.min) }}&deg;</strong>
              <br />
              {{ this.forecastDayTwoDate }}:
              <strong>{{ forecastDayTwo.weather[0].description }},</strong>
              Temps:
              <strong>{{ Math.round(forecastDayTwo.temp.max) }}&deg;</strong>
              /
              <strong>{{ Math.round(forecastDayTwo.temp.min) }}&deg;</strong>
              <br />
              {{ this.forecastDayThreeDate }}:
              <strong>{{ forecastDayThree.weather[0].description }},</strong>
              Temps:
              <strong>{{ Math.round(forecastDayThree.temp.max) }}&deg;</strong>
              /
              <strong>{{ Math.round(forecastDayThree.temp.min) }}&deg;</strong>
              <br />
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
                <star-rating
                  :rating="conditions_report.rating"
                  :show-rating="false"
                  :star-size="30"
                  :read-only="true"
                ></star-rating>
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
