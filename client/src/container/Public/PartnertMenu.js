import React, { useState, useEffect } from "react";
import user from "../../assets/user.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const PartnerMenu = () => {
  const [activePage, setActivePage] = useState(""); // Thêm state để lưu trạng thái trang hiện tại
  const location = useLocation();

  const handlePageClick = (page) => {
    setActivePage(page); // Cập nhật trang hiện tại khi người dùng click vào phần tử menu
  };

  return (
    <div
      style={{
        display: "block",
      }}
    >
      <nav
        className="Menu font-app"
        style={{
          padding: "0 3%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Link to="/partner-home">
          <img
            alt="user"
            src={user}
            style={{
              width: "80px",
              pointerEvents: "none",
              margin: "0% 20%",
            }}
          />
        </Link>
        <ul style={{}}>
          <Link
            style={{
              display: "block",
              margin: "8% 5%",
              fontWeight:
                location.pathname === "/partner-home" ? "bold" : "normal",
              color:
                location.pathname === "/partner-home"
                  ? "rgb(79, 195, 247)"
                  : "inherit",
            }}
            to="/partner-home"
            onClick={() => handlePageClick("home")}
          >
            Chỗ ở đang cho thuê
          </Link>
          <Link
            style={{
              display: "block",
              margin: "8% 5%",
              fontWeight:
                location.pathname === "/partner-on-progress"
                  ? "bold"
                  : "normal",
              color:
                location.pathname === "/partner-on-progress"
                  ? "rgb(79, 195, 247)"
                  : "inherit",
            }}
            to="/partner-on-progress"
            onClick={() => handlePageClick("progress")}
          >
            Chỗ ở đang chờ duyệt
          </Link>
          <Link
            style={{
              display: "block",
              margin: "8% 5%",
              fontWeight:
                location.pathname === "/partner-insert" ? "bold" : "normal",
              color:
                location.pathname === "/partner-insert"
                  ? "rgb(79, 195, 247)"
                  : "inherit",
            }}
            to="/partner-insert"
            onClick={() => handlePageClick("insert")}
          >
            Đăng tin cho thuê
          </Link>
          <Link
            style={{
              display: "block",
              margin: "8% 5%",
              fontWeight:
                location.pathname === "/partner-insert-room"
                  ? "bold"
                  : "normal",
              color:
                location.pathname === "/partner-insert-room"
                  ? "rgb(79, 195, 247)"
                  : "inherit",
            }}
            to="/partner-insert-room"
            onClick={() => handlePageClick("insertroom")}
          >
            Quản lý phòng
          </Link>
          <Link
            style={{
              display: "block",
              margin: "8% 5%",
              fontWeight:
                location.pathname === "/partner-order" ? "bold" : "normal",
              color:
                location.pathname === "/partner-order"
                  ? "rgb(79, 195, 247)"
                  : "inherit",
            }}
            to="/partner-order"
            onClick={() => handlePageClick("order")}
          >
            Quản lý đơn hàng
          </Link>
          <Link
            style={{
              display: "block",
              margin: "8% 5%",
              fontWeight:
                location.pathname === "/partner-review" ? "bold" : "normal",
              color:
                location.pathname === "/partner-review"
                  ? "rgb(79, 195, 247)"
                  : "inherit",
            }}
            to="/partner-review"
            onClick={() => handlePageClick("review")}
          >
            Phản hồi khách hàng
          </Link>
          <Link
            style={{
              display: "block",
              margin: "8% 5%",
              fontWeight:
                location.pathname === "/partner-revenue" ? "bold" : "normal",
              color:
                location.pathname === "/partner-revenue"
                  ? "rgb(79, 195, 247)"
                  : "inherit",
            }}
            to="/partner-revenue"
            onClick={() => handlePageClick("revenue")}
          >
            Doanh thu
          </Link>
          <Link
            style={{
              display: "block",
              margin: "8% 5%",
              fontWeight:
                location.pathname === "/partner-account" ? "bold" : "normal",
              color:
                location.pathname === "/partner-account"
                  ? "rgb(79, 195, 247)"
                  : "inherit",
            }}
            to="/partner-account"
            onClick={() => handlePageClick("account")}
          >
            Tài khoản
          </Link>
        </ul>
      </nav>
    </div>
  );
};
export default PartnerMenu;
