import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./css/Login.css";
const Register = () => {
    const [emailre, setEmail] = useState('');
    const [emailveri, setEmailVeri] = useState('');
    const [hoten, setHoten] = useState('');
    const [sdtre, setSdt] = useState('');
    const [matkhau, setMatKhau] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        axios
            .post('http://localhost:8081/register', { emailre, hoten, sdtre, matkhau })
            .then(res => {
                console.log(res);
                if (res.data === 'Đăng ký thành công!') {
                    localStorage.setItem('emailveri', emailre);
                    Swal.fire({
                        title: 'Đăng ký thành công!',
                        text: 'Vui lòng xác minh qua Email đăng ký',
                        icon: 'success',
                      });
                      axios.post('http://localhost:8081/sendemail', { emailveri })
                      .then(result => {
                          if (result.data === "Gửi thành công") {

                          } else {
                              Swal.fire({
                                  title: 'Gửi thất bại!',
                                  text: '',
                                  icon: 'error',
                                  showConfirmButton: false,
                                  timer: 2000
                              })
                          }
                      })
                      .catch(error => {
                          console.log(error);
                          Swal.fire({
                              title: 'Gửi email xác minh thất bại!',
                              text: '',
                              icon: 'error',
                              showConfirmButton: false,
                              timer: 2000
                          })
                      });
                        navigate('/login');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Đăng ký thất bại!.',
                        text: res.data,
                      })
                }
            })
            .catch(err => console.log(err));
    }
    function handleCloseDialog() {
        setErrorMessage('');
      }


    return (
        <div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Email </label>
                        <input type="text" name="email" id="nhapemail" required placeholder="Nhập email"
                            onChange={e => {setEmail(e.target.value)
                                            setEmailVeri(e.target.value)}}
                        />
                    </div>
                    <div className="input-container">
                        <label>Họ tên </label>
                        <input type="text" name="email" id="nhapemail" required placeholder="Nhập họ tên"
                            onChange={e => setHoten(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label>Số điện thoại </label>
                        <input type="text" name="email" id="nhapemail" required placeholder="Nhập số điện thoại"
                            onChange={e => setSdt(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label>Mật khẩu </label>
                        <input type="password" name="pass" id="nhapmatkhau" required placeholder="Nhập mật khẩu"
                            onChange={e => setMatKhau(e.target.value)}
                        />
                    </div>
                    <div className="button-container">
                        <button id="btndangnhap" type="submit">
                            Đăng ký
                        </button>
                    </div>
                </form>
            </div>
            {showSuccessDialog && (
                <div className="dialog">
                    <p>Đăng ký thành công!</p>
                    <button onClick={handleCloseDialog}>Đóng</button>

                </div>
            )}
            {errorMessage && (
                <div className="dialog">
                    <p>{errorMessage}</p>
                    <button onClick={handleCloseDialog}>Đóng</button>
                </div>
            )}
        </div>
    )
}

export default Register