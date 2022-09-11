<template lang="">
  <div class="navbar">
    <div class="navbar__top">
      <div tabindex="0" class="icon navbar__button"></div>
      <div class="navbar__logo"></div>
      <div tabindex="0" class="navbar__title" data-title="Về trang chủ">
        Kế toán
      </div>
    </div>
    <div class="navbar__list">
      <MRouterLink name="Tổng quan" link="/demo" className="navbar__tq" />
      <MRouterLink name="Tiền mặt" link="/" className="navbar__tm" />
      <MRouterLink name="Tiền gửi" link="/tiengui" className="navbar__tg" />
      <MRouterLink name="Mua hàng" link="/muahang" className="navbar__mh" />
      <MRouterLink name="Bán hàng" link="/banhang" className="navbar__bh" />
      <MRouterLink
        name="Quản lý hóa đơn"
        link="/hoadon"
        className="navbar__qlhd"
      />
      <MRouterLink name="Kho" link="/kho" className="navbar__k" />
      <MRouterLink
        name="Công cụ dụng cụ"
        link="/congcu"
        className="navbar__ccdc"
      />
      <MRouterLink
        name="Tài sản cố định"
        link="/taisancodinh"
        className="navbar__tscd"
      />
      <MRouterLink name="Thuế" link="/thue" className="navbar__thue" />
      <MRouterLink name="Giá thành" link="/giathanh" className="navbar__gt" />
      <MRouterLink name="Tổng hợp" link="/tonghop" className="navbar__th" />
      <MRouterLink name="Ngân sách" link="/ngansach" className="navbar__ns" />
      <MRouterLink name="Báo cáo" link="/baocao" className="navbar__bc" />
      <MRouterLink
        name="Phân tích tài chính"
        link="/taichinh"
        className="navbar__pttc"
      />
    </div>
  </div>
</template>
<script>
import MRouterLink from "../base/MRouterLink.vue";
export default {
  name: "TheNavbar",
  components: {
    MRouterLink,
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
</style>
