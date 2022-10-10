<template lang="">
  <!-- phần đầu của trang web -->
  <div class="header">
    <div class="header__left">
      <!-- icon menu -->
      <div
        tabindex="0"
        class="icon header__menubtn"
        :data-title="MISAResource.DataTile.HeaderMenuBtn[getLanguage]"
      ></div>
      <!-- tên công ty -->
      <div
        class="header__name"
        :data-title="MISAResource.DataTile.HeaderName[getLanguage]"
      >
        {{ this.MISAResource.TitleName.CompanyName[getLanguage] }}
      </div>
      <div
        tabindex="0"
        class="icon header__dropicon"
        :data-title="MISAResource.DataTile.HeaderName[getLanguage]"
      ></div>
    </div>
    <div class="header__right">
      <!-- nút thông báo -->
      <div
        tabindex="0"
        class="icon header__noti"
        :data-title="MISAResource.DataTile.HeaderNotiIcon[getLanguage]"
      ></div>
      <!-- tên tài khoản -->
      <div class="header__account">
        <div tabindex="0" class="header__avatar"></div>
        <div class="header__name">
          {{ this.MISAResource.AccountName[getLanguage] }}
        </div>
        <div tabindex="0" class="icon header__drop"></div>
      </div>
    </div>
  </div>
</template>
<script>
import MISAResource from "../../js/resource.js";
export default {
  name: "TheHeader",
  data() {
    return {
      MISAResource,
      language: "",
    };
  },
  beforeMount() {
    /**
     * Lấy ra giá trị của ngôn ngữ hiện tại
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
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
@import url("../../css/base/icon.css");
@import url("../../css/layout/header.css");
</style>
