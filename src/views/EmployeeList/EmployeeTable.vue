<template lang="">
  <!-- phần table -->
  <div
    class="table__wrap"
    ref="table"
    :class="isShowLoading ? MISAEnum.table.OVERFLOW : ''"
  >
    <!-- phần loading khi chưa tải xong -->
    <MLoading v-if="isShowLoading" />
    <table class="table" id="table__employee">
      <thead>
        <tr>
          <!-- chèn th checkbox -->
          <th class="table__th table__thcheck">
            <MCheckbox
              class="checkbox"
              @click-check-box="toggleCheckAll"
              :checkboxStatus="checkAllEnable"
              @keydown.enter="toggleCheckAll"
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
          <th class="text__align--center" style="width: 100px">
            {{ this.MISAResource.LabelText.TableFuctionColumn[getLanguage] }}
          </th>
        </tr>
      </thead>
      <!-- render ra tr dựa vào data employeeList -->
      <tbody class="table__body--real">
        <template v-for="(employee, index) in employeeList" :key="index">
          <!-- bảng trả về từ api hiển thị ở đây -->
          <tr
            ref="employeeID"
            :value="employee['employeeID']"
            @keyup="
              checkKeyUp(
                employee['employeeID'],
                employee['employeeCode'],
                employee['fullName']
              )
            "
          >
            <!-- chèn td checkbox -->
            <td>
              <MCheckbox
                :isTd="true"
                :value="employee['employeeID']"
                :checkboxId="`checkbox__${index}`"
                @click-check-box="toggleSelectedID(employee['employeeID'])"
                @keydown.enter="toggleSelectedID(employee['employeeID'])"
                :checkboxStatus="checkToggleCheck(employee['employeeID'])"
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
                :btnName="MISAResource.ButtonText.EditBtn[getLanguage]"
                :btnOne="MISAResource.ButtonText.DuplicateBtn[getLanguage]"
                :btnTwo="MISAResource.ButtonText.DeleteBtn[getLanguage]"
                :btnThree="MISAResource.ButtonText.StopUsingBtn[getLanguage]"
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
                @delete-id="deleteOneEmployee"
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
import MISAEnum from "../../js/enum.js";
import MISAResource from "../../js/resource.js";

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
      MISAResource,
      MISAEnum,
      hasUp: false,
      isShowLoading: false,
      forceCheckAll: false,
      checkAllEnable: false,
      language: "",
    };
  },
  beforeMount() {
    /**
     * Lấy ra giá trị của ngôn ngữ hiện tại
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    this.language = this.$store.state.language;
  },
  // trước khi unmount cần xóa danh sách các ID đã chọn đi
  beforeUnmount() {
    this.$store.dispatch("changeSelectedIDs", []);
  },
  computed: {
    /**
     * Lấy ra giá trị của ngôn ngữ hiện tại
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    getLanguage() {
      return this.$store.state.language;
    },
    /**
     * Lấy ra giá trị tổng số bản ghi đã chọn
     * Author: Tô Nguyễn Đức Mạnh (10/10/2022)
     */
    totalSelected() {
      return this.$store.state.selectedIDs.length;
    },
  },
  watch: {
    /**
     * ẩn hiện loading
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    toggleShowLoading() {
      if (this.toggleShowLoading === true) {
        this.isShowLoading = true;
      } else {
        this.isShowLoading = false;
      }
    },
    /**
     * Lúc mới chọn tất cả thì chỉ cần check số lượng xem có bằng với số lượng bản ghi hiện có không
     * Author: Tô Nguyễn Đức Mạnh (09/10/2022)
     */
    totalSelected() {
      // số bản ghi mà bằng 0 thì tức là mới xóa tất cả, bỏ check check box luôn
      if (this.$store.state.selectedIDs.length === 0) {
        this.forceCheckAll = false;
        this.checkAllEnable = false;
      }
      // 2 độ dài bằng nhau thì mới check all
      if (this.$store.state.selectedIDs.length === this.employeeList.length) {
        this.checkAllEnable = true;
      } else {
        this.checkAllEnable = false;
      }
    },
    /**
     * Mỗi lần giá trị của employeeList thay đổi cần check lại form
     * và check lại cả từng id 1, nếu chẳng may 1 id bị xóa dạng đơn lẻ thì cũng cần remove nó đi
     * nếu trùng toàn bộ id thì mới giữ lại check all
     * Author: Tô Nguyễn Đức Mạnh (09/10/2022)
     */
    employeeList() {
      if (this.$store.state.selectedIDs.length === 0) {
        this.forceCheckAll = false;
        this.checkAllEnable = false;
      }
      // 2 độ dài bằng nhau thì mới check all
      let temp = this.$store.state.selectedIDs;
      if (temp.length === this.employeeList.length) {
        // kiểm tra từng id 1 xem có không, không có thì xóa nó khỏi store,
        return temp.every((element) => {
          if (this.employeeList.includes(element)) {
            this.checkAllEnable = true;
          } else {
            temp.splice(temp.indexOf(element), 1);
            this.$store.dispatch("changeSelectedIDs", temp);
          }
          this.checkAllEnable = false;
        });
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
     * Xóa nhiều trường
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    deleteManyEmployee() {
      try {
        this.$emit("delete-employee");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * deleteCurrentId
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    deleteOneEmployee(deleteId, deleteName) {
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
      this.$store.dispatch("changeMethod", MISAEnum.method.PUT);
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
      this.putMethod(currentId, currentCode);
      // chuyển method về post để thực hiện tính năng thêm mới, sau đó tạo id mới để sửa
      setTimeout(() => {
        this.$store.dispatch("changeMethod", MISAEnum.method.POST);
      }, 1000);
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
    /**
     * Kiểm tra các phím được nhấn
     * Author: Tô Nguyễn Đức Mạnh (09/10/2022)
     */
    checkKeyUp(ID, code, name) {
      try {
        const check = (event) => {
          // nếu là ấn phím F2 thì sửa
          if (event.which === this.MISAEnum.keycode.F2) {
            event.preventDefault();
            this.$emit("show-form");
            this.putMethod(ID, code);
          }
          // nếu là phím Delete thì xóa
          if (event.which === this.MISAEnum.keycode.DELETE) {
            event.preventDefault();
            if (this.$store.state.selectedIDs.length > 0) {
              this.deleteManyEmployee();
            } else {
              this.deleteOneEmployee(ID, name);
            }
          }
        };
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(check(event), 500);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Kiểm tra xem có id này trong selected id không ?, nếu không
     * thì return về false, có thì true
     * Author: Tô Nguyễn Đức Mạnh (09/10/2022)
     */
    checkToggleCheck(value) {
      try {
        let currentSelectedArr = this.$store.state.selectedIDs;
        // kiểm tra xem trong mảng đã có chưa, chưa có thì mới thêm
        // có rồi thì xóa khỏi mảng
        let check = currentSelectedArr.includes(value);
        if (currentSelectedArr.length > 0) {
          if (check === false) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
</script>
<style scoped>
@import url("../../css/page/employee/employeeTable.css");
</style>
