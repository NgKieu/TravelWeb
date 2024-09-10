import React, { useState, useCallback, useEffect } from 'react'
import Header from './Header'
import ShowImageTypeRoom from './ShowImageTypeRoom';
import ShowInterior from './ShowInterior';
import Reviews from './Reviews';
import ShowReviews from './ShowReviews';
import Footer from './Footer'
import iconBackground from '../../assets/icon_background_ten_mytour_new.png'
import '../../index.css'
import axios from 'axios'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faUmbrellaBeach,
    faLocationDot,
    faUserGroup,
    faUtensils,
    faCheck,
    faBed,
    faCalendar,
    faAngleDown,
    faPerson,
    faHeart
} from "@fortawesome/free-solid-svg-icons";

const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const Tag = ({ text, bgColor }) => {
    return (
        <div className={`text-[#fff] w-fit py-1 px-3 font-[600] ${bgColor} rounded-md`}>
            {text}
        </div>
    )
}

const IconCalendar = ({ classIcon }) => {
    const iconSize = {
        width: '20px',
        height: '20px',
    };
    return (
        <span className='col-span-1'>
            <FontAwesomeIcon icon={classIcon} style={iconSize} />
        </span>
    );
};

const AngleDown = ({ classIcon }) => {
    const iconSize = {
        width: '18px',
        height: '18px',
        marginTop: "3px"
    };
    return (
        <span>
            <FontAwesomeIcon icon={classIcon} style={iconSize} />
        </span>
    );
};

const Ultilies = ({ classIcon, color }) => {
    const iconSize = {
        width: "20px",
        height: "20px",
        marginRight: "7px",
        color: color
    };
    return (
        <span>
            <FontAwesomeIcon icon={classIcon} style={iconSize} />
        </span>
    );
};


const Umbrella = ({ classIcon }) => {
    const iconSize = {
        width: "16px",
        height: "16px",
        color: "#33C0ED",
        marginRight: "5px"
    };
    return (
        <span>
            <FontAwesomeIcon icon={classIcon} style={iconSize} />
        </span>
    );
};


const Location = ({ classIcon }) => {
    const iconSize = {
        width: "16px",
        height: "16px",
        color: "red",
        marginRight: "5px"
    };
    return (
        <span>
            <FontAwesomeIcon icon={classIcon} style={iconSize} />
        </span>
    );
};

const RatingStars = ({ numStars }) => {
    const stars = [];
    const iconSize = {
        width: "14px",
        height: "14px",
        color: "#FFBC39",
        marginRight: "2px"
    };
    for (let i = 0; i < numStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} style={iconSize} />);
    }
    return <div className="rate5">{stars}</div>;
};



