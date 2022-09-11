<template lang="">
  <div class="combobox" :propName="propName" :value="unique">
    <input
      class="combobox__input"
      :class="classInput"
      type="text"
      :value="defaultValue"
      :placeholder="placeHolder"
      :validate="validate"
      :data-title="dataTitle"
      @focus="inputComboboxOnClick"
    />
    <button class="combobox__button">
      <div class="combobox__drop"></div>
    </button>
    <div class="combobox__data" ref="hihi">
      <template v-for="(comboboxItem, index) in comboboxList" :key="index">
        <div
          tabindex="0"
          class="combobox__item"
          :value="comboboxItem.value"
          :class="
            defaultValue === comboboxItem.name
              ? ComboboxEnum.comboboxItem.selected
              : false
          "
        >
          {{ comboboxItem.name }}
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import ComboboxEnum from "../js/LibEnum.js";
export default {
  name: "LibCombobox",
  props: {
    classInput: String,
    dataTitle: String,
    validate: String,
    placeHolder: String,
    propName: String,
    defaultValue: String,
    unique: String,
    // giá trị chèn vào khi không có api
    data: String,
    // api để fetch data
    api: String,
    // trường thứ nhất muốn lấy trong json respone
    text: String,
    // trường thứ hai muốn lấy trong json respone
    value: String,
  },
  data() {
    return {
      comboboxList: [],
      ComboboxEnum,
    };
  },
  beforeMount() {
    /**
     * Tiến hành fetch dữ liệu từ API để chèn vào combobox hoặc
     * phân tách data truyền vào component để tạo ra các comboboxitem
     * Author: Tô Nguyễn Đức Mạnh (11/09/2022)
     */
    try {
      let combobox = this;
      // trường hợp có api
      if (this.api !== undefined) {
        fetch(this.api, { method: "GET" })
          .then((res) => res.json())
          .then((res) => {
            // gán giá trị mong muốn vào trong comboboxList
            for (let item of res) {
              combobox.comboboxList.push({
                value: item[combobox.value],
                name: item[combobox.text],
              });
            }
          })
          .catch((res) => console.log(res));
      }
      // trường hợp không có api
      else {
        // phân chia các item bằng dấu ;
        let items = this.data.split(";");
        for (let item of items) {
          let arrItem = item.split(":");
          combobox.comboboxList.push({
            value: arrItem[1].trim(),
            name: arrItem[0].trim(),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /**
     * lắng nghe nhập liệu vào ô input của combobox
     * Author: Tô Nguyễn Đức Mạnh (11/09/2022)
     */

    inputComboboxOnClick() {
      console.log("input");
    },
  },
};
</script>
<style scoped>
@import url("../css/LibCombobox.css");
</style>
