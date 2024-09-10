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
import CountReviews from "./CountReviews";

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

const HotelNoSale = () => {
  const [hotel, setHotel] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:8081/get8Hotels/")
      .then((res) => setHotel(res.data))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
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

  // Use toFixed() to ensure a specific number of decimal places
  const formattedValue = (num) => {
    return num.toFixed(1);
  }

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


  useEffect(() => {
    // Fetch user's favorite hotels from the server
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
  }, []);


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

  const goSearchHotel = useCallback(() => {
    // Sau dat if isLoggedIn
    localStorage.setItem('inputSearch', "");
    localStorage.setItem('numPeopleSearch', 0);
    localStorage.setItem('numRoomSearch', 0);
    navigate('/hotel');
  });





  return (
    <div className="relative w-full bg-[#EDF6F9] top-[620px] py-[44px]">
      <div className="m-auto h-full max-w-[1188px]">
        <div className="leading-9 mb-8">
          <p className="text-[26px] font-[600]">
            Khách sạn giá sốc chỉ có trên Mytour
          </p>
          <p>
            Tiết kiệm chi phí với các khách sạn hợp tác chiến lược cùng Mytour,
            cam kết giá tốt nhất và chất lượng dịch vụ tốt nhất dành cho bạn.
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
                    <span className="mr-1">{CheckRating(data.Hotel_Rating)}</span>
                    <CountReviews id={data.Hotel_id}/>
                  </div>
                  <div className="w-fit bg-[#FFE9CF] text-[#DB7600] text-[14px] px-2 rounded-[4px]">
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


        <div className="w-full h-[79px] flex align-middle justify-center">
          <button
            onClick={() => goSearchHotel()}
            className="my-auto w-[142px] h-[40px] items-center font-[600] border-solid border border-[#FF3366] rounded-[8px] text-[#FF3366] text-[14px]">
            Xem tất cả
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelNoSale;
