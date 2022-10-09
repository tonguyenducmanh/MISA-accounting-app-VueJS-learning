<template lang="">
  <div class="employee" @keydown="checkKeyDown">
    <!-- Employee header gồm ô nhập liệu, nút tìm kiếm và nút reload -->
    <EmployeeHeader @show-form="showForm" />
    <div class="employee__bottom">
      <div class="employee__menu">
        <div v-if="isAutoActionBoxShow" class="employee__container--left">
          <MButton
            class="employee__menuleft"
            :buttonName="MISAResource.ButtonText.MultiActionBtn[language]"
            :buttonTwo="true"
            @click="toggleMoreActionMenu"
            v-click-out="hideMoreActionMenu"
          />
          <div
            v-if="isAutoActionShow"
            class="employee__deletecontext"
            @click="toggleAskWarningPopUp"
          >
            {{ this.MISAResource.ButtonText.DeleteBtn[language] }}
          </div>
        </div>
        <!-- element dưới dùng v-else để thay thế element employee__menu--left trên
        khi mà không có nó trong DOM thì vẫn cần 1 element giả để có thể dùng display flex và justify-content space between
        thì mới có thể làm employee__menuright nằm về bên phải của trang web được
         -->
        <div v-else></div>
        <div class="employee__menuright">
          <MInput
            :hasItalic="true"
            :hasIcon="true"
            idInput="input__search"
            :iconTitle="MISAResource.DataTile.InputSearch[language]"
            :showTitle="true"
            :placeHolder="MISAResource.PlaceHolder.Search[language]"
            @change-filter="changeFilter"
            ref="inputSearch"
            v-model="searchValue"
            :timeDelay="500"
          />
          <div
            tabindex="0"
            class="icon employee__reloadbtn"
            :data-title="MISAResource.DataTile.ReloadBtn[language]"
            @click="reloadData"
            @keydown.enter="reloadData"
          ></div>
          <div
            tabindex="0"
            class="icon employee__exportbtn"
            :data-title="MISAResource.DataTile.ExcelBtn[language]"
            @click="exportToExcel"
            @keydown.enter="exportToExcel"
          ></div>
        </div>
      </div>
      <!-- employee table gồm bảng danh sách nhân viên -->
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
            name: MISAResource.TableColumn.EmployeeCode[language],
          },
          {
            align: 'left',
            propName: 'fullName',
            width: '200',
            name: MISAResource.TableColumn.FullName[language],
          },
          {
            align: 'left',
            propName: 'gender',
            width: '110',
            name: MISAResource.TableColumn.Gender[language],
            formatGender: true,
          },
          {
            align: 'center',
            propName: 'dateOfBirth',
            width: '130',
            name: MISAResource.TableColumn.DateOfBirth[language],
            formatDate: true,
          },
          {
            align: 'right',
            propName: 'identityCard',
            width: '200',
            name: MISAResource.TableColumn.IdentityCardNumber[language],
            formatRight: true,
          },
          {
            align: 'left',
            propName: 'positionName',
            width: '200',
            name: MISAResource.TableColumn.PositionName[language],
          },
          {
            align: 'left',
            propName: 'departmentName',
            width: '250',
            name: MISAResource.TableColumn.DepartmentName[language],
          },
          {
            align: 'right',
            propName: 'bankAccount',
            width: '200',
            name: MISAResource.TableColumn.BankAccount[language],
            formatRight: true,
          },
          {
            align: 'left',
            propName: 'bankName',
            width: '250',
            name: MISAResource.TableColumn.BankName[language],
          },
          {
            align: 'left',
            propName: 'bankBranch',
            width: '250',
            name: MISAResource.TableColumn.BankBranch[language],
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
      :AskMess="askChangeText"
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
        deleteName !== undefined ? askDeleteOneText : askDeleteManyText
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
      :language="language"
      :toastType="toastType"
      :toastText="toastText"
    />

    <!-- Hiện bảng toàn bộ phím tắt dùng trong trang web -->
    <EmployeeKeyMap v-if="isKeyMapShow" />
  </div>
</template>
<script>
import MISAEnum from "../js/enum.js";
import MISAResource from "../js/resource.js";
// import componnent base
import MInput from "../components/base/MInput.vue";
import MPopup from "../components/base/MPopup.vue";
import MToastMessage from "../components/base/MToastMessage.vue";
import MButton from "../components/base/MButton.vue";

// import component fragment
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
      language: "",
    };
  },
  beforeMount() {
    // chèn thông tin từ enum vào
    this.apiTable = this.MISAEnum.API.GETEMPLOYEEFILTER;
    this.language = this.$store.state.language;
    this.askChangeText =
      this.MISAResource.PopupMessage.AskChange[this.language];
    this.askDeleteOneText =
      this.MISAResource.PopupMessage.AskDeleteOne[this.language];
    this.askDeleteManyText =
      this.MISAResource.PopupMessage.AskDeleteMany[this.language];
    // tải table data
    this.loadData();
  },
  /**
   * mặc định lúc mounted sẽ focus vào ô tìm kiếm
   */
  mounted() {
    this.$refs.inputSearch.$el.children[0].children[0].focus();
  },
  /**
   *  lấy các state từ trong store, để watch theo dõi và rerender
   * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
   */
  computed: {
    tableInfo() {
      return [
        this.$store.state.pageSize,
        this.$store.state.pageNumber,
        this.$store.state.searchFilter,
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
    /**
     * Lấy state ẩn hiện thông báo
     * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
     */
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
   * Bất cứ khi nào pageSize, searchFilter thay đổi thì load lại trang
   * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
   */
  watch: {
    tableInfo() {
      this.loadData();
    },
    countSelectedIDs() {
      let selectLength = this.$store.state.selectedIDs.length;
      if (selectLength > 0) {
        this.isAutoActionBoxShow = true;
      } else {
        this.isAutoActionBoxShow = false;
      }
    },
    /**
     * Lấy ra giá trị của ngôn ngữ hiện tại
     * Author: Tô Nguyễn Đức Mạnh (08/10/2022)
     */
    getLanguage() {
      this.language = this.$store.state.language;
      this.askChangeText =
        this.MISAResource.PopupMessage.AskChange[this.language];
      this.askDeleteOneText =
        this.MISAResource.PopupMessage.AskDeleteOne[this.language];
      this.askDeleteManyText =
        this.MISAResource.PopupMessage.AskDeleteMany[this.language];
    },
  },
  /**
   * khi mà component bị unmount thì phải trả về giá trị gốc của data
   * Author: Tô Nguyễn Đức Mạnh (13/09/2022)
   */
  unmounted() {
    try {
      this.$store.dispatch("changeCurrentPage", 1);
      this.$store.dispatch("changeFilter", "");
      this.$store.dispatch("changeSize", 10);
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
        let language = this.$store.state.language;
        this.$store.dispatch("changeToastType", toastType);
        this.$store.dispatch("changeToastText", toastText[language]);
        this.$store.dispatch("toggleToast", true);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lấy ra các prop tương úng và tiến hành fetch api cho vào trong table.
     * Author: Tô Nguyễn Đức Mạnh (12/09/2022)
     */
    loadData() {
      try {
        let searchFilter = this.$store.state.searchFilter;
        let pageSize = this.$store.state.pageSize;
        let pageNumber = this.$store.state.pageNumber;
        let arrFilter = [];
        if (searchFilter != null && searchFilter != "") {
          arrFilter.push(`keyword=${searchFilter}`);
        }
        if (pageSize != null && pageSize != "") {
          arrFilter.push(`pageSize=${pageSize}`);
        }
        if (pageNumber != null && pageNumber != "") {
          arrFilter.push(`pageNumber=${pageNumber}`);
        }
        // api mặc định
        let apiFetch = this.apiTable;
        // tạo ra api mới dựa trên các giá trị filter
        if (arrFilter.length != 0) {
          apiFetch = `${apiFetch}?${arrFilter.join("&")}`;
        }
        // hiện loading
        this.isShowLoading = true;
        fetch(apiFetch, { method: this.MISAEnum.method.GET })
          .then((res) => {
            if (res.status == 200) {
              return res.json();
            }
          })
          .then((res) => {
            if (res !== undefined && res !== "") {
              this.employeeList = res["data"];
              this.$store.dispatch("changeTotalRecords", res["totalRecord"]);
              this.$store.dispatch("changeTotalPage", res["totalPage"]);
              this.$store.dispatch("changeCurrentPage", res["currentPage"]);
            } else {
              this.employeeList = [];
              this.$store.dispatch("changeTotalRecords", 0);
              this.$store.dispatch("changeTotalPage", 1);
              this.$store.dispatch("changeCurrentPage", 1);
            }
          })
          .then(() => {
            this.isShowLoading = false;
          })
          .catch((res) => {
            console.log(res);
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
     *Lưu trang ngay khi ấn vào nút lưu trong popup hỏi có muốn lưu không.
     *Author: Tô Nguyễn Đức Mạnh (16/09/2022)
     */
    saveNow() {
      // trigger tới method saveNew nằm trong component EmployeeForm thông qua refs
      this.$refs.employeeForm.saveNew();
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
        this.$store.dispatch("changeDeleteId", deleteId);
        this.$store.dispatch("changeDeleteName", deleteName);
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
        this.isAlertShow = !this.isAlertShow;

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
        // gọi ra văn bản validate
        let textAlert =
          this.MISAResource.ErrorValidate.EmployeeCode[this.language];
        let textAlertTwo =
          this.MISAResource.ErrorValidate.IsExisted[this.language];
        this.WarningMess = `${textAlert} < ${value} > ${textAlertTwo}`;
        this.isWarningShow = !this.isWarningShow;
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
        fetch(apiDelete, { method: "DELETE" })
          .then((res) => res.json())
          .then(() => {
            // ẩn popup xóa đi
            this.toggleAskWarningPopUp();
            this.loadData();
            // hiện toast mesage lên
            this.createToastMessage(
              this.MISAEnum.toasttype.SUCCESS,
              this.MISAResource.ToastMessage.DeleteNoti
            );
            // ẩn đi sau 3 giây
          })
          .catch((res) => {
            console.log(res);
          });
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
        let apiFetch = this.MISAEnum.API.DELETEMANYEMPLOYEES;
        let deleteList = this.$store.state.selectedIDs;
        // ẩn popup xóa đi
        this.toggleAskWarningPopUp();

        // gọi tới be để xóa danh sách nhân viên
        fetch(apiFetch, {
          method: this.MISAEnum.method.POST,
          headers: {
            "Content-Type": this.MISAEnum.APIHEADER.APPJSON,
          },
          body: JSON.stringify(deleteList),
        })
          .then((res) => {
            // nếu xóa thành công thì xóa IDs cần xóa đi, load lại table
            if (res.status === 200) {
              // xóa danh sách cần xóa đi
              this.$store.dispatch("changeSelectedIDs", []);

              // hiện thông báo xóa nhiều thành công
              this.createToastMessage(
                this.MISAEnum.toasttype.SUCCESS,
                this.MISAResource.ToastMessage.DeleteManyNoti
              );
              // load lại danh sách
              this.loadData();
            } else {
              console.log(res);

              // hiện thông báo xóa nhiều thất bại
              this.createToastMessage(
                this.MISAEnum.toasttype.ERROR,
                this.MISAResource.ToastMessage.DeleteManyNotiError
              );
            }
          })
          .catch((error) => {
            console.error("Error:", error);
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
            }
          })
          .then((blob) => {
            if (blob) {
              var url = window.URL.createObjectURL(blob);
              var a = document.createElement("a");
              a.href = url;
              let language = this.$store.state.language;
              a.download =
                this.MISAResource.ExportExcel.FileExportName[language];
              document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
              a.click();
              a.remove(); //afterwards we remove the element again
            }
          })
          .catch((res) => {
            console.log(res);
          });
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
        if (currentLang == "VI") {
          this.$store.dispatch("changeLanguage", "EN");
        } else {
          this.$store.dispatch("changeLanguage", "VI");
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Kiểm tra các phím được nhấn
     * Author: Tô Nguyễn Đức Mạnh (09/10/2022)
     */
    checkKeyDown() {
      try {
        // nếu là ấn phím ctrl và phím gạch chéo
        if (event.ctrlKey && event.which === this.MISAEnum.keycode.SLASH) {
          this.toggleKeyMapPopup();
        }
        // nếu là ấn phím ctrl + phím L thì đổi ngôn ngữ
        if (event.ctrlKey && event.which === this.MISAEnum.keycode.L) {
          event.preventDefault();
          this.changeLanguage();
        }
        // nếu là ấn ESC thì đóng các loại popup
        if (event.which === this.MISAEnum.keycode.ESC) {
          this.isKeyMapShow = false;
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
