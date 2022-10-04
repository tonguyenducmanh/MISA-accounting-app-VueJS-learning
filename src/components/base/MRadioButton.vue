<template lang="">
  <div class="radio">
    <div class="radio__title">{{ titleText }}</div>
    <div class="radio__select" :propName="propNameBox" :value="modelValue">
      <template v-for="(contentitem, index) in content" :key="index">
        <input
          type="radio"
          name="gender"
          class="radio__button"
          :id="`radio__${index}`"
          :value="contentitem.value"
          :propName="propName"
          @click="$emit('update:modelValue', contentitem.value)"
          tabindex="0"
          @keydown.enter="$emit('update:modelValue', contentitem.value)"
          :checked="contentitem.value === modelValue"
        />
        <label
          class="radio__label"
          :for="`radio__${index}`"
          @click="$emit('update:modelValue', contentitem.value)"
          tabindex="0"
          @keydown.enter="$emit('update:modelValue', contentitem.value)"
          >{{ contentitem.name }}</label
        >
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "MRadioButton",
  emits: ["update:modelValue"],
  props: {
    titleText: {
      type: String,
    },
    content: {
      type: Object,
    },
    propName: String,
    propNameBox: String,
    modelValue: Number,
  },
};
</script>
<style scoped>
@import url("../../css/base/icon.css");
@import url("../../css/base/radio.css");
</style>
