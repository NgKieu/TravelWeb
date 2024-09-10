import React, { useCallback, useState, useEffect } from 'react'
import logo from "../../assets/logo.svg";
import { useNavigate, } from 'react-router-dom';
import { path } from "../../ultils/constaint";
import '../../index.css'
import axios from 'axios';


const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const BookingHistory = () => {

    const navigate = useNavigate();
    const goHome = useCallback(() => {
        navigate(path.HOME);
    });

    const [order, setOrder] = useState([]);
    useEffect(() => {
        axios
            .post(`http://localhost:8081/showBookingHistory`, {
                userID: localStorage.getItem('idUser')
            })
            .then((res) => {
                setOrder(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="relative w-full mt-5 bg-[#F7FAFC]">
            <div className="m-auto h-full">
                <img src={logo} alt="logo" onClick={goHome} className="w-[143px] h-[40px] mx-auto cursor-pointer" />

                <div className='p-3 flex items-center mt-10 text-[20px] justify-center font-bold bg-white shadow2 cursor-pointer'>
                    <div>Lịch sử đặt hàng</div>
                </div>

                <div className='p-1 py-3 mt-2 bg-[#FF3366] text-white items-center shadow2 cursor-pointer grid grid-cols-12 gap-4 border-b-[3px] border-[#cf4242]'>
                    <div className='col-span-2 text-center'>Khách sạn</div>
                    <div className='col-span-2 text-center'>Kiểu phòng</div>
                    <div className='col-span-1 text-center'>Tên người đặt</div>
                    <div className='col-span-1 text-center'>Số điện thoại người đặt</div>
                    <div className='col-span-1 text-center'>Ngày đến</div>
                    <div className='col-span-1 text-center'>Ngày đi</div>
                    <div className='col-span-1 text-center'>Thời gian thanh toán</div>
                    <div className='col-span-1 text-center'>Giá phòng(1 ngày)</div>
                    <div className='col-span-1 text-center'>Tổng thành tiền</div>
                    <div className='col-span-1 text-center'>Trạng thái</div>


                </div>
                {
                    order.map((data, i) => (
                        <div className='p-1 bg-white items-center cursor-pointer grid grid-cols-12 gap-4 py-5' key={i}>
                            <div className='col-span-2 text-center'>{data.Hotel_Name}</div>
                            <div className='col-span-2 text-center'>{data.TypeRoom_Name}</div>
                            <div className='col-span-1 text-center'>{data.User_Name}</div>
                            <div className='col-span-1 text-center'>{data.User_Phone}</div>
                            <div className='col-span-1 text-center'>{data.CheckIn}</div>
                            <div className='col-span-1 text-center'>{data.CheckOut}</div>
                            <div className='col-span-1 text-center'>{data.TimeInsert}</div>
                            <div className='col-span-1 text-center'>{formatCurrency(data.TypeRoom_Price)}</div>
                            <div className='col-span-1 text-center'>{formatCurrency(data.PriceBefore)}(x{data.SoNgay})</div>
                            {
                               data.Order_Status == 1 ? (<div className='col-span-1 text-center'>Đang chờ</div>) : 
                               data.Order_Status == 2 ? (<div className='col-span-1 text-center'>Đã đến</div>) : 
                               (<div className='col-span-1 text-center'>Đã rời đi</div>)
                            }
                        </div>
                    ))
                }



            </div>
        </div>
    )
}

export default BookingHistory