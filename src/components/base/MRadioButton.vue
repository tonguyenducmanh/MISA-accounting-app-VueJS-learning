<template lang="">
  <div class="radio">
    <div class="radio__title">{{ titleText }}</div>
    <div class="radio__select" :propName="propNameBox" :value="selectedValue">
      <template v-for="(contentitem, index) in content" :key="index">
        <input
          type="radio"
          name="gender"
          class="radio__button"
          :id="`radio__${index}`"
          :value="contentitem.value"
          :propName="propName"
          @click="setValue(contentitem.value)"
        />
        <label class="radio__label" :for="`radio__${index}`">{{
          contentitem.name
        }}</label>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "MRadioButton",
  data() {
    return {
      selectedValue: "",
    };
  },
  props: {
    titleText: {
      type: String,
    },
    content: {
      type: Object,
    },
    propName: String,
    propNameBox: String,
  },
  methods: {
    setValue(value) {
      this.selectedValue = value;
    },
  },
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/radio.css");
</style>
