<template lang="">
  <div class="keymap__container">
    <div class="keymap">
      <div
        class="icon keymap__closebtn keymap__cancel"
        :data-title="MISAResource.DataTile.FormCloseBtn[language]"
        @click="$emit('hide-key-map')"
      ></div>
      <div class="keymap__title">
        {{ this.MISAResource.KeyMap.KeyMapPopup[language] }}
      </div>
      <div class="keymap__body">
        <!-- cột điều hướng -->
        <div class="keymap__column">
          <div class="keymap__name">
            {{ this.MISAResource.KeyMap.NavigationName[language] }}
          </div>
          <div class="keymap__list">
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.QuickSearch[language]"
              buttonOne="Ctrl"
              buttonTwo="F3"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.PreviousListPage[language]"
              buttonOne="Ctrl"
              buttonTwo="←"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.NextListPage[language]"
              buttonOne="Ctrl"
              buttonTwo="→"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.ClosePopup[language]"
              buttonOne="ESC"
            />
          </div>
        </div>
        <!-- cột nhập liệu -->
        <div class="keymap__column">
          <div class="keymap__name">
            {{ this.MISAResource.KeyMap.Typing[language] }}
          </div>
          <div class="keymap__list">
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Insert[language]"
              buttonOne="Insert"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Edit[language]"
              buttonOne="F2"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Delete[language]"
              buttonOne="Delete"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Save[language]"
              buttonOne="Ctrl"
              buttonTwo="F8"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Cancel[language]"
              buttonOne="Ctrl"
              buttonTwo="F9"
            />
          </div>
        </div>
        <!-- cột tìm kiếm -->
        <div class="keymap__column">
          <div class="keymap__name">
            {{ this.MISAResource.KeyMap.Other[language] }}
          </div>
          <div class="keymap__list">
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Reload[language]"
              buttonOne="Alt"
              buttonTwo="R"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Export[language]"
              buttonOne="Alt"
              buttonTwo="E"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.ChangeLanguage[language]"
              buttonOne="Alt"
              buttonTwo="L"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.ToggleKeyMap[language]"
              buttonOne="Ctrl"
              buttonTwo="/"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MISAResource from "../../js/resource.js";
import MKeyMapItem from "../../components/base/MKeyMapItem.vue";

export default {
  name: "EmployeeKeyMap",
  components: {
    MKeyMapItem,
  },
  emits: ["hide-key-map"],
  data() {
    return {
      MISAResource,
      language: "",
    };
  },
  beforeMount() {
    this.language = this.$store.state.language;
  },
  computed: {
    /**
     * Lấy ra giá trị của ngôn ngữ hiện tại
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    getLanguage() {
      return this.$store.state.language;
    },
  },
  watch: {
    /**
     * Lấy ra giá trị của ngôn ngữ hiện tại
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    getLanguage() {
      this.language = this.$store.state.language;
    },
  },
};
</script>
<style scoped>
@import url("../../css/page/employee/employeeKeyMap.css");
</style>
