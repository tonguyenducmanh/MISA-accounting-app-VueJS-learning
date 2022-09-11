<template lang="">
  <router-link :to="link" tabindex="0" class="navbar__item" :data-title="name">
    <div class="icon" :class="className"></div>
    <div class="navbar__itemcontent">{{ name }}</div>
  </router-link>
</template>
<script>
export default {
  name: "MRouterLink",
  props: ["name", "link", "className"],
};
</script>
<style lang=""></style>
