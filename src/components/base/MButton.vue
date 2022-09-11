<template lang="">
  <button
    tabindex="0"
    :class="buttonTwo ? MISAEnum.button.Secondary : MISAEnum.button.Primary"
    :data-title="dataTitle !== '' ? dataTitle : false"
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
  props: ["buttonTwo", "buttonName", "dataTitle"],
};
</script>
<style scoped>
@import url("../../css/base/button.css");
</style>
