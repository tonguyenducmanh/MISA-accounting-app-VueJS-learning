<template lang="">
  <div ref="popupContainer">
    <!-- phần popup xóa -->
    <div
      v-if="isAskWarning"
      class="popup__wrap"
      id="popupAskWarning"
      tabindex=""
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
            buttonName="Không"
            dataTitle="Đóng (ESC)"
          />
          <MButton buttonName="Có" @click="$emit('delete-now')" />
        </div>
      </div>
    </div>
    <!-- phần popup hỏi muốn lưu không -->

    <div v-if="isAsk" class="popup__wrap" id="popupAsk" tabindex="">
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
            buttonName="Hủy"
            @click="$emit('hide-popup')"
            dataTitle="Hủy (ESC)"
          />
          <div class="">
            <MButton
              :buttonTwo="true"
              buttonName="Không"
              dataTitle="Không (ctrl + Q)"
              class="button--no"
              @click="
                $emit('hide-all');
                showCanceledNoti();
              "
            />
            <MButton buttonName="Có" @click="$emit('save-now')" />
          </div>
        </div>
      </div>
    </div>

    <!-- phần popup nhập lỗi -->
    <div v-if="isAlert" class="popup__wrap" id="popupAlert" tabindex="">
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
          <MButton buttonName="Đóng" @click="$emit('hide-popup')" />
        </div>
      </div>
    </div>
    <!-- phần popup trùng id -->
    <div v-if="isWarning" class="popup__wrap" id="popupWarning" tabindex="">
      <div class="popup popup--warning">
        <div class="popup__content">
          <div class="icon popup__icon"></div>
          <div class="popup__text">{{ WarningMess }}</div>
        </div>
        <div class="popup__action">
          <MButton buttonName="Đồng ý" @click="$emit('hide-popup')" />
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
    };
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
