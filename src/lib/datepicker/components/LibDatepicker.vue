<template lang="">
  <div
    class="datepicker__container"
    v-click-out="hideSelect"
    @keydown.esc.passive="hideSelect"
  >
    <!-- phần nhãn văn bản -->
    <div v-if="hasLabel" class="input__label">
      {{ labelText }}
    </div>
    <!-- phần datepicer -->
    <div class="datepicker" :data-title="dataTitle">
      <!-- phần nhập liệu -->
      <input
        tabindex="0"
        class="datepicker__input"
        type="text"
        :class="
          ([classInput],
          isErrorTying === true ? DatepickerEnum.input.InputAlert : '')
        "
        :placeholder="
          defaultValue !== '' && defaultValue !== undefined
            ? defaultValue
            : placeHolder
        "
        v-model="currentInputValue"
      />
      <!-- phần nút mở menu -->
      <button
        tabindex="0"
        :class="buttonClass"
        class="datepicker__button"
        @keydown.enter="showSelect"
      >
        <div class="datepicker__drop" @click="showSelect"></div>
      </button>
      <!-- phần hiển thị ngày để chọn -->
      <div v-if="isSelectShow" class="datepicker__select">
        <!-- phần chọn ngày theo bảng -->
        <div class="datepicker__table">
          <!-- phần tháng năm và chọn tháng trước tháng sau -->
          <div class="datepicker__navigation">
            <div class="datepicker__monthyear">
              <div
                tabindex="0"
                class="datepicker__month"
                @click="showMonthSelect"
                @keydown.enter="showMonthSelect"
              >
                {{ this.currentMonth }}
              </div>
              ,
              <div
                tabindex="0"
                class="datepicker__year"
                @click="showYearSelect"
                @keydown.enter="showYearSelect"
              >
                {{ this.currentYear }}
              </div>
              <div
                tabindex="0"
                class="datepicker__icon datepicker__monthyearicon"
                @click="showDateSelect"
                @keydown.enter="showDateSelect"
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
              tabindex="0"
              :class="
                index === this.currentMonthNth
                  ? this.DatepickerEnum.selected.Month
                  : ''
              "
              @keydown.enter="changeMonth(index)"
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
          <div class="datepicker__scrollyear">
            <template v-for="(year, index) in yearList" :key="index">
              <div
                class="datepicker__yearitem"
                :ref="year === this.currentYear ? 'scrollToMe' : ''"
                :class="
                  year === this.currentYear
                    ? this.DatepickerEnum.selected.Year
                    : ''
                "
                @click="changeYear(year)"
              >
                {{ year }}
              </div>
            </template>
          </div>
        </div>

        <!-- phần chọn ngày hôm nay -->
        <div
          tabindex="0"
          class="datepicker__selecttoday"
          @click="
            getFullDayValue();
            hideSelect();
          "
          @keydown.enter="
            getFullDayValue();
            hideSelect();
          "
          @keydown.tab="hideSelect"
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
    modelValue: String,
    dataTitle: String,
    compareToNow: Boolean,
  },
  data() {
    return {
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
      yearList: new Array(5),
      monthsSize: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      numberOfDays: 30,
      currentInputValue: "",
      updatedOneTime: false,
    };
  },
  emits: ["update:modelValue"],
  watch: {
    /**
     * Lắng nghe dữ liệu nhập vào, nếu nó thay đổi và hợp lệ form thì
     * sẽ truyền vào v-model giá trị ngày tương ứng
     * Author: Tô Nguyễn Đức Mạnh (12/10/2022)
     */
    currentInputValue() {
      this.checkDateFormat(this.currentInputValue);
      this.checkEmptyValue(this.currentInputValue);
    },
    /**
     * kiểm tra xem có lớn hơn ngày hiện tại không
     * Author : Tô Nguyễn Đức Mạnh (12/10/2022)
     */
    modelValue() {
      if (this.compareToNow === true) {
        this.compareToTodayDate(this.modelValue);
      }
      this.checkEmptyModel();
    },
    /**
     * Tính toán số năm từ năm hiện tại - 50 năm đến 50 năm sau năm hiện tại
     * Author: Tô Nguyễn Đức Mạnh (12/10/2022)
     */
    currentYear() {
      this.yearList = Array.from(
        { length: 100 },
        (value, index) => this.currentYear - 50 + index
      );
      this.scrollToElement();
    },
  },
  /**
   * trước khi updated 1 lần duy nhất thực hiện bóc tách modelValue nếu có để
   * gán nó vào trong data
   */
  updated() {
    try {
      if (
        this.updatedOneTime === false &&
        this.modelValue !== null &&
        this.modelValue !== "" &&
        this.modelValue !== undefined
      ) {
        //chuyển đổi json date thành object date
        let date = new Date(this.modelValue);

        // bật cái data đã update 1 lần duy nhất lên
        this.updatedOneTime = true;

        // bóc tách ngày, tháng, năm, thứ, index của tháng hiện tại từ object date rồi
        // truyền vào trong data ()
        this.getInfoFromDate(date);

        //  Kiểm tra ngày đầu tiên của tháng là thứ mấy trong tuần
        //  sau đó render ra bảng có n ngày trống để hiển thị cho chuẩn
        this.renderEmptyDateList();

        // thay đổi giá trị mới cho inputvalue
        this.currentInputValue = this.addZeroValue(
          this.currentDay,
          this.currentMonthNth + 1,
          this.currentYear
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /**
     * Check dữ liệu nhập vào có phải là DD/MM/YYYY hay không
     * @param date: Ngày cần check
     * Author: Tô Nguyễn Đức Mạnh (12/10/2022)
     */
    checkDateFormat(date) {
      try {
        let regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        var test = date.match(regex);

        // nếu phù hợp với kết quả định dạng dd//mm/yyyy thì mình tiến hành
        // thêm nó vào v-model của component ( this.modelValue )
        if (test) {
          let arrDate = date.split("/");
          this.getFullDayValue(arrDate[2], arrDate[1] - 1, arrDate[0]);
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * kiểm tra xem giá trị nhập ở ô input có bị xóa đi không ?
     * nếu có thì phải clear hết đi
     * @param value : giá trị ô nhập input hiện tại
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    checkEmptyValue(value) {
      try {
        if (value === "" || value === null || value === undefined) {
          // emit value lên theo v-model để bên ngoài component nhận được
          this.$emit("update:modelValue", null);
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * kiểm tra xem cố phải modelValue vừa mới rỗng không, nếu rỗng
     * thì cho input value rỗng theo
     */
    checkEmptyModel() {
      try {
        if (
          this.modelValue === "" ||
          this.modelValue === null ||
          this.modelValue === undefined
        ) {
          this.currentInputValue = "";
        }
      } catch (error) {
        console.log(error);
      }
    },
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
        // chuyển về chỉ hiện bảng chọn ngày thôi
        this.showDateSelect();
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
        // tự động cuộn tới năm hiện tại
        this.scrollToElement();
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
          date = new Date(Date.UTC(year, month, day));
        }

        // bóc tách ngày, tháng, năm, thứ, index của tháng hiện tại từ object date rồi
        // truyền vào trong data ()
        this.getInfoFromDate(date);

        //  Kiểm tra ngày đầu tiên của tháng là thứ mấy trong tuần
        //  sau đó render ra bảng có n ngày trống để hiển thị cho chuẩn
        this.renderEmptyDateList();

        // emit value lên theo v-model để bên ngoài component nhận được
        this.$emit("update:modelValue", date.toJSON());

        // thay đổi giá trị mới cho inputvalue
        this.currentInputValue = this.addZeroValue(
          this.currentDay,
          this.currentMonthNth + 1,
          this.currentYear
        );
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * bóc tách từ object date để truyền vào các
     * trường data như ngày, tháng, năm, số tháng, thứ trong component
     * @param date : object ngày cần bóc tách dữ liệu
     * Author: Tô Nguyễn Đức Mạnh (12/10/2022)
     */
    getInfoFromDate(date) {
      try {
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
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Kiểm tra ngày đầu tiên của tháng là thứ mấy trong tuần
     * sau đó render ra bảng có n ngày trống để hiển thị cho chuẩn
     * Author: Tô Nguyễn Đức Mạnh (12/10/2022)
     */
    renderEmptyDateList() {
      try {
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
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * thay đổi giá trị ngày tháng ứng với các trường hợp có ngày tháng < 10
     * @param date : ngày
     * @param month : tháng
     * @param year : năm
     * Author: Tô Nguyễn Đức Mạnh (12/10/2022)
     */
    addZeroValue(date, month, year) {
      try {
        let inputDate = date < 10 ? "0" + date : date;

        let inputMonth = month < 10 ? `0${month}` : month;

        return `${inputDate}/${inputMonth}/${year}`;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * So sánh ngày vừa nhập với ngày hiện tại xem lớn hơn không, nếu lớn hơn trả về false
     * @param date : ngày cần so sánh với ngày hiện tại
     * Author: Tô Nguyễn Đức Mạnh (12/10/2022)
     */
    compareToTodayDate(date) {
      try {
        let selectedDate = new Date(date);
        let todayDate = new Date();
        if (selectedDate.getTime() > todayDate.getTime()) {
          this.isErrorTying = true;
          return true;
        } else {
          this.isErrorTying = false;
          return false;
        }
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
        this.scrollToElement();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tự động cuộn tới vị trí của năm hiện tại
     * Author: Tô Nguyễn Đức Mạnh (12/10/2022)
     */
    scrollToElement() {
      this.$nextTick(() => {
        {
          if (this.$refs.scrollToMe) {
            let target = this.$refs.scrollToMe[0];
            target.scrollIntoView({
              block: "center",
            });
          }
        }
      });
    },
  },
};
</script>
<style scoped>
@import url("../css/LibDatepicker.css");
</style>
