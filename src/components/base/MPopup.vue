<template lang="">
  <!-- phần popup xóa -->
  <div class="popup__wrap" id="popupAskWarning">
    <div class="popup popup--askwarning">
      <div class="popup__content">
        <div class="icon popup__icon"></div>
        <div class="popup__text"></div>
      </div>
      <div class="popup__action">
        <MButton :buttonTwo="true" buttonName="Không" dataTitle="Đóng (ESC)" />
        <MButton buttonName="Có" />
      </div>
    </div>
  </div>
  <!-- phần popup hỏi muốn lưu không -->

  <div class="popup__wrap" id="popupAsk">
    <div class="popup popup--ask">
      <div class="popup__content">
        <div class="icon popup__icon"></div>
        <div class="popup__text">
          Dữ liệu đã được thay đổi, bạn có muốn cất không ?
        </div>
      </div>
      <div class="popup__action">
        <button class="button-second button--cancel" data-title="Hủy (ESC)">
          Hủy
        </button>
        <div class="">
          <button
            class="button-second button--no"
            data-title="Không (ctrl + Q)"
          >
            Không
          </button>
          <button class="button-primary">Có</button>
        </div>
      </div>
    </div>
  </div>

  <!-- phần popup nhập lỗi -->
  <div class="popup__wrap" id="popupAlert">
    <div class="popup popup--alert">
      <div class="popup__content">
        <div class="icon popup__icon"></div>
        <div class="popup__text"></div>
      </div>
      <div class="popup__action">
        <button class="button-primary">Đóng</button>
      </div>
    </div>
  </div>
  <!-- phần popup trùng id -->
  <div class="popup__wrap" id="popupWarning">
    <div class="popup popup--warning">
      <div class="popup__content">
        <div class="icon popup__icon"></div>
        <div class="popup__text"></div>
      </div>
      <div class="popup__action">
        <button class="button-primary">Đồng ý</button>
      </div>
    </div>
  </div>
</template>
<script>
import MButton from "./MButton.vue";
export default {
  name: "MPopup",
  components: {
    MButton,
  },
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/popup.css");
</style>
