<template lang="">
  <div class="employee__top">
    <div class="employee__label">
      {{ this.MISAResource.TitleName.EmployeeHeader[language] }}
    </div>
    <MButton
      v-if="showTest"
      buttonName="Test state management"
      @click="testStore"
    />
    <MButton
      :buttonName="MISAResource.ButtonText.AddNewEmployee[language]"
      class="employee__addbtn"
      id="employee__addbtn"
      :dataTitle="MISAResource.DataTile.AddNewBtn[language]"
      @click="
        postMethod();
        $emit('show-form');
      "
    />
  </div>
</template>
<script>
import MButton from "../../components/base/MButton.vue";
import MISAResource from "../../js/resource.js";

export default {
  name: "EmployeeHeader",
  components: {
    MButton,
  },
  emits: ["show-form"],
  data() {
    return {
      MISAResource,
      showTest: false,
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
  methods: {
    /**
     * Phương thức được dùng để test State Management
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    testStore() {
      console.log(this.$store.state.count);
      this.$store.dispatch("increment");
    },
    /**
     * Thay đổi method sang POST
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    postMethod() {
      this.$store.dispatch("changeMethod", "POST");
    },
  },
};
</script>
<style scoped>
.employee__top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding-bottom: 16px;
}

.employee__top .employee__label {
  font-weight: 600;
  font-size: 20px;
}
</style>
