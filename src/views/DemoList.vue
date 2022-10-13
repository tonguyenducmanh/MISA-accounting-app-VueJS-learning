<template lang="">
  <!-- trang demo chứa toàn bộ các component có trong ứng dụng web -->
  <div class="demo">
    <div>10. Datepicker</div>
    <LibDatepicker
      :hasLabel="true"
      labelText="Datepicker"
      placeHolder="DD/MM/YYYY"
      buttonClass="datepicker__button--white"
      v-model="datepickerValue"
    />

    <div>1.1 Button primary</div>

    <MButton buttonName="Cất và thêm" />

    <div>1.2 Button secondary</div>

    <MButton :buttonTwo="true" buttonName="Hủy" />

    <div>2.1 Input</div>

    <MInput placeholder="Đây là input thường" />

    <div>2.2 Input label</div>

    <MInput
      :hasLabel="true"
      :labelText="'Đây là Input có label'"
      placeholder="Đây là input có label"
    />

    <div>2.3 Input icon</div>

    <MInput :hasIcon="true" placeholder="Đây là input có icon" />

    <div>2.4 Input label icon</div>

    <MInput
      :hasLabel="true"
      :labelText="'Đây là Input có cả label icon'"
      :hasIcon="true"
      placeholder="Đây là input có cả label icon"
    />
    <div>2.5 Input italic</div>

    <MInput
      :hasItalic="true"
      :hasIcon="true"
      placeholder="Đây là input có cả label icon"
    />
    <div>2.6 Input alert</div>

    <MInput
      :hasAlert="true"
      :hasLabel="true"
      :labelText="'Đây là Input alert'"
      :hasIcon="true"
      placeholder="Đây là input alert"
    />
    <div>3. Context menu open</div>

    <MConntextMenu :hasOpen="true" />

    <div>4. Date picker</div>

    <MDatePicker labelText="Label của Date picker" />

    <div>5. Checkbox</div>

    <MCheckbox checkboxId="testCheckbox_1" labelText="Tiêu đề checkbox" />

    <div>6. Radio button</div>

    <MRadioButton
      titleText="Radio Title"
      :content="[
        {
          name: 'Nam',
          value: 0,
        },
        {
          name: 'Nữ',
          value: 1,
        },
        {
          name: 'Khác',
          value: 2,
        },
      ]"
    />

    <div>7. Toast message</div>
    <span>Xuất hiện ở góc dưới bên phải</span>
    <div class="toastmessage__container">
      <MToastMessage
        language="VI"
        toastType="SUCCESS"
        toastText="Đây là toast message."
      />
    </div>

    <div>8. Combobox</div>

    <LibCombobox
      :classInput="'input__field'"
      data="10 bản ghi trên trang:10;20 bản ghi trên trang:20;50 bản ghi trên trang: 50;100 bản ghi trên trang:100"
      placeHolder="Hãy chọn số trang"
      defaultValue="10 bản ghi trên trang"
      unique="10"
    />

    <div>9. Popup</div>
    <MButton @click="showAlert" buttonName="hiện Alert" />

    <MPopup
      :isAlert="isAlertShow"
      @hide-popup="showAlert"
      AlertMess="Demo poup message"
    />
    <br />
    <MButton @click="showAskWarning" buttonName="hiện Ask Warning" />

    <MPopup
      :isAskWarning="isAskWarningShow"
      @hide-popup="showAskWarning"
      AskWarningMess="Demo poup message"
    />
    <br />
    <MButton @click="showAsk" buttonName="hiện Ask" />

    <MPopup
      :isAsk="isAskShow"
      @hide-popup="showAsk"
      AskMess="Demo poup message"
    />
    <br />
    <MButton @click="showWarning" buttonName="hiện Warning" />

    <MPopup
      :isWarning="isWarningShow"
      @hide-popup="showWarning"
      WarningMess="Demo poup message"
    />

    <div>11. Form</div>

    <MButton @click="showForm" buttonName="hiện Form" />

    <EmployeeForm v-if="isFormShow" @hide-form="showForm" />

    <div>12. Table</div>

    <div>
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
    </div>

    <div>14. Page navigation</div>

    <EmployeePage
      :totalRecords="totalRecords"
      :totalPage="totalPage"
      :currentPage="currentPage"
    />
  </div>
</template>
<script>
// import component file
import MButton from "../components/base/MButton.vue";
import MInput from "../components/base/MInput.vue";
import MConntextMenu from "../components/base/MContextMenu.vue";
import MDatePicker from "../components/base/MDatePicker.vue";
import MCheckbox from "../components/base/MCheckbox.vue";
import MRadioButton from "../components/base/MRadioButton.vue";
import MToastMessage from "../components/base/MToastMessage.vue";
import MPopup from "../components/base/MPopup.vue";

// import library file
import LibCombobox from "../lib/combobox/components/LibCombobox.vue";
import LibDatepicker from "../lib/datepicker/components/LibDatepicker.vue";

// import employee components
import EmployeeForm from "../views/EmployeeList/EmployeeForm.vue";
import EmployeeTable from "../views/EmployeeList/EmployeeTable.vue";
import EmployeePage from "../views/EmployeeList/EmployeePage.vue";

export default {
  components: {
    MButton,
    MInput,
    MConntextMenu,
    MDatePicker,
    MCheckbox,
    MRadioButton,
    MToastMessage,
    LibCombobox,
    LibDatepicker,
    MPopup,
    EmployeeForm,
    EmployeeTable,
    EmployeePage,
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
      keyword: null,
      apiTable: "https://cukcuk.manhnv.net/api/v1/Employees/filter",
      datepickerValue: "",
    };
  },
  watch: {
    datepickerValue() {
      console.log(this.datepickerValue);
    },
  },
  /**
   * Lấy ra các prop tương úng và tiến hành fetch api cho vào trong table.
   * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
   */
  beforeMount() {
    let arrFilter = [];
    if (this.keyword != null && this.keyword != "") {
      arrFilter.push(`employeeFilter=${this.keyword}`);
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
  methods: {
    /**
     * Hiện các popup, form tương ứng với nút demo bên trên.
     * Author: Tô Nguyễn Đức Mạnh (11/09/2022)
     */
    showAlert() {
      this.isAlertShow = !this.isAlertShow;
    },
    showAskWarning() {
      this.isAskWarningShow = !this.isAskWarningShow;
    },
    showAsk() {
      this.isAskShow = !this.isAskShow;
    },
    showWarning() {
      this.isWarningShow = !this.isWarningShow;
    },
    showForm() {
      this.isFormShow = !this.isFormShow;
    },
  },
};
</script>
<style scoped>
@import url("../css/page/demo.css");
</style>
