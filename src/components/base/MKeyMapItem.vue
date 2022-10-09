<template lang="">
  <div class="keymap__item">
    <div class="keymap__content">
      {{ keyMapName }}
    </div>
    <div class="keymap__btn">
      <div class="keymap__btn--round">{{ buttonOne }}</div>
      <template v-if="buttonTwo">
        +
        <div class="keymap__btn--round">{{ buttonTwo }}</div>
      </template>
    </div>
  </div>
</template>
<script>
// import js files

export default {
  name: "MKeyMapItem",
  props: ["keyMapName", "buttonOne", "buttonTwo"],
  data() {
    return {
      language: "",
    };
  },
  beforeMount() {
    this.language = this.$store.state.language;
  },
  computed: {
    /**
     * Lấy ra giá trị của ngôn ngữ hiện tại
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    getLanguage() {
      return this.$store.state.language;
    },
  },
  watch: {
    /**
     * Lấy ra giá trị của ngôn ngữ hiện tại
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    getLanguage() {
      this.language = this.$store.state.language;
    },
  },
};
</script>
<style scoped>
.keymap__item {
  display: flex;
  justify-content: space-between;
  column-gap: 8px;
  align-items: center;
}

.keymap__btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
}

.keymap__btn .keymap__btn--round {
  border-radius: 4px;
  padding: 4px;
  border: 1px solid var(--ColorBorder);
}
</style>
