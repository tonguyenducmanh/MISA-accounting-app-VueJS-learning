<template lang="">
  <div class="form__wrap" form-type="POST" employee-id="" @keyup="checkKeyUp">
    <div class="form">
      <div class="form__heading">
        <div class="form__title">
          {{ this.MISAResource.TitleName.FormTitle[language] }}
        </div>
        <MCheckbox
          :labelText="MISAResource.LabelText.IsCustomer[language]"
          checkboxId="checkbox_kh"
          :checkboxStatus="formObject['employeeType'] === 1 ? true : false"
          :checkboxValue="formObject['employeeType'] === 1 ? '1' : ''"
          ref="checkboxKH"
          @click-check-box="changeCheckboxOption(1)"
        />
        <MCheckbox
          :labelText="MISAResource.LabelText.IsProvider[language]"
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
            :isFocus="true"
            v-model="formObject['employeeCode']"
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormCode[language]"
            :placeHolder="MISAResource.PlaceHolder.FormEmployeeCode[language]"
            :inputAlert="isDuplicateCode"
            @input="disableAlertInput"
            idInput="input__checkId"
            :classInput="'input__focus form__employeeCode'"
            :showAlertStar="true"
            class="form__ele"
            :dataTitle="employeeCodeDataTitle"
            :isNotNull="true"
            :setError="setError.employeeCode"
          />
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormName[language]"
            :placeHolder="MISAResource.PlaceHolder.FormFullName[language]"
            idInput="input__checkId"
            :classInput="'form__employeename'"
            :showAlertStar="true"
            class="form__ele"
            :dataTitle="MISAResource.DataTile.FormFullName[language]"
            :isNotNull="true"
            v-model="formObject['fullName']"
            :setError="setError.fullName"
          />
          <LibCombobox
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormDepartment[language]"
            :showAlertStar="true"
            :dataTitle="MISAResource.DataTile.FormDepartmentName[language]"
            :api="MISAEnum.API.GETDEPARTMENTLIST"
            text="departmentName"
            value="departmentID"
            class="form__ele"
            :placeHolder="MISAResource.PlaceHolder.FormDepartment[language]"
            classInput="input__musthave"
            buttonClass="combobox__button--white"
            v-model:modelValue="formObject['departmentID']"
            v-model:modelName="formObject['departmentName']"
            unique=""
            :isNotNull="true"
            :setError="setError.departmentName"
          />
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormPosition[language]"
            :placeHolder="MISAResource.PlaceHolder.FormPosition[language]"
            :classInput="'form__personaName'"
            class="form__ele"
            v-model="formObject['positionName']"
          />
        </div>
        <!-- phần nhập form thứ 2 -->
        <div class="form__part form__two">
          <MDatePicker
            :labelText="MISAResource.LabelText.FormDateOfBirth[language]"
            class="form__dateofbirth"
            :dataTitle="MISAResource.DataTile.FormDate[language]"
            v-model="formObject['dateOfBirth']"
          />
          <MRadioButton
            :titleText="MISAResource.LabelText.FormGender[language]"
            propNameBox="gender"
            v-model="formObject['gender']"
            :content="[
              {
                name: MISAResource.Gender.Male[language],
                value: 0,
              },
              {
                name: MISAResource.Gender.Female[language],
                value: 1,
              },
              {
                name: MISAResource.Gender.Other[language],
                value: 2,
              },
            ]"
          />
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormIdentityCard[language]"
            :placeHolder="MISAResource.PlaceHolder.FormIdentityCard[language]"
            :classInput="'form__personaID'"
            :justNumber="true"
            class="form__ele"
            :dataTitle="MISAResource.DataTile.FormNumber[language]"
            v-model="formObject['identityCard']"
          />
          <MDatePicker
            :labelText="MISAResource.LabelText.FormIdentityDate[language]"
            :dataTitle="MISAResource.DataTile.FormDate[language]"
            class="form__identityDate"
            v-model="formObject['identityDate']"
          />
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormIdentityPlace[language]"
            :placeHolder="MISAResource.PlaceHolder.FormIdentityPlace[language]"
            :classInput="'form__createdwhere'"
            class="form__ele"
            v-model="formObject['identityPlace']"
          />
        </div>
        <!-- phần nhập form thứ 3 -->
        <div class="form__part form__three">
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormAddress[language]"
            :placeHolder="MISAResource.PlaceHolder.FormAddress[language]"
            :classInput="'form__address'"
            class="form__ele"
            v-model="formObject['address']"
          />
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormTelephoneNumber[language]"
            :placeHolder="
              MISAResource.PlaceHolder.FormTelephoneNumber[language]
            "
            :justNumber="true"
            :classInput="'form__phonenum'"
            class="form__ele"
            :dataTitle="MISAResource.DataTile.FormNumber[language]"
            v-model="formObject['mobilePhone']"
          />
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormPhoneNumber[language]"
            :placeHolder="MISAResource.PlaceHolder.FormPhoneNumber[language]"
            :justNumber="true"
            class="form__ele"
            :dataTitle="MISAResource.DataTile.FormNumber[language]"
            v-model="formObject['telephone']"
          />
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormEmail[language]"
            :placeHolder="MISAResource.PlaceHolder.FormEmail[language]"
            :classInput="'form__email'"
            class="form__ele"
            :isEmail="true"
            :dataTitle="MISAResource.DataTile.FormEmail[language]"
            v-model="formObject['email']"
          />
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormBankAccount[language]"
            :placeHolder="MISAResource.PlaceHolder.FormBankAccount[language]"
            :justNumber="true"
            :classInput="'form__banknum'"
            class="form__ele"
            :dataTitle="MISAResource.DataTile.FormNumber[language]"
            v-model="formObject['bankAccount']"
          />
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormBankName[language]"
            :placeHolder="MISAResource.PlaceHolder.FormBankName[language]"
            :classInput="'form__bankname'"
            class="form__ele"
            v-model="formObject['bankName']"
          />
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormBankBranch[language]"
            :placeHolder="MISAResource.PlaceHolder.FormBankBranch[language]"
            :classInput="'form__bankaddr'"
            class="form__ele"
            v-model="formObject['bankBranch']"
          />
        </div>
      </div>
      <div class="form__action">
        <MButton
          :data-title="MISAResource.DataTile.FormCloseBtn[language]"
          class="form__cancel"
          :buttonName="MISAResource.ButtonText.CancelBtn[language]"
          :buttonTwo="true"
          @click="$emit('hide-all')"
        />
        <div class="form__action--right">
          <MButton
            :data-title="MISAResource.DataTile.FormSaveBtn[language]"
            class="form__save--close"
            :buttonName="MISAResource.ButtonText.SaveBtn[language]"
            :buttonTwo="true"
            @click="saveNew"
          />
          <MButton
            :data-title="MISAResource.DataTile.FormSaveAndAddBtn[language]"
            :buttonName="MISAResource.ButtonText.SaveAndAddBtn[language]"
            class="form__save--readd"
            @click="saveNewAndAdd"
          />
        </div>
      </div>
      <div
        class="icon form__help"
        :data-title="MISAResource.DataTile.FormHelp[language]"
      ></div>
      <div
        class="icon form__closebtn form__cancel"
        :data-title="MISAResource.DataTile.FormCloseBtn[language]"
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
    "show-toast-message",
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
      setError: {
        employeeCode: false,
        fullName: false,
        departmentName: false,
      },
      employeeCodeDataTitle: "Mã nhân viên không được phép để trống.",
      language: "",
      timeOut: null,
    };
  },
  /**
   * Kiểm tra xem method là post hay put, nếu là post thì :
   * Gọi hàm Api để lấy ra giá trị id đầu tiên rồi tra về trong input đầu tiên
   * Nếu là put thì tiến hành fetch data theo currentid và chèn vào trong form luôn, chỉ việc edit thôi
   * Author: Tô Nguyễn Đức Manh (14/09/2022)
   */
  beforeMount() {
    this.language = this.$store.state.language;
    // lấy mã nhân mới nếu là thêm mới
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
          // tăng 1 đơn vị mã nhân viên nếu là nhân bản
          this.getNewEmpCode();
        })
        .catch((res) => {
          console.log(res);
        });
    }
  },
  computed: {
    /**
     * Lấy ra giá trị của ngôn ngữ hiện tại
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    getLanguage() {
      return this.$store.state.language;
    },
  },
  watch: {
    /**
     * Lấy ra giá trị của ngôn ngữ hiện tại
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    getLanguage() {
      this.language = this.$store.state.language;
    },
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
            this.increamentOne(res);
          })
          .catch((res) => {
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tăng giá trị hiện tại lên thêm 1 đơn vị
     * Author: Tô Nguyễn Đức Mạnh (04/10/2022)
     */
    increamentOne(value) {
      try {
        let lastIDArray;
        value !== "" ? (lastIDArray = value) : (lastIDArray = "NV00001");
        const lastIDNumber =
          parseInt(lastIDArray.split("").slice(2, value.length).join("")) + 1;
        const zeroPad = (num, places) => String(num).padStart(places, "0");
        const newIDCout = zeroPad(lastIDNumber, value.length - 2);
        const newNVCount = `NV${newIDCout}`;
        this.formObject["employeeCode"] = newNVCount;
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
      // tạo ra mảng thông báo các ô nhập liệu không được để trống
      let messArr = [];
      let language = this.$store.state.language;
      if (!this.formObject["employeeCode"]) {
        messArr.push(
          this.MISAResource.ErrorValidate.EmployeeCodeNotEmpty[language]
        );
        this.employeeCodeDataTitle =
          this.MISAResource.ErrorValidate.EmployeeCodeNotEmpty[language];
        this.setError.employeeCode = true;
      } else {
        this.setError.employeeCode = false;
      }
      if (!this.formObject["fullName"]) {
        messArr.push(
          this.MISAResource.ErrorValidate.EmployeeNameNotEmpty[language]
        );
        this.setError.fullName = true;
      } else {
        this.setError.fullName = false;
      }
      if (
        !this.formObject["departmentName"] ||
        !this.formObject["departmentID"]
      ) {
        messArr.push(this.MISAResource.ErrorValidate.DepartmentName[language]);
        this.setError.departmentName = true;
      } else {
        this.setError.departmentName = false;
      }
      if (messArr.length > 0) {
        this.$emit("alert-popup", messArr.join("#"));
        return false;
      } else {
        return true;
      }
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
        // debugger
        fetch(api, {
          method: currentMethod,
          headers: {
            "Content-Type": this.MISAEnum.APIHEADER.APPJSON,
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
          let currentCode = this.$store.state.currentEditCode;
          let formCode = this.formObject["employeeCode"];
          let methodPost = this.MISAEnum.method.POST;
          let methodPut = this.MISAEnum.method.PUT;
          // kiểm tra xem có cần check mã trùng không, nếu là thêm mới thì luôn check, nếu là sửa
          // thì chỉ check mã trùng khi mã code khác mã code của nhân viên đang edit
          if (
            methodNow === methodPost ||
            (methodNow === methodPut && currentCode !== formCode)
          ) {
            // nếu là thêm mới thì
            // kiểm tra xem id đã trùng chưa ?
            let apiTest = `${this.MISAEnum.API.CHECKEMPLOYEECODE}${formCode}`;
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
                  let language = this.$store.state.language;
                  this.isDuplicateCode = true;
                  this.employeeCodeDataTitle =
                    this.MISAResource.ErrorValidate.EmployeeCodeIsDuplicated[
                      language
                    ];
                  this.setError.employeeCode = true;
                  // đưa ra cảnh báo cho người dùng là đã trùng ID rồi
                  this.$emit(
                    "warning-duplicate",
                    this.formObject["employeeCode"]
                  );
                } else {
                  {
                    let language = this.$store.state.language;
                    this.employeeCodeDataTitle =
                      this.MISAResource.ErrorValidate.EmployeeCodeNotEmpty[
                        language
                      ];
                    this.setError.employeeCode = false;
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
                      // nếu là nhân bản thì hiện là nhân bản
                      this.showDupplicatedNoti();
                      this.$store.dispatch("changeEditID", "");
                      this.$store.dispatch("changeEditCode", "");
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
            // xóa edit id, edit code đi
            this.$store.dispatch("changeEditID", "");
            this.$store.dispatch("changeEditCode", "");
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
          let currentCode = this.$store.state.currentEditCode;
          let formCode = this.formObject["employeeCode"];
          let methodPost = this.MISAEnum.method.POST;
          let methodPut = this.MISAEnum.method.PUT;
          // kiểm tra xem có cần check mã trùng không, nếu là thêm mới thì luôn check, nếu là sửa
          // thì chỉ check mã trùng khi mã code khác mã code của nhân viên đang edit
          if (
            methodNow === methodPost ||
            (methodNow === methodPut && currentCode !== formCode)
          ) {
            let apiTest = `${this.MISAEnum.API.CHECKEMPLOYEECODE}${formCode}`;
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
                  let language = this.$store.state.language;
                  this.isDuplicateCode = true;
                  this.employeeCodeDataTitle =
                    this.MISAResource.ErrorValidate.EmployeeCodeIsDuplicated[
                      language
                    ];
                  this.setError.employeeCode = true;
                  // đưa ra cảnh báo cho người dùng là đã trùng ID rồi
                  this.$emit(
                    "warning-duplicate",
                    this.formObject["employeeCode"]
                  );
                } else {
                  {
                    let language = this.$store.state.language;
                    this.isDuplicateCode = false;
                    this.employeeCodeDataTitle =
                      this.MISAResource.ErrorValidate.EmployeeCodeNotEmpty[
                        language
                      ];
                    this.setError.employeeCode = false;
                    // thực hiện lưu vào database
                    this.confirmSave(false);
                    // hiện thông báo lưu
                    if (this.$store.state.currentEditID === "") {
                      // nếu là thêm mới thì hiện là thêm mới
                      this.showAddedNoti();
                    } else {
                      // nếu là nhân bản thì hiện là nhân bản
                      this.showDupplicatedNoti();
                      this.$store.dispatch("changeEditID", "");
                      this.$store.dispatch("changeEditCode", "");
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
            this.$store.dispatch("changeEditCode", "");
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
        this.$emit(
          "show-toast-message",
          this.MISAEnum.toasttype.SUCCESS,
          this.MISAResource.ToastMessage.AddedNoti
        );
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
        // hiện toast message sửa người dùng thành công
        this.$emit(
          "show-toast-message",
          this.MISAEnum.toasttype.SUCCESS,
          this.MISAResource.ToastMessage.EditedNoti
        );
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
        // hiện toast message nhân bản người dùng thành công
        this.$emit(
          "show-toast-message",
          this.MISAEnum.toasttype.SUCCESS,
          this.MISAResource.ToastMessage.DuplicatedNoti
        );
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Kiểm tra các phím được nhấn
     * Author: Tô Nguyễn Đức Mạnh (09/10/2022)
     */
    checkKeyUp() {
      try {
        const check = (event) => {
          // nếu là ấn phím ESC thì đóng
          if (event.which === this.MISAEnum.keycode.ESC) {
            event.preventDefault();
            this.$emit("hide-form");
          }
          // nếu là ấn phím ctrl và phím F8
          if (event.ctrlKey && event.which === this.MISAEnum.keycode.F8) {
            event.preventDefault();
            this.saveNew();
          }
          // nếu là ấn phím ctrl và phím F9 thì hủy thêm hoặc sửa
          if (event.ctrlKey && event.which === this.MISAEnum.keycode.F9) {
            event.preventDefault();
            this.$emit("hide-all");
          }
        };
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(check(event), 500);
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
