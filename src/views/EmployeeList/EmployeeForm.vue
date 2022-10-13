<template lang="">
  <!-- form nhập liệu thông tin nhân viên -->
  <div class="form__wrap" form-type="POST">
    <div class="form" ref="formbody">
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
          tabindex="0"
          @keydown.enter="changeCheckboxOption(1)"
          @click-label-box="changeCheckboxOption(1)"
        />
        <MCheckbox
          :labelText="MISAResource.LabelText.IsProvider[getLanguage]"
          checkboxId="checkbox_ncc"
          :checkboxStatus="formObject['employeeType'] === 2 ? true : false"
          :checkboxValue="formObject['employeeType'] === 2 ? '2' : ''"
          ref="checkboxNCC"
          tabindex="0"
          @keydown.enter="changeCheckboxOption(2)"
          @click-label-box="changeCheckboxOption(2)"
        />
      </div>
      <!-- phần body của form -->
      <div class="form__body">
        <!-- phần nhập form thứ nhất -->
        <div class="form__part form__one">
          <!-- phần nhập mã nhân viên -->
          <MInput
            :isFocus="isFocus"
            v-model="formObject['employeeCode']"
            ref="employeeCodeInput"
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
            :isNotNull="true"
            :setError="setError.departmentName"
          />
          <!-- phần nhập chức vụ -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormPosition[getLanguage]"
            :placeHolder="MISAResource.PlaceHolder.FormPosition[getLanguage]"
            :classInput="'form__personaName'"
            v-model="formObject['positionName']"
          />
        </div>
        <!-- phần nhập form thứ 2 -->
        <div class="form__part form__two">
          <!-- phần chọn ngày sinh -->
          <LibDatepicker
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormDateOfBirth[getLanguage]"
            :dataTitle="MISAResource.DataTile.FormDate[getLanguage]"
            placeHolder="DD/MM/YYYY"
            :compareToNow="true"
            buttonClass="datepicker__button--white"
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
            :labelTitle="MISAResource.DataTile.IdentityCardNumber[getLanguage]"
            :dataTitle="MISAResource.DataTile.FormNumber[getLanguage]"
            v-model="formObject['identityCard']"
          />
          <!-- phân nhập ngày cấp chứng minh thư -->
          <LibDatepicker
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormIdentityDate[getLanguage]"
            :dataTitle="MISAResource.DataTile.FormDate[getLanguage]"
            placeHolder="DD/MM/YYYY"
            :compareToNow="true"
            buttonClass="datepicker__button--white"
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
            v-model="formObject['address']"
          />
          <!-- phần nhập số điện thoại di động -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormTelephoneNumber[getLanguage]"
            :placeHolder="
              MISAResource.PlaceHolder.FormTelephoneNumber[getLanguage]
            "
            :classInput="'form__phonenum'"
            :labelTitle="MISAResource.DataTile.MobiphoneNumber[getLanguage]"
            :dataTitle="MISAResource.DataTile.FormNumber[getLanguage]"
            v-model="formObject['mobilePhone']"
          />
          <!-- phần nhập số điện thoại cố định -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormPhoneNumber[getLanguage]"
            :placeHolder="MISAResource.PlaceHolder.FormPhoneNumber[getLanguage]"
            :labelTitle="MISAResource.DataTile.TelephoneNumber[getLanguage]"
            :dataTitle="MISAResource.DataTile.FormNumber[getLanguage]"
            v-model="formObject['telephone']"
          />
          <!-- phần nhập email -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormEmail[getLanguage]"
            :placeHolder="MISAResource.PlaceHolder.FormEmail[getLanguage]"
            :classInput="'form__email'"
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
            :dataTitle="MISAResource.DataTile.FormNumber[getLanguage]"
            v-model="formObject['bankAccount']"
          />
          <!-- phần nhập tên ngân hàng -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormBankName[getLanguage]"
            :placeHolder="MISAResource.PlaceHolder.FormBankName[getLanguage]"
            :classInput="'form__bankname'"
            v-model="formObject['bankName']"
          />
          <!-- phần nhập chi nhánh ngân hàng -->
          <MInput
            :hasLabel="true"
            :labelText="MISAResource.LabelText.FormBankBranch[getLanguage]"
            :placeHolder="MISAResource.PlaceHolder.FormBankBranch[getLanguage]"
            :classInput="'form__bankaddr'"
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
            @click="handleSave(true)"
          />
          <!-- nút cất và thêm -->
          <MButton
            :data-title="MISAResource.DataTile.FormSaveAndAddBtn[getLanguage]"
            :buttonName="MISAResource.ButtonText.SaveAndAddBtn[getLanguage]"
            class="form__save--readd"
            @click="handleSave(false)"
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
import MInput from "../../components/base/MInput.vue";
import MRadioButton from "../../components/base/MRadioButton.vue";
import LibCombobox from "../../lib/combobox/components/LibCombobox.vue";
import LibDatepicker from "../../lib/datepicker/components/LibDatepicker.vue";

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
    LibDatepicker,
    MButton,
    MCheckbox,
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
      messArr: [],
      isFocus: true,
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
    } else {
      let apiTest = this.fetchAPIGenerate();
      // lấy dữ liệu người dùng hiện tại
      fetch(apiTest, { method: this.MISAEnum.method.GET })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          } else {
            // hiện toast message load data thất bại
            this.showLoadedError();
          }
        })
        .then((res) => {
          // map dữ liệu vào trong form nhập
          this.formObject = res;
          // nếu là nhân bản thì lấy mã nhân viên mới
          if (this.$store.state.isClone) {
            this.getNewEmpCode();
          }
        })
        .catch((res) => {
          console.log(res);
          this.showCommonError();
        });
    }
  },
  /**
   * Mặc định lúc mounted sẽ thực hiện các hành động phím tắt dạng global
   * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
   */
  mounted() {
    try {
      // thêm global keyup, dùng để lắng nghe các sự kiện phím tắt hàng loạt ở mọi component trong trang web
      window.addEventListener("keyup", this.checkKeyUp);
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Mặc định khi unmounted thì sẽ xóa bỏ sự kiện lắng nghe các phím tắt dạng global đi
   * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
   */
  unmounted() {
    try {
      window.removeEventListener("keyup", this.checkKeyUp);
    } catch (error) {
      console.log(error);
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
     * khi formObject thay đổi thì reset các cảnh báo lỗi về giá trị mặc định
     * vì trường hợp của check mã nhân viên vừa có check trống và check trùng
     */
    formObject() {
      try {
        this.employeeCodeDataTitle =
          this.MISAResource.ErrorValidate.employeeCodeNotEmpty[
            this.getLanguage
          ];
      } catch (error) {
        console.log(error);
      }
    },
  },
  methods: {
    /**
     * Lấy ra mã người dùng mới rồi focus vào ô đầu tiên
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    getNewEmpCode() {
      try {
        // lấy ra api
        let api = this.MISAEnum.API.NEWEMPLOYEECODE;
        fetch(api, { method: this.MISAEnum.method.GET })
          .then((res) => {
            // nếu status code là 200 thì trả về đoạn text mã nhân viên lớn nhất
            if (res.status === 200) {
              return res.text();
            } else {
              // hiện toast message load data thất bại
              this.showLoadedError();
            }
          })
          .then((res) => {
            // gán giá trị tăng 1 đơn vị cần truyền vào trong input
            if (res) {
              this.increamentOne(res);
            }
          })
          .catch((res) => {
            console.log(res);
            this.showCommonError();
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
     * Hàm kiểm tra giá trị đầu vào trống không
     * @param valueCheck : giá trị trong formObject cần kiểm tra
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    checkEmpty(valueCheck) {
      if (!this.formObject[valueCheck]) {
        this.messArr.push(
          this.MISAResource.ErrorValidate[`${valueCheck}NotEmpty`][
            this.getLanguage
          ]
        );
        this.setError[valueCheck] = true;
      } else {
        this.setError[valueCheck] = false;
      }
    },
    /**
     * Kiểm tra form trước khi thực hiện lưu xem có trống các ô bắt buộc không ?
     * Nếu các ô đó trống thì không cho lưu mà thay vào đó là hiện popup cảnh báo
     * Author : Tô Nguyễn Đức Mạnh (15/09/2022)
     */
    checkBeforeSave() {
      // tạo ra mảng thông báo các ô nhập liệu không được để trống
      this.messArr = [];
      this.checkEmpty("employeeCode");
      this.checkEmpty("fullName");
      this.checkEmpty("departmentName");
      // hiển thị popup cảnh báo khi mảng có số lượng lớn hơn 0
      if (this.messArr.length > 0) {
        this.showAlertInputPopup(this.messArr);
        return false;
      } else {
        return true;
      }
    },
    /**
     * Xóa toàn bộ input value trong form nhập đi, khôi phục các dữ liệu trên store về mặc định
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    clearForm() {
      this.formObject = {};
      // sửa lại method về post
      this.$store.dispatch("changeMethod", this.MISAEnum.method.POST);
      // xóa edit id, edit code, nhân bản đi
      this.$store.dispatch("changeEditID", "");
      this.$store.dispatch("changeEditCode", "");
      this.$store.dispatch("changeStatusClone", false);
    },
    /**
     * Tạo địa chỉ api theo method cung cấp
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    fetchAPIGenerate() {
      try {
        let currentMethod = this.$store.state.method;
        let api = this.MISAEnum.API.GETEMPLOYEELIST;
        // check xem là method put hay post, nếu là put thì thêm id vào sau api
        if (currentMethod === this.MISAEnum.method.PUT) {
          api += `/${this.$store.state.currentEditID}`;
        }
        return api;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tạo object đính kèm khi tiến hành lưu dữ liệu bên cạnh địa chỉ api
     * @param currentMethod : method muốn dùng như là GET POST
     * @param formObject : object muốn tải lên
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    fetchObjectGenerate(currentMethod, formObject) {
      try {
        return {
          method: currentMethod,
          headers: {
            "Content-Type": this.MISAEnum.APIHEADER.APPJSON,
          },
          body: JSON.stringify(formObject),
        };
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm xử lý lưu dữ liệu vào db
     * @param isCloseForm : sau khi đã lưu thì muốn điền thêm hay đóng form, true là
     * đóng form, false là điền thêm
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    handleSave(isCloseForm) {
      try {
        let me = this;
        let currentMethod = this.$store.state.method;
        //tạo api tương ứng với sửa hoặc thêm mới
        let api = this.fetchAPIGenerate();
        // validate dữ liệu trước 1 lần trên front end đã
        let test = this.checkBeforeSave();
        // tiến hành fetch dữ liệu lên server
        if (test) {
          fetch(api, this.fetchObjectGenerate(currentMethod, me.formObject))
            .then((res) => {
              // xử lý status code trước
              return this.handleSaveRespone(res) ? true : res.json();
            })
            .then((res) => {
              // nếu có lỗi trả về thì xử lý tiếp bằng cách hiện popup lỗi
              // validate dữ liệu từ server trả về
              return this.handleJsonErrorRespone(res) ? true : false;
            })
            .then((res) => {
              // nếu hàm trên trả về true tức là đã lưu được thành công
              res ? this.closeFormOrAddNewRecord(isCloseForm) : "";
            })
            .catch((res) => {
              console.log(res);
              this.showCommonError();
            });
        }
      } catch (error) {
        console.log(error);
        this.showCommonError();
      }
    },
    /**
     * Hàm xử lý respone status trả về từ server sau khi tiến hành lưu
     * @param res : respone trả về từ server
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    handleSaveRespone(res) {
      try {
        // nếu là nhân bản thì tý nữa sẽ hiển thị nhân bản
        let isClone = this.$store.state.isClone;
        switch (res.status) {
          case 200:
            // hiển thị toast message sửa thành công
            if (isClone === true) {
              this.showDupplicatedNoti();
            } else {
              this.showEditedNoti();
            }
            return true;
          case 201:
            // hiển thị toast message thêm mới thành công
            if (isClone === true) {
              this.showDupplicatedNoti();
            } else {
              this.showAddedNoti();
            }
            return true;
          case 500:
            // hiển thị toast message có lỗi từ phía server
            this.showServerError();
            return false;
          case 400:
            // hiển thị toast message có lỗi từ phía người dùng
            this.showClientError();
            return false;
          default:
            return;
        }
      } catch (error) {
        console.log(error);
        // hiển thị toast message có lỗi từ phía server
        this.showServerError();
      }
    },
    /**
     * Hàm xử lý respone json error object từ phía server sau khi tiến hành lưu
     * @param res : response json error từ server
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    handleJsonErrorRespone(res) {
      try {
        if (res !== true && res.errorCode) {
          switch (res.errorCode) {
            case this.MISAEnum.errorCode.DuplicateCode:
              // hiện cảnh báo mã trùng
              this.showWarningDupplicate();
              return false;
            case this.MISAEnum.errorCode.ValidateFail:
              // hiện cảnh báo dữ liệu nhập bị sai
              this.showAlertInputPopup(res.moreInfo);
              return false;
            default:
              return false;
          }
        } else {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * focus vào ô nhập liệu đầu tiên nếu đóng các popup
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    focusFirstInput() {
      try {
        this.$refs.employeeCodeInput.$el.children[1].children[0].focus();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện popup cảnh báo trùng mã đồng thời thay đổi màu border trùng mà và data title
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    showWarningDupplicate() {
      try {
        // đưa ra cảnh báo cho người dùng là đã trùng ID rồi
        this.$emit("warning-duplicate", this.formObject["employeeCode"]);
        // hiện cảnh báo bao quanh employeeCode
        this.setError.employeeCode = true;
        this.employeeCodeDataTitle =
          this.MISAResource.ErrorValidate.EmployeeCodeIsDuplicated[
            this.getLanguage
          ];
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện popup cảnh báo các giá trị nhập vào chưa đúng
     * @param arr: Mảng các giá trị bị sai
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    showAlertInputPopup(arr) {
      try {
        // tạo ra mảng thông báo các ô nhập liệu không được để trống
        this.$emit("alert-popup", arr.join("#"));
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tiến hành đóng form nếu là thêm mới, tiến hành clear form và lấy mã nhân viên mới nếu là sửa
     * @param isCloseForm : Có đóng form hay không ? true là có false là không
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    closeFormOrAddNewRecord(isCloseForm) {
      try {
        // đưa các giá trị về mặc định
        this.clearForm();
        // tải lại danh sách nhân viên
        this.$emit("update-table");
        if (isCloseForm === true) {
          this.$emit("hide-all");
        } else {
          // lấy mã nhân viên mới
          this.getNewEmpCode();
          // focus lại vào ô nhập đầu tiên
          this.focusFirstInput();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện thông báo lỗi khi load data
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    showLoadedError() {
      try {
        this.$emit(
          "show-toast-message",
          this.MISAEnum.toasttype.ERROR,
          this.MISAResource.ToastMessage.LoadDataFail
        );
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
     * Thông báo lỗi chung
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    showCommonError() {
      try {
        // hiện toast message có lỗi chung chưa xác định được
        this.$emit(
          "show-toast-message",
          this.MISAEnum.toasttype.ERROR,
          this.MISAResource.ToastMessage.ErrorCommon
        );
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thông báo lỗi từ phía server
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    showServerError() {
      try {
        // hiện toast message có lỗi từ phía server
        this.$emit(
          "show-toast-message",
          this.MISAEnum.toasttype.ERROR,
          this.MISAResource.ToastMessage.ErrorServer
        );
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thông báo lỗi từ phía client
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    showClientError() {
      try {
        // hiện toast message có lỗi từ phía client
        this.$emit(
          "show-toast-message",
          this.MISAEnum.toasttype.ERROR,
          this.MISAResource.ToastMessage.ErrorClient
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
            this.$emit("hide-form");
          }
          // nếu là ấn phím ctrl và phím F8
          if (
            event.ctrlKey &&
            !event.shiftKey &&
            event.which === this.MISAEnum.keycode.F8
          ) {
            this.handleSave(true);
          }
          // nếu là ấn phím ctrl phím shift và phím F8
          if (
            event.ctrlKey &&
            event.shiftKey &&
            event.which === this.MISAEnum.keycode.F8
          ) {
            this.handleSave(false);
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
