<template lang="">
  <div class="input">
    <div v-if="hasLabel" class="input__label">
      {{ labelText }}
      <span v-if="showAlertStar" :class="MISAEnum.input.LabelAlert">*</span>
    </div>
    <div class="input__warp">
      <input
        type="text"
        class="input__field"
        autocomplete="off"
        :propName="propName"
        :validate="validate"
        :just-number="justNumber"
        :format-date="formatDate"
        :id="idInput"
        :class="[
          hasItalic === true ? MISAEnum.input.Italic : '',
          hasAlert === true ? MISAEnum.input.InputAlert : '',
          classInput,
        ]"
        :placeholder="placeHolder"
        :data-title="dataTitle"
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
    "showAlertStar",
    "inputAlert",
    "labelText",
    "hasIcon",
    "placeHolder",
    "hasLabel",
    "hasAlert",
    "hasItalic",
    "propName",
    "validate",
    "classInput",
    "idInput",
    "dataTitle",
    "justNumber",
    "formatDate",
  ],
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/input.css");
</style>
