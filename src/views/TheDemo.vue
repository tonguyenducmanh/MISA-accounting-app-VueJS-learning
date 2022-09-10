<template lang="">
  <div class="demo">
    <div>1.1 Button primary</div>

    <MButton buttonName="Bấm em đi anh ơi" />

    <div>1.2 Button secondary</div>

    <MButton :buttonTwo="true" buttonName="Bấm em đi anh ơi" />

    <div>2.1 Input</div>

    <MInput placeholder="Đây là input thường" />

    <div>2.2 Input label</div>

    <MInput
      :hasLabel="true"
      :labelText="'Đây là Input có label'"
      placeholder="Đây là input có label"
    />

    <div>2.3 Input icon</div>

    <MInput :hasIcon="true" placeholder="Đây là input có icon" />

    <div>2.4 Input label icon</div>

    <MInput
      :hasLabel="true"
      :labelText="'Đây là Input có cả label icon'"
      :hasIcon="true"
      placeholder="Đây là input có cả label icon"
    />
    <div>2.5 Input italic</div>

    <MInput
      :hasItalic="true"
      :hasIcon="true"
      placeholder="Đây là input có cả label icon"
    />
    <div>2.6 Input alert</div>

    <MInput
      :hasAlert="true"
      :hasLabel="true"
      :labelText="'Đây là Input alert'"
      :hasIcon="true"
      placeholder="Đây là input alert"
    />
    <div>3.1 Context menu open</div>

    <MConntextMenu :hasOpen="true" />

    <br /><br /><br />

    <div>3.2 Context menu open-up</div>

    <br /><br /><br />

    <MConntextMenu :hasOpen="true" :hasUp="true" />

    <div>3.3 Context menu close</div>

    <MConntextMenu />

    <div>4 Date picker</div>

    <MDatePicker labelText="Label của Date picker" />

    <div>5. Checkbox</div>

    <MCheckbox checkboxId="testCheckbox_1" labelText="Tiêu đề checkbox" />

    <div>6. Radio button</div>

    <MRadioButton
      titleText="Radio Title"
      :content="[
        {
          name: 'Nam',
          value: 0,
        },
        {
          name: 'Nữ',
          value: 1,
        },
        {
          name: 'Khác',
          value: 2,
        },
      ]"
    />

    <div>7. Toast message</div>
  </div>
</template>
<script>
// import component file
import MButton from "../components/base/MButton.vue";
import MInput from "../components/base/MInput.vue";
import MConntextMenu from "../components/base/MContextMenu.vue";
import MDatePicker from "../components/base/MDatePicker.vue";
import MCheckbox from "../components/base/MCheckbox.vue";
import MRadioButton from "../components/base/MRadioButton.vue";

export default {
  components: {
    MButton,
    MInput,
    MConntextMenu,
    MDatePicker,
    MCheckbox,
    MRadioButton,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.demo {
  padding: 20px 10%;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  background-color: white;
}
</style>
