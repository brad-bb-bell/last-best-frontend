import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ResortView from "../views/ResortView.vue";
import EventView from "../views/EventView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
