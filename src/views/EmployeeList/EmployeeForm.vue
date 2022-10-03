<template lang="">
  <div
    class="form__wrap"
    form-type="POST"
    employee-id=""
    @keydown.esc="$emit('hide-form')"
  >
    <div class="form">
      <div class="form__heading">
        <div class="form__title">Thông tin nhân viên</div>
        <MCheckbox
          labelText="Là khách hàng"
          checkboxId="checkbox_kh"
          :checkboxStatus="formObject['employeeType'] === 1 ? true : false"
          :checkboxValue="formObject['employeeType'] === 1 ? '1' : ''"
          ref="checkboxKH"
          @click-check-box="changeCheckboxOption(1)"
        />
        <MCheckbox
          labelText="Là nhà cung cấp"
          checkboxId="checkbox_ncc"
          :checkboxStatus="formObject['employeeType'] === 2 ? true : false"
          :checkboxValue="formObject['employeeType'] === 2 ? '2' : ''"
          ref="checkboxNCC"
          @click-check-box="changeCheckboxOption(2)"
        />
      </div>
      <div class="form__body">
        <!-- phần nhập form thứ nhất -->
        <div class="form__part form__one">
          <MInput
            ref="employeeCode"
            v-model="formObject['employeeCode']"
            :hasLabel="true"
            labelText="Mã"
            placeHolder="Nhập mã nhân viên"
            :inputAlert="isDuplicateCode"
            @input="disableAlertInput"
            idInput="input__checkId"
            :classInput="'input__focus form__employeeCode'"
            :showAlertStar="true"
            class="form__ele"
            dataTitle="Mã không được để trống."
            :isNotNull="true"
          />
          <MInput
            :hasLabel="true"
            labelText="Tên"
            placeHolder="Nhập họ và tên"
            idInput="input__checkId"
            :classInput="'form__employeename'"
            :showAlertStar="true"
            class="form__ele"
            dataTitle="Tên không được để trống."
            :isNotNull="true"
            v-model="formObject['fullName']"
          />
          <LibCombobox
            id="cbxDepartment"
            :hasLabel="true"
            labelText="Đơn vị"
            :showAlertStar="true"
            dataTitle="Đơn vị không được để trống."
            :api="MISAEnum.API.GETDEPARTMENTLIST"
            text="departmentName"
            value="departmentID"
            class="form__ele"
            placeHolder="Nhập đơn vị"
            classInput="input__musthave"
            v-model="formObject['departmentID']"
            :fetchedValue="formObject['departmentID']"
            unique=""
            :isNotNull="true"
          />
          <MInput
            :hasLabel="true"
            labelText="Chức danh"
            placeHolder="Nhập chức danh"
            :classInput="'form__personaName'"
            class="form__ele"
            v-model="formObject['positionName']"
          />
        </div>
        <!-- phần nhập form thứ 2 -->
        <div class="form__part form__two">
          <MDatePicker
            labelText="Ngày sinh"
            class="form__dateofbirth"
            v-model="formObject['dateOfBirth']"
          />
          <MRadioButton
            titleText="Giới tính"
            propNameBox="gender"
            :defaultValue="formObject['gender']"
            v-model="formObject['gender']"
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
            placeHolder="Nhập số CMND"
            :classInput="'form__personaID'"
            :justNumber="true"
            class="form__ele"
            dataTitle="Chỉ đường điền các số từ 0-9"
            :isNumber="true"
            v-model="formObject['identityCard']"
          />
          <MDatePicker
            labelText="Ngày cấp"
            class="form__identityDate"
            v-model="formObject['identityDate']"
          />
          <MInput
            :hasLabel="true"
            labelText="Nơi cấp"
            placeHolder="Nhập nơi cấp"
            :classInput="'form__createdwhere'"
            class="form__ele"
            v-model="formObject['identityPlace']"
          />
        </div>
        <!-- phần nhập form thứ 3 -->
        <div class="form__part form__three">
          <MInput
            :hasLabel="true"
            labelText="Địa chỉ"
            placeHolder="Nhập địa chỉ"
            :classInput="'form__address'"
            class="form__ele"
            v-model="formObject['address']"
          />
          <MInput
            :hasLabel="true"
            labelText="ĐT di động"
            :justNumber="true"
            placeHolder="Nhập số điện thoại di động"
            :classInput="'form__phonenum'"
            class="form__ele"
            dataTitle="Chỉ đường điền các số từ 0-9"
            :isNumber="true"
            v-model="formObject['mobilePhone']"
          />
          <MInput
            :hasLabel="true"
            labelText="ĐT cố định"
            :justNumber="true"
            placeHolder="Nhập số điện thoại cố định"
            class="form__ele"
            dataTitle="Chỉ đường điền các số từ 0-9"
            :isNumber="true"
            v-model="formObject['telephone']"
          />
          <MInput
            :hasLabel="true"
            labelText="Email"
            placeHolder="Nhập Email"
            :classInput="'form__email'"
            class="form__ele"
            :isEmail="true"
            data-title="Email chưa đúng định dạng."
            v-model="formObject['email']"
          />
          <MInput
            :hasLabel="true"
            labelText="Tài khoản ngân hàng"
            :justNumber="true"
            placeHolder="Nhập tài khoản ngân hàng"
            :classInput="'form__banknum'"
            class="form__ele"
            dataTitle="Chỉ đường điền các số từ 0-9"
            :isNumber="true"
            v-model="formObject['bankAccount']"
          />
          <MInput
            :hasLabel="true"
            labelText="Tên ngân hàng"
            placeHolder="Nhập tên ngân hàng"
            :classInput="'form__bankname'"
            class="form__ele"
            v-model="formObject['bankName']"
          />
          <MInput
            :hasLabel="true"
            labelText="Chi nhánh"
            placeHolder="Nhập chi nhánh"
            :classInput="'form__bankaddr'"
            class="form__ele"
            v-model="formObject['bankBranch']"
          />
        </div>
      </div>
      <div class="form__action">
        <MButton
          dataTitle="Đóng (ESC)"
          class="form__cancel"
          buttonName="Hủy"
          :buttonTwo="true"
          @click="$emit('hide-all')"
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
  emits: [
    "hide-form",
    "hide-all",
    "warning-duplicate",
    "alert-popup",
    "update-table",
  ],
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
      departmentID: "",
      genderType: 0,
      formObject: {},
      isReload: false,
      isDuplicateCode: false,
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
      fetch(apiTest, { method: this.MISAEnum.method.GET })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((res) => {
          // map dữ liệu vào trong form nhập
          // set value Minput component structure
          this.formObject = res;
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
    this.$refs.employeeCode.$el.children[1].children[0].focus();
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
        fetch(api, { method: this.MISAEnum.method.GET })
          .then((res) => res.text())
          .then((res) => {
            // gán giá trị tăng 1 đơn vị cần truyền vào trong input
            const lastID = res;
            let lastIDArray;
            lastID !== "" ? (lastIDArray = lastID) : (lastIDArray = "NV00001");
            const lastIDNumber =
              parseInt(lastIDArray.split("").slice(2, lastID.length).join("")) +
              1;
            const zeroPad = (num, places) => String(num).padStart(places, "0");
            const newIDCout = zeroPad(lastIDNumber, lastID.length - 2);
            const newNVCount = `NV${newIDCout}`;
            this.newEmpCode = newNVCount;
          })
          .then(() => {
            if (this.$refs.employeeCode) {
              this.$refs.employeeCode.$el.children[1].children[0].value =
                this.newEmpCode;
            }
          })
          .catch((res) => {
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tự động tắt cái trùng mã đi khi mà nhập lại vào ô mã record
     * Author: Tô Nguyễn Đức Mạnh (03/10/2022)
     */
    disableAlertInput() {
      this.isDuplicateCode = false;
    },
    /**
     * thay đổi ô check box trong form
     * Author: Tô Nguyễn Đức Mạnh (28/09/2022)
     */
    changeCheckboxOption(number) {
      try {
        event.preventDefault();
        console.log(number);
        this.formObject["employeeType"] = number;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Kiểm tra form xem có trống các ô bắt buộc không ?
     * Nếu các ô đó trống thì không cho lưu mà thay vào đó là hiện popup cảnh báo
     * Author : Tô Nguyễn Đức Mạnh (15/09/2022)
     */
    checkBeforeSave() {
      return true;
    },
    /**
     * Lấy ra form value và fetch lên api
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    confirmSave(isReload) {
      try {
        let me = this;
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
          body: JSON.stringify(me.formObject),
        })
          .then(() => {
            // clear form đi
            this.clearForm();
            // lấy lại dữ liệu mới
            this.getNewEmpCode();
          })
          .then(() => {
            if (isReload === true) {
              this.$emit("update-table");
            } else {
              return "";
            }
          })
          .then(() => {
            // ẩn form
            if (isReload === true) {
              this.$emit("hide-all");
            } else {
              return "";
            }
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
      this.formObject = {};
    },
    /**
     * Lưu người dùng vào database
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    saveNew() {
      try {
        // kiểm tra xem đã điền các trường bắt buộc chưa
        let inputMustHaveEmpty = this.checkBeforeSave();
        if (inputMustHaveEmpty === true) {
          let methodNow = this.$store.state.method;
          // kiểm tra xem phương thức hiện tại là sửa hay thêm mới
          if (methodNow === this.MISAEnum.method.POST) {
            // nếu là thêm mới thì
            // kiểm tra xem id đã trùng chưa ?
            let apiTest = `${this.MISAEnum.API.CHECKEMPLOYEECODE}${this.formObject["employeeCode"]}`;
            fetch(apiTest, { method: this.MISAEnum.method.GET })
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
                  this.isDuplicateCode = true;
                  // đưa ra cảnh báo cho người dùng là đã trùng ID rồi
                  this.$emit(
                    "warning-duplicate",
                    this.$refs.employeeCode.$el.children[1].children[0].value
                  );
                } else {
                  {
                    this.isDuplicateCode = false;
                    // thực hiện lưu vào database
                    this.confirmSave(true);
                    // hiện thông báo lưu
                    if (this.$store.state.currentEditID === "") {
                      // nếu là thêm mới thì hiện là thêm mới
                      this.showAddedNoti();
                    } else {
                      // nếu là nhân bản thì hiện là nhân bản
                      this.showDupplicatedNoti();
                      this.$store.state.currentEditID = "";
                    }
                  }
                }
              })
              .catch((res) => {
                console.log(res);
              });
          } else {
            // nếu là sửa thì tiến hành update dữ liệu
            // thực hiện lưu vào database
            this.confirmSave(true);
            // hiện thông báo lưu
            this.showEditedNoti();
            // sửa lại method về post
            this.$store.dispatch("changeMethod", this.MISAEnum.method.POST);
            // xóa edit id đi
            this.$store.dispatch("changeEditID", "");
          }
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
        // kiểm tra xem đã điền các trường bắt buộc chưa

        let inputMustHaveEmpty = this.checkBeforeSave();
        if (inputMustHaveEmpty === true) {
          let methodNow = this.$store.state.method;
          // kiểm tra xem phương thức hiện tại là sửa hay thêm mới
          if (methodNow === this.MISAEnum.method.POST) {
            let apiTest = `${this.MISAEnum.API.CHECKEMPLOYEECODE}${this.formObject["employeeCode"]}`;
            fetch(apiTest, { method: this.MISAEnum.method.GET })
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
                    this.$refs.employeeCode.$el.children[1].children[0].value
                  );
                } else {
                  {
                    // thực hiện lưu vào database
                    this.confirmSave(false);
                    // hiện thông báo lưu
                    if (this.$store.state.currentEditID === "") {
                      // nếu là thêm mới thì hiện là thêm mới
                      this.showAddedNoti();
                    } else {
                      // nếu là nhân bản thì hiện là nhân bản
                      this.showDupplicatedNoti();
                      this.$store.state.currentEditID = "";
                    }
                  }
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            // thực hiện lưu vào database
            this.confirmSave(false);
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
          }
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
    /**
     * Hiển thị thông báo là đã nhân bản thành công
     * Author: Tô Nguyễn Đức Mạnh (14/09/2022)
     */
    showDupplicatedNoti() {
      try {
        // hiện toast message thêm người dùng thành công
        let lang = this.$store.state.language;
        this.$store.dispatch(
          "changeToastType",
          this.MISAEnum.toasttype.SUCCESS
        );
        this.$store.dispatch(
          "changeToastText",
          this.MISAResource.ToastMessage.DuplicatedNoti[lang]
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
