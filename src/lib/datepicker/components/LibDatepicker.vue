<template lang="">
  <div class="datepicker__container">
    <!-- phần nhãn văn bản -->
    <div v-if="hasLabel" class="input__label">
      {{ labelText }}
    </div>
    <!-- phần datepicer -->
    <div class="datepicker">
      <!-- phần nhập liệu -->
      <input
        tabindex="0"
        class="datepicker__input"
        type="text"
        :class="
          ([classInput],
          isErrorTying === true ? LibDatepicker.input.InputAlert : '')
        "
        :placeholder="
          defaultValue !== '' && defaultValue !== undefined
            ? defaultValue
            : placeHolder
        "
      />
      <!-- phần nút mở menu -->
      <button tabindex="0" :class="buttonClass" class="datepicker__button">
        <div class="datepicker__drop" @click="showSelect"></div>
      </button>
      <!-- phần hiển thị ngày để chọn -->
      <div v-if="isSelectShow" class="datepicker__select">
        <!-- phần chọn ngày theo bảng -->
        <div class="datepicker__table">
          <!-- phần tháng năm và chọn tháng trước tháng sau -->
          <div class="datepicker__navigation">
            <div class="datepicker__monthyear">
              <div class="datepicker__month" @click="showMonthSelect">
                Tháng 9
              </div>
              ,
              <div class="datepicker__year" @click="showYearSelect">2019</div>
              <div
                class="datepicker__icon datepicker__monthyearicon"
                @click="showDateSelect"
              ></div>
            </div>
            <!-- chọn tháng trước tháng sau -->
            <div class="datepicker__monthnav">
              <div class="datepicker__icon datepicker__prevmonth"></div>
              <div class="datepicker__icon datepicker__nextmonth"></div>
            </div>
          </div>
        </div>

        <!-- phần hiển thị ngày để chọn -->
        <div
          v-if="isDaySelectShow"
          class="datepicker__content datepicker__datecontent"
        >
          <div class="datepicker__dayitem datepicker__weekitem">T2</div>
          <div class="datepicker__dayitem datepicker__weekitem">T3</div>
          <div class="datepicker__dayitem datepicker__weekitem">T4</div>
          <div class="datepicker__dayitem datepicker__weekitem">T5</div>
          <div class="datepicker__dayitem datepicker__weekitem">T6</div>
          <div class="datepicker__dayitem datepicker__weekitem">T7</div>
          <div class="datepicker__dayitem datepicker__weekitem">CN</div>
          <template v-for="(grid, index) in gridList" :key="index">
            <div
              class="datepicker__dayitem"
              :class="index === 15 ? this.DatepickerEnum.selected.Date : ''"
            >
              <span>{{ index }}</span>
            </div>
          </template>
        </div>

        <!-- phần hiển thị tháng để chọn -->
        <div
          v-if="isMonthSelectShow"
          class="datepicker__content datepicker__monthcontent"
        >
          <template v-for="(month, index) in monthList" :key="index">
            <div
              class="datepicker__monthitem"
              :class="index === 8 ? this.DatepickerEnum.selected.Month : ''"
            >
              <span> Tháng {{ index + 1 }}</span>
            </div>
          </template>
        </div>

        <!-- phần hiển thị năm để chọn -->
        <div
          v-if="isYearSelectShow"
          class="datepicker__content datepicker__yearcontent"
        >
          phần chọn năm
        </div>

        <!-- phần chọn ngày hôm nay -->
        <div class="datepicker__selecttoday">
          <div class="datepicker__today">Hôm nay</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DatepickerEnum from "../js/LibEnum.js";

export default {
  name: "LibDatepicker",
  props: {
    hasLabel: Boolean,
    labelText: String,
    defaultValue: String,
    placeHolder: String,
    buttonClass: String,
    classInput: String,
  },
  data() {
    return {
      DatepickerEnum,
      isErrorTying: false,
      isSelectShow: false,
      isDaySelectShow: true,
      isMonthSelectShow: false,
      isYearSelectShow: false,
      gridList: new Array(35),
      monthList: new Array(12),
    };
  },
  emits: [],
  methods: {
    /**
     * hiển thị bảng chọn chung
     * Author: Tô Nguyễn Đức Mạnh (11/10/2022)
     */
    showSelect() {
      try {
        this.isSelectShow = !this.isSelectShow;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * hiển thị bảng chọn ngày
     * Author : Tô Nguyễn Đức Mạnh (11/10/2022)
     */
    showDateSelect() {
      try {
        this.isDaySelectShow = !this.isDaySelectShow;
        this.isMonthSelectShow = false;
        this.isYearSelectShow = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * hiển thị bảng chọn tháng
     * Author: Tô Nguyễn Đức Mạnh (11/10/2022)
     */
    showMonthSelect() {
      try {
        this.isDaySelectShow = false;
        this.isMonthSelectShow = !this.isMonthSelectShow;
        this.isYearSelectShow = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * hiển thị bảng chọn năm
     * Author: Tô Nguyễn Đức Mạnh (11/10/2022)
     */
    showYearSelect() {
      try {
        this.isDaySelectShow = false;
        this.isMonthSelectShow = false;
        this.isYearSelectShow = !this.isYearSelectShow;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
@import url("../css/LibDatepicker.css");
</style>
