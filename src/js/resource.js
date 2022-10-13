var MISAResource = {
  // Tên tài khoản
  AccountName: {
    VI: "Tô Nguyễn Đức Mạnh",
    EN: "To Nguyen Duc Manh",
  },
  // Các đoạn văn bản liên quan tới báo lỗi xác thực dữ liệu
  ErrorValidate: {
    employeeCodeNotEmpty: {
      VI: "Mã nhân viên không được phép để trống.",
      EN: "Employee code is not empty.",
    },
    EmployeeCodeIsDuplicated: {
      VI: "Mã nhân viên đã tồn tại.",
      EN: "Employee code is duplicated.",
    },
    fullNameNotEmpty: {
      VI: "Tên không được phép để trống.",
      EN: "Employee name is not empty.",
    },
    departmentNameNotEmpty: {
      VI: "Đơn vị không được phép để trống.",
      EN: "Department name is not empty.",
    },
    EmployeeCode: {
      VI: "Mã nhân viên",
      EN: "Employee code",
    },
    IsExisted: {
      VI: "đã tồn tại trong hệ thống, vui lòng kiểm tra lại.",
      EN: "is existed in system, please try to insert another Id.",
    },
  },
  // Các đoạn văn bản liên quan tới thông báo ở góc dưới màn hình
  ToastMessage: {
    Success: {
      VI: "Thành công!",
      EN: "Successfull!",
    },
    Error: {
      VI: "Lỗi!",
      EN: "Error!",
    },
    Warning: {
      VI: "Cảnh báo!",
      EN: "Warning!",
    },
    Noti: {
      VI: "Thông tin!",
      EN: "Information!",
    },
    ErrorClient: {
      VI: "Dữ liệu gửi đi bị lỗi, vui lòng kiểm tra lại.",
      EN: "Data sending is error, please check again.",
    },
    ErrorServer: {
      VI: "Có lỗi xảy ra bên phía server.",
      EN: "Has error in server side.",
    },
    ErrorCommon: {
      VI: "Có lỗi xảy ra, vui lòng kiểm tra lại,",
      EN: "Has error when do this action.",
    },
    LoadDataFail: {
      VI: "Có lỗi khi hiển thị dữ liệu từ server.",
      EN: "Has error when try to display data from table.",
    },
    DeleteNoti: {
      One: {
        VI: "Đã xóa nhân viên khỏi bảng.",
        EN: "The employee is deleted from table.",
      },
      Many: {
        VI: "Đã xóa những nhân viên vừa chọn khỏi bảng.",
        EN: "The employees are deleted from table.",
      },
    },
    DeleteNotiError: {
      One: {
        VI: "Thao tác xóa 1 bản ghi thất bại.",
        EN: "Delete one record action is failure.",
      },
      Many: {
        VI: "Thao tác xóa nhiều thất bại.",
        EN: "Delete many action is failure.",
      },
    },
    AddedNoti: {
      VI: "Đã thêm nhân viên mới vào bảng.",
      EN: "The employee is added to table.",
    },
    EditedNoti: {
      VI: "Đã sửa nhân viên thành công.",
      EN: "The employee in this table is edited.",
    },
    DuplicatedNoti: {
      VI: "Đã nhân bản nhân viên hiện tại.",
      EN: "THe employee is duplicated to table.",
    },
    ReloadedNoti: {
      VI: "Đã tải lại danh sách.",
      EN: "The table is refreshed.",
    },
    CanceledNoti: {
      VI: "Thao tác đã bị hủy.",
      EN: "This action is canceled.",
    },
    ExportExcelNoti: {
      VI: "Xuất khẩu danh sách nhân viên thành công.",
      EN: "The employeelist is succesfully exported.",
    },
    CancelExportExcelNoti: {
      VI: "Đã hủy thao tác xuất khẩu danh sách nhân viên.",
      EN: "Export employee list action was canceled.",
    },
    ErrorExportExcelNoti: {
      VI: "Thao tác xuất khẩu bị lỗi, vui lòng liên hệ quản trị viên.",
      EN: "Export action was failed, please contact administrator.",
    },
  },
  // Các đoạn văn bản thông báo dạng popup hiển thị ở trung tâm màn hình
  PopupMessage: {
    AskChange: {
      VI: "Dữ liệu đã được thay đổi, bạn có muốn cất không ?",
      EN: "Data is changed, do you want to save this ?",
    },
    AskDeleteOne: {
      VI: "Bạn có thực sự muốn xóa nhân viên {0} không?",
      EN: "Do you really want to delete {0} employee?",
    },
    AskDeleteMany: {
      VI: "Bạn có thực sự muốn xóa những nhân viên đã chọn không?",
      EN: "Do you really want to delete all selected employees?",
    },
  },
  // Các đoạn văn bản liên quan tới việc export excell
  ExportExcel: {
    FileExportName: {
      VI: "Danh_sach_nhan_vien.xlsx",
      EN: "Employee_list.xlsx",
    },
  },
  // Các đoan tooltip hiển thị khi di chuột vào 1 thành phần nào đó trong trang web
  DataTile: {
    MobiphoneNumber: {
      VI: "Điện thoại di động",
      EN: "Mobiphone",
    },
    TelephoneNumber: {
      VI: "Điện thoại cố dịnh",
      EN: "Telephone",
    },
    IdentityCardNumber: {
      VI: "Số chứng minh nhân dân",
      EN: "Identity card number",
    },
    HeaderName: {
      VI: "Công ty TNHH Sản xuất - Thương mại - Dịch vụ qui phúc",
      EN: "Qui Phuc Production - Commercial - Service Company",
    },
    HeaderNotiIcon: {
      VI: "Thông báo",
      EN: "Notification",
    },
    HeaderMenuBtn: {
      VI: "Ẩn hiện menu",
      EN: "Toggle menu",
    },
    GoHome: {
      VI: "Về trang chủ",
      EN: "Home",
    },
    ReloadBtn: {
      VI: "Lấy lại dữ liệu. (Alt + R)",
      EN: "Reload data. (Alt + R)",
    },
    ExcelBtn: {
      VI: "Xuất ra file Excel. (Ctrl + Q)",
      EN: "Export to excel. (Ctrl + Q)",
    },
    InputSearch: {
      VI: "Ấn  CTRL + F3 để nhập.",
      EN: "Press  CTRL + F3 to typing.",
    },
    FormFullName: {
      VI: "Tên không được để trống.",
      EN: "Name is not empty.",
    },
    FormDepartmentName: {
      VI: "Đơn vị không được để trống.",
      EN: "Departmentname is not empty.",
    },
    FormDate: {
      VI: "Ngày không được phép lớn hơn ngày hiện tại.",
      EN: "Date must smaller than today.",
    },
    FormNumber: {
      VI: "Chỉ điền các số từ 0-9.",
      EN: "Just typing number 0-9.",
    },
    FormEmail: {
      VI: "Email chưa đúng định dạng.",
      EN: "Email is not correct format.",
    },
    FormCloseBtn: {
      VI: "Đóng (ESC).",
      EN: "Exit (ESC).",
    },
    FormSaveBtn: {
      VI: "Cất (CTRL + F8).",
      EN: "Save (CTRL + F8).",
    },
    FormSaveAndAddBtn: {
      VI: "Cất và thêm (CTRL + SHIFT + F8).",
      EN: "Save and add (CTRL + SHIFT + F8).",
    },
    FormHelp: {
      VI: "Form thêm mới nhân viên, vui lòng điền đầy đủ các mục có dấu *.",
      EN: "Form add new employee, please insert all * element.",
    },
    AddNewBtn: {
      VI: "Nhấn Insert để thêm nhanh.",
      EN: "Press Insert to add employee.",
    },
    ChangeLanguage: {
      VI: "Đổi ngôn ngữ",
      EN: "Change language",
    },
  },
  // Các đoạn văn bản hiển thị ở menu điều hướng trang web tới các trang khác nhau
  RouterName: {
    Accounting: {
      VI: "Kế toán",
      EN: "AMIS",
    },
    Demo: {
      VI: "Tổng quan",
      EN: "Summary",
    },
    Money: {
      VI: "Tiền mặt",
      EN: "Money",
    },
    MoneySend: {
      VI: "Tiền gửi",
      EN: "Money send",
    },
    Buy: {
      VI: "Mua hàng",
      EN: "Buy",
    },
    Sell: {
      VI: "Bán hàng",
      EN: "Sell",
    },
    InvoiceManagement: {
      VI: "Quản lý hóa đơn",
      EN: "Invoice",
    },
    Directory: {
      VI: "Kho",
      EN: "Directory",
    },
    Tool: {
      VI: "Công cụ dụng cụ",
      EN: "Tool",
    },
    FixedAsset: {
      VI: "Tài sản cố định",
      EN: "Fixed Asset",
    },
    Tax: {
      VI: "Thuế",
      EN: "Tax",
    },
    Price: {
      VI: "Giá thành",
      EN: "Price",
    },
    Generic: {
      VI: "Tổng hợp",
      EN: "Generic",
    },
    Budget: {
      VI: "Ngân sách",
      EN: "Budget",
    },
    Report: {
      VI: "Báo cáo",
      EN: "Report",
    },
    FinancialAnalysis: {
      VI: "Phân tích tài chính",
      EN: "Financial Analysis",
    },
  },
  // Các đoạn nhãn văn bản hiển thị nội dung của thành phần
  LabelText: {
    IsCustomer: {
      VI: "Là khách hàng",
      EN: "Is customer",
    },
    IsProvider: {
      VI: "Là nhà cung cấp",
      EN: "Is provider",
    },
    FormCode: {
      VI: "Mã",
      EN: "Code",
    },
    FormName: {
      VI: "Tên",
      EN: "Name",
    },
    FormDepartment: {
      VI: "Đơn vị",
      EN: "Department",
    },
    FormPosition: {
      VI: "Chức danh",
      EN: "Position",
    },
    FormDateOfBirth: {
      VI: "Ngày sinh",
      EN: "Date of birth",
    },
    FormGender: {
      VI: "Giới tính",
      EN: "Gender",
    },
    FormIdentityCard: {
      VI: "Số CMND",
      EN: "Indentity card number",
    },
    FormIdentityDate: {
      VI: "Ngày cấp",
      EN: "Identity date",
    },
    FormIdentityPlace: {
      VI: "Nơi cấp",
      EN: "Identity place",
    },
    FormAddress: {
      VI: "Địa chỉ",
      EN: "Address",
    },
    FormTelephoneNumber: {
      VI: "ĐT di động",
      EN: "Telephone number",
    },
    FormPhoneNumber: {
      VI: "ĐT cố định",
      EN: "Phone number",
    },
    FormEmail: {
      VI: "Email",
      EN: "Email",
    },
    FormBankAccount: {
      VI: "Tài khoản ngân hàng",
      EN: "Bank account",
    },
    FormBankName: {
      VI: "Tên ngân hàng",
      EN: "Bank name",
    },
    FormBankBranch: {
      VI: "Chi nhánh",
      EN: "Bank Branch",
    },
    PageNaviTotal: {
      VI: "Tổng số: ",
      EN: "Total: ",
    },
    PageNaviRecord: {
      VI: "bản ghi",
      EN: "records",
    },
    TableFuctionColumn: {
      VI: "Chức năng",
      EN: "Function",
    },
  },
  // Các đoạn văn bản miêu tả tên của các nút thành phần
  ButtonText: {
    OkBtn: {
      VI: "Đồng ý",
      EN: "OK",
    },
    YesBtn: {
      VI: "Có",
      EN: "Yes",
    },
    NoBtn: {
      VI: "Không",
      EN: "No",
    },
    AddNewEmployee: {
      VI: "Thêm mới nhân viên",
      EN: "Add new employee",
    },
    CancelBtn: {
      VI: "Hủy",
      EN: "Cancel",
    },
    CloseBtn: {
      VI: "Đóng",
      EN: "Close",
    },
    SaveBtn: {
      VI: "Cất",
      EN: "Save",
    },
    SaveAndAddBtn: {
      VI: "Cất và thêm",
      EN: "Save and add",
    },
    EditBtn: {
      VI: "Sửa",
      EN: "Edit",
    },
    DuplicateBtn: {
      VI: "Nhân bản",
      EN: "Duplicate",
    },
    DeleteBtn: {
      VI: "Xóa",
      EN: "Delete",
    },
    StopUsingBtn: {
      VI: "Ngưng sử dụng",
      EN: "Stop using",
    },
    PrevPageBtn: {
      VI: "Trước",
      EN: "Prev",
    },
    NextPageBtn: {
      VI: "Sau",
      EN: "Next",
    },
    MultiActionBtn: {
      VI: "Thực hiện hàng loạt",
      EN: "Multiple Actions",
    },
  },
  // Các đoạn văn bản liên quan tới tên các cột trong bảng dữ liệu
  TableColumn: {
    EmployeeCode: {
      VI: "Mã nhân viên",
      EN: "Employee code",
    },
    FullName: {
      VI: "Tên nhân viên",
      EN: "Fullname",
    },
    Gender: {
      VI: "Giới tính",
      EN: "Gender",
    },
    DateOfBirth: {
      VI: "Ngày sinh",
      EN: "Date of birth",
    },
    IdentityCardNumber: {
      VI: "Số CMND",
      EN: "Identity card number",
    },
    PositionName: {
      VI: "Chức danh",
      EN: "Position name",
    },
    DepartmentName: {
      VI: "Tên đơn vị",
      EN: "Department name",
    },
    BankAccount: {
      VI: "Số tài khoản",
      EN: "Bank account",
    },
    BankName: {
      VI: "Tên ngân hàng",
      EN: "Bank name",
    },
    BankBranch: {
      VI: "Chi nhánh TK ngân hàng",
      EN: "Bank branch name",
    },
  },
  // Các đạon văn bản tiêu đề
  TitleName: {
    FormTitle: {
      VI: "Thông tin nhân viên",
      EN: "Employee info",
    },
    EmployeeHeader: {
      VI: "Nhân viên",
      EN: "Employee",
    },
    CompanyName: {
      VI: "Công ty tnhh sản xuất - thương mại - dịch vụ qui phúc",
      EN: "Qui Phuc Production - Commercial - Service Company",
    },
    ShowKeyMap: {
      VI: "Hiện phím tắt ctrl + /",
      EN: "Show keymap ctrl + /",
    },
  },
  // Các đoạn văn bản tạm trong phần nhập liệu mô tả cách nhập cho đúng
  PlaceHolder: {
    Search: {
      VI: "Tìm theo mã, tên nhân viên",
      EN: "Search by name, code",
    },
    FormEmployeeCode: {
      VI: "Nhập mã nhân viên",
      EN: "Insert employee code",
    },
    FormFullName: {
      VI: "Nhập họ và tên",
      EN: "Insert fullname",
    },
    FormDepartment: {
      VI: "Nhập đơn vị",
      EN: "Insert department",
    },
    FormPosition: {
      VI: "Nhập chức danh",
      EN: "Insert position",
    },
    FormIdentityCard: {
      VI: "Nhập số CMND",
      EN: "Insert identity card",
    },
    FormIdentityPlace: {
      VI: "Nhập nơi cấp",
      EN: "Insert identity place",
    },
    FormAddress: {
      VI: "Nhập địa chỉ",
      EN: "Insert address",
    },
    FormTelephoneNumber: {
      VI: "Nhập số điện thoại di động",
      EN: "Insert telephone number",
    },
    FormPhoneNumber: {
      VI: "Nhập số điện thoại cố định",
      EN: "Insert phone number",
    },
    FormEmail: {
      VI: "Nhập Email",
      EN: "Insert Email",
    },
    FormBankAccount: {
      VI: "Nhập tài khoản ngân hàng",
      EN: "Insert bank account",
    },
    FormBankName: {
      VI: "Nhập tên ngân hàng",
      EN: "Insert bank name",
    },
    FormBankBranch: {
      VI: "Nhập tên chi nhánh",
      EN: "Insert bank branch",
    },
    PageSizeChange: {
      VI: "Hãy chọn số trang",
      EN: "Select page size",
    },
  },
  // Các đoạn văn bản liên quan tới giới tính của mọi người
  Gender: {
    Male: {
      VI: "Nam",
      EN: "Male",
    },
    Female: {
      VI: "Nữ",
      EN: "Female",
    },
    Other: {
      VI: "Khác",
      EN: "Other",
    },
  },
  // Các đoạn văn bản trong phần nhập liệu dạng combo
  Combobox: {
    Data: {
      VI: "10 bản ghi trên trang:10;20 bản ghi trên trang:20;50 bản ghi trên trang: 50;100 bản ghi trên trang:100",
      EN: "10 records per page:10;20 records per page:20;50 records per page: 50;100 records per page:100",
    },
    DefautValue: {
      VI: "10 bản ghi trên trang",
      EN: "10 records per page",
    },
    Unique: {
      VI: "10",
      EN: "10",
    },
  },
  // Các đoạn văn bản mô tả về thành phần phím tắt
  KeyMap: {
    KeyMapPopup: {
      VI: "Tất cả phím tắt trên trang quản lý nhân viên",
      EN: "All keyboard shortcut on employee list page",
    },
    NavigationName: {
      VI: "Điều hướng",
      EN: "Navigation",
    },
    Typing: {
      VI: "Nhập liệu",
      EN: "Typing",
    },
    Other: {
      VI: "Khác",
      EN: "Other",
    },
    QuickSearch: {
      VI: "Tìm kiếm nhanh",
      EN: "Quick search",
    },
    PreviousListPage: {
      VI: "Trang danh sách trước",
      EN: "Previous list page",
    },
    NextListPage: {
      VI: "Trang danh sách sau",
      EN: "Next list page",
    },
    ClosePopup: {
      VI: "Đóng popup",
      EN: "Close Popup",
    },
    Reload: {
      VI: "Load lại danh sách",
      EN: "Reload list",
    },
    Export: {
      VI: "Xuất khẩu ra file excel",
      EN: "Export to excel",
    },
    Insert: {
      VI: "Thêm mới 1 nhân viên",
      EN: "Add new employee",
    },
    Edit: {
      VI: "Sửa 1 nhân viên (theo tabindex)",
      EN: "Edit one employee (by tabindex)",
    },
    Delete: {
      VI: "Xóa 1 hoặc nhiều nhân viên (theo tabindex)",
      EN: "Delete one or many employee (by tabindex)",
    },
    Save: {
      VI: "Lưu 1 nhân viên",
      EN: "Save one employee",
    },
    SaveAndAdd: {
      VI: "Lưu và thêm nhân viên",
      EN: "Save one and add employee",
    },
    Cancel: {
      VI: "Hủy thêm hoặc sửa 1 nhân viên",
      EN: "Cancel add or edit one employee",
    },
    ChangeLanguage: {
      VI: "Thay đổi ngôn ngữ",
      EN: "Change language",
    },
    ToggleKeyMap: {
      VI: "Ẩn hiện danh sách phím tắt",
      EN: "Toggle keyboard shortcut list",
    },
  },
};

export default MISAResource;
