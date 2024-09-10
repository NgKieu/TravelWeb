import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import PartnerHeader from "./PartnerHeader"; // Import PartnerHeader component
import "./css/PartnerBody.css";
import PartnerMenu from "./PartnertMenu";
import axios from "axios";
import { TbCameraPlus } from "react-icons/tb";
import { CiCirclePlus } from "react-icons/ci";
import SelectAddress from "./SelectAddress";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { Link, useLocation, Redirect } from "react-router-dom";

export default function PartnerInsert() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState();
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [housenumber, setHouseNumber] = useState();

  const [hotelName, setHotelName] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [hotelCategory, setHotelCategory] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [hotelImage, setHotelImage] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageNames, setSelectedImageNames] = useState([]);
  const [file, setFile] = useState();

  const [data, setData] = useState([]);
  const fileInputRef = useRef(null);
  const [roomData, setRoomData] = useState([]);

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

  const handleChange = (event) => {
    setHotelName(event.target.value);
  };

  //Thay anh
  const handleImageChange = (event) => {
    const files = event.target.files;
    const selectedImageNames = Array.from(files).map((file) => file.name);

    if (hotelImage.length + selectedImageNames.length >= 6) {
      setHotelImage([...hotelImage, ...selectedImageNames]);
    } else {
      Swal.fire({
        text: "Tối thiểu 6 ảnh.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  //Bam vo khung anh
  const handleFrameClick = () => {
    fileInputRef.current.click();
  };

  //Xoa anh
  const handleDeleteImage = (index) => {
    const newImages = [...hotelImage];
    newImages.splice(index, 1);
    setHotelImage(newImages);
  };

  //Xoa phong them tu trang rooms
  const handleDeleteRoom = () => {
    window.location.href = "/partner-insert";
    localStorage.removeItem("roomData");
  };

  const handleInputChange = (event) => {
    setHotelDescription(event.target.value);
  };

  const [addedRoomData, setAddedRoomData] = useState([]);

  useEffect(() => {
    const storedRoomData = localStorage.getItem("roomData");
    if (storedRoomData) {
      const parsedData = JSON.parse(storedRoomData);
      setAddedRoomData(parsedData);
      console.log(parsedData);
    }
  }, []);

  // Api loai phong
  useEffect(() => {
    axios
      .get("http://localhost:8081/hotel_category")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  }, []);

  //Api tinh thanh
  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await axios.get(
        "https://vapi.vnappmob.com/api/province/"
      );
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  });

  //Api quan huyen
  useEffect(() => {
    const fetchPublicDistrict = async () => {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${province}`
      );
      if (response.status === 200) {
        setDistricts(response?.data.results);
      }
    };
    fetchPublicDistrict();
  }, [province]);

  //Api duong
  useEffect(() => {
    const fetchPublicWard = async () => {
      const response = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${district}`
      );
      if (response.status === 200) {
        setWards(response?.data.results);
      }
    };
    fetchPublicWard();
  }, [district]);

  useEffect(() => {
    const addressString = `${housenumber ? `${housenumber}, ` : ""}${
      ward ? wards?.find((item) => item.ward_id === ward)?.ward_name : ""
    }${ward && (district || province) ? ", " : ""}${
      district
        ? districts?.find((item) => item.district_id === district)
            ?.district_name
        : ""
    }${district && province ? ", " : ""}${
      province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : ""
    }`;

    setHotelLocation(addressString);
  }, [housenumber, ward, district, province]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const hotelData = {
      hotelName,
      hotelLocation,
      hotelCategory,
      hotelDescription,
      hotelImage,
    };
    const firstRoomData = addedRoomData[0];

    const dataToSend = {
      ...hotelData,
      typeroomName: firstRoomData.typeroomName,
      typeroomStyle: firstRoomData.selectedBedNames,
      typeroomPrice: firstRoomData.typeroomPrice,
      typemaxLoad: firstRoomData.maxLoad,
      selectedImages: firstRoomData.selectedImages,
      typeroomInterior: firstRoomData.typeroomInterior,
    };

    if (
      hotelName === "" ||
      hotelLocation === "" ||
      hotelCategory === "" ||
      hotelDescription === "" ||
      hotelImage.length === 0
    ) {
      Swal.fire({
        text: "Chưa nhập thông tin đầy đủ. Mời nhập lại!",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8081/partner-insert",
          dataToSend,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.message === "Successfully") {
          Swal.fire({
            text: "Thêm khách sạn thành công.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            localStorage.removeItem("roomData");
            localStorage.removeItem("hotelData");
            window.location.href = "/partner-on-progress";
          }, 2000);
        } else {
          Swal.fire({
            text: "Thêm khách sạn thất bại.",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.error("Lỗi khi thêm khách sạn:", error.message);
        Swal.fire({
          text: "Thêm khách sạn thất bại.",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  return (
    <div style={{}}>
      <div>{notoken == 1 ? <PartnerHeader /> : null}</div>
      <div className="Body font-app flex">
        <div
          style={{
            flex: "0 0 17%",
            padding: "3% 0 2% 3% ",
          }}
        >
          <PartnerMenu />
        </div>
        <div
          style={{
            flex: "0 0 81%",
            backgroundColor: "white",
            border: "1px solid lightgrey",
            borderRadius: "20px",
            margin: "2% 2% 2% 0 ",
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
            Đăng tin cho thuê
          </label>
          <hr style={{ width: "96%", margin: "0 2% 20px 2%" }} />
          {/* Phan thong tin dang phong */}
          <div>
            <div className="tt1 ml-[20px] mr-[20px]">
              <p className="text-[#000000] font-app text-[18px] font-bold">
                Địa chỉ cho thuê
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <SelectAddress
                    type="province"
                    value={province}
                    setValue={setProvince}
                    options={provinces}
                    label="Tỉnh/Thành phố"
                  />
                  <SelectAddress
                    type="district"
                    value={district}
                    setValue={setDistrict}
                    options={districts}
                    label="Quận/Huyện"
                  />
                  <SelectAddress
                    type="ward"
                    value={ward}
                    setValue={setWard}
                    options={wards}
                    label="Phường/Xã"
                  />
                  <div>
                    <label>Đường/Số nhà</label>
                    <input
                      style={{
                        marginTop: "6px",
                        height: "35px",
                      }}
                      type="text"
                      label="Số nhà"
                      value={housenumber}
                      onChange={(e) => setHouseNumber(e.target.value)}
                      className="outline-none border border-gray-300 p-2 w-full rounded-md"
                    ></input>
                  </div>
                </div>

                <div>
                  <label htmlFor="exactly-address">Địa chỉ chính xác</label>
                  <input
                    style={{
                      marginTop: "6px",
                      height: "35px",
                    }}
                    type="text"
                    value={hotelLocation}
                    readOnly
                    className="border border-gray-200 rounded-md marker bg-gray-100 p-2 w-full outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="tt2 ml-[20px] mr-[20px]">
              <p className="text-[#000000] font-app text-[18px] font-bold">
                <br />
                Thông tin mô tả
              </p>

              <div className="h-[50px] flex w-full gap-[10%] mt-[10px]">
                <div className="w-[50%]">
                  <p>Tên Khách sạn</p>
                  <input
                    type="text"
                    name="Hotel_Name"
                    className="border border-gray-200 rounded-md w-[100%] p-4  "
                    value={hotelName}
                    onChange={(e) => {
                      handleChange(e);
                      setHotelName(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="h-[35px] w-[40%] ">
                  <p>Hạng sao</p>
                  <select
                    className="outline-none border border-gray-300 p-2 w-[50%] rounded-md"
                    value={hotelCategory}
                    onChange={(e) => setHotelCategory(e.target.value)}
                  >
                    <option value="" selected>
                      ---Chọn hạng sao---
                    </option>
                    {data.map((item) => (
                      <option key={item.Category_id} value={item.Category_id}>
                        {"Khách sạn " + item.Category_Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-[30px]">
                <p>Thông tin mô tả</p>
                <textarea
                  value={hotelDescription}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full rounded-md h-[100px]"
                ></textarea>
              </div>
            </div>
            <div className="tt3 mb-[100px] pl-[2%] pr-[2%] mt-[2%]">
              <p className="text-[#000000] font-app text-[18px] font-bold">
                <br />
                Hình ảnh
              </p>
              <div className="relative border-2 border-gray-300 p-2 w-full rounded-md h-[450px] border-dashed">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <div
                  onClick={handleFrameClick}
                  className="w-full h-full cursor-pointer"
                >
                  {hotelImage && hotelImage[0] ? (
                    <div className="flex flex-wrap w-full h-full">
                      {hotelImage.map((image, index) => (
                        <div key={index} className="image w-1/4 h-1/2 p-1">
                          <div className="relative w-full h-full">
                            <img
                              className="w-full h-full "
                              src={`../assets/${image}`}
                              alt={`Image ${index}`}
                            />
                            <button
                              onClick={() => handleDeleteImage(index)}
                              className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                            >
                              X
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <TbCameraPlus size={50} style={{ marginLeft: "35%" }} />
                      Nhấn để chọn hình ảnh
                    </span>
                  )}
                </div>
              </div>

              {/*Loại phòng */}
              <p className="text-[#000000] font-app text-[18px] font-bold">
                <br />
                Loại phòng
              </p>
              <div className="grid grid-cols-3 gap-5 border-2 border-gray-300 p-2 w-full rounded-md border-solid">
                {addedRoomData.map((roomData, index) => (
                  <Link
                    to={{
                      pathname: "/partner-room",
                    }}
                    className="w-full p-1"
                    key={index}
                  >
                    <div className="border border-gray-300 p-2 rounded-md">
                      <button
                        onClick={() => handleDeleteRoom(index)}
                        className="top-0 ml-[90%] w-6 h-6 bg-red-500 text-white rounded-full"
                      >
                        X
                      </button>
                      <img
                        src={`../assets/${roomData.selectedImages[0]}`}
                        alt="room"
                      />
                      <p>Tên phòng: {roomData.typeroomName}</p>
                      <p>Giá: {roomData.typeroomPrice}</p>
                      <p>Sức chứa tối đa: {roomData.maxLoad}</p>
                    </div>
                  </Link>
                ))}
                <Link to="/partner-room" className="w-full p-1 cursor-pointer">
                  <label className="w-full border-2 h-[400px] my-4 gap-4 flex flex-col items-center justify-center border-[#ff6600]-400 rounded-md ">
                    <CiCirclePlus size={50} color="#FF6600" />
                    <p style={{ color: "#FF6600" }} className="cursor-pointer">
                      Thêm phòng mới
                    </p>
                  </label>
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="rounded-md h-[40px] w-[15%] bg-[#4fc3f7] text-[#ffffff] mt-[20px] float-right"
                >
                  Thêm khách sạn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
