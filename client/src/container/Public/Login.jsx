import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react';

import "./css/Login.css";



const Login = () => {
    const [email, setEmail] = useState('');

    const [matkhau, setMatKhau] = useState('');
    const [sdt, setSdt] = useState('');
    const navigate = useNavigate();
    const [emailre, setEmailRe] = useState('');
    const [emailveri, setEmailVeri] = useState('');
    const [hoten, setHoten] = useState('');
    const [sdtre, setSdtRe] = useState('');
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);





    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('containerlogin');

        function handleSignUpClick() {
            container.classList.add("right-panel-activelogin");
        }

        function handleSignInClick() {
            container.classList.remove("right-panel-activelogin");
        }

        signUpButton.addEventListener('click', handleSignUpClick);
        signInButton.addEventListener('click', handleSignInClick);

        return () => {
            signUpButton.removeEventListener('click', handleSignUpClick);
            signInButton.removeEventListener('click', handleSignInClick);
        };
    }, []);

    const handleKeyPressNotNum = (event) => {
        const charCode = event.which || event.keyCode;
        if (charCode >= 48 && charCode <= 57) {
          event.preventDefault();
        }
      };
    
      const handleKeyPressNotText = (event) => {
        const charCode = event.which || event.keyCode;
        if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
          event.preventDefault();
        }
      };

      const validatePhone = (phone) => {
        const phonePattern = /^\d{10,11}$/;
        setIsValidPhone(phonePattern.test(phone));
      };
    
      const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsValidEmail(emailPattern.test(email));
      };
    
      const handleInputEmailChange = (event) => {
        const newValue = event.target.value;
        setEmailRe(newValue);
        setEmailVeri(newValue);
        validateEmail(newValue);
      };
    
      const handleInputPhoneChange = (event) => {
        const newValue = event.target.value;
        setSdtRe(newValue);
        validatePhone(newValue);
      };
    
    

    function handleSubmitDK(event) {
        event.preventDefault();

        if(emailre !== "" && hoten !=="" && sdtre !=="" && matkhau !==""){
            if (!isValidEmail && isValidPhone) {
                Swal.fire({
                  icon: 'error',
                  text: 'Email phải đúng form: "@"..."."',
                  title: 'Email không hợp lệ!',
                });
              }
              else if (!isValidPhone && isValidEmail) {
                Swal.fire({
                  icon: 'error',
                  text: 'Số điện thoại phải từ 10-11 số',
                  title: 'Số điện thoại không hợp lệ!',
                });
              }
              else if (!isValidEmail && !isValidPhone){
                Swal.fire({
                    icon: 'error',
                    text: 'Email phải đúng form: "@"..."." và số điện thoại phải từ 10-11 số',
                    title: 'Email và số điện thoại không hợp lệ!',
                  });
              }
              else{
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
                            const signUpButton = document.getElementById('signUp');
                            const signInButton = document.getElementById('signIn');
                            const container = document.getElementById('containerlogin');
                            container.classList.remove("right-panel-activelogin");
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
        }
        else{
            Swal.fire({
                title: 'Vui lòng nhập đủ thông tin',
                text: '',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }


    function handleSubmit(event) {
        event.preventDefault();
        if(email !== "" && matkhau !==""){
        axios
            .post('http://localhost:8081/userLogin', { email, matkhau, sdt })
            .then(res => {
                if (res.data.length > 0 && res.data !== "Fail") {
                    const account = res.data[0];

                    if (account.email_verified_at == "" || account.email_verified_at == "null" || account.email_verified_at == undefined) {
                        Swal.fire({
                            title: 'Tài khoản chưa được xác minh',
                            text: 'Kiểm tra hộp thư Email',
                            icon: 'error',
                            timer: 2000
                        })
                    } else {
                    localStorage.setItem('idUser', account.User_id);
                    localStorage.setItem('email', account.User_Email);
                    localStorage.setItem('sdt', account.User_Phone);
                    localStorage.setItem('hoten', account.User_Name);
                    localStorage.setItem('matkhau', account.User_Password);
                    localStorage.setItem('role', account.Role);
                        Swal.fire({
                            title: 'Đăng nhập thành công!',
                            text: '',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(() => {
                            const role = localStorage.getItem('role');
                            if (role !== '0') {
                                navigate('/home');
                            } else {
                                navigate('/admin');
                            }
                        });

                    }

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Đăng nhập thất bại!.',
                        text: 'Vui lòng kiểm tra lại mật khẩu hoặc email/số điện thoại!',
                    });
                }
            })
            .catch(err => console.log(err));
        }
        else{
            Swal.fire({
                title: 'Vui lòng nhập đủ thông tin',
                text: '',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    function handleForgetMK() {
        Swal.fire({
            title: 'Nhập Email được đăng ký',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Gửi',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                const emailforget = result.value;
                axios
                    .post('http://localhost:8081/forgetMK', { emailforget })
                    .then((res) => {
                        if (res.data == "Success") {
                            Swal.fire('Thành công', 'Đã gửi mật khẩu đến Email!', 'success');
                        }
                        else {
                            Swal.fire('Sai', 'Email không tồn tại', 'error');
                        }
                    })
                    .catch((error) => {
                        Swal.fire('Error', 'Failed to send request!', 'error');
                    });
            }
        });
    }


    return (
        <div id='bodylogin'>
            <div class="containerlogin" id="containerlogin">
                <div class="form-containerlogin sign-up-containerlogin">
                    <div id="formdk">
                        <h1 id="h1login">Tạo tài khoản</h1><br></br>
                        <span id='spanlogin'>Email sẽ là tài khoản đăng nhập</span>
                        <input id='inputlogin' type="text" placeholder="Họ Tên" class="tenlogin" required
                            onKeyPress={handleKeyPressNotNum}
                            onChange={e => setHoten(e.target.value)} />
                        <input id='inputlogin' type="text" placeholder="Email" class="emaillogin" required
                            onChange={handleInputEmailChange} />
                        <input id='inputlogin' type="phone" placeholder="Số điện thoại"  class="sdtlogin" required
                            onKeyPress={handleKeyPressNotText}
                            onChange={handleInputPhoneChange} />
                        <input id='inputlogin' type="password" placeholder="Mật khẩu" class="passlogin" required
                            onChange={e => setMatKhau(e.target.value)} />

                        <div id="text"></div>
                        <button id="buttonlogin" onClick={handleSubmitDK}>Đăng ký</button>
                    </div>
                </div>
                <div class="form-containerlogin sign-in-containerlogin">
                    <div id="formdn">
                        <h1 id="h1login">Đăng nhập</h1><br></br>
                        <span id='spanlogin'>Xác minh tài khoản qua Email trước khi đăng nhập</span>
                        <input id='inputlogin' type="text" placeholder="Email / Số điện thoại" class="sdtlg" required
                            onChange={e => {
                                setEmail(e.target.value);
                                setSdt(e.target.value);
                                // setEmailVeri(e.target.value);
                            }} />
                        <input id='inputlogin' type="password" placeholder="Password" class="passlg" required
                            onChange={e => setMatKhau(e.target.value)} />
                        <button id="buttonlogin" onClick={handleSubmit}>Đăng nhập</button>
                        <button id="buttonforget" onClick={handleForgetMK} >
                            Quên mật khẩu
                        </button>
                    </div>
                </div>
                <div class="overlay-containerlogin">
                    <div class="overlaylogin">
                        <div class="overlay-panellogin overlay-leftlogin">
                            <h1 id='h1login'>Xin chào!</h1>
                            <p id='plogin'>Sau khi đăng ký thành công. Hãy quay lại đăng nhập</p>
                            <button class="ghost" id="signIn">Đăng nhập</button>
                        </div>
                        <div class="overlay-panellogin overlay-rightlogin">
                            <h1 id='h1login'>Xin chào!</h1>
                            <p id='plogin'>Hãy đăng ký để có thể đặt phòng khách sạn tại Mytour</p>
                            <button class="ghost" id="signUp" onclick="document.getElementById('ten').value = ''">Đăng Ký</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;