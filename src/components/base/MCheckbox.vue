<template lang="">
  <div class="checkbox" :value="checkboxValue">
    <input
      type="checkbox"
      class="checkbox__button"
      :id="checkboxId"
      :checked="checkboxStatus"
      @click="$emit('click-check-box')"
    />
    <label
      v-if="labelText"
      tabindex="0"
      class="checkbox__label"
      :for="checkboxId"
      @click="$emit('click-label-box')"
      >{{ labelText }}</label
    >
  </div>
</template>
<script>
export default {
  name: "MCheckbox",
  emits: ["click-check-box", "click-label-box"],
  props: {
    labelText: String,
    checkboxId: String,
    checkboxValue: String,
    checkboxStatus: Boolean,
  },
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/checkbox.css");
</style>
