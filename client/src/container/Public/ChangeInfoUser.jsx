import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./css/Login.css";
import Header from './Header'


const ChangeInfoUser = () => {
  const [iduser, setIdUser] = useState('');
  const [email, setEmail] = useState('');
  const [hoten, setHoten] = useState('');
  const [sdt, setSdt] = useState('');

  const navigate = useNavigate();
  if (localStorage.getItem("idUser") == null) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Bạn chưa đăng nhập!',
    })
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  }


  useEffect(() => {
    const setInfo = () => {
      const setiduser = localStorage.getItem('idUser');
      const setemail = localStorage.getItem('email');
      const setsdt = localStorage.getItem('sdt');
      const sethoten = localStorage.getItem('hoten');

      const ipemail = document.querySelector('.emaillogin');
      const ipsdt = document.querySelector('.sdtlogin');
      const iphoten = document.querySelector('.tenlogin');

      ipemail.value = setemail;
      ipsdt.value = setsdt;
      iphoten.value = sethoten;

      setEmail(ipemail.value);
      setHoten(iphoten.value);
      setSdt(ipsdt.value);
      setIdUser(setiduser)

    };
    setInfo();
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


  function handleThaydoi() {
    Swal.fire({
      title: 'Nhập mật khẩu xác nhận',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        const matkhauxn = result.value;
        axios
          .post('http://localhost:8081/checkpass', { iduser, matkhauxn })
          .then((res) => {
            if (res.data.length > 0 && res.data !== "Fail") {
              axios
                .post('http://localhost:8081/updatettuser', { hoten, email, sdt, iduser })
                .then((response) => {
                  if (response.data === "Thay đổi thành công") {
                    Swal.fire('Thay đổi thành công', '', 'success');
                  }
                  else {
                    Swal.fire('Thay đổi thất bại', response.data, 'error');
                  }
                })
                .catch((error) => {
                });
            }
            else {
              Swal.fire('Thay đổi thất bại', 'Sai mật khẩu', 'error');
            }
          })
          .catch((error) => {
          });
      }
    });
  }


  function handleChangeMK(event) {
    Swal.fire({
      title: 'Nhập thông tin',
      html:
        '<input id="input1" type="password" class="swal2-input" placeholder="Mật khẩu cũ">' +
        '<input id="input2" type="password" class="swal2-input" placeholder="Mật khẩu mới">' +
        '<input id="input3" type="password" class="swal2-input" placeholder="Xác nhận mật khẩu mới">' +
        '<h2 id="thongbao" style="font-weight: bold; margin-top: 15px"></h2>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Thay đổi',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: () => {
        const matkhauxn = document.getElementById('input1').value;
        const matkhaumoi = document.getElementById('input2').value;
        const xnmatkhaumoi = document.getElementById('input3').value;
        const thongbaoElement = document.getElementById('thongbao');

        if (matkhauxn !== "" && matkhaumoi !== "" && xnmatkhaumoi !== "") {
          if (matkhaumoi !== xnmatkhaumoi && matkhaumoi !== matkhauxn) {
            thongbaoElement.textContent = "Xác nhận mật khẩu mới không khớp";
            return false;
          }
          else if (matkhaumoi == xnmatkhaumoi && matkhaumoi == matkhauxn) {
            thongbaoElement.textContent = "Mật khẩu mới phải khác mật khẩu cũ";
            return false;
          }
          else if (matkhaumoi == matkhauxn) {
            thongbaoElement.textContent = "Mật khẩu mới phải khác mật khẩu cũ";
            return false;
          }
          else {
            axios
              .post('http://localhost:8081/updatenewMK', { iduser, matkhauxn, matkhaumoi })
              .then((res) => {
                if (res.data === "Thay đổi thành công") {
                  Swal.fire('Thay đổi thành công', '', 'success');
                }
                else {
                  thongbaoElement.textContent = "Thay đổi thất bại! " + res.data;
                  return false;

                  // Swal.fire('Thay đổi thất bại', res.data, 'error');
                }
              })
              .catch((error) => {
              });
          }
        }
        else {
          thongbaoElement.textContent = "Thay đổi thất bại! Thiếu thông tin ";
          return false;

          // Swal.fire('Thay đổi thất bại', "Thiếu thông tin", 'error');
        }
        return false;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const matkhauxn = document.getElementById('input1').value;
        const matkhaumoi = document.getElementById('input2').value;
        const xnmatkhaumoi = document.getElementById('input3').value;
        const thongbaoElement = document.getElementById('thongbao');

        if (matkhauxn !== "" && matkhaumoi !== "" && xnmatkhaumoi !== "") {
          if (matkhaumoi !== xnmatkhaumoi && matkhaumoi !== matkhauxn) {
            thongbaoElement.textContent = "Xác nhận mật khẩu mới không khớp";
            Swal.update({
              allowOutsideClick: false, // Prevent the dialog from closing
            });

            // Swal.fire('Thay đổi thất bại', "Xác nhận mật khẩu mới không khớp", 'error');
          }
          else if (matkhaumoi == xnmatkhaumoi && matkhaumoi == matkhauxn) {
            Swal.fire('Thay đổi thất bại', "Mật khẩu mới phải khác mật khẩu cũ", 'error');
          }
          else if (matkhaumoi == matkhauxn) {
            Swal.fire('Thay đổi thất bại', "Mật khẩu mới phải khác mật khẩu cũ", 'error');
          }
          else {
            axios
              .post('http://localhost:8081/updatenewMK', { iduser, matkhauxn, matkhaumoi })
              .then((res) => {
                if (res.data === "Thay đổi thành công") {
                }
                else {
                  Swal.fire('Thay đổi thất bại', res.data, 'error');
                }
              })
              .catch((error) => {
              });
          }
        }
        else {
          Swal.fire('Thay đổi thất bại', "Thiếu thông tin", 'error');
        }

      }
    });
  }



  return (
    <div>
      <Header />
      <div id='khungchange'>
        <div class="form-containerloginchange sign-up-containerloginchange">
          <div id="formdk">
            <h1 id="h1change">Đổi thông tin tài khoản</h1><br></br>
            <span id='spanhoten'>Họ tên</span>
            <input id='inputloginchange' type="text" class="tenlogin" required
              onKeyPress={handleKeyPressNotNum}
              onChange={e => setHoten(e.target.value)} />
            <span id='spanemail'>Email</span>
            <input id='inputloginchange' type="text" class="emaillogin" required disabled
              onChange={e => { setEmail(e.target.value) }}
            />
            <span id='spansdt'>Số điện thoại</span>
            <input id='inputloginchange' type="phone" class="sdtlogin" required
              onKeyPress={handleKeyPressNotText}
              onChange={e => setSdt(e.target.value)}
            />
            <div id="text"></div>
            <button id="btnchange" onClick={handleThaydoi} >Thay đổi</button>
            <button id="btnchangemk" onClick={handleChangeMK} >Mật khẩu</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeInfoUser