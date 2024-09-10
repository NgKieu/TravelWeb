import React, { useCallback } from "react";
import logo from "../../assets/Layer-2.png";
import img2 from "../../assets/Rectangle-377-1.jpg";
import img1 from "../../assets/businesstravel.jpg";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constaint";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import icon1 from "../../assets/Group-5.png";
import icon2 from "../../assets/Group-1682.png";
import icon3 from "../../assets/Group-1681.png";
import icon4 from "../../assets/Group-1680.png";

import iphone from "../../assets/iPhone-11-Pro-1.png";
import li1 from "../../assets/LI-8.png";
import li2 from "../../assets/LI-1.png";
import li3 from "../../assets/LI-2.png";
import li4 from "../../assets/LI-3.png";
import li5 from "../../assets/LI-4.png";
import li6 from "../../assets/LI-5.png";
import li7 from "../../assets/LI-6.png";
import li8 from "../../assets/LI-7.png";

import lap from "../../assets/Group-1758.png";
import tn1 from "../../assets/Group-9.png";
import tn2 from "../../assets/Group-1751.png";
import tn3 from "../../assets/Group-1750.png";
import tn4 from "../../assets/Layer-7.png";
import tn5 from "../../assets/flaticon_2285491-1.png";
import tn6 from "../../assets/Group-1727.png";

import lap2 from "../../assets/Group-1754.png";
import tn11 from "../../assets/flaticon_1589043-1.png";
import tn12 from "../../assets/flaticon_4007984-1.png";
import tn13 from "../../assets/flaticon_664460-1.png";
import tn14 from "../../assets/flaticon_263074-1.png";

import dt1 from "../../assets/1.png";
import dt2 from "../../assets/2.png";
import dt3 from "../../assets/3.png";
import dt4 from "../../assets/4.png";
import dt5 from "../../assets/5.png";
import dt6 from "../../assets/6.png";
import dt7 from "../../assets/7.png";
import dt8 from "../../assets/8.png";
import dt9 from "../../assets/9.png";
import dt10 from "../../assets/10.png";
import dt11 from "../../assets/11.png";
import dt12 from "../../assets/12.png";

import Slider from "react-slick";
import kh1 from "../../assets/Group-1698.png";
import kh2 from "../../assets/Group-1701.png";
import kh3 from "../../assets/Group-1699.png";

import tt1 from "../../assets/a06370d9-15a7-498d-8993-5b41ad8f2b5c.png";
import cd from "../../assets/Calendar.png";
import lg from "../../assets/Logo-blue-2.png";

import lh1 from "../../assets/Group-1354.png";
import lh2 from "../../assets/Group-1189.png";
import lh3 from "../../assets/Group-1192.png";
import lh4 from "../../assets/Group-1193.png";
import lh5 from "../../assets/Group-1355.png";
import lh6 from "../../assets/Group-1191.png";
import lh7 from "../../assets/Group-1194.png";
import lh8 from "../../assets/Group-1195.png";
import lh9 from "../../assets/Group-1196.png";
import lh10 from "../../assets/Group-1186.png";

const HeaderBusiness = () => {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveTab(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const goLoginBusiness = useCallback(() => {
    navigate(path.LOGINBUSINESS);
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const goRegisterBusiness = useCallback(() => {
    navigate(path.REGISTERBUSINESS);
  });

  const carousel = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="header absolute w-full ">
      <div className="headerMenu flex fixed justify-between items-center h-[85px] list-none bg-white shadow-md w-full">
        <Link
          to="banner"
          className={activeTab === "banner" ? "active" : ""}
          smooth={true}
          duration={500}
        >
          <img
            src={logo}
            alt="logo"
            className="h-[28px] w-[260px] ml-[168px] cursor-pointer"
          />
        </Link>
        <div className="menu flex gap-8 mr-[100px] items-center">
          <li
            className={activeTab === "vechungtoi" ? "active" : ""}
            class="active"
          >
            <Link
              to="vechungtoi"
              className="menuList font-roboto text-sm font-normal not-italic"
              smooth={true}
              duration={500}
            >
              VỀ CHÚNG TÔI
            </Link>
          </li>
          <li className={activeTab === "loiich" ? "active" : ""}>
            <Link
              to="loiich"
              className="menuList font-roboto text-sm font-normal not-italic"
              smooth={true}
              duration={500}
            >
              LỢI ÍCH
            </Link>
          </li>
          <li className={activeTab === "tinhnang" ? "active" : ""}>
            <Link
              to="tinhnang"
              className="menuList font-roboto text-sm font-normal not-italic"
              smooth={true}
              duration={500}
            >
              TÍNH NĂNG
            </Link>
          </li>
          <li className={activeTab === "sanpham" ? "active" : ""}>
            <Link
              to="sanpham"
              className="menuList font-roboto text-sm font-normal not-italic"
              smooth={true}
              duration={500}
            >
              SẢN PHẨM
            </Link>
          </li>
          <li className={activeTab === "doitac" ? "active" : ""}>
            <Link
              to="doitac"
              className="menuList font-roboto text-sm font-normal not-italic"
              smooth={true}
              duration={500}
            >
              ĐỐI TÁC
            </Link>
          </li>
          <li className={activeTab === "tintuc" ? "active" : ""}>
            <Link
              to="tintuc"
              className="menuList font-roboto text-sm font-normal not-italic"
              smooth={true}
              duration={500}
            >
              TIN TỨC
            </Link>
          </li>
          <li className={activeTab === "khachhang" ? "active" : ""}>
            <Link
              to="khachhang"
              className="menuList font-roboto text-sm font-normal not-italic"
              smooth={true}
              duration={500}
            >
              KHÁCH HÀNG
            </Link>
          </li>
          <li className={activeTab === "lienhe" ? "active" : ""}>
            <Link
              to="lienhe"
              className="menuList font-roboto text-sm font-normal not-italic"
              smooth={true}
              duration={500}
            >
              LIÊN HỆ
            </Link>
          </li>
          <button
            className="menuList text-[#ffffff] bg-[#ff3366] font-roboto text-sm not-italic font-medium w-[121px] h-[36px] rounded-[180px] items-center"
            onClick={goLoginBusiness}
          >
            ĐĂNG NHẬP
          </button>
        </div>
      </div>

      <section id="banner">
        <div className="background">
          <div className="text mt-[130px] ml-[190px]">
            <span className="textdetail text-[#ffffff] font-roboto not-italic font-bold text-[53px] leading-[76px] max-w-xs ">
              {" "}
              GIẢI PHÁP <br />
              QUẢN LÝ <br />
              CÔNG TÁC PHÍ <br />
              #1 VIỆT NAM <br />
            </span>
            <button
              className="button text-[#ff3366] bg-[#ffffff] font-roboto text-base not-italic font-medium w-[220px] h-[60px] rounded-[180px] items-center mt-[30px]"
              onClick={goRegisterBusiness}
            >
              ĐĂNG KÝ NGAY
            </button>
          </div>
          <div className="img mt-[100px] ml-[85px]">
            <img src={img1} alt="logo" className="h-[461px] w-[888px]" />
          </div>
        </div>
      </section>

      <section id="vechungtoi">
        <div className="about ">
          <div className="h-[698px]">
            <p className="font-roboto text-4xl font-normal text-[#212121] not-italic text-center">
              <br />
              <br />
              VỀ CHÚNG TÔI
            </p>
            <div className="one justify-center h-[600px]">
              <motion.div className="one_1 flex mt-[70px] justify-center">
                <div className="imgAbout">
                  <img src={img2} alt="img" className="w-[555px] h-[415px] " />
                </div>
                <div className="textAbout w-[540px] h-[397px] ml-[50px]">
                  <p className="font-roboto text-[#212121] text-[24px] font-normal leading-[26px]">
                    Mytour for Business là gì?
                  </p>
                  <p className="font-roboto text-[#212121] text-sm font-normal not-italic leading-[24px] h-[72px] mt-[10px]">
                    Kế thừa và phát triển từ nền tảng công nghệ của Mytour, đội
                    ngũ kĩ sư và quản trị viên đã xây dựng Mytour for Business -
                    ứng dụng tiên phong đầu tiên tại Việt Nam giúp các doanh
                    nghiệp quản lý chi phí công tác hiệu quả nhất.
                  </p>
                  <p className="font-roboto text-[#212121] text-[24px] font-normal leading-[26px] mt-[30px]">
                    Mytour for Business mang đến điều gì?
                  </p>
                  <p className="font-roboto text-[#212121] text-sm font-normal not-italic leading-[24px] mt-[10px]">
                    Mytour for Business hỗ trợ doanh nghiệp quản lý, tiết kiệm,
                    minh bạch chi phí và tối giản quy trình nội bộ cho mỗi
                    chuyến công tác chỉ với một giải pháp đơn giản.
                  </p>
                  <p className="font-roboto text-[#212121] text-[24px] font-normal leading-[26px] mt-[30px]">
                    Nền tảng Mytour?
                  </p>
                  <p className="font-roboto text-[#212121] text-sm font-normal not-italic leading-[24px] mt-[10px]">
                    Mytour là doanh nghiệp tập trung phát triển nền tảng công
                    nghệ kinh doanh du lịch trực tuyến, với cương vị đại lý Công
                    Nghệ hàng đầu của các hãng hàng không từ 2015, đối tác chiến
                    lược của Hiệp Hội Du Lịch Việt Nam và được biết đến là sản
                    phẩm Chợ Du Lịch trực tuyến.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="two h-[594px]">
            <p className="font-roboto text-4xl font-normal text-[#212121] not-italic text-center mb-[50px]">
              <br />
              <br />
              TẠI SAO CHỌN MYTOUR FOR BUSINESS?
            </p>
            <div className="goptext flex justify-center">
              <div className="left">
                <div className="flex">
                  <div className="h-[50px] w-[60px] mr-[80px]">
                    <img src={icon1} alt="logo" />
                  </div>
                  <div>
                    <p className="font-roboto text-base font-bold text-[#212121] not-italic">
                      RÕ RÀNG, MINH BẠCH
                    </p>
                    <p className="font-roboto text-[#212121] text-sm font-normal not-italic leading-[24px] mt-[10px] w-[422px] mb-[50px]">
                      Quy trình chuẩn bị cho chuyến công tác được thể hiện rõ
                      ràng ngay trên ứng dụng. Tất cả giao dịch đều có hóa đơn
                      VAT và được báo cáo một cách minh bạch.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="h-[50px] w-[60px] mr-[80px]">
                    <img src={icon3} alt="logo" />
                  </div>
                  <div>
                    <p className="font-roboto text-base font-bold text-[#212121] not-italic">
                      THUẬN TIỆN TỐI ĐA
                    </p>
                    <p className="font-roboto text-[#212121] text-sm font-normal not-italic leading-[24px] mt-[10px] w-[422px]">
                      Mọi nhân viên có thể chủ động đặt vé, phòng khách sạn mà
                      không cần thông qua trợ lý hành chính, thao tác phê duyệt
                      được thực hiện ngay trên ứng dụng một cách nhanh chóng.
                    </p>
                  </div>
                </div>
              </div>
              <div className="right ml-[30px]">
                <div className="flex">
                  <div className="h-[50px] w-[60px] mr-[80px]">
                    <img src={icon2} alt="logo" />
                  </div>
                  <div>
                    <p className="font-roboto text-base font-bold text-[#212121] not-italic">
                      KIỂM SOÁT CHẶT CHẼ
                    </p>
                    <p className="font-roboto text-[#212121] text-sm font-normal not-italic leading-[24px] mt-[10px] w-[422px] mb-[50px]">
                      Phân bổ hạn mức cho từng nhân sự, quy trình phê duyệt chặt
                      chẽ liên phòng ban từ trưởng bộ phận, CEO, kế toán giúp
                      kiểm soát chi phí chặt chẽ
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="h-[50px] w-[60px] mr-[80px]">
                    <img src={icon4} alt="logo" />
                  </div>
                  <div>
                    <p className="font-roboto text-base font-bold text-[#212121] not-italic">
                      HÀNH TRÌNH HOÀN HẢO
                    </p>
                    <p className="font-roboto text-[#212121] text-sm font-normal not-italic leading-[24px] mt-[10px] w-[422px]">
                      Trên nền tảng công nghệ AI 4.0, Mytour for Business phân
                      tích lịch sử đặt vé, đặt phòng, sở thích, ngân sách của
                      bạn từ đó gợi ý chuyến đi và dịch vụ tốt nhất.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="three h-[343px]">
            <p className="font-roboto text-4xl font-normal text-[#212121] not-italic text-center">
              <br />
              <br />
              MYTOUR FOR BUSINESS - LỰA CHỌN HOÀN HẢO
            </p>
            <div className="all flex justify-center  text-center mt-[20px]">
              <div className="w-[312px] h-[48px] ">
                <p className="font-roboto font-bold text-[60px] leading-[120px] text-[#ff3366] not-italic ">
                  50%
                </p>
                <p className="font-roboto font-normal text-[18px] leading-[24px] text-[#212121] not-italic mt-[-20px]">
                  Thời gian được <br />
                  tiết kiệm
                </p>
              </div>
              <div className="w-[312px] h-[48px]">
                <p className="font-roboto font-bold text-[60px] leading-[120px] text-[#ff3366] not-italic">
                  2400
                </p>
                <p className="font-roboto font-normal text-[18px] leading-[24px] text-[#212121] not-italic mt-[-20px]">
                  Giờ nghỉ ngơi <br />
                  tăng thêm
                </p>
              </div>
              <div className="w-[312px] h-[48px] ">
                <p className="font-roboto font-bold text-[60px] leading-[120px] text-[#ff3366] not-italic">
                  30
                </p>
                <p className="font-roboto font-normal text-[18px] leading-[24px] text-[#212121] not-italic first-line mt-[-20px]">
                  Phút chuẩn bị <br />
                  chuyến công tác
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="loiich">
        <p className="font-roboto text-4xl font-normal text-[#212121] not-italic text-center">
          <br />
          <br />
          <br />
          TIỆN ÍCH TỪ MYTOUR FOR BUSINESS
        </p>
        <div className="all flex justify-center mt-[60px]">
          <div className="left text-right mr-[30px]">
            <img src={li1} alt="logo" className="ml-[75%] w-[120px] h-[40px]" />
            <p className="font-roboto text-[16px] font-bold text-[#212121] not-italic leading-[30px] ">
              Đặt chuyến đi dễ dàng
            </p>
            <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[18px] mb-[20px]">
              Gợi ý và so sánh giá từ 20,000+ nhà cung cấp với mức giá ưu đãi.
            </p>
            <img src={li2} alt="logo" className="ml-[75%] w-[120px] h-[40px]" />
            <p className="font-roboto text-[16px] font-bold text-[#212121] not-italic leading-[30px] ">
              Báo cáo chi tiết
            </p>
            <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[18px] mb-[20px]">
              Báo cáo trực quan, chi tiết theo thời gian, nhân sự và hạng mục
              chi phí.
            </p>
            <img src={li3} alt="logo" className="ml-[75%] w-[120px] h-[40px]" />
            <p className="font-roboto text-[16px] font-bold text-[#212121] not-italic leading-[30px]">
              Hóa đơn VAT tự động
            </p>
            <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[18px] mb-[20px]">
              Tự động xuất hóa đơn sau khi chuyến đi kết thúc
            </p>
            <img src={li4} alt="logo" className="ml-[75%] w-[120px] h-[40px]" />
            <p className="font-roboto text-[16px] font-bold text-[#212121] not-italic leading-[30px] ">
              Thanh toán tiện lợi
            </p>
            <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[18px] mb-[20px]">
              Nạp tài khoản Mytour for Business hoặc tài khoản ngân hàng, thẻ
              Visa/Master card
            </p>
          </div>
          <div className="center">
            <img src={iphone} alt="logo" className="h-[510px] w-[262px]" />
          </div>
          <div className="right ml-[30px]">
            <img src={li5} alt="logo" className="w-[120px] h-[40px]" />
            <p className="font-roboto text-[16px] font-bold text-[#212121] not-italic leading-[30px] text-left">
              Tra cứu thuận tiện
            </p>
            <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[18px] text-left mb-[20px]">
              Lưu lại lịch sử cho phép tìm kiếm, tra soát và quản lý giao dịch
            </p>
            <img src={li6} alt="logo" className="w-[120px] h-[40px]" />
            <p className="font-roboto text-[16px] font-bold text-[#212121] not-italic leading-[30px] text-left">
              Nền tảng linh hoạt
            </p>
            <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[18px] text-left mb-[20px]">
              Sử dụng linh hoạt mọi lúc mọi nơi với phiên bản Web portal và
              mobile apps.
            </p>
            <img src={li7} alt="logo" className="w-[120px] h-[40px]" />
            <p className="font-roboto text-[16px] font-bold text-[#212121] not-italic leading-[30px] text-left">
              Tương thích tối ưu
            </p>
            <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[18px] text-left mb-[20px]">
              Tương thích với nền tảng quản trị sẵn có mang lại hiệu quả sử dụng
              tối ưu
            </p>
            <img src={li8} alt="logo" className="w-[120px] h-[40px]" />
            <p className="font-roboto text-[16px] font-bold text-[#212121] not-italic leading-[30px] text-left">
              Giao diện trực quan
            </p>
            <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[18px] text-left mb-[20px]">
              Giao diện đơn giản, rõ ràng, trực quan và thân thiện cho người
              dùng
            </p>
          </div>
        </div>
      </section>
      <section id="tinhnang" className="mt-[50px]">
        <div className="tn11 h-[550px] flex justify-center ">
          <div>
            <img src={lap} alt="logo" className="w-[625px] h-[338px]" />
          </div>
          <div>
            <p className="font-sans text-[24px] font-bold text-[#212121] not-italic leading-[45px]">
              PHIÊN BẢN LITE
            </p>
            <p className="font-roboto text-[16px] font-normal text-[#212121] not-italic leading-[25px] mb-[50px]">
              PHIÊN BẢN TINH GIẢN GIÚP DOANH NGHIỆP ĐẶT VÀ QUẢN LÝ <br />
              CHUYẾN CÔNG TÁC DỄ DÀNG
            </p>
            <div className="flex">
              <div className="mr-[10px]">
                <img src={tn1} alt="logo" className="w-[32px] h-[25px]" />
              </div>
              <div className="mb-[20px]">
                <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[28px]">
                  Đặt vé máy bay/chỗ ở trực tuyến
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="mr-[10px]">
                <img src={tn2} alt="logo" className="w-[32px] h-[25px]" />
              </div>
              <div className="mb-[20px]">
                <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[28px]">
                  Luồng phê duyệt, thanh toán tinh giản
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-[10px]">
                <img src={tn3} alt="logo" className="w-[32px] h-[30px]" />
              </div>
              <div className="mb-[20px]">
                <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[28px]">
                  Quản lý lịch trình, chi phí công tác
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-[10px]">
                <img src={tn4} alt="logo" className="w-[32px] h-[30px]" />
              </div>
              <div className="mb-[20px]">
                <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[28px]">
                  Quản lý hóa đơn
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-[10px]">
                <img src={tn5} alt="logo" className="w-[32px] h-[30px]" />
              </div>
              <div className="mb-[20px] ">
                <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[28px] text-center">
                  Thống kê/Báo cáo chi tiết giao dịch
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-[10px]">
                <img src={tn6} alt="logo" className="w-[32px] h-[30px]" />
              </div>
              <div className="mb-[20px]">
                <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[28px]">
                  Dashboard báo cáo tổng hợp
                </p>
              </div>
            </div>
            <p className="font-roboto text-[16px] font-normal text-[#212121] not-italic leading-[24px]">
              Phiên bản thiết lập mặc định khi kích hoạt tài khoản
            </p>
          </div>
        </div>
      </section>
      <section id="sanpham">
        <div className="sp">
          <div className="tn12 h-[555px] flex justify-center">
            <div>
              <p className="font-sans text-[24px] font-bold text-[#212121] not-italic leading-[45px]">
                PHIÊN BẢN ENTERPRISE
              </p>
              <p className="font-roboto text-[16px] font-normal text-[#212121] not-italic leading-[25px] mb-[50px]">
                PHIÊN BẢN ĐẦY ĐỦ TÍNH NĂNG DÀNH CHO DOANH NGHIỆP <br />
                LỚN VỚI QUY TRÌNH CHẶT CHẼ
              </p>
              <div className="flex">
                <div className="mr-[10px]">
                  <img src={tn11} alt="logo" className="w-[32px] h-[30px]" />
                </div>
                <div className="mb-[20px]">
                  <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[28px]">
                    Đầy đủ tính năng như phiên bản Lite
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-[10px]">
                  <img src={tn12} alt="logo" className="w-[32px] h-[25px]" />
                </div>
                <div className="mb-[20px]">
                  <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[28px]">
                    Thiết lập luồng thanh toán, phê duyệt riêng
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-[10px]">
                  <img src={tn13} alt="logo" className="w-[32px] h-[30px]" />
                </div>
                <div className="mb-[20px]">
                  <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[28px]">
                    Hỗ trợ thanh/quyết toán online với mọi chi phí
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-[10px]">
                  <img src={tn14} alt="logo" className="w-[32px] h-[30px]" />
                </div>
                <div className="mb-[20px]">
                  <p className="font-roboto text-[14px] font-normal text-[#212121] not-italic leading-[28px]">
                    Thiết lập và quản lý hạn mức ngân sách
                  </p>
                </div>
              </div>
              <p className="font-roboto text-[16px] font-normal text-[#212121] not-italic leading-[24px] mb-[50px]">
                Phiên bản nâng cấp MIỄN PHÍ theo nhu cầu doanh nghiệp
              </p>
            </div>
            <div>
              <img src={lap2} alt="logo" className="w-[652px] h-[460px]" />
            </div>
          </div>
        </div>
      </section>
      <section id="doitac">
        <p className="font-roboto text-4xl font-normal text-[#212121] not-italic text-center">
          <br />
          <br />
          20.000+ ĐỐI TÁC ĐỒNG HÀNH
        </p>
        <p className="font-roboto text-[16px] font-normal text-[#212121] not-italic leading-[28px] text-center mt-[50px]">
          Mytour for Business tự hào kết nối và xây dựng các mối quan hệ đối tác
          chiến lược, trở thành đại lý phân phối, dịch vụ ủy quyền của hơn
          20.000 khách sạn và
          <br /> hãng hàng không trên thế giới.
        </p>
        <div className="mt-[30px]">
          <div className="flex justify-center">
            <img src={dt1} alt="logo" className="w-[189px] h-[94px]" />
            <img src={dt2} alt="logo" className="w-[189px] h-[94px]" />
            <img src={dt3} alt="logo" className="w-[189px] h-[94px]" />
            <img src={dt4} alt="logo" className="w-[189px] h-[94px]" />
            <img src={dt5} alt="logo" className="w-[189px] h-[94px]" />
            <img src={dt6} alt="logo" className="w-[189px] h-[94px]" />
          </div>
          <div className="flex justify-center">
            <img src={dt7} alt="logo" className="w-[189px] h-[94px]" />
            <img src={dt8} alt="logo" className="w-[189px] h-[94px]" />
            <img src={dt9} alt="logo" className="w-[189px] h-[94px]" />
            <img src={dt10} alt="logo" className="w-[189px] h-[94px]" />
            <img src={dt11} alt="logo" className="w-[189px] h-[94px]" />
            <img src={dt12} alt="logo" className="w-[189px] h-[94px]" />
          </div>
        </div>
      </section>
      <section id="tintuc" className="h-[746px]">
        <p className="font-roboto text-4xl font-normal text-[#212121] not-italic text-center">
          <br />
          <br />
          <br />
          BÁO CHÍ NÓI GÌ VỀ MYTOUR FOR BUSINESS
        </p>
        <div className="flex justify-center mt-[50px]">
          <div>
            <img src={tt1} alt="logo" className="w-[360px] h-[222px]" />
            <div className="w-[360px] h-[240px] shadow-md">
              <div className="m-[25px]">
                <p className="font-roboto text-[24px] font-normal text-[#212121] not-italic leading-[34px]">
                  Quy định về công tác phí mới nhất năm 2022
                </p>
                <div className="flex mt-[10px]">
                  <img src={cd} alt="logo" className="w-[30px] h-[24px]" />
                  <p className="font-roboto text-[12px] font-normal text-[#212121] not-italic leading-[23px] ml-[10px]">
                    26/042022
                  </p>
                </div>
                <p className="font-roboto text-[16px] font-normal text-[#212121] not-italic leading-[28px] mt-[10px]">
                  Công tác phí phí là khoản chi phí dùng để trả cho người đi
                  công tác. Các khoản này bao gồm:…
                </p>
              </div>
            </div>
          </div>
          <div className="ml-[30px] mr-[30px]">
            <img src={tt1} alt="logo" className="w-[360px] h-[222px]" />
            <div className="w-[360px] h-[240px] shadow-md">
              <div className="m-[25px]">
                <p className="font-roboto text-[24px] font-normal text-[#212121] not-italic leading-[34px]">
                  Quy định về công tác phí mới nhất năm 2022
                </p>
                <div className="flex mt-[10px]">
                  <img src={cd} alt="logo" className="w-[30px] h-[24px]" />
                  <p className="font-roboto text-[12px] font-normal text-[#212121] not-italic leading-[23px] ml-[10px]">
                    26/042022
                  </p>
                </div>
                <p className="font-roboto text-[16px] font-normal text-[#212121] not-italic leading-[28px] mt-[10px]">
                  Công tác phí phí là khoản chi phí dùng để trả cho người đi
                  công tác. Các khoản này bao gồm:…
                </p>
              </div>
            </div>
          </div>
          <div>
            <img src={tt1} alt="logo" className="w-[360px] h-[222px]" />
            <div className="w-[360px] h-[240px] shadow-md">
              <div className="m-[25px]">
                <p className="font-roboto text-[24px] font-normal text-[#212121] not-italic leading-[34px]">
                  Quy định về công tác phí mới nhất năm 2022
                </p>
                <div className="flex mt-[10px]">
                  <img src={cd} alt="logo" className="w-[30px] h-[24px]" />
                  <p className="font-roboto text-[12px] font-normal text-[#212121] not-italic leading-[23px] ml-[10px]">
                    26/042022
                  </p>
                </div>
                <p className="font-roboto text-[16px] font-normal text-[#212121] not-italic leading-[28px] mt-[10px]">
                  Công tác phí phí là khoản chi phí dùng để trả cho người đi
                  công tác. Các khoản này bao gồm:…
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-[40px]">
          <button className="menuList text-[#ffffff] bg-[#ff3366] font-roboto text-sm not-italic font-medium w-[121px] h-[36px] rounded-[5px] items-center">
            Xem tất cả
          </button>
        </div>
      </section>
      <section id="khachhang" className="h-[477px]">
        <p className="font-roboto text-4xl font-normal text-[#212121] not-italic text-center">
          <br />
          <br />
          <br />
          KHÁCH HÀNG NÓI GÌ VỀ MYTOUR FOR BUSINESS
        </p>
        <Slider
          {...carousel}
          className="a flex justify-center items-center w-[1140px] m-auto mt-[50px] absolute"
        >
          <div className="">
            <p className="font-roboto text-[16px] font-normal text-[#212121] not-italic leading-[28px] text-center w-[1140px]">
              Trước đây, mỗi nhân viên đi công tác đều phải thông qua trợ lý
              hành chính đặt vé, phòng khách sạn và phản hồi qua lại nhiều lần
              rất mất thời gian. Từ khi áp dụng Mytour for Business vào hệ thống
              quản trị của Teko, chỉ cần phân bổ hạn mức ngân sách cho mỗi nhân
              viên là họ có thể tự chủ động chuẩn bị chuyến công tác nhanh chóng
              và dễ dàng.
            </p>
            <img alt="" className="slick-item-img m-auto" src={kh1}></img>
          </div>

          <div>
            <p className="font-roboto text-[16px] font-normal text-[#212121] not-italic leading-[28px] text-center w-[1140px]">
              Công tác phí chiếm một phần khá lớn trong chi phí của Phong Vũ và
              quy trình tạm ứng, hoàn ứng qua nhiều khâu gây bất tiện trong quá
              trình chuẩn bị cho chuyến đi. Mytour for Business giúp rút gọn quy
              trình: Quản lý cấp ngân sách, nhân viên tự chọn chuyến đi, phê
              duyệt qua CEO và kế toán hoàn thành thanh toán... tất cả chỉ trong
              1 giờ. Mọi khâu đều được công khai rõ ràng và nhắc nhớ qua ứng
              dụng giúp quy trình được đẩy nhanh và tránh được sai sót.
            </p>
            <img alt="" className="slick-item-img m-auto" src={kh2}></img>
          </div>
          <div>
            <p className="font-roboto text-[16px] font-normal text-[#212121] not-italic leading-[28px] text-center w-[1140px]">
              Đặc thù là một doanh nghiệp công nghệ lớn với hàng trăm nhân sự
              tại cả 2 miền Nam Bắc, các nhân viên của Vnpay thường xuyên phải
              di chuyển liên tục. Với ứng dụng công nghệ du lịch của Mytour for
              Business, việc sắp xếp và chuẩn bị cũng như theo dõi các khoản chi
              phí công tác của nhân viên đều rất dễ quản lý, minh bạch và tiết
              kiệm thời gian. Nhờ sự thoải mái, thuận tiện trong quá trình công
              tác mà hiệu suất công việc cũng được cải thiện rõ rệt.
            </p>
            <img alt="" className="slick-item-img m-auto" src={kh3}></img>
          </div>
        </Slider>
      </section>
      <section id="lienhe">
        <div className="lienhe h-[458px]">
          <p className="font-roboto text-[28px] font-bold text-[#ffffff] not-italic leading-[45px] text-center w-[1140px] m-auto">
            <br />
            <br />
            <br />
            SỬ DỤNG MYTOUR FOR BUSINESS VÀ TẬN HƯỞNG NHỮNG TIỆN ÍCH TUYỆT VỜI!
          </p>
          <div className="flex justify-center mt-[40px] ">
            <button
              className="menuList text-[#ffffff] bg-[#ff3366] font-roboto text-sm not-italic font-medium w-[121px] h-[36px] rounded-[5px] items-center"
              onClick={goRegisterBusiness}
            >
              Tham gia ngay
            </button>
          </div>
        </div>
        <div className="footer h-[520px] items-center ">
          <div className="">
            <img
              src={lg}
              alt="logo"
              className="mb-[20px] mt-[50px] ml-[270px]"
            />
          </div>

          <div className="flex font-roboto font-normal text-[#666666] not-italic justify-center ">
            <div>
              <p className="font-medium text-[14px] leading-[20px] mb-[10px]">
                <b>Công ty cổ phần du lịch Việt Nam VNTravel</b>
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Hotline: 1900 2083
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Email: business@mytour.vn
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Văn phòng Hà Nội: Tầng 11, Tòa Peakview, 36 Hoàng Cầu, Đống Đa
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Văn phòng HCM: Tầng 6, Tòa Nhà Central Park, 117 Nguyễn Du, Q.1
              </p>
            </div>
            <div className="ml-[100px] mr-[100px]">
              <p className="font-medium text-[14px] leading-[20px] mb-[10px]">
                <b>Chính sách & Quy định</b>
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Chính sách và quy định chung
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Quy định về thanh toán
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Quy định về xác nhận thông tin đặt phòng
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Chính sách về hủy đặt phòng và hoàn trả tiền
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Chính sách bảo mật thông tin
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Quy chế hoạt động
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Chính sách bảo mật
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Quy trình giải quyết tranh chấp, khiếu nại
              </p>
            </div>
            <div>
              <p className="font-medium text-[14px] leading-[20px] mb-[10px]">
                <b>Chính sách & Quy định</b>
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Tích lũy Vpoint
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                Đăng nhập HMS
              </p>
              <p className="text-[13px] leading-[24px] mb-[10px]">Tuyển dụng</p>
              <p className="text-[13px] leading-[24px] mb-[30px]">Liên hệ</p>
              <p className="text-[13px] leading-[24px] mb-[10px]">
                <b>Kết nối với Mytour.vn</b>
              </p>
            </div>
          </div>

          <hr className="w-[80%] m-auto" />
          <div className="font-roboto font-normal text-[#666666] not-italic text-[12px] leading-[18px] flex justify-center">
            <p className="mb-[30px]">
              <br />
              <br />
              Mytour là thành viên của VNTravel Group - Một trong những tập đoàn
              đứng đầu Đông Nam Á về du lịch trực tuyến và các dịch vụ liên quan
            </p>
          </div>
          <div className="flex justify-center">
            <img src={lh1} alt="logo" className="w-[108px] h-[28px]" />
            <img src={lh2} alt="logo" className="w-[88px] h-[28px]" />
            <img src={lh3} alt="logo" className="w-[88px] h-[28px]" />
            <img src={lh4} alt="logo" className="w-[88px] h-[28px]" />
            <img src={lh5} alt="logo" className="w-[88px] h-[28px]" />
            <img src={lh6} alt="logo" className="w-[88px] h-[28px]" />
            <img src={lh7} alt="logo" className="w-[88px] h-[28px]" />
            <img src={lh8} alt="logo" className="w-[88px] h-[28px]" />
            <img src={lh9} alt="logo" className="w-[88px] h-[28px]" />
            <img src={lh10} alt="logo" className="w-[88px] h-[28px]" />
          </div>
        </div>
        <div className="h-[34px] bg-[#e4e4e4] flex justify-center items-center">
          <p className="font-roboto text-[12px] font-normal text-[#212121] not-italic leading-[18px] ">
            Copyright © 2020 - CÔNG TY CỔ PHẦN DU LỊCH VIỆT NAM VNTRAVEL - Đăng
            ký kinh doanh số 0108886908 - do Sở Kế hoạch và Đầu tư thành phố Hà
            Nội cấp lần đầu ngày 04 tháng 09 năm 2019
          </p>
        </div>
      </section>
    </div>
  );
};

export default HeaderBusiness;
