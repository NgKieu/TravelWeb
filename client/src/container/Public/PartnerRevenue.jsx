import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import PartnerHeader from "./PartnerHeader";
import "./css/PartnerBody.css";
import PartnerMenu from "./PartnertMenu";
import { MdSell } from "react-icons/md";
import { BsCreditCardFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { format } from "date-fns";

export default function PartnerRevenue() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPriceAfter, setTotalPriceAfter] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("all"); // Default is all
  const [selectedYear, setSelectedYear] = useState("2023");

  const token = localStorage.getItem("token");

  // Define xValues, yValues, and barColors here
  const xValues = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const yValues = [];
  const barColors = [
    "#4FC3F7",
    "#4FC3F7",
    "#4FC3F7",
    "#4FC3F7",
    "#4FC3F7",
    "#4FC3F7",
    "#4FC3F7",
    "#4FC3F7",
    "#4FC3F7",
    "#4FC3F7",
    "#4FC3F7",
    "#4FC3F7",
  ];
  const [chartData, setChartData] = useState({
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues, // Change this to monthlyRevenue
      },
    ],
  });

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    if (ctx) {
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: "bar",
        data: chartData, // Use the chartData state here
        options: {
          plugins: {
            legend: { display: false },
            title: {
              display: true,
            },
          },
        },
      });
    }
  }, [chartData]);

  const filterDataByMonth = (data, month) => {
    if (month === "all") {
      return data;
    }

    return data.filter((item) => {
      const checkoutMonth = new Date(item.CheckOut).getMonth() + 1; // Lưu ý: getMonth() trả về giá trị từ 0 đến 11
      return checkoutMonth.toString() === month;
    });
  };

  const OrderStatusToString = (Order_Status) => {
    console.log(Order_Status);
    return Order_Status == 3 ? "Đã hoàn thành" : "Không xác định";
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/getOrderRevenue", {
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
  const filterDataByYear = (data, year) => {
    if (year === "all") {
      return data;
    }

    return data.filter((item) => {
      const checkoutYear = new Date(item.CheckOut).getFullYear();
      return checkoutYear.toString() === year;
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/getOrderRevenue", {
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

  useEffect(() => {
    axios
      .get("http://localhost:8081/getOrderRevenue", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        const filteredDataByYear = filterDataByYear(
          response.data,
          selectedYear
        );
        const filteredDataByMonth = filterDataByMonth(
          filteredDataByYear,
          selectedMonth
        );

        const yearlyRevenue = Array.from({ length: 12 }, () => 0);

        filteredDataByYear.forEach((order) => {
          const checkoutMonth = new Date(order.CheckOut).getMonth();
          yearlyRevenue[checkoutMonth] += order.PriceAfter;
        });

        setTotalOrders(filteredDataByMonth.length);
        setTotalPriceAfter(
          filteredDataByMonth.reduce((acc, order) => acc + order.PriceAfter, 0)
        );

        setChartData({
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yearlyRevenue,
            },
          ],
        });

        setData(filteredDataByMonth);
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  }, [selectedYear, selectedMonth]);

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
            Quản lý doanh thu
          </label>
          <hr style={{ width: "96%", margin: "0 2% 20px 2%" }} />
          <select
            style={{
              margin: "0 2%",
              padding: "0 20px",
              border: "1px solid grey",
              width: "30%",
              height: "40px",
            }}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="1">Tháng 1</option>
            <option value="2">Tháng 2</option>
            <option value="3">Tháng 3</option>
            <option value="4">Tháng 4</option>
            <option value="5">Tháng 5</option>
            <option value="6">Tháng 6</option>
            <option value="7">Tháng 7</option>
            <option value="8">Tháng 8</option>
            <option value="9">Tháng 9</option>
            <option value="10">Tháng 10</option>
            <option value="11">Tháng 11</option>
            <option value="12">Tháng 12</option>
            <option value="all">Cả năm</option>
          </select>
          <select
            style={{
              margin: "0 2%",
              padding: "0 20px",
              border: "1px solid grey",
              width: "30%",
              height: "40px",
            }}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2025">2026</option>
            <option value="2025">2027</option>
          </select>
          <div //sơ đồ
            style={{
              margin: "2%",
              width: "96%",
              height: "500px",
              border: "1px solid #EEEEEE",
            }}
          >
            <canvas
              id="myChart"
              style={{ minWidth: "98%", maxHeight: "500px" }} // Add maxWidth property
            ></canvas>
          </div>

          <div //Hiển thị dữ liệu
            style={{
              margin: "30px 2% 20px 2%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                marginRight: "0.5%",
                padding: "0 20px 0 20px",
                display: "flex",
                alignItems: "center",
                border: "1px solid grey",
                width: "50%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  border: "0px",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "rgb(79, 195, 247)",
                }}
              >
                <MdSell size={26} />
              </div>

              <div style={{ marginLeft: "25px" }}>
                <span
                  className="Done"
                  style={{
                    color: "rgb(79, 195, 247)",
                    fontSize: "26px",
                    fontWeight: "500",
                  }}
                >
                  {totalOrders}
                </span>
                <br />
                <label style={{ fontSize: "18px" }}>Đơn hàng hoàn thành</label>
              </div>
            </div>

            <div
              style={{
                marginRight: "0.5%",
                padding: "0 20px 0 20px",
                display: "flex",
                alignItems: "center",
                border: "1px solid grey",
                width: "50%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  border: "0px",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "rgb(79, 195, 247)",
                }}
              >
                <BsCreditCardFill size={26} />
              </div>

              <div style={{ marginLeft: "25px" }}>
                <span
                  className="Total"
                  style={{
                    color: "rgb(79, 195, 247)",
                    fontSize: "26px",
                    fontWeight: "500",
                  }}
                >
                  {totalPriceAfter.toLocaleString("vi-VN")}
                </span>
                <br />
                <label style={{ fontSize: "18px" }}>Doanh thu</label>
              </div>
            </div>
          </div>
          <h2
            style={{
              marginTop: "2%",
              marginLeft: "2%",
              fontWeight: "700",
            }}
          >
            Thông tin đơn hàng
          </h2>
          <div
            style={{
              marginBottom: "2%",
              marginLeft: "2%",
              width: "96%",
              height: "500px",
              border: "1px solid #EEEEEE",
              overflow: "auto",
            }}
          >
            <table className="w-full ">
              <thead className="bg-[#4FC3F7] h-12 text-[#FFFFFF]">
                <th style={{ padding: "0 10px" }}>Oder ID</th>
                <th style={{ padding: "0 10px" }}>Hotel ID</th>
                <th style={{ padding: "0 10px" }}>User name</th>
                <th style={{ padding: "0 10px" }}>User phone</th>
                <th style={{ padding: "0 10px" }}>CheckOut</th>
                <th style={{ padding: "0 10px" }}>Price After </th>
                <th style={{ padding: "0 10px" }}>Order status </th>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {filterDataByMonth(data, selectedMonth).map((items, index) => (
                  <tr key={index} style={{ borderTop: "1px solid #EEEEEE" }}>
                    <td>{items.Order_id}</td>
                    <td>{items.Hotel_id}</td>
                    <td>{items.User_Name}</td>
                    <td>{items.User_Phone}</td>
                    <td>{format(new Date(items.CheckOut), "dd-MM-yyyy")}</td>
                    <td>{items.PriceAfter.toLocaleString("vi-VN")}</td>
                    <td className="h-14">
                      {OrderStatusToString(items.Order_Status)}
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
