<template lang="">
  <div class="navbar">
    <div class="navbar__top">
      <div tabindex="0" class="icon navbar__button"></div>
      <div class="navbar__logo"></div>
      <div
        tabindex="0"
        class="navbar__title"
        :data-title="MISAResource.DataTile.GoHome[language]"
      >
        Kế toán
      </div>
    </div>
    <div class="navbar__list">
      <MRouterLink
        name="Tổng quan"
        link="/demo"
        className="navbar__tq"
        @keydown.enter="simulateClick"
        tabindex="0"
      />
      <MRouterLink
        name="Tiền mặt"
        link="/"
        className="navbar__tm"
        tabindex="0"
      />
      <MRouterLink
        name="Tiền gửi"
        link="/tiengui"
        className="navbar__tg"
        tabindex="0"
      />
      <MRouterLink
        name="Mua hàng"
        link="/muahang"
        className="navbar__mh"
        tabindex="0"
      />
      <MRouterLink
        name="Bán hàng"
        link="/banhang"
        className="navbar__bh"
        tabindex="0"
      />
      <MRouterLink
        name="Quản lý hóa đơn"
        link="/hoadon"
        className="navbar__qlhd"
      />
      <MRouterLink name="Kho" link="/kho" className="navbar__k" tabindex="0" />
      <MRouterLink
        name="Công cụ dụng cụ"
        link="/congcu"
        className="navbar__ccdc"
        tabindex="0"
      />
      <MRouterLink
        name="Tài sản cố định"
        link="/taisancodinh"
        className="navbar__tscd"
        tabindex="0"
      />
      <MRouterLink
        name="Thuế"
        link="/thue"
        className="navbar__thue"
        tabindex="0"
      />
      <MRouterLink
        name="Giá thành"
        link="/giathanh"
        className="navbar__gt"
        tabindex="0"
      />
      <MRouterLink
        name="Tổng hợp"
        link="/tonghop"
        className="navbar__th"
        tabindex="0"
      />
      <MRouterLink
        name="Ngân sách"
        link="/ngansach"
        className="navbar__ns"
        tabindex="0"
      />
      <MRouterLink
        name="Báo cáo"
        link="/baocao"
        className="navbar__bc"
        tabindex="0"
      />
      <MRouterLink
        name="Phân tích tài chính"
        link="/taichinh"
        className="navbar__pttc"
        tabindex="0"
      />
    </div>
  </div>
</template>
<script>
import MRouterLink from "../base/MRouterLink.vue";
import MISAResource from "../../js/resource.js";

export default {
  name: "TheNavbar",
  components: {
    MRouterLink,
  },

  data() {
    return {
      MISAResource,
      language: "",
    };
  },
  beforeMount() {
    this.language = this.$store.state.language;
  },
  methods: {
    simulateClick() {
      this.click();
    },
  },
};
</script>
<style>
@import url("../../css/base/icon.css");
@import url("../../css/layout/navbar.css");
/* phần dưới để test vue router */
.link {
  padding: 20px;
}
a {
  color: white;
  text-transform: uppercase;
}

.router-link-active {
  background-color: var(--ColorSecondaryText);
}

.router-link-active .icon::before {
  filter: brightness(0) invert(100%);
}
.router-link-active:hover {
  background-color: var(--ColorSecondaryText) !important;
}
.router-link-active::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 100%;
  background-color: var(--LightGreen500) !important;
  content: "";
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
