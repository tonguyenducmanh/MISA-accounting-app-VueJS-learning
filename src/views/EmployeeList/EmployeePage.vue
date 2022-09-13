<template lang="">
  <div class="page__navi">
    <div class="page__total">
      <span>Tổng số: </span>
      <span class="page__records">{{ totalRecords }}</span>
      <span>bản ghi</span>
    </div>
    <div class="page__categories">
      <LibCombobox
        id="page_ranges"
        classInput="input__field"
        propName="PageNavigation"
        data="10 bản ghi trên trang:10;20 bản ghi trên trang:20;50 bản ghi trên trang: 50;100 bản ghi trên trang:100"
        placeHolder="Hãy chọn số trang"
        defaultValue="10 bản ghi trên trang"
        unique="10"
        :isUp="true"
        @change-size="changeSize"
      />
      <div class="page__number">
        <div tabindex="0" class="page__prev page__number--disable">Trước</div>
        <div tabindex="0" class="page__count page__count--selected">1</div>
        <div tabindex="0" class="page__count">2</div>
        <div tabindex="0" class="page__count">3</div>
        <div class="page__count">...</div>
        <div tabindex="0" class="page__count">{{ totalPage }}</div>
        <div tabindex="0" class="page__next">Sau</div>
      </div>
    </div>
  </div>
</template>
<script>
import LibCombobox from "../../lib/combobox/components/LibCombobox.vue";
export default {
  name: "EmployeePage",
  components: {
    LibCombobox,
  },
  props: ["totalRecords", "totalPage", "currentPage"],
  data() {
    return {
      pageSize: 10,
    };
  },
  /**
   * Bất cứ khi nào pageSize thay đổi thì gọi $emits 1 hành động nào đó từ bậc cao hơn
   * hiểu rằng component này chỉ là hành động trung gian thôi
   * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
   */
  watch: {
    pageSize() {
      try {
        this.$emit("change-size", this.pageSize);
      } catch (error) {
        console.log(error);
      }
    },
  },
  emits: ["change-size"],
  methods: {
    /**
     * chọn số lượng trang và load lại trang với số lượng đó
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    changeSize(value) {
      try {
        this.pageSize = value;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import url("../../css/page/employee/employeePage.css");
</style>
