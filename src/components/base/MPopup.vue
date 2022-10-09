<template lang="">
  <div @keyup="checkKeyUp">
    <!-- phần popup xóa -->
    <div
      v-if="isAskWarning"
      ref="popupAskWarning"
      class="popup__wrap"
      tabindex="0"
    >
      <div class="popup popup--askwarning">
        <div class="popup__content">
          <div class="icon popup__icon"></div>
          <div class="popup__text">{{ AskWarningFormatName }}</div>
        </div>
        <div class="popup__action">
          <MButton
            :buttonTwo="true"
            @click="
              $emit('hide-popup');
              showCanceledNoti();
            "
            :buttonName="this.MISAResource.ButtonText.NoBtn[getLanguage]"
          />
          <MButton
            :buttonName="this.MISAResource.ButtonText.YesBtn[getLanguage]"
            @click="$emit('delete-now')"
          />
        </div>
      </div>
    </div>
    <!-- phần popup hỏi muốn lưu không -->

    <div v-if="isAsk" ref="popupAsk" class="popup__wrap" tabindex="0">
      <div class="popup popup--ask">
        <div class="popup__content">
          <div class="icon popup__icon"></div>
          <div class="popup__text">
            {{ AskMess }}
          </div>
        </div>
        <div class="popup__action">
          <MButton
            :buttonTwo="true"
            class="button--cancel"
            :buttonName="this.MISAResource.ButtonText.CancelBtn[getLanguage]"
            @click="$emit('hide-popup')"
          />
          <div class="">
            <MButton
              :buttonTwo="true"
              :buttonName="this.MISAResource.ButtonText.NoBtn[getLanguage]"
              class="button--no"
              @click="
                $emit('hide-all');
                showCanceledNoti();
              "
            />
            <MButton
              :buttonName="this.MISAResource.ButtonText.YesBtn[getLanguage]"
              @click="$emit('save-now')"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- phần popup nhập lỗi -->
    <div v-if="isAlert" ref="popupAlert" class="popup__wrap" tabindex="0">
      <div class="popup popup--alert">
        <div class="popup__content">
          <div class="icon popup__icon"></div>
          <div class="popup__text">
            <span v-for="(alertItem, index) in AlertMessFormatted" :key="index">
              <div>{{ alertItem }}</div>
            </span>
          </div>
        </div>
        <div class="popup__action">
          <MButton
            :buttonName="this.MISAResource.ButtonText.CloseBtn[getLanguage]"
            @click="$emit('hide-popup')"
          />
        </div>
      </div>
    </div>
    <!-- phần popup trùng id -->
    <div v-if="isWarning" ref="popupWarning" class="popup__wrap" tabindex="0">
      <div class="popup popup--warning">
        <div class="popup__content">
          <div class="icon popup__icon"></div>
          <div class="popup__text">{{ WarningMess }}</div>
        </div>
        <div class="popup__action">
          <MButton
            :buttonName="this.MISAResource.ButtonText.OkBtn[getLanguage]"
            @click="$emit('hide-popup')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MISAEnum from "../../js/enum.js";
import MISAResource from "../../js/resource.js";
import MButton from "./MButton.vue";
export default {
  name: "MPopup",
  components: {
    MButton,
  },
  emits: [
    "hide-popup",
    "hide-all",
    "re-load",
    "delete-now",
    "save-now",
    "show-toast-message",
  ],
  props: [
    "isAskWarning",
    "AskWarningMess",
    "AskWarningName",
    "isAsk",
    "AskMess",
    "isAlert",
    "AlertMess",
    "isWarning",
    "WarningMess",
  ],
  data() {
    return {
      MISAEnum,
      MISAResource,
      AlertMessFormatted: "",
      AskWarningFormatName: "",
      timeOut: null,
      language: "",
    };
  },
  computed: {
    getLanguage() {
      return this.$store.state.language;
    },
  },
  //phân ra alert string thành array
  beforeUpdate() {
    let mess = this.AskWarningMess;
    if (this.AskWarningName) {
      this.AskWarningFormatName = mess.replace("{0}", this.AskWarningName);
    } else {
      this.AskWarningFormatName = mess;
    }

    if (this.AlertMess !== "" && this.AlertMess !== undefined) {
      this.AlertMessFormatted = this.AlertMess.split("#");
    }
  },
  updated() {
    // dùng nextick để đợi DOM render đã, sau đó focus vào cái popup để có thể dùng tabindex
    this.$nextTick(() => {
      if (this.$refs.popupAskWarning) {
        this.$refs.popupAskWarning.focus();
      }
      if (this.$refs.popupAsk) {
        this.$refs.popupAsk.focus();
      }
      if (this.$refs.popupAlert) {
        this.$refs.popupAlert.focus();
      }
      if (this.$refs.popupWarning) {
        this.$refs.popupWarning.focus();
      }
    });
  },
  methods: {
    /**
     * Hiển thị thông báo đã hủy hành động hiện tại
     * Author: Tô Nguyễn Đức Mạnh (15/09/2022)
     */
    showCanceledNoti() {
      try {
        // hiện toast message thêm người dùng thành công
        this.$emit(
          "show-toast-message",
          this.MISAEnum.toasttype.NOTI,
          this.MISAResource.ToastMessage.CanceledNoti
        );
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tự động ẩn form khi ấn vào phím esc
     * Author: Tô Nguyễn Đức Mạnh (09/10/2022)
     */
    checkKeyUp() {
      try {
        const check = (event) => {
          // nếu là ấn phím ESC thì đóng
          if (event.which === this.MISAEnum.keycode.ESC) {
            event.preventDefault();
            this.$emit("hide-popup");
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
@import url("../../css/base/icon.css");
@import url("../../css/base/popup.css");
.button--no {
  margin-right: 8px;
}
</style>
