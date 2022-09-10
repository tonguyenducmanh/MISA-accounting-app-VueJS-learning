<template lang="">
  <button :class="buttonClass">Button</button>
</template>
<script>
export default {
  name: "MButton",
  props: ["buttonClass"],
};
</script>
<style scoped>
@import url("../../css/base/button.css");
</style>
