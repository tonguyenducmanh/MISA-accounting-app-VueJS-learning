<template lang="">
  <div class="combobox" value="">
    <input class="combobox__input" type="text" />
    <button class="combobox__button">
      <div class="combobox__drop"></div>
    </button>
    <div class="combobox__data combobox__data--open">
      <template v-for="(comboboxItem, index) in comboboxList" :key="index">
        <div tabindex="0" class="combobox__item" :value="comboboxItem.value">
          {{ comboboxItem.name }}
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import "../js/LibCombobox.js";
export default {
  name: "LibCombobox",
  props: {
    api: String,
    data: Object,
    dataTitle: String,
    placeHolder: String,
    text: String,
    value: String,
  },
  data() {
    return {
      comboboxList: [
        { value: 0, name: "Test 1" },
        { value: 1, name: "Test 2" },
        { value: 2, name: "Test 3" },
      ],
    };
  },
};
</script>
<style scoped>
@import url("../css/LibCombobox.css");
</style>
