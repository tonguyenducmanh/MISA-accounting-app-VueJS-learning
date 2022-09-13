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
        :data="MISAEnum.combobox.data"
        placeHolder="Hãy chọn số trang"
        :defaultValue="MISAEnum.combobox.defautValue"
        :unique="MISAEnum.combobox.unique"
        :isUp="true"
        @change-size="changeSize"
      />
      <div class="page__number">
        <div tabindex="0" class="page__prev" @click="movePrevPage">Trước</div>
        <template v-for="index in totalPage" :key="index">
          <div
            tabindex="0"
            class="page__count"
            :class="index === pageNumber ? 'page__count--selected' : ''"
            @click="selectThisPage(index)"
          >
            {{ index }}
          </div>
        </template>
        <!-- <div tabindex="0" class="page__count page__count--selected">1</div>
        <div tabindex="0" class="page__count">2</div>
        <div tabindex="0" class="page__count">3</div>
        <div class="page__count">...</div>
        <div tabindex="0" class="page__count">{{ totalPage }}</div> -->
        <div tabindex="0" class="page__next" @click="moveNextPage">Sau</div>
      </div>
    </div>
  </div>
</template>
<script>
import MISAEnum from "../../js/enum.js";
import LibCombobox from "../../lib/combobox/components/LibCombobox.vue";
export default {
  name: "EmployeePage",
  components: {
    LibCombobox,
  },
  props: ["totalRecords", "currentPage"],
  data() {
    return {
      pageSize: 10,
      MISAEnum,
    };
  },
  computed: {
    totalPage() {
      return this.$store.state.totalPage;
    },
    pageNumber() {
      return this.$store.state.pageNumber;
    },
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
    /**
     * Di chuyển về page trước bằng cách dispatch số trang mới lên store
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    movePrevPage() {
      this.$store.dispatch("movePrevPage");
    },
    /**
     * Di chuyển về page trước bằng cách dispatch số trang mới lên store
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    moveNextPage() {
      this.$store.dispatch("moveNextPage");
    },
    /**
     * chuyển qua page đã chọn
     * @param {number} value - số trang muốn chuyển.
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    selectThisPage(value) {
      try {
        this.$store.dispatch("changeCurrentPage", value);
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
