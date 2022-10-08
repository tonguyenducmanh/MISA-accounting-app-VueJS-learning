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
        {{ this.MISAResource.RouterName.Accounting[language] }}
      </div>
    </div>
    <div class="navbar__list">
      <MRouterLink
        :name="MISAResource.RouterName.Demo[language]"
        link="/demo"
        className="navbar__tq"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Money[language]"
        link="/"
        className="navbar__tm"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.MoneySend[language]"
        link="/tiengui"
        className="navbar__tg"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Buy[language]"
        link="/muahang"
        className="navbar__mh"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Sell[language]"
        link="/banhang"
        className="navbar__bh"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.InvoiceManagement[language]"
        link="/hoadon"
        className="navbar__qlhd"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Directory[language]"
        link="/kho"
        className="navbar__k"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Tool[language]"
        link="/congcu"
        className="navbar__ccdc"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.FixedAsset[language]"
        link="/taisancodinh"
        className="navbar__tscd"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Tax[language]"
        link="/thue"
        className="navbar__thue"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Price[language]"
        link="/giathanh"
        className="navbar__gt"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Generic[language]"
        link="/tonghop"
        className="navbar__th"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Budget[language]"
        link="/ngansach"
        className="navbar__ns"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.Report[language]"
        link="/baocao"
        className="navbar__bc"
        tabindex="0"
      />
      <MRouterLink
        :name="MISAResource.RouterName.FinancialAnalysis[language]"
        link="/taichinh"
        className="navbar__pttc"
        tabindex="0"
      />
    </div>
    <div class="navbar__changelanguage" @click="changeLanguage">VI / EN</div>
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
  watch: {
    /**
     * Lấy ra giá trị của ngôn ngữ hiện tại
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    getLanguage() {
      this.language = this.$store.state.language;
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
        if (currentLang == "VI") {
          this.$store.dispatch("changeLanguage", "EN");
        } else {
          this.$store.dispatch("changeLanguage", "VI");
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
