<template lang="">
  <div class="header">
    <div class="header__left">
      <div
        tabindex="0"
        class="icon header__menubtn"
        data-title="Ẩn hiện menu"
      ></div>
      <div
        class="header__name"
        data-title="Công ty tnhh sản xuất - thương mại - dịch vụ qui phúc"
      >
        Công ty tnhh sản xuất - thương mại - dịch vụ qui phúc
      </div>
      <div
        tabindex="0"
        class="icon header__dropicon"
        data-title="Công ty tnhh sản xuất - thương mại - dịch vụ qui phúc"
      ></div>
    </div>
    <div class="header__right">
      <div tabindex="0" class="icon header__noti" data-title="Thông báo"></div>
      <div class="header__account">
        <div tabindex="0" class="header__avatar"></div>
        <div class="header__name">Tô Nguyễn Đức Mạnh</div>
        <div tabindex="0" class="icon header__drop"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheHeader",
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/layout/header.css");
</style>
