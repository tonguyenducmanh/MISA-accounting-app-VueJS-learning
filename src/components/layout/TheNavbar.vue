<template lang="">
  <div class="navbar">
    <!-- phần tên ứng dụng -->
    <div class="navbar__top">
      <div tabindex="0" class="icon navbar__button"></div>
      <div class="navbar__logo"></div>
      <div
        tabindex="0"
        class="navbar__title"
        :data-title="MISAResource.DataTile.GoHome[getLanguage]"
      >
        {{ this.MISAResource.RouterName.Accounting[getLanguage] }}
      </div>
    </div>
    <!-- danh sách các đường link trong navbar -->
    <div class="navbar__list">
      <MRouterLink
        :name="MISAResource.RouterName.Demo[getLanguage]"
        link="/demo"
        className="navbar__tq"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Money[getLanguage]"
        link="/"
        className="navbar__tm"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.MoneySend[getLanguage]"
        link="/tiengui"
        className="navbar__tg"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Buy[getLanguage]"
        link="/muahang"
        className="navbar__mh"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Sell[getLanguage]"
        link="/banhang"
        className="navbar__bh"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.InvoiceManagement[getLanguage]"
        link="/hoadon"
        className="navbar__qlhd"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Directory[getLanguage]"
        link="/kho"
        className="navbar__k"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Tool[getLanguage]"
        link="/congcu"
        className="navbar__ccdc"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.FixedAsset[getLanguage]"
        link="/taisancodinh"
        className="navbar__tscd"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Tax[getLanguage]"
        link="/thue"
        className="navbar__thue"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Price[getLanguage]"
        link="/giathanh"
        className="navbar__gt"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Generic[getLanguage]"
        link="/tonghop"
        className="navbar__th"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Budget[getLanguage]"
        link="/ngansach"
        className="navbar__ns"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Report[getLanguage]"
        link="/baocao"
        className="navbar__bc"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.FinancialAnalysis[getLanguage]"
        link="/taichinh"
        className="navbar__pttc"
        tabindex="0"
      />
    </div>
    <div
      class="navbar__changelanguage"
      @click="changeLanguage"
      :data-title="MISAResource.DataTile.ChangeLanguage[getLanguage]"
    >
      VI / EN
    </div>
    <div class="navbar__keymap">
      {{ this.MISAResource.TitleName.ShowKeyMap[getLanguage] }}
    </div>
  </div>
</template>
<script>
import MRouterLink from "../base/MRouterLink.vue";
import MISAResource from "../../js/resource.js";
import MISAEnum from "../../js/enum.js";

export default {
  name: "TheNavbar",
  components: {
    MRouterLink,
  },
  data() {
    return {
      MISAResource,
      MISAEnum,
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
  methods: {
    /**
     * Thay đổi ngôn ngữ
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    changeLanguage() {
      try {
        let currentLang = this.$store.state.language;
        if (currentLang == this.MISAEnum.languageList.VI) {
          this.$store.dispatch("changeLanguage", this.MISAEnum.languageList.EN);
        } else {
          this.$store.dispatch("changeLanguage", this.MISAEnum.languageList.VI);
        }
      } catch (error) {
        console.log(error);
      }
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
