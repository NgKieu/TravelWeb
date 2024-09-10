import React, { useState, useEffect, useCallback } from "react";
import "../../index.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faLocationDot,
    faUmbrellaBeach,
    faHeart
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import logo from "../../assets/logo.svg";
import { path } from "../../ultils/constaint";


const Location = ({ classIcon }) => {
    const iconSize = {
        width: "16px",
        height: "16px",
        color: "red",
        marginRight: "5px",
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
        marginRight: "5px",
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
        marginRight: "2px",
    };

    for (let i = 0; i < numStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} style={iconSize} />);
    }

    return <div className="rate5">{stars}</div>;
};

const Favorite = () => {
    const [favoriteStatus, setFavoriteStatus] = useState({});
    const navigate = useNavigate();
    const [hotel, setHotel] = useState([]);

    const formattedValue = (num) => {
        return num.toFixed(1);
    }

    const goHome = useCallback(() => {
        navigate(path.HOME);
    });


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
                    navigate('/favorite');
                })
                .catch(err => console.log(err));
            const userID = localStorage.getItem('idUser');

            axios.get(`http://localhost:8081/showUserFavoriteHotel/${userID}`)
                .then(res => {
                    const favoriteHotels = res.data;
                    const favoriteStatusObj = {};
                    favoriteHotels.forEach(hotel => {
                        favoriteStatusObj[hotel.Hotel_id] = true;
                    });
                    setFavoriteStatus(favoriteStatusObj);
                    setHotel(res.data);
                })
                .catch(err => console.log(err));
        }

    };

    useEffect(() => {
        // Fetch user's favorite hotels from the server
        const userID = localStorage.getItem('idUser');
        axios.get(`http://localhost:8081/showUserFavoriteHotel/${userID}`)
            .then(res => {
                const favoriteHotels = res.data;
                const favoriteStatusObj = {};
                favoriteHotels.forEach(hotel => {
                    favoriteStatusObj[hotel.Hotel_id] = true;
                });
                setFavoriteStatus(favoriteStatusObj);
                setHotel(res.data);
            })
            .catch(err => console.log(err));
    }, []);


    const goDetail = useCallback(
        (id) => {
            axios
                .post('http://localhost:8081/updateView', {
                    hotelID: id,
                })
                .then(res => {
                })
                .catch(err => console.log(err));
            navigate(`/detailhotel/${id}`);
        },
        [navigate]
    );
    const Favorite = ({ classIcon, hotelId, isFavorite }) => {
        const iconSize = {
            width: "24px",
            height: "24px",
            color: isFavorite ? "#FF3366" : "#000000",
            position: "absolute",
            right: "8px",
            top: "8px",
        };

        return (
            <span onClick={() => toggleFavorite(hotelId)}>
                <FontAwesomeIcon icon={classIcon} style={iconSize} />
            </span>
        );
    };

    return (
        <div className="relative w-full font-app bg-[#EDF6F9] py-[44px]">
            <img src={logo} alt="logo" onClick={goHome} className="w-[143px] h-[40px] mx-auto cursor-pointer" />
            <div className="m-auto h-full max-w-[1188px] mt-10">

                <div className="leading-9 mb-8">
                    <p className="text-[26px] font-[600]">
                        Danh sách yêu thích của bạn
                    </p>


                </div>
                <div className="box-hotel-sold grid grid-cols-4 item-center gap-6">
                    {hotel.map((data, i) => (
                        <div className="hotel-card h-[460px] bg-white cursor-pointer mb-3" key={i}>
                            <div className="w-full h-[42%] relative">
                                <Favorite classIcon={faHeart} hotelId={data.Hotel_id} isFavorite={favoriteStatus[data.Hotel_id]} />
                                <img
                                    onClick={() => goDetail(data.Hotel_id)}
                                    className="h-full w-full  object-cover"
                                    alt=""
                                    src={`../assets/${data.Hotel_Image}`}
                                ></img>
                            </div>
                            <div className=" w-full h-[58%] justify-bottom p-[12px]">
                                <div className="h-[85%] leading-[30px]">
                                    <p className="name-hotel">{data.Hotel_Name}</p>
                                    <div>
                                        <RatingStars numStars={data.Category_id} />
                                    </div>
                                    <div>
                                        <Location classIcon={faLocationDot} />
                                        <span>{data.Hotel_Location}</span>
                                    </div>
                                    <div>
                                        <Umbrella classIcon={faUmbrellaBeach} />
                                        <span className="text-[#33C0ED] mr-1">
                                            {formattedValue(data.Hotel_Rating)}
                                        </span>
                                        <span className="mr-1">Rất tốt</span>
                                        <span>(1251 đánh giá)</span>
                                    </div>
                                    <div className="w-fit bg-[#FFE9CF] text-[#DB7600] text-[14px] px-2">
                                        {data.views} người đã quan tâm
                                    </div>
                                </div>

                                <div className="h-[15%] flex items-center justify-end">
                                    <button
                                        onClick={() => goDetail(data.Hotel_id)}
                                        className="w-[120px] h-full items-center font-[600] bg-[#FF3366] text-[#fff] rounded-[8px] text-[16px]">
                                        Xem phòng
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
}

export default Favorite