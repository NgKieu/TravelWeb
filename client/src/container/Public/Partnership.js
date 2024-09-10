import React, { useState } from "react";
import Header from "./Header";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import icon from "../../assets/icon_logo_mytour_red_medium.png";

import ft1 from "../../assets/logo-dathongbao-bocongthuong-w165.png";
import ft2 from "../../assets/logo-congthuong-w165.png";
import ft3 from "../../assets/icon_company_group_l-_1_.png";

import li1 from "../../assets/loiich1.png";
import li2 from "../../assets/loiich2.png";
import li3 from "../../assets/loiich3.png";
import li4 from "../../assets/loiich4.png";

import table from "../../assets/icon_mytable.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const IconCustom = ({ classIcon }) => {
  const iconSize = {
    width: "15px",
    height: "16px",
    margin: "10px",
  };

  return (
    <span>
      <FontAwesomeIcon icon={classIcon} style={iconSize} />
    </span>
  );
};

const Partnership = () => {
  return (
    <div className="w-full">
      <div className="header font-app m-auto w-full">
        <Header />
      </div>
      <div className="middle ">
        <div className="flex mt-[96px] w-full h-[542px] justify-center ">
          <div className="relative">
            <div className="absolute font-app text-[#ffffff] font-normal w-[319px] translate-y-[30%] translate-x-[50%]">
              <p className="text-[38px] leading-[52px]">
                <b>Phát triển Business của bạn với Mytour</b>
              </p>
              <div className="flex">
                <IconCustom classIcon={faCheck} />
                <p className="text-[14px] leading-[36px]">
                  Đăng ký hoàn toàn miễn phí trong 15 <br />
                  phút.
                </p>
              </div>
              <div className="flex">
                <IconCustom classIcon={faCheck} />
                <p className="text-[14px] leading-[36px]">
                  Tiếp cận hàng triệu khách hàng tiềm <br />
                  năng.
                </p>
              </div>
              <div className="flex">
                <IconCustom classIcon={faCheck} />
                <p className="text-[14px] leading-[36px]">
                  Dễ dàng quản lý mọi nơi
                </p>
              </div>
            </div>
            <img src={img1} alt="logo" className="w-[605px] h-[542px] " />
          </div>
          <img src={img2} alt="logo" className="w-[926px] " />
        </div>
      </div>
      <div className="three mt-[50px] mb-[50px]">
        <div className="flex justify-center">
          <button className=" text-[#212121] font-app text-[14px] not-italic font-medium w-[198px] h-[106px] rounded-[5px] items-center">
            <img
              src={table}
              alt="logo"
              className="w-[40px] h-[40px] m-auto mb-[10px]"
            />
            <b>Khách sạn</b>
          </button>
          <button className=" text-[#212121] font-app text-[14px] not-italic font-medium w-[198px] h-[106px] rounded-[5px] items-center">
            <img
              src={table}
              alt="logo"
              className="w-[40px] h-[40px] m-auto mb-[10px]"
            />
            <b>MyTable-Nhà hàng</b>
          </button>
          <button className="a text-[#212121] font-app text-[14px] not-italic font-medium w-[198px] h-[106px] rounded-[5px] items-center">
            <img
              src={table}
              alt="logo"
              className="w-[40px] h-[40px] m-auto mb-[10px]"
            />
            <b>Vé máy bay</b>
          </button>
          <button className="s text-[#212121] font-app text-[14px] not-italic font-medium w-[198px] h-[106px] rounded-[5px] items-center">
            <img
              src={table}
              alt="logo"
              className="w-[40px] h-[40px] m-auto mb-[10px]"
            />
            <b>Trải nghiệm</b>
          </button>
          <button className="c text-[#212121] font-app text-[14px] not-italic font-medium w-[198px] h-[106px] rounded-[5px] items-center">
            <img
              src={table}
              alt="logo"
              className="w-[40px] h-[40px] m-auto mb-[10px]"
            />
            <b>Phương tiện</b>
          </button>
          <button className="g text-[#212121] font-app text-[14px] not-italic font-medium w-[198px] h-[106px] rounded-[5px] items-center">
            <img
              src={table}
              alt="logo"
              className="w-[40px] h-[40px] m-auto mb-[10px]"
            />
            <b>Khuyến mãi</b>
          </button>
        </div>
        <div id="khachsan"></div>
        <div id="nhahang"></div>
        <div id="vemaybay"></div>
        <div id="trainghiem"></div>
        <div id="phuongtien"></div>
        <div id="khuyenmai"></div>
      </div>
      <div className="four mb-[100px] m-auto">
        <p className="font-app text-[24px] font-semibold text-[#212121] not-italic leading-[29px] mb-[40px] translate-x-[13%] w-[1188px]">
          Tại sao nên hợp tác cùng chúng tôi
        </p>
        <div className="flex justify-center">
          <div className="w1 mr-[30px]">
            <div className="m-[20px] translate-y-[270px]">
              <p className="font-app text-[30px] font-semibold text-[#ffffff] not-italic leading-[36px] ">
                25.000.000+
              </p>
              <p className="font-app text-[14px] font-normal text-[#ffffff] not-italic leading-[17px]">
                Khách hàng để tiếp cận
              </p>
            </div>
          </div>
          <div className="w2 mr-[30px]">
            <div className="m-[20px] translate-y-[270px]">
              <p className="font-app text-[30px] font-semibold text-[#ffffff] not-italic leading-[36px] ">
                10.000+
              </p>
              <p className="font-app text-[14px] font-normal text-[#ffffff] not-italic leading-[17px]">
                Đối tác truyền thông
              </p>
            </div>
          </div>
          <div className="w3 mr-[30px]">
            <div className="m-[20px] translate-y-[270px]">
              <p className="font-app text-[30px] font-semibold text-[#ffffff] not-italic leading-[36px]">
                20.000+
              </p>
              <p className="font-app text-[14px] font-normal text-[#ffffff] not-italic leading-[17px]">
                Nhà cung cấp sản phẩm về du lịch, dịch vụ, nhà hàng
              </p>
            </div>
          </div>
          <div className="w4">
            <div className="m-[20px] translate-y-[270px]">
              <p className="font-app text-[30px] font-semibold text-[#ffffff] not-italic leading-[36px]">
                50.000+
              </p>
              <p className="font-app text-[14px] font-normal text-[#ffffff] not-italic leading-[17px]">
                Booking mỗi tháng
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="five mb-[100px] w-[1216px] m-auto">
        <p className="font-app text-[24px] font-semibold text-[#212121] not-italic leading-[29px]">
          Lợi ích khi hợp tác cùng chúng tôi
        </p>
        <p className="font-app text-[14px] font-normal text-[#4a5568] not-italic leading-[17px] mb-[20px]">
          Chất lượng và uy tín là ưu tiên hàng đầu
        </p>
        <div className="flex ">
          <div className="w-[264px] h-[232px] mr-[50px]">
            <img src={li1} alt="logo" className="w-[72px] h-[72px] mb-[30px]" />
            <p className="font-app text-[18px] not-italic items-center leading-[21px] font-semibold mb-[20px]">
              Đăng ký bất kỳ chỗ nghỉ nào
            </p>
            <p className="font-app text-[14px] not-italic items-center leading-[22px] font-normal text-[#4a5568]">
              Từ căn hộ cho đến biệt thự và các <br />
              loại chỗ nghỉ khác đều có thể được <br />
              đăng miễn phí.
            </p>
          </div>
          <div className="w-[264px] h-[232px] mr-[50px]">
            <img src={li2} alt="logo" className="w-[72px] h-[72px] mb-[30px]" />
            <p className="font-app text-[18px] not-italic  items-center leading-[21px] font-semibold mb-[20px]">
              Nhập thông tin dễ dàng
            </p>
            <p className="font-app text-[14px] not-italic items-center leading-[22px] font-normal text-[#4a5568]">
              Để tiết kiệm thời gian, Quý vị có thể <br />
              nhập nhiều thông tin từ các đăng ký <br />
              có sẵn.
            </p>
          </div>
          <div className="w-[264px] h-[232px] mr-[50px]">
            <img src={li3} alt="logo" className="w-[72px] h-[72px] mb-[30px]" />
            <p className="font-app text-[18px] not-italic items-center leading-[21px] font-semibold mb-[20px]">
              Hướng dẫn từng bước
            </p>
            <p className="font-app text-[14px] not-italic  items-center leading-[22px] font-normal text-[#4a5568]">
              Quý vị sẽ được biết cách thức hoạt <br />
              động của trang chúng tôi, các <br />
              phương pháp thực hành tốt nhất và <br />
              những điều cần chú ý.
            </p>
          </div>
          <div className="w-[264px] h-[232px] mr-[50px]">
            <img src={li4} alt="logo" className="w-[72px] h-[72px] mb-[30px]" />
            <p className="font-app text-[18px] not-italic items-center leading-[21px] font-semibold mb-[20px]">
              Giảm giá đặc biệt
            </p>
            <p className="font-app text-[14px] not-italic items-center leading-[22px] font-normal text-[#4a5568]">
              Được giảm giá cho các sản phẩm và
              <br /> dịch vụ giúp tiết kiệm thời gian cho <br />
              Quý vị và cải thiện trải nghiệm cho <br />
              khách.
            </p>
          </div>
        </div>
      </div>
      <div className="six">
        <div className="translate-y-[70px] translate-x-[5%]">
          <p className="font-app text-[26px] leading-[14px] text-[#ffffff] w-[500px]">
            <b>Đối tác Mytour nói gì?</b>
          </p>
        </div>
      </div>
      <div className="seven ">
        <div className="translate-y-[80%] translate-x-[5%]">
          <p className="font-app text-[44px] leading-[64px] text-[#ffffff] w-[500px] ">
            <b>Hãy để Mytour đồng hành cùng bạn!</b>
          </p>
          <button className="menuList text-[#ffffff] bg-[#ff3366] font-app text-[18px] not-italic font-medium w-[148px] h-[48px] rounded-[5px] items-center ">
            <b>Đăng ký ngay</b>
          </button>
        </div>
      </div>

      <div className="footer-partnership font-app w-full m-auto  bg-[#f7fafc]">
        <div className="ft1">
          <img
            src={icon}
            alt="logo"
            className="w-[165px] h-[44px] ml-[300px] mb-[40px]"
          />
        </div>
        <div className="flex justify-center h-[248px]">
          <div className="right">
            <p className="font-medium text-[14px] leading-[20px] ">
              <b>Công ty cổ phần du lịch Việt Nam VNTravel</b>
            </p>
            <p className="text-[14px] leading-[24px] ">
              Tổng đài chăm sóc: 1900 2083
            </p>
            <p className="text-[14px] leading-[24px] ">
              Email: hotro@mytour.vn
            </p>
            <p className="text-[14px] leading-[24px] ">
              Văn phòng Hà Nội: Tầng 11, Tòa Peakview, 36 Hoàng Cầu, Đống
              <br />
              Đa
            </p>
            <p className="text-[14px] leading-[24px] ">
              Văn phòng HCM: Tầng 3, Tòa nhà ACM, 96 Cao Thắng, Quận 3
            </p>
            <div className="flex w-[160px] h-[61px]">
              <img src={ft1} alt="logo" />
              <img src={ft2} alt="logo" />
            </div>
          </div>
          <div className="center ml-[100px] mr-[100px]">
            <p className="font-medium text-[14px] leading-[20px] ">
              <b>Chính sách & Quy định</b>
            </p>
            <p className="text-[14px] leading-[24px] ">
              Điều khoản và điều kiện
            </p>
            <p className="text-[14px] leading-[24px] ">
              Quy định về thanh toán
            </p>
            <p className="text-[14px] leading-[24px] ">
              Chính sách bảo mật thông tin
            </p>
            <p className="text-[14px] leading-[24px]">Quy chế hoạt động</p>
            <p className="text-[14px] leading-[24px] ">
              Chương trình khách hàng thân thiết
            </p>
          </div>
          <div className="left">
            <p className="font-medium text-[14px] leading-[20px] ">
              <b>Khách hàng và đối tác</b>
            </p>
            <p className="text-[14px] leading-[24px] ">Đăng nhập HMS</p>
            <p className="text-[14px] leading-[24px]">Tuyển dụng</p>
          </div>
        </div>

        <hr className="w-[80%] m-auto mb-[30px]" />
        <div className="f2 h-[140px] w-full m-auto ">
          <p className="font-app text-[14px] font-normal text-[#212121] not-italic leading-[18px] text-center mb-[20px]">
            Mytour là thành viên của VNTravel Group - Một trong những tập đoàn
            đứng đầu Đông Nam Á về du lịch trực tuyến và các dịch vụ liên quan.
          </p>
          <img
            src={ft3}
            alt="logo"
            className="w-[392px] h-[32px] m-auto mb-[20px]"
          />
          <p className="font-app text-[14px] font-normal text-[#212121] not-italic leading-[18px] text-center">
            Copyright © 2020 - CÔNG TY CỔ PHẦN DU LỊCH VIỆT NAM VNTRAVEL - Đăng
            ký kinh doanh số 0108886908 - do Sở Kế hoạch và Đầu tư thành phố Hà
            Nội cấp lần đầu ngày 04 tháng 09 năm 2019
          </p>
        </div>
      </div>
    </div>
  );
};

export default Partnership;
