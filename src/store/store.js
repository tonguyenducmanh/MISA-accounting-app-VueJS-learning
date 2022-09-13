import { createStore } from "vuex";

// Tạo ra 1 store toàn cục lưu trữ toàn bộ dữ liệu
const store = createStore({
  state() {
    return {
      count: 0,
      deleteId: "",
      deleteName: "",
      language: "VI",
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
    changeTotalPage(context, value) {
      context.commit("changeTotalPage", value);
    },
    changeTotalRecords(context, value) {
      context.commit("changeTotalRecords", value);
    },
    changeCurrentPage(context, value) {
      context.commit("changeCurrentPage", value);
    },
  },
});

export default store;
