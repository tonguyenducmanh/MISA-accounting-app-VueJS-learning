<template lang="">
  <div class="checkbox">
    <input type="checkbox" class="checkbox__button" :id="checkboxId" />
    <label tabindex="0" class="checkbox__label" :for="checkboxId">{{
      labelText
    }}</label>
  </div>
</template>
<script>
export default {
  name: "MCheckbox",
  props: ["labelText", "checkboxId"],
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/checkbox.css");
</style>
