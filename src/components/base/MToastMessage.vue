<template lang="">
  <div class="toastmessage">
    <span class="toastmessage__content" :class="toastTypeClass">
      <span class="icon toastmessage__icon"></span>
      <span class="toastmessage__type">
        {{ toastMessageTypeText }}
      </span>
      <span class="toastmessage__text">{{ toastText }}</span>
    </span>
    <span class="icon toastmessage__close" @click="hideToast"></span>
  </div>
</template>
<script>
// import js files
import MISAEnum from "../../js/enum.js";
import MISAResource from "../../js/resource.js";

export default {
  name: "MToastMessage",
  data() {
    return {
      MISAEnum,
      MISAResource,
      toastMessageTypeText: "",
      toastTypeClass: "",
    };
  },
  props: ["language", "toastType", "toastText"],
  /**
   * Gán kiểu thông báo cho toast
   * Author: Tô Nguyễn Đức Mạnh (11/09/2022)
   */
  beforeMount() {
    switch (this.toastType) {
      case MISAEnum.toasttype.SUCCESS:
        this.toastMessageTypeText =
          MISAResource.ToastMessage.Success[this.language];
        this.toastTypeClass = MISAEnum.toastmessage.SUCCESS;
        break;
      case MISAEnum.toasttype.ERROR:
        this.toastMessageTypeText =
          MISAResource.ToastMessage.Error[this.language];
        this.toastTypeClass = MISAEnum.toastmessage.ERROR;
        break;
      case MISAEnum.toasttype.WARNING:
        this.toastMessageTypeText =
          MISAResource.ToastMessage.Warning[this.language];
        this.toastTypeClass = MISAEnum.toastmessage.WARNING;
        break;
      case MISAEnum.toasttype.NOTI:
        this.toastMessageTypeText =
          MISAResource.ToastMessage.Noti[this.language];
        this.toastTypeClass = MISAEnum.toastmessage.NOTI;
        break;
      default:
        break;
    }
  },
  /**
   * Sau 3 giây hiện toast message thì ẩn nó đi
   * Author: Tô GNuyeenx Đức Mạnh (13/09/2022)
   */
  created() {
    setTimeout(() => {
      this.hideToast();
    }, 3000);
  },
  methods: {
    /**
     * Ẩn toast message đi nha, bên cạnh đó xóa luôn các thông tin trong toast.
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    hideToast() {
      this.$store.dispatch("toggleToast", false);
      this.$store.dispatch("changeToastType", "");
      this.$store.dispatch("changeToastText", "");
    },
  },
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/toastmessage.css");
</style>
