import React, { useState, useEffect } from "react";
import PartnerHeader from "./PartnerHeader";
import "./css/PartnerBody.css";
import Modal from "react-modal";
import PartnerMenu from "./PartnertMenu";
import axios from "axios";
import Swal from "sweetalert2";

const StatusToString = (status) => {
  return status === 0 ? "Chưa được duyệt" : "Đã duyệt";
};

export default function PartnerHome() {
  // const [selectedHotel, setSelectedHotel] = useState(null);
  const [typeroomData, setTypeRoomData] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedTypeRoom, setSelectedTypeRoom] = useState(null);

  const [editedTypeRoom, setEditedTypeRoom] = useState(null);
  const [isEditTypeRoomModalOpen, setIsEditTypeRoomModalOpen] = useState(false);
  const [otherAmenities, setOtherAmenities] = useState([]);
  const [bathroomAmenities, setBathroomAmenities] = useState([]);
  const [bedroomAmenities, setBedroomAmenities] = useState([]);
  // const [roomStyle, setTypeRoomStyle] = useState(0);
  const [editedHotel, setEditedHotel] = useState(null);
  // const [roomStyle, setRoomStyle] = useState("");

  //Mo hop chinh type room
  const openEditTypeRoomModal = () => {
    setIsEditTypeRoomModalOpen(true);
  };

  //Dong hop chinh type room
  const closeEditTypeRoomModal = () => {
    setIsEditTypeRoomModalOpen(false);
  };
  //Mo hop chinh sua
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  //Dong hop chinh sua
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditClick = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleEditClick2 = (typeroom) => {
    setSelectedTypeRoom(typeroom);
  };

  //Lay api category
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/hotel_category")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  }, []);

  //Du lieu lay danh sach hotel
  const token = localStorage.getItem("token");
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/partner-home", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  }, []);

  const [hotelData, setHotelData] = useState({
    hotelName: "",
    hotelLocation: "",
    hotelCategory: "",
    hotelDescription: "",
  });

  //Nut luu du lieu hotel
  const handleSubmitUpdateHotel = async (hoteld) => {
    const hotel = {
      hotelName: hotelData.hotelName || hotels[0]?.Hotel_Name,
      hotelLocation: hotelData.hotelLocation || hotels[0]?.Hotel_Location,
      hotelCategory: hotelData.hotelCategory || hotels[0]?.Hotel_Category,
      hotelDescription: hotelData.hotelDescription || hotels[0]?.Description,
    };
    console.log(hotel);
    try {
      await axios.put(`http://localhost:8081/partner-update/${hoteld}`, hotel, {
        headers: {
          Authorization: `${token}`,
        },
      });
      Swal.fire({
        text: "Sửa khách sạn thành công.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error inserting hotel:", error.message);

      Swal.fire({
        text: "Sửa khách sạn thất bại.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  //Xoa du lieu hotel
  const handleSubmitDelete = async (hotelId) => {
    try {
      await axios.delete(`http://localhost:8081/partner-delete/${hotelId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      Swal.fire({
        text: "Xóa khách sạn thành công.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error inserting hotel:", error.message);
      Swal.fire({
        text: "Xóa phòng trước.",
        icon: "error",
        showConfirmButton: true,
        timer: 2000,
      });
    }
  };

  //Lay typeroom khi nhan vo hotels
  const fetchTypeRoomData = (hotelId) => {
    axios
      .get(`http://localhost:8081/getTypeRoomsByHotelId/${hotelId}`)
      .then((response) => {
        setTypeRoomData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching type room data from API", error);
      });
  };

  //CHINH SUA TYPE ROOM
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

  const allAmenities = [
    ...bathroomAmenities,
    ...bedroomAmenities,
    ...otherAmenities,
  ];

  //Du lieu backend cua typeroom
  const [typeData, setTypeData] = useState({
    typeroomName: "",
    typeroomPrice: "",
    maxLoad: "",
    typeroomInterior: "",
    typeroomStyle: "",
  });

  //Nut luu du lieu typeroom
  const handleSubmitUpdateTypeRoom = async (typeRoomId) => {
    console.log(typeRoomId);
    const typeRoom = {
      typeroomName: typeData.typeroomName || typeroomData[0]?.TypeRoom_Name,
      typeroomPrice: typeData.typeroomPrice || typeroomData[0]?.TypeRoom_Price,
      maxLoad: typeData.maxLoad || typeroomData[0]?.Maxload,
      typeroomInterior: typeData.typeroomInterior || allAmenities,
      typeroomStyle: typeData.typeroomStyle || typeroomData[0]?.TypeRoom_Style,
    };
    console.log(typeRoom);
    try {
      await axios.patch(
        `http://localhost:8081/typeroom-update/${typeRoomId}`,
        typeRoom,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      Swal.fire({
        text: "Sửa kiểu phòng thành công.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error inserting hotetype room:", error.message);

      Swal.fire({
        text: "Sửa kiểu phòng thất bại.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleSubmitDeleteTypeRoom = async (typeRoomId) => {
    try {
      await axios.delete(
        `http://localhost:8081/typeroom-delete/${typeRoomId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      Swal.fire({
        text: "Xóa kiểu phòng thành công.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error inserting hotel:", error.message);
      Swal.fire({
        text: "Xóa kiểu phòng không thành công.",
        icon: "error",
        showConfirmButton: true,
        timer: 2000,
      });
    }
  };

  return (
    <div style={{}}>
      <div>
        <PartnerHeader />
      </div>
      <div className="Body font-app" style={{ display: "flex" }}>
        <div
          style={{
            flex: "0 0 17%",
            padding: "3% 0 2% 3% ",
          }}
        >
          <PartnerMenu />
        </div>
        <div
          className="main"
          style={{
            flex: "0 0 81%",
            backgroundColor: "white",
            border: "1px solid lightgrey",
            borderRadius: "20px",
            margin: "2% 2% 50px 0 ",
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
            Chỗ ở đang cho thuê
          </label>
          <hr style={{ width: "96%", margin: "0 2% 20px 2%" }} />
          <div
            style={{ overflowX: "auto", overflowY: "auto", height: "380px" }}
          >
            <table className="w-full ">
              <thead
                style={{
                  background: "rgb(79, 195, 247)",
                  color: "white",
                  height: "50px",
                }}
              >
                <tr>
                  <th>Hotel ID</th>
                  <th>Hình ảnh</th>
                  <th>Tên khách sạn</th>
                  <th>Địa chỉ</th>
                  <th>Hạng sao</th>
                  <th>Trạng thái</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {hotels.map((items) => (
                  <tr
                    key={items.Hotel_id}
                    style={{ borderTop: "1px solid #EEEEEE" }}
                    onClick={() => {
                      setSelectedHotel(items);
                      fetchTypeRoomData(items.Hotel_id);
                    }}
                  >
                    <td>{items.Hotel_id}</td>
                    <td>
                      <img
                        src={`../assets/${items.Hotel_Image}`}
                        alt={items.Hotel_Name}
                        style={{ width: "70px", height: "50px" }}
                      />
                    </td>
                    <td>{items.Hotel_Name}</td>
                    <td>{items.Hotel_Location}</td>
                    <td>{items.Category_id}</td>
                    <td>{StatusToString(items.status)}</td>
                    <td>
                      <button
                        style={{
                          border: "0px",
                          borderRadius: "5px",
                          color: "white",
                          background: "#FF6600",
                          padding: "2px 5px",
                        }}
                        onClick={() => {
                          handleEditClick(items);
                          openEditModal();
                        }}
                      >
                        Sửa
                      </button>
                    </td>

                    <td>
                      <button
                        style={{
                          border: "0px",
                          borderRadius: "5px",
                          color: "white",
                          background: "#FF0000",
                          padding: "2px 5px",
                        }}
                        onClick={() => {
                          handleSubmitDelete(items.Hotel_id);
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={closeEditModal}
            style={{
              content: {
                width: "70%",
                height: "100%",
                margin: "auto",
                overflow: "auto",
              },
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "700" }}>
              Chỉnh sửa thông tin khách sạn
            </h2>
            <hr style={{ width: "96%", margin: "2% 2% 20px 2%" }} />
            {selectedHotel && (
              <>
                <div className="tt1 ml-[20px] mr-[20px]">
                  <p className="text-[#000000] font-app text-[18px] font-bold">
                    Địa chỉ cho thuê
                  </p>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p class="dcct">Địa chỉ cụ thể</p>
                      <input
                        style={{
                          marginTop: "6px",
                          height: "35px",
                        }}
                        type="text"
                        value={
                          hotelData.hotelLocation ||
                          selectedHotel.Hotel_Location
                        }
                        onChange={(e) =>
                          setHotelData({
                            ...hotelData,
                            hotelLocation: e.target.value,
                          })
                        }
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
                      <p class="tks">Tên Khách sạn</p>
                      <input
                        class="iptks"
                        type="text"
                        name="Hotel_Name"
                        value={hotelData.hotelName || selectedHotel.Hotel_Name}
                        onChange={(e) =>
                          setHotelData({
                            ...hotelData,
                            hotelName: e.target.value,
                          })
                        }
                        className="border border-gray-200 rounded-md w-[100%] p-4  "
                        required
                      />
                    </div>

                    <div className="h-[35px] w-[40%] ">
                      <p>Hạng sao</p>

                      <select
                        className="outline-none border border-gray-300 p-1 w-[100%] rounded-md"
                        onChange={(e) =>
                          setHotelData({
                            ...hotelData,
                            hotelCategory: e.target.value,
                          })
                        }
                      >
                        <option value="" selected>
                          ---Chọn hạng sao---
                        </option>
                        {category.map((item) => (
                          <option
                            key={item.Category_id}
                            value={
                              item.Category_id || selectedHotel.Hotel_Category
                            }
                          >
                            {"Khách sạn " + item.Category_Name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-[30px]">
                    <p class="ttmt">Thông tin mô tả</p>
                    <div>
                      <textarea
                        class="ipttmt"
                        value={
                          hotelData.Description || selectedHotel.Description
                        }
                        onChange={(e) =>
                          setHotelData({
                            ...hotelData,
                            Description: e.target.value,
                          })
                        }
                        className="border border-gray-300 p-2 w-full rounded-md h-[100px]"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </>
            )}
            {selectedHotel && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    handleSubmitUpdateHotel(selectedHotel.Hotel_id);
                    setEditedHotel(null);
                    closeEditModal();
                  }}
                  style={{
                    border: "0px",
                    borderRadius: "5px",
                    color: "white",
                    padding: "8px 25px",
                    background: "#4fc3f7",
                    marginLeft: "50%",
                    marginRight: "5%",
                  }}
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeEditModal();
                    setEditedHotel(null);
                  }}
                  style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    padding: "8px 25px",
                  }}
                >
                  Hủy
                </button>
              </>
            )}
          </Modal>

          <div>
            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                marginBottom: "50px",
              }}
            >
              <table className="w-full ">
                <thead
                  style={{
                    background: "rgb(79, 195, 247)",
                    color: "white",
                    height: "50px",
                  }}
                >
                  <tr>
                    <th>TypeRoom ID</th>
                    <th>Hotel ID</th>
                    <th>Tên loại phòng</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                {selectedHotel && (
                  <tbody style={{ textAlign: "center" }}>
                    {typeroomData.map((typeroom) => (
                      <tr
                        key={typeroom.TypeRoom_id}
                        style={{ borderTop: "1px solid #EEEEEE" }}
                      >
                        <td>{typeroom.TypeRoom_id}</td>
                        <td>{typeroom.Hotel_id}</td>
                        <td>{typeroom.TypeRoom_Name}</td>
                        <td>
                          <button
                            style={{
                              border: "0px",
                              borderRadius: "5px",
                              color: "white",
                              background: "#FF6600",
                              padding: "2px 5px",
                            }}
                            onClick={() => {
                              handleEditClick2(typeroom);
                              openEditTypeRoomModal(typeroom.TypeRoom_id);
                            }}
                          >
                            Sửa
                          </button>
                        </td>

                        <td>
                          <button
                            type="button"
                            style={{
                              border: "0px",
                              borderRadius: "5px",
                              color: "white",
                              background: "#FF0000",
                              padding: "2px 5px",
                              margin: "10px 0",
                            }}
                            onClick={() => {
                              handleSubmitDeleteTypeRoom(typeroom.TypeRoom_id);
                            }}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>

          <Modal
            isOpen={isEditTypeRoomModalOpen}
            onRequestClose={closeEditTypeRoomModal}
            style={{
              content: {
                width: "96%",
                height: "100%",
                margin: "auto",
                overflow: "auto",
              },
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "700" }}>
              Chỉnh sửa thông tin loại phòng
            </h2>
            <hr style={{ width: "96%", margin: "2% 2% 20px 2%" }} />
            {selectedTypeRoom && (
              <>
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
                      value={
                        typeData.typeroomName || selectedTypeRoom.TypeRoom_Name
                      }
                      onChange={(e) =>
                        setTypeData({
                          ...typeData,
                          typeroomName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="w-[25%]">
                    <p>Sức chứa tối đa</p>
                    <input
                      type="text"
                      name="Hotel_Name"
                      className="border border-gray-200 rounded-md w-[100%] p-4  "
                      value={typeData.maxLoad || selectedTypeRoom.MaxLoad}
                      onChange={(e) =>
                        setTypeData({
                          ...typeData,
                          maxLoad: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="w-[50%]">
                    <p>Giá cơ bản/phòng/đêm (Đơn vị VNĐ)</p>
                    <input
                      type="text"
                      name="Hotel_Name"
                      className="border border-gray-200 rounded-md w-[100%] p-4 "
                      value={
                        typeData.typeroomPrice ||
                        selectedTypeRoom.TypeRoom_Price
                      }
                      onChange={(e) =>
                        setTypeData({
                          ...typeData,
                          typeroomPrice: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={
                      selectedTypeRoom.TypeRoom_Style || typeData.typeRoomStyle
                    }
                    onChange={(e) =>
                      setTypeData({
                        ...typeData,
                        typeRoomStyle: e.target.value,
                      })
                    }
                    className="outline-none border border-gray-200  w-[30%] rounded-md h-[35px] mt-[50px] pl-[2%] pr-[2%]"
                  >
                    <option value="" selected>
                      ---Chọn kiểu phòng---
                    </option>
                    <option value="type1">Giường đôi</option>
                    <option value="type2">Giường đơn</option>
                    <option value="type3">Giường king</option>
                  </select>
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
                          checked={bathroomAmenities.includes(
                            "Phòng tắm riêng"
                          )}
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
                          checked={bathroomAmenities.includes(
                            "Phòng tắm chung"
                          )}
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
                          checked={bedroomAmenities.includes(
                            "Điều hòa nhiệt độ"
                          )}
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
                          checked={bedroomAmenities.includes(
                            "Khu vực tiếp khách"
                          )}
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
                          checked={bedroomAmenities.includes(
                            "Dép đi trong nhà"
                          )}
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
                          checked={otherAmenities.includes(
                            "Chấp nhận thú cưng"
                          )}
                        />{" "}
                        Chấp nhận thú cưng
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="otherAmenities"
                          value="Dọn phòng hàng ngày"
                          onChange={handleOtherAmenitiesChange}
                          checked={otherAmenities.includes(
                            "Dọn phòng hàng ngày"
                          )}
                        />{" "}
                        Dọn phòng hàng ngày
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="otherAmenities"
                          value="Tầm nhìn ra khung cảnh"
                          onChange={handleOtherAmenitiesChange}
                          checked={otherAmenities.includes(
                            "Tầm nhìn ra khung cảnh"
                          )}
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
                          checked={otherAmenities.includes(
                            "Nước suối miễn phí"
                          )}
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
              </>
            )}

            {selectedTypeRoom && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    closeEditTypeRoomModal();
                    handleSubmitUpdateTypeRoom(selectedTypeRoom.TypeRoom_id);
                    setEditedTypeRoom(null);
                    closeEditModal();
                  }}
                  style={{
                    border: "0px",
                    borderRadius: "5px",
                    color: "white",
                    padding: "8px 25px",
                    background: "#4fc3f7",
                    marginLeft: "50%",
                    marginRight: "5%",
                  }}
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeEditTypeRoomModal();
                    setEditedTypeRoom(null);
                  }}
                  style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    padding: "8px 25px",
                  }}
                >
                  Hủy
                </button>
              </>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}
