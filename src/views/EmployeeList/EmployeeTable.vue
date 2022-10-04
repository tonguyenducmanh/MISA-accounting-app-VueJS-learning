<template lang="">
  <div class="table__wrap" ref="table">
    <div
      class="table__wrap--loading"
      :class="isShowLoading === false ? 'table__wrap--hide' : ''"
    >
      <MLoading />
    </div>
    <table class="table" id="table__employee">
      <thead>
        <tr>
          <!-- chèn th checkbox -->
          <th class="table__th table__thcheck">
            <MCheckbox
              class="checkbox"
              @click-check-box="toggleCheckAll"
              :checkboxStatus="checkAllEnable"
            />
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
          <tr ref="employeeID" :value="employee['employeeID']">
            <!-- chèn td checkbox -->
            <td>
              <MCheckbox
                :isTd="true"
                :value="employee['employeeID']"
                :checkboxId="`checkbox__${index}`"
                @click-check-box="toggleSelectedID(employee['employeeID'])"
                :checkboxStatus="forceCheckAll"
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
                  putMethod(employee['employeeID'], employee['employeeCode']);
                "
                :class="`text__align--${theaditem.align}`"
              >
                {{ formatDate(employee[theaditem.propName]) }}
              </td>
              <td
                v-else-if="theaditem.formatGender"
                @dblclick="
                  $emit('show-form');
                  putMethod(employee['employeeID'], employee['employeeCode']);
                "
                :class="`text__align--${theaditem.align}`"
              >
                {{ formatGender(employee[theaditem.propName]) }}
              </td>
              <td
                v-else
                @dblclick="
                  $emit('show-form');
                  putMethod(employee['employeeID'], employee['employeeCode']);
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
                  putMethod(employee['employeeID'], employee['employeeCode']);
                "
                @duplicate-click="
                  $emit('show-form');
                  postMethod(employee['employeeID'], employee['employeeCode']);
                "
                :deleteId="employee['employeeID']"
                :deleteName="employee['fullName']"
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
import MLoading from "../../components/base/MLoading.vue";

export default {
  name: "EmployeeTable",
  components: {
    MCheckbox,
    MConntextMenu,
    MLoading,
  },
  props: {
    employeeList: Array,
    theadList: Array,
    toggleShowLoading: Boolean,
  },
  data() {
    return {
      hasUp: false,
      isShowLoading: false,
      forceCheckAll: false,
      checkAllEnable: false,
    };
  },
  computed: {
    totalSelected() {
      return this.$store.state.selectedIDs.length;
    },
  },
  watch: {
    toggleShowLoading() {
      if (this.toggleShowLoading === true) {
        this.isShowLoading = true;
      } else {
        this.isShowLoading = false;
      }
    },
    totalSelected() {
      if (this.$store.state.selectedIDs.length === this.employeeList.length) {
        this.checkAllEnable = true;
      } else {
        this.checkAllEnable = false;
      }
    },
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
     * Thay đổi method sang PUT và chèn ID, edit code hiện tại vào store global để fetch data về.
     * Author: Tô Nguyễn Đức Mạnh (14/09/2022)
     */
    putMethod(currentId, currentCode) {
      this.$store.dispatch("changeMethod", "PUT");
      this.$store.dispatch("changeEditID", currentId);
      this.$store.dispatch("changeEditCode", currentCode);
    },
    /**
     * Thay đổi method sang POST và chèn ID hiện tại vào store global để fetch data về.
     * Author: Tô Nguyễn Đức Mạnh (14/09/2022)
     */
    postMethod(currentId, currentCode) {
      // chuyển method về put để thực hiện binding dữ liệu giống như là đang edit
      // để ăn gian đoạn logic này
      this.$store.dispatch("changeEditID", currentId);
      this.$store.dispatch("changeEditCode", currentCode);

      this.$store.dispatch("changeMethod", "PUT");
      // chuyển method về post để thực hiện tính năng thêm mới, sau đó tạo id mới để sửa
      setTimeout(() => {
        this.$store.dispatch("changeMethod", "POST");
        // xóa cả currentID đi
        this.$store.dispatch("changeEditID", "");
        this.$store.dispatch("changeEditCode", "");
      }, 1000);
      // gọi hàm tạo ra mã id mới để chèn vô form nữa
    },
    /**
     * Thêm hoặc xóa 1 record vào trong store selectedIDs
     * Author: Tô Nguyễn Đức Mạnh (04/10/2022)
     */
    toggleSelectedID(value) {
      try {
        let currentSelectedArr = this.$store.state.selectedIDs;
        // kiểm tra xem trong mảng đã có chưa, chưa có thì mới thêm
        // có rồi thì xóa khỏi mảng
        let check = currentSelectedArr.includes(value);
        if (currentSelectedArr.length > 0) {
          if (check === false) {
            currentSelectedArr.push(value);
          } else {
            currentSelectedArr.splice(currentSelectedArr.indexOf(value), 1);
          }
        } else {
          currentSelectedArr.push(value);
        }
        this.$store.dispatch("changeSelectedIDs", currentSelectedArr);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thêm toàn bộ các ID record đang hiển thị trên table vào
     * trong store, đỡ phải ấn từng cái 1
     * Author: Tô Nguyễn Đức Mạnh (04/10/2022)
     */
    toggleCheckAll() {
      try {
        this.forceCheckAll = !this.forceCheckAll;
        this.checkAllEnable = !this.checkAllEnable;
        // kiểm tra xem trạng thái hiện tại là check all hay bỏ check,
        // nếu là check all thì thêm tất cả vào trong store
        // nếu là bỏ check thì làm trống store
        if (this.forceCheckAll) {
          let arr = [];
          let arrEmp = this.employeeList;
          for (let i = 0; i < arrEmp.length; i++) {
            arr.push(arrEmp[i]["employeeID"]);
          }
          this.$store.dispatch("changeSelectedIDs", arr);
        } else {
          this.$store.dispatch("changeSelectedIDs", []);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import url("../../css/page/employee/employeeTable.css");
</style>
