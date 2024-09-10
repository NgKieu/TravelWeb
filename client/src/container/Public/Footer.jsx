import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { path } from '../../ultils/constaint';
import logo from "../../assets/logo.svg";


const Footer = () => {
    const navigate = useNavigate();

    const goHome = useCallback(() => {
        navigate(path.HOME);
    });
    return (
        <div className='relative top-[670px] max-w-[1188px] h-[420px] mx-auto'>
            <img src={logo} alt="logo" onClick={goHome} className="w-[200px] h-[60px] cursor-pointer mb-5" />
            <div className='grid grid-cols-3 gap-3'>
                <div className='col-span-1 font-bold'>Công ty cổ phần du lịch Việt Nam VNTravel</div>
                <div className='col-span-1 font-bold'>Chính sách & Quy định</div>
                <div className='col-span-1 font-bold'>Khách hàng và đối tác</div>

                <div className='col-span-1'>Tổng đài chăm sóc: 0772553518</div>
                <div className='col-span-1'>Điều khoản và điều kiện</div>
                <div className='col-span-1'>Đăng nhập HMS</div>

                <div className='col-span-1'>Email: thanhdq2509@gmail.com</div>
                <div className='col-span-1'>Quy định về thanh toán</div>
                <div className='col-span-1'>Chương trình khách hàng thân thiết</div>

                <div className='col-span-1'>Văn phòng Hà Nội: Tầng 11, Tòa Peakview, 36 Hoàng Cầu, Đống Đa</div>
                <div className='col-span-1'>Chính sách bảo mật thông tin</div>
                <div className='col-span-1'>Chương trình đánh giá trải nghiệm khách sạn</div>

                <div className='col-span-1'>Văn phòng HCM: Tầng 3, Tòa nhà ACM, 96 Cao Thắng, Quận 3</div>
                <div className='col-span-1'>Quy chế hoạt động</div>
                <div className='col-span-1'>Tuyển dụng</div>
            </div>
            <div className='flex mt-5'>
                <img src='../../assets/logo-congthuong-w165.png' />
                <img src='../../assets/logo-dathongbao-bocongthuong-w165.png' />
            </div>

        </div>
    )
}

export default Footer