<template lang="">
  <div class="input form__ele">
    <div v-if="hasLabel" class="input__label" :data-title="labelTitle">
      {{ labelText }}
      <span v-if="showAlertStar" :class="MISAEnum.input.LabelAlert">*</span>
    </div>
    <div class="input__warp" :data-title="dataTitle">
      <input
        ref="input"
        tabindex="0"
        type="text"
        class="input__field"
        autocomplete="off"
        :propName="propName"
        :just-number="justNumber"
        :format-date="formatDate"
        :id="idInput"
        :class="[
          hasItalic === true ? MISAEnum.input.Italic : '',
          isErrorTying === true ? MISAEnum.input.InputAlert : '',
          classInput,
        ]"
        :placeholder="placeHolder"
        @input="$emit('update:modelValue', $event.target.value)"
        @focusout="
          notNullValidate();
          justNumberValidate();
          emailValidate();
          $emit('update:modelValue', $event.target.value);
        "
        :value="modelValue"
      />
      <span
        tabindex="0"
        v-if="hasIcon"
        class="icon input__icon"
        :data-title="iconTitle"
        @click="$emit('change-filter', modelValue)"
        @keydown.enter.passive="$emit('change-filter', modelValue)"
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
      isErrorTying: false,
      timeOut: null,
    };
  },
  emits: ["change-filter", "update:modelValue"],
  props: [
    "showAlertStar",
    "inputAlert",
    "labelText",
    "hasIcon",
    "placeHolder",
    "hasLabel",
    "hasItalic",
    "propName",
    "classInput",
    "idInput",
    "dataTitle",
    "labelTitle",
    "justNumber",
    "formatDate",
    "modelValue",
    "isEmail",
    "isNotNull",
    "setError",
    "isFocus",
    "timeDelay",
    "iconTitle",
  ],
  beforeMount() {
    this.isErrorTying = this.setError;
  },
  watch: {
    /**
     * Lắng nghe xem prop setError có chuyển thành true không thì ép cho input phải có màu đỏ
     * Author: Tô Nguyễn Đức Mạnh (11/10/2022)
     */
    setError() {
      this.isErrorTying = this.setError;
    },
    /**
     * Tự động chạy 1 số fn khi modelValue thay đổi giá trị
     * Author : Tô Nguyễn Đức Mạnh (04/10/2022)
     */
    modelValue() {
      this.notNullValidate();
      this.justNumberValidate();
      this.emailValidate();
      // debounce tìm kiếm ( options ), chỉ khi có timeDelay thì mới chạy đoạn này
      if (this.timeDelay) {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
          // tự động tìm kiếm khi modelValue thay đổi
          this.$emit("change-filter", this.modelValue);
        }, this.timeDelay);
      }
    },
  },
  /**
   * khi form đã mounted vào trong DOM thì tiến hành focus vào trong ô nhập liệu đầu tiên
   * Author: Tô Nguyễn Đức Mạnh (03/10/2022)
   */
  mounted() {
    if (this.isFocus) {
      this.$refs.input.focus();
    }
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
          this.modelValue !== "" &&
          this.modelValue !== null &&
          this.modelValue !== undefined
        ) {
          const emailRegex =
            /^[a-z][a-z0-9_.]*@([a-z][a-z0-9_.]*).(com|vn|org)/gm;
          let result = emailRegex.test(this.modelValue);
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
        if (this.isNotNull === true && this.modelValue === "") {
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
        if (this.justNumber === true) {
          if (
            this.modelValue !== "" &&
            this.modelValue !== null &&
            this.modelValue !== undefined
          ) {
            const numberRegex = /^\d+$/;
            let result = numberRegex.test(this.modelValue);
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
