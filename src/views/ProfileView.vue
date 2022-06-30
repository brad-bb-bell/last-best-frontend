<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Profile Page",
      user: {},
    };
  },
  created: function () {
    axios.get("/users/" + this.$route.params.id).then((response) => {
      this.user = response.data;
      console.log(response.data);
    });
  },
  methods: {},
};
</script>

<template>
  <div class="profile">
    <h1>{{ user.username }}</h1>
  </div>
  home resort: {{ user.home_resort_id }}
</template>

<style></style>
