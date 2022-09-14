<template lang="">
  <div class="table__wrap" ref="table">
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
      <tbody class="table__body--real">
        <template v-for="(employee, index) in employeeList" :key="index">
          <!-- bảng trả về từ api hiển thị ở đây -->
          <tr ref="EmployeeId" :value="employee['EmployeeID']">
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
            <template
              v-for="(theaditem, indexItem) in theadList"
              :key="indexItem"
            >
              <td
                v-if="theaditem.formatDate"
                @dblclick="
                  $emit('show-form');
                  putMethod(employee['EmployeeId']);
                "
                :class="`text__align--${theaditem.align}`"
              >
                {{ formatDate(employee[theaditem.propName]) }}
              </td>
              <td
                v-else-if="theaditem.formatGender"
                @dblclick="
                  $emit('show-form');
                  putMethod(employee['EmployeeId']);
                "
                :class="`text__align--${theaditem.align}`"
              >
                {{ formatGender(employee[theaditem.propName]) }}
              </td>
              <td
                v-else
                @dblclick="
                  $emit('show-form');
                  putMethod(employee['EmployeeId']);
                "
                :class="`text__align--${theaditem.align}`"
              >
                {{ employee[theaditem.propName] }}
              </td>
            </template>
            <!-- chèn component conext menu vào td -->
            <td class="text__align--center">
              <MConntextMenu
                @edit-click="
                  $emit('show-form');
                  putMethod(employee['EmployeeId']);
                "
                @duplicate-click="
                  $emit('show-form');
                  postMethod(employee['EmployeeId']);
                "
                :deleteId="employee['EmployeeId']"
                :deleteName="employee['FullName']"
                :hasUp="
                  hasUp &&
                  (index === employeeList.length - 1 ||
                    index === employeeList.length - 2)
                "
                @delete-id="deleteEmployee"
              />
            </td>
          </tr>
        </template>
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
  props: {
    employeeList: Array,
    theadList: Array,
  },
  data() {
    return {
      hasUp: false,
    };
  },
  emits: ["delete-employee", "show-form"],
  /**
   * Kiểm tra giá trị của table xem có overflow không, nếu có thì mấy cái context menu dưới cùng sẽ có menu nằm bên trên
   * Author: Tô nguyễn Đức Mạnh (13/-9/2022)
   */
  updated() {
    try {
      if (this.$refs.table.scrollHeight > this.$refs.table.clientHeight) {
        this.hasUp = true;
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /**
     * Định dạng ngày trong table
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    formatDate(value) {
      try {
        return common.formatDate(value);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Định dạng giới trong table
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    formatGender(value) {
      try {
        return common.formatGender(value);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * deleteCurrentId
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    deleteEmployee(deleteId, deleteName) {
      try {
        this.$emit("delete-employee", deleteId, deleteName);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thay đổi method sang PUT và chèn ID hiện tại vào store global để fetch data về.
     * Author: Tô Nguyễn Đức Mạnh (14/09/2022)
     */
    putMethod(currentId) {
      this.$store.dispatch("changeMethod", "PUT");
      this.$store.dispatch("changeEditID", currentId);
    },
    /**
     * Thay đổi method sang POST và chèn ID hiện tại vào store global để fetch data về.
     * Author: Tô Nguyễn Đức Mạnh (14/09/2022)
     */
    postMethod(currentId) {
      // chuyển method về put để thực hiện binding dữ liệu giống như là đang edit
      // để ăn gian đoạn logic này
      this.$store.dispatch("changeEditID", currentId);
      this.$store.dispatch("changeMethod", "PUT");
      // chuyển method về post để thực hiện tính năng thêm mới, sau đó tạo id mới để sửa
      setTimeout(() => {
        this.$store.dispatch("changeMethod", "POST");
      }, 1000);
      // gọi hàm tạo ra mã id mới để chèn vô form nữa
    },
  },
};
</script>
<style scoped>
@import url("../../css/page/employee/employeeTable.css");
</style>
