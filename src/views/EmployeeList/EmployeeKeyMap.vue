<template lang="">
  <!-- component keymap để hiển thị danh sách phím tắt -->
  <div class="keymap__container">
    <div class="keymap">
      <!-- nút x có tác dụng đóng component -->
      <div
        class="icon keymap__closebtn keymap__cancel"
        :data-title="MISAResource.DataTile.FormCloseBtn[getLanguage]"
        @click="$emit('hide-key-map')"
      ></div>
      <!-- tiêu đề của component -->
      <div class="keymap__title">
        {{ this.MISAResource.KeyMap.KeyMapPopup[getLanguage] }}
      </div>
      <div class="keymap__body">
        <!-- cột điều hướng -->
        <div class="keymap__column">
          <div class="keymap__name">
            {{ this.MISAResource.KeyMap.NavigationName[getLanguage] }}
          </div>
          <div class="keymap__list">
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.QuickSearch[getLanguage]"
              buttonOne="Ctrl"
              buttonTwo="F3"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.PreviousListPage[getLanguage]"
              buttonOne="Ctrl"
              buttonTwo="←"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.NextListPage[getLanguage]"
              buttonOne="Ctrl"
              buttonTwo="→"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.ClosePopup[getLanguage]"
              buttonOne="ESC"
            />
          </div>
        </div>
        <!-- cột nhập liệu -->
        <div class="keymap__column">
          <div class="keymap__name">
            {{ this.MISAResource.KeyMap.Typing[getLanguage] }}
          </div>
          <div class="keymap__list">
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Insert[getLanguage]"
              buttonOne="Insert"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Edit[getLanguage]"
              buttonOne="F2"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Delete[getLanguage]"
              buttonOne="Delete"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Save[getLanguage]"
              buttonOne="Ctrl"
              buttonTwo="F8"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.SaveAndAdd[getLanguage]"
              buttonOne="Ctrl Shift"
              buttonTwo="F8"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Cancel[getLanguage]"
              buttonOne="Ctrl"
              buttonTwo="F9"
            />
          </div>
        </div>
        <!-- cột tìm kiếm -->
        <div class="keymap__column">
          <div class="keymap__name">
            {{ this.MISAResource.KeyMap.Other[getLanguage] }}
          </div>
          <div class="keymap__list">
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Reload[getLanguage]"
              buttonOne="Alt"
              buttonTwo="R"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.Export[getLanguage]"
              buttonOne="Ctrl"
              buttonTwo="Q"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.ChangeLanguage[getLanguage]"
              buttonOne="Alt"
              buttonTwo="L"
            />
            <MKeyMapItem
              :keyMapName="MISAResource.KeyMap.ToggleKeyMap[getLanguage]"
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
};
</script>
<style scoped>
@import url("../../css/page/employee/employeeKeyMap.css");
</style>
