<template lang="">
  <div class="demo">
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
    <div>3.1 Context menu open</div>

    <MConntextMenu :hasOpen="true" />

    <br /><br /><br />

    <div>3.2 Context menu open-up</div>

    <br /><br /><br />

    <MConntextMenu :hasOpen="true" :hasUp="true" />

    <div>3.3 Context menu close</div>

    <MConntextMenu />

    <div>4 Date picker</div>

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

    <div>7.1 Toast message thành công</div>

    <div class="toastmessage__container">
      <MToastMessage
        language="VI"
        toastType="SUCCESS"
        toastText="Công việc đã bị xóa."
      />
    </div>

    <div>7.2 Toast message lỗi</div>

    <div class="toastmessage__container">
      <MToastMessage
        language="VI"
        toastType="ERROR"
        toastText="Có lỗi xảy ra, vui lòng thử lại sau."
      />
    </div>

    <div>7.3 Toast message cảnh báo</div>

    <div class="toastmessage__container">
      <MToastMessage
        language="VI"
        toastType="WARNING"
        toastText="Dữ liệu của bạn đã bị thay đổi bởi người dùng khác."
      />
    </div>

    <div>7.4 Toast message thông báo</div>

    <div class="toastmessage__container">
      <MToastMessage
        language="VI"
        toastType="NOTI"
        toastText="Bạn nên đọc kỹ nội dung trước khi phê duyệt."
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
      AlertMess="Bạn có người yêu chưa"
    />
    <br />
    <MButton @click="showAskWarning" buttonName="hiện Ask Warning" />

    <MPopup
      :isAskWarning="isAskWarningShow"
      @hide-popup="showAskWarning"
      AskWarningMess="Bạn có người yêu chưa"
    />
    <br />
    <MButton @click="showAsk" buttonName="hiện Ask" />

    <MPopup
      :isAsk="isAskShow"
      @hide-popup="showAsk"
      AskMess="Bạn có người yêu chưa"
    />
    <br />
    <MButton @click="showWarning" buttonName="hiện Warning" />

    <MPopup
      :isWarning="isWarningShow"
      @hide-popup="showWarning"
      WarningMess="Bạn có người yêu chưa"
    />

    <div>10. Loading</div>

    <MLoading />

    <div>11. Form</div>

    <MButton @click="showForm" buttonName="hiện Form" />

    <EmployeeForm v-if="isFormShow" @hide-form="showForm" />

    <div>12. Table</div>

    <EmployeeTable />

    <div>14. Page navigation</div>

    <EmployeePage />
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
import MLoading from "../components/base/MLoading.vue";

// import library file
import LibCombobox from "../lib/combobox/components/LibCombobox.vue";

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
    MPopup,
    MLoading,
    EmployeeForm,
    EmployeeTable,
    EmployeePage,
  },
  data() {
    return {
      language: "VI",
      isAlertShow: false,
      isAskWarningShow: false,
      isAskShow: false,
      isWarningShow: false,
      isFormShow: false,
    };
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
