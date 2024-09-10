import React, { useState, useEffect } from "react";
import axios from "axios";
import PartnerHeader from "./PartnerHeader";
import "./css/PartnerBody.css";
import PartnerMenu from "./PartnertMenu";
import { format } from "date-fns";

export default function PartnerOrder() {
  const orderStatusOptions = [
    { value: 1, label: "Đang chờ" },
    { value: 2, label: "Đang nhận" },
    { value: 3, label: "Đã hoàn thành" },
  ];

  const [selectedStatus, setSelectedStatus] = useState({});
  const [sortOrder, setSortOrder] = useState("newToOldID");
  const [hasChanges, setHasChanges] = useState(false); // Track changes
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(""); // State to store the selected filter

  const token = localStorage.getItem("token");

  // Function to load and filter data based on current selections
  const loadFilteredData = () => {
    console.log("Token:", token);
    axios

      .get("http://localhost:8081/getPartnerOrder", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        let sortedData = response.data.slice();

        // Sorting logic here...
        if (sortOrder === "newToOldID") {
          sortedData.sort(
            (a, b) => new Date(b.Order_id) - new Date(a.Order_id)
          );
        } else if (sortOrder === "oldToNewID") {
          sortedData.sort(
            (a, b) => new Date(a.Order_id) - new Date(b.Order_id)
          );
        }
        // Add more sorting logic for other options...
        else if (sortOrder === "newToOldCheckIn") {
          sortedData.sort((a, b) => new Date(b.CheckIn) - new Date(a.CheckIn));
        } else if (sortOrder === "oldToNewCheckIn") {
          sortedData.sort((a, b) => new Date(a.CheckIn) - new Date(b.CheckIn));
        } else if (sortOrder === "newToOldCheckOut") {
          sortedData.sort(
            (a, b) => new Date(b.CheckOut) - new Date(a.CheckOut)
          );
        } else if (sortOrder === "oldToNewCheckOut") {
          sortedData.sort(
            (a, b) => new Date(a.CheckOut) - new Date(b.CheckOut)
          );
        }

        // Filtering logic here...
        if (selectedFilter !== "") {
          sortedData = sortedData.filter(
            (item) => item.Order_Status.toString() === selectedFilter
          );
        }

        setFilteredData(sortedData);

        axios
          .post("http://localhost:8081/autoUpdateOrderStatus")
          .then((response) => {
            console.log(response.data.message);
            // Update the Order_Status of the existing filteredData
            setFilteredData((prevData) =>
              prevData.map((item) => ({
                ...item,
                Order_Status: selectedStatus[item.Order_id], // Use selectedStatus to get the new status
              }))
            );
          })
          .catch((error) => {
            console.error("Error auto-updating order status:", error);
          });

        sortedData.forEach((order) => {
          const currentDate = new Date();
          const checkoutDate = new Date(order.CheckOut);

          if (order.Order_Status === 3 && checkoutDate <= currentDate) {
            // Update room status for this order
            axios
              .post("http://localhost:8081/updateRoomStatus", {
                roomIds: [order.Room_id],
                newStatus: 0,
              })
              .then((response) => {
                console.log("Room status updated:", response.data.message);
              })
              .catch((error) => {
                console.error("Error updating room status:", error);
              });
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  };

  useEffect(() => {
    loadFilteredData(); // Load filtered data based on current selections
  }, [sortOrder, selectedFilter]);

  const handleStatusChange = (newStatus, orderId) => {
    setHasChanges(true);

    axios
      .post("http://localhost:8081/updateOrderStatus", {
        orderId: orderId,
        newStatus: newStatus,
      })
      .then((response) => {
        // Update data after status change
        setFilteredData((prevData) =>
          prevData.map((item) =>
            item.Order_id === orderId
              ? { ...item, Order_Status: newStatus }
              : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating order status", error);
      });
  };

  const handleSaveChanges = () => {
    setHasChanges(false); // Reset hasChanges after saving
    window.location.reload();
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
            overflowX: "auto", // Thêm khả năng cuộn ngang
          }}
        >
          <div style={{ display: "flex" }}>
            <label
              style={{
                display: "block",
                fontSize: "21px",
                fontWeight: "400",
                padding: "10px 20px",
              }}
            >
              Quản lý đơn hàng
            </label>
            {hasChanges && (
              <button
                type="button"
                onClick={handleSaveChanges}
                style={{
                  border: "0px",
                  borderRadius: "5px",
                  color: "white",
                  padding: "0 18px",
                  margin: "5px 0 0 70%",
                  background: "#4fc3f7",
                  height: "40px",
                }}
              >
                Lưu thay đổi
              </button>
            )}
          </div>

          <hr style={{ width: "96%", margin: "0 2% 20px 2%" }} />
          <select
            style={{
              margin: "0 0 2% 2%",
              padding: "0 20px",
              border: "1px solid grey",
              width: "30%",
              height: "40px",
            }}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newToOldID"> Order mới nhất</option>
            <option value="oldToNewID"> Order cũ nhất</option>
            <option value="newToOldCheckIn">Ngày CheckIn mới nhất</option>
            <option value="oldToNewCheckIn">Ngày CheckIn cũ nhất</option>
            <option value="newToOldCheckOut">Ngày CheckOut mới nhất</option>
            <option value="oldToNewCheckOut">Ngày CheckOut cũ nhất</option>
          </select>

          <select
            style={{
              margin: "0 0 2% 10%",
              padding: "0 20px",
              border: "1px solid grey",
              width: "30%",
              height: "40px",
            }}
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value=""> Tất cả order</option>
            <option value="1"> Order đang chờ</option>
            <option value="2"> Order đang nhận</option>
            <option value="3"> Order đã hoàn thành</option>
          </select>

          <div style={{ overflowX: "auto" }}>
            <table className="w-full ">
              <thead className="bg-[#4FC3F7] h-12 text-[#FFFFFF]">
                <th style={{ padding: "0 10px" }}>Oder ID</th>
                <th style={{ padding: "0 10px" }}>Hotel ID</th>
                <th style={{ padding: "0 10px" }}>TypeRoom ID</th>
                <th style={{ padding: "0 10px" }}>Room ID</th>
                <th style={{ padding: "0 10px" }}>User name</th>
                <th style={{ padding: "0 10px" }}>User phone</th>
                <th style={{ padding: "0 10px" }}>CheckIn</th>
                <th style={{ padding: "0 10px" }}>CheckOut</th>
                <th style={{ padding: "0 10px" }}>Price Before </th>
                <th style={{ padding: "0 10px" }}>Discount</th>
                <th style={{ padding: "0 10px" }}>Price After </th>
                <th style={{ padding: "0 10px" }}>Order status </th>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {filteredData.map((items, index) => (
                  <tr key={index} style={{ borderTop: "1px solid #EEEEEE" }}>
                    <td>{items.Order_id}</td>
                    <td>{items.Hotel_id}</td>
                    <td>{items.TypeRoom_id}</td>
                    <td>{items.Room_id}</td>
                    <td>{items.User_Name}</td>
                    <td>{items.User_Phone}</td>
                    <td>{format(new Date(items.CheckIn), "dd-MM-yyyy")}</td>
                    <td>{format(new Date(items.CheckOut), "dd-MM-yyyy")}</td>
                    <td>{items.PriceBefore.toLocaleString("vi-VN")}</td>
                    <td>{items.Discount}</td>
                    <td>{items.PriceAfter.toLocaleString("vi-VN")}</td>
                    <td className="h-14">
                      <select
                        style={{ border: "1px solid gray" }}
                        value={
                          selectedStatus[items.Order_id] || items.Order_Status
                        } // Sử dụng giá trị đã chọn trong đối tượng hoặc mặc định từ items.Order_Status
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          setSelectedStatus((prevStatus) => ({
                            ...prevStatus,
                            [items.Order_id]: newStatus, // Lưu trạng thái đã chọn vào đối tượng
                          }));
                          handleStatusChange(newStatus, items.Order_id);
                        }}
                      >
                        {orderStatusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
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
