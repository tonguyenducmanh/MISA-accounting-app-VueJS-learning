<template lang="">
  <div class="input form__ele" :data-title="dataTitle">
    <div v-if="hasLabel" class="input__label">
      {{ labelText }}
      <span v-if="showAlertStar" :class="MISAEnum.input.LabelAlert">*</span>
    </div>
    <div class="input__warp">
      <input
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
        @input="
          notNullValidate();
          justNumberValidate();
          emailValidate();
          $emit('update:modelValue', $event.target.value);
        "
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
    "validate",
    "classInput",
    "idInput",
    "dataTitle",
    "justNumber",
    "formatDate",
    "modelValue",
    "isEmail",
    "isNumber",
    "isNotNull",
    "setError",
  ],
  beforeMount() {
    this.isErrorTying = this.setError;
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
          this.modelValue !== undefined &&
          this.modelValue !== null
        ) {
          const emailRegex = /^[a-z][a-z0-9_.]*@([a-z][a-z0-9_.]*).com/gm;
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
        if (
          this.isNotNull === true &&
          (this.modelValue === "" ||
            this.modelValue === undefined ||
            this.modelValue === null)
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
          if (
            this.modelValue !== "" &&
            this.modelValue !== undefined &&
            this.modelValue !== null
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
