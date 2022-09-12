<template lang="">
  <div class="table__wrap">
    <div class="table__wrap--loading table__wrap--hide"></div>
    <table class="table" id="table__employee">
      <thead>
        <tr>
          <!-- chèn th checkbox -->
          <th class="table__th table__thcheck">
            <MCheckbox class="checkbox" checkboxId="checkbox__all" />
          </th>
          <!-- render ra th dựa vào prop theadList -->
          <template v-for="(theaditem, index) in theadList" :key="index">
            <th
              :class="`text__align--${theaditem.align}`"
              :propName="theaditem.propName"
              :style="`width: ${theaditem.width}px`"
            >
              {{ theaditem.name }}
            </th>
          </template>
          <!-- render ra th chức năng, tách riêng với các cột propname -->
          <th class="text__align--center" style="width: 100px">Chức năng</th>
        </tr>
      </thead>
      <!-- render ra tr dựa vào data employeeList -->
      <tbody
        class="table__body--real"
        v-for="(employee, index) in employeeList"
        :key="index"
      >
        <!-- bảng trả về từ api hiển thị ở đây -->
        <tr>
          <!-- chèn td checkbox -->
          <td>
            <MCheckbox
              :isTd="true"
              :value="employee['EmployeeId']"
              :checkboxId="`checkbox__${index}`"
            />
          </td>
          <!-- dùng vòng lặp v-for tương tự như th nhưng ở đây là render ra nội dung
          tương ứng từ prop name của thead từ kết quả api trả về -->
          <template v-for="(theaditem, index) in theadList" :key="index">
            <td :class="`text__align--${theaditem.align}`">
              {{ employee[theaditem.propName] }}
            </td>
          </template>
          <!-- chèn component conext menu vào td -->
          <td class="text__align--center">
            <MConntextMenu />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import common from "../../js/common.js";
import MCheckbox from "../../components/base/MCheckbox.vue";
import MConntextMenu from "../../components/base/MContextMenu.vue";
export default {
  name: "EmployeeTable",
  components: {
    MCheckbox,
    MConntextMenu,
  },
  // props: ["api", "pageSize", "pageNumber", "searchFilter"],
  props: {
    api: String,
    pageSize: Number,
    pageNumber: Number,
    searchFilter: String,
    theadList: Array,
  },
  data() {
    return {
      employeeList: [],
    };
  },
  /**
   * Lấy ra các prop tương úng và tiến hành fetch api cho vào trong table.
   * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
   */
  beforeMount() {
    let arrFilter = [];
    if (this.searchFilter != null && this.searchFilter != "") {
      arrFilter.push(`employeeFilter=${this.searchFilter}`);
    }
    if (this.pageSize != null && this.pageSize != "") {
      arrFilter.push(`pageSize=${this.pageSize}`);
    }
    if (this.pageNumber != null && this.pageNumber != "") {
      arrFilter.push(`pageNumber=${this.pageNumber}`);
    }
    // api mặc định
    let apiFetch = this.api;
    // tạo ra api mới dựa trên các giá trị filter
    if (arrFilter.length != 0) {
      apiFetch = `${apiFetch}?${arrFilter.join("&")}`;
    }
    fetch(apiFetch, { method: "GET" })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((res) => {
        this.employeeList = res["Data"];
      })
      .catch((res) => {
        console.log(res);
      });
  },
  methods() {
    common;
  },
};
</script>
<style scoped>
@import url("../../css/page/employee/employeeTable.css");
</style>
