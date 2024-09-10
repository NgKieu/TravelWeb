import React, { useCallback } from "react";
import logo from "../../assets/MyTourVNlogo.png";
import check from "../../assets/check.png";
import { useNavigate } from "react-router-dom";

const RegisterSuccess = () => {
  const navigate = useNavigate();
  const goLoginBusiness = useCallback(() => {
    navigate("/login-business");
  }, [navigate]);

  return (
    <div
      style={{
        background: "#EEEEEE",
        width: "100%",
        height: "100vh",
        position: "relative",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          width: "500px",
          height: "400px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div
          className="image"
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            alt="logo"
            src={logo}
            style={{ width: "350px", pointerEvents: "none" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img alt="check" src={check} style={{ width: "100px" }} />
        </div>
        <p
          style={{
            position: "absolute",
            top: "70%",
            left: "40%",
            transform: "translate(-30%, -50%)",
          }}
        >
          Đăng ký tài khoản mới thành công. Vui lòng xác minh qua Email đăng ký.
        </p>
        <button
          style={{
            position: "absolute",
            top: "85%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "5px solid #FF6600",
            color: "white",
            background: "#FF6600",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
          onClick={goLoginBusiness}
        >
          Đăng nhập ngay
        </button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
