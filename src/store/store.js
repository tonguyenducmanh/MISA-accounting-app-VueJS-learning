import { createStore } from "vuex";

// Tạo ra 1 store toàn cục lưu trữ toàn bộ dữ liệu
const store = createStore({
  state() {
    return {
      deleteId: "",
      deleteName: "",
      language: "VI",
      toggleToast: false,
      toastType: "",
      toastText: "",
      pageSize: 10,
      pageNumber: 1,
      keyword: "",
      totalRecords: 0,
      totalPage: 0,
      method: "",
      currentEditID: "",
      currentEditCode: "",
      selectedIDs: [],
      isClone: false,
    };
  },
  // Các method trong mutations sẽ không gọi trực tiếp mà gọi ở phần action có cùng tên
  mutations: {
    changeSize(state, value) {
      state.pageSize = value;
      // số trang mà nhân với số records > tổng record thì quay về trang 1
      if (state.pageSize * state.pageNumber > state.totalRecords) {
        state.pageNumber = 1;
      }
    },
    changeFilter(state, value) {
      state.keyword = value;
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
      state.pageNumber = value;
    },
    moveNextPage(state) {
      if (state.pageNumber < state.totalPage) {
        state.pageNumber++;
      }
    },
    movePrevPage(state) {
      if (state.pageNumber > 1) {
        state.pageNumber--;
      }
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
    changeMethod(state, value) {
      state.method = value;
    },
    changeEditID(state, value) {
      state.currentEditID = value;
    },
    changeEditCode(state, value) {
      state.currentEditCode = value;
    },
    changeSelectedIDs(state, value) {
      state.selectedIDs = value;
    },
    changeStatusClone(state, value) {
      state.isClone = value;
    },
    changeLanguage(state, value) {
      state.language = value;
    },
  },
  // các action để thay đổi dữ liệu
  actions: {
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
     * chuyển sang page tiếp
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    moveNextPage(context) {
      context.commit("moveNextPage");
    },
    /**
     * chuyển về page trước
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    movePrevPage(context) {
      context.commit("movePrevPage");
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
     * @param {*} value - giá trị miêu tả loại toastmessage
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    changeToastType(context, value) {
      context.commit("changeToastType", value);
    },
    /**
     * Thay đổi văn bản toast
     * @param {*} value - giá trị văn bản trong toastmessage
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    changeToastText(context, value) {
      context.commit("changeToastText", value);
    },
    /**
     * Thay đổi method của api
     * @param {*} value - giá trị method muốn để (GET, POST, PUT)
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    changeMethod(context, value) {
      context.commit("changeMethod", value);
    },
    /**
     * Thay đổi ID của nhân viên đang edit hiện tại
     * @param {*} value - giá trị văn bản trong toastmessage
     * Author: Tô Nguyễn Đức Mạnh (14/09/2022)
     */
    changeEditID(context, value) {
      context.commit("changeEditID", value);
    },
    /**
     * Thay đổi edit code của nhân viên đang edit hiện tại
     * @param {*} value - giá trị edit code muốn truyền
     * Author: Tô Nguyễn Đức Mạnh (04/10/2022)
     */
    changeEditCode(context, value) {
      context.commit("changeEditCode", value);
    },
    /**
     * Thay đổi array selected ID hiện tại
     * @param {*} value - giá trị selectedIDs dạng mảng
     * Author: Tô Nguyễn Đức Mạnh (04/10/2022)
     */
    changeSelectedIDs(context, value) {
      context.commit("changeSelectedIDs", value);
    },
    /**
     * Thay đổi trạng thái xem có đang ở trạng thái nhân bản không
     * @param {*} value - giá trị trạng thái nhân bản (true hoặc false)
     * Author: Tô Nguyễn Đức Mạnh (04/10/2022)
     */
    changeStatusClone(context, value) {
      context.commit("changeStatusClone", value);
    },
    /**
     * Thay đổi ngôn ngữ
     * @param {*} value - ngôn ngữ muốn thay đổi
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    changeLanguage(context, value) {
      context.commit("changeLanguage", value);
    },
  },
});

export default store;
