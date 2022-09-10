<template lang="">
  <div class="contextmenu">
    <div class="contextmenu__main">
      <div class="contextmenu__button">Sửa</div>
      <div
        class="contextmenu__dropicon"
        :class="hasOpen === true ? MISAEnum.contextMenu.SHOW : ''"
      >
        <div
          class="contextmenu__menu"
          :class="hasUp === true ? MISAEnum.contextMenu.UP : ''"
        >
          <div class="contextmenu__item">Nhân bản</div>
          <div class="contextmenu__item">Xóa</div>
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
    };
  },
  props: ["hasOpen", "hasUp"],
  methods: {},
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/contextmenu.css");
</style>
