<template lang="">
  <div class="form__wrap" id="form" form-type="POST" employee-id="">
    <div class="form">
      <div class="form__heading">
        <div class="form__title">Thông tin nhân viên</div>
        <MCheckbox labelText="Là khách hàng" checkboxId="checkbox_kh" />
        <MCheckbox labelText="Là nhà cung cấp" checkboxId="checkbox_ncc" />
      </div>
      <div class="form__body">
        <!-- phần nhập form thứ nhất -->
        <div class="form__part form__one">
          <MInput
            ref="input"
            :inputValue="newEmpCode"
            :hasLabel="true"
            labelText="Mã"
            propName="EmployeeCode"
            placeHolder="Nhập mã nhân viên"
            validate="EmployeeCodeNotEmpty"
            :inputAlert="true"
            idInput="input__checkId"
            :classInput="'input__focus form__employeecode'"
            :showAlertStar="true"
            class="form__ele"
            dataTitle="Mã không được để trống."
          />
          <MInput
            :hasLabel="true"
            labelText="Tên"
            propName="FullName"
            placeHolder="Nhập họ và tên"
            validate="EmployeeNameNotEmpty"
            :inputAlert="true"
            idInput="input__checkId"
            :classInput="'form__employeename'"
            :showAlertStar="true"
            class="form__ele"
            dataTitle="Tên không được để trống."
          />
          <LibCombobox
            id="cbxDepartment"
            :hasLabel="true"
            labelText="Đơn vị"
            :showAlertStar="true"
            dataTitle="Đơn vị không được để trống."
            api="https://cukcuk.manhnv.net/api/v1/Departments"
            text="DepartmentName"
            value="DepartmentId"
            propName="DepartmentId"
            validate="DepartmentName"
            class="form__ele"
            placeHolder="Nhập đơn vị"
            classInput="input__musthave"
          />
          <LibCombobox
            id="cbxPosition"
            :hasLabel="true"
            labelText="Chức danh"
            api="https://cukcuk.manhnv.net/api/v1/Positions"
            text="PositionName"
            value="PositionId"
            propName="PositionId"
            class="form__ele"
            placeHolder="Nhập chức danh"
          />
        </div>
        <!-- phần nhập form thứ 2 -->
        <div class="form__part form__two">
          <MDatePicker
            labelText="Ngày sinh"
            propName="DateOfBirth"
            class="form__dateofbirth"
          />
          <MRadioButton
            titleText="Giới tính"
            propName="Gender"
            propNameBox="GenderBox"
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
          <MInput
            :hasLabel="true"
            labelText="Số CMND"
            propName="PersonalTaxCode"
            placeHolder="Nhập số CMND"
            validate="EmployeeNameNotEmpty"
            :classInput="'form__personaID'"
            :justNumber="true"
            class="form__ele"
            dataTitle="Tên không được để trống."
          />
          <MDatePicker
            labelText="Ngày cấp"
            propName="CreatedDate"
            class="form__createdDate"
            :formatDate="true"
          />
          <MInput
            :hasLabel="true"
            labelText="Nơi cấp"
            propName=""
            placeHolder="Nhập nơi cấp"
            :classInput="'form__createdwhere'"
            class="form__ele"
          />
        </div>
        <!-- phần nhập form thứ 3 -->
        <div class="form__part form__three">
          <MInput
            :hasLabel="true"
            labelText="Địa chỉ"
            propName="Address"
            placeHolder="Nhập địa chỉ"
            :classInput="'form__address'"
            class="form__ele"
          />
          <MInput
            :hasLabel="true"
            labelText="ĐT di động"
            :justNumber="true"
            propName="PhoneNumber"
            placeHolder="Nhập số điện thoại di động"
            :classInput="'form__phonenum'"
            class="form__ele"
          />
          <MInput
            :hasLabel="true"
            labelText="ĐT cố định"
            :justNumber="true"
            propName=""
            placeHolder="Nhập số điện thoại cố định"
            class="form__ele"
          />
          <MInput
            :hasLabel="true"
            labelText="Email"
            propName="Email"
            placeHolder="Nhập Email"
            :classInput="'form__email'"
            class="form__ele"
          />
          <MInput
            :hasLabel="true"
            labelText="Tài khoản ngân hàng"
            propName=""
            :justNumber="true"
            placeHolder="Nhập tài khoản ngân hàng"
            :classInput="'form__banknum'"
            class="form__ele"
          />
          <MInput
            :hasLabel="true"
            labelText="Tên ngân hàng"
            propName=""
            placeHolder="Nhập tên ngân hàng"
            :classInput="'form__bankname'"
            class="form__ele"
          />
          <MInput
            :hasLabel="true"
            labelText="Chi nhánh"
            propName=""
            placeHolder="Nhập chi nhánh"
            :classInput="'form__bankaddr'"
            class="form__ele"
          />
        </div>
      </div>
      <div class="form__action">
        <MButton
          dataTitle="Đóng (ESC)"
          class="form__cancel"
          buttonName="Hủy"
          :buttonTwo="true"
          @click="$emit('hide-form')"
        />
        <div class="form__action--right">
          <MButton
            dataTitle="cất (ctrl + S)"
            class="form__save--close"
            buttonName="Cất"
            :buttonTwo="true"
          />
          <MButton
            dataTitle="cất và thêm (ctrl + shift + S)"
            class="form__save--readd"
            buttonName="Cất và thêm"
          />
        </div>
      </div>
      <div
        class="icon form__help"
        data-title="Form thêm mới nhân viên, vui lòng điền đầy đủ các mục có dấu *"
      ></div>
      <div
        class="icon form__closebtn form__cancel"
        data-title="Đóng (ESC)"
        @click="$emit('hide-form')"
      ></div>
    </div>
  </div>
</template>
<script>
import MISAEnum from "../../js/enum.js";

import MButton from "../../components/base/MButton.vue";
import MCheckbox from "../../components/base/MCheckbox.vue";
import MDatePicker from "../../components/base/MDatePicker.vue";
import MInput from "../../components/base/MInput.vue";
import MRadioButton from "../../components/base/MRadioButton.vue";

import LibCombobox from "../../lib/combobox/components/LibCombobox.vue";
export default {
  name: "EmployeeForm",
  emits: ["hide-form"],
  components: {
    MButton,
    MCheckbox,
    MDatePicker,
    MInput,
    MRadioButton,
    LibCombobox,
  },
  data() {
    return {
      MISAEnum,
      newEmpCode: "",
    };
  },
  mounted() {
    /**
     * Gọi hàm Api để lấy ra giá trị id đầu tiên rồi tra về trong input đầu tiên
     */
    try {
      // focus vào ô nhập đầu tiên
      this.$refs.input.$el.children[1].children[0].focus();
      // lấy ra api
      let api = this.MISAEnum.API.NEWEMPLOYEECODE;
      fetch(MISAEnum.API.NEWEMPLOYEECODE, { method: "GET" })
        .then((res) => res.text())
        .then((res) => {
          // gán giá trị cần truyền vào trong input
          this.newEmpCode = res;
          console.log(api);
        })
        .catch((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {},
};
</script>
<style scoped>
@import url("../../css/page/employee/employeeForm.css");
</style>
