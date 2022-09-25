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
        <!-- render ra danh sách trang nhưng giới hạn số trang có thể click -->
        <!-- trang đầu tiên -->
        <div
          tabindex="0"
          class="page__count"
          :class="1 === pageNumber ? 'page__count--selected' : ''"
          @click="selectThisPage(1)"
        >
          1
        </div>
        <template v-if="totalPage > 2">
          <!-- dấu ... ngăn cách nếu không phải dãy số hơn kém nhau 1 đơn vị -->
          <div v-if="pageNumber - 2 > 1">...</div>
          <!-- trang trước trang đang chọn nếu có -->
          <div
            v-if="pageNumber - 1 > 1"
            tabindex="0"
            class="page__count"
            @click="selectThisPage(pageNumber - 1)"
          >
            {{ pageNumber - 1 }}
          </div>
          <!-- trang đang chọn nếu có -->
          <div
            v-if="
              pageNumber !== 1 && pageNumber !== totalPage && pageNumber !== 0
            "
            tabindex="0"
            class="page__count"
            :class="'page__count--selected'"
            @click="selectThisPage(pageNumber)"
          >
            {{ pageNumber }}
          </div>
          <!-- trang sau trang đang chọn nếu có -->
          <div
            v-if="pageNumber + 1 < totalPage"
            tabindex="0"
            class="page__count"
            @click="selectThisPage(pageNumber + 1)"
          >
            {{ pageNumber + 1 }}
          </div>
          <!-- dấu ... ngăn cách nếu không phải dãy số hơn kém nhau 1 đơn vị -->
          <div v-if="pageNumber + 2 < totalPage">...</div>
        </template>
        <!-- trang cuối -->
        <div
          tabindex="0"
          v-if="totalPage !== 1 && pageNumber !== 0"
          class="page__count"
          :class="totalPage === pageNumber ? 'page__count--selected' : ''"
          @click="selectThisPage(totalPage)"
        >
          {{ totalPage }}
        </div>
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
