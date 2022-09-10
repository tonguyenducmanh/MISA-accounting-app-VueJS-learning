<template lang="">
  <div class="notfound">
    <span class="notfound__404"> 404 not found </span>
    <span>Thành phần này đang được phát triển, vui lòng quay lại sau!</span>
  </div>
</template>
<script>
export default {
  name: "TheNotFound",
};
</script>
<style scoped>
.notfound {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
}
.notfound__404 {
  font-size: 100px;
  text-transform: uppercase;
}
</style>
