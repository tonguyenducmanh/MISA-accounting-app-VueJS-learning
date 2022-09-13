<template lang="">
  <div>
    <!-- phần popup xóa -->
    <div v-if="isAskWarning" class="popup__wrap" id="popupAskWarning">
      <div class="popup popup--askwarning">
        <div class="popup__content">
          <div class="icon popup__icon"></div>
          <div class="popup__text">{{ AskWarningMess }}</div>
        </div>
        <div class="popup__action">
          <MButton
            :buttonTwo="true"
            @click="$emit('hide-popup')"
            buttonName="Không"
            dataTitle="Đóng (ESC)"
          />
          <MButton buttonName="Có" @click="deleteEmployee" />
        </div>
      </div>
    </div>
    <!-- phần popup hỏi muốn lưu không -->

    <div v-if="isAsk" class="popup__wrap" id="popupAsk">
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
              @click="$emit('hide-all')"
            />
            <MButton buttonName="Có" />
          </div>
        </div>
      </div>
    </div>

    <!-- phần popup nhập lỗi -->
    <div v-if="isAlert" class="popup__wrap" id="popupAlert">
      <div class="popup popup--alert">
        <div class="popup__content">
          <div class="icon popup__icon"></div>
          <div class="popup__text">{{ AlertMess }}</div>
        </div>
        <div class="popup__action">
          <MButton buttonName="Đóng" @click="$emit('hide-popup')" />
        </div>
      </div>
    </div>
    <!-- phần popup trùng id -->
    <div v-if="isWarning" class="popup__wrap" id="popupWarning">
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
  emits: ["hide-popup", "hide-all", "re-load"],
  props: [
    "isAskWarning",
    "AskWarningMess",
    "isAsk",
    "AskMess",
    "isAlert",
    "AlertMess",
    "isWarning",
    "WarningMess",
    "deleteId",
  ],
  data() {
    return {
      MISAEnum,
      MISAResource,
    };
  },
  methods: {
    /**
     * Xóa người dùng đi
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    deleteEmployee() {
      try {
        let language = this.$store.state.language;
        let message = this.MISAResource.ToastMessage.DeleteNoti[language];
        // gọi api xóa đi
        let apiDelete = `${this.MISAEnum.API.GETEMPLOYEELIST}/${this.deleteId}`;
        fetch(apiDelete, { method: "DELETE" })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            // ẩn popup xóa đi
            this.$emit("hide-popup");
            this.$emit("re-load");
            // hiện toast mesage lên
            this.$store.dispatch(
              "changeToastType",
              this.MISAEnum.toasttype.SUCCESS
            );
            this.$store.dispatch("changeToastText", message);
            this.$store.dispatch("toggleToast", true);
            // ẩn đi sau 3 giây
          })
          .catch((res) => {
            console.log(res);
          });
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
