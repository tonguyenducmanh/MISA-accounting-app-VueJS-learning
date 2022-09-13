<template lang="">
  <div class="employee__top">
    <div class="employee__label">Nhân viên</div>
    <MButton
      v-if="showTest"
      buttonName="Test state management"
      @click="testStore"
    />
    <MButton
      buttonName="Thêm mới nhân viên"
      class="employee__addbtn"
      id="employee__addbtn"
      dataTitle="Nhấn Ctrl + Shift + A để thêm nhanh"
      @click="
        postMethod();
        $emit('show-form');
      "
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
  emits: ["show-form"],
  data() {
    return {
      showTest: false,
    };
  },
  methods: {
    /**
     * Phương thức được dùng để test State Management
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    testStore() {
      console.log(this.$store.state.count);
      this.$store.dispatch("increment");
    },
    /**
     * Thay đổi method sang POST
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    postMethod() {
      this.$store.dispatch("changeMethod", "POST");
    },
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
