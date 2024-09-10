import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const IconCustom = ({ classIcon}) => {
  const iconSize = {
    width: "20px",
    height: "30px",
    color: "white",
  };

  return (
    <span>
      <FontAwesomeIcon icon={classIcon} style={iconSize} />
    </span>
  );
};

export default function AccountDropdown() {
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  const handleAccountClick = () => {
    setShowAccountInfo(!showAccountInfo);
  };

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");
  // console.log("trang account " + token);

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

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          Swal.fire({
            text: "Đăng xuất thành công.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
            navigate("/login-business");
            localStorage.removeItem("emailPartner");
            localStorage.removeItem("token");
        } else {
          Swal.fire({
            text: "Đăng xuất thất bại.",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="relative" onClick={handleAccountClick}>
      <IconCustom
        classIcon={faUser}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
      />
      {showAccountInfo && (
        <div className="absolute top-full right-0 bg-white border border-gray-300 rounded mt-2 p-2 w-48">
          {data.map((item) => (
            <>
              <p className="mb-2">Tên: {item.Partner_Name}</p>
              <p className="mb-2">Email: {item.Partner_Email}</p>
            </>
          ))}

          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
