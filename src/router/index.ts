import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Exercises from "../views/Exercises.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Exercises",
    component: Exercises,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
