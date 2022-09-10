let pm;
// xóa dòng đầu tiên trước khi chạy code
// file chạy tạo giá trị random trong postman, không thực thi code này trong ứng dụng VueJS
/**
 * Trả về giá trị random cho phòng ban
 * Author: Tô Nguyễn Đức Mạnh (10/09/2022)
 */
function ramdomPhongBan() {
  const phongban = [
    "",
    "Phòng Công Nghệ Thông Tin",
    "Phòng Hành Chính",
    "Phòng Nhân Sự",
    "Phòng Kế Toán",
  ];
  const the = phongban[Math.floor(Math.random() * phongban.length)];
  return the;
}
// tạo biến môi trường trong Postman
pm.variables.set("phongBan", ramdomPhongBan());

/**
 * Trả về giá trị random cho chức danh
 * Author: Tô Nguyễn Đức Mạnh (10/09/2022)
 */
function ramdomChucDanh() {
  const chucDanh = [
    "",
    "Giám đốc",
    "Phó giám đốc",
    "Trưởng phòng",
    "Phó phòng",
    "Nhân viên",
    "Thực tập sinh",
  ];
  const the = chucDanh[Math.floor(Math.random() * chucDanh.length)];
  return the;
}

// tạo biến môi trường trong Postman
pm.variables.set("chucDanh", ramdomChucDanh());

/**
 * Trả về giá trị random cho ngày tháng
 * Author: Tô Nguyễn Đức Mạnh (10/09/2022)
 */
function ramdomNgayThanhLap() {
  const ngayThanhLap = [
    "1991-12-20",
    "2000-10-12",
    "2008-05-01",
    "2011-04-14",
    "2015-07-21",
    "2019-09-15",
    "2022-06-06",
    "",
  ];
  const the = ngayThanhLap[Math.floor(Math.random() * ngayThanhLap.length)];
  return the;
}

// tạo biến môi trường trong Postman
pm.variables.set("ngayThanhLap", ramdomNgayThanhLap());

/**
 * Trả về giá trị random cho số điện thoại
 * Author: Tô Nguyễn Đức Mạnh (10/09/2022)
 */
function ramdomDienThoaiDiDong() {
  const the = Math.random().toString().slice(2, 12);
  return the;
}

// tạo biến môi trường trong Postman
pm.variables.set("dienThoaiDiDong", ramdomDienThoaiDiDong());

/**
 * Trả về giá trị random cho họ đệm của người việt
 * Author: Tô Nguyễn Đức Mạnh (10/09/2022)
 */
function randomHovaDem() {
  const hovadem = [
    "Liễu Thị",
    "Trần Xuân",
    "Đặng Gia",
    "Tô Nguyễn",
    "Trần Hải",
    "Cao Thị",
    "Trần Ngọc",
    "Quốc Bảo",
    "Đặng Thị",
    "Lê Thị",
    "Phạm Thị",
    "Khổng Thị",
    "Trương Thị",
    "Phan Thị",
    "Nguyễn Minh",
    "Nguyễn Hải",
    "Phạm Xuân",
    "Vũ Minh",
  ];
  const the = hovadem[Math.floor(Math.random() * hovadem.length)];
  return the;
}

/**
 * Trả về giá trị random cho họ đệm của tên
 * Author: Tô Nguyễn Đức Mạnh (10/09/2022)
 */
function randomTen() {
  const ten = [
    "Mạnh",
    "Oanh",
    "Nam",
    "Long",
    "Phương",
    "Giang",
    "Bảo",
    "Hương",
    "Ly",
    "Lan",
    "Trang",
    "Tuấn",
    "Ngọc",
    "Hiếu",
    "Cường",
    "Chi",
    "Linh",
    "Lành",
    "Mai",
    "Thu",
    "Kiên",
    "Trung",
    "Hoàng",
    "Hậu",
    "Bình",
    "Đông",
    "Hồng",
    "Huyền",
    "Khánh",
    "Ngân",
    "Nhung",
  ];
  const the = ten[Math.floor(Math.random() * ten.length)];
  return the;
}

/**
 * Trả về giá trị họ tên dựa trên các hàm random họ đệm và random tên
 * Author: Tô Nguyễn Đức Mạnh (10/09/2022)
 */
function randomHovaTen() {
  let ho = randomHovaDem();
  let ten = randomTen();
  return ho + " " + ten;
}

// tạo biến môi trường trong Postman
pm.variables.set("ten", randomHovaTen());
// lấy giá trị biến toàn cục trong postman
let temp = pm.globals.get("postmangenid");
temp++;
// đặt giá trị mới cho biến toàn cục trong postman
pm.globals.set("postmangenid", temp);
//   tăng variable lên 1 đơn vị
//   postmangenid ++
