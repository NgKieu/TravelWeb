import React, { useCallback, useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constaint";
import axios from "axios"
import "./css/Header.css";
import "./css/TabAdmin.css";
import Swal from 'sweetalert2';
import Chart from "chart.js/auto";
import { MdSell } from "react-icons/md";
import { BsCreditCardFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { format, set } from "date-fns";


const Admin = () => {
  const myRef = useRef(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [orders, setOrders] = useState([]);
  const [comments, setComments] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imagesnen, setImagesNen] = useState([]);





  const role = localStorage.getItem('role');
  const [idkh, setIdKH] = useState('');
  const [emailkh, setEmailKH] = useState('');
  const [hotenkh, setHotenKH] = useState('');
  const [sdtkh, setSdtKH] = useState('');
  const [matkhaukh, setMatkhauKH] = useState('');
  const [rolekh, setRoleKH] = useState('');
  const [emailveri, setEmailVeri] = useState('');
  const [catehotels, setCateHotels] = useState([]);
  const [idLHT, setIdLHT] = useState('');
  const [tenLHT, setTenLHT] = useState('');
  const [emailsearch, setEmailKHSearch] = useState('');
  const [sdtsearch, setSdtKHSearch] = useState('');
  const [idhtsearchht, setIdHotelsearchHT] = useState('');
  const [idpartsearchht, setIdPartsearchHT] = useState('');
  const [tenhtsearchht, setTenHotelsearchHT] = useState('');
  const [typerooms, setTypeRooms] = useState([]);
  const [idtroomsearchtr, setIdTRoomsearchTR] = useState('');
  const [idhotelsearchtr, setIdHotelsearchTR] = useState('');
  const [tentyperoomsearchtr, setTenTypeRoomsearchTR] = useState('');
  const [idroomsearchr, setIdRoomsearchR] = useState('');
  const [idtypesearchr, setIdTypesearchR] = useState('');
  const [idtypecheckall, setIdTypecheckall] = useState('');
  const [emailpartsearch, setEmailPartSearch] = useState('');
  const [sdtpartsearch, setSdtPartSearch] = useState('');
  const [ratingcmt, setRatingComment] = useState('');
  const [emailusercmt, setEmailUserComment] = useState('');
  const [idhotelcmt, setIdHotelComment] = useState('');
  const [videoClip, setVideoClip] = useState('');
  const fileInputRef = useRef(null);
  const [anhnen, setAnhNen] = useState('');
  const fileInputRefImg = useRef(null);


  // const [tentyperoom, setTenTypeRoom] = useState([]);





  useEffect(() => {
    if (role !== '0') {
      navigate('/home');
      Swal.fire({
        icon: 'error',
        title: 'Truy cập thất bại!',
        text: 'Tài khoản không đủ thẩm quyền',
      });
    }
  }, [navigate, role]);

  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
  });


  const goRegister = useCallback(() => {
    navigate(path.REGISTER);
  });

  const tenkh = localStorage.getItem("hoten");
  function goLogout() {
    navigate(path.HOME)
    localStorage.removeItem("idUser");
    localStorage.removeItem("email");
    localStorage.removeItem("hoten");
    localStorage.removeItem("sdt");
    localStorage.removeItem("matkhau");
    localStorage.removeItem("role");
    Swal.fire({
      title: 'Đăng xuất thành công!',
      text: '',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      navigate('/home');
    });
  }
  const IconShowDiv = () => {
    const iconSize = {
      width: "16px",
      height: "16px",
    };

    return (
      <span>
        <FontAwesomeIcon icon={faSortDown} style={iconSize} />
      </span>
    );
  };

  const IconSearch = () => {
    const iconSize = {
      width: "16px",
      height: "16px",
    };

    return (
      <span>
        <FontAwesomeIcon icon={faMagnifyingGlass} style={iconSize} />
      </span>
    );
  };
  const [isDivVisible, setIsDivVisible] = useState(false);
  const showdiv = () => {
    setIsDivVisible(!isDivVisible);
  };
  const [activeTab, setActiveTab] = useState('hotel');

  const openTab = (tab) => {
    setActiveTab(tab);
  };


  useEffect(() => {
    ShowUser();
  }, []);

  function ShowUser() {
    const fetchUsers = async () => {
      try {
        const response = await axios.post('http://localhost:8081/showkh');
        const userData = response.data;
        setUsers(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }

  function AddUser() {
    if (emailkh != "" && hotenkh != "" && sdtkh != "" && matkhaukh != "" && rolekh != "") {
      axios
        .post('http://localhost:8081/addkh', { emailkh, hotenkh, sdtkh, matkhaukh, rolekh })
        .then(res => {
          console.log(res);
          if (res.data === 'Thêm thành công') {
            Swal.fire({
              title: 'Thêm thành công!',
              text: '',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000,
            });
            setTimeout(() => {
              ShowUser();
            }, 1000)
            axios.post('http://localhost:8081/sendemail', { emailveri })
              .then(result => {
                if (result.data === "Gửi thành công") {
                  localStorage.setItem('emailveri', emailveri);
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
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Thêm thất bại!',
              text: res.data,
            })
          }
        })
        .catch(err => console.log(err));
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Thêm thất bại!',
        text: 'Thiếu thông tin',
      })
    }

  }

  function onEditkh(id) {
    const tkhText = document.querySelector(`.tkh-${id}`).textContent;
    const iptkhElement = document.querySelector('.iptkh');
    const emailText = document.querySelector(`.emailkh-${id}`).textContent;
    const ipemailElement = document.querySelector('.ipemail');
    const sdtText = document.querySelector(`.phonekh-${id}`).textContent;
    const ipsdtElement = document.querySelector('.ipsdt');
    const mkText = document.querySelector(`.mkkh-${id}`).textContent;
    const ipmkElement = document.querySelector('.ipmk');
    const roleText = document.querySelector(`.rolekh-${id}`).textContent;
    const iproleElement = document.querySelector('.iprole');

    if (iptkhElement && ipemailElement && ipsdtElement && ipmkElement && iproleElement) {
      iptkhElement.value = tkhText;
      // ipemailElement.value = emailText;
      ipsdtElement.value = sdtText;
      ipmkElement.value = mkText;
      iproleElement.value = roleText;
      setIdKH(document.querySelector(`.idkh-${id}`).textContent);
      localStorage.setItem("EmailKHWhere",document.querySelector(`.emailkh-${id}`).textContent)
      setHotenKH(tkhText);
      setEmailKH(emailText);
      setEmailVeri(emailText);
      setSdtKH(sdtText);
      setMatkhauKH(mkText);
      setRoleKH(roleText);


    }
  }

  const goHome = useCallback(() => {
    navigate(path.HOME);
  });

  function UpdateUser() {
    if ( hotenkh != "" && sdtkh != "" && matkhaukh != "" && rolekh != "") {
      const EmailKHWhere = localStorage.getItem("EmailKHWhere")
      axios
        .post('http://localhost:8081/updatekh', {  hotenkh, sdtkh, matkhaukh, rolekh, EmailKHWhere, idkh })
        .then(res => {
          console.log(res);
          if (res.data === 'Sửa thành công') {
            Swal.fire({
              title: 'Sửa thành công!',
              text: '',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000,
            });
            setTimeout(() => {
              ShowUser();
            }, 1000)
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Sửa thất bại!',
              text: res.data,
            })
          }
        })
        .catch(err => console.log(err));
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Sửa thất bại!',
        text: 'Thiếu thông tin',
      })
    }
  }

  function DeleteUser(id) {
    const idkh = id;
    const idadmin = localStorage.getItem("idUser");
    if (idkh != idadmin) {
      axios
        .post('http://localhost:8081/deletekh', { idkh })
        .then(res => {
          console.log(res);
          if (res.data === 'Xóa thành công') {
            Swal.fire({
              title: 'Xóa thành công!',
              text: '',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000,
            });
            setTimeout(() => {
              ShowUser();
            }, 1000)
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Xóa thất bại!',
              text: res.data,
            })
          }
        })
        .catch(err => console.log(err));
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Xóa thất bại!',
        text: 'Không thể xóa tài khoản Admin đang dùng',
      })
    }
  }

  function SearchUser() {

    axios
      .post('http://localhost:8081/searchkh', { emailsearch, sdtsearch })
      .then(res => {
        console.log(res);
        if (res.data === 'Not find' && emailsearch !== "") {
          Swal.fire('Không có tài khoản muốn tìm')
        }
        else if (emailsearch == "") {
          ShowUser();
        } else {
          setUsers(res.data)
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    ShowHotels();
  }, []);

  function ShowHotels() {
    const fetchHotels = async () => {
      try {
        const response = await axios.post('http://localhost:8081/showhotels');
        const hotelData = response.data;
        setHotels(hotelData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotels();
  }

  function StickHT(hotelid, emailparttt, hotelnamett) {
    Swal.fire({
      title: 'Bạn có chắc muốn duyệt?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý duyệt'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:8081/checkhotel', { hotelid, emailparttt, hotelnamett })
          .then(res => {
            console.log(res);
            if (res.data === 'Duyệt thành công') {
              Swal.fire({
                title: 'Duyệt thành công!',
                text: '',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                ShowHotels();
              }, 1000)
            }
          })
          .catch(err => console.log(err));

      }
    })

  }

  function UnstickHT(hotelid, emailparttt, hotelnamett) {
    Swal.fire({
      title: 'Bạn có chắc muốn hủy duyệt?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:8081/uncheckhotel', { hotelid, emailparttt, hotelnamett })
          .then(res => {
            console.log(res);
            if (res.data === 'Hủy duyệt thành công') {
              Swal.fire({
                title: 'Hủy thành công!',
                text: '',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                ShowHotels();
              }, 1000)
            }
          })
          .catch(err => console.log(err));

      }
    })
  }
  const handleImageDialogOpen = async (hotelIdImg, hotelname) => {
    // alert(hotelIdImg)
    try {
      const response = await axios.post('http://localhost:8081/gethotelimages', { hotelIdImg });
      const imageData = response.data;
      // alert(imageData.length)
      Swal.fire({
        title: `Ảnh của khách sạn ${hotelname} `,
        html: getImageUrlsHTML(imageData),
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: 'custom-swal-container',
          popup: 'custom-swal-popup',
        },
        // allowOutsideClick: true
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getImageUrlsHTML = (images) => {
    let html = '<div class="grid grid-cols-3 gap-2">';
    images.forEach((image, index) => {
      html += `<div class="col-span-1 h-[300px]"><img class="h-full w-full object-cover" alt="" src="../assets/${image.Image_URL}"></img></div>`;
    });
    html += '</div>';
    return html;
  };

  useEffect(() => {
    ShowCategoryHotels();
  }, []);

  function ShowCategoryHotels() {
    const fetchCateHotels = async () => {
      try {
        const response = await axios.post('http://localhost:8081/showloaihotel');
        const catehotelData = response.data;
        setCateHotels(catehotelData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCateHotels();
  }

  function onEditlht(id) {
    const maloaiht = document.querySelector(`.mlht-${id}`).textContent;
    const tenloaiht = document.querySelector(`.tlht-${id}`).textContent;
    const iptenloaiht = document.querySelector('.iptl');

    if (iptenloaiht) {
      iptenloaiht.value = tenloaiht;
      localStorage.setItem("idlht", maloaiht);
      setIdLHT(localStorage.getItem("idlht"));
      setTenLHT(tenloaiht);
    }
  }

  function AddCateHotel(event) {
    event.preventDefault();
    if (tenLHT != "") {
      axios
        .post('http://localhost:8081/addCateHotel', { tenLHT })
        .then(res => {
          console.log(res);
          if (res.data === 'Thêm thành công') {
            Swal.fire({
              title: 'Thêm thành công',
              text: '',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000,
            });
            ShowCategoryHotels();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Thêm thất bại!',
              text: "Thiếu thông tin",
            })
          }
        })
        .catch(err => console.log(err));
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Thêm thất bại!',
        text: "Thiếu thông tin",
      })
    }
  }

  function UpCateHotel(event) {
    event.preventDefault();
    if (tenLHT != "") {
      axios
        .post('http://localhost:8081/upCateHotel', { tenLHT, idLHT })
        .then(res => {
          console.log(res);
          if (res.data === 'Sửa thành công') {
            Swal.fire({
              title: 'Sửa thành công',
              text: '',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000,
            });
            ShowCategoryHotels();
          }
        })
        .catch(err => console.log(err));
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Thêm thất bại!',
        text: "Thiếu thông tin",
      })
    }
  }

  function DeleteCateHotel(id) {
    const idLHT = id
    axios
      .post('http://localhost:8081/deleteCateHotel', { idLHT })
      .then(res => {
        console.log(res);
        if (res.data === 'Xóa thành công') {
          Swal.fire({
            title: 'Xóa thành công',
            text: '',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });
          ShowCategoryHotels();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Xóa thất bại!',
            text: res.data,
          })
        }
      })
      .catch(err => console.log(err));
  }

  function SearchHotelID(event) {
    event.preventDefault();

    axios
      .post('http://localhost:8081/searchhtidht', { idhtsearchht })
      .then(res => {
        console.log(res);
        if (res.data === 'Not find' && idhtsearchht !== "") {
          Swal.fire('Không có Hotel muốn tìm')
        }
        else if (idhtsearchht == "") {
          ShowHotels();
        } else {
          setHotels(res.data)
        }
      })
      .catch(err => console.log(err));
  }

  function SearchHotelPart(event) {
    event.preventDefault();

    axios
      .post('http://localhost:8081/searchhtidpart', { idpartsearchht, tenhtsearchht })
      .then(res => {
        console.log(res);
        if (res.data === 'Not find' && idpartsearchht !== "") {
          Swal.fire('Không có Hotel muốn tìm')
        }
        else if (idpartsearchht == "") {
          ShowHotels();
        } else {
          setHotels(res.data)
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    ShowTypeRooms();
  }, []);

  function ShowTypeRooms() {
    const fetchTRooms = async () => {
      try {
        const response = await axios.post('http://localhost:8081/showtyperooms');
        const typeroomData = response.data;
        setTypeRooms(typeroomData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTRooms();
  }

  const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const handleImageTypeRoom = async (typeroomIdImg, typeroomname) => {
    // alert(typeroomname);
    try {
      const response = await axios.post('http://localhost:8081/gettyperoomimages', { typeroomIdImg });
      const imageData = response.data;
      // alert(response.data.length);

      Swal.fire({
        title: `Ảnh của phòng ${typeroomname} `,
        html: getImageUrlsHTMLTypeRoom(imageData),
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: 'custom-swal-container',
          popup: 'custom-swal-popup',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getImageUrlsHTMLTypeRoom = (images) => {

    let html = '<div class="grid grid-cols-3 gap-2">';
    images.forEach((image, index) => {
      html += `<div class="col-span-1 h-[300px]"><img class="h-full w-full object-cover" alt="" src="../assets/${image.Image_URL}"></img></div>`;
    });
    html += '</div>';
    return html;
  };

  const handleInteriorRoom = async (typeroomIdInterior, typeroomname) => {
    // alert(roomname);
    try {
      const response = await axios.post('http://localhost:8081/gettyperoominteriors', { typeroomIdInterior });
      const interiorData = response.data;
      // alert(response.data.length);

      Swal.fire({
        title: `Tiện ích của phòng ${typeroomname} `,
        html: getInteriorHTMLTypeRoom(interiorData),
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: 'custom-swal-container-interior',
          popup: 'custom-swal-popup-interior',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getInteriorHTMLTypeRoom = (interiors) => {

    let html = '<div class="grid grid-cols-4 gap-1 mt-[20px]">';
    interiors.forEach((interior, index) => {
      html += `<div class="col-span-1 h-[90px] w-[150px] font-bold">${interior.Interior_name}</div>`;
    });
    html += '</div>';
    return html;
  };

  function StickTypeRoom(typeroomid) {
    Swal.fire({
      title: 'Bạn có chắc muốn duyệt?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý duyệt'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:8081/checktyperoom', { typeroomid })
          .then(res => {
            console.log(res);
            if (res.data === 'Duyệt thành công') {
              Swal.fire({
                title: 'Duyệt thành công!',
                text: '',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                ShowTypeRooms();
              }, 1000)
            }
          })
          .catch(err => console.log(err));

      }
    })

  }

  function UnstickTypeRoom(typeroomid) {
    Swal.fire({
      title: 'Bạn có chắc muốn hủy duyệt?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:8081/unchecktyperoom', { typeroomid })
          .then(res => {
            console.log(res);
            if (res.data === 'Hủy duyệt thành công') {
              Swal.fire({
                title: 'Hủy thành công!',
                text: '',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                ShowTypeRooms();
              }, 1000)
            }
          })
          .catch(err => console.log(err));

      }
    })
  }

  function SearchTypeRoomID() {
    axios
      .post('http://localhost:8081/searchtyperoomidtroom', { idtroomsearchtr })
      .then(res => {
        console.log(res);
        if (res.data === 'Not find' && idtroomsearchtr !== "") {
          Swal.fire('Không có loại phòng muốn tìm')
        }
        else if (idtroomsearchtr == "") {
          ShowTypeRooms();
        } else {
          setTypeRooms(res.data)
        }
      })
      .catch(err => console.log(err));
  }

  function SearchTypeRoomHotel() {

    axios
      .post('http://localhost:8081/searchtyperoomidhotel', { idhotelsearchtr, tentyperoomsearchtr })
      .then(res => {
        console.log(res);
        if (res.data === 'Not find' && idhotelsearchtr !== "") {
          Swal.fire('Không có loại phòng muốn tìm')
        }
        else if (idhotelsearchtr == "") {
          ShowTypeRooms();
        } else {
          setTypeRooms(res.data)
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    ShowRooms();
  }, []);

  function ShowRooms() {
    const fetchRooms = async () => {
      try {
        const response = await axios.post('http://localhost:8081/showrooms');
        const roomData = response.data;
        setRooms(roomData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }

  function StickRoom(roomid) {
    Swal.fire({
      title: 'Bạn có chắc muốn duyệt?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý duyệt'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:8081/checkroom', { roomid })
          .then(res => {
            console.log(res);
            if (res.data === 'Duyệt thành công') {
              Swal.fire({
                title: 'Duyệt thành công!',
                text: '',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                ShowRooms();
              }, 1000)
            }
          })
          .catch(err => console.log(err));

      }
    })

  }

  function UnstickRoom(roomid) {
    Swal.fire({
      title: 'Bạn có chắc muốn hủy duyệt?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:8081/uncheckroom', { roomid })
          .then(res => {
            console.log(res);
            if (res.data === 'Hủy duyệt thành công') {
              Swal.fire({
                title: 'Hủy thành công!',
                text: '',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                ShowRooms();
              }, 1000)
            }
          })
          .catch(err => console.log(err));

      }
    })
  }

  function SearchRoomID() {
    axios
      .post('http://localhost:8081/searchroomidroom', { idroomsearchr })
      .then(res => {
        console.log(res);
        if (res.data === 'Not find' && idroomsearchr !== "") {
          Swal.fire('Không có phòng muốn tìm')
        }
        else if (idroomsearchr == "") {
          ShowRooms();
        } else {
          setRooms(res.data)
        }
      })
      .catch(err => console.log(err));
  }

  function SearchRoomByType() {
    axios
      .post('http://localhost:8081/searchroomidtype', { idtypesearchr })
      .then(res => {
        console.log(res);
        if (res.data === 'Not find' && idtypesearchr !== "") {
          Swal.fire('Không có phòng muốn tìm')
        }
        else if (idtypesearchr == "") {
          ShowRooms();
        } else {
          setRooms(res.data)
        }
      })
      .catch(err => console.log(err));
  }

  function CheckAllIdType() {
    if (idtypecheckall != "") {
      axios.post('http://localhost:8081/checkexiststype', { idtypecheckall })
        .then(res => {
          if (res.data === "Exists") {
            Swal.fire({
              title: `Duyệt tất cả phòng của Type ${idtypecheckall}?`,
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Đồng ý duyệt'
            }).then((result) => {
              if (result.isConfirmed) {
                axios
                  .post('http://localhost:8081/checkallidtype', { idtypecheckall })
                  .then(res => {
                    console.log(res);
                    if (res.data === 'Duyệt thành công') {
                      Swal.fire({
                        title: 'Duyệt thành công!',
                        text: '',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                      });
                      setTimeout(() => {
                        ShowRooms();
                      }, 1000)
                    }
                  })
                  .catch(err => console.log(err));

              }
            })
          }
          else {
            Swal.fire({
              title: `Không tồn tại phòng thuộc type ${idtypecheckall}`,
              text: '',
              icon: 'error',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
    }
    else {
      Swal.fire({
        title: 'Thiếu thông tin loại phòng',
        text: '',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  function UncheckAllIdType() {
    if (idtypecheckall != "") {
      axios.post('http://localhost:8081/checkexiststype', { idtypecheckall })
        .then(res => {
          if (res.data === "Exists") {
            Swal.fire({
              title: `Duyệt tất cả phòng của Type ${idtypecheckall}?`,
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Đồng ý duyệt'
            }).then((result) => {
              if (result.isConfirmed) {
                axios
                  .post('http://localhost:8081/uncheckallidtype', { idtypecheckall })
                  .then(res => {
                    console.log(res);
                    if (res.data === 'Hủy duyệt thành công') {
                      Swal.fire({
                        title: 'Hủy thành công!',
                        text: '',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                      });
                      setTimeout(() => {
                        ShowRooms();
                      }, 1000)
                    }
                  })
                  .catch(err => console.log(err));

              }
            })
          }
          else {
            Swal.fire({
              title: `Không tồn tại phòng thuộc type ${idtypecheckall}`,
              text: '',
              icon: 'error',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
    }
    else {
      Swal.fire({
        title: 'Thiếu thông tin loại phòng',
        text: '',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  useEffect(() => {
    ShowPartner();
  }, []);

  function ShowPartner() {
    const fetchPartners = async () => {
      try {
        const response = await axios.post('http://localhost:8081/showpartner');
        const partnerData = response.data;
        setPartners(partnerData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPartners();
  }

  const handleImageCCCD = async (idpartner, namepartner) => {
    try {
      const response = await axios.post('http://localhost:8081/selectpartnerbyid', { idpartner });
      const imageData = response.data[0];
      // alert(imageData.CCCD)
      Swal.fire({
        title: `Ảnh CCCD của ${namepartner} `,
        html: `<img class="h-[600px] w-full object-cover" alt="" src="../assets/${imageData.CCCD}"></img>`,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: 'custom-swal-container-cccd',
          popup: 'custom-swal-popup-cccd',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageGPKD = async (idpartner, namepartner) => {
    try {
      const response = await axios.post('http://localhost:8081/selectpartnerbyid', { idpartner });
      const imageData = response.data[0];
      Swal.fire({
        title: `Ảnh phép kinh doanh của ${namepartner} `,
        html: `<div class="divimggpkd" ><img class="h-full w-full object-cover" alt="" src="../assets/${imageData.License}"></img></div>`,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: 'custom-swal-container-gpkd',
          popup: 'custom-swal-popup-gpkd',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  function StickPartner(partnerid, partneremail) {
    Swal.fire({
      title: 'Bạn có chắc muốn duyệt?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý duyệt'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:8081/checkpartner', { partnerid })
          .then(res => {
            console.log(res);
            if (res.data === 'Duyệt thành công') {
              Swal.fire({
                title: 'Duyệt thành công!',
                text: '',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                ShowPartner();
              }, 1000)
              axios.post('http://localhost:8081/sendemailcheckpart', { partneremail })
                .then(result => {
                  if (result.data === "Gửi thành công") {
                  }
                })
                .catch(error => {
                });
            }
          })
          .catch(err => console.log(err));

      }
    })

  }

  function UnstickPartner(partnerid, partneremail) {
    Swal.fire({
      title: 'Bạn có chắc muốn từ chối?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Từ chối'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:8081/uncheckpartner', { partnerid })
          .then(res => {
            console.log(res);
            if (res.data === 'Từ chối thành công') {
              Swal.fire({
                title: 'Từ chối thành công!',
                text: '',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                ShowPartner();
              }, 1000)
              axios.post('http://localhost:8081/sendemailuncheckpart', { partneremail })
                .then(result => {
                  if (result.data === "Gửi thành công") {
                  }
                })
                .catch(error => {
                });
            }
          })
          .catch(err => console.log(err));

      }
    })
  }

  function SearchPart() {
    axios
      .post('http://localhost:8081/searchidpart', { emailpartsearch, sdtpartsearch })
      .then(res => {
        console.log(res);
        if (res.data === 'Not find' && emailpartsearch !== "") {
          Swal.fire('Không có tài khoản muốn tìm')
        }
        else if (emailpartsearch == "") {
          ShowPartner();
        } else {
          setPartners(res.data)
        }
      })
      .catch(err => console.log(err));
  }

  // function ValueverificationDate(aaa) {
  //   const verificationDate = new Date(aaa);
  //   const formattedVerificationDate = `${verificationDate.getUTCDate().toString().padStart(2, '0')}/${(verificationDate.getUTCMonth() + 1).toString().padStart(2, '0')}/${verificationDate.getUTCFullYear()}-${verificationDate.getUTCHours().toString().padStart(2, '0')}:${verificationDate.getUTCMinutes().toString().padStart(2, '0')}:${verificationDate.getUTCSeconds().toString().padStart(2, '0')}`;
  //   return formattedVerificationDate;
  // }

  // function ValueverificationDateNotTime(aaa) {
  //   const verificationDate = new Date(aaa);
  //   const formattedVerificationDate = `${verificationDate.getUTCDate().toString().padStart(2, '0')}/${(verificationDate.getUTCMonth() + 1).toString().padStart(2, '0')}/${verificationDate.getUTCFullYear()}`;
  //   return formattedVerificationDate;
  // }




  function formattedDate(date) {
    const formatted = new Date(date).toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    return formatted;
  }

  function formattedDateNoTime(date) {
    const formatted = new Date(date).toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour12: true
    });

    return formatted;
  }




  const handleOrderByChange = (event) => {
    const orderby = event.target.value;
    if (orderby === "") {
      ShowTypeRooms();
    }
    else {
      axios
        .post('http://localhost:8081/sortprice', { orderby })
        .then(res => {
          setTypeRooms(res.data)
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    ShowOrders();
  }, []);

  function ShowOrders() {
    const fetchorders = async () => {
      try {
        const response = await axios.post('http://localhost:8081/showdoanhthu');
        const ordersdata = response.data;
        setOrders(ordersdata);
      } catch (error) {
        console.error(error);
      }
    };
    fetchorders();
  }

  //aaaaaaaaaaaaaaaaaaaaaaa
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPriceAfter, setTotalPriceAfter] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("all"); // Default is all
  const [selectedYear, setSelectedYear] = useState("2023");


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
    // setMonthSelect()
    if (month === "all") {
      return data;
    }

    return data.filter((item) => {
      const TimeInsertMonth = new Date(item.TimeInsert).getMonth() + 1;
      return TimeInsertMonth.toString() === month;
    });
  };


  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/showOrderDone")
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
      const TimeInsertYear = new Date(item.TimeInsert).getFullYear();
      return TimeInsertYear.toString() === year;
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/showOrderDone")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8081/showOrderDone")
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
          const TimeInsertMonth = new Date(order.TimeInsert).getMonth();
          yearlyRevenue[TimeInsertMonth] += order.Discount;
        });

        setTotalOrders(filteredDataByMonth.length);
        setTotalPriceAfter(
          filteredDataByMonth.reduce((acc, order) => acc + order.Discount, 0)
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

  useEffect(() => {
    ShowComment();
  }, []);

  function ShowComment() {
    const fetchcomments = async () => {
      try {
        const response = await axios.post('http://localhost:8081/showcomment');
        const commentData = response.data;
        setComments(commentData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchcomments();
  }

  function DeleteComment(id) {
    const idcmt = id;
    Swal.fire({
      title: 'Bạn có chắc muốn xóa?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý xóa'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:8081/deletecomment', { idcmt })
          .then(res => {
            console.log(res);
            if (res.data === 'Xóa thành công') {
              Swal.fire({
                title: 'Xóa thành công!',
                text: '',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                ShowComment();
              }, 1000)
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Xóa thất bại!',
                text: res.data,
              })
            }
          })
          .catch(err => console.log(err));
      }
    })

  }

  function SearchRating() {
    axios
      .post('http://localhost:8081/searchrating', { ratingcmt })
      .then(res => {
        console.log(res);
        if (res.data === 'Not find' && ratingcmt !== "") {
          Swal.fire('Không có đánh giá muốn tìm')
        }
        else if (ratingcmt == "") {
          ShowComment();
        } else {
          setComments(res.data)
        }
      })
      .catch(err => console.log(err));
  }

  function SearchIdUserCMT() {
    axios
      .post('http://localhost:8081/searchidusercmt', { emailusercmt })
      .then(res => {
        console.log(res);
        if (res.data === 'Not find' && emailusercmt !== "") {
          Swal.fire('Không có đánh giá muốn tìm')
        }
        else if (emailusercmt == "") {
          ShowComment();
        } else {
          setComments(res.data)
        }
      })
      .catch(err => console.log(err));
  }

  function SearchIdHotelCMT() {
    axios
      .post('http://localhost:8081/searchidhotelcmt', { idhotelcmt })
      .then(res => {
        console.log(res);
        if (res.data === 'Not find' && idhotelcmt !== "") {
          Swal.fire('Không có đánh giá muốn tìm')
        }
        else if (idhotelcmt == "") {
          ShowComment();
        } else {
          setComments(res.data)
        }
      })
      .catch(err => console.log(err));
  }

  const handleVideoChange = event => {
    const selectedFile = event.target.files[0];
    setVideoClip(selectedFile);
  };
  const handleImageChange = event => {
    const selectedFile = event.target.files[0];
    setAnhNen(selectedFile);
  };
  const handleSubmitVideo = async event => {
    const formData = new FormData();
    formData.append('videoclip', videoClip);
    const namevideo = videoClip.name;

    try {
      const response = await axios.post('http://localhost:8081/addVideo', { namevideo });
      console.log(response);

      if (response.data === 'Thêm video thành công') {
        Swal.fire({
          title: 'Thêm video thành công',
          text: '',
          icon: 'success',
        }).then(() => {
          axios.post('http://localhost:8081/uploadvideo', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(() => {
            setActiveTab('video');
            ShowVideos();
          });
        });
      }

      setVideoClip('');
    } catch (error) {
    }
  };

  const handleSubmitImgage = async event => {
    const formData = new FormData();
    formData.append('anhnen', anhnen);
    const nameanh = anhnen.name;

    try {
      const response = await axios.post('http://localhost:8081/addanhnen', { nameanh });
      console.log(response);

      if (response.data === 'Thêm ảnh thành công') {
        Swal.fire({
          title: 'Thêm ảnh thành công',
          text: '',
          icon: 'success',
        }).then(() => {
          axios.post('http://localhost:8081/uploadanhnen', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(() => {
            setActiveTab('video');
            ShowImages();
          });
        });
      }

      setAnhNen('');
    } catch (error) {
    }
  };

  useEffect(() => {
    ShowVideos();
  }, []);

  function ShowVideos() {
    const fetchvideos = async () => {
      try {
        const response = await axios.post('http://localhost:8081/showvideoadmin');
        const videoData = response.data;
        setVideos(videoData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchvideos();
  }

  useEffect(() => {
    ShowImages();
  }, []);

  function ShowImages() {
    const fetchImages = async () => {
      try {
        const response = await axios.post('http://localhost:8081/showanhadmin');
        const imageData = response.data;
        setImagesNen(imageData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }

  const handleVideoDialogOpen = async (videoid) => {
    try {
      const response = await axios.post('http://localhost:8081/getvideocheck', { videoid });
      const imageData = response.data;
      Swal.fire({
        html: getVideoUrlsHTML(imageData),
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: 'custom-swal-container-video',
          popup: 'custom-swal-popup-video',
        },
        // allowOutsideClick: true
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getVideoUrlsHTML = (videos) => {
    let html = '<div class="">';
    videos.forEach((video, index) => {
      html += `
      <div class="">
        <video
          class="h-full w-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="../assets/${video.Video_clip}" type="video/mp4" />
        </video>
      </div>`;
    });
    html += '</div>';
    return html;
  };

  const handleAnhNenDialogOpen = async (idanhnen) => {
    try {
      const response = await axios.post('http://localhost:8081/getanhnencheck', { idanhnen });
      const imageData = response.data[0];
      Swal.fire({
        html: `<img class="h-[600px] w-full object-cover" alt="" src="../assets/${imageData.Images_url}"></img>`,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: 'custom-swal-container-anhnen',
          popup: 'custom-swal-popup-anhnen',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };


  function StickVideo(idvideocheck) {
    Swal.fire({
      title: 'Bạn có chắc muốn thay đổi?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý đổi'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:8081/checkvideo', { idvideocheck })
          .then(res => {
            console.log(res);
            if (res.data === 'Đổi thành công') {
              Swal.fire({
                title: 'Đổi thành công!',
                text: '',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                ShowVideos();
              }, 1000)
            }
          })
          .catch(err => console.log(err));

      }
    })

  }

  function StickAnhNen(idanhnencheck) {
    Swal.fire({
      title: 'Bạn có chắc muốn duyệt?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý duyệt'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:8081/checkanhnen', { idanhnencheck })
          .then(res => {
            console.log(res);
            if (res.data === 'Duyệt thành công') {
              Swal.fire({
                title: 'Duyệt thành công!',
                text: '',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                ShowImages();
              }, 1000)
            }
          })
          .catch(err => console.log(err));
      }
    })

  }

  function UnstickAnhNen(idanhnencheck) {
    Swal.fire({
      title: 'Bạn có chắc muốn hủy?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:8081/uncheckanhnen', { idanhnencheck })
          .then(res => {
            console.log(res);
            if (res.data === 'Hủy duyệt thành công') {
              Swal.fire({
                title: 'Hủy thành công!',
                text: '',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                ShowImages();
              }, 1000)
            }
            else {
              Swal.fire({
                title: 'Hủy thất bại!',
                text: 'Tối thiểu phải còn 3 ảnh',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
              });
            }
          })
          .catch(err => console.log(err));

      }
    })
  }












  // front-end
  return (
    <div>
      <div className="w-full h-[96px] px-[60px] fixed z-50 top-0 bg-white">
        <div className="flex item-center justify-between  py-[8px]">
          <img src={logo} alt="logo" className="w-[143px] h-[40px]" onClick={goHome} style={{ cursor: 'pointer' }} />
          <div className="flex item-center gap-3">
            <button id="tablink" className={`tablink ${activeTab === 'hotel' ? 'active' : ''}`} data-electronic="hotel" onClick={() => openTab('hotel')}>Hotel</button>
            <button id="tablink" className={`tablink ${activeTab === 'phong' ? 'active' : ''}`} data-electronic="phong" onClick={() => openTab('phong')}>Phòng</button>
            <button id="tablink" className={`tablink ${activeTab === 'khachhang' ? 'active' : ''}`} data-electronic="khachhang" onClick={() => openTab('khachhang')}>Khách hàng</button>
            <button id="tablink" className={`tablink ${activeTab === 'partner' ? 'active' : ''}`} data-electronic="partner" onClick={() => openTab('partner')}>Partner</button>
            <button id="tablink" className={`tablink ${activeTab === 'doanhthu' ? 'active' : ''}`} data-electronic="doanhthu" onClick={() => openTab('doanhthu')}>Doanh Thu</button>
            <button id="tablink" className={`tablink ${activeTab === 'comment' ? 'active' : ''}`} data-electronic="comment" onClick={() => openTab('comment')}>Đánh giá</button>
            <button id="tablink" className={`tablink ${activeTab === 'video' ? 'active' : ''}`} data-electronic="video" onClick={() => openTab('video')}>Video</button>


            {tenkh ? (
              <div className="flex items-center">
                <a id="atenkh" style={{ fontWeight: '600' }}>{tenkh}</a>
                <button className="iconlogout"
                  onClick={showdiv}
                >
                  <IconShowDiv classIcon={faSortDown} />
                </button>
                {isDivVisible && (
                  <div className="fixed top-12 right-20">
                    <div className="bg-white rounded-lg p-4">
                      <button className="mb-2" onClick={goLogout}>Đăng xuất</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <React.Fragment>
                <button
                  className="w-[104px] h-[40px] items-center font-[600] bg-[#FF3366] text-[#fff] rounded-[8px] text-[14px]"
                  onClick={goLogin}
                >
                  Đăng nhập
                </button>
                <button
                  className="w-[104px] h-[40px] items-center font-[600] border-solid border border-[#FF3366] rounded-[8px] text-[#FF3366] text-[14px]"
                  onClick={goRegister}
                >
                  Đăng ký
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
      <div class="wrapper_tabcontent font-bold">
        {/* hotel */}
        <div id="hotel" className={`tabcontent ${activeTab === 'hotel' ? 'active' : ''}`}>
          <div class="tblsp">
            <div id="trlsp1">
              <div id="th1">
                <h3 id="h3maloai">ID</h3>
                <h3 id="h3tenloai">Tên</h3>
              </div>
            </div>
            <div id="lht" style={{ overflow: "scroll" }}>
              {catehotels.length > 0 ? (
                <ul>
                  {catehotels.map((catehotel, i) => (
                    <React.Fragment key={i}>
                      <div id="trcart">
                        <th id="thml" className={`mlht-${catehotel.Category_id}`}>{catehotel.Category_id}</th>
                        <th id="thtl" className={`tlht-${catehotel.Category_id}`}>{catehotel.Category_Name}</th>
                        <th id="thremovelht">
                          <button id="buttoneditlht" onClick={() => onEditlht(catehotel.Category_id)}>Edit</button>
                          <button id="buttonrelht" onClick={() => DeleteCateHotel(catehotel.Category_id)}>✘</button>
                        </th>
                      </div>
                    </React.Fragment>
                  ))}
                </ul>
              ) : (
                <p>No Category Hotel found.</p>
              )}
            </div>
          </div>
          <h2 class="tenloai">Tên loại:</h2>
          <input type="text" class="iptl" onChange={e => setTenLHT(e.target.value)} required></input>
          <button id="btnaddlsp" onClick={AddCateHotel}>Thêm</button>
          <button id="btneditlsp" onClick={UpCateHotel}>Sửa</button>

          <h3 id="searchhotel">Tìm ID hotel:</h3>
          <input type="text" class="input_searchidht" id="rssearch" onChange={e => {
            setIdHotelsearchHT(e.target.value);
          }}></input>
          <button id="Submit" class="submit_searchidht" onClick={SearchHotelID}><IconSearch /></button>
          <h3 id="searchhotelbypart">Tìm ID Partner hoặc tên Hotel:</h3>
          <input type="text" class="input_searchhotelbypart" id="rssearch" onChange={e => {
            setIdPartsearchHT(e.target.value);
            setTenHotelsearchHT(e.target.value);
          }}></input>
          <button id="Submit" class="submit_searchhotelbypart" onClick={SearchHotelPart}><IconSearch /></button>

          <div className="editsp">
            <div class="tbht">
              <div id="trsp1">
                <div id="thsp1">
                  <h3 id="h3idht">ID</h3>
                  <h3 id="h3partht">Partner</h3>
                  <h3 id="h3lht">Loại Hotel</h3>
                  <h3 id="h3tht">Tên Hotel</h3>
                  <h3 id="h3dcht">Địa chỉ</h3>
                  <h3 id="h3anhht">Ảnh</h3>
                  <h3 id="h3dght">Đánh giá</h3>
                  <h3 id="h3mtht">Mô tả</h3>
                </div>
              </div>
              <div id="showhotel" style={{ overflow: "scroll" }}>
                {hotels.length > 0 ? (
                  <ul>
                    {hotels.map((hotel, i) => (
                      <React.Fragment key={i}>
                        <tr id="trkh">
                          <th id="thidht" className={`${hotel.Hotel_id}`}>{hotel.Hotel_id}</th>
                          <th id="thidpartht" className={`${hotel.Hotel_id}`}>{hotel.Partner_id}-{hotel.Partner_Email}</th>
                          <th id="thidcateht" className={`${hotel.Hotel_id}`}>{hotel.Category_id}</th>
                          <th id="thtenht" className={`${hotel.Hotel_id}`}>{hotel.Hotel_Name}</th>
                          <th id="thdcht" className={`${hotel.Hotel_id}`}>{hotel.Hotel_Location}</th>
                          <th
                            id="thanhht"
                            className={`imghotel-${hotel.Hotel_id}`}
                            onClick={() => handleImageDialogOpen(hotel.Hotel_id, hotel.Hotel_Name)}
                          >
                            Xem
                          </th>
                          <th id="thdght" className={`${hotel.Hotel_id}`}>{hotel.Hotel_Rating} - {hotel.review_count}</th>
                          <th id="thmtht" className={`${hotel.Hotel_id}`}>{hotel.Description}</th>
                          <th id="thremoveht">
                            {hotel.status === 0 && (
                              <button id="buttoneditkh" onClick={() => StickHT(hotel.Hotel_id, hotel.Partner_Email, hotel.Hotel_Name)}>
                                ✓
                              </button>
                            )}
                            {hotel.status === 1 && (
                              <button id="buttonrekh" onClick={() => UnstickHT(hotel.Hotel_id, hotel.Partner_Email, hotel.Hotel_Name)}>✘</button>
                            )}
                          </th>
                        </tr>
                      </React.Fragment>
                    ))}
                  </ul>
                ) : (
                  <p>No hotel found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* khachhang */}
        <div id="khachhang" className={`tabcontent ${activeTab === 'khachhang' ? 'active' : ''}`}>
          <h3 id="searchkh">Tìm email hoặc số điện thoại:</h3>
          <input type="text" class="input_searchemailso" id="rssearch" onChange={e => {
            setEmailKHSearch(e.target.value);
            setSdtKHSearch(e.target.value);
          }}></input>
          <button id="Submit" class="submit_searchtenso" onClick={SearchUser}><IconSearch /></button>
          <h2 class="tkh">Tên khách hàng:</h2>
          <h2 class="email">Email:</h2>
          <h2 class="sdt">Số điện thoại:</h2>
          <h2 class="mk">Mật khẩu:</h2>
          <h2 class="role">Quyền hạn:</h2>
          <input type="text" class="iptkh" onChange={e => setHotenKH(e.target.value)}></input>
          <input type="text" class="ipsdt" onChange={e => setSdtKH(e.target.value)}></input>
          <input type="text" class="ipemail" onChange={e => {
            setEmailKH(e.target.value)
            setEmailVeri(e.target.value)
          }}></input>
          <input type="text" class="ipmk" onChange={e => setMatkhauKH(e.target.value)} ></input>
          <input type="number" class="iprole" id="myNumberam" onchange="limitNumberam()" min="0" max="1" onChange={e => setRoleKH(e.target.value)}></input>
          <div id="buttonn">
            <button id="btnaddkh" onClick={AddUser}>Thêm</button>
            <button id="btneditkh" onClick={UpdateUser}>Sửa</button>
          </div>
          <div class="tbkh">
            <div id="trsp1">
              <div id="thsp1">
                <h3 id="h3id">ID</h3>
                <h3 id="h3sdt">Số điện thoại</h3>
                <h3 id="h3tkh">Tên khách hàng</h3>
                <h3 id="h3email">Email</h3>
                <h3 id="h3mk">Mật khẩu</h3>
                <h3 id="h3am">Quyền hạn</h3>
                <h3 id="h3veri">Xác thực</h3>
              </div>
            </div>
            <div id="showkh" style={{ overflow: "scroll" }}>
              {users.length > 0 ? (
                <ul>
                  {users.map((user, i) => (
                    <>
                      <tr key={i} id="trkh">
                        <th id="thid" className={`idkh-${user.User_id}`}>{user.User_id}</th>
                        <th id="thten" className={`tkh-${user.User_id}`}>{user.User_Name}</th>
                        <th id="themail" className={`emailkh-${user.User_id}`}>{user.User_Email}</th>
                        <th id="thsdt" className={`phonekh-${user.User_id}`}>{user.User_Phone}</th>
                        <th id="thmk" className={`mkkh-${user.User_id}`}>{user.User_Password}</th>
                        {formattedDate(user.email_verified_at) !== "1/1/1970, 8:00 AM" ? (
                          <th id="thtimeveri" className={`tvr-${user.User_id}`}>{formattedDate(user.email_verified_at)}</th>
                        ) : (
                          <th id="thtimeveri" className={`tvr-${user.User_id}`}>Chưa xác minh</th>
                        )}
                        <th id="throle" className={`rolekh-${user.User_id}`}>{user.Role}</th>
                        <th id="thremovekh">
                          <button id="buttoneditkh" onClick={() => onEditkh(user.User_id)}>Edit</button>
                          <button id="buttonrekh" onClick={() => DeleteUser(user.User_id)}>✘</button>
                        </th>
                      </tr></>
                  ))}
                </ul>
              ) : (
                <p>No users found.</p>
              )}
            </div>
          </div>
        </div>
        {/* phong */}
        <div id="phong" className={`tabcontent ${activeTab === 'phong' ? 'active' : ''}`}>
          <h3 id="searchtyperoom">Tìm ID loại phòng:</h3>
          <input type="text" class="input_searchidtyperoom" id="rssearch" onChange={e => {
            setIdTRoomsearchTR(e.target.value);
          }}></input>
          <button id="Submit" class="submit_searchidtyperoom" onClick={SearchTypeRoomID}><IconSearch /></button>
          <h3 id="searchtyperoombyhotel">Tìm ID Hotel hoặc tên loại phòng:</h3>
          <input type="text" class="input_searchtyperoombyhotel" id="rssearch" onChange={e => {
            setIdHotelsearchTR(e.target.value);
            setTenTypeRoomsearchTR(e.target.value);
          }}></input>
          <button id="Submit" class="submit_searchtyperoombyhotel" onClick={SearchTypeRoomHotel}><IconSearch /></button>
          <h3 id="searchroom">Tìm ID phòng:</h3>
          <input type="text" class="input_searchidroom" id="rssearch" onChange={e => {
            setIdRoomsearchR(e.target.value);
          }}></input>
          <button id="Submit" class="submit_searchidroom" onClick={SearchRoomID}><IconSearch /></button>
          <h3 id="searchroombytype">Tìm phòng theo loại:</h3>
          <input type="text" class="input_searchroombytype" id="rssearch" onChange={e => {
            setIdTypesearchR(e.target.value);
            setIdTypecheckall(e.target.value);
          }}></input>
          <button id="Submit" class="submit_searchroombytype" onClick={SearchRoomByType}><IconSearch /></button>
          <select name="" id="sortprice" onChange={handleOrderByChange}>
            <option className="" value="" >Sắp xếp giá</option><br></br>
            <option value="asc" >Tăng dần</option>
            <option value="desc" >Giảm dần</option>
          </select>
          <button id="Submit" class="submit_checkallroom" onClick={CheckAllIdType}>Duyệt</button>
          <button id="Submit" class="submit_uncheckallroom" onClick={UncheckAllIdType}>Hủy duyệt</button>

          {/* ShowRoom */}
          <div className="editroom">
            <div class="tbroom">
              <div id="trsp1">
                <div id="thsp1">
                  <h3 id="h3idroom">ID</h3>
                  <h3 id="h3idhotelroom">ID Type</h3>
                  <h3 id="h3tenroom">Tên phòng</h3>
                </div>
              </div>
              <div id="showroom" style={{ overflow: "scroll" }}>
                {rooms.length > 0 ? (
                  <ul>
                    {rooms.map((room, i) => (
                      <React.Fragment key={i}>
                        <tr id="trroom">
                          <th id="thidroom" className={`${room.Room_id}`}>{room.Room_id}</th>
                          <th id="thtenroom" className={`${room.Room_id}`}>{room.Room_Name}</th>
                          <th id="thidtyperoomr" className={`${room.Room_id}`}>{room.TypeRoom_id}-{room.TypeRoom_Name}</th>
                          <th id="thremoveroom">
                            {room.status === 0 && (
                              <button id="buttoneditkh" onClick={() => StickRoom(room.Room_id)}>
                                ✓
                              </button>
                            )}
                            {room.status === 1 && (
                              <button id="buttonrekh" onClick={() => UnstickRoom(room.Room_id)}>✘</button>
                            )}
                          </th>
                        </tr>
                      </React.Fragment>
                    ))}
                  </ul>
                ) : (
                  <p>No room found.</p>
                )}
              </div>
            </div>
          </div>
          {/* ShowTypeRoom */}
          <div className="edittyperoom">
            <div class="tbtr">
              <div id="trsp1">
                <div id="thsp1">
                  <h3 id="h3idtyperoom">ID</h3>
                  <h3 id="h3idhoteltyperoom">Hotel</h3>
                  <h3 id="h3tentyperoom">Tên phòng</h3>
                  <h3 id="h3loaityperoom">Loại</h3>
                  <h3 id="h3giatyperoom">Giá</h3>
                  <h3 id="h3anhtyperoom">Ảnh</h3>
                  <h3 id="h3tienichtyperoom">Tiện ích</h3>
                  <h3 id="h3sctyperoom">Sức chứa</h3>
                </div>
              </div>
              <div id="showtyperoom" style={{ overflow: "scroll" }}>
                {typerooms.length > 0 ? (
                  <ul>
                    {typerooms.map((typeroom, i) => (
                      <React.Fragment key={i}>
                        <tr id="trkh">
                          <th id="thidtyperoom" className={`${typeroom.TypeRoom_id}`}>{typeroom.TypeRoom_id}</th>
                          <th id="thidhoteltyperoom" className={`${typeroom.TypeRoom_id}`}>{typeroom.Hotel_id}-{typeroom.Hotel_Name}</th>
                          <th id="thtentyperoom" className={`${typeroom.TypeRoom_id}`}>{typeroom.TypeRoom_Name}</th>
                          <th id="thkieutyperoom" className={`${typeroom.TypeRoom_id}`}>{typeroom.TypeRoom_Style}</th>
                          <th id="thgiatyperoom" className={`${typeroom.TypeRoom_id}`}>{formatCurrency(typeroom.TypeRoom_Price)}</th>
                          <th
                            id="thanhtyperoom"
                            className={`imgroom-${typeroom.TypeRoom_id}`}
                            onClick={() => handleImageTypeRoom(typeroom.TypeRoom_id, typeroom.TypeRoom_Name)}
                          >
                            Xem
                          </th>
                          <th
                            id="thtienichtyperoom"
                            className={`tienichroom-${typeroom.TypeRoom_id}`}
                            onClick={() => handleInteriorRoom(typeroom.TypeRoom_id, typeroom.TypeRoom_Name)}
                          >
                            Xem
                          </th>
                          <th id="thsctyperoom" className={`${typeroom.TypeRoom_id}`}>{typeroom.MaxLoad}</th>
                          <th id="thremovetyperoom">
                            {typeroom.status === 0 && (
                              <button id="buttoneditkh" onClick={() => StickTypeRoom(typeroom.TypeRoom_id)}>
                                ✓
                              </button>
                            )}
                            {typeroom.status === 1 && (
                              <button id="buttonrekh" onClick={() => UnstickTypeRoom(typeroom.TypeRoom_id)}>✘</button>
                            )}
                          </th>
                        </tr>
                      </React.Fragment>
                    ))}
                  </ul>
                ) : (
                  <p>No type room found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* partner */}
        <div id="partner" className={`tabcontent ${activeTab === 'partner' ? 'active' : ''}`}>
          <h3 id="searchpartner">Tìm email hoặc số điện thoại:</h3>
          <input type="text" class="input_searchemailsopart" id="rssearch" onChange={e => {
            setEmailPartSearch(e.target.value);
            setSdtPartSearch(e.target.value);
          }}></input>
          <button id="Submit" class="submit_searchtensopart" onClick={SearchPart}><IconSearch /></button>

          <div class="tbpartner">
            <div id="trsp1">
              <div id="thsp1">
                <h3 id="h3idpartner">ID</h3>
                <h3 id="h3tenpartner">Tên khách hàng</h3>
                <h3 id="h3emailpartner">Email</h3>
                <h3 id="h3sdtpartner">Số điện thoại</h3>
                <h3 id="h3mkpartner">Mật khẩu</h3>
                <h3 id="h3veripartner">Xác thực</h3>
                <h3 id="h3cccdpartner">CCCD</h3>
                <h3 id="h3gpkdpartner">Giấy phép</h3>

              </div>
            </div>
            <div id="showpartner" style={{ overflow: "scroll" }}>
              {partners.length > 0 ? (
                <ul>
                  {partners.map((partner, i) => (
                    formattedDate(partner.Partner_verified) !== "1/1/1970, 8:00 AM" && (
                      <tr key={i} id="trkh">
                        <th id="thidpartner" className={`idkh-${partner.Partner_id}`}>{partner.Partner_id}</th>
                        <th id="thtenpartner" className={`tkh-${partner.Partner_id}`}>{partner.Partner_Name}</th>
                        <th id="themailpartner" className={`emailkh-${partner.Partner_id}`}>{partner.Partner_Email}</th>
                        <th id="thsdtpartner" className={`phonekh-${partner.Partner_id}`}>{partner.Partner_Phone}</th>
                        <th id="thmkpartner" className={`mkkh-${partner.Partner_id}`}>{partner.Partner_Password}</th>
                        <th id="thdcpartner" className={`tvr-${partner.Partner_id}`}>{formattedDate(partner.Partner_verified)}</th>
                        <th id="thcccdpartner" className={`rolekh-${partner.Partner_id}`}
                          onClick={() => handleImageCCCD(partner.Partner_id, partner.Partner_Name)}
                        >Xem</th>
                        <th id="thgpkdpartner" className={`rolekh-${partner.Partner_id}`}
                          onClick={() => handleImageGPKD(partner.Partner_id, partner.Partner_Name)}
                        >Xem</th>
                        <th id="thremovepartner">
                          {partner.status === 0 && (
                            <div>
                              <button id="buttoneditkh" onClick={() => StickPartner(partner.Partner_id, partner.Partner_Email)}>✓</button>
                              <button id="buttonrekh" onClick={() => UnstickPartner(partner.Partner_id, partner.Partner_Email)}>✘</button>
                            </div>
                          )}
                          {partner.status === 1 && (
                            <button id="buttonrekh" onClick={() => UnstickPartner(partner.Partner_id, partner.Partner_Email)}>✘</button>
                          )}
                          {partner.status === 2 && (
                            <button id="buttonrekh" onClick={() => StickPartner(partner.Partner_id, partner.Partner_Email)}>✓</button>
                          )}
                        </th>
                      </tr>
                    )
                  ))}
                </ul>
              ) : (
                <p>No partners found.</p>
              )}
            </div>
          </div>
        </div>
        {/* doanh thu */}
        <div id="doanhthu" className={`tabcontent ${activeTab === 'doanhthu' ? 'active' : ''}`}>
          <hr style={{ width: "96%", margin: "0 2% 20px 2%" }} />
          <select
            style={{
              marginLeft: "25%",
              padding: "0 20px",
              border: "1px solid grey",
              width: "25%",
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
              width: "25%",
              height: "40px",
            }}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          <div //sơ đồ
            style={{
              marginBottom: "2%",
              marginTop: "2%",
              marginLeft: "25%",
              width: "52%",
              height: "500px",
              border: "1px solid #EEEEEE",
            }}
          >
            <canvas
              id="myChart"
              style={{ maxWidth: "100%", maxHeight: "500px", }} // Add maxWidth property
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
                marginLeft: "24%",
                padding: "0 20px 0 20px",
                display: "flex",
                alignItems: "center",
                border: "1px solid grey",
                width: "25%",
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
                marginLeft: "2%",
                padding: "0 20px 0 20px",
                display: "flex",
                alignItems: "center",
                border: "1px solid grey",
                width: "27%",
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
                  {formatCurrency(totalPriceAfter)}
                </span>
                <br />
                <label style={{ fontSize: "18px" }}>Doanh thu</label>
              </div>
            </div>
          </div>
          <div class="tborder">
            <div id="trsp1">
              <div id="thsp1">
                <h3 id="h3idord">ID</h3>
                <h3 id="h3htord">Hotel</h3>
                <h3 id="h3trord">Loại phòng</h3>
                <h3 id="h3rord">Phòng</h3>
                <h3 id="h3tkhord">Tên khách hàng</h3>
                <h3 id="h3ekhord">Email khách hàng</h3>
                <h3 id="h3tiord">Thời gian đặt</h3>
                <h3 id="h3ttord">Tổng tiền</h3>
              </div>
            </div>
            <div id="showorder" style={{ overflow: "scroll" }}>
              {orders.length > 0 ? (
                <ul>
                  {filterDataByMonth(data, selectedMonth).map((order, i) => (
                    <>
                      <tr key={i} id="trkh">
                        <th id="thidord" className={`idkh-${order.Order_id}`}>{order.Order_id}</th>
                        <th id="thidhtord" className={`tkh-${order.Order_id}`}>{order.Hotel_id}-{order.Hotel_Name}</th>
                        <th id="thidtrord" className={`emailkh-${order.Order_id}`}>{order.TypeRoom_id}-{order.TypeRoom_Name}</th>
                        <th id="thidrord" className={`phonekh-${order.Order_id}`}>{order.Room_id}-{order.Room_Name}</th>
                        <th id="thtkhord" className={`mkkh-${order.Order_id}`}>{order.User_Name}</th>
                        <th id="themailkhord" className={`mkkh-${order.Order_id}`}>{order.User_Email}</th>
                        <th id="thtimeiord" className={`tvr-${order.Order_id}`}>{formattedDateNoTime(order.TimeInsert)}</th>
                        <th id="thttord" className={`tvr-${order.Order_id}`}>{formatCurrency(order.Discount)}</th>

                      </tr>
                    </>
                  ))}
                </ul>
              ) : (
                <p>No orders found.</p>
              )}
            </div>
          </div>
        </div>
        {/* comment */}
        <div id="comment" className={`tabcontent ${activeTab === 'comment' ? 'active' : ''}`}>
          <h3 id="searchcmtrank">Tìm rating:</h3>
          <input type="number" class="input_searchcmtrank" id="rssearch" max={5} min={1} onChange={e => {
            setRatingComment(e.target.value);
          }}></input>
          <button id="Submit" class="submit_searchcmtrank" onClick={SearchRating}><IconSearch /></button>
          <h3 id="searchcmtuser">Tìm email:</h3>
          <input type="text" class="input_searchcmtuser" id="rssearch" onChange={e => {
            setEmailUserComment(e.target.value);
          }}></input>
          <button id="Submit" class="submit_searchcmtuser" onClick={SearchIdUserCMT}><IconSearch /></button>
          {/* SearchRoom */}
          <h3 id="searchcmthotel">Tìm ID hotel:</h3>
          <input type="number" class="input_searchcmthotel" id="rssearch" onChange={e => {
            setIdHotelComment(e.target.value);
          }}></input>
          <button id="Submit" class="submit_searchcmthotel" onClick={SearchIdHotelCMT}><IconSearch /></button>

          <div class="tbpartner">
            <div id="trsp1">
              <div id="thsp1">
                <h3 id="h3idcmt">ID</h3>
                <h3 id="h3khcmt">Khách hàng</h3>
                <h3 id="h3htcmt">Hotel</h3>
                <h3 id="h3ratingcmt">Rating</h3>
                <h3 id="h3cmtcmt">Đánh giá</h3>
                <h3 id="h3datecmt">Ngày</h3>

              </div>
            </div>
            <div id="showcomment" style={{ overflow: "scroll" }}>
              {comments.length > 0 ? (
                <ul>
                  {comments.map((comment, i) => (
                    <>
                      <tr key={i} id="trkh">
                        <th id="thidcmt" className={`idkh-${comment.Review_id}`}>{comment.Review_id}</th>
                        <th id="thusercmt" className={`tkh-${comment.Review_id}`}>{comment.User_id}-{comment.User_Email}</th>
                        <th id="thhotelcmt" className={`emailkh-${comment.Review_id}`}>{comment.Hotel_id}-{comment.Hotel_Name}</th>
                        <th id="thratingcmt" className={`phonekh-${comment.Review_id}`}>{comment.Rating}</th>
                        <th id="thcmtcmt" className={`phonekh-${comment.Review_id}`}>{comment.Comment}</th>
                        <th id="thdatecmt" className={`tvr-${comment.Review_id}`}>{formattedDateNoTime(comment.DateCreate)}</th>
                        <th id="thremovecmt">
                          <button id="buttonrekh" onClick={() => DeleteComment(comment.Review_id)}>✘</button>
                        </th>
                      </tr></>
                  ))}
                </ul>
              ) : (
                <p>No comments found.</p>
              )}
            </div>
          </div>
        </div>
        {/* video */}
        <div id="video" className={`tabcontent ${activeTab === 'video' ? 'active' : ''}`}>
          <h1 id="themvideo">Thêm video</h1>

          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            ref={fileInputRef}
            className="hidden"
          />
          <br></br>
          <button type="button" id="btnaddvideo" onClick={() => fileInputRef.current.click()}>Chọn video</button>
          <br></br>
          {videoClip && <p id="tenvideo">Tên video: {videoClip.name}</p>}
          <br></br>
          <button type="button" id="btnthemvideo" onClick={handleSubmitVideo}>Thêm</button><br></br><br></br>



          <h1 id="themanh">Thêm ảnh</h1>

          <input
            id="image-upload"
            type="file"
            accept="image/*"
            value={null}
            onChange={handleImageChange}
            ref={fileInputRefImg}
            className="hidden"

          /><br></br>
          <button type="button" id="btnaddanhnen" onClick={() => fileInputRefImg.current.click()}>Chọn ảnh</button>
          <br></br>
          {anhnen && <p id="tenanh">Tên ảnh: {anhnen.name}</p>}
          <br></br>
          <button type="button" id="btnthemanhnen" onClick={handleSubmitImgage}>Thêm</button>

          <div class="tbvideo">
            <div id="trsp1">
              <div id="thsp1">
                <h3 id="h3idvideo">ID</h3>
                <h3 id="h3tenvideo">Tên vido</h3>
                <h3 id="h3video">Video</h3>
              </div>
            </div>
            <div id="showvideo" style={{ overflow: "scroll" }}>
              {videos.length > 0 ? (
                <ul>
                  {videos.map((video, i) => (
                    <>
                      <tr key={i} id="trkh">
                        <th id="thidcmt" className={`idkh-${video.Video_id}`}>{video.Video_id}</th>
                        <th id="thusercmt" className={`tkh-${video.Video_id}`}>{video.Video_clip}</th>
                        <th id="thremovecmt" className={`rolekh-${video.Video_id}`}
                          onClick={() => handleVideoDialogOpen(video.Video_id)}
                        >Xem</th>
                        <th id="thremovecmt">
                          {video.Status === 1 && (
                            <button id="buttonrekh">✘</button>
                          )}
                          {video.Status === 0 && (
                            <button id="buttonrekh" onClick={() => StickVideo(video.Video_id)}>✓</button>
                          )}
                        </th>
                      </tr></>
                  ))}
                </ul>
              ) : (
                <p>No videos found.</p>
              )}
            </div>
          </div>

          <div class="tbanhnen">
            <div id="trsp1">
              <div id="thsp1">
                <h3 id="h3idanhnen">ID</h3>
                <h3 id="h3tenanhnen">Tên ảnh</h3>
                <h3 id="h3anhnen">Ảnh</h3>
              </div>
            </div>
            <div id="showanhnen" style={{ overflow: "scroll" }}>
              {imagesnen.length > 0 ? (
                <ul>
                  {imagesnen.map((imagenen, i) => (
                    <>
                      <tr key={i} id="trkh">
                        <th id="thidcmt" className={`idkh-${imagenen.Images_id}`}>{imagenen.Images_id}</th>
                        <th id="thtenanhnen" className={`tkh-${imagenen.Images_id}`}>{imagenen.Images_url}</th>
                        <th id="thremovecmt" className={`rolekh-${imagenen.Images_id}`}
                          onClick={() => handleAnhNenDialogOpen(imagenen.Images_id)}
                        >Xem</th>
                        <th id="thremovecmt">
                          {imagenen.Status === 1 && (
                            <button id="buttonrekh" onClick={() => UnstickAnhNen(imagenen.Images_id)}>✘</button>
                          )}
                          {imagenen.Status === 0 && (
                            <button id="buttonrekh" onClick={() => StickAnhNen(imagenen.Images_id)}>✓</button>
                          )}
                        </th>
                      </tr>
                    </>
                  ))}
                </ul>
              ) : (
                <p>No videos found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin