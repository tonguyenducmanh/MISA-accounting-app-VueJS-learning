import { createRouter, createWebHistory } from "vue-router";

import TheDemo from "../views/TheDemo.vue";
import TheEmployee from "../views/TheEmployee.vue";
import TheNotFound from "../views/TheNotFound.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // link demo các component có trong trang web
      path: "/demo",
      component: TheDemo,
    },
    {
      // link trang chính
      path: "/",
      component: TheEmployee,
    },
    {
      // link các trang không tồn tại tới component notfound
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: TheNotFound,
    },
  ],
});

export default router;
