import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { AiOutlineEye } from "react-icons/ai"; // Import the AiOutlineEye icon
import PartnerHeader from "./PartnerHeader";
import "./css/PartnerBody.css";
import PartnerMenu from "./PartnertMenu";
import axios from "axios";
import SelectAddress from "./SelectAddress";
import Swal from "sweetalert2";

const PartnerAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:8081/partner-header", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  }, []);

  const handleSaveChanges = async () => {
    const password = localStorage.getItem("password");

    const account = {
      email: userData.email || data[0]?.Partner_Email,
      name: userData.name || data[0]?.Partner_Name,
      phone: userData.phone || data[0]?.Partner_Phone,
      password: password || data[0]?.Partner_Password,
      address: userData.address || data[0]?.Partner_Address,
    };
    console.log(account);
    try {
      await axios.post("http://localhost:8081/partner_account", account, {
        headers: {
          Authorization: `${token}`,
        },
      });
      Swal.fire({
        text: "Thay đổi đã được lưu lại.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      localStorage.removeItem("password");
    } catch (error) {
      console.error("Error inserting account:", error.message);
      Swal.fire({
        text: "Thay đổi có vấn đề.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      localStorage.removeItem("password");
    }
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
    console.log(event.target.value);
    setNewPassword(event.target.value);
  };
  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handlePasswordChangeSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        text: "Xác nhận mật khẩu không khớp với mật khẩu mới. Vui lòng kiểm tra lại.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if (newPassword === oldPassword) {
      Swal.fire({
        text: "Mật khẩu mới trùng với mật khẩu cũ. Vui lòng chọn mật khẩu khác.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    localStorage.setItem("password", newPassword);
    // console.log("dfg" + password);
    handleCloseModal();
  };

  return (
    <div style={{}}>
      <div>
        <PartnerHeader />
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
                    <div className="">
                      <label
                        htmlFor="email"
                        className="form-label"
                        style={{ marginTop: "5px" }}
                      >
                        <b>Email</b>
                      </label>
                      {data.map((item, index) => (
                        <div key={index}>
                          <input
                            id={`email-${index}`}
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
                              marginTop: "10px",
                            }}
                            // defaultValue={item.Partner_Email}
                            value={userData.email || item.Partner_Email}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <label
                      htmlFor="matkhau"
                      className="form-label"
                      style={{ paddingLeft: "40%", marginTop: "5px" }}
                    >
                      <b>Mật khẩu</b>
                    </label>
                  </td>
                  <td>
                    <div style={{}}>
                      {/* Thêm sự kiện onClick để mở cửa sổ modal */}
                      <a
                        href="#"
                        id="matkhau"
                        name="matkhau"
                        onClick={handleOpenModal}
                        style={{
                          border: "0",
                          background: "#FF6600",
                          height: "30px",
                          width: "150px",
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                          borderRadius: "4px",
                          textDecoration: "none",
                          padding: "2px",
                          marginLeft: "-10px",
                        }}
                      >
                        Đổi mật khẩu
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <label
                        htmlFor="hoten"
                        className="form-label"
                        style={{ marginTop: "5px" }}
                      >
                        <b>Họ tên</b>
                      </label>
                      {data.map((item, index) => (
                        <div key={index}>
                          <input
                            id={`name-${index}`}
                            className="form-control"
                            type="name"
                            name="name"
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              height: "38px",
                              width: "350px",
                              paddingLeft: "8px",
                              marginTop: "10px",
                            }}
                            // defaultValue={item.Partner_Name}
                            value={userData.name || item.Partner_Name}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="ml-[40%]">
                      <label
                        htmlFor="sdt"
                        className="form-label"
                        style={{ marginTop: "5px" }}
                      >
                        <b>SĐT</b>
                      </label>
                      {data.map((item, index) => (
                        <div key={index}>
                          <input
                            id={`sdt-${index}`}
                            className="form-control"
                            type="sdt"
                            name="sdt"
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              height: "38px",
                              width: "350px",
                              paddingLeft: "8px",
                              marginTop: "10px",
                            }}
                            // defaultValue={item.Partner_Phone}
                            value={userData.phone || item.Partner_Phone}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                      ))}
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
                width: "150px",
                marginTop: "22%",
                marginLeft: "10%",
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
                      border: "1px solid gray",
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
                      border: "1px solid gray",
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
};

export default PartnerAccount;
