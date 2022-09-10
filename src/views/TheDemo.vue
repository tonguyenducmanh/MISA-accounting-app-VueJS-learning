<template lang="">
  <div class="demo">
    <div>1. Button primary</div>
    <MButton :buttonClass="MISAEnum.button.Primary" />
    <div>2. Button secondary</div>
    <MButton :buttonClass="MISAEnum.button.Secondary" />
    <div>3. Input</div>
    <MInput placeHolder="Đây là input thường" />
    <div>4. Input label</div>
    <MInput
      :hasLabel="true"
      :labelText="'Đây là Input có label'"
      placeHolder="Đây là input có label"
    />
    <div>5. Input icon</div>
    <MInput :hasIcon="true" placeHolder="Đây là input có icon" />
    <div>6. Input label icon</div>
    <MInput
      :hasLabel="true"
      :labelText="'Đây là Input có cả label icon'"
      :hasIcon="true"
      placeHolder="Đây là input có cả label icon"
    />
    <div>7. Input italic</div>
    <MInput
      :hasItalic="true"
      :hasIcon="true"
      placeHolder="Đây là input có cả label icon"
    />
    <div>8. Input alert</div>
    <MInput
      :hasAlert="true"
      :hasLabel="true"
      :labelText="'Đây là Input alert'"
      :hasIcon="true"
      placeHolder="Đây là input alert"
    />
  </div>
</template>
<script>
// import js files
import MISAEnum from "../js/enum.js";

// import component file
import MButton from "../components/base/MButton.vue";
import MInput from "../components/base/MInput.vue";
export default {
  components: {
    MButton,
    MInput,
  },
  data() {
    return {
      MISAEnum,
    };
  },
};
</script>
<style scoped>
.demo {
  padding: 20px;
  margin: 0 10%;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}
</style>
