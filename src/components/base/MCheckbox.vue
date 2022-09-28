<template lang="">
  <div class="checkbox" :value="checkboxValue">
    <input
      type="checkbox"
      class="checkbox__button"
      :id="checkboxId"
      :checked="checkboxStatus"
    />
    <label tabindex="0" class="checkbox__label" :for="checkboxId">{{
      labelText
    }}</label>
  </div>
</template>
<script>
export default {
  name: "MCheckbox",
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
