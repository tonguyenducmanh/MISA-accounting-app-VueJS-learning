<template lang="">
  <!-- form nhập liệu thông tin nhân viên -->
  <div class="form__wrap" form-type="POST" employee-id="" @keyup="checkKeyUp">
    <div class="form">
      <!-- phần đầu của form form -->
      <div class="form__heading">
        <!-- phần tiêu đề của form -->
        <div class="form__title">
          {{ this.MISAResource.TitleName.FormTitle[getLanguage] }}
        </div>
        <!-- 2 check box bên dưới dùng để tích chọn là khách hàng và là nhà cung cấp -->
        <MCheckbox
          :labelText="MISAResource.LabelText.IsCustomer[getLanguage]"
          checkboxId="checkbox_kh"
          :checkboxStatus="formObject['employeeType'] === 1 ? true : false"
          :checkboxValue="formObject['employeeType'] === 1 ? '1' : ''"
          ref="checkboxKH"
          @click-label-box="changeCheckboxOption(1)"
        />
        <MCheckbox
          :labelText="MISAResource.LabelText.IsProvider[getLanguage]"
          checkboxId="checkbox_ncc"
          :checkboxStatus="formObject['employeeType'] === 2 ? true : false"
          :checkboxValue="formObject['employeeType'] === 2 ? '2' : ''"
          ref="checkboxNCC"
          @click-label-box="changeCheckboxOption(2)"
        />
      </div>
      <!-- phần body của form -->
      <div class="form__body">
        <!-- phần nhập form thứ nhất -->
        <div class="form__part form__one">
          <!-- phần nhập mã nhân viên -->
          <MInput
            :isFocus="true"
            v-model="formObject['employeeCode']"
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormCode[getLanguage]"
            :placeHolder="
              MISAResource.PlaceHolder.FormEmployeeCode[getLanguage]
            "
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
          <!-- phần nhập tên nhân viên -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormName[getLanguage]"
            :placeHolder="MISAResource.PlaceHolder.FormFullName[getLanguage]"
            idInput="input__checkId"
            :classInput="'form__employeename'"
            :showAlertStar="true"
            class="form__ele"
            :dataTitle="MISAResource.DataTile.FormFullName[getLanguage]"
            :isNotNull="true"
            v-model="formObject['fullName']"
            :setError="setError.fullName"
          />
          <!-- combobox nhập văn phòng làm việc -->
          <LibCombobox
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormDepartment[getLanguage]"
            :showAlertStar="true"
            :dataTitle="MISAResource.DataTile.FormDepartmentName[getLanguage]"
            :api="MISAEnum.API.GETDEPARTMENTLIST"
            text="departmentName"
            value="departmentID"
            class="form__ele"
            :placeHolder="MISAResource.PlaceHolder.FormDepartment[getLanguage]"
            classInput="input__musthave"
            buttonClass="combobox__button--white"
            v-model:modelValue="formObject['departmentID']"
            v-model:modelName="formObject['departmentName']"
            unique=""
            :isNotNull="true"
            :setError="setError.departmentName"
          />
          <!-- phần nhập chức vụ -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormPosition[getLanguage]"
            :placeHolder="MISAResource.PlaceHolder.FormPosition[getLanguage]"
            :classInput="'form__personaName'"
            class="form__ele"
            v-model="formObject['positionName']"
          />
        </div>
        <!-- phần nhập form thứ 2 -->
        <div class="form__part form__two">
          <!-- phần chọn ngày sinh -->
          <MDatePicker
            :labelText="MISAResource.LabelText.FormDateOfBirth[getLanguage]"
            class="form__dateofbirth"
            :dataTitle="MISAResource.DataTile.FormDate[getLanguage]"
            v-model="formObject['dateOfBirth']"
          />
          <!-- phần nhập giới tính -->
          <MRadioButton
            :titleText="MISAResource.LabelText.FormGender[getLanguage]"
            propNameBox="gender"
            v-model="formObject['gender']"
            :content="[
              {
                name: MISAResource.Gender.Male[getLanguage],
                value: 0,
              },
              {
                name: MISAResource.Gender.Female[getLanguage],
                value: 1,
              },
              {
                name: MISAResource.Gender.Other[getLanguage],
                value: 2,
              },
            ]"
          />
          <!-- phần nhập số chứng minh thư -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormIdentityCard[getLanguage]"
            :placeHolder="
              MISAResource.PlaceHolder.FormIdentityCard[getLanguage]
            "
            :classInput="'form__personaID'"
            :justNumber="true"
            class="form__ele"
            :dataTitle="MISAResource.DataTile.FormNumber[getLanguage]"
            v-model="formObject['identityCard']"
          />
          <!-- phân nhập ngày cấp chứng minh thư -->
          <MDatePicker
            :labelText="MISAResource.LabelText.FormIdentityDate[getLanguage]"
            :dataTitle="MISAResource.DataTile.FormDate[getLanguage]"
            class="form__identityDate"
            v-model="formObject['identityDate']"
          />
          <!-- phần nhập nơi cấp chứng minh thư -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormIdentityPlace[getLanguage]"
            :placeHolder="
              MISAResource.PlaceHolder.FormIdentityPlace[getLanguage]
            "
            :classInput="'form__createdwhere'"
            class="form__ele"
            v-model="formObject['identityPlace']"
          />
        </div>
        <!-- phần nhập form thứ 3 -->
        <div class="form__part form__three">
          <!-- phần nhập địa chỉ -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormAddress[getLanguage]"
            :placeHolder="MISAResource.PlaceHolder.FormAddress[getLanguage]"
            :classInput="'form__address'"
            class="form__ele"
            v-model="formObject['address']"
          />
          <!-- phần nhập số điện thoại cố định -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormTelephoneNumber[getLanguage]"
            :placeHolder="
              MISAResource.PlaceHolder.FormTelephoneNumber[getLanguage]
            "
            :justNumber="true"
            :classInput="'form__phonenum'"
            class="form__ele"
            :dataTitle="MISAResource.DataTile.FormNumber[getLanguage]"
            v-model="formObject['mobilePhone']"
          />
          <!-- phần nhập số điện thoại di động -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormPhoneNumber[getLanguage]"
            :placeHolder="MISAResource.PlaceHolder.FormPhoneNumber[getLanguage]"
            :justNumber="true"
            class="form__ele"
            :dataTitle="MISAResource.DataTile.FormNumber[getLanguage]"
            v-model="formObject['telephone']"
          />
          <!-- phần nhập email -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormEmail[getLanguage]"
            :placeHolder="MISAResource.PlaceHolder.FormEmail[getLanguage]"
            :classInput="'form__email'"
            class="form__ele"
            :isEmail="true"
            :dataTitle="MISAResource.DataTile.FormEmail[getLanguage]"
            v-model="formObject['email']"
          />
          <!-- phần nhập số tài khoản ngân hàng -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormBankAccount[getLanguage]"
            :placeHolder="MISAResource.PlaceHolder.FormBankAccount[getLanguage]"
            :justNumber="true"
            :classInput="'form__banknum'"
            class="form__ele"
            :dataTitle="MISAResource.DataTile.FormNumber[getLanguage]"
            v-model="formObject['bankAccount']"
          />
          <!-- phần nhập tên ngân hàng -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormBankName[getLanguage]"
            :placeHolder="MISAResource.PlaceHolder.FormBankName[getLanguage]"
            :classInput="'form__bankname'"
            class="form__ele"
            v-model="formObject['bankName']"
          />
          <!-- phần nhập chi nhánh ngân hàng -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormBankBranch[getLanguage]"
            :placeHolder="MISAResource.PlaceHolder.FormBankBranch[getLanguage]"
            :classInput="'form__bankaddr'"
            class="form__ele"
            v-model="formObject['bankBranch']"
          />
        </div>
      </div>
      <!-- các nút xử lý form -->
      <div class="form__action">
        <!-- nút hủy -->
        <MButton
          :data-title="MISAResource.DataTile.FormCloseBtn[getLanguage]"
          class="form__cancel"
          :buttonName="MISAResource.ButtonText.CancelBtn[getLanguage]"
          :buttonTwo="true"
          @click="$emit('hide-all')"
        />
        <div class="form__action--right">
          <!-- nút cất -->
          <MButton
            :data-title="MISAResource.DataTile.FormSaveBtn[getLanguage]"
            class="form__save--close"
            :buttonName="MISAResource.ButtonText.SaveBtn[getLanguage]"
            :buttonTwo="true"
            @click="saveNew"
          />
          <!-- nút cất và thêm -->
          <MButton
            :data-title="MISAResource.DataTile.FormSaveAndAddBtn[getLanguage]"
            :buttonName="MISAResource.ButtonText.SaveAndAddBtn[getLanguage]"
            class="form__save--readd"
            @click="saveNewAndAdd"
          />
        </div>
      </div>
      <!-- icon có dấu hỏi chấm mô tả nội dung của form -->
      <div
        class="icon form__help"
        :data-title="MISAResource.DataTile.FormHelp[getLanguage]"
      ></div>
      <!-- icon có chức năng như 1 button dùng để đóng form -->
      <div
        class="icon form__closebtn form__cancel"
        :data-title="MISAResource.DataTile.FormCloseBtn[getLanguage]"
        @click="$emit('hide-form')"
      ></div>
    </div>
  </div>
