import React, { useState, useEffect, useRef } from 'react'
import "../../index.css"
import axios from "axios"
import imgMomo from "../../assets/momo.webp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUserGroup,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const RatingStars = ({ numStars }) => {
  const stars = [];

  const iconSize = {
    width: "14px",
    height: "14px",
    color: "#FFBC39",
    marginRight: "3px"
  };

  for (let i = 0; i < numStars; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={iconSize} />);
  }

  return <div className="rate5">{stars}</div>;
};


const Ultilies = ({ classIcon, color }) => {
  const iconSize = {
    width: "16px",
    height: "16px",
    marginRight: "7px",
    color: color
  };

  return (
    <span>
      <FontAwesomeIcon icon={classIcon} style={iconSize} />
    </span>
  );
};


const formatCurrency = (value) => {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};



const Orders = () => {
  const navigate = useNavigate();
  const [detailHotel, setdetailHotel] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:8081/detailHotel/${localStorage.getItem('Hotel_id')}`,)
      .then(res => setdetailHotel(res.data))
      .catch(err => console.log(err));
  }, [])

  const [interior, setInterior] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:8081/showInterior/${localStorage.getItem('TypeRoom_id')}`,)
      .then(res => setInterior(res.data))
      .catch(err => console.log(err));
  }, [])



  const startDateStr = localStorage.getItem('checkInDate');
  const endDateStr = localStorage.getItem('checkOutDate');

  // Parse the dates into Date objects (assuming format: DD/MM/YYYY)
  const startDateParts = startDateStr.split('/');
  const endDateParts = endDateStr.split('/');
  const startDate = new Date(`${startDateParts[1]}/${startDateParts[0]}/${startDateParts[2]}`);
  const endDate = new Date(`${endDateParts[1]}/${endDateParts[0]}/${endDateParts[2]}`);

  // Calculate the difference in milliseconds
  const timeDifference = endDate - startDate;

  // Convert milliseconds to days
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24) + 1;


  // render all typerooms
  const [typerooms, setTypeRooms] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/detailTypeRoom/${localStorage.getItem('TypeRoom_id')}`)
      .then((res) => {
        setTypeRooms(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const numPeoPleAt = localStorage.getItem('numPeoPle');

  const [inputName, setInputName] = useState(localStorage.getItem('hoten'));
  const [inputEmail, setInputEmail] = useState(localStorage.getItem('email'));
  const [inputPhone, setInputPhone] = useState(localStorage.getItem('sdt'));
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleInputNameChange = (event) => {
    setInputName(event.target.value);
  };

  const handleKeyPressNotNum = (event) => {
    const charCode = event.which || event.keyCode;
    // Allow only non-numeric characters
    if (charCode >= 48 && charCode <= 57) {
      event.preventDefault();
    }
  };

  const handleKeyPressNotText = (event) => {
    const charCode = event.which || event.keyCode;
    // Ngăn người dùng nhập ký tự chữ (mã ASCII từ 65 đến 90 và từ 97 đến 122)
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
      event.preventDefault();
    }
  };



  const handleInputEmailChange = (event) => {
    const newValue = event.target.value;
    setInputEmail(newValue);
    validateEmail(newValue);
  };

  const handleInputPhoneChange = (event) => {
    const newValue = event.target.value;
    setInputPhone(newValue);
    validatePhone(newValue);
  };

  const priceTypeBefore = localStorage.getItem('priceBefore') * daysDifference;
  const priceDiscount = priceTypeBefore * 8 / 100;
  const priceTypeAfter = priceTypeBefore * 92 / 100;


  const handleThanhToanClick = () => {
    if (!isValidEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email không hợp lệ!',
      });
      setInputEmail('');
    }
    else if (!isValidPhone) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Số điện thoại không hợp lệ!',
      });
      setInputPhone('');
    }
    else if (inputPhone == '' || inputEmail == '' || inputName == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vui lòng nhập đầy đủ thông tin!',
      });
    }
    else if (!isChecked) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Chưa chọn phương thức thanh toán!',
      });
    }
    else {
      localStorage.setItem('phoneUser', inputPhone);
      localStorage.setItem('emailUser', inputEmail);
      localStorage.setItem('nameUser', inputName);
      Swal.fire({
        title: 'Bạn có chắc không?',
        text: "Bạn sẽ không được hoàn tiền dưới mọi hình thức!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có, tôi đồng ý!',
        cancelButtonText: 'Không'
      }).then((result) => {
        if (result.isConfirmed) {
          // Swal.fire(
          //   'Deleted!',
          //   'Your file has been deleted.',
          //   'success'
          // )
          Swal.fire({
            title: 'Đỗ Quốc Thành',
            text: '0772553518',
            imageUrl: '../assets/qrcode.jpeg',
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Custom image',
            confirmButtonText: 'Xác nhận', // Change this to your desired text
          }).then((result) => {
            if (result.isConfirmed) {
              axios
                .post('http://localhost:8081/addOrder', {
                  hotelId: localStorage.getItem('Hotel_id'),
                  typeRoomId: localStorage.getItem('TypeRoom_id'),
                  listIDRoom: JSON.parse(localStorage.getItem("ListRoomID")),
                  CheckIn: localStorage.getItem('checkInDate'),
                  CheckOut: localStorage.getItem('checkOutDate'),
                  userName: localStorage.getItem('nameUser'),
                  userPhone: localStorage.getItem('phoneUser'),
                  userEmail: localStorage.getItem('emailUser'),
                  userId: localStorage.getItem('idUser'),
                  timeNow: (new Date()).toLocaleDateString('en-GB'),
                  priceBefore: priceTypeBefore,
                  discount: priceDiscount,
                  priceAfter: priceTypeAfter,
                })
                .then(res => {
                  let timerInterval
                  Swal.fire({
                    title: 'Hoàn tất đặt phòng',
                    html: 'Bạn sẽ quay về trang chủ sau <b></b>s.', // Change this line
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                      Swal.showLoading()
                      const b = Swal.getHtmlContainer().querySelector('b')
                      timerInterval = setInterval(() => {
                        b.textContent = (Swal.getTimerLeft() / 1000).toFixed(0); // Convert to seconds and round
                      }, 100)
                    },
                    willClose: () => {
                      clearInterval(timerInterval)
                    }
                  }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                      navigate('/*');
                      localStorage.setItem("ListRoomID", JSON.stringify([]));
                    }
                  })
    
                })
                .catch(err => console.log(err));
    
            }
          });
        }
      })
      


    }
  };

  const validatePhone = (phone) => {
    // Biểu thức chính quy để kiểm tra định dạng số điện thoại (10-11 chữ số)
    const phonePattern = /^\d{10,11}$/;
    setIsValidPhone(phonePattern.test(phone));
  };

  const validateEmail = (email) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValidEmail(emailPattern.test(email));
  };


  // check MOMO checked
  const handleRadioChange = (event) => {
    setIsChecked(event.target.checked);
  };



  const [remainingTime, setRemainingTime] = useState(900);

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(prevTime => prevTime - 1);
      } else {
        clearInterval(timer);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hết thời gian đặt phòng!',
        });
        if (localStorage.getItem("ListRoomID") != null) {
          axios
            .post('http://localhost:8081/cancelRoomWaitingif', {
              listID: JSON.parse(localStorage.getItem("ListRoomID")),
            })
            .then(res => {
              console.log("Delete order successful");
            })
            .catch(err => console.log(err));
          localStorage.setItem("ListRoomID", JSON.stringify([]));
        }
        navigate('/');
      }

    }, 1000); // Update every second

    return () => {
      clearInterval(timer); // Clean up the interval on component unmount
    };
  }, [remainingTime, navigate]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className='font-app w-[1188px] m-auto'>
      <div className='bg-[#FFBC39] text-center py-2 mt-5'>Thời gian hoàn tất thanh toán {minutes}:{seconds.toString().padStart(2, '0')}</div>
      <div className='grid grid-cols-7 gap-4 mt-9'>
        <div className='col-span-4 tag-sticky top-0'>
          <div className='p-[24px] bg-white shadow2 rounded-[8px] '>
            {detailHotel.map((data) => (
              <div className='grid grid-cols-12 w-full'>
                <div className='col-span-2'>
                  <img className='w-[80px] h-[80px] rounded-[8px] object-cover' src={'../assets/' + data.Hotel_Image}></img>
                </div>

                <div className='col-span-10'>
                  <div className='text-[16p] font-bold leading-8'>{data.Hotel_Name}</div>
                  <div className='leading-8'><RatingStars numStars={data.Hotel_Rating} /></div>
                  <div className='leading-8'>{data.Hotel_Location}</div>
                </div>
              </div>
            ))}




            <div className='border-t-[1px] border-[#ffffff] my-[16px]'></div>

            <div className='grid grid-cols-9'>
              <div className='col-span-3'>
                <div className='font-bold'>Nhận phòng</div>
                <div>00:00 {localStorage.getItem('checkInDate')}</div>
              </div>
              <div className='col-span-3'>
                <div className='font-bold'>Trả phòng</div>
                <div>23:59 {localStorage.getItem('checkOutDate')}</div>
              </div>
              <div className='col-span-3'>
                <div className='font-bold'>Số ngày</div>
                <div>{daysDifference}</div>
              </div>
            </div>

            {typerooms.map((data) => (
              <div>
                <div className='my-3'>
                  <div className='font-bold'>Số phòng</div>
                  <div>{localStorage.getItem('numRoom')} x {data.TypeRoom_Name}</div>
                </div>

                <div>
                  <div className='font-bold'>Đủ chỗ ngủ cho</div>
                  <div>{numPeoPleAt * data.MaxLoad} người lớn</div>
                </div>
              </div>
            ))}

          </div>

          <div className='relative rounded-[8px] p-[24px] bg-white shadow2 mt-4'>
            <div className='text-[20px] font-bold'>Thông tin liên hệ</div>
            <div className='my-5'>
              <div>Họ và tên</div>
              <input
                value={inputName}
                onKeyPress={handleKeyPressNotNum}
                onChange={handleInputNameChange}
                className='w-full h-[40px] rounded-[8px] pl-3 border-[1px] border-[#c4c4c4]'>
              </input>
            </div>

            <div className='grid grid-cols-2 gap-5'>
              <div className='col-span-1'>
                <div>Email</div>
                <input
                  value={inputEmail}
                  onChange={handleInputEmailChange}
                  className='w-full h-[40px] rounded-[8px] pl-3 border-[1px] border-[#c4c4c4]'></input>
              </div>

              <div className='col-span-1'>
                <div>Số điện thoại</div>
                <input
                  onKeyPress={handleKeyPressNotText}
                  value={inputPhone}
                  onChange={handleInputPhoneChange}
                  className='w-full h-[40px] rounded-[8px] pl-3 border-[1px] border-[#c4c4c4]'></input>
              </div>
            </div>
          </div>

          <div className='relative rounded-[8px] p-[24px] bg-white shadow2 mt-4 h-[305px]'>
            <div className='text-[20px] font-bold'>Phương thức thanh toán</div>
            <div className='text-[#48BB78] mt-2'>Sau khi hoàn tất thanh toán, mã xác nhận phòng sẽ được gửi ngay qua SMS và Email của bạn.</div>

            <div className='border-b-[1px] py-3 border-[#e6eaee] relative h-[60px] mt-4'>
              <img className='w-[30px] h-[30px] rounded-[4px] absolute translate-y-[-50%] top-[50%] left-0' src={imgMomo}></img>
              <div className='absolute translate-y-[-50%] top-[50%] left-[44px]'>MOMO</div>
              <input
                className='absolute translate-y-[-50%] top-[50%] right-0 w-[20px] h-[20px]'
                type='radio'
                checked={isChecked}
                onChange={handleRadioChange}>
              </input>
            </div>

            <button
              onClick={handleThanhToanClick}
              className="absolute w-auto h-[48px] font-[600] bg-[#FF3366] px-[40px] text-[#fff] rounded-[8px] text-[18px] bottom-[24px] right-[24px]"
            >
              Thanh toán
            </button>

          </div>

        </div>

        {typerooms.map((data) => (
          <div className='col-span-3 relative'>
            <div className='p-[24px] bg-white shadow2 rounded-[8px] leading-7'>
              <div className='font-bold text-[20px]'>Thông tin phòng</div>

              <img className='w-full h-[114px] object-cover rounded-[8px] mt-4' src='../assets/khunghiduong.jpg'></img>

              <div className='mt-5 text-[18px]'>
                <div className='font-bold text-[20px] leading-10'>{data.TypeRoom_Name}</div>
                <div className='text-[#5cb5ff]'><Ultilies classIcon={faUserGroup} />{data.MaxLoad} Người</div>
                {/* <div className='text-[#2fc86f]'><Ultilies classIcon={faUtensils} />Bữa sáng miễn phí</div> */}
                {/* <div className='text-[#d67b31]'><Ultilies classIcon={faBolt} />Xác nhận trong 30 phút</div> */}
                {detailHotel.map((data) => (
                  <div className='text-[#ff3939]'><Ultilies classIcon={faCheck} />{data.Description}</div>
                ))}
              </div>


              <div className='bg-[#F7FAFC] px-[16px] py-[12px] mt-5 border-l-2 border-[#48BB78]'>
                <div className='font-bold'>Ưu đãi bao gồm</div>
                <div className='grid grid-cols-2'>
                  {interior.map((data, i) => (
                    <div key={i} className='col-span-1'>
                      <Ultilies classIcon={faCheck} color={'#48BB78'} />{data.Interior_name}
                    </div>
                  ))}
                </div>


              </div>
            </div>

            <div className='relative mt-4 p-[24px] bg-white shadow2 rounded-[8px] leading-7'>
              <div className='font-bold text-[20px]'>Chi tiết giá</div>
              <div className='border-b-[1px] py-3 border-[#e6eaee] flex justify-between'>
                <span className=''>Giá phòng 1 ngày</span>
                <span className=''>{formatCurrency(data.TypeRoom_Price)}</span>
              </div>

              <div className='border-b-[1px] py-3 border-[#e6eaee] flex justify-between'>
                <span className=''>Số phòng</span>
                <span className=''>x {localStorage.getItem('numRoom')}</span>
              </div>

              <div className='py-4 border-[#e6eaee] flex justify-between text-[18px]'>
                <div>
                  <div className='font-bold'>Tổng tiền thanh toán</div>
                  <div className='text-[14px] text-[#718096]'>Đã bao gồm thuế, phí, VAT</div>
                </div>
                <span className='font-bold'>{formatCurrency(data.TypeRoom_Price * localStorage.getItem('numRoom') * daysDifference)}</span>
              </div>

            </div>
          </div>
        ))}


      </div>
    </div>

  )
}

export default Orders