<template lang="">
  <!-- phần chứa nội dung thay đổi khi click vào navbar -->
  <div class="content"><slot /></div>
</template>
<script>
export default {
  name: "TheContent",
};
</script>
<style scoped>
@import url("../../css/layout/content.css");
</style>
