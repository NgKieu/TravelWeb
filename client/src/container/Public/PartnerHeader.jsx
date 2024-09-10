import React, { useState, useEffect } from "react";
import logo from "../../assets/logo-mytour-header.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AccountDropdown from "./AccountDropdown";
import Swal from "sweetalert2";



const IconCustom = ({ classIcon, onClick }) => {
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


const PartnerHeader = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [notoken, Notoken] = useState("");



  useEffect(() => {
    if (token == null || token == "" || token == undefined) {
      Notoken(0);
      navigate("/login-business");
      Swal.fire({
        icon: 'error',
        title: 'Truy cập thất bại!',
        text: 'Tài khoản không đủ thẩm quyền',
      });
    }
    else {
      Notoken(1);
    }
  }, []);



  const [detailHotel, setdetailHotel] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/hotel_category`)
      .then((res) => setdetailHotel(res.data))
      .catch((err) => console.log(err));
  }, []);

  const emailcheck = localStorage.getItem("emailPartner");
  useEffect(() => {
    if (emailcheck == "" || emailcheck == null || emailcheck == undefined) {
      navigate("/login-business");
      Swal.fire({
        icon: 'error',
        title: 'Truy cập thất bại!',
        text: 'Tài khoản không đủ thẩm quyền',
      });
    }
  }, [navigate, emailcheck]);


  return (
    <div
      style={{
        display: "block",
      }}
    >
      <nav
        className="header font-app"
        style={{
          backgroundColor: "rgb(79, 195, 247)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
          padding: "0 1rem",
        }}
      >
        <Link to="/">
          <img
            alt="logo"
            src={logo}
            style={{
              margin: "0 0 0 1rem",
              width: "150px",
              pointerEvents: "none",
            }}
          />
        </Link>
        <ul
          style={{
            backgroundColor: "rgb(79, 195, 247)",
            display: "flex",
            alignItems: "center",
            padding: "0 2rem",
          }}
        >
          <li className="mr-[30px]">
            <IconCustom classIcon={faBell} />
          </li>
          <li>
            {/* repair */}
            {notoken == 1 ? (
              <AccountDropdown/>
            ) : null}
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default PartnerHeader;
