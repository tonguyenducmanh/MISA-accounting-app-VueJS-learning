import { createApp } from "vue";
import App from "./App.vue";

import "./css/main.css";
import router from "./router/index.js";
const app = createApp(App);

/**
 * Dựng hàm click ra bên ngoài dùng dạng directive
 */
const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};
// đặt tên cho v-click-out
app.directive("clickOut", clickOutside);
// dùng view router
app.use(router);
// mount vào body
app.mount("#app");
