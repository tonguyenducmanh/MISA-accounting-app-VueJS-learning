<template lang="">
  <div class="contextmenu">
    <div class="contextmenu__main">
      <div
        class="contextmenu__button"
        @click="$emit('edit-click')"
        tabindex="0"
        @keydown.enter="$emit('edit-click')"
      >
        {{ this.btnName }}
      </div>
      <div
        class="contextmenu__dropicon"
        v-click-out.self="hideContext"
        @click="tableContext"
        tabindex="0"
        @keydown.enter="tableContext"
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
            @click="
              enableClone();
              $emit('duplicate-click', deleteId);
            "
            @keydown.enter="
              enableClone();
              $emit('duplicate-click', deleteId);
            "
            tabindex="0"
          >
            {{ btnOne }}
          </div>
          <div
            class="contextmenu__item"
            :value="deleteId"
            @click="$emit('delete-id', deleteId, deleteName)"
            @keydown.enter="$emit('delete-id', deleteId, deleteName)"
            tabindex="0"
          >
            {{ btnTwo }}
          </div>
          <div class="contextmenu__item" tabindex="0">{{ btnThree }}</div>
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
  props: [
    "deleteId",
    "deleteName",
    "hasUp",
    "btnName",
    "btnOne",
    "btnTwo",
    "btnThree",
  ],
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
    /**
     * thay đổi trạng thái sang nhân bản
     * Author: Tô Nguyễn Đức Mạnh (04/10/2022)
     */
    enableClone() {
      try {
        this.$store.dispatch("changeStatusClone", true);
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
