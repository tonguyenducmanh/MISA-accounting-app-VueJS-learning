<template lang="">
  <div class="input">
    <div v-if="hasLabel" class="input__label">
      {{ labelText }}
      <span
        v-if="hasAlert"
        :class="hasAlert === true ? MISAEnum.input.LabelAlert : ''"
        >*</span
      >
    </div>
    <div class="input__warp">
      <input
        type="text"
        class="input__field"
        :class="[
          hasItalic === true ? MISAEnum.input.Italic : '',
          hasAlert === true ? MISAEnum.input.InputAlert : '',
        ]"
        :placeholder="placeHolder"
      />
      <span v-if="hasIcon" class="icon input__icon"></span>
    </div>
  </div>
</template>
<script>
// import js files
import MISAEnum from "../../js/enum.js";

export default {
  name: "MInput",
  data() {
    return {
      MISAEnum,
    };
  },
  props: [
    "inputAlert",
    "labelText",
    "hasIcon",
    "placeHolder",
    "hasLabel",
    "hasAlert",
    "hasItalic",
  ],
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/input.css");
</style>
