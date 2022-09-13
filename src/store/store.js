import { createStore } from "vuex";

// Tạo ra 1 store toàn cục lưu trữ toàn bộ dữ liệu
const store = createStore({
  state() {
    return {
      count: 0,
      deleteId: "",
      deleteName: "",
      language: "VI",
      toggleToast: false,
      toastType: "",
      toastText: "",
      pageSize: 10,
      pageNumber: 1,
      searchFilter: "",
      totalRecords: 0,
      totalPage: 0,
      currentPage: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    changeSize(state, value) {
      state.pageSize = value;
    },
    changeFilter(state, value) {
      state.searchFilter = value;
    },
    changeDeleteId(state, value) {
      state.deleteId = value;
    },
    changeDeleteName(state, value) {
      state.deleteName = value;
    },
    changeTotalRecords(state, value) {
      state.totalRecords = value;
    },
    changeTotalPage(state, value) {
      state.totalPage = value;
    },
    changeCurrentPage(state, value) {
      state.currentPage = value;
    },
    toggleToast(state, value) {
      state.toggleToast = value;
    },
    changeToastType(state, value) {
      state.toastType = value;
    },
    changeToastText(state, value) {
      state.toastText = value;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
    /**
     * Thay đổi phân trang theo số bản ghi
     * @param {*} value - giá trị của pageSize
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    changeSize(context, value) {
      context.commit("changeSize", value);
    },
    /**
     * Thay đổi từ khóa tìm kiếm bản ghi
     * @param {*} value -giá trị của search keyword
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    changeFilter(context, value) {
      context.commit("changeFilter", value);
    },
    /**
     * Thay đổi id của employee định xóa
     * @param {*} value -giá trị của delete Id
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    changeDeleteId(context, value) {
      context.commit("changeDeleteId", value);
    },
    /**
     * Thay đổi tên của employee định xóa
     * @param {*} value -giá trị của delete name
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    changeDeleteName(context, value) {
      context.commit("changeDeleteName", value);
    },
    /**
     * Thay đổi tổng page định xóa
     * @param {*} value -giá trị của tổng page
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    changeTotalPage(context, value) {
      context.commit("changeTotalPage", value);
    },
    /**
     * Thay đổi tổng record định xóa
     * @param {*} value -giá trị của tổng record
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    changeTotalRecords(context, value) {
      context.commit("changeTotalRecords", value);
    },
    /**
     * Thay đổi tên của page hiện tại định xóa
     * @param {*} value -giá trị của page hiện tại
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    changeCurrentPage(context, value) {
      context.commit("changeCurrentPage", value);
    },
    /**
     * Thay đổi trạng thái của toast
     * @param {*} value -giá trị true hoặc false
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    toggleToast(context, value) {
      context.commit("toggleToast", value);
    },
    /**
     * Thay đổi loại toast
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    changeToastType(context, value) {
      context.commit("changeToastType", value);
    },
    /**
     * Thay đổi văn bản toast
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    changeToastText(context, value) {
      context.commit("changeToastText", value);
    },
  },
});

export default store;
