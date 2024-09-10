import React, { useState, useEffect, useRef } from "react";
import PartnerHeader from "./PartnerHeader";
import { TbCameraPlus } from "react-icons/tb";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

const PartnerRoom = () => {
  const [typeroomName, setTypeRoomName] = useState("");
  // const [roomStyle, setTypeRoomStyle] = useState(0);
  const [typeroomPrice, setTypeRoomPrice] = useState("");
  const [maxLoad, setMaxLoad] = useState("");

  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [bathroomAmenities, setBathroomAmenities] = useState([]);
  const [bedroomAmenities, setBedroomAmenities] = useState([]);
  const [otherAmenities, setOtherAmenities] = useState([]);

  //repair
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

  //ten phong
  const handleRoomNameChange = (event) => {
    const { value } = event.target;
    setTypeRoomName(value);
  };
  //Suc chua
  const handleMaxLoadChange = (event) => {
    const { value } = event.target;
    setMaxLoad(value);
  };
  //Gia phong
  const handleRoomPriceChange = (event) => {
    const { value } = event.target;
    setTypeRoomPrice(value);
  };
  // Kieu phong
  const [roomStyle, setRoomStyle] = useState({
    singleBeds: 0,
    doubleBeds: 0,
    kingBeds: 0,
  });

  const [selectedBedNames, setSelectedBedNames] = useState([]); // Mảng chứa tên các giường đã chọn

  const handleAddRoomStyle = (bedType) => {
    setRoomStyle((prevState) => ({
      ...prevState,
      [bedType]: prevState[bedType] + 1,
    }));

    setSelectedBedNames((prevSelected) => [...prevSelected, bedType]);
  };

  const handleRemoveRoomStyle = (bedType) => {
    if (roomStyle[bedType] > 0) {
      setRoomStyle((prevState) => ({
        ...prevState,
        [bedType]: prevState[bedType] - 1,
      }));

      setSelectedBedNames((prevSelected) =>
        prevSelected.filter((bed) => bed !== bedType)
      );
    }
  };

  const filteredRoomStyle = {};
  for (const bedType in roomStyle) {
    if (!/\d/.test(bedType)) {
      filteredRoomStyle[bedType] = roomStyle[bedType];
    }
  }

  // Chon tien ich phong ngu
  const handleBedroomAmenitiesChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setBedroomAmenities((prevAmenities) => [...prevAmenities, value]);
    } else {
      setBedroomAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity !== value)
      );
    }
  };

  //Chon tien ich khac
  const handleOtherAmenitiesChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setOtherAmenities((prevAmenities) => [...prevAmenities, value]);
    } else {
      setOtherAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity !== value)
      );
    }
  };

  //Chon tien ich phong tam
  const handleBathroomAmenitiesChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setBathroomAmenities((prevAmenities) => [...prevAmenities, value]);
    } else {
      setBathroomAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity !== value)
      );
    }
  };

  //Thay anh
  const handleImageChange = (event) => {
    const files = event.target.files;
    const selectedImageNames = Array.from(files).map((file) => file.name);
    setSelectedImages([...selectedImages, ...selectedImageNames]);
  };

  //An vo khung anh
  const handleFrameClick = () => {
    fileInputRef.current.click();
  };

  //Xoa anh
  const handleDeleteImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const saveButtonClickedRef = useRef(false);

  //Name rooms

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedBedNames = [];
    if (roomStyle.singleBeds > 0) {
      selectedBedNames.push(roomStyle.singleBeds + " giường đơn");
    }
    if (roomStyle.doubleBeds > 0) {
      selectedBedNames.push(roomStyle.doubleBeds + " giường đôi");
    }
    if (roomStyle.kingBeds > 0) {
      selectedBedNames.push(roomStyle.kingBeds + " giường King");
    }

    const allAmenities = [
      ...bathroomAmenities,
      ...bedroomAmenities,
      ...otherAmenities,
    ];

    if (
      typeroomName === "" ||
      maxLoad === "" ||
      typeroomPrice === "" ||
      selectedImages.length === 0
    ) {
      Swal.fire({
        text: "Chưa nhập thông tin đầy đủ. Mời nhập lại!",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      const newRoom = {
        typeroomName: typeroomName,
        typeroomPrice: typeroomPrice,
        maxLoad: maxLoad,
        typeroomInterior: allAmenities,
        selectedImages: selectedImages,
        selectedBedNames: selectedBedNames,
      };
      console.log(newRoom);

      const storedRoomData = localStorage.getItem("roomData");
      let updatedRoomData = storedRoomData ? JSON.parse(storedRoomData) : [];
      updatedRoomData.push(newRoom);
      localStorage.setItem("roomData", JSON.stringify(updatedRoomData));

      saveButtonClickedRef.current = true;

      Swal.fire({
        text: "Thêm thành công.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/partner-insert");
      }, 2000);
    }
  };

  return (
    <div>
      <div>
        {/* repair */}
        {notoken == 1 ? <PartnerHeader /> : null}
      </div>
      <div
        style={{
          flex: "0 0 81%",
          backgroundColor: "white",
          border: "1px solid lightgrey",
          borderRadius: "20px",
          margin: "2%",
          paddingBottom: "50px",
        }}
      >
        <label
          style={{
            display: "block",
            fontSize: "25px",
            fontWeight: "500",
            padding: "10px 20px",
          }}
        >
          Tạo mới phòng
        </label>
        <hr style={{ width: "96%", margin: "0 2% 20px 2%" }} />
        <p className="text-[#000000] font-app text-[18px] font-bold pl-[2%] pr-[2%]">
          <br />
          Thông tin phòng
        </p>
        <div className="h-[50px] flex w-full gap-[10%] mt-[5px] pl-[2%] pr-[2%] ">
          <div className="w-[45%]">
            <p>Tên phòng</p>
            <input
              type="text"
              name="Hotel_Name"
              className="border border-gray-200 rounded-md w-[100%] p-4 "
              value={typeroomName}
              onChange={handleRoomNameChange}
              required
            />
          </div>

          <div className="h-[35px] w-[45%] ">
            <p>Kiểu phòng</p>
            <div className="flex justify-between">
              <div className="bed-component">
                <div className="bed-buttons">
                  <button onClick={() => handleRemoveRoomStyle("singleBeds")}>
                    -
                  </button>
                  <span>{roomStyle.singleBeds}</span>
                  <button onClick={() => handleAddRoomStyle("singleBeds")}>
                    +
                  </button>
                </div>
                <div className="bed-info">
                  {roomStyle.singleBeds > 0 ? (
                    <p>
                      Số giường đơn: {roomStyle.singleBeds}{" "}
                      {roomStyle.singleBeds === 1 ? "giường" : "giường"}
                    </p>
                  ) : (
                    <p>Số giường đơn: 0 giường</p>
                  )}
                </div>
              </div>

              <div className="bed-component">
                <div className="bed-buttons">
                  <button onClick={() => handleRemoveRoomStyle("doubleBeds")}>
                    -
                  </button>
                  <span>{roomStyle.doubleBeds}</span>
                  <button onClick={() => handleAddRoomStyle("doubleBeds")}>
                    +
                  </button>
                </div>
                <div className="bed-info">
                  {roomStyle.doubleBeds > 0 ? (
                    <p>
                      Số giường đôi: {roomStyle.doubleBeds}{" "}
                      {roomStyle.doubleBeds === 1 ? "giường" : "giường"}
                    </p>
                  ) : (
                    <p>Số giường đôi: 0 giường</p>
                  )}
                </div>
              </div>

              <div className="bed-component">
                <div className="bed-buttons">
                  <button onClick={() => handleRemoveRoomStyle("kingBeds")}>
                    -
                  </button>
                  <span>{roomStyle.kingBeds}</span>
                  <button onClick={() => handleAddRoomStyle("kingBeds")}>
                    +
                  </button>
                </div>
                <div className="bed-info">
                  {roomStyle.kingBeds > 0 ? (
                    <p>
                      Số giường King: {roomStyle.kingBeds}{" "}
                      {roomStyle.kingBeds === 1 ? "giường" : "giường"}
                    </p>
                  ) : (
                    <p>Số giường King: 0 giường</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[50px] flex w-full gap-[5%] pl-[2%] pr-[2%] mt-[2%]">
          <div className="w-[25%]">
            <p>Sức chứa tối đa</p>
            <input
              type="text"
              name="Hotel_Name"
              className="border border-gray-200 rounded-md w-[100%] p-4  "
              value={maxLoad}
              onChange={handleMaxLoadChange}
              required
            />
          </div>
          <div className="w-[40%]">
            <p>Giá cơ bản/phòng/đêm (Đơn vị VNĐ)</p>
            <input
              type="text"
              name="Hotel_Name"
              className="border border-gray-200 rounded-md w-[100%] p-4  "
              value={typeroomPrice}
              onChange={handleRoomPriceChange}
              required
            />
          </div>
        </div>
        <p className="text-[#000000] font-app text-[18px] font-bold pl-[2%] pr-[2%] mt-[2%]">
          <br />
          Tiện ích phòng
        </p>
        <div>
          {/* Tiện ích phòng tắm */}
          <div className=" pl-[2%] pr-[2%] ">
            <p className="text-[#000000] font-app text-[15px] ">
              <br />
              Tiện ích phòng tắm
            </p>
            <div className="grid grid-cols-5 gap-5 border-2 border-gray-300 p-2 w-full rounded-md border-solid">
              <label>
                <input
                  type="checkbox"
                  name="bathroomAmenities"
                  value="Bình nước nóng"
                  onChange={handleBathroomAmenitiesChange}
                  checked={bathroomAmenities.includes("Bình nước nóng")}
                />{" "}
                Bình nước nóng
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bathroomAmenities"
                  value="Đồ vệ sinh cá nhân miễn phí"
                  onChange={handleBathroomAmenitiesChange}
                  checked={bathroomAmenities.includes(
                    "Đồ vệ sinh cá nhân miễn phí"
                  )}
                />{" "}
                Đồ vệ sinh cá nhân miễn phí
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bathroomAmenities"
                  value="Phòng tắm riêng"
                  onChange={handleBathroomAmenitiesChange}
                  checked={bathroomAmenities.includes("Phòng tắm riêng")}
                />{" "}
                Phòng tắm riêng
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bathroomAmenities"
                  value="Vòi hoa sen"
                  onChange={handleBathroomAmenitiesChange}
                  checked={bathroomAmenities.includes("Vòi hoa sen")}
                />{" "}
                Vòi hoa sen
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bathroomAmenities"
                  value="Bồn tắm nằm"
                  onChange={handleBathroomAmenitiesChange}
                  checked={bathroomAmenities.includes("Bồn tắm nằm")}
                />{" "}
                Bồn tắm nằm
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bathroomAmenities"
                  value="Máy sấy tóc"
                  onChange={handleBathroomAmenitiesChange}
                  checked={bathroomAmenities.includes("Máy sấy tóc")}
                />{" "}
                Máy sấy tóc
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bathroomAmenities"
                  value="Áo choàng tắm"
                  onChange={handleBathroomAmenitiesChange}
                  checked={bathroomAmenities.includes("Áo choàng tắm")}
                />{" "}
                Áo choàng tắm
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bathroomAmenities"
                  value="Khăn tắm"
                  onChange={handleBathroomAmenitiesChange}
                  checked={bathroomAmenities.includes("Khăn tắm")}
                />{" "}
                Khăn tắm
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bathroomAmenities"
                  value="Phòng tắm chung"
                  onChange={handleBathroomAmenitiesChange}
                  checked={bathroomAmenities.includes("Phòng tắm chung")}
                />{" "}
                Phòng tắm chung
              </label>
            </div>
          </div>

          <div className=" pl-[2%] pr-[2%] ">
            <p className="text-[#000000] font-app text-[15px] ">
              <br />
              Tiện ích phòng ngủ
            </p>
            <div className="grid grid-cols-5 gap-5 border-2 border-gray-300 p-2 w-full rounded-md border-solid">
              <label>
                <input
                  type="checkbox"
                  name="bedroomAmenities"
                  value="Tivi"
                  onChange={handleBedroomAmenitiesChange}
                  checked={bedroomAmenities.includes("Tivi")}
                />{" "}
                Tivi
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bedroomAmenities"
                  value="Điều hòa nhiệt độ"
                  onChange={handleBedroomAmenitiesChange}
                  checked={bedroomAmenities.includes("Điều hòa nhiệt độ")}
                />{" "}
                Điều hòa nhiệt độ
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bedroomAmenities"
                  value="Điện thoại"
                  onChange={handleBedroomAmenitiesChange}
                  checked={bedroomAmenities.includes("Điện thoại")}
                />{" "}
                Điện thoại
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bedroomAmenities"
                  value="Ghế sofa"
                  onChange={handleBedroomAmenitiesChange}
                  checked={bedroomAmenities.includes("Ghế sofa")}
                />{" "}
                Ghế Sofa
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bedroomAmenities"
                  value="Khu vực tiếp khách"
                  onChange={handleBedroomAmenitiesChange}
                  checked={bedroomAmenities.includes("Khu vực tiếp khách")}
                />{" "}
                Khu vực tiếp khách
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bedroomAmenities"
                  value="Bàn làm việc"
                  onChange={handleBedroomAmenitiesChange}
                  checked={bedroomAmenities.includes("Bàn làm việc")}
                />{" "}
                Bàn làm việc
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bedroomAmenities"
                  value="Bàn là"
                  onChange={handleBedroomAmenitiesChange}
                  checked={bedroomAmenities.includes("Bàn là")}
                />{" "}
                Bàn là
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bedroomAmenities"
                  value="Wifi miễn phí"
                  onChange={handleBedroomAmenitiesChange}
                  checked={bedroomAmenities.includes("Wifi miễn phí")}
                />{" "}
                Wifi miễn phí
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bedroomAmenities"
                  value="Quạt"
                  onChange={handleBedroomAmenitiesChange}
                  checked={bedroomAmenities.includes("Quạt")}
                />{" "}
                Quạt
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bedroomAmenities"
                  value="Dép đi trong nhà"
                  onChange={handleBedroomAmenitiesChange}
                  checked={bedroomAmenities.includes("Dép đi trong nhà")}
                />{" "}
                Dép đi trong nhà
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bedroomAmenities"
                  value="Két an toàn"
                  onChange={handleBedroomAmenitiesChange}
                  checked={bedroomAmenities.includes("Két an toàn")}
                />{" "}
                Két an toàn
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bedroomAmenities"
                  value="Bàn trang điểm"
                  onChange={handleBedroomAmenitiesChange}
                  checked={bedroomAmenities.includes("Bàn trang điểm")}
                />{" "}
                Bàn trang điểm
              </label>
            </div>
          </div>
          <div className=" pl-[2%] pr-[2%] ">
            <p className="text-[#000000] font-app text-[15px] ">
              <br />
              Tiện ích khác
            </p>
            <div className="grid grid-cols-5 gap-5 border-2 border-gray-300 p-2 w-full rounded-md border-solid">
              <label>
                <input
                  type="checkbox"
                  name="otherAmenities"
                  value="Ban Công"
                  onChange={handleOtherAmenitiesChange}
                  checked={otherAmenities.includes("Ban Công")}
                />{" "}
                Ban Công
              </label>
              <label>
                <input
                  type="checkbox"
                  name="otherAmenities"
                  value="Chấp nhận thú cưng"
                  onChange={handleOtherAmenitiesChange}
                  checked={otherAmenities.includes("Chấp nhận thú cưng")}
                />{" "}
                Chấp nhận thú cưng
              </label>
              <label>
                <input
                  type="checkbox"
                  name="otherAmenities"
                  value="Dọn phòng hàng ngày"
                  onChange={handleOtherAmenitiesChange}
                  checked={otherAmenities.includes("Dọn phòng hàng ngày")}
                />{" "}
                Dọn phòng hàng ngày
              </label>
              <label>
                <input
                  type="checkbox"
                  name="otherAmenities"
                  value="Tầm nhìn ra khung cảnh"
                  onChange={handleOtherAmenitiesChange}
                  checked={otherAmenities.includes("Tầm nhìn ra khung cảnh")}
                />{" "}
                Tầm nhìn ra khung cảnh
              </label>
              <label>
                <input
                  type="checkbox"
                  name="otherAmenities"
                  value="Máy giặt"
                  onChange={handleOtherAmenitiesChange}
                  checked={otherAmenities.includes("Máy giặt")}
                />{" "}
                Máy giặt
              </label>
              <label>
                <input
                  type="checkbox"
                  name="otherAmenities"
                  value="Cửa sổ"
                  onChange={handleOtherAmenitiesChange}
                  checked={otherAmenities.includes("Cửa sổ")}
                />{" "}
                Cửa sổ
              </label>
              <label>
                <input
                  type="checkbox"
                  name="otherAmenities"
                  value="Tủ lạnh"
                  onChange={handleOtherAmenitiesChange}
                  checked={otherAmenities.includes("Tủ lạnh")}
                />{" "}
                Tủ lạnh
              </label>
              <label>
                <input
                  type="checkbox"
                  name="otherAmenities"
                  value="Nước suối miễn phí"
                  onChange={handleOtherAmenitiesChange}
                  checked={otherAmenities.includes("Nước suối miễn phí")}
                />{" "}
                Nước suối miễn phí
              </label>
              <label>
                <input
                  type="checkbox"
                  name="otherAmenities"
                  value="Ấm đun nước điện"
                  onChange={handleOtherAmenitiesChange}
                  checked={otherAmenities.includes("Ấm đun nước điện")}
                />{" "}
                Ấm đun nước điện
              </label>
            </div>
          </div>
        </div>
        <div className="tt3  mb-[100px] pl-[2%] pr-[2%] mt-[2%]">
          <p className="text-[#000000] font-app text-[18px] font-bold">
            <br />
            Hình ảnh
          </p>
          <div className="relative border-2 border-gray-300 p-2 w-full rounded-md h-[300px] border-dashed">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden h"
            />
            <div
              onClick={handleFrameClick}
              className="w-full h-full cursor-pointer"
            >
              {selectedImages.length > 0 ? (
                <div className="flex flex-wrap w-full h-full">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="w-1/4 h-1/2 p-1">
                      <div className="relative w-full h-full">
                        <img
                        className="relative w-full h-full"
                          src={`../assets/${image}`}
                          alt="Hình ảnh đã chọn"
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
          <div>
            <button
              type="submit"
              className="rounded-md h-[40px] w-[15%] bg-[#FF6600] text-[#ffffff] mt-[20px] float-right"
              onClick={handleSubmit}
            >
              Lưu lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerRoom;
