import React, { useState, useEffect } from "react";
import logo from "../../assets/MTLoginlogo.png";
import "./css/LoginBusiness.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function LoginBusiness() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };
  const handleRememberMeChange = (event) => {
    const { checked } = event.target;
    setRememberMe(checked);
  };

  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    // Kiểm tra local storage hoặc cookie nếu thông tin đăng nhập đã được lưu
    const savedEmail = localStorage.getItem("email");
    const savedRememberMe = localStorage.getItem("rememberMe");

    if (savedEmail && savedRememberMe === "true") {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  axios.defaults.withCredentials = true;

  function handleForgetMKPartner() {
    Swal.fire({
      title: "Nhập Email được đăng ký",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Gửi",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const emailforgetpart = result.value;
        axios
          .post("http://localhost:8081/forgetMKpartner", { emailforgetpart })
          .then((res) => {
            if (res.data == "Success") {
              Swal.fire("Thành công", "Đã gửi mật khẩu đến Email!", "success");
            } else {
              Swal.fire("Sai", "Email không tồn tại", "error");
            }
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to send request!", "error");
          });
      }
    });
  }

  // const handleSubmit = (event) => {
  //   // Kiểm tra điều kiện nhập
  //   let isValid = true;
  //   if (!email) {
  //     setEmailError("Vui lòng nhập email.");
  //     isValid = false;
  //   } else {
  //     setEmailError("");
  //   }

  //   if (!password) {
  //     setPasswordError("Vui lòng nhập mật khẩu.");
  //     isValid = false;
  //   } else {
  //     setPasswordError("");
  //   }
  //   if (!isEmailValid(email)) {
  //     setEmailError("Email không hợp lệ.");
  //     isValid = false;
  //   } else {
  //     setEmailError("");
  //   }
  //   if (isValid) {
  //     event.preventDefault();
  //     axios
  //       .post("http://localhost:8081/login-business", {
  //         email: email,
  //         password: password,
  //       })
  //       .then((response) => {
  //         if (response.data.Message) {
  //           Swal.fire({
  //             text: "Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.",
  //             icon: "error",
  //             showConfirmButton: false,
  //             timer: 2000,
  //           });
  //           setLoginStatus(response.data.Message);
  //         } else {
  //           Swal.fire({
  //             text: "Đăng nhập thành công.",
  //             icon: "success",
  //             showConfirmButton: false,
  //             timer: 2000,
  //           });
  //           setTimeout(() => {
  //             navigate("/partner-home");
  //           }, 2000);
  //           setLoginStatus(response.data[0].email);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Đã xảy ra lỗi khi đăng nhập:", error);
  //       });

  //     if (rememberMe) {
  //       localStorage.setItem("email", email);
  //       localStorage.setItem("rememberMe", true);
  //     } else {
  //       localStorage.removeItem("email");
  //       localStorage.removeItem("rememberMe");
  //     }
  //   }
  // };

  const handleSubmit = (event) => {
    // Kiểm tra điều kiện nhập
    let isValid = true;
    if (!email) {
      setEmailError("Vui lòng nhập email.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu.");
      isValid = false;
    } else {
      setPasswordError("");
    }
    if (!isEmailValid(email)) {
      setEmailError("Email không hợp lệ.");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (isValid) {
      event.preventDefault();
      axios
        .post("http://localhost:8081/login-business", {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.data.Message) {
            Swal.fire({
              text: "Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
            setLoginStatus(response.data.Message);
          } else {
            const account = response.data.Data[0];
            if (account.status == 0 && account.Partner_verified !==null ) {
              Swal.fire({
                title: "Tài khoản chưa được xác minh",
                text: "Liên hệ 0246838583 nếu có thắc mắc",
                icon: "info",
              });
            } else if (
              account.Partner_verified == "" ||
              account.Partner_verified == null ||
              account.Partner_verified == undefined
            ) {
              Swal.fire({
                title: "Tài khoản chưa được xác minh",
                text: "Kiểm tra hộp thư Email",
                icon: "error",
                timer: 2000,
              });
            } else if (account.status == 1 && account.Partner_verified !==null) {
              localStorage.setItem("emailPartner", email);
              Swal.fire({
                text: "Đăng nhập thành công.",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
              navigate("/partner-home");
              setLoginStatus(response.data.Status);
              localStorage.setItem("token", response.data.Token);
            } else {
              Swal.fire({
                title: "Tài khoản đã bị từ chối",
                text: "Liên hệ 0246838583 nếu có thắc mắc",
                icon: "error",
              });
            }
          }
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi đăng nhập:", error);
        });

      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("rememberMe", true);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("rememberMe");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="image-container">
        <img
          alt="logo"
          src={logo}
          style={{ height: "450px", pointerEvents: "none" }}
        />
      </div>

      <div className="login-form-container">
        <h1 className="title">Đăng nhập hệ thống</h1>
        <form>
          <div style={{ marginTop: "10px" }}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="email"
                className="form-control"
                type="text"
                name="email"
                placeholder="Nhập email"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  height: "38px",
                  width: "350px",
                  paddingLeft: "8px",
                }}
                value={email}
                // onChange={handleEmailChange}
                onChange={(e) => {
                  handleEmailChange(e);
                  setEmail(e.target.value);
                }}
              />
            </div>
            {emailError && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "1px" }}>
                {emailError}
              </p>
            )}
          </div>

          <div style={{ marginTop: "20px" }}>
            <label htmlFor="mat-khau" className="form-label">
              Mật khẩu
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="mat-khau"
                className="form-control"
                type="password"
                name="matkhau"
                placeholder="Nhập mật khẩu"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  height: "38px",
                  width: "350px",
                  paddingLeft: "8px",
                }}
                value={password}
                // onChange={handlePasswordChange}
                onChange={(e) => {
                  handlePasswordChange(e);
                  setPassword(e.target.value);
                }}
              />
            </div>
            {passwordError && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "1px" }}>
                {passwordError}
              </p>
            )}
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                style={{
                  width: "18px",
                  height: "18px",
                  marginTop: "28px",
                  marginRight: "2px",
                }}
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              Lưu thông tin
            </label>
          </div>

          <div style={{ marginLeft: "5px" }}>
            <button
              type="submit"
              className="submit-btn"
              style={{ backgroundColor: "#FF6600", marginTop: "15px" }}
              onClick={handleSubmit}
            >
              Đăng nhập
            </button>
            <div
              onClick={handleForgetMKPartner}
              style={{
                color: "#0099FF",
                transform: "translate(140px, -25px)",
                cursor: "pointer",
              }}
            >
              Bạn quên mật khẩu ?
            </div>
          </div>

          <div style={{ margin: "0px -5px" }}>
            <hr style={{ width: "350px" }} />
            <p style={{ marginTop: "8px" }}>
              Bạn chưa có tài khoản ?{" "}
              <Link style={{ color: "#0099FF" }} to="/register-business">
                Đăng ký ngay
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
