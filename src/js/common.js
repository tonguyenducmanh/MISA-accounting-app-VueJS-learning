var common = {
  /**
   * format ngày tháng về định dạng Việt Nam
   * @param {any} date Ngày tháng
   * Author: Tô Nguyễn Đức Mạnh (03/09/2022)
   */
  formatDate(date, characterConnect = "/") {
    try {
      if (date) {
        date = new Date(date);

        // Lấy ra ngày tháng năm:
        let day = date.getDate();
        day = day < 10 ? `0${day}` : day;
        let month = date.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        let year = date.getFullYear();

        // trả về định dạng phù hợp nếu có vd : 14/03/2000 14-03-2000
        if (characterConnect === "/") {
          return `${day}/${month}/${year}`;
        } else {
          return `${year}-${month}-${day}`;
        }
      } else {
        return "";
      }
    } catch (error) {
      console.log(error);
      return "";
    }
  },

  /**
   * format tiền về định dạng VNĐ
   * @param {Number} money Tiền
   * Author: Tô Nguyễn Đức Mạnh (03/09/2022)
   */
  formatMoneyVND(money) {
    try {
      // formart theo định dạng cung cấp sẵn của Intl
      money = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(money);
      return money;
    } catch (error) {
      console.log(error);
      return "";
    }
  },
  /**
   * format gender trả về định dạng giới tính chuẩn
   * @param {int} gender Giới tính
   * Author: Tô Nguyễn Đức Mạnh (05/09/2022)
   */
  formatGender(gender) {
    try {
      switch (gender) {
        case 0:
          return "Nam";
        case 1:
          return "Nữ";
        default:
          return "Khác";
      }
    } catch (error) {
      console.log(error);
    }
  },
};
export default common;