const DetailHotel = () => {
    const arr = window.location.href.split('/');
    const n = arr.length - 1;
    const [detailHotel, setdetailHotel] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8081/detailHotel/${arr[n]}`,)
            .then(res => setdetailHotel(res.data))
            .catch(err => console.log(err));

        const userID = localStorage.getItem('idUser');
        axios.get(`http://localhost:8081/getUserFavoriteHotel/${userID}`)
            .then(res => {
                const favoriteHotels = res.data;
                const favoriteStatusObj = {};
                favoriteHotels.forEach(hotel => {
                    favoriteStatusObj[hotel.Hotel_id] = true;
                });
                setFavoriteStatus(favoriteStatusObj);
            })
            .catch(err => console.log(err));
    }, [])


    const [imageUrls, setImageUrls] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8081/showImgHotelDetail/${arr[n]}`)
            .then(res => {
                const urls = res.data.map(item => "../../assets/" + item.Image_URL);
                setImageUrls(urls);
            })
            .catch(err => console.log(err));
    }, []);

    // Render image hotel
    const renderImages = () => {
        if (imageUrls.length === 0) {
            return null; // Return null or a loading indicator until imageUrls is populated
        }

        return imageUrls.map((url, index) => (
            <div key={index} className={`col-span-${index < 2 ? 2 : 1}`}>
                <img
                    className='w-full h-full object-cover img-hotel rounded-[10px]'
                    alt={`Image ${index + 1}`}
                    src={url}
                />
            </div>
        ));
    };



    // Calendar
    const [dateCheckIn, setDateCheckIn] = useState(new Date());
    const [showCalendarCheckIn, setShowCalendarCheckIn] = useState(false);
    const [dateCheckOut, setDateCheckOut] = useState(new Date());
    const [showCalendarCheckOut, setShowCalendarCheckOut] = useState(false);

    const onChangeCheckIn = newDate => {
        handleHideCalendarCheckOut();
        setDateCheckIn(newDate);
        setShowCalendarCheckIn(false);
        setDateCheckOut(newDate);
    };

    const onChangeCheckOut = newDate => {
        setDateCheckOut(newDate);
        handleHideCalendarCheckOut();
    };


    const handleHideCalendarCheckOut = () => {
        setShowCalendarCheckOut(false);
    };

    const calculateNumberOfDays = (checkInDate, checkOutDate) => {
        // Convert both dates to milliseconds
        const checkInTime = checkInDate.getTime();
        const checkOutTime = checkOutDate.getTime();

        // Calculate the difference in milliseconds
        const timeDifference = checkOutTime - checkInTime;

        // Convert the difference to days
        const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

        return numberOfDays;
    };


    const numberOfDays = calculateNumberOfDays(dateCheckIn, dateCheckOut);

    if (numberOfDays < 0) {
        Swal.fire('Vui lòng chọn lại ngày đến!');
        setDateCheckOut(dateCheckIn);
    }

    const [showPeopleBox, setShowPeopleBox] = useState(false);
    const [people, setPeople] = useState(1); // Initial number of people

    const decreaseCount = () => {
        if (people > 1) {
            setPeople(people - 1);
        }
    };

    const increaseCount = () => {
        setPeople(people + 1);
    };

    // render all typerooms
    const [typerooms, setTypeRooms] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8081/showTypeRooms/${arr[n]}`)
            .then((res) => {
                setTypeRooms(res.data);
            })
            .catch((err) => console.log(err));
    }, []);





    // Scroll to tiltle
    const scrollToTitle = (titleRef) => {
        titleRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const titleChooseRoom = React.useRef(null);


    // Use toFixed() to ensure a specific number of decimal places
    const formattedValue = (num) => {
        return num.toFixed(1);
    }

    const calculateNumberOfDayChooseRoom = (checkInDate, checkOutDate) => {
        // Convert both dates to milliseconds
        const checkInTime = checkInDate.getTime();
        const checkOutTime = checkOutDate.getTime();

        // Calculate the difference in milliseconds
        const timeDifference = checkOutTime - checkInTime;

        // Convert the difference to days
        const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

        return numberOfDays;
    };

    const [dateCheckInChooseRoom, setDateCheckInChooseRoom] = useState(new Date());
    const [showCalendarCheckInChooseRoom, setShowCalendarCheckInChooseRoom] = useState(false);
    const [dateCheckOutChooseRoom, setDateCheckOutChooseRoom] = useState(new Date());
    const [showCalendarCheckOutChooseRoom, setShowCalendarCheckOutChooseRoom] = useState(false);
    const [showPeopleChooseRoomBox, setShowPeopleChooseRoomBox] = useState(false);
    const [showRoomChooseRoomBox, setShowRoomChooseRoomBox] = useState(false);

    const onChangeCheckInChooseRoom = newDate => {
        setDateCheckInChooseRoom(newDate);
        setShowCalendarCheckInChooseRoom(false);
        setDateCheckOutChooseRoom(newDate);
    };

    // Format the date to 'dd/MM/yyyy' format
    const formattedDateCheckInChooseRoom = dateCheckInChooseRoom.toLocaleDateString('en-GB');

    const handleShowCalendarCheckInChooseRoom = () => {
        setShowCalendarCheckInChooseRoom(true);
        setShowCalendarCheckOutChooseRoom(true);
        setShowPeopleChooseRoomBox(false);
        setShowRoomChooseRoomBox(false);
    };


    const onChangeCheckOutChooseRoom = newDate => {
        setDateCheckOutChooseRoom(newDate);
        handleHideCalendarCheckOutChooseRoom();
        setShowCalendarCheckInChooseRoom(false);
    };

    const formattedDateCheckOutChooseRoom = dateCheckOutChooseRoom.toLocaleDateString('en-GB');

    const handleHideCalendarCheckOutChooseRoom = () => {
        setShowCalendarCheckOutChooseRoom(false);
    };


    const numberOfDayChooseRoom = calculateNumberOfDayChooseRoom(dateCheckInChooseRoom, dateCheckOutChooseRoom);

    if (numberOfDayChooseRoom < 0) {
        Swal.fire('Vui lòng chọn lại ngày đến!');
        setDateCheckOutChooseRoom(dateCheckInChooseRoom);
    }


    const [peopleChooseRoom, setPeopleChooseRoom] = useState(1); // Initial number of people
    const [roomChooseRoom, setRoomChooseRoom] = useState(1); // Initial number of people

    // for people
    const decreaseCountChooseRoom = () => {
        if (peopleChooseRoom > 1) {
            setPeopleChooseRoom(peopleChooseRoom - 1);
        }
    };

    const increaseCountChooseRoom = () => {
        setPeopleChooseRoom(peopleChooseRoom + 1);
    };

    const handleInputClickChooseRoom = () => {
        setShowPeopleChooseRoomBox(true);
        setShowRoomChooseRoomBox(false);
        setShowCalendarCheckInChooseRoom(false);
        setShowCalendarCheckOutChooseRoom(false);

        // // Automatically hide the box after 3 seconds
        setTimeout(() => {
            setShowPeopleChooseRoomBox(false);
        }, 5000);
    };


    // for room
    const decreaseCountRoomChooseRoom = () => {
        if (roomChooseRoom > 1) {
            setRoomChooseRoom(roomChooseRoom - 1);
        }
    };

    const increaseCountRoomChooseRoom = () => {
        setRoomChooseRoom(roomChooseRoom + 1);
        setPeopleChooseRoom(roomChooseRoom + 1);
    };

    const handleInputRoomClickChooseRoom = () => {
        setShowPeopleChooseRoomBox(false);
        setShowRoomChooseRoomBox(true);
        setShowCalendarCheckInChooseRoom(false);
        setShowCalendarCheckOutChooseRoom(false);

        // // Automatically hide the box after 3 seconds
        setTimeout(() => {
            setShowRoomChooseRoomBox(false);
        }, 5000);
    };



    const sort = () => {
        setShowPeopleChooseRoomBox(false);
        setShowRoomChooseRoomBox(false);
        setShowCalendarCheckInChooseRoom(false);
        setShowCalendarCheckOutChooseRoom(false);
        axios
            .post('http://localhost:8081/searchTypeRoom', {
                checkInDate: formattedDateCheckInChooseRoom,
                checkOutDate: formattedDateCheckOutChooseRoom,
                numPeoPle: peopleChooseRoom,
                numRoom: roomChooseRoom,
                idHotel: arr[n],
            })
            .then(res => {
                // console.log(res.data)
                const textElement = document.getElementById('non-result');
                if (res.data == 'Not exists') {
                    setTypeRooms([]);
                    textElement.style.display = 'block';
                }
                else {
                    setTypeRooms(res.data);
                    textElement.style.display = 'none';
                }
            })
            .catch(err => console.log(err));
    }

    const navigate = useNavigate();

    function goOrder() {
        navigate(`/order/`);
    }

    const listID = [];

    function tienHanhDatPhong(id, price) {
        localStorage.setItem('Hotel_id', arr[n]);
        localStorage.setItem('TypeRoom_id', id);
        localStorage.setItem('checkInDate', formattedDateCheckInChooseRoom);
        localStorage.setItem('checkOutDate', formattedDateCheckOutChooseRoom);
        localStorage.setItem('numPeoPle', peopleChooseRoom);
        localStorage.setItem('numRoom', roomChooseRoom);
        localStorage.setItem('priceBefore', price);
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
        else {
            axios
                .post('http://localhost:8081/setRoomWaiting', {
                    numRoom: roomChooseRoom,
                    typeRoom: id
                })
                .then(res => {
                    if (res.data == "No rooms found to update.") {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Đã hết phòng!',
                        });
                    }
                    else {
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
                        for (let index = 0; index < res.data.length; index++) {
                            const element = res.data[index];
                            listID.push(element);
                            console.log(element);
                        }
                        console.log(listID);
                        goOrder();
                        localStorage.setItem("ListRoomID", JSON.stringify(listID));


                    }
                })
                .catch(err => console.log(err));
        }

    }


    const getImageUrlsHTML = (images) => {
        let html = '<div class="mx-auto grid grid-cols-3 gap-2">';
        images.forEach((image, index) => {
            html += `<div class="col-span-1 h-[300px]"><img class="h-full w-full object-cover" alt="" src="../assets/${image.Image_URL}"></img></div>`;
        });
        html += "</div>";
        return html;
    };

    const handleImageDialogOpen = async (TypeRoomIdImg, TypeRoomName) => {
        // alert(TypeRoomIdImg);
        try {
            const response = await axios.get(
                "http://localhost:8081/showImageTypeRooms/" + TypeRoomIdImg,
            );
            const imageData = response.data;
            // alert(imageData.length)
            Swal.fire({
                title: `Ảnh của phòng ${TypeRoomName} `,
                html: getImageUrlsHTML(imageData),
                showCloseButton: true,
                showConfirmButton: false,
                customClass: {
                    container: "custom-swal-container-type",
                    popup: "custom-swal-popup",
                },
                // allowOutsideClick: true
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getImageUrlsHTMLHotel = (images) => {
        let html = '<div class="mx-auto grid grid-cols-3 gap-2">';
        images.forEach((image, index) => {
            html += `<div class="col-span-1 h-[300px]"><img class="h-full w-full object-cover" alt="" src="../assets/${image.Image_URL}"></img></div>`;
        });
        html += "</div>";
        return html;
    };

    const handleImageDialogOpenHotel = async (HotelIdImg, HotelName) => {
        try {
            const response = await axios.get(
                "http://localhost:8081/showImageHotels/" + HotelIdImg,
            );
            const imageData = response.data;
            // alert(imageData.length)
            Swal.fire({
                title: `Ảnh của ${HotelName} `,
                html: getImageUrlsHTMLHotel(imageData),
                showCloseButton: true,
                showConfirmButton: false,
                customClass: {
                    container: "custom-swal-container-type",
                    popup: "custom-swal-popup",
                },
                // allowOutsideClick: true
            });
        } catch (error) {
            console.error(error);
        }
    };

    const [showRe, setShowRe] = useState(false);
    const [count, setCount] = useState(0);
    const [aveRating, setAveRating] = useState(0);


    useEffect(() => {
        if (localStorage.getItem('idUser') !== null) {
            axios
                .post(`http://localhost:8081/findUserHotel`, {
                    idHotel: arr[n],
                    idUser: localStorage.getItem('idUser')
                })
                .then(res => {
                    if (res.data.length === 0) {
                        setShowRe(false);
                    }
                    else {
                        setShowRe(true);
                    }
                })
                .catch(err => console.log(err));
        }

    }, [])

    useEffect(() => {
        axios
            .post(`http://localhost:8081/countReviews`, {
                idHotel: arr[n],
            })
            .then(res => {
                setCount(res.data[0].count);
                if (res.data[0].AVE == null) {
                    setAveRating(0);
                }
                else {
                    setAveRating(res.data[0].AVE);
                }
            })
            .catch(err => console.log(err));
    })

    const CheckRating = (rating) => {
        if (rating > 4) {
            return 'Xuất sắc'
        }
        if (rating > 3) {
            return 'Tuyệt vời'
        }
        if (rating > 2) {
            return 'Tốt'
        }
        if (rating > 1) {
            return 'Trung bình'
        }
        if (rating > 0) {
            return 'Kém'
        }
        if (rating == 0) return ''
    }

    const [favoriteStatus, setFavoriteStatus] = useState({});

    const toggleFavorite = (hotelId) => {
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
        else {
            setFavoriteStatus((prevStatus) => ({
                ...prevStatus,
                [hotelId]: !prevStatus[hotelId],
            }));

            axios
                .post('http://localhost:8081/updateFavoriteStatus', {
                    hotelID: hotelId,
                    userID: localStorage.getItem('idUser')
                })
                .then(res => {
                })
                .catch(err => console.log(err));
        }

    };

    const Favorite = ({ classIcon, hotelId, isFavorite }) => {
        const iconSize = {
            width: "36px",
            height: "36px",
            color: isFavorite ? "#FF3366" : "#000000",
            position: "absolute",
            right: "0px",
            top: "0px",
            cursor: 'pointer'
        };

        return (
            <span onClick={() => toggleFavorite(hotelId)}>
                <FontAwesomeIcon icon={classIcon} style={iconSize} />
            </span>
        );
    };

    return (
        <div className='font-app detail-hotel'>
            <Header />
            <div>
                <div className='calendarCheckIn-search-bar absolute w-[450px] text-center mx-auto'>
                    {showCalendarCheckIn && <Calendar onChange={onChangeCheckIn} value={dateCheckIn} />}
                </div>
            </div>

            <div>
                <div className='calendarCheckOut-search-bar absolute w-[450px] text-center mx-auto'>
                    {showCalendarCheckOut && <Calendar onChange={onChangeCheckOut} value={dateCheckOut} />}
                </div>
            </div>

            {showPeopleBox && (
                <div className='relative z-1100 w-[150px] p-1 z-50 bg-white grid grid-cols-3 text-center rounded-[100px] left-[1150px] top-[140px]'>
                    <div className='col-span-1 w-full h-full p-auto'>
                        <button onClick={decreaseCount} className='w-[40px] text-[24px] h-[40px] border-[#FF3366] border-[1px] text-[#FF3366] rounded-[100px]'>
                            -
                        </button>
                    </div>
                    <div className='col-span-1 m-auto'>
                        <input className='w-full text-center outline-none' value={people} readOnly />
                    </div>
                    <div className='col-span-1 w-full h-full'>
                        <button onClick={increaseCount} className='w-[40px] text-[24px] h-[40px] border-[#FF3366] border-[1px] text-[#FF3366] rounded-[100px]'>
                            +
                        </button>
                    </div>
                </div>
            )}

            <div className='relative top-[150px] w-[1188px] m-auto mb-96'>

                { // Added link to hotel from home page
                    detailHotel.length > 0 ? (
                        detailHotel.map((data, i) => (
                            <div key={i} >
                                <div className='grid grid-cols-4 relative' >
                                    <div className='col-span-3 '>
                                        <div className='link-to-hotel text-[13px]'>
                                            <span>Khách sạn</span>
                                            <span className='mx-2'>{'>'}</span>
                                            <span>{data.Hotel_Location}</span>
                                            <span className='mx-2'>{'>'}</span>
                                            <span>{data.Hotel_Name}</span>
                                        </div>
    
    
                                        <div className='all-tag-of-hotel mt-6 flex space-x-2'>
                                            <Tag text={'Sát biển'} bgColor={'bg-[#FFBC39]'} />
                                            <Tag text={'Giá độc quyền'} bgColor={'bg-[#8547EC]'} />
                                            <Tag text={'Miễn phí xe đưa đón'} bgColor={'bg-[#00B6F3]'} />
                                        </div>
    
                                        <div className='intro-hotel mt-3'>
                                            <div className='text-[26px] font-[600]'>
                                                {data.Hotel_Name}
                                            </div>
    
                                            <div className='my-1'>
                                                <RatingStars numStars={data.Category_id} />
                                            </div>
    
                                            <div>
                                                <Umbrella classIcon={faUmbrellaBeach} />
                                                <span className='text-[#33C0ED] mr-1'>{formattedValue(aveRating)}</span>
                                                <span className='mr-1'>{CheckRating(aveRating)}</span>
                                                <span>({count} đánh giá)</span>
                                            </div>
    
                                            <div>
                                                <Location classIcon={faLocationDot} />
                                                <span>{data.Hotel_Location}</span>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div className='col-span-1 col-end-7 absolute right-0 bottom-0'>
                                        <button
                                            onClick={() => scrollToTitle(titleChooseRoom)}
                                            className="w-[156px] h-[44px] items-center font-[600] bg-[#FF3366] text-[#fff] rounded-[8px] text-[16px]">
                                            Xem phòng
                                        </button>
                                    </div>
                                </div>
    
    
                                <Favorite classIcon={faHeart} hotelId={data.Hotel_id} isFavorite={favoriteStatus[data.Hotel_id]} />
                                <div className='grid grid-cols-4 grid-flow-row mt-4 gap-2' onClick={() => handleImageDialogOpenHotel(data.Hotel_id, data.Hotel_Name)}>
    
                                    {renderImages()}
                                </div>
    
                                <div className='mt-7 h-[205px]'>
                                    <h2 className='font-[600] text-[20px]'>Đánh giá</h2>
                                    <div className='box-rate h-[180px]'>
                                        <div className='grid grid-cols-7 gap-4 h-full'>
                                            <div className='col-span-1 '>
                                                <div className='w-[120px] h-[120px] rounded-[100px] border-[6px] border-[#FF3366] relative top-1/2 translate-y-[-50%]'>
                                                    <div className='absolute translate-y-[-50%] top-[50%] left-[50%] translate-x-[-50%] text-[#FF3366] font-[600] text-[30px]'>{formattedValue(aveRating)}  </div>
                                                </div>
                                            </div>
                                            <div className='col-span-2 relative'>
                                                <div className='h-[145px] rounded-[10px]'>
                                                    <img className='object-fit absolute top-1/2 translate-y-[-50%]' src={iconBackground}>
                                                    </img>
                                                    <span className='absolute w-[180px] text-[18px] top-1/2 translate-y-[-50%] right-2'><b className='text-[#CCA154]'>Dịch vụ khách hàng</b> từ trái tim, phục vụ khách hàng 24/7</span>
                                                </div>
                                            </div>
    
                                            <div className='col-span-2 relative'>
                                                <div className='h-[145px] rounded-[10px]'>
                                                    <img className='object-fit absolute top-1/2 translate-y-[-50%]' src={iconBackground}>
                                                    </img>
                                                    <span className='absolute w-[180px] text-[18px] top-1/2 translate-y-[-50%] right-2'><b className='text-[#CCA154]'>Nền tảng du lịch</b> số 1 Việt Nam về đặt phòng khách sạn</span>
                                                </div>
                                            </div>
    
                                            <div className='col-span-2 relative'>
                                                <div className='h-[145px] rounded-[10px]'>
                                                    <img className='object-fit absolute top-1/2 translate-y-[-50%]' src={iconBackground}>
                                                    </img>
                                                    <span className='absolute w-[180px] text-[18px] top-1/2 translate-y-[-50%] right-2'><b className='text-[#CCA154]'>Cam kết</b> giá tốt nhất và Thanh toán dễ dàng, đa dạng</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <br ref={titleChooseRoom} />
                                <div className='relative top-[50px] w-full'>
                                    <div className='font-bold text-[20px]'>Chọn phòng</div>
                                    <div className='w-full box-apply py-[16px] px-[24px] flex space-x-4 mt-2 rounded-[8px]'>
                                        <div onClick={handleShowCalendarCheckInChooseRoom} className='w-[310px] h-[42px] border border-1 border-[#CBD5E0] rounded-[8px] cursor-pointer bg-white p-[8px] space-x-3 grid grid-cols-8 items-center text-center'>
                                            <IconCalendar classIcon={faCalendar} />
                                            <span className='text-[15px] font-bold col-span-6'>{formattedDateCheckInChooseRoom} - {formattedDateCheckOutChooseRoom}</span>
                                            <AngleDown classIcon={faAngleDown} />
                                        </div>
    
                                        <div onClick={handleInputRoomClickChooseRoom} className='w-[180px] h-[42px] border border-1 border-[#CBD5E0] rounded-[8px] cursor-pointer bg-white p-[8px] space-x-3 grid grid-cols-8 items-center text-center'>
                                            <IconCalendar classIcon={faPerson} />
                                            <span className='text-[15px] font-bold col-span-5'>{roomChooseRoom} Phòng</span>
                                            <AngleDown classIcon={faAngleDown} />
                                        </div>
    
                                        <div onClick={handleInputClickChooseRoom} className='w-[180px] h-[42px] border border-1 border-[#CBD5E0] rounded-[8px] cursor-pointer bg-white p-[8px] space-x-3 grid grid-cols-8 items-center text-center'>
                                            <IconCalendar classIcon={faPerson} />
                                            <span className='text-[15px] font-bold col-span-5'>{peopleChooseRoom} Người lớn</span>
                                            <AngleDown classIcon={faAngleDown} />
                                        </div>
    
    
                                        <button
                                            onClick={sort}
                                            className="w-auto h-[42px] font-[600] bg-[#FF3366] px-[24px] text-[#fff] rounded-[8px] text-[15px]">
                                            Kiểm tra tình trạng phòng
                                        </button>
    
                                        <div>
                                            <div className='calendarCheckIn-choose-room absolute w-[450px] text-center mx-auto'>
                                                {showCalendarCheckInChooseRoom && <Calendar onChange={onChangeCheckInChooseRoom} value={dateCheckInChooseRoom} />}
                                            </div>
                                        </div>
    
                                        <div>
                                            <div className='calendarCheckOut-choose-room absolute w-[450px] text-center mx-auto'>
                                                {showCalendarCheckOutChooseRoom && <Calendar onChange={onChangeCheckOutChooseRoom} value={dateCheckOutChooseRoom} />}
                                            </div>
                                        </div>
    
    
                                    </div>
                                    {showRoomChooseRoomBox && (
                                        <div className='absolute shadow1 w-[150px] p-1 bg-white grid grid-cols-3 text-center rounded-[100px] left-[371px] top-[125px]'>
                                            <div className='col-span-1 w-full h-full p-auto'>
                                                <button onClick={decreaseCountRoomChooseRoom} className='w-[40px] text-[24px] h-[40px] border-[#FF3366] border-[1px] text-[#FF3366] rounded-[100px]'>
                                                    -
                                                </button>
                                            </div>
                                            <div className='col-span-1 m-auto'>
                                                <input className='w-full text-center outline-none' value={roomChooseRoom} readOnly />
                                            </div>
                                            <div className='col-span-1 w-full h-full'>
                                                <button onClick={increaseCountRoomChooseRoom} className='w-[40px] text-[24px] h-[40px] border-[#FF3366] border-[1px] text-[#FF3366] rounded-[100px]'>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {showPeopleChooseRoomBox && (
                                        <div className='absolute shadow1 w-[150px] p-1 bg-white grid grid-cols-3 text-center rounded-[100px] left-[561px] top-[125px]'>
                                            <div className='col-span-1 w-full h-full p-auto'>
                                                <button onClick={decreaseCountChooseRoom} className='w-[40px] text-[24px] h-[40px] border-[#FF3366] border-[1px] text-[#FF3366] rounded-[100px]'>
                                                    -
                                                </button>
                                            </div>
                                            <div className='col-span-1 m-auto'>
                                                <input className='w-full text-center outline-none' value={peopleChooseRoom} readOnly />
                                            </div>
                                            <div className='col-span-1 w-full h-full'>
                                                <button onClick={increaseCountChooseRoom} className='w-[40px] text-[24px] h-[40px] border-[#FF3366] border-[1px] text-[#FF3366] rounded-[100px]'>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='relative top-[60px]'>
                                    <div id='non-result' className='hidden text-center text-[24px] my-20 font-bold'>Không tìm thấy kết quả nào!</div>
                                    {typerooms.map((data, i) => (
                                        <div key={i}>
    
                                            <div className='room-infor-detailhotel shadow2 w-full h-[410px] rounded-[8px] mt-14'>
    
                                                <div className='h-full p-[24px] grid grid-cols-4 gap-3'>
    
                                                    <div className='col-span-1 overflow-auto cursor-pointer' onClick={() => handleImageDialogOpen(data.TypeRoom_id, data.TypeRoom_Name)}>
                                                        <ShowImageTypeRoom id={(data.TypeRoom_id)} />
                                                    </div>
    
                                                    <div className='col-span-2 relative'>
                                                        <div className='text-[24px] font-bold'>{data.TypeRoom_Name}</div>
                                                        <div className='text-[#5cb5ff] text-[18px]'><Ultilies classIcon={faUserGroup} />Tối đa {data.MaxLoad} người</div>
                                                        <div className='text-[#d67b31] text-[18px]'><Ultilies classIcon={faBed} />{data.TypeRoom_Style}</div>
                                                        <div className='text-[#2fc86f] text-[18px]'><Ultilies classIcon={faUtensils} />Bữa sáng miễn phí</div>
                                                        <div className='text-[#ff3939] text-[18px]'><Ultilies classIcon={faCheck} />An tâm đặt phòng, Mytour hỗ trợ xuất hoá đơn nhanh chóng, tiết kiệm thời gian cho bạn.</div>
    
                                                        <div className='endow bg-[#e5ebf0] px-[16px] py-[12px] absolute bottom-0'>
                                                            <div className='font-bold'>Ưu đãi bao gồm</div>
                                                            <div><Ultilies classIcon={faCheck} color={'#48BB78'} />Miễn phí đưa đón HCM - VT tùy theo chỗ trống và lịch trình khách sạn</div>
                                                            <div><Ultilies classIcon={faCheck} color={'#48BB78'} />Miễn phí đưa đón tối đa 2 trẻ dưới 12 tuổi ngồi cùng người lớn và phụ thu ăn sáng tùy theo tuổi</div>
                                                            <div><Ultilies classIcon={faCheck} color={'#48BB78'} />Trẻ em 6 - 11 tuổi nếu dùng ghế riêng thì phụ thu 400.000/bé/2 chiều</div>
                                                        </div>
                                                    </div>
    
                                                    <div className='col-span-1 relative'>
                                                        <div className='overflow-auto h-[160px] text-center leading-[30px]'>
    
                                                            <ShowInterior id={data.TypeRoom_id} />
    
                                                        </div>
    
                                                        <div className='font-[600] text-[20px] right-0 absolute bottom-[46px]'>{formatCurrency(data.TypeRoom_Price)}</div>
                                                        <button
                                                            onClick={() => tienHanhDatPhong(data.TypeRoom_id, data.TypeRoom_Price)}
                                                            className="w-auto h-[42px] font-[600] bg-[#FF3366] px-[24px] text-[#fff] rounded-[8px] text-[15px] bottom-0 right-0 absolute"
                                                        >
                                                            Tiến hành đặt phòng
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
    
    
                            </div>
    
    
    
                        ))
                    )
                    : (<p>No hotels found</p>)
                   
                }
            </div>
            <div className='mt-[-50px] mb-[30px]'>
                <div className='border-b-[1px] font-bold text-[20px] w-[1188px] mx-auto border-[#FF3366]'>Phần bình luận</div>
                <ShowReviews idHotel={arr[n]} />
            </div>

            {
                showRe === true ? (
                    <div>
                        <Reviews idHotel={arr[n]} />
                    </div>
                ) : null
            }

            <div className='mt-[-600px]'>
                <Footer />
            </div>
        </div>
    );
}

export default DetailHotel;