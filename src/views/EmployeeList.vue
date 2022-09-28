<template lang="">
  <div class="employee">
    <!-- Employee header gồm ô nhập liệu, nút tìm kiếm và nút reload -->
    <EmployeeHeader @show-form="showForm" />
    <div class="employee__bottom">
      <div class="employee__menu">
        <div class="employee__menuleft">Đã chọn x nhân viên</div>
        <div class="employee__menuright">
          <MInput
            :hasItalic="true"
            :hasIcon="true"
            idInput="input__search"
            dataTitle="Ấn ctrl + K để nhập"
            placeHolder="Tìm theo mã, tên nhân viên"
            @change-filter="changeFilter"
            ref="inputSearch"
          />
          <div
            tabindex="0"
            class="icon employee__reloadbtn"
            data-title="Lấy lại dữ liệu"
            @click="reloadData"
            @keydown.enter="reloadData"
          ></div>
        </div>
      </div>
      <!-- employee table gồm bảng danh sách nhân viên -->
      <EmployeeTable
        @delete-employee="toggleAskWarningPopUp"
        @show-form="showForm"
        class="table__container"
        :employeeList="employeeList"
        :toggleShowLoading="isShowLoading"
        :theadList="[
          {
            align: 'left',
            propName: 'employeeCode',
            width: '150',
            name: 'Mã nhân viên',
          },
          {
            align: 'left',
            propName: 'fullName',
            width: '200',
            name: 'Tên nhân viên',
          },
          {
            align: 'left',
            propName: 'gender',
            width: '110',
            name: 'Giới tính',
            formatGender: true,
          },
          {
            align: 'center',
            propName: 'dateOfBirth',
            width: '130',
            name: 'Ngày sinh',
            formatDate: true,
          },
          {
            align: 'right',
            propName: 'identityCard',
            width: '200',
            name: 'Số CMND',
            formatRight: true,
          },
          {
            align: 'left',
            propName: 'positionName',
            width: '200',
            name: 'Chức danh',
          },
          {
            align: 'left',
            propName: 'departmentName',
            width: '250',
            name: 'Tên đơn vị',
          },
          {
            align: 'right',
            propName: 'bankAccount',
            width: '200',
            name: 'Số tài khoản',
            formatRight: true,
          },
          {
            align: 'left',
            propName: 'bankName',
            width: '250',
            name: 'Tên ngân hàng',
          },
          {
            align: 'left',
            propName: 'bankBranch',
            width: '250',
            name: 'Chi nhánh TK ngân hàng',
          },
        ]"
      />
      <!-- phần điều hướng sang trang khác -->
      <EmployeePage
        :totalRecords="getTotalRecords"
        :totalPage="getTotalPage"
        :currentPage="getCurrentpage"
        @change-size="changeSize"
      />
    </div>
    <!-- phần form thêm và sửa người dùng -->
    <EmployeeForm
      v-if="isFormShow"
      @hide-form="toggleAskPopUp"
      @hide-all="hideFormAndAsk"
      @warning-duplicate="toggleWarningPopup"
      @alert-popup="toggleAlertPopUp"
      @update-table="
        testMethod();
        loadData();
      "
      ref="employeeForm"
    />
    <!-- popup hiện lên khi đóng form, hỏi có muốn lưu không -->
    <MPopup
      :isAsk="isAskShow"
      @hide-popup="toggleAskPopUp"
      @hide-all="hideFormAndAsk"
      @save-now="
        toggleAskPopUp();
        saveNow();
      "
      AskMess="Dữ liệu đã được thay đổi, bạn có muốn cất không ?"
    />
    <!-- popup hiện lên khi xóa nhân viên, hỏi có muốn xóa không -->
    <MPopup
      :isAskWarning="isAskWarningShow"
      @hide-popup="toggleAskWarningPopUp"
      @re-load="loadData"
      :AskWarningMess="`Bạn có thực sự muốn xóa nhân viên ${deleteName} không?`"
      :deleteId="deleteId"
    />
    <!-- popup hiện lên khi trùng Id nhân viên -->
    <MPopup
      :isWarning="isWarningShow"
      @hide-popup="toggleWarningPopup"
      :WarningMess="WarningMess"
    />
    <!-- popup hiện lên khi điền điều các thông tin bắt buộc -->
    <MPopup
      :isAlert="isAlertShow"
      @hide-popup="toggleAlertPopUp"
      :AlertMess="AlertMess"
    />
    <!-- toast message thông báo thành công -->
    <MToastMessage
      v-if="toggleToast"
      :language="language"
      :toastType="toastType"
      :toastText="toastText"
    />
    <!-- toast message thông báo thất bại -->
  </div>
