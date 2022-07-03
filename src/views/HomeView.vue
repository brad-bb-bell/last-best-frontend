<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Last Best Ski Resort App",
      resorts: [],
      user: {},
      newConditionsReport: {},
      onChange(resort) {
        console.log(resort);
      },
      // homeResort: "",
      // homeResortLogo: "",
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
        console.log("Resorts", response.data);
        // var homeResortIndex = this.user.home_resort_id - 1;
        // this.homeResort = this.resorts[homeResortIndex].name;
        // this.homeResortLogo = this.resorts[homeResortIndex].logo;
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
      axios.post("/conditions_reports", this.newConditionsReport).then((response) => {
        console.log("Success", response.data);
        this.$router.push("/");
      });
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
  </div>

  <div v-for="resort in resorts" v-bind:key="resort.id">
    <h2>
      <a v-on:click="showResort(resort.id)">{{ resort.name }}</a>
    </h2>
    <p>Opening Day: {{ resort.opening_day }}</p>
  </div>

  <dialog id="conditions-report">
    <form method="dialog">
      <h1>How was it out there?</h1>
      <label for="resort">Resort:</label>
      <select name="resort" @change="onChange($event)">
        <option v-for="resort in resorts" v-bind:key="resort.id" value="resort">{{ resort.name }}</option>
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
