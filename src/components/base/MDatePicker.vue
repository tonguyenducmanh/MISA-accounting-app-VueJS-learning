<template lang="">
  <div class="datepicker">
    <div class="datepicker__label">{{ labelText }}</div>
    <input
      type="date"
      :propName="propName"
      class="datepicker__input"
      placeholder="DD/MM/YYYY"
      tabindex="0"
      :value="
        common.formatDate(this.modelValue, '-') != 'NaN-NaN-NaN'
          ? common.formatDate(this.modelValue, '-')
          : ''
      "
      @focusout="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<script>
import common from "../../js/common.js";
export default {
  name: "MDatePicker",
  data() {
    return {
      common,
    };
  },
  emits: ["update:modelValue"],
  props: ["labelText", "propName", "modelValue"],
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/datepicker.css");
</style>
