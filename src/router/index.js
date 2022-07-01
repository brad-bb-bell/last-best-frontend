import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ResortView from "../views/ResortView.vue";
import EventView from "../views/EventView.vue";
import EventIndex from "../views/EventIndex.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import ProfileView from "../views/ProfileView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/resorts/:id",
    name: "resorts-show",
    component: ResortView,
  },
  {
    path: "/events/:id",
    name: "events-show",
    component: EventView,
  },
  {
    path: "/events/",
    name: "events-index",
    component: EventIndex,
  },
  {
    path: "/signup/",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout/",
    name: "logout",
    component: LogoutView,
  },
  {
    path: "/users/:id",
    name: "profile",
    component: ProfileView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
