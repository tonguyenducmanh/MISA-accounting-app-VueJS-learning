<template lang="">
  <div class="employee__top">
    <div class="employee__label">Nhân viên</div>
    <MButton
      buttonName="Thêm mới nhân viên"
      class="employee__addbtn"
      id="employee__addbtn"
      dataTitle="Nhấn Ctrl + Shift + A để thêm nhanh"
    />
  </div>
</template>
<script>
import MButton from "../../components/base/MButton.vue";
export default {
  name: "EmployeeHeader",
  components: {
    MButton,
  },
};
</script>
<style scoped>
.employee__top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding-bottom: 16px;
}

.employee__top .employee__label {
  font-weight: 600;
  font-size: 20px;
}
</style>
