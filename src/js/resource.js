var MISAResource = {
  ErrorValidate: {
    EmployeeCodeNotEmpty: {
      VI: "Mã nhân viên không được phép để trống.",
      EN: "Employee code is not empty.",
    },
    EmployeeCodeIsDuplicated: {
      VI: "Mã nhân viên đã tồn tại.",
      EN: "Employee code is duplicated.",
    },
    EmployeeNameNotEmpty: {
      VI: "Tên không được phép để trống.",
      EN: "Employee name is not empty.",
    },
    DepartmentName: {
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
    DeleteNoti: {
      VI: "Đã xóa nhân viên khỏi bảng.",
      EN: "The employee is deleted from table.",
    },
    DeleteManyNoti: {
      VI: "Đã xóa những nhân viên vừa chọn khỏi bảng.",
      EN: "The employees are deleted from table.",
    },
    DeleteManyNotiError: {
      VI: "Thao tác xóa nhiều thất bại.",
      EN: "Delete many action is failure.",
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
      VI: "Thao tác xuất khẩu bị lỗi, vui lòng kiểm tra lại.",
      EN: "Export action was failed, please check again.",
    },
  },
  PopupMessage: {
    AskChange: {
      VI: "Dữ liệu đã được thay đổi, bạn có muốn cất không ?",
      EN: "Data is changed, do you want to save this ?",
    },
    AskDeleteOne: {
      VI: "Bạn có thực sự muốn xóa nhân viên {0}không?",
      EN: "Do you really want to delete {0}employee?",
    },
    AskDeleteMany: {
      VI: "Bạn có thực sự muốn xóa những nhân viên đã chọn không?",
      EN: "Do you really want to delete all selected employees?",
    },
  },
  ExportExcel: {
    FileExportName: {
      VI: "Danh_sach_nhan_vien.xlsx",
      EN: "Employee_list.xlsx",
    },
  },
};

export default MISAResource;
