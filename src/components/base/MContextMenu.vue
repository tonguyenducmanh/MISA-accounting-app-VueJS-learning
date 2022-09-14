<template lang="">
  <div class="contextmenu">
    <div class="contextmenu__main">
      <div class="contextmenu__button" @click="$emit('edit-click')">Sửa</div>
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
          <div
            class="contextmenu__item"
            :value="deleteId"
            @click="$emit('duplicate-click', deleteId)"
          >
            Nhân bản
          </div>
          <div
            class="contextmenu__item"
            :value="deleteId"
            @click="$emit('delete-id', deleteId, deleteName)"
          >
            Xóa
          </div>
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
    };
  },
  props: ["deleteId", "deleteName", "hasUp"],
  emits: ["delete-id", "edit-click", "duplicate-click"],
  methods: {
    /**
     * thay đổi trạng thái của context
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    tableContext() {
      try {
        this.hasOpen = !this.hasOpen;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * ẩn context khi click ra ngoài
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    hideContext() {
      try {
        this.hasOpen = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/contextmenu.css");
</style>
