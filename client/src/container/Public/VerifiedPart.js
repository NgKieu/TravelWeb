import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import "./css/Login.css";


const VerifiedPart = () => {
    const [email, setEmail] = useState('');
    const [emailveripart, setEmailVeri] = useState('');
    const [matkhau, setMatKhau] = useState('');
    const [sdt, setSdt] = useState('');
    const navigate = useNavigate();


    function datetime() {
        let timeveri ="";
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; 
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        timeveri = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        return timeveri;
    }
    datetime();
    const timeveri = datetime();
    function verified() {
        Swal.fire({
            title: 'Bạn có muốn xác minh?',
            text: "Đừng xác minh nếu bạn không rõ điều này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý xác minh'
        }).then((result) => {
            if (result.isConfirmed) {
                const emailveripart = localStorage.getItem('emailveripart');
                axios
                    .post('http://localhost:8081/verifiedpart', { timeveri, emailveripart })
                    .then(res => {
                        if (res.data == "Xác minh thành công") {

                            Swal.fire({
                                title: 'Xác minh thành công!',
                                text: '',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(() => {
                                window.close();
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Xác minh thất bại!.',

                            })
                        }
                    })
            } else {
                    navigate('/home');
            }
            
        })
    }
    verified();




    return (
        <div>
        </div>
    );
};

export default VerifiedPart;