<template lang="">
  <button
    :class="buttonTwo ? MISAEnum.button.Secondary : MISAEnum.button.Primary"
  >
    {{ buttonName }}
  </button>
</template>
<script>
// import js files
import MISAEnum from "../../js/enum.js";

export default {
  name: "MButton",
  data() {
    return {
      MISAEnum,
    };
  },
  props: ["buttonTwo", "buttonName"],
};
</script>
<style scoped>
@import url("../../css/base/button.css");
</style>
