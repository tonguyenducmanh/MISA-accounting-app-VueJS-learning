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
            :inputValue="
              $store.state.method === 'PUT'
                ? formObject['employeeCode']
                : newEmpCode
            "
            :hasLabel="true"
            labelText="Mã"
            placeHolder="Nhập mã nhân viên"
            validate="employeeCodeNotEmpty"
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
            ref="fullName"
            placeHolder="Nhập họ và tên"
            validate="EmployeeNameNotEmpty"
            idInput="input__checkId"
            :classInput="'form__employeename'"
            :showAlertStar="true"
            class="form__ele"
            dataTitle="Tên không được để trống."
            :isNotNull="true"
            :inputValue="
              formObject['fullName'] !== '' ? formObject['fullName'] : ''
            "
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
            ref="departmentID"
            validate="departmentName"
            class="form__ele"
            placeHolder="Nhập đơn vị"
            classInput="input__musthave"
            :fetchedValue="departmentID"
            unique=""
            :isNotNull="true"
          />
          <MInput
            :hasLabel="true"
            labelText="Chức danh"
            ref="positionName"
            placeHolder="Nhập chức danh"
            :classInput="'form__personaName'"
            class="form__ele"
            :inputValue="
              formObject['positionName'] !== ''
                ? formObject['positionName']
                : ''
            "
          />
        </div>
        <!-- phần nhập form thứ 2 -->
        <div class="form__part form__two">
          <MDatePicker
            labelText="Ngày sinh"
            ref="dateOfBirth"
            class="form__dateofbirth"
          />
          <MRadioButton
            titleText="Giới tính"
            ref="gender"
            propNameBox="gender"
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
            ref="identityCard"
            placeHolder="Nhập số CMND"
            validate="EmployeeNameNotEmpty"
            :classInput="'form__personaID'"
            :justNumber="true"
            class="form__ele"
            dataTitle="Chỉ đường điền các số từ 0-9"
            :isNumber="true"
            :inputValue="
              formObject['identityCard'] !== ''
                ? formObject['identityCard']
                : ''
            "
          />
          <MDatePicker
            labelText="Ngày cấp"
            ref="identityDate"
            class="form__identityDate"
          />
          <MInput
            :hasLabel="true"
            labelText="Nơi cấp"
            ref="identityPlace"
            placeHolder="Nhập nơi cấp"
            :classInput="'form__createdwhere'"
            class="form__ele"
            :inputValue="
              formObject['identityPlace'] !== ''
                ? formObject['identityPlace']
                : ''
            "
          />
        </div>
        <!-- phần nhập form thứ 3 -->
        <div class="form__part form__three">
          <MInput
            :hasLabel="true"
            labelText="Địa chỉ"
            ref="address"
            placeHolder="Nhập địa chỉ"
            :classInput="'form__address'"
            class="form__ele"
            :inputValue="
              formObject['address'] !== '' ? formObject['address'] : ''
            "
          />
          <MInput
            :hasLabel="true"
            labelText="ĐT di động"
            :justNumber="true"
            ref="mobilePhone"
            placeHolder="Nhập số điện thoại di động"
            :classInput="'form__phonenum'"
            class="form__ele"
            dataTitle="Chỉ đường điền các số từ 0-9"
            :isNumber="true"
            :inputValue="
              formObject['mobilePhone'] !== '' ? formObject['mobilePhone'] : ''
            "
          />
          <MInput
            :hasLabel="true"
            labelText="ĐT cố định"
            :justNumber="true"
            ref="telephone"
            placeHolder="Nhập số điện thoại cố định"
            class="form__ele"
            dataTitle="Chỉ đường điền các số từ 0-9"
            :isNumber="true"
            :inputValue="
              formObject['telephone'] !== '' ? formObject['telephone'] : ''
            "
          />
          <MInput
            :hasLabel="true"
            labelText="Email"
            ref="email"
            placeHolder="Nhập Email"
            :classInput="'form__email'"
            class="form__ele"
            :isEmail="true"
            data-title="Email chưa đúng định dạng."
            :inputValue="formObject['email'] !== '' ? formObject['email'] : ''"
          />
          <MInput
            :hasLabel="true"
            labelText="Tài khoản ngân hàng"
            ref="bankAccount"
            :justNumber="true"
            placeHolder="Nhập tài khoản ngân hàng"
            :classInput="'form__banknum'"
            class="form__ele"
            dataTitle="Chỉ đường điền các số từ 0-9"
            :isNumber="true"
            :inputValue="
              formObject['bankAccount'] !== '' ? formObject['bankAccount'] : ''
            "
          />
          <MInput
            :hasLabel="true"
            labelText="Tên ngân hàng"
            ref="bankName"
            placeHolder="Nhập tên ngân hàng"
            :classInput="'form__bankname'"
            class="form__ele"
            :inputValue="
              formObject['bankName'] !== '' ? formObject['bankName'] : ''
            "
          />
          <MInput
            :hasLabel="true"
            labelText="Chi nhánh"
            ref="bankBranch"
            placeHolder="Nhập chi nhánh"
            :classInput="'form__bankaddr'"
            class="form__ele"
            :inputValue="
              formObject['bankBranch'] !== '' ? formObject['bankBranch'] : ''
            "
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
      fetch(apiTest, { method: "GET" })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((res) => {
          // map dữ liệu vào trong form nhập
          // set value Minput component structure
          this.formObject["employeeCode"] = res["employeeCode"]
            ? res["employeeCode"]
            : "";
          this.formObject["fullName"] = res["fullName"] ? res["fullName"] : "";
          this.formObject["identityCard"] = res["identityCard"]
            ? res["identityCard"]
            : "";
          this.formObject["identityPlace"] = res["identityPlace"]
            ? res["identityPlace"]
            : "";
          this.formObject["address"] = res["address"] ? res["address"] : "";
          this.formObject["mobilePhone"] = res["mobilePhone"]
            ? res["mobilePhone"]
            : "";
          this.formObject["telephone"] = res["telephone"]
            ? res["telephone"]
            : "";
          this.formObject["positionName"] = res["positionName"]
            ? res["positionName"]
            : "";
          this.formObject["email"] = res["email"] ? res["email"] : "";
          this.formObject["bankAccount"] = res["bankAccount"]
            ? res["bankAccount"]
            : "";
          this.formObject["bankName"] = res["bankName"] ? res["bankName"] : "";
          this.formObject["bankBranch"] = res["bankBranch"]
            ? res["bankBranch"]
            : "";
          this.formObject["employeeType"] = res["employeeType"]
            ? res["employeeType"]
            : "";
          // set value LibCombobox component structure
          this.departmentID = res["departmentID"];

          // set value MDatepicker component structure
          this.$refs.dateOfBirth.$el.children[1].value = this.common.formatDate(
            res["dateOfBirth"],
            "-"
          );
          this.$refs.identityDate.$el.children[1].value =
            this.common.formatDate(res["identityDate"], "-");
          // set value MDgender component structure
          this.genderType = res["gender"];
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
        fetch(api, { method: "GET" })
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
      try {
        // map dữ liệu vào trong form nhập
        // set value Minput component structure
        let employeeCode =
          this.$refs.employeeCode.$el.children[1].children[0].value;
        let fullName = this.$refs.fullName.$el.children[1].children[0].value;
        let departmentID =
          this.$refs.departmentID.$el.children[1].getAttribute("value");
        if (employeeCode !== "" && fullName !== "" && departmentID !== "") {
          return true;
        } else {
          let temp = [];
          let language = this.$store.state.language;
          if (employeeCode === "") {
            // gọi hàm của component con thông qua refs
            this.$refs.employeeCode.notNullValidate();
            temp.push(
              this.MISAResource.ErrorValidate.EmployeeCodeNotEmpty[language]
            );
          }
          if (fullName === "") {
            // gọi hàm của component con thông qua refs
            this.$refs.fullName.notNullValidate();
            temp.push(
              this.MISAResource.ErrorValidate.EmployeeNameNotEmpty[language]
            );
          }
          if (departmentID === "") {
            // gọi hàm của component con thông qua refs
            this.$refs.departmentID.notNullValidate();
            temp.push(this.MISAResource.ErrorValidate.DepartmentName[language]);
          }
          this.$emit("alert-popup", temp.join("#"));
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lấy ra form value và fetch lên api
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    confirmSave(isReload) {
      try {
        let employee = {};
        employee["EmployeeID"] = this.$store.state.currentEditID
          ? this.$store.state.currentEditID
          : null;
        // get value Minput component structure
        employee["EmployeeCode"] =
          this.$refs.employeeCode.$el.children[1].children[0].value;
        employee["FullName"] =
          this.$refs.fullName.$el.children[1].children[0].value;
        employee["IdentityCard"] = this.$refs.identityCard.$el.children[1]
          .children[0].value
          ? this.$refs.identityCard.$el.children[1].children[0].value
          : null;
        employee["IdentityPlace"] = this.$refs.identityPlace.$el.children[1]
          .children[0].value
          ? this.$refs.identityPlace.$el.children[1].children[0].value
          : null;
        employee["Address"] = this.$refs.address.$el.children[1].children[0]
          .value
          ? this.$refs.address.$el.children[1].children[0].value
          : null;
        employee["MobilePhone"] = this.$refs.mobilePhone.$el.children[1]
          .children[0].value
          ? this.$refs.mobilePhone.$el.children[1].children[0].value
          : null;
        employee["Telephone"] = this.$refs.telephone.$el.children[1].children[0]
          .value
          ? this.$refs.telephone.$el.children[1].children[0].value
          : null;
        employee["Email"] = this.$refs.email.$el.children[1].children[0].value
          ? this.$refs.email.$el.children[1].children[0].value
          : null;
        employee["BankAccount"] = this.$refs.bankAccount.$el.children[1]
          .children[0].value
          ? this.$refs.bankAccount.$el.children[1].children[0].value
          : null;
        employee["BankName"] = this.$refs.bankName.$el.children[1].children[0]
          .value
          ? this.$refs.bankName.$el.children[1].children[0].value
          : null;
        employee["BankBranch"] = this.$refs.bankBranch.$el.children[1]
          .children[0].value
          ? this.$refs.bankBranch.$el.children[1].children[0].value
          : null;
        employee["PositionName"] = this.$refs.positionName.$el.children[1]
          .children[0].value
          ? this.$refs.positionName.$el.children[1].children[0].value
          : null;

        // get value LibCombobox component structure
        employee["DepartmentID"] =
          this.$refs.departmentID.$el.children[1].getAttribute("value")
            ? this.$refs.departmentID.$el.children[1].getAttribute("value")
            : null;
        employee["DepartmentName"] =
          this.$refs.departmentID.$el.children[1].getAttribute("valueName")
            ? this.$refs.departmentID.$el.children[1].getAttribute("valueName")
            : null;

        // get value MDatepicker component structure
        employee["DateOfBirth"] = this.$refs.dateOfBirth.$el.children[1].value
          ? this.$refs.dateOfBirth.$el.children[1].value
          : null;
        employee["IdentityDate"] = this.$refs.identityDate.$el.children[1].value
          ? this.$refs.identityDate.$el.children[1].value
          : null;

        // get value MDgender component structure
        employee["Gender"] = Number(
          this.$refs.gender.$el.children[1].getAttribute("value")
        );

        // get value Checkbox
        let employeeType = 0;
        if (this.$refs.checkboxKH.$el.getAttribute("value") !== "") {
          employeeType = 1;
        }
        if (this.$refs.checkboxNCC.$el.getAttribute("value") !== "") {
          employeeType = 2;
        }
        employee["employeeType"] = employeeType;
        let temp = new Date(Date.now());
        // Các trường mặc định
        employee["CreatedDate"] = temp.toJSON();
        employee["CreatedBy"] = "Tô Nguyễn Đức Mạnh";
        employee["ModifiedDate"] = temp.toJSON();
        employee["ModifiedBy"] = "Tô Nguyễn Đức Mạnh";

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
      // set value Minput component structure
      this.$refs.employeeCode.$el.children[1].children[0].value = "";
      this.$refs.fullName.$el.children[1].children[0].value = "";
      this.$refs.identityCard.$el.children[1].children[0].value = "";
      this.$refs.identityPlace.$el.children[1].children[0].value = "";
      this.$refs.address.$el.children[1].children[0].value = "";
      this.$refs.mobilePhone.$el.children[1].children[0].value = "";
      this.$refs.telephone.$el.children[1].children[0].value = "";
      this.$refs.bankAccount.$el.children[1].children[0].value = "";
      this.$refs.bankName.$el.children[1].children[0].value = "";
      this.$refs.bankBranch.$el.children[1].children[0].value = "";
      this.$refs.positionName.$el.children[1].children[0].value = "";
      this.formObject = {};
      // set value LibCombobox component structure
      this.$refs.departmentID.clearComboboxSelected();
      // set value MDatepicker component structure
      this.$refs.dateOfBirth.$el.children[1].value = "";
      this.$refs.identityDate.$el.children[1].value = "";
      // set value MDgender component structure
      this.genderType = 0;
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
            let currentId =
              this.$refs.employeeCode.$el.children[1].children[0].value;
            let apiTest = `${this.MISAEnum.API.CHECKEMPLOYEECODE}${currentId}`;
            fetch(apiTest, { method: "GET" })
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
            // kiểm tra xem id đã trùng chưa ?
            let currentId =
              this.$refs.employeeCode.$el.children[1].children[0].value;
            let apiTest = `${this.MISAEnum.API.CHECKEMPLOYEECODE}${currentId}`;
            fetch(apiTest, { method: "GET" })
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
