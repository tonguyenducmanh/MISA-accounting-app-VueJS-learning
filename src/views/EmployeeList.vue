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
          />
          <div
            tabindex="0"
            class="icon employee__reloadbtn"
            data-title="Lấy lại dữ liệu"
            @click="loadData"
          ></div>
        </div>
      </div>
      <!-- employee table gồm bảng danh sách nhân viên -->
      <EmployeeTable
        class="table__container"
        :employeeList="employeeList"
        :theadList="[
          {
            align: 'left',
            propName: 'EmployeeCode',
            width: '150',
            name: 'Mã nhân viên',
          },
          {
            align: 'left',
            propName: 'FullName',
            width: '200',
            name: 'Tên nhân viên',
          },
          {
            align: 'left',
            propName: 'Gender',
            width: '110',
            name: 'Giới tính',
            formatGender: true,
          },
          {
            align: 'center',
            propName: 'DateOfBirth',
            width: '130',
            name: 'Ngày sinh',
            formatDate: true,
          },
          {
            align: 'right',
            propName: 'PersonalTaxCode',
            width: '200',
            name: 'Số CMND',
            formatRight: true,
          },
          {
            align: 'left',
            propName: 'PositionName',
            width: '200',
            name: 'Chức danh',
          },
          {
            align: 'left',
            propName: 'DepartmentName',
            width: '250',
            name: 'Tên đơn vị',
          },
          {
            align: 'right',
            propName: '',
            width: '200',
            name: 'Số tài khoản',
            formatRight: true,
          },
          {
            align: 'left',
            propName: '',
            width: '250',
            name: 'Tên ngân hàng',
          },
          {
            align: 'left',
            propName: '',
            width: '250',
            name: 'Chi nhánh TK ngân hàng',
          },
        ]"
      />
      <!-- phần điều hướng sang trang khác -->
      <EmployeePage
        :totalRecords="totalRecords"
        :totalPage="totalPage"
        :currentPage="currentPage"
        @change-size="changeSize"
      />
    </div>
    <!-- phần form thêm và sửa người dùng -->
    <EmployeeForm v-if="isFormShow" @hide-form="toggleAskPopUp" />
    <!-- popup hiện lên khi đóng form, hỏi có muốn lưu không -->
    <MPopup
      :isAsk="isAskShow"
      @hide-popup="toggleAskPopUp"
      @hide-all="hideFormAndAsk"
      AskMess="Bạn có người yêu chưa"
    />
  </div>
</template>
<script>
import MInput from "../components/base/MInput.vue";
import EmployeeHeader from "./EmployeeList/EmployeeHeader.vue";
import EmployeeTable from "./EmployeeList/EmployeeTable.vue";
import EmployeePage from "./EmployeeList/EmployeePage.vue";
import EmployeeForm from "./EmployeeList/EmployeeForm.vue";
import MPopup from "../components/base/MPopup.vue";
export default {
  name: "TheEmployee",
  components: {
    MInput,
    MPopup,
    EmployeeHeader,
    EmployeeTable,
    EmployeePage,
    EmployeeForm,
  },
  data() {
    return {
      employeeList: [],
      totalRecords: 0,
      totalPage: 0,
      currentPage: 0,
      language: "VI",
      isAlertShow: false,
      isAskWarningShow: false,
      isAskShow: false,
      isWarningShow: false,
      isFormShow: false,
      pageSize: 10,
      pageNumber: 1,
      searchFilter: null,
      apiTable: "https://cukcuk.manhnv.net/api/v1/Employees/filter",
    };
  },
  beforeMount() {
    this.loadData();
  },
  /**
   * Bất cứ khi nào pageSize, searchFilter thay đổi thì load lại trang
   * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
   */
  watch: {
    pageSize() {
      this.loadData();
    },
    searchFilter() {
      this.loadData();
    },
  },
  methods: {
    /**
     * Lấy ra các prop tương úng và tiến hành fetch api cho vào trong table.
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    loadData() {
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
      let apiFetch = this.apiTable;
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
          this.totalRecords = res["TotalRecord"];
          this.totalPage = res["TotalPage"];
          this.currentPage = res["CurrentPage"];
        })
        .catch((res) => {
          console.log(res);
        });
    },
    /**
     * chọn số lượng trang và load lại trang với số lượng đó
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    changeSize(value) {
      this.pageSize = value;
    },
    /**
     * chọn thay đổi giá trị tìm kiếm và load lại trang với số lượng đó
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    changeFilter(value) {
      this.searchFilter = value;
    },
    /**
     * Hiện form thêm mới nhân viên
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    showForm() {
      this.isFormShow = true;
    },
    /**
     * Hiện dialog khi ấn vào ẩn form đi
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    toggleAskPopUp() {
      this.isAskShow = !this.isAskShow;
    },
    /**
     * Ẩn cả popup hỏi lưu không và form đi
     */
    hideFormAndAsk() {
      this.isAskShow = false;
      this.isFormShow = false;
    },
  },
};
</script>
<style scoped>
@import url("../css/page/employee.css");
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
