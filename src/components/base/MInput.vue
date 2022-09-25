<template lang="">
  <div class="input form__ele" :data-title="dataTitle">
    <div v-if="hasLabel" class="input__label">
      {{ labelText }}
      <span v-if="showAlertStar" :class="MISAEnum.input.LabelAlert">*</span>
    </div>
    <div class="input__warp">
      <input
        type="text"
        class="input__field"
        autocomplete="off"
        :propName="propName"
        :validate="validate"
        :just-number="justNumber"
        :format-date="formatDate"
        :id="idInput"
        :class="[
          hasItalic === true ? MISAEnum.input.Italic : '',
          isErrorTying === true ? MISAEnum.input.InputAlert : '',
          classInput,
        ]"
        :placeholder="placeHolder"
        v-model="currentValue"
        @input="
          notNullValidate();
          justNumberValidate();
          emailValidate();
        "
        @focusout="
          notNullValidate();
          justNumberValidate();
          emailValidate();
        "
      />
      <span
        tabindex="0"
        v-if="hasIcon"
        class="icon input__icon"
        @click="$emit('change-filter', currentValue)"
        @keydown.enter.passive="$emit('change-filter', currentValue)"
      ></span>
    </div>
  </div>
</template>
<script>
// import js files
import MISAEnum from "../../js/enum.js";

export default {
  name: "MInput",
  data() {
    return {
      MISAEnum,
      currentValue: "",
      isErrorTying: false,
    };
  },
  emits: ["change-filter"],
  props: [
    "showAlertStar",
    "inputAlert",
    "labelText",
    "hasIcon",
    "placeHolder",
    "hasLabel",
    "hasItalic",
    "propName",
    "validate",
    "classInput",
    "idInput",
    "dataTitle",
    "justNumber",
    "formatDate",
    "inputValue",
    "isEmail",
    "isNumber",
    "isNotNull",
    "setError",
  ],
  beforeMount() {
    this.currentValue = this.inputValue;
    this.isErrorTying = this.setError;
  },
  /**
   * Theo dõi khi nào giá trị input rỗng thì load lại trang bằng cách giả lập click vào trong nút tìm kiếm.
   * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
   */
  watch: {
    // xem lúc khởi tạo nó có giá trị gì truyền vào không ?
    inputValue() {
      if (this.currentValue != this.inputValue) {
        this.currentValue = this.inputValue;
      }
    },
    currentValue() {
      try {
        if (this.currentValue === "") {
          this.$emit("change-filter", this.currentValue);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  methods: {
    /**
     * Validate email nếu nhập không đúng định dạng.
     * Author: Tô Nguyễn Đức Mạnh (15/09/2022)
     */
    emailValidate() {
      try {
        // kiểm tra xem nó có phải ô nhập email không đã
        if (
          this.isEmail === true &&
          this.currentValue !== "" &&
          this.currentValue !== undefined
        ) {
          const emailRegex = /^[a-z][a-z0-9_.]*@([a-z][a-z0-9_.]*).com/gm;
          let result = emailRegex.test(this.currentValue);
          if (result === false) {
            this.isErrorTying = true;
          } else {
            this.isErrorTying = false;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Validate trường bắt buộc phải nhập (không được để trống)
     * Author: Tô Nguyễn Đức Mạnh (15/09/2022)
     */
    notNullValidate() {
      try {
        // kiểm tra xem có phải trường not null không
        if (
          this.isNotNull === true &&
          (this.currentValue === "" || this.currentValue === undefined)
        ) {
          this.isErrorTying = true;
        } else {
          this.isErrorTying = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Validate trường chỉ được phép điền số từ 1-9
     * Author : Tô Nguyễn Đức Mạnh (15/09/2022)
     */
    justNumberValidate() {
      try {
        // kiểm tra xem nó có phải trường chỉ điền số không
        if (this.isNumber === true) {
          if (this.currentValue !== "" && this.currentValue !== undefined) {
            const numberRegex = /^\d+$/;
            let result = numberRegex.test(this.currentValue);
            if (result === false) {
              this.isErrorTying = true;
            } else {
              this.isErrorTying = false;
            }
          } else {
            this.isErrorTying = false;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/input.css");
</style>
