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
          <div class="popup__text">{{ AskWarningMess }}</div>
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
          <MButton buttonName="Có" @click="deleteEmployee" />
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
  emits: ["hide-popup", "hide-all", "re-load", "save-now"],
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
      AlertMessFormatted: "",
    };
  },
  //phân ra alert string thành array
  beforeUpdate() {
    if (this.AlertMess !== "" && this.AlertMess !== undefined) {
      this.AlertMessFormatted = this.AlertMess.split("#");
    }
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
          .then(() => {
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
    /**
     * Hiển thị thông báo đã hủy hành động hiện tại
     * Author: Tô Nguyễn Đức Mạnh (15/09/2022)
     */
    showCanceledNoti() {
      try {
        // hiện toast message thêm người dùng thành công
        let lang = this.$store.state.language;
        this.$store.dispatch("changeToastType", this.MISAEnum.toasttype.NOTI);
        this.$store.dispatch(
          "changeToastText",
          this.MISAResource.ToastMessage.CanceledNoti[lang]
        );
        this.$store.dispatch("toggleToast", true);
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
