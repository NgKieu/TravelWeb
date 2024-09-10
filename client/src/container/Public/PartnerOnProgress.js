import React, { useState, useEffect } from "react";
import axios from "axios";
import PartnerHeader from "./PartnerHeader";
import "./css/PartnerBody.css";
import PartnerMenu from "./PartnertMenu";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const StatusToString = (status) => {
  return status === 0 ? "Chưa được duyệt" : "Đã duyệt";
};
export default function PartnerOnProgress() {
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

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/partner-on-progress", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  }, []);

  return (
    <div style={{}}>
      <div>
        {/* repair */}
        {notoken == 1 ? <PartnerHeader /> : null}
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
            margin: "2% 2% 30px 0 ",
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
            Chỗ ở đang chờ duyệt
          </label>
          <hr style={{ width: "96%", margin: "0 2% 20px 2%" }} />
          <table className="w-full ">
            <thead className="bg-[#4FC3F7] h-12 text-[#FFFFFF]">
              <th>Hotel ID</th>
              <th>Hình ảnh</th>
              <th>Tên khách sạn</th>
              <th>Địa chỉ</th>
              <th>Hạng sao</th>
              <th>Trạng thái</th>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {data.map((items) => (
                <tr>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
