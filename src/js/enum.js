var MISAEnum = {
  errorCode: {
    Exception: 1,
    DuplicateCode: 2,
    ValidateFail: 3,
    InsertFailed: 4,
    DepartmentError: 5,
    PositionError: 6,
    InvalidInput: 7,
    UpdateFailed: 8,
    DeleteFailed: 9,
  },
  // các enum của combobox
  combobox: {
    data: "10 bản ghi trên trang:10;20 bản ghi trên trang:20;50 bản ghi trên trang: 50;100 bản ghi trên trang:100",
    defautValue: "10 bản ghi trên trang",
    unique: "10",
  },
  // các class được binding vào component button
  button: {
    Primary: "button-primary",
    Secondary: "button-second",
  },
  // các class được binding vào component input
  input: {
    Italic: "input__field--italic",
    LabelAlert: "input__label--alert",
    InputAlert: "input__field--alert",
  },
  // các class được binding vào date picker
  datepicker: {
    DatePickerAlert: "datepicker--alert",
    InputAlert: "inputdate--alert",
    DatePickerNAN: "NaN-NaN-NaN",
  },
  // các class được binding vào toastmessage
  toastmessage: {
    SUCCESS: "toastmessage__content--success",
    ERROR: "toastmessage__content--error",
    WARNING: "toastmessage__content--warning",
    NOTI: "toastmessage__content--noti",
  },
  // các kiểu toastmessage
  toasttype: {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    WARNING: "WARNING",
    NOTI: "NOTI",
  },
  // các mã phím keycode
  keycode: {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
    ESC: 27,
    SLASH: 191,
    L: 76,
    F3: 114,
    R: 82,
    Q: 81,
    E: 69,
    F8: 119,
    F2: 113,
    F9: 120,
    INSERT: 45,
    CTRL: 17,
    ALT: 18,
    SHIFT: 16,
    DELETE: 46,
  },
  // các tên phím keyboard
  keyname: {
    control: "ctrlKey",
    q: "KeyQ",
    s: "KeyS",
    a: "KeyA",
    k: "KeyK",
    shift: "shiftKey",
  },
  // các từ khóa liên quan tới popup
  popup: {
    ALERT: "popup--alert",
    WARNING: "popup--warning",
    ASK: "popup--ask",
    SHOW: "popup__wrap--show",
  },
  // các từ khóa liên quan tới form
  form: {
    SHOW: "form__wrap--show",
    EDIT: "PUT",
    CREATE: "POST",
  },
  // các từ khóa liên quan tới contextmenu
  contextMenu: {
    SHOW: "contextmenu__dropicon--clicked",
    UP: "contextmenu__menu--up",
  },
  // các từ khóa liên quan tới phân trang
  pageNavigation: {
    DISABLE: "page__number--disable",
    SELECTED: "page__count--selected",
  },
  // các địa chỉ api
  API: {
    GETEMPLOYEELIST: "https://localhost:44313/api/v1/Employees",
    GETEMPLOYEEFILTER: "https://localhost:44313/api/v1/Employees/filter",
    NEWEMPLOYEECODE: "https://localhost:44313/api/v1/Employees/max-code",
    CHECKEMPLOYEECODE:
      "https://localhost:44313/api/v1/Employees/duplicate-code/?recordCode=",
    GETDEPARTMENTLIST: "https://localhost:44313/api/v1/Departments",
    GETPOSITIONLIST: "https://localhost:44313/api/v1/Positions",
    DELETEMANYEMPLOYEES: "https://localhost:44313/api/v1/Employees/delete-many",
    EXPORTEMPLOYEES: "https://localhost:44313/api/v1/Employees/export-all",
  },
  // header API
  APIHEADER: {
    APPJSON: "application/json",
    APPEXCEL:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  // các từ khóa liên quan tới table
  table: {
    HIDE: "table__wrap--hide",
    OVERFLOW: "table__wrap--disableflow",
  },
  // ngôn ngữ hiện tại đang dùng là tiếng Việt
  language: "VI",

  // danh sách các ngôn ngữ
  languageList: {
    VI: "VI",
    EN: "EN",
  },
  // kiểu lưu là cất hay cất và thêm
  method: {
    PUT: "PUT",
    POST: "POST",
    GET: "GET",
  },
};

export default MISAEnum;
