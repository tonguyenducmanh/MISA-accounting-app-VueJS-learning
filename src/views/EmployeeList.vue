<template lang="">
  <div class="employee">
    <!-- Employee header gồm ô nhập liệu, nút tìm kiếm và nút reload -->
    <EmployeeHeader @show-form="showForm" />
    <div class="employee__bottom">
      <div class="employee__menu">
        <!-- menu thao tác hàng loạt -->
        <div v-if="isAutoActionBoxShow" class="employee__container--left">
          <!-- nút thao tác hàng loạt -->
          <MButton
            class="employee__menuleft"
            :buttonName="MISAResource.ButtonText.MultiActionBtn[getLanguage]"
            :buttonTwo="true"
            tabindex="0"
            @click="toggleMoreActionMenu"
            v-click-out="hideMoreActionMenu"
          />
          <!-- nút xóa nhiều tùy chỉnh (không theo component MButton do có style riêng và logic riêng) -->
          <div
            v-if="isAutoActionShow"
            tabindex="0"
            class="employee__deletecontext"
            @keydown.enter="toggleAskWarningPopUp"
            @click="toggleAskWarningPopUp"
          >
            {{ this.MISAResource.ButtonText.DeleteBtn[getLanguage] }}
          </div>
        </div>
        <!-- element dưới dùng v-else để thay thế element employee__menu--left trên
        khi mà không có nó trong DOM thì vẫn cần 1 element giả để có thể dùng display flex và justify-content space between
        thì mới có thể làm employee__menuright nằm về bên phải của trang web được
         -->
        <div v-else></div>
        <!-- phần menu bên phải -->
        <div class="employee__menuright">
          <!-- ô nhập liệu tìm kiếm kèm theo nút tìm kiếm -->
          <MInput
            :hasItalic="true"
            :hasIcon="true"
            idInput="input__search"
            :iconTitle="MISAResource.DataTile.InputSearch[getLanguage]"
            :showTitle="true"
            :placeHolder="MISAResource.PlaceHolder.Search[getLanguage]"
            @change-filter="changeFilter"
            ref="inputSearch"
            v-model="searchValue"
            :timeDelay="500"
          />
          <!-- nút load lại trang tùy chỉnh không theo MButton -->
          <div
            tabindex="0"
            class="icon employee__reloadbtn"
            :data-title="MISAResource.DataTile.ReloadBtn[getLanguage]"
            @click="reloadData"
            @keydown.enter="reloadData"
          ></div>
          <!-- nút xuất khẩu toàn bộ danh sách tùy chỉnh không theo MButton -->
          <div
            tabindex="0"
            class="icon employee__exportbtn"
            :data-title="MISAResource.DataTile.ExcelBtn[getLanguage]"
            @click="exportToExcel"
            @keydown.enter="exportToExcel"
          ></div>
        </div>
      </div>
      <!-- employee table gồm bảng danh sách nhân viên, các cột được liệt kê luôn ở đây -->
      <EmployeeTable
        @delete-employee="toggleAskWarningPopUp"
        @show-form="showForm"
        class="table__container"
        :employeeList="employeeList"
        :toggleShowLoading="isShowLoading"
        :theadList="[
          {
            align: 'left',
            propName: 'employeeCode',
            width: '150',
            name: MISAResource.TableColumn.EmployeeCode[getLanguage],
          },
          {
            align: 'left',
            propName: 'fullName',
            width: '200',
            name: MISAResource.TableColumn.FullName[getLanguage],
          },
          {
            align: 'left',
            propName: 'gender',
            width: '110',
            name: MISAResource.TableColumn.Gender[getLanguage],
            formatGender: true,
          },
          {
            align: 'center',
            propName: 'dateOfBirth',
            width: '130',
            name: MISAResource.TableColumn.DateOfBirth[getLanguage],
            formatDate: true,
          },
          {
            align: 'left',
            propName: 'identityCard',
            width: '200',
            name: MISAResource.TableColumn.IdentityCardNumber[getLanguage],
            formatRight: true,
          },
          {
            align: 'left',
            propName: 'positionName',
            width: '200',
            name: MISAResource.TableColumn.PositionName[getLanguage],
          },
          {
            align: 'left',
            propName: 'departmentName',
            width: '250',
            name: MISAResource.TableColumn.DepartmentName[getLanguage],
          },
          {
            align: 'left',
            propName: 'bankAccount',
            width: '200',
            name: MISAResource.TableColumn.BankAccount[getLanguage],
            formatRight: true,
          },
          {
            align: 'left',
            propName: 'bankName',
            width: '250',
            name: MISAResource.TableColumn.BankName[getLanguage],
          },
          {
            align: 'left',
            propName: 'bankBranch',
            width: '250',
            name: MISAResource.TableColumn.BankBranch[getLanguage],
          },
        ]"
      />
      <!-- phần điều hướng sang trang khác -->
      <EmployeePage
        :totalRecords="getTotalRecords"
        :totalPage="getTotalPage"
        :currentPage="getCurrentpage"
        @change-size="changeSize"
      />
    </div>
    <!-- phần form thêm và sửa người dùng -->
    <EmployeeForm
      v-if="isFormShow"
      @hide-form="toggleAskPopUp"
      @hide-all="hideFormAndAsk"
      @warning-duplicate="toggleWarningPopup"
      @alert-popup="toggleAlertPopUp"
      @update-table="loadData()"
      @show-toast-message="createToastMessage"
      ref="employeeForm"
    />
    <!-- popup hiện lên khi đóng form, hỏi có muốn lưu không -->
    <MPopup
      :isAsk="isAskShow"
      @hide-popup="toggleAskPopUp"
      @hide-all="hideFormAndAsk"
      @show-toast-message="createToastMessage"
      @save-now="
        toggleAskPopUp();
        saveNow();
      "
      :AskMess="this.MISAResource.PopupMessage.AskChange[getLanguage]"
    />
    <!-- popup hiện lên khi xóa nhân viên, hỏi có muốn xóa không -->
    <MPopup
      :isAskWarning="isAskWarningShow"
      @hide-popup="
        toggleAskWarningPopUp();
        clearDeleteInfo();
      "
      @re-load="loadData"
      @show-toast-message="createToastMessage"
      :AskWarningMess="
        deleteName !== undefined
          ? this.MISAResource.PopupMessage.AskDeleteOne[getLanguage]
          : this.MISAResource.PopupMessage.AskDeleteMany[getLanguage]
      "
      :AskWarningName="deleteName"
      @delete-now="
        deleteName !== undefined ? deleteOneAction() : deleteManyAction()
      "
    />
    <!-- popup hiện lên khi trùng Id nhân viên -->
    <MPopup
      :isWarning="isWarningShow"
      @hide-popup="toggleWarningPopup"
      :WarningMess="WarningMess"
    />
    <!-- popup hiện lên khi điền điều các thông tin bắt buộc -->
    <MPopup
      :isAlert="isAlertShow"
      @hide-popup="toggleAlertPopUp"
      :AlertMess="AlertMess"
    />
    <!-- toast message thông báo -->
    <MToastMessage
      v-if="toggleToast"
      :language="getLanguage"
      :toastType="toastType"
      :toastText="toastText"
    />

    <!-- Hiện bảng toàn bộ phím tắt dùng trong trang web -->
    <EmployeeKeyMap v-if="isKeyMapShow" @hide-key-map="toggleKeyMapPopup" />
  </div>
