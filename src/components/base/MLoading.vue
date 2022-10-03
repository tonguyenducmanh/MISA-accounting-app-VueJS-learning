<template lang="">
  <div class="loading"></div>
</template>
<script>
export default {
  name: "MLoading",
};
</script>
<style scoped>
.loading {
  width: 32px;
  height: 32px;
}
.loading::before {
  width: 32px;
  height: 32px;
  position: absolute;
  content: "";
  background-image: url("@/assets/loading.svg");
  background-position: center;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
