<template lang="">
  <div class="datepicker">
    <div class="datepicker__label">{{ labelText }}</div>
    <input type="date" class="datepicker__input" placeholder="DD/MM/YYYY" />
  </div>
</template>
<script>
export default {
  name: "MDatePicker",
  data() {
    return {};
  },
  props: ["labelText"],
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/datepicker.css");
</style>
