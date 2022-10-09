<template lang="">
  <div
    class="datepicker"
    :data-title="dataTitle"
    :class="isErrorDate === true ? MISAEnum.datepicker.DatePickerAlert : ''"
  >
    <div class="datepicker__label">{{ labelText }}</div>
    <input
      type="date"
      :propName="propName"
      class="datepicker__input"
      placeholder="DD/MM/YYYY"
      tabindex="0"
      :value="
        common.formatDate(this.modelValue, '-') !=
        MISAEnum.datepicker.DatePickerNAN
          ? common.formatDate(this.modelValue, '-')
          : ''
      "
      :class="isErrorDate === true ? MISAEnum.datepicker.InputAlert : ''"
      @focusout="
        $emit('update:modelValue', $event.target.value);
        dateValidate();
      "
    />
  </div>
</template>
<script>
import common from "../../js/common.js";
import MISAEnum from "../../js/enum.js";
export default {
  name: "MDatePicker",
  data() {
    return {
      common,
      MISAEnum,
      isErrorDate: false,
    };
  },
  emits: ["update:modelValue"],
  props: ["labelText", "propName", "modelValue", "dataTitle"],
  watch: {
    /**
     * Tự động chạy validate khi modelValue thay đổi giá trị
     * Author : Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    modelValue() {
      this.dateValidate();
    },
  },
  methods: {
    /**
     * Validate ngày tháng không được lớn hơn ngày hiện tại
     * Author : Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    dateValidate() {
      try {
        let todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        let formatedDate = this.formatDate(todayDate);
        if (this.modelValue > formatedDate) {
          this.isErrorDate = true;
        } else {
          this.isErrorDate = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Trả về ngày tháng dạng string
     * Author : Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    formatDate(date) {
      try {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : "0" + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : "0" + day;

        return year + "-" + month + "-" + day;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/datepicker.css");
</style>
