<template lang="">
  <LibCombobox
    id="cbxDepartment"
    class="input__mushave"
    dataTitle="Đây là data title"
    placeHolder="Đây là placeholder"
    text="DepartmentName"
    value="DepartmentId"
  />
</template>
<script>
import LibCombobox from "./components/LibCombobox.vue";
export default {
  name: "comboboxTest",
  components: {
    LibCombobox,
  },
};
</script>
<style lang=""></style>
