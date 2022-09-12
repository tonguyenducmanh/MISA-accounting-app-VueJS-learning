<template lang="">
  <div class="contextmenu">
    <div class="contextmenu__main">
      <div class="contextmenu__button">Sửa</div>
      <div
        class="contextmenu__dropicon"
        v-click-out.self="hideContext"
        @click="tableContext"
        :class="hasOpen === true ? MISAEnum.contextMenu.SHOW : ''"
      >
        <div
          v-if="hasOpen"
          class="contextmenu__menu"
          :class="hasUp === true ? MISAEnum.contextMenu.UP : ''"
        >
          <div class="contextmenu__item">Nhân bản</div>
          <div class="contextmenu__item" :value="deleteValue">Xóa</div>
          <div class="contextmenu__item">Ngưng sử dụng</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import js files
import MISAEnum from "../../js/enum.js";
export default {
  name: "MConntextMenu",
  data() {
    return {
      MISAEnum,
      hasOpen: false,
      hasUp: false,
    };
  },
  props: ["deleteValue"],
  methods: {
    /**
     * thay đổi trạng thái của context
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    tableContext() {
      this.hasOpen = !this.hasOpen;
    },
    /**
     * ẩn context khi click ra ngoài
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    hideContext() {
      this.hasOpen = false;
    },
  },
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/contextmenu.css");
</style>
