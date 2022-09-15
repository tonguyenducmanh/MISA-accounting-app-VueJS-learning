<template lang="">
  <div class="form__wrap" form-type="POST" employee-id="">
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
            ref="EmployeeCode"
            :inputValue="newEmpCode"
            :hasLabel="true"
            labelText="Mã"
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
            ref="FullName"
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
            ref="DepartmentId"
            validate="DepartmentName"
            class="form__ele"
            placeHolder="Nhập đơn vị"
            classInput="input__musthave"
            :fetchedValue="DepartmentId"
            unique=""
          />
          <LibCombobox
            id="cbxPosition"
            :hasLabel="true"
            labelText="Chức danh"
            api="https://cukcuk.manhnv.net/api/v1/Positions"
            text="PositionName"
            value="PositionId"
            ref="PositionId"
            class="form__ele"
            placeHolder="Nhập chức danh"
            :fetchedValue="PositionId"
            unique=""
          />
        </div>
        <!-- phần nhập form thứ 2 -->
        <div class="form__part form__two">
          <MDatePicker
            labelText="Ngày sinh"
            ref="DateOfBirth"
            class="form__dateofbirth"
          />
          <MRadioButton
            titleText="Giới tính"
            ref="Gender"
            propNameBox="GenderBox"
            :defaultValue="genderType"
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
            ref="PersonalTaxCode"
            placeHolder="Nhập số CMND"
            validate="EmployeeNameNotEmpty"
            :classInput="'form__personaID'"
            :justNumber="true"
            class="form__ele"
            dataTitle="Tên không được để trống."
          />
          <MDatePicker
            labelText="Ngày cấp"
            ref="CreatedDate"
            class="form__createdDate"
            :formatDate="true"
          />
          <MInput
            :hasLabel="true"
            labelText="Nơi cấp"
            ref="CreatedPlace"
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
            ref="Address"
            placeHolder="Nhập địa chỉ"
            :classInput="'form__address'"
            class="form__ele"
          />
          <MInput
            :hasLabel="true"
            labelText="ĐT di động"
            :justNumber="true"
            ref="PhoneNumber"
            placeHolder="Nhập số điện thoại di động"
            :classInput="'form__phonenum'"
            class="form__ele"
          />
          <MInput
            :hasLabel="true"
            labelText="ĐT cố định"
            :justNumber="true"
            ref="PhoneFix"
            placeHolder="Nhập số điện thoại cố định"
            class="form__ele"
          />
          <MInput
            :hasLabel="true"
            labelText="Email"
            ref="Email"
            placeHolder="Nhập Email"
            :classInput="'form__email'"
            class="form__ele"
          />
          <MInput
            :hasLabel="true"
            labelText="Tài khoản ngân hàng"
            ref="BackAccount"
            :justNumber="true"
            placeHolder="Nhập tài khoản ngân hàng"
            :classInput="'form__banknum'"
            class="form__ele"
          />
          <MInput
            :hasLabel="true"
            labelText="Tên ngân hàng"
            ref="BankName"
            placeHolder="Nhập tên ngân hàng"
            :classInput="'form__bankname'"
            class="form__ele"
          />
          <MInput
            :hasLabel="true"
            labelText="Chi nhánh"
            ref="BankBrach"
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
            @click="saveNew"
          />
          <MButton
            dataTitle="cất và thêm (ctrl + shift + S)"
            class="form__save--readd"
            buttonName="Cất và thêm"
            @click="saveNewAndAdd"
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
import MISAResource from "../../js/resource.js";
import common from "../../js/common.js";

import MButton from "../../components/base/MButton.vue";
import MCheckbox from "../../components/base/MCheckbox.vue";
import MDatePicker from "../../components/base/MDatePicker.vue";
import MInput from "../../components/base/MInput.vue";
import MRadioButton from "../../components/base/MRadioButton.vue";