</template>
<script>
// nhập các file js thuần vào để xử lý
import MISAEnum from "../../js/enum.js";
import MISAResource from "../../js/resource.js";
import common from "../../js/common.js";

// nhập các component cơ bản
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
          // convert to json để đọc được data nếu status code là 200 ok
          if (res.status == 200) {
            return res.json();
          } else {
            // hiện toast message load data thất bại hoặc data rỗng
            this.$emit(
              "show-toast-message",
              this.MISAEnum.toasttype.ERROR,
              this.MISAResource.ToastMessage.LoadDataFail
            );
          }
        })
        .then((res) => {
          // map dữ liệu vào trong form nhập
          // set value Minput component structure
          if (res) {
            this.formObject = res;
          } else {
            // nếu đang ở trang thái nhân bản hoặc sửa dữ liệu mà không có dữ liệu truyền vào
            // thì ẩn form đi
            this.$emit("hide-all");
          }
          // nếu là nhân bản thì lấy mã nhân viên mới
          if (this.$store.state.isClone) {
            this.getNewEmpCode();
          }
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
          .then((res) => {
            // nếu status code là 200 thì trả về đoạn text mã nhân viên lớn nhất
            if (res.status === 200) {
              return res.text();
            } else {
              // hiện toast message load data thất bại
              this.$emit(
                "show-toast-message",
                this.MISAEnum.toasttype.ERROR,
                this.MISAResource.ToastMessage.LoadDataFail
              );
            }
          })
          .then((res) => {
            // gán giá trị tăng 1 đơn vị cần truyền vào trong input
            if (res) {
              this.increamentOne(res);
            } else {
              // không có giá trị trả về thì hide form
              // thì ẩn form đi
              this.$emit("hide-all");
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
     * Tăng giá trị hiện tại lên thêm 1 đơn vị
     * Author: Tô Nguyễn Đức Mạnh (04/10/2022)
     */
    increamentOne(value) {
      try {
        let lastIDArray;
        // lấy ra giá trị mã nhân viên max, nếu không có thì để vào
        // giá trị mặc định là từ 1
        value !== "" ? (lastIDArray = value) : (lastIDArray = "NV00001");

        // tiến hành cắt chuỗi và chèn thêm 1 đơn vị
        const lastIDNumber =
          parseInt(lastIDArray.split("").slice(2, value.length).join("")) + 1;
        const zeroPad = (num, places) => String(num).padStart(places, "0");
        const newIDCout = zeroPad(lastIDNumber, value.length - 2);
        const newNVCount = `NV${newIDCout}`;

        // chèn giá trị mã nhân viên mới vào form
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
      // thêm đoạn validate ô mã nhân viên
      if (!this.formObject["employeeCode"]) {
        messArr.push(
          this.MISAResource.ErrorValidate.EmployeeCodeNotEmpty[this.getLanguage]
        );
        this.employeeCodeDataTitle =
          this.MISAResource.ErrorValidate.EmployeeCodeNotEmpty[
            this.getLanguage
          ];
        this.setError.employeeCode = true;
      } else {
        this.setError.employeeCode = false;
      }

      // thêm đoạn validate ô tên nhân viên
      if (!this.formObject["fullName"]) {
        messArr.push(
          this.MISAResource.ErrorValidate.EmployeeNameNotEmpty[this.getLanguage]
        );
        this.setError.fullName = true;
      } else {
        this.setError.fullName = false;
      }

      // thêm đoạn validate ô phòng ban
      if (
        !this.formObject["departmentName"] ||
        !this.formObject["departmentID"]
      ) {
        messArr.push(
          this.MISAResource.ErrorValidate.DepartmentName[this.getLanguage]
        );
        this.setError.departmentName = true;
      } else {
        this.setError.departmentName = false;
      }

      // hiển thị popup cảnh báo khi mảng có số lượng lớn hơn 0
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
        fetch(api, {
          method: currentMethod,
          headers: {
            "Content-Type": this.MISAEnum.APIHEADER.APPJSON,
          },
          body: JSON.stringify(me.formObject),
        })
          .then((res) => {
            // kiểm tra giá trị status code là 200 hoặc 201
            if (res.status === 200 || res.status === 201) {
              // clear form đi
              this.clearForm();
              // lấy lại dữ liệu mới
              this.getNewEmpCode();
            } else {
              // hiện toast message có lỗi khi thêm mới hoặc sửa người dfung
              this.$emit(
                "show-toast-message",
                this.MISAEnum.toasttype.ERROR,
                this.MISAResource.ToastMessage.ErrorCommon
              );
            }
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
                  this.isDuplicateCode = true;
                  this.employeeCodeDataTitle =
                    this.MISAResource.ErrorValidate.EmployeeCodeIsDuplicated[
                      this.getLanguage
                    ];
                  this.setError.employeeCode = true;
                  // đưa ra cảnh báo cho người dùng là đã trùng ID rồi
                  this.$emit(
                    "warning-duplicate",
                    this.formObject["employeeCode"]
                  );
                } else {
                  {
                    this.employeeCodeDataTitle =
                      this.MISAResource.ErrorValidate.EmployeeCodeNotEmpty[
                        this.getLanguage
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
        // hiện toast message có lỗi khi thêm mới hoặc sửa người dfung
        this.$emit(
          "show-toast-message",
          this.MISAEnum.toasttype.ERROR,
          this.MISAResource.ToastMessage.ErrorCommon
        );
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
                  this.isDuplicateCode = true;
                  this.employeeCodeDataTitle =
                    this.MISAResource.ErrorValidate.EmployeeCodeIsDuplicated[
                      this.getLanguage
                    ];
                  this.setError.employeeCode = true;
                  // đưa ra cảnh báo cho người dùng là đã trùng ID rồi
                  this.$emit(
                    "warning-duplicate",
                    this.formObject["employeeCode"]
                  );
                } else {
                  {
                    this.isDuplicateCode = false;
                    this.employeeCodeDataTitle =
                      this.MISAResource.ErrorValidate.EmployeeCodeNotEmpty[
                        this.getLanguage
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
        // hiện toast message có lỗi khi thêm mới hoặc sửa người dfung
        this.$emit(
          "show-toast-message",
          this.MISAEnum.toasttype.ERROR,
          this.MISAResource.ToastMessage.ErrorCommon
        );
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
