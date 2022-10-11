<template lang="">
  <div class="datepicker__container" v-click-out="hideSelect">
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
        v-model="modelvalue"
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
                {{ this.currentMonth }}
              </div>
              ,
              <div class="datepicker__year" @click="showYearSelect">
                {{ this.currentYear }}
              </div>
              <div
                class="datepicker__icon datepicker__monthyearicon"
                @click="showDateSelect"
              ></div>
            </div>
            <!-- chọn tháng trước tháng sau -->
            <div class="datepicker__monthnav">
              <div
                tabindex="0"
                class="datepicker__icon datepicker__prevmonth"
                @click="goPrevMonth"
                @keydown.enter="goPrevMonth"
              ></div>
              <div
                tabindex="0"
                class="datepicker__icon datepicker__nextmonth"
                @click="goNextMonth"
                @keydown.enter="goNextMonth"
              ></div>
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
          <template v-for="(grid, index) in emptyList" :key="index">
            <div class="datepicker__dayemptyitem"></div>
          </template>
          <template v-for="(grid, index) in gridList" :key="index">
            <div
              tabindex="0"
              class="datepicker__dayitem"
              :class="
                index + 1 === this.currentDay
                  ? this.DatepickerEnum.selected.Date
                  : ''
              "
              @keydown.enter="changeDate(index + 1)"
              @click="changeDate(index + 1)"
            >
              <span>{{ index + 1 }}</span>
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
              :class="
                index === this.currentMonthNth
                  ? this.DatepickerEnum.selected.Month
                  : ''
              "
              @click="changeMonth(index)"
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
          <div
            class="datepicker__yeardown"
            @click="changeYear(currentYear - 1)"
          ></div>
          <div
            class="datepicker__yearitem"
            @click="changeYear(currentYear - 2)"
          >
            {{ currentYear - 2 }}
          </div>
          <div
            class="datepicker__yearitem"
            @click="changeYear(currentYear - 1)"
          >
            {{ currentYear - 1 }}
          </div>
          <div
            class="datepicker__yearitem"
            :class="this.DatepickerEnum.selected.Year"
          >
            {{ currentYear }}
          </div>
          <div
            class="datepicker__yearitem"
            @click="changeYear(currentYear + 1)"
          >
            {{ currentYear + 1 }}
          </div>
          <div
            class="datepicker__yearitem"
            @click="changeYear(currentYear + 2)"
          >
            {{ currentYear + 2 }}
          </div>
          <div
            class="datepicker__yearup"
            @click="changeYear(currentYear + 1)"
          ></div>
        </div>

        <!-- phần chọn ngày hôm nay -->
        <div
          tabindex="0"
          class="datepicker__selecttoday"
          @click="getFullDayValue()"
          @keydown.enter="getFullDayValue()"
        >
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
      modelvalue: "",
      DatepickerEnum,
      isErrorTying: false,
      isSelectShow: false,
      isDaySelectShow: true,
      isMonthSelectShow: false,
      isYearSelectShow: false,
      firstDayOfWeek: "",
      currentDay: 1,
      currentMonth: "",
      currentMonthNth: 1,
      currentYear: "",
      emptyList: new Array(0),
      gridList: new Array(35),
      monthList: new Array(12),
      monthsSize: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      numberOfDays: 30,
    };
  },
  emits: [],
  methods: {
    /**
     * ẩn hiện bảng chọn chung
     * Author: Tô Nguyễn Đức Mạnh (11/10/2022)
     */
    showSelect() {
      try {
        this.getFullDayValue(
          this.currentYear,
          this.currentMonthNth,
          this.currentDay
        );
        this.isSelectShow = !this.isSelectShow;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * ẩn bảng chọn chung
     * Author: Tô Nguyễn Đức Mạnh (11/10/2022)
     */
    hideSelect() {
      try {
        this.isSelectShow = false;
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
        this.isDaySelectShow = true;
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
        this.isMonthSelectShow = true;
        this.isDaySelectShow = false;
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
        this.isMonthSelectShow = false;
        this.isYearSelectShow = true;
        this.isDaySelectShow = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lấy ngày hiện tại
     * @param year: năm muốn truyền vào
     * @param month: tháng muốn truyền vào
     * @param day: ngày muốn truyền vào
     * Author: Tô Nguyễn Đức Mạnh (11/10/2022)
     */
    getFullDayValue(year, month, day) {
      try {
        //tạo ra object năm lưu trữ các thông tin như năm, tháng , ngày, thứ bắt đầu của tháng
        // thứ bắt đầu của tháng là vd tháng 10 ngày 1 rơi vào thứ 3
        let date = new Date();

        if (year) {
          date = new Date(year, month, day);
        }

        // lấy ra năm hiện tại
        this.currentYear = date.getFullYear();

        // lấy ra tháng hiện tại
        this.currentMonth = date.toLocaleString("default", { month: "long" });

        // lấy ra số thứ tự tháng hiện tại (để tạo list có selected)
        this.currentMonthNth = date.getMonth();

        // lấy ra số ngày ứng với tháng hiện tại
        this.numberOfDays = this.monthsSize[this.currentMonthNth];

        // lẩy ra ngày hiện tại
        this.currentDay = date.getDate();

        // tạo ra 1 array với số ngày hiện tại để dùng v-for render ra ngày trong tháng
        this.gridList = new Array(this.numberOfDays);

        // kiểm tra xem ngày đầu tiên của tháng là thứ mấy trong tuần
        this.firstDayOfWeek = new Date(
          this.currentYear,
          this.currentMonthNth,
          1
        ).getDay();

        // tạo ra 1 array rỗng để cho những ngày đầu tiên trong lịch không có số gì cả
        if (this.firstDayOfWeek === 0) {
          this.emptyList = new Array(0);
        } else {
          this.emptyList = new Array(this.firstDayOfWeek - 1);
        }
        this.modelvalue = `${this.currentDay}/${this.currentMonthNth + 1}/${
          this.currentYear
        }`;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Chuyển sang tháng tiếp theo
     * Author: Tô Nguyễn Đức Mạnh (11/10/2022)
     */
    goNextMonth() {
      try {
        this.getFullDayValue(
          this.currentYear,
          this.currentMonthNth + 1,
          this.currentDay
        );
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Chuyển sang tháng trước đó
     * Author: Tô Nguyễn Đức Mạnh (11/10/2022)
     */
    goPrevMonth() {
      try {
        this.getFullDayValue(
          this.currentYear,
          this.currentMonthNth - 1,
          this.currentDay
        );
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thay đổi ngày hiện tại theo giá trị đầu vào
     * @param day : ngày muốn truyền vào
     * Author: Tô Nguyễn Đức Mạnh (11/10/2022)
     */
    changeDate(day) {
      try {
        this.getFullDayValue(this.currentYear, this.currentMonthNth, day);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thay đổi tháng hiện tại theo giá trị đầu vào
     * @param month : tháng muốn truyền vào
     * Author: Tô Nguyễn Đức Mạnh (11/10/2022)
     */
    changeMonth(month) {
      try {
        this.getFullDayValue(this.currentYear, month, this.currentDay);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thay đổi năm hiện tại theo giá trị đầu vào
     * @param year : năm muốn truyền vào
     * Author: Tô Nguyễn Đức Mạnh (11/10/2022)
     */
    changeYear(year) {
      try {
        this.getFullDayValue(year, this.currentMonthNth, this.currentDay);
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