import LibCombobox from "../../lib/combobox/components/LibCombobox.vue";
export default {
  name: "EmployeeForm",
  emits: ["hide-form", "hide-all", "refresh-list", "warning-duplicate"],
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
      MISAResource,
      common,
      newEmpCode: "",
      formType: "POST",
      PositionId: "",
      DepartmentId: "",
      genderType: 0,
    };
  },
  /**
   * Kiểm tra xem method là post hay put, nếu là post thì :
   * Gọi hàm Api để lấy ra giá trị id đầu tiên rồi tra về trong input đầu tiên
   * Nếu là put thì tiến hành fetch data theo currentid và chèn vào trong form luôn, chỉ việc edit thôi
   * Author: Tô Nguyễn Đức Manh (14/09/2022)
   */
  beforeMount() {
    // lấy mã id mới nếu là thêm mới
    let currentMethod = this.$store.state.method;
    if (currentMethod === this.MISAEnum.method.POST) {
      this.getNewEmpCode();
    }
    // fetch data nếu là form edit
    if (currentMethod === this.MISAEnum.method.PUT) {
      let currentId = this.$store.state.currentEditID;
      let apiTest = `${this.MISAEnum.API.GETEMPLOYEELIST}/${currentId}`;
      // lấy dữ liệu người dùng hiện tại
      fetch(apiTest, { method: "GET" })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((res) => {
          // map dữ liệu vào trong form nhập
          // set value Minput component structure
          this.$refs.EmployeeCode.$el.children[1].children[0].value = res[
            "EmployeeCode"
          ]
            ? res["EmployeeCode"]
            : "";
          this.$refs.FullName.$el.children[1].children[0].value = res[
            "FullName"
          ]
            ? res["FullName"]
            : "";
          this.$refs.PersonalTaxCode.$el.children[1].children[0].value = res[
            "PersonalTaxCode"
          ]
            ? res["PersonalTaxCode"]
            : "";
          this.$refs.CreatedPlace.$el.children[1].children[0].value = res[
            "CreatedPlace"
          ]
            ? res["CreatedPlace"]
            : "";
          this.$refs.Address.$el.children[1].children[0].value = res["Address"]
            ? res["Address"]
            : "";
          this.$refs.PhoneNumber.$el.children[1].children[0].value = res[
            "PhoneNumber"
          ]
            ? res["PhoneNumber"]
            : "";
          this.$refs.PhoneFix.$el.children[1].children[0].value = res[
            "PhoneFix"
          ]
            ? res["PhoneFix"]
            : "";
          this.$refs.BackAccount.$el.children[1].children[0].value = res[
            "BackAccount"
          ]
            ? res["BackAccount"]
            : "";
          this.$refs.BankName.$el.children[1].children[0].value = res[
            "BankName"
          ]
            ? res["BankName"]
            : "";
          this.$refs.BankBrach.$el.children[1].children[0].value = res[
            "BankBrach"
          ]
            ? res["BankBrach"]
            : "";

          // set value LibCombobox component structure
          this.DepartmentId = res["DepartmentId"];
          this.PositionId = res["PositionId"];

          // set value MDatepicker component structure
          this.$refs.DateOfBirth.$el.children[1].value = this.common.formatDate(
            res["DateOfBirth"],
            "-"
          );
          // set value MDGender component structure
          this.genderType = res["Gender"];
        })
        .catch((res) => {
          console.log(res);
        });
    }
  },
  /**
   * khi form đã mounted vào trong DOM thì tiến hành focus vào trong ô nhập liệu đầu tiên
   * Author: Tô Nguyễn Đức Mạnh (15/09/2022)
   */
  mounted() {
    this.$refs.EmployeeCode.$el.children[1].children[0].focus();
  },
  methods: {
    /**
     * Lấy ra mã người dùng mới rồi focus vào ô đầu tiên
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    getNewEmpCode() {
      try {
        // focus vào ô nhập đầu tiên
        // lấy ra api
        let api = this.MISAEnum.API.NEWEMPLOYEECODE;
        fetch(api, { method: "GET" })
          .then((res) => res.text())
          .then((res) => {
            // gán giá trị cần truyền vào trong input
            this.newEmpCode = res;
          })
          .catch((res) => {
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lấy ra form value và fetch lên api
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    confirmSave() {
      try {
        let employee = {};
        // get value Minput component structure
        employee["EmployeeCode"] =
          this.$refs.EmployeeCode.$el.children[1].children[0].value;
        employee["FullName"] =
          this.$refs.FullName.$el.children[1].children[0].value;
        employee["PersonalTaxCode"] =
          this.$refs.PersonalTaxCode.$el.children[1].children[0].value;
        employee["Address"] =
          this.$refs.Address.$el.children[1].children[0].value;
        employee["PhoneNumber"] =
          this.$refs.PhoneNumber.$el.children[1].children[0].value;
        employee["Email"] = this.$refs.Email.$el.children[1].children[0].value;

        // get value LibCombobox component structure
        employee["DepartmentId"] =
          this.$refs.DepartmentId.$el.children[1].getAttribute("value");
        employee["PositionId"] =
          this.$refs.PositionId.$el.children[1].getAttribute("value");

        // get value MDatepicker component structure
        employee["DateOfBirth"] = this.$refs.DateOfBirth.$el.children[1].value;
        // employee["CreatedDate"] = this.$refs.CreatedDate.$el.children[1].value;

        // get value MDGender component structure
        employee["Gender"] =
          this.$refs.Gender.$el.children[1].getAttribute("value");

        // tiến hành POST dữ liệu lên api
        let currentMethod = this.$store.state.method;
        let api = this.MISAEnum.API.GETEMPLOYEELIST;
        // check xem là method put hay post, nếu là put thì thêm id vào sau api
        if (currentMethod === this.MISAEnum.method.PUT) {
          api += `/${this.$store.state.currentEditID}`;
        }
        fetch(api, {
          method: currentMethod,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xóa toàn bộ input value trong form nhập đi.
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    clearForm() {
      // set value Minput component structure
      this.$refs.EmployeeCode.$el.children[1].children[0].value = "";
      this.$refs.FullName.$el.children[1].children[0].value = "";
      this.$refs.PersonalTaxCode.$el.children[1].children[0].value = "";
      this.$refs.CreatedPlace.$el.children[1].children[0].value = "";
      this.$refs.Address.$el.children[1].children[0].value = "";
      this.$refs.PhoneNumber.$el.children[1].children[0].value = "";
      this.$refs.PhoneFix.$el.children[1].children[0].value = "";
      this.$refs.BackAccount.$el.children[1].children[0].value = "";
      this.$refs.BankName.$el.children[1].children[0].value = "";
      this.$refs.BankBrach.$el.children[1].children[0].value = "";

      // set value LibCombobox component structure
      this.$refs.PositionId.clearComboboxSelected();
      this.$refs.DepartmentId.clearComboboxSelected();
      // set value MDatepicker component structure
      this.$refs.DateOfBirth.$el.children[1].value = "";
      // set value MDGender component structure
      this.genderType = 0;
    },
    /**
     * Lưu người dùng vào database
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    saveNew() {
      try {
        let methodNow = this.$store.state.method;
        // kiểm tra xem phương thức hiện tại là sửa hay thêm mới
        if (methodNow === this.MISAEnum.method.POST) {
          // nếu là thêm mới thì
          // kiểm tra xem id đã trùng chưa ?
          let currentId =
            this.$refs.EmployeeCode.$el.children[1].children[0].value;
          let apiTest = `${this.MISAEnum.API.GETEMPLOYEEFILTER}?employeeFilter=${currentId}&pageSize=1`;

          fetch(apiTest, { method: methodNow })
            .then((res) => {
              if (res.status == 200) {
                // trả về false
                return false;
              } else {
                return true;
              }
            })
            .then((res) => {
              if (res === false) {
                // đưa ra cảnh báo cho người dùng là đã trùng ID rồi
                this.$emit(
                  "warning-duplicate",
                  this.$refs.EmployeeCode.$el.children[1].children[0].value
                );
              } else {
                {
                  // thực hiện lưu vào database
                  this.confirmSave();
                  // ẩn form
                  this.$emit("hide-all");
                  // hiện thông báo lưu
                  this.showAddedNoti();
                }
              }
            })
            .catch((res) => {
              console.log(res);
            });
        } else {
          // nếu là sửa thì tiến hành update dữ liệu
          // thực hiện lưu vào database
          this.confirmSave();
          // ẩn form
          this.$emit("hide-all");
          // hiện thông báo lưu
          this.showEditedNoti();
          // sửa lại method về post
          this.$store.dispatch("changeMethod", this.MISAEnum.method.POST);
          // xóa edit id đi
          this.$store.dispatch("changeEditID", "");
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lưu người dùng vào database và giữ form luôn
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    saveNewAndAdd() {
      try {
        let methodNow = this.$store.state.method;
        // kiểm tra xem phương thức hiện tại là sửa hay thêm mới
        if (methodNow === this.MISAEnum.method.POST) {
          // kiểm tra xem id đã trùng chưa ?
          let currentId =
            this.$refs.EmployeeCode.$el.children[1].children[0].value;
          let apiTest = `${this.MISAEnum.API.GETEMPLOYEEFILTER}?employeeFilter=${currentId}&pageSize=1`;

          fetch(apiTest, { method: methodNow })
            .then((res) => {
              if (res.status == 200) {
                // trả về false
                return false;
              } else {
                return true;
              }
            })
            .then((res) => {
              if (res === false) {
                // đưa ra cảnh báo cho người dùng là đã trùng ID rồi
                this.$emit(
                  "warning-duplicate",
                  this.$refs.EmployeeCode.$el.children[1].children[0].value
                );
              } else {
                {
                  // thực hiện lưu vào database
                  this.confirmSave();
                  // hiện thông báo lưu
                  this.showAddedNoti();
                  // clear form đi
                  this.clearForm();
                  // lấy lại dữ liệu mới
                  this.getNewEmpCode();
                  // gán dữ liệu mới vào trong ô đó đi
                  this.$refs.EmployeeCode.$el.children[1].children[0].value =
                    this.newEmpCode;
                }
              }
            });
        } else {
          // thực hiện lưu vào database
          this.confirmSave();
          // hiện thông báo lưu
          this.showEditedNoti();
          // clear form đi
          this.clearForm();
          // lấy lại dữ liệu mới
          this.getNewEmpCode();
          // sửa lại method về post
          this.$store.dispatch("changeMethod", this.MISAEnum.method.POST);
          // xóa edit id đi
          this.$store.dispatch("changeEditID", "");
          // gán dữ liệu mới vào trong ô đó đi
          this.$refs.EmployeeCode.$el.children[1].children[0].value =
            this.newEmpCode;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Ẩn toàn bộ form và hiện thông báo thêm mới thành công
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    showAddedNoti() {
      try {
        // hiện toast message thêm người dùng thành công
        let lang = this.$store.state.language;
        this.$store.dispatch(
          "changeToastType",
          this.MISAEnum.toasttype.SUCCESS
        );
        this.$store.dispatch(
          "changeToastText",
          this.MISAResource.ToastMessage.AddedNoti[lang]
        );
        this.$store.dispatch("toggleToast", true);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiển thị thông báo là đã sửa thành công
     * Author: Tô Nguyễn Đức Mạnh (14/09/2022)
     */
    showEditedNoti() {
      try {
        // hiện toast message thêm người dùng thành công
        let lang = this.$store.state.language;
        this.$store.dispatch(
          "changeToastType",
          this.MISAEnum.toasttype.SUCCESS
        );
        this.$store.dispatch(
          "changeToastText",
          this.MISAResource.ToastMessage.EditedNoti[lang]
        );
        this.$store.dispatch("toggleToast", true);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import url("../../css/page/employee/employeeForm.css");
</style>