</template>
<script>
// các file js thuần chứa dữ liệu cần thiết
import MISAEnum from "../js/enum.js";
import MISAResource from "../js/resource.js";

// các component base
import MInput from "../components/base/MInput.vue";
import MPopup from "../components/base/MPopup.vue";
import MToastMessage from "../components/base/MToastMessage.vue";
import MButton from "../components/base/MButton.vue";

// các component đơn lẻ dùng để tạo nên bố cục của component employeelist này
import EmployeeHeader from "./EmployeeList/EmployeeHeader.vue";
import EmployeeTable from "./EmployeeList/EmployeeTable.vue";
import EmployeePage from "./EmployeeList/EmployeePage.vue";
import EmployeeForm from "./EmployeeList/EmployeeForm.vue";
import EmployeeKeyMap from "./EmployeeList/EmployeeKeyMap.vue";

export default {
  name: "TheEmployee",
  components: {
    MButton,
    MInput,
    MPopup,
    MToastMessage,
    EmployeeHeader,
    EmployeeTable,
    EmployeePage,
    EmployeeForm,
    EmployeeKeyMap,
  },
  data() {
    return {
      MISAEnum,
      MISAResource,
      employeeList: [],
      isAlertShow: false,
      isAskWarningShow: false,
      isAskShow: false,
      isWarningShow: false,
      isFormShow: false,
      isShowLoading: false,
      isAutoActionBoxShow: false,
      isAutoActionShow: false,
      isKeyMapShow: false,
      apiTable: "",
      askChangeText: "",
      askDeleteOneText: "",
      askDeleteManyText: "",
      WarningMess: "",
      AlertMess: "",
      searchValue: "",
    };
  },
  beforeMount() {
    // chèn thông tin từ enum vào
    this.apiTable = this.MISAEnum.API.GETEMPLOYEEFILTER;
    // tải table data
    this.loadData();
  },
  /**
   * Mặc định lúc mounted sẽ thực hiện các hành động phím tắt dạng global
   * và sẽ focus luôn vào ô tìm kiếm
   * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
   */
  mounted() {
    // focus mặc định vào ô tìm kiếm
    this.focusInputSearch();
    // thêm global keyup, dùng để lắng nghe các sự kiện phím tắt hàng loạt ở mọi component trong trang web
    window.addEventListener("keyup", this.checkKeyUp);
  },
  /**
   *  lấy các state từ trong store, để watch theo dõi và rerender
   * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
   */
  computed: {
    /**
     * Hàng loạt các hàm bên dưới dùng để lấy ra giá trị hiện tại của từng data có lưu trong state management
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    tableInfo() {
      return [
        this.$store.state.pageSize,
        this.$store.state.pageNumber,
        this.$store.state.keyword,
      ];
    },
    deleteName() {
      return this.$store.state.deleteName;
    },
    deleteId() {
      return this.$store.state.deleteId;
    },
    getTotalRecords() {
      return this.$store.state.totalRecords;
    },
    getTotalPage() {
      return this.$store.state.totalPage;
    },
    getCurrentpage() {
      return this.$store.state.currentPage;
    },
    toggleToast() {
      return this.$store.state.toggleToast;
    },
    toastType() {
      return this.$store.state.toastType;
    },
    toastText() {
      return this.$store.state.toastText;
    },
    getLanguage() {
      return this.$store.state.language;
    },
    countSelectedIDs() {
      return this.$store.state.selectedIDs.length;
    },
  },
  /**
   * Lắng nghe các data thay đổi, computed thì chạy vào trong watch
   * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
   */
  watch: {
    /**
     * Bất cứ khi nào các data ở trong computed trả về như số trang, số bản ghi 1 trang
     * hay từ khóa tìm kiếm thay đổi thì tiến hành load lại data
     * Author: Tô Nguyễn Đức Mạnh (10/10/2022)
     */
    tableInfo() {
      this.loadData();
    },
    /**
     * Lắng nghe xem data trong state management có chứa 1 cái ID nào không,
     * bất kỳ lúc nào có ID thì cần hiện nút thao tác hàng loạt lên, không có thì ẩn đi
     * Author: Tô Nguyễn Đức Mạnh (10/10/2022)
     */
    countSelectedIDs() {
      let selectLength = this.$store.state.selectedIDs.length;
      if (selectLength > 0) {
        this.isAutoActionBoxShow = true;
      } else {
        this.isAutoActionBoxShow = false;
      }
    },
  },
  /**
   * khi mà component bị unmount thì phải trả về giá trị gốc của data
   * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
   */
  unmounted() {
    try {
      // đặt số bản ghi trên trang về mặc định là 10, đứng ở trang thứ 1 và từ khóa tìm kiếm là rỗng
      this.$store.dispatch("changeCurrentPage", 1);
      this.$store.dispatch("changeFilter", "");
      this.$store.dispatch("changeSize", 10);
      // xóa bỏ global keydown
      window.removeEventListener("keyup", this.checkKeyUp);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /**
     * Tạo ra 1 toastmessage
     * @param toastType: loại toast message
     * @param toastText: đoạn văn bản muốn hiển thị
     * Author: Tô Nguyễn Đức Mạnh (06/10/2022)
     */
    createToastMessage(toastType, toastText) {
      try {
        // đẩy các giá trị như loại thông báo, văn bản thông báo, trạng thái thông báo lên trên store của state management
        this.$store.dispatch("changeToastType", toastType);
        this.$store.dispatch("changeToastText", toastText[this.getLanguage]);
        this.$store.dispatch("toggleToast", true);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm có tác dụng lấy dữ liệu của bảng table
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    loadData() {
      try {
        // api mặc định
        let apiFetch = this.createFormQuery();
        // hiện loading
        this.isShowLoading = true;
        // tiến hành lấy dữ liệu từ trên server về
        fetch(apiFetch, { method: this.MISAEnum.method.GET })
          .then((res) => {
            if (res.status == 200) {
              return res.json();
            } else {
              // hiện toast mesage báo lỗi lên
              this.showLoadDataFail();
            }
          })
          .then((res) => {
            // tiến hành lấy ra data từ res vào trong store state management
            if (res !== undefined && res !== "") {
              this.changeFilterPaging(
                res["data"],
                res["totalRecord"],
                res["totalPage"],
                res["currentPage"]
              );
            } else {
              this.changeFilterPaging([], 0, 1, 1);
            }
          })
          .then(() => {
            // tạm ngừng khoảng 0.3 giây để nhìn thấy loading rõ hơn
            setTimeout(() => {
              this.isShowLoading = false;
            }, 300);
          })
          .catch(() => {
            // hiện toast mesage báo lỗi lên
            this.showLoadDataFail();
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tải lại trang và hiện thông báo tải lại thành công
     *Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    reloadData() {
      try {
        this.loadData();
        // hiện toast mesage lên
        this.createToastMessage(
          this.MISAEnum.toasttype.NOTI,
          this.MISAResource.ToastMessage.ReloadedNoti
        );
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tạo ra chuỗi query sau địa chỉ api
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    createFormQuery() {
      try {
        // lấy ra các dữ liệu có trong store về từ khóa tìm kiếm, số trang, số bản ghi 1 trang để tiến hành load data
        let keyword = this.$store.state.keyword;
        let pageSize = this.$store.state.pageSize;
        let pageNumber = this.$store.state.pageNumber;
        // tạo ra 1 mảng các FromQuery cần truyền vào trong api
        let arrFilter = [];
        let result = "";
        if (keyword != null && keyword != "") {
          arrFilter.push(`keyword=${keyword}`);
        }
        if (pageSize != null && pageSize != "") {
          arrFilter.push(`pageSize=${pageSize}`);
        }
        if (pageNumber != null && pageNumber != "") {
          arrFilter.push(`pageNumber=${pageNumber}`);
        }
        // thực hiện join thành 1 chuỗi query
        if (arrFilter.length != 0) {
          result = arrFilter.join("&");
        }
        return `${this.apiTable}?${result}`;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thay đổi FilterPaging
     * @param data: danh sách record
     * @param totalRecord: tổng số bản ghi
     * @param totalPage: tổng số trang
     * @param currentPage: trang hiện tại
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    changeFilterPaging(data, totalRecord, totalPage, currentPage) {
      try {
        this.employeeList = data;
        this.$store.dispatch("changeTotalRecords", totalRecord);
        this.$store.dispatch("changeTotalPage", totalPage);
        this.$store.dispatch("changeCurrentPage", currentPage);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     *Lưu trang ngay khi ấn vào nút lưu trong popup hỏi có muốn lưu không.
     *Author: Tô Nguyễn Đức Mạnh (16/09/2022)
     */
    saveNow() {
      // trigger tới method saveNew nằm trong component EmployeeForm thông qua refs
      this.$refs.employeeForm.handleSave(true);
    },
    /**
     * Focus vào ô nhập đầu tiên trong form nhập liệu nếu đóng popup
     * @param value: Giá trị nhập vào là false tức là popup đóng r
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    returnToFormInput(value) {
      try {
        if (value === false) {
          this.$refs.employeeForm.focusFirstInput();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * chọn số lượng trang và load lại trang với số lượng đó
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    changeSize(value) {
      try {
        this.$store.dispatch("changeSize", value);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * chọn thay đổi giá trị tìm kiếm và load lại trang với số lượng đó
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    changeFilter(value) {
      try {
        this.$store.dispatch("changeFilter", value);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện form thêm mới nhân viên
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    showForm() {
      try {
        this.isFormShow = true;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện dialog khi ấn vào ẩn form đi
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    toggleAskPopUp() {
      try {
        this.isAskShow = !this.isAskShow;
        // focus lại vào ô nhập đầu tiên của form
        this.returnToFormInput(this.isAskShow);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Ẩn cả popup hỏi lưu không và form đi
     */
    hideFormAndAsk() {
      try {
        this.isAskShow = false;
        this.isFormShow = false;
        // focus mặc định vào ô tìm kiếm
        this.focusInputSearch();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện popup hỏi có muốn xóa không
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    toggleAskWarningPopUp(deleteId, deleteName) {
      try {
        // chèn các dữ liệu như ID và tên của trường định xóa lên trên store
        this.$store.dispatch("changeDeleteId", deleteId);
        this.$store.dispatch("changeDeleteName", deleteName);

        // hiển thị popup xóa
        this.isAskWarningShow = !this.isAskWarningShow;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện popup cảnh báo nhập thiếu
     * Author: Tô Nguyễn Đức Mạnh (15/09/2022)
     */
    toggleAlertPopUp(value) {
      try {
        // hiển thị popup
        this.isAlertShow = !this.isAlertShow;
        // focus lại vào ô nhập đầu tiên của form
        this.returnToFormInput(this.isAlertShow);
        // chèn văn bản vào popup xóa
        this.AlertMess = value;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện popup warning trùng ID
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
    toggleWarningPopup(value) {
      try {
        // gọi ra đoạn resource thông báo trùng mã trước employee code
        let textAlert =
          this.MISAResource.ErrorValidate.EmployeeCode[this.getLanguage];
        // gọi ra đoạn resource thông báo trùng mã sau employee code
        let textAlertTwo =
          this.MISAResource.ErrorValidate.IsExisted[this.getLanguage];
        // tạo ra đoạn chuỗi văn bản thông báo lỗi
        this.WarningMess = `${textAlert} < ${value} > ${textAlertTwo}`;
        this.isWarningShow = !this.isWarningShow;
        // focus lại vào ô nhập đầu tiên của form
        this.returnToFormInput(this.isWarningShow);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện moreaction menu khi bấm vào thao tác hàng loạt
     * Author: Tô Nguyễn Đức Mạnh (04/10/2022)
     */
    toggleMoreActionMenu() {
      try {
        this.isAutoActionShow = !this.isAutoActionShow;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * ẩn action menu khi bấm ra ngoài
     * Author: Tô Nguyễn Đức Mạnh (04/10/2022)
     */
    hideMoreActionMenu() {
      try {
        this.isAutoActionShow = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xóa 1 người nhân viên trong bảng
     * Author: Tô Nguyễn Đức Mạnh (06/10/2022)
     */
    deleteOneAction() {
      try {
        // gọi api xóa đi
        let apiDelete = `${this.MISAEnum.API.GETEMPLOYEELIST}/${this.deleteId}`;
        let fetchObjectHeader = { method: "DELETE" };
        this.handleDelete(apiDelete, fetchObjectHeader, "One");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Method xóa nhiều nhân viên trong 1 bảng
     * Author: Tô Nguyễn Đức Mạnh (06/10/2022)
     */
    deleteManyAction() {
      try {
        let apiDelete = this.MISAEnum.API.DELETEMANYEMPLOYEES;
        let deleteList = this.$store.state.selectedIDs;
        let fetchObjectHeader = {
          method: this.MISAEnum.method.POST,
          headers: {
            "Content-Type": this.MISAEnum.APIHEADER.APPJSON,
          },
          body: JSON.stringify(deleteList),
        };
        this.handleDelete(apiDelete, fetchObjectHeader, "Many");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm xử lý xóa 1 hoặc xóa nhiều
     * @param api: api để thực hiện xóa
     * @param objectHeader: object gồm method và header, contentype
     * @param isMany: "One" hoặc "Many"
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    handleDelete(api, objectHeader, isMany) {
      try {
        fetch(api, objectHeader)
          .then((res) => {
            if (res.status === 200) {
              this.loadData();
              if (isMany) {
                this.clearDeleteInfo();
              }
              // hiện toast mesage lên
              this.createToastMessage(
                this.MISAEnum.toasttype.SUCCESS,
                this.MISAResource.ToastMessage.DeleteNoti[isMany]
              );
            } else {
              // hiện thông báo xóa 1 record thất bại
              this.createToastMessage(
                this.MISAEnum.toasttype.ERROR,
                this.MISAResource.ToastMessage.DeleteNotiError[isMany]
              );
            }
          })
          .catch((res) => {
            // hiện thông báo xóa 1 record thất bại
            this.createToastMessage(
              this.MISAEnum.toasttype.ERROR,
              this.MISAResource.ToastMessage.DeleteNotiError[isMany]
            );
            console.log(res);
          })
          .finally(() => {
            // ẩn popup xóa đi
            this.toggleAskWarningPopUp();
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xóa các giá trị cần xóa trong store đi sau khi hủy
     * Author: Tô Nguyễn Đức Mạnh (06/10/2022)
     */
    clearDeleteInfo() {
      try {
        this.$store.dispatch("changeSelectedIDs", []);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xuất toàn bộ danh sách ra file excell
     * Author: Tô Nguyễn Đức Mạnh (07/10/2022)
     */
    exportToExcel() {
      try {
        let apiExport = this.MISAEnum.API.EXPORTEMPLOYEES;
        fetch(apiExport, {
          method: this.MISAEnum.method.GET,
          headers: {
            "Content-Type": this.MISAEnum.APIHEADER.APPEXCEL,
          },
        })
          .then((res) => {
            if (res.status === 200) {
              return res.blob();
            } else {
              // hiện thông báo xuất khẩu thất bại
              this.createToastMessage(
                this.MISAEnum.toasttype.ERROR,
                this.MISAResource.ToastMessage.ErrorExportExcelNoti
              );
            }
          })
          .then((blob) => {
            // tạo file excell để xuất khẩu
            this.handleExcelPopup(blob);
          })
          .catch((res) => {
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * xử lý việc hiện popup hỏi lưu file excell
     * @param blob : file excell cần lưu
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    handleExcelPopup(blob) {
      try {
        if (blob) {
          // tạo ra 1 popup hỏi lưu file tải về
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          // đặt tên cho file excel tải về
          a.download =
            this.MISAResource.ExportExcel.FileExportName[this.getLanguage];
          // tạo ra 1 element trong dom để có thể thực hiện thao tác tải về
          // trên trình duyệt firefox
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Ẩn hiện popup danh sách phím tắt
     * Author: Tô Nguyễn Đức Mạnh (09/10/2022)
     */
    toggleKeyMapPopup() {
      try {
        this.isKeyMapShow = !this.isKeyMapShow;
        // ẩn keymap popup thì focus vào lại ô input
        if (this.isKeyMapShow === false) {
          this.focusInputSearch();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Thay đổi ngôn ngữ
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    changeLanguage() {
      try {
        let currentLang = this.$store.state.language;

        // kiểm tra xem ngôn ngữ hiện tại có phải tiếng việt không
        // nếu không phải tiếng việt thì chuyển về tiếng việt và ngược lại
        if (currentLang == this.MISAEnum.languageList.VI) {
          this.$store.dispatch("changeLanguage", this.MISAEnum.languageList.EN);
        } else {
          this.$store.dispatch("changeLanguage", this.MISAEnum.languageList.VI);
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * focus vào ô tìm kiếm
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    focusInputSearch() {
      try {
        this.$refs.inputSearch.$el.children[0].children[0].focus();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * hiện toast message thông báo loading data lỗi
     * Author: Tô Nguyễn Đức Mạnh (13/10/2022)
     */
    showLoadDataFail() {
      try {
        this.createToastMessage(
          this.MISAEnum.toasttype.ERROR,
          this.MISAResource.ToastMessage.LoadDataFail
        );
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Kiểm tra các phím được nhấn
     * Author: Tô Nguyễn Đức Mạnh (09/10/2022)
     */
    checkKeyUp() {
      try {
        // nếu là ấn phím ctrl và phím gạch chéo
        if (event.ctrlKey && event.which === this.MISAEnum.keycode.SLASH) {
          this.toggleKeyMapPopup();
        }
        // nếu là ấn phím alt + phím L thì đổi ngôn ngữ
        if (event.altKey && event.which === this.MISAEnum.keycode.L) {
          this.changeLanguage();
        }
        // nếu là ấn ESC thì đóng các loại popup
        if (event.which === this.MISAEnum.keycode.ESC) {
          this.isKeyMapShow = false;
        }
        // nếu là ấn ctrl và F3 thì sẽ focus vào ô tìm kiếm
        if (event.ctrlKey && event.which === this.MISAEnum.keycode.F3) {
          this.focusInputSearch();
        }
        // nếu là ấn alt + R thì sẽ load lại danh sách
        if (event.altKey && event.which === this.MISAEnum.keycode.R) {
          this.reloadData();
        }
        // nếu là ấn ctrl + Q thì sẽ xuất khẩu ra file excel
        if (event.ctrlKey && event.which === this.MISAEnum.keycode.Q) {
          this.exportToExcel();
        }
        // nếu là ấn ctrl + left thì sẽ chuyển qua trang danh sách trước
        if (event.ctrlKey && event.which === this.MISAEnum.keycode.LEFT) {
          this.$store.dispatch("movePrevPage");
        }
        // nếu là ấn ctrl + right thì sẽ chuyển qua trang tiếp theo
        if (event.ctrlKey && event.which === this.MISAEnum.keycode.RIGHT) {
          this.$store.dispatch("moveNextPage");
        }
        // nếu là ấn phím insert thì hiện form thêm mới
        if (event.which === this.MISAEnum.keycode.INSERT) {
          this.$store.dispatch("changeMethod", "POST");
          this.showForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.employee {
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.employee .employee__bottom {
  box-sizing: border-box;
  background-color: var(--ColorBackgroundWhite);
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-employee: space-between;
  width: 100%;
  height: 100%;
  row-gap: 16px;
}

.employee .employee__bottom .employee__menu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.employee .employee__bottom .employee__menu .employee__container--left {
  position: relative;
}

.employee .employee__bottom .employee__menu .employee__menuleft {
  cursor: pointer;
  border-radius: 25px;
  border: 2px solid var(--ColorPrimaryText);
  padding-right: 40px;
  box-sizing: border-box;
  position: relative;
  z-index: 4;
}
.employee .employee__bottom .employee__menu .employee__menuleft:hover {
}
.employee .employee__bottom .employee__menu .employee__menuleft::before {
  position: absolute;
  content: "";
  background-image: url(@/assets/img/Sprites.64af8f61.svg);
  background-position: -368px -360px;
  background-repeat: no-repeat;
  width: 14px;
  height: 14px;
  scale: 80%;
  right: 18px;
}

.employee .employee__bottom .employee__menu .employee__deletecontext {
  position: absolute;
  background-color: var(--ColorBackgroundWhite);
  min-width: 100px;
  height: 40px;
  z-index: 3;
  cursor: pointer;
  display: flex;
  padding-left: 8px;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0px 1px 6px -2px rgb(165, 165, 165);
  right: 10px;
  top: calc(100% + 4px);
}

.employee .employee__bottom .employee__menu .employee__deletecontext:hover {
  background-color: var(--ColorBackground);
  color: var(--LightGreen500);
}

.employee .employee__bottom .employee__menu .employee__deletecontext:active {
  background-color: var(--ColorPrimaryTextWhite);
}

.employee .employee__bottom .employee__menu .employee__menuleft--show {
  opacity: 100%;
}

.employee .employee__bottom .employee__menu .employee__menuright {
  display: flex;
  align-items: center;
  column-gap: 16px;
}

.employee
  .employee__bottom
  .employee__menu
  .employee__menuright
  .employee__search {
  width: 300px;
}

.employee
  .employee__bottom
  .employee__menu
  .employee__menuright
  .employee__search
  .employee__searchicon {
  margin-top: -5px;
}

.employee
  .employee__bottom
  .employee__menu
  .employee__menuright
  .employee__reloadbtn::before {
  background-position: -1096px -88px;
}

.employee
  .employee__bottom
  .employee__menu
  .employee__menuright
  .employee__exportbtn {
  margin-left: 3px;
}

.employee
  .employee__bottom
  .employee__menu
  .employee__menuright
  .employee__exportbtn::before {
  background-position: -704px -200px;
}

.employee .employee__bottom .page__navi .combobox .combobox__drop::before {
  background-image: url(../../assets/img/Sprites.64af8f61.svg);
  background-position: -560px -360px;
  transform: rotate(180deg);
}

.employee .employee__bottom .page__navi .combobox .combobox__data {
  top: unset;
  bottom: 100%;
}
</style>
