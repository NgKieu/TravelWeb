import React, { useState, useEffect } from "react";
import axios from "axios";
import PartnerHeader from "./PartnerHeader";
import "./css/PartnerBody.css";
import PartnerMenu from "./PartnertMenu";

export default function PartnerInsertRoom() {
  const [TypeRoom, setTypeRoom] = useState("");
  const [data, setData] = useState([]);
  const [roomdata, setRoomData] = useState([]);
  const [typeName, setTypeName] = useState(""); // State to hold the selected type name
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");
  const [hotelOptions, setHotelOptions] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("default");
  const [validTypeRoom, setValidTypeRoom] = useState(false);

  const checkTypeRoomExists = async (typeRoomId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/checkTypeRoom/${typeRoomId}`
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking TypeRoom existence", error);
      return false;
    }
  };

  const handleDeleteRoom = (roomId) => {
    deleteRoom(roomId);
  };
  const addRoom = () => {
    // Kiểm tra xem đã chọn loại phòng và nhập tên phòng chưa
    if (TypeRoom !== "default" && typeName !== "") {
      const newRoomData = {
        TypeRoom_id: TypeRoom,
        Room_Name: typeName,
      };

      // Tạo một mảng để chứa tất cả các request axios
      const axiosRequests = [];

      // Thêm các request vào mảng dựa trên giá trị quantity
      for (let i = 0; i < quantity; i++) {
        axiosRequests.push(
          axios.post("http://localhost:8081/addRoom", newRoomData)
        );
      }

      // Sử dụng Promise.all để thực hiện tất cả các request cùng một lúc
      Promise.all(axiosRequests)
        .then((responses) => {
          console.log("Rooms added successfully");
          // Reload the page to refresh the room list
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error adding rooms", error);
        });
    } else {
      alert("Vui lòng chọn loại phòng và nhập tên phòng");
    }
  };

  const deleteRoom = (roomId) => {
    axios
      .delete(`http://localhost:8081/deleteRoom/${roomId}`)
      .then((response) => {
        console.log("Room deleted successfully");
        // Reload the page to refresh the room list
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting room", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/getRoom", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(async (response) => {
        if (Array.isArray(response.data)) {
          const roomData = response.data;

          // Collect all unique TypeRoom_ids from roomData
          const typeRoomIds = [
            ...new Set(roomData.map((room) => room.TypeRoom_id)),
          ];

          // Check if each TypeRoom_id exists in type_rooms
          const typeRoomExistencePromises = typeRoomIds.map(
            async (typeRoomId) => {
              return await checkTypeRoomExists(typeRoomId);
            }
          );

          // Check if all TypeRoom_ids exist
          const allTypeRoomsExist = (
            await Promise.all(typeRoomExistencePromises)
          ).every((exists) => exists);

          setValidTypeRoom(allTypeRoomsExist);

          // Filter and set room data based on valid TypeRoom_ids
          const filteredRoomData = roomData.filter((room) => {
            return typeRoomIds.includes(room.TypeRoom_id);
          });

          setRoomData(filteredRoomData);
        } else {
          console.error("API response is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  }, []);

  const getTypeRoomNameByIdFromAPI = (typeRoomId) => {
    axios
      .get(`http://localhost:8081/getTypeRoomsById/${typeRoomId}`)
      .then((response) => {
        const typeName = response.data[0].TypeRoom_Name;
        setTypeName(typeName);
      })
      .catch((error) => {
        console.error("Error fetching type name from API", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/partner-home", {
        headers: {
          Authorization: `${token}`,
        },
      }) // Thay đổi URL tùy theo endpoint lấy danh sách khách sạn
      .then((response) => {
        if (Array.isArray(response.data)) {
          setHotelOptions(response.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching hotel data from API", error);
      });
  }, []);

  const handleHotelChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedHotelId(selectedValue);

    // Call the new API request to get the list of TypeRooms based on the selected Hotel_ID
    axios
      .get(`http://localhost:8081/getTypeRoomsByHotelId/${selectedValue}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  };

  useEffect(() => {
    if (selectedHotelId !== "default") {
      axios
        .get(`http://localhost:8081/getTypeRoomsByHotelId/${selectedHotelId}`)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data from API", error);
        });
    }
  }, [selectedHotelId]);
  const handleTypeRoomChange = (e) => {
    const selectedValue = e.target.value;
    setTypeRoom(selectedValue);

    // Call the new API request to get the type name based on TypeRoom_id
    getTypeRoomNameByIdFromAPI(selectedValue);
  };

  return (
    <div>
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
            Quản lý phòng
          </label>
          <hr style={{ width: "96%", margin: "0 2% 20px 2%" }} />
          <h2 className=" mx-[2%] ">
            <b>Thêm phòng</b>
          </h2>
          <div className="mx-[2%]  flex">
            <div className=" w-[20%]">
              <p>Hotel ID </p>
              <select
                className="outline-none border border-gray-300 h-[32px] w-[100%] rounded-md"
                value={selectedHotelId}
                onChange={handleHotelChange} // This is where the event is captured
              >
                <option value="default">---Chọn Hotel_ID---</option>
                {hotelOptions.map((item) => (
                  <option key={item.Hotel_id} value={item.Hotel_id}>
                    {item.Hotel_id}
                  </option>
                ))}
              </select>
            </div>
            <div className=" w-[22%] ml-[3%]">
              <p>TypeRoom ID </p>
              <select
                className="outline-none border border-gray-300 h-[32px] w-[100%] rounded-md"
                value={TypeRoom}
                onChange={handleTypeRoomChange} // This is where the event is captured
              >
                <option value="default">---Chọn TypeRoom_ID---</option>
                {data.map((item) => (
                  <option key={item.TypeRoom_id} value={item.TypeRoom_id}>
                    {item.TypeRoom_id}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[45%] mx-[3%]">
              <p>Tên TypeRoom</p>
              <input
                type="text"
                className="border border-gray-200 rounded-md w-[100%] p-1"
                value={typeName} // Use the correct state variable
                readOnly
              />
            </div>
            <div className="w-[12%] ">
              <p>Số lượng </p>
              <input
                type="number"
                className="border border-gray-200 rounded-md w-[100%] p-1"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(parseInt(e.target.value))} // Cập nhật giá trị số lượng từ sự kiện onChange
                required
              />
            </div>
          </div>

          <button
            className="mt-[26px] border-none bg-[#4FC3F7] rounded-lg p-2 ml-[80%] text-white"
            onClick={addRoom}
          >
            Thêm phòng
          </button>
          <div
            style={{
              overflowX: "auto",
              marginBottom: "100px",
            }}
          >
            <h2
              style={{
                marginTop: "2%",
                marginLeft: "2%",
                fontWeight: "700",
              }}
            >
              Thông tin phòng
            </h2>
            <table className="w-full ">
              <thead className="bg-[#4FC3F7] h-12 text-[#FFFFFF]">
                <th style={{ padding: "0 10px" }}>Room ID</th>
                <th style={{ padding: "0 10px" }}>Room name</th>
                <th style={{ padding: "0 10px" }}>TypeRoom ID</th>
                <th></th>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {roomdata &&
                  roomdata.map((items, index) => (
                    <tr key={index} style={{ borderTop: "1px solid #EEEEEE" }}>
                      <td>{items.Room_id}</td>
                      <td>{items.Room_Name}</td>
                      <td>{items.TypeRoom_id}</td>
                      <td>
                        <button
                          style={{
                            border: "0px",
                            borderRadius: "5px",
                            color: "white",
                            background: "#FF0000",
                            padding: "2px 5px",
                            margin: "10px 0",
                          }}
                          onClick={() => handleDeleteRoom(items.Room_id)} // Sử dụng hàm trung gian
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
