<script>
import TheContent from "./components/layout/TheContent.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import TheNavbar from "./components/layout/TheNavbar.vue";
export default {
  components: {
    TheContent,
    TheHeader,
    TheNavbar,
  },
};
</script>

<template>
  <div class="container">
    <the-navbar></the-navbar>
    <div class="main">
      <the-header></the-header>
      <the-content>
        <router-view></router-view>
      </the-content>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100%;
  width: 100%;
}

.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
