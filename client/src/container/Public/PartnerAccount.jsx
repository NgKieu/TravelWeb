import Modal from "react-modal";
import { AiOutlineEye } from "react-icons/ai"; // Import the AiOutlineEye icon
import PartnerHeader from "./PartnerHeader";
import "./css/PartnerBody.css";
import PartnerMenu from "./PartnertMenu";
import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PartnerAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  //repair
  const [notoken, Notoken] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token == null || token == "" || token == undefined) {
      Notoken(0);
      navigate("/login-business");
      Swal.fire({
        icon: "error",
        title: "Truy cập thất bại!",
        text: "Tài khoản không đủ thẩm quyền",
      });
    } else {
      Notoken(1);
    }
  }, []);

  const handleSaveChanges = () => {
    // Thực hiện các thay đổi cần lưu, chẳng hạn cập nhật thông tin người dùng
    // Ví dụ: gọi hàm API hoặc cập nhật trong cơ sở dữ liệu

    // Sau khi thực hiện thay đổi, có thể làm một số việc như thông báo thành công
    alert("Thay đổi đã được lưu lại.");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handlePasswordChangeSubmit = (event) => {
    event.preventDefault();

    // Check if new password matches the confirmation password
    if (newPassword !== confirmNewPassword) {
      // Handle password mismatch here, e.g. show an error message
      alert(
        "Xác nhận mật khẩu không khớp với mật khẩu mới. Vui lòng kiểm tra lại."
      );
      return;
    }

    // Check if new password is the same as the old password
    if (newPassword === oldPassword) {
      // Handle same password error
      alert("Mật khẩu mới trùng với mật khẩu cũ. Vui lòng chọn mật khẩu khác.");
      return;
    }

    // Here you can handle the logic for changing the password
    // For example, you can make an API call to update the password
    // Once the password is changed, close the modal
    handleCloseModal();
  };

  return (
    <div style={{}}>
      <div>
        {/* repair */}
        {notoken == 1 ? <PartnerHeader /> : null}
      </div>
      <div className="Body font-app" style={{ display: "flex" }}>
        <div
          style={{
            flex: "0 0 17%",
            padding: "3% 0 2% 3% ",
          }}
        >
          <PartnerMenu />
        </div>

        <div
          className="main font-app"
          style={{
            flex: "0 0 81%",
            backgroundColor: "white",
            border: "1px solid lightgrey",
            borderRadius: "20px",
            margin: "2% 2% 0 0 ",
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: "21px",
              fontWeight: "400",
              padding: "10px 20px",
            }}
          >
            Tài khoản của tôi
          </label>
          <hr style={{ width: "96%", margin: "0 2% 20px 2%" }} />

          <div className="content font-app" style={{ display: "flex" }}>
            <div className="colum font-app">
              <table
                style={{
                  width: "100%",
                  height: "150px",
                  marginLeft: "10%",
                  textAlign: "left",
                  marginTop: "10%",
                  marginBottom: "15%",
                }}
              >
                <tr>
                  <td>
                    <label
                      htmlFor="email"
                      className="form-label"
                      style={{ marginTop: "5px" }}
                    >
                      Email
                    </label>{" "}
                  </td>
                  <td>
                    <div style={{ marginLeft: "20px" }}>
                      <input
                        id="email"
                        className="form-control"
                        type="email"
                        name="email"
                        disabled
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          height: "38px",
                          width: "350px",
                          paddingLeft: "8px",
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <label
                      htmlFor="matkhau"
                      className="form-label"
                      style={{ paddingLeft: "40px", marginTop: "5px" }}
                    >
                      Mật khẩu
                    </label>
                  </td>
                  <td>
                    <div style={{ paddingLeft: "25px" }}>
                      {/* Thêm sự kiện onClick để mở cửa sổ modal */}
                      <a
                        href="#"
                        id="matkhau"
                        name="matkhau"
                        onClick={handleOpenModal}
                        style={{
                          border: "0",
                          background: "#FF6600",
                          color: "white",
                          borderRadius: "4px",
                          paddingLeft: "8px",
                          textDecoration: "none",
                          display: "inline-block",
                          padding: "5px 10px",
                        }}
                      >
                        Đổi mật khẩu
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label
                      htmlFor="hoten"
                      className="form-label"
                      style={{ marginTop: "5px" }}
                    >
                      Họ tên
                    </label>{" "}
                  </td>
                  <td>
                    <div style={{ marginLeft: "20px" }}>
                      <input
                        id="hoten"
                        className="form-control"
                        type="hoten"
                        name="hoten"
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          height: "38px",
                          width: "350px",
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    {" "}
                    <label
                      htmlFor="diachi"
                      className="form-label"
                      style={{ paddingLeft: "40px", marginTop: "5px" }}
                    >
                      Địa chỉ
                    </label>
                  </td>
                  <td>
                    <div style={{ paddingLeft: "25px" }}>
                      <input
                        id="diachi"
                        className="form-control"
                        type="text"
                        name="diachi"
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          height: "38px",
                          width: "350px",
                          paddingLeft: "8px",
                        }}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <label
                      htmlFor="sdt"
                      className="form-label"
                      style={{ marginTop: "5px" }}
                    >
                      SĐT
                    </label>
                  </td>
                  <td>
                    <div style={{ marginLeft: "20px" }}>
                      <input
                        id="sdt"
                        className="form-control"
                        type="sdt"
                        name="sdt"
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          height: "38px",
                          width: "350px",
                          paddingLeft: "8px",
                        }}
                      />
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <button
              style={{
                background: "#FF6600",
                color: "white",
                borderRadius: "4px",
                height: "38px",
                width: "10%",
                marginTop: "23%",
              }}
              onClick={handleSaveChanges}
            >
              Lưu thay đổi
            </button>

            <Modal
              isOpen={isModalOpen}
              onRequestClose={handleCloseModal}
              contentLabel="Change Password Modal"
              style={{
                content: {
                  width: "40%",
                  height: "40%",
                  margin: "auto",
                },
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: "700" }}>
                Đổi mật khẩu
              </h2>
              <hr style={{ width: "100%", margin: "2% 0" }} />
              <form onSubmit={handlePasswordChangeSubmit}>
                <div style={{ position: "relative", display: "flex" }}>
                  <label htmlFor="oldPassword" style={{ marginTop: "2%" }}>
                    Mật khẩu cũ:
                  </label>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    id="oldPassword"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                    style={{
                      marginLeft: "17.9%",
                      marginTop: "2%",
                      marginBottom: "2%",
                      height: "30px",
                      width: "50%",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      marginLeft: "-30px",
                    }}
                  >
                    <AiOutlineEye size={16} />
                  </button>
                </div>

                <div style={{ position: "relative", display: "flex" }}>
                  <label htmlFor="newPassword">Mật khẩu mới:</label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    style={{
                      border: "1px solid gray",
                      marginLeft: "16%",
                      marginBottom: "2%",
                      height: "30px",
                      width: "50%",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      marginLeft: "-30px",
                      marginBottom: "10px",
                    }}
                  >
                    <AiOutlineEye size={16} />
                  </button>
                </div>

                <div>
                  <label htmlFor="confirmNewPassword">
                    Nhập lại mật khẩu mới:
                  </label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPasswordChange}
                    style={{
                      marginLeft: "5%",
                      marginBottom: "5%",
                      height: "30px",
                      width: "50%",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    border: "0px",
                    borderRadius: "5px",
                    color: "white",
                    padding: "8px 25px",
                    background: "#FF6600",
                    marginLeft: "50%",
                    marginRight: "5%",
                  }}
                >
                  Xác nhận
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    padding: "8px 25px",
                  }}
                >
                  Đóng
                </button>
              </form>
            </Modal>

            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