</template>
<script>
import MISAEnum from "../js/enum.js";
import MISAResource from "../js/resource.js";
// import componnent base
import MInput from "../components/base/MInput.vue";
import MPopup from "../components/base/MPopup.vue";
import MToastMessage from "../components/base/MToastMessage.vue";

// import component fragment
import EmployeeHeader from "./EmployeeList/EmployeeHeader.vue";
import EmployeeTable from "./EmployeeList/EmployeeTable.vue";
import EmployeePage from "./EmployeeList/EmployeePage.vue";
import EmployeeForm from "./EmployeeList/EmployeeForm.vue";
export default {
  name: "TheEmployee",
  components: {
    MInput,
    MPopup,
    MToastMessage,
    EmployeeHeader,
    EmployeeTable,
    EmployeePage,
    EmployeeForm,
  },
  data() {
    return {
      MISAEnum,
      MISAResource,
      employeeList: [],
      isAlertShow: false,
      isAskWarningShow: false,
      isAskShow: false,
      isWarningShow: false,
      isFormShow: false,
      isShowLoading: false,
      apiTable: "",
      WarningMess: "",
      AlertMess: "",
    };
  },
  beforeMount() {
    // chèn api từ enum vào
    this.apiTable = this.MISAEnum.API.GETEMPLOYEEFILTER;
    this.loadData();
  },
  /**
   * mặc định lúc mounted sẽ focus vào ô tìm kiếm
   */
  mounted() {
    this.$refs.inputSearch.$el.children[0].children[0].focus();
  },
  /**
   *  lấy các state từ trong store, để watch theo dõi và rerender
   * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
   */
  computed: {
    tableInfo() {
      return [
        this.$store.state.pageSize,
        this.$store.state.pageNumber,
        this.$store.state.searchFilter,
      ];
    },
    deleteName() {
      return this.$store.state.deleteName;
    },
    deleteId() {
      return this.$store.state.deleteId;
    },
    getTotalRecords() {
      return this.$store.state.totalRecords;
    },
    getTotalPage() {
      return this.$store.state.totalPage;
    },
    getCurrentpage() {
      return this.$store.state.currentPage;
    },
    /**
     * Lấy state ẩn hiện thông báo
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    toggleToast() {
      return this.$store.state.toggleToast;
    },
    toastType() {
      return this.$store.state.toastType;
    },
    toastText() {
      return this.$store.state.toastText;
    },
    language() {
      return this.$store.state.language;
    },
  },
  /**
   * Bất cứ khi nào pageSize, searchFilter thay đổi thì load lại trang
   * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
   */
  watch: {
    tableInfo() {
      this.loadData();
    },
  },
  /**
   * khi mà component bị unmount thì phải trả về giá trị gốc của data
   * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
   */
  unmounted() {
    try {
      this.$store.dispatch("changeCurrentPage", 1);
      this.$store.dispatch("changeFilter", "");
      this.$store.dispatch("changeSize", 10);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /**
     * Test method
     * Author : Tô Nguyễn Đức Manh (17/09/2022)
     */
    testMethod() {
      try {
        console.log("đã thực thi test method");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lấy ra các prop tương úng và tiến hành fetch api cho vào trong table.
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    loadData() {
      try {
        let searchFilter = this.$store.state.searchFilter;
        let pageSize = this.$store.state.pageSize;
        let pageNumber = this.$store.state.pageNumber;
        let arrFilter = [];
        if (searchFilter != null && searchFilter != "") {
          arrFilter.push(`keyword=${searchFilter}`);
        }
        if (pageSize != null && pageSize != "") {
          arrFilter.push(`pageSize=${pageSize}`);
        }
        if (pageNumber != null && pageNumber != "") {
          arrFilter.push(`pageNumber=${pageNumber}`);
        }
        // api mặc định
        let apiFetch = this.apiTable;
        // tạo ra api mới dựa trên các giá trị filter
        if (arrFilter.length != 0) {
          apiFetch = `${apiFetch}?${arrFilter.join("&")}`;
        }
        // hiện loading
        this.isShowLoading = true;
        fetch(apiFetch, { method: this.MISAEnum.method.GET })
          .then((res) => {
            if (res.status == 200) {
              return res.json();
            }
          })
          .then((res) => {
            if (res !== undefined && res !== "") {
              this.employeeList = res["data"];
              this.$store.dispatch("changeTotalRecords", res["totalRecord"]);
              this.$store.dispatch("changeTotalPage", res["totalPage"]);
              this.$store.dispatch("changeCurrentPage", res["currentPage"]);
            } else {
              this.employeeList = [];
              this.$store.dispatch("changeTotalRecords", 0);
              this.$store.dispatch("changeTotalPage", 1);
              this.$store.dispatch("changeCurrentPage", 1);
            }
          })
          .then(() => {
            this.isShowLoading = false;
          })
          .catch((res) => {
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tải lại trang và hiện thông báo tải lại thành công
     *Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    reloadData() {
      try {
        this.loadData();
        // hiện toast mesage lên
        let language = this.$store.state.language;
        let message = this.MISAResource.ToastMessage.ReloadedNoti[language];
        this.$store.dispatch("changeToastType", this.MISAEnum.toasttype.NOTI);
        this.$store.dispatch("changeToastText", message);
        this.$store.dispatch("toggleToast", true);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     *Lưu trang ngay khi ấn vào nút lưu trong popup hỏi có muốn lưu không.
     *Author: Tô Nguyễn Đức Mạnh (16/09/2022)
     */
    saveNow() {
      // trigger tới method saveNew nằm trong component EmployeeForm thông qua refs
      this.$refs.employeeForm.saveNew();
    },
    /**
     * chọn số lượng trang và load lại trang với số lượng đó
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    changeSize(value) {
      try {
        this.$store.dispatch("changeSize", value);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * chọn thay đổi giá trị tìm kiếm và load lại trang với số lượng đó
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    changeFilter(value) {
      try {
        this.$store.dispatch("changeFilter", value);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện form thêm mới nhân viên
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    showForm() {
      try {
        this.isFormShow = true;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện dialog khi ấn vào ẩn form đi
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    toggleAskPopUp() {
      try {
        this.isAskShow = !this.isAskShow;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Ẩn cả popup hỏi lưu không và form đi
     */
    hideFormAndAsk() {
      try {
        this.isAskShow = false;
        this.isFormShow = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện popup hỏi có muốn xóa không
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    toggleAskWarningPopUp(deleteId, deleteName) {
      try {
        this.$store.dispatch("changeDeleteId", deleteId);
        this.$store.dispatch("changeDeleteName", deleteName);
        this.isAskWarningShow = !this.isAskWarningShow;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện popup cảnh báo nhập thiếu
     * Author: Tô Nguyễn Đức Mạnh (15/09/2022)
     */
    toggleAlertPopUp(value) {
      try {
        this.isAlertShow = !this.isAlertShow;

        this.AlertMess = value;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện popup warning trùng ID
     * Author: Tô Nguyễn Đức Mạnh (1309/2022)
     */
    toggleWarningPopup(value) {
      try {
        let language = this.MISAEnum.language;
        // gọi ra văn bản validate
        let textAlert = this.MISAResource.ErrorValidate.EmployeeCode[language];
        let textAlertTwo = this.MISAResource.ErrorValidate.IsExisted[language];
        this.WarningMess = `${textAlert} < ${value} > ${textAlertTwo}`;
        this.isWarningShow = !this.isWarningShow;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.employee {
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.employee .employee__bottom {
  box-sizing: border-box;
  background-color: var(--ColorBackgroundWhite);
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-employee: space-between;
  width: 100%;
  height: 100%;
  row-gap: 16px;
}

.employee .employee__bottom .employee__menu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.employee .employee__bottom .employee__menu .employee__menuleft {
  opacity: 0;
}

.employee .employee__bottom .employee__menu .employee__menuleft--show {
  opacity: 100%;
}

.employee .employee__bottom .employee__menu .employee__menuright {
  display: flex;
  align-items: center;
  column-gap: 16px;
}

.employee
  .employee__bottom
  .employee__menu
  .employee__menuright
  .employee__search {
  width: 300px;
}

.employee
  .employee__bottom
  .employee__menu
  .employee__menuright
  .employee__search
  .employee__searchicon {
  margin-top: -5px;
}

.employee
  .employee__bottom
  .employee__menu
  .employee__menuright
  .employee__reloadbtn::before {
  background-position: -1096px -88px;
}

.employee .employee__bottom .page__navi .combobox .combobox__drop::before {
  background-image: url(../../assets/img/Sprites.64af8f61.svg);
  background-position: -560px -360px;
  transform: rotate(180deg);
}

.employee .employee__bottom .page__navi .combobox .combobox__data {
  top: unset;
  bottom: 100%;
}
</style>
