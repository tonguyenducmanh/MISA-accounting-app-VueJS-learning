import { createRouter, createWebHistory } from "vue-router";

import DemoList from "../views/DemoList.vue";
import EmployeeList from "../views/EmployeeList.vue";
import comboboxTest from "../lib/combobox/comboboxTest.vue";
import NotFound from "../views/NotFound.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // link demo các component có trong trang web
      path: "/demo",
      component: DemoList,
    },
    {
      // link trang chính
      path: "/",
      component: EmployeeList,
    },
    {
      // link test thư viện combobox
      path: "/combobox",
      component: comboboxTest,
    },
    {
      // link các trang không tồn tại tới component notfound
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
