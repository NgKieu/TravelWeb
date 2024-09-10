import React, { useState, useEffect } from "react";
import axios from "axios";
import PartnerHeader from "./PartnerHeader"; // Import PartnerHeader component
import "./css/PartnerBody.css";
import PartnerMenu from "./PartnertMenu";
import { format } from "date-fns";

export default function PartnerReview() {
  const [selectedHotelId, setSelectedHotelId] = useState("default");
  const [hotelOptions, setHotelOptions] = useState([]);
  const handleHotelChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedHotelId(selectedValue);

    // Call the API request to get the list of reviews based on the selected Hotel_ID
    axios
      .get(`http://localhost:8081/getReviewByHotelId/${selectedValue}`) // Change the API endpoint
      .then((response) => {
        let sortedData = [...response.data];
        sortedData.sort(
          (a, b) => new Date(b.DateCreate) - new Date(a.DateCreate)
        ); // Sort by new to old
        setData(sortedData); // Update the data state with the fetched and sorted review data
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  };

  const [sortReview, setSortReview] = useState("newToOld");
  const handleSortChange = (value) => {
    setSortReview(value);
  };
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/getReview", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        let sortedData = [...response.data];
        if (sortReview === "newToOld") {
          sortedData.sort(
            (a, b) => new Date(b.DateCreate) - new Date(a.DateCreate)
          );
        } else if (sortReview === "oldToNew") {
          sortedData.sort(
            (a, b) => new Date(a.DateCreate) - new Date(b.DateCreate)
          );
        }
        setData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  }, [sortReview]);
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
            Phản hồi khách hàng
          </label>
          <hr style={{ width: "96%", margin: "0 2% 20px 2%" }} />
          <select
            style={{
              margin: "0 0 2% 2%",
              padding: "0 20px",
              border: "1px solid grey",
              width: "30%",
              height: "40px",
            }}
            value={sortReview}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="newToOld">Ngày đăng mới nhất</option>
            <option value="oldToNew">Ngày đăng cũ nhất</option>
          </select>
          <select
            style={{
              margin: "0 0 2% 10%",
              padding: "0 20px",
              border: "1px solid grey",
              width: "30%",
              height: "40px",
            }}
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
          <table className="w-full ">
            <thead className="bg-[#4FC3F7] h-12 text-[#FFFFFF]">
              <th>Review ID</th>
              <th>User ID</th>
              <th>Hotel ID</th>
              <th>Rating</th>
              <th>Ngày đăng</th>
              <th className="w-[65%]">Comment</th>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {data.map((items) => (
                <tr
                  key={items.Review_id}
                  style={{ borderTop: "1px solid #EEEEEE" }}
                >
                  <td>{items.Review_id}</td>
                  <td>{items.User_id}</td>
                  <td>{items.Hotel_id}</td>
                  <td>{items.Rating}</td>
                  <td>{format(new Date(items.DateCreate), "dd-MM-yyyy")}</td>
                  <td>{items.Comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
