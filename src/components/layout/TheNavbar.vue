<template lang="">
  <div class="navbar">
    <div class="link"><router-link to="/">Trang chủ</router-link></div>
    <div class="link"><router-link to="/demo">Trang demo</router-link></div>
    <div class="link"><router-link to="/khac">Trang khác</router-link></div>
    <div class="link"><router-link to="/khac">Trang khác</router-link></div>
    <div class="link"><router-link to="/khac">Trang khác</router-link></div>
    <div class="link"><router-link to="/khac">Trang khác</router-link></div>
    <div class="link"><router-link to="/khac">Trang khác</router-link></div>
  </div>
</template>
<script>
export default {
  name: "TheNavbar",
};
</script>
<style scoped>
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
