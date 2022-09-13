import { createApp } from "vue";
import App from "./App.vue";

import "./css/main.css";

// router dùng để điều hướng trang trong ứng dụng vueJS
import router from "./router/router.js";

// store dùng để quản lý state trong ứng dụng vueJS
import store from "./store/store.js";

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
// dùng vue router
app.use(router);
// dùng vuex state management
app.use(store);
// mount vào body
app.mount("#app");
