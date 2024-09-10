import React, { useState, useEffect  } from "react";
import logo from "../../assets/register.png";
import "./css/RegisterBusiness.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { path } from "../../ultils/constaint";



export default function RegisterBusiness() {
  const [isChecked, setIsChecked] = useState(false);
  const [buttonColor, setButtonColor] = useState("lightgray");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [email, setEmail] = useState("");
  const [emailveripart, setEmailVeriPart] = useState('');
  const [emailError, setEmailError] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [registerPageHeight, setRegisterPageHeight] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [cccdimg, setCccdimg] = useState(null);
  const [licenseimg, setLicenseimg] = useState(null);
  const [cccdname, setCccd] = useState(null);
  const [licensename, setLicense] = useState(null);

  const handleFileUploadCccd = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];


    if (selectedFile) {
      setCccd(selectedFile.name);
      setCccdimg(selectedFile);
    }
  };

  const handleFileUploadlinense = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLicense(selectedFile.name);
      setLicenseimg(selectedFile)
    }
  };


  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setButtonColor("#FF6600");
    } else {
      setButtonColor("lightgray");
    }
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setEmailVeriPart(value);
  };

  const handleFullNameChange = (event) => {
    const { value } = event.target;
    setFullName(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
  };

  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Kiểm tra điều kiện nhập
    let isValid = true;

    if (!fullName) {
      setFullNameError("Vui lòng nhập họ và tên.");
      isValid = false;
    } else {
      setFullNameError("");
    }

    if (!phoneNumber) {
      setPhoneNumberError("Vui lòng nhập số điện thoại.");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }

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

    if (!confirmPassword) {
      setConfirmPasswordError("Vui lòng nhập lại mật khẩu.");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Mật khẩu không khớp.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!isEmailValid(email)) {
      setEmailError("Email không hợp lệ.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (isChecked) {
      if (isValid) {
        event.preventDefault();
        axios
          .post("http://localhost:8081/register-business", {
            name: fullName,
            phone: phoneNumber,
            email: email,
            password: password,
            cccd: cccdname,
            license: licensename,
          })
          .then((response) => {
            if (response.data == "Đăng ký thành công") {
              localStorage.setItem('emailveripart', emailveripart);
              navigate('/register-success');

              const formData = new FormData();
              formData.append('cccd', cccdimg);
              axios
                .post("http://localhost:8081/uploadcccd", formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
                .then((response) => {
                })
                .catch((error) => {
                });
                const formDatalicen = new FormData();
                formDatalicen.append('license', licenseimg);
          
                axios
                  .post("http://localhost:8081/uploadlistense", formDatalicen, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
                  .then((response) => {
                  })
                  .catch((error) => {
                  });
                  axios.post('http://localhost:8081/sendemailpart', { emailveripart })
                  .then(result => {
                      if (result.data == "Gửi thành công") {
                        setRegisterPageHeight("780px");
                      }
                  })
                  .catch(error => {
                      console.log(error);
                  });

              

            } else {
              Swal.fire({
                text: "Đăng ký không thành công.",
                icon: "error",
                showConfirmButton: true,
                text: response.data,
                timer: 2000,
              });
            }
          });
      } else {
        console.log("Vui lòng điền đầy đủ thông tin.");
        setRegisterPageHeight("880px");
      }
    } else {
      console.log("Vui lòng check vào checkbox");
      setRegisterPageHeight("880px");
    }
  };

  return (
    <div className="register-page" style={{ height: registerPageHeight }}>
      <div
        className="image-container"
        style={{
          backgroundImage: `url(${logo})`,
          height: registerPageHeight,
        }}
      >
        <div className="image-text">
          <label
            style={{ fontSize: "35px", color: "white", fontWeight: "600" }}
          >
            mytour.vn <FontAwesomeIcon icon={faUmbrellaBeach} />
          </label>
          <br />
          <label
            style={{ fontSize: "25px", color: "white", fontWeight: "350" }}
          >
            for business
          </label>
        </div>
      </div>

      <div
        className="register-form-container"
        style={{ height: registerPageHeight }}
      >
        <h1 className="title">Đăng ký tài khoản mới</h1>
        <form onSubmit={handleSubmit}>
          <div className="line3">
            <div style={{ marginTop: "-10px" }}>
              <label htmlFor="name" className="form-label">
                Họ và tên
              </label>
              <span>
                &nbsp;<span style={{ color: "rgb(244, 67, 54)" }}>*</span>
              </span>
              <div style={{ position: "relative" }}>
                <input
                  id="ten-lienhe"
                  className="form-control"
                  type="text"
                  name="tenlienhe"
                  placeholder="Nhập họ và tên"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    height: "38px",
                    width: "350px",
                    paddingLeft: "8px",
                  }}
                  value={fullName}
                  onChange={handleFullNameChange}
                />
              </div>
              {fullNameError && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "1px" }}>
                  {fullNameError}
                </p>
              )}
            </div>

            <div style={{ marginTop: "10px" }}>
              <label htmlFor="phone" className="form-label">
                Số điện thoại
              </label>
              <span>
                &nbsp;<span style={{ color: "rgb(244, 67, 54)" }}>*</span>
              </span>
              <div style={{ position: "relative" }}>
                <input
                  id="sdt"
                  className="form-control"
                  type="text"
                  name="sdt"
                  placeholder="Nhập số điện thoại"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    height: "38px",
                    width: "350px",
                    paddingLeft: "8px",
                  }}
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              {phoneNumberError && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "1px" }}>
                  {phoneNumberError}
                </p>
              )}
            </div>

            <div style={{ marginTop: "10px" }}>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <span>
                &nbsp;<span style={{ color: "rgb(244, 67, 54)" }}>*</span>
              </span>
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
                  onChange={handleEmailChange}
                />
              </div>
              {emailError && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "1px" }}>
                  {emailError}
                </p>
              )}
            </div>
          </div>

          <div className="line4" style={{ marginTop: "10px" }}>
            <div>
              <label htmlFor="mat-khau" className="form-label">
                Mật khẩu
              </label>
              <span>
                &nbsp;<span style={{ color: "rgb(244, 67, 54)" }}>*</span>
              </span>
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
                  onChange={handlePasswordChange}
                />
              </div>
              {passwordError && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "1px" }}>
                  {passwordError}
                </p>
              )}
            </div>

            <div style={{ marginTop: "10px" }}>
              <label htmlFor="nhap-lai-mk" className="form-label">
                Nhập lại mật khẩu
              </label>
              <span>
                &nbsp;<span style={{ color: "rgb(244, 67, 54)" }}>*</span>
              </span>
              <div style={{ position: "relative" }}>
                <input
                  id="nhap-lai-mk"
                  className="form-control"
                  type="password"
                  name="nhaplaimk"
                  placeholder="Nhập lại mật khẩu"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    height: "38px",
                    width: "350px",
                    paddingLeft: "8px",
                  }}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              {confirmPasswordError && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "1px" }}>
                  {confirmPasswordError}
                </p>
              )}
            </div>
          </div>
          {/* Image Upload */}
          <div style={{ marginTop: "10px" }}>
            <label htmlFor="image-upload" className="form-label">
              Upload giấy phép kinh doanh
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              value={null}
              onChange={handleFileUploadlinense} 
              style={{ marginTop: "8px" }}
            />
          </div>
          {/* Image Upload */}
          <div style={{ marginTop: "10px" }}>
            <label htmlFor="image-upload" className="form-label">
              Upload CCCD
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              value={null}
              onChange={handleFileUploadCccd}
              style={{ marginTop: "8px" }}
            />
            {/* <button onClick={handleUploadImg}>Up anh</button> */}
            {/* You can add any necessary error handling or display logic here */}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                style={{
                  width: "18px",
                  height: "18px",
                  marginTop: "18px",
                  marginRight: "2px",
                }}
              />
              Tôi đồng ý với điều khoản & điều kiện của Mytour for Business
            </label>
          </div>

          <button
            type="submit"
            className="submit-btn"
            style={{ backgroundColor: buttonColor, marginTop: "10px" }}
            disabled={!isChecked}
          >
            Gửi thông tin đăng ký
          </button>

          <div style={{ marginTop: "12px" }}>
            <hr style={{ width: "250px" }} />
            <p>
              Bạn đã có tài khoản?{" "}
              <Link style={{ color: "#0099FF" }} to="/login-business">
                Đăng nhập ngay
              </Link>{" "}
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
