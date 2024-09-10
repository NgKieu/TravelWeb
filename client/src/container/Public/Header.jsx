import React, { useCallback, useState } from "react";
import logo from "../../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faPercent,
  faHandshake,
  faBriefcase,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constaint";
import Swal from 'sweetalert2';
import "./css/Header.css";
import axios from "axios";


const IconNav = ({ classIcon }) => {
  const iconSize = {
    width: "16px",
    height: "16px",
  };

  return (
    <span>
      <FontAwesomeIcon icon={classIcon} style={iconSize} />
    </span>
  );
};


const IconShowDiv = () => {
  const iconSize = {
    width: "16px",
    height: "16px",
  };

  return (
    <span>
      <FontAwesomeIcon icon={faSortDown} style={iconSize} />
    </span>
  );
};

const Header = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
  });

  const goHome = useCallback(() => {
    navigate(path.HOME);
  });


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const goheaderBusiness = useCallback(() => {
    // Sau dat if isLoggedIn
    window.open(path.BUSINESS, "_blank");
  });

  const goSearchHotel = useCallback(() => {
    // Sau dat if isLoggedIn
    localStorage.setItem('inputSearch', "");
    localStorage.setItem('numPeopleSearch', 0);
    localStorage.setItem('numRoomSearch', 0);
    window.open(path.SHOWALLHOTEL, "_blank");
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const goPartnership = useCallback(() => {
    navigate(path.PARTNERSHIP);
  });
  const tenkh = localStorage.getItem("hoten");
  function goLogout() {
    navigate(path.HOME)
    localStorage.removeItem("email");
    localStorage.removeItem("idUser");
    localStorage.removeItem("hoten");
    localStorage.removeItem("sdt");
    localStorage.removeItem("matkhau");
    localStorage.removeItem("role");
    Swal.fire({
      title: 'Đăng xuất thành công!',
      text: '',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      navigate('/home');
    });
  }
  const [isDivVisible, setIsDivVisible] = useState(false);
  const showdiv = () => {
    setIsDivVisible(!isDivVisible);
  };

  const role = localStorage.getItem("role");
  const goAdmin = useCallback(() => {
    navigate(path.ADMIN);
  });

  function goChange() {
    navigate('/changeinfo');
  }

  const goBookingHistory = () => {
    if (localStorage.getItem("idUser") == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn chưa đăng nhập!',
      })
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
    else {
      axios
        .post('http://localhost:8081/showBookingHistory', {
          userID: localStorage.getItem('idUser')
        })
        .then(res => {
          navigate(path.BOOKINGHISTORY);

        })
        .catch(err => console.log(err));
    }

  }

  const goFavorites = () => {
    if (localStorage.getItem("idUser") == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn chưa đăng nhập!',
      })
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
    else {
      navigate('/favorite');
    }
  }

  return (
    <div className="header w-full h-[96px] px-[60px] fixed z-50 top-0 bg-white shadow1">
      <div className="flex item-center justify-between  py-[8px]">
        <img src={logo} alt="logo" onClick={goHome} className="w-[143px] h-[40px] cursor-pointer" />
        <div className="flex item-center gap-3">

          <span
            className="m-[2px] ease-in-out duration-300 p-1 px-5 py-[6px] text-center items-center rounded-[20px] hover:bg-[#eaf1f4] cursor-pointer"
            onClick={goPartnership}
          >
            <IconNav classIcon={faHandshake} /> Hợp tác với chúng tôi
          </span>
          <span
            className="m-[2px] ease-in-out duration-300 p-1 px-5 py-[6px] text-center items-center rounded-[20px] hover:bg-[#eaf1f4] cursor-pointer"
            onClick={goheaderBusiness}
          >
            <IconNav classIcon={faBriefcase} /> Khách hàng doanh nghiệp
          </span>
          <span onClick={goBookingHistory} className="m-[2px] ease-in-out duration-300 p-1 px-5 py-[6px] text-center items-center rounded-[20px] hover:bg-[#eaf1f4] cursor-pointer">
            <IconNav classIcon={faFileLines} /> Đơn hàng
          </span>
          {tenkh ? (
            <div className="flex items-center">
              <a id="atenkh" style={{ fontWeight: '600' }}>{tenkh}</a>
              <button className="mt-[-5px]"
                // className="ml-2 w-[104px] h-[40px] items-center font-[600] bg-[#FF3366] text-[#fff] rounded-[8px] text-[14px]"
                onClick={showdiv}
              >
                <IconShowDiv classIcon={faSortDown} />
              </button>
              {isDivVisible && (
                <div className="fixed top-10 right-10">
                  <div className="bg-white rounded-lg p-4">
                    {role === '0' ? (
                      <>
                        <button className="mb-2" onClick={goAdmin}>Admin</button>
                        <br />
                      </>
                    ) : null}
                    <button className="mb-2" onClick={goChange}>Tài khoản</button><br></br>
                    <button className="mb-2">Yêu thích</button><br></br>
                    <button className="mb-2" onClick={goLogout}>Đăng xuất</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <React.Fragment>
              <button
                className="w-[104px] h-[40px] items-center font-[600] bg-[#FF3366] text-[#fff] rounded-[8px] text-[14px]"
                onClick={goLogin}
              >
                Đăng nhập
              </button>
              <button
                className="w-[104px] h-[40px] items-center font-[600] border-solid border border-[#FF3366] rounded-[8px] text-[#FF3366] text-[14px]"
                onClick={goLogin}
              >
                Đăng ký
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="h-[40px] flex">
        <span onClick={goSearchHotel} className="py-[6px] ease-in-out duration-300 pr-8 font-[600] items-center rounded-[20px] hover:text-[#FF3366] cursor-pointer">
          {" "}
          Khách sạn
        </span>
        <span onClick={goFavorites} className="py-[6px] ease-in-out duration-300 pr-8 font-[600] items-center rounded-[20px] hover:text-[#FF3366] cursor-pointer">
          {" "}
          Danh sách khách sạn yêu thích
        </span>
        {/* <span className="py-[6px] ease-in-out duration-300 pr-8 font-[600] items-center rounded-[20px] hover:text-[#FF3366] cursor-pointer">
          {" "}
          Biệt thự, Homestay
        </span>
        
        <span className="py-[6px] ease-in-out duration-300 pr-8 font-[600] items-center rounded-[20px] hover:text-[#FF3366] cursor-pointer">
          {" "}
          Tour, Sự kiện
        </span> */}
      </div>
    </div>
  );
};
export default Header;
