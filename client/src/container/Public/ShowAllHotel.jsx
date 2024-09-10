import React, { useState, useEffect, useCallback } from 'react'
import Header from './Header'
import '../../index.css'
import ShowImageHotel from './ShowImageHotel'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faUmbrellaBeach,
    faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import CountReviews from './CountReviews'


const Tag = ({ text, bgColor }) => {
    return (
        <span className={`text-[#fff] text-[12px] w-fit py-1 px-3 font-[600] bg-[${bgColor}] rounded-md mr-1`}>
            {text}
        </span>
    )
}

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

const Umbrella1 = ({ classIcon }) => {
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

const RatingStars = ({ numStars }) => {
    const stars = [];

    const iconSize = {
        width: "14px",
        height: "14px",
        color: "#FFBC39",
        marginRight: "4px"
    };

    for (let i = 0; i < numStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} style={iconSize} />);
    }

    return <div className="rate5">{stars}</div>;
};


const SearchHotel = () => {
    const [selectedSpanId, setSelectedSpanId] = useState('span1');

    const handleClick = (spanId) => {
        setSelectedSpanId(spanId);
    };

    // // render all hotels
    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        axios
            .post('http://localhost:8081/searchHotel', {
                numRoom: localStorage.getItem('numRoomSearch'),
                numPeople: localStorage.getItem('numPeopleSearch'),
                input: localStorage.getItem('inputSearch')
            })
            .then(res => {
                setHotels(res.data);
                setAmount(res.data.length);
            })
            .catch(err => console.log(err));
    }, []);

    // render amount of hotels
    const [amount, setAmount] = useState(0);


    // Use toFixed() to ensure a specific number of decimal places
    const formattedValue = (num) => {
        return num.toFixed(1);
    }

    const [selectedCheckboxRank, setSelectedCheckboxRank] = useState(null);

    const handleCheckboxChangeRank = (index) => {
        setSelectedCheckboxRank(index);
    };

    const renderCheckboxesRank = () => {
        const checkboxes = [1, 2, 3, 4, 5]; // Number of checkboxes
        const iconSize = {
            width: "18px",
            height: "18px",
            color: "#FFBC39",
            marginRight: "4px"
        };

        return checkboxes.map((_, index) => (

            <label className='container-rankHotel' key={index}>
                {[...Array(index + 1)].map((_, starIndex) => (

                    <FontAwesomeIcon key={starIndex} icon={faStar} style={iconSize} />
                ))}
                <input
                    type='checkbox'
                    checked={selectedCheckboxRank === index}
                    onChange={() => handleCheckboxChangeRank(index)}
                />
                <span className='checkmark'></span>
            </label>
        ));
    };


    const RateCheckbox = ({ label, isChecked, onChange }) => {
        return (
            <label className='container-rankHotel'>
                {label}
                <input type='checkbox' checked={isChecked} onChange={onChange}></input>
                <span className='checkmark'></span>
            </label>
        );
    };


    const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(null);

    const handleCheckboxChange = (index) => {
        setSelectedCheckboxIndex(index);
    };


    const rateCheckboxes = [
        { label: 'Xuất sắc (4.0+)', isChecked: selectedCheckboxIndex === 0 },
        { label: 'Tuyệt vời (3.0+)', isChecked: selectedCheckboxIndex === 1 },
        { label: 'Tốt (2.0+)', isChecked: selectedCheckboxIndex === 2 },
    ];

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

    const handleSubmitFilter = () => {
        // localStorage.setItem('Category_id', selectedCheckboxRank + 1);
        // localStorage.setItem('Rating', selectedCheckboxIndex + 1);

        if (selectedCheckboxRank == null && selectedCheckboxIndex == null) {
            axios
                .get('http://localhost:8081/getAllHotels', {
                })
                .then(res => {
                    setHotels(res.data);
                    setAmount(res.data.length);
                })
                .catch(err => console.log(err));
        }
        else {
            let query = "";
            if (selectedCheckboxRank != null && selectedCheckboxIndex == null) {
                query = `where h.Category_id = ${selectedCheckboxRank + 1} and h.status = 1`;
            }
            else if (selectedCheckboxRank == null && selectedCheckboxIndex != null) {
                if (selectedCheckboxIndex == 0) {
                    query = `where h.Hotel_Rating >= 4 and h.status = 1`
                }
                else if (selectedCheckboxIndex == 1) {
                    query = `where h.Hotel_Rating >= 3 and h.status = 1`
                }
                else if (selectedCheckboxIndex == 2) {
                    query = `where h.Hotel_Rating >= 2 and h.status = 1`
                }
            }
            else {
                if (selectedCheckboxIndex == 0) {
                    query = `where h.Category_id = ${selectedCheckboxRank + 1} and h.Hotel_Rating >= 4 and h.status = 1`
                }
                else if (selectedCheckboxIndex == 1) {
                    query = `where h.Category_id = ${selectedCheckboxRank + 1} and h.Hotel_Rating >= 3 and h.status = 1`
                }
                else if (selectedCheckboxIndex == 2) {
                    query = `where h.Category_id = ${selectedCheckboxRank + 1} and h.Hotel_Rating >= 2 and h.status = 1`
                }
            }


            axios
                .post('http://localhost:8081/filterHotel', {
                    conditions: query
                })
                .then(res => {
                    if (res.data.length === 0 || !res.data) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Không tìm thấy khách sạn nào !',
                        });
                        handleCancelFilter();
                        getAllHotel();
                    } else {
                        setHotels(res.data);
                        setAmount(res.data.length);
                    }
                })
                .catch(err => console.log(err));
        }
    }

    const handleCancelFilter = () => {
        setSelectedCheckboxRank(null);
        setSelectedCheckboxIndex(null);
        localStorage.setItem('Category_id', "");
        localStorage.setItem('Rating', "");
    }

    const sortCateDESC = () => {
        axios
            .post('http://localhost:8081/sortHotelCateDESC', {

            })
            .then(res => {
                setHotels(res.data);
                setAmount(res.data.length);
            })
            .catch(err => console.log(err));
    }

    const sortRatingDESC = () => {
        axios
            .post('http://localhost:8081/sortHotelRatingDESC', {

            })
            .then(res => {
                setHotels(res.data);
                setAmount(res.data.length);
            })
            .catch(err => console.log(err));
    }

    const getAllHotel = () => {
        axios.get(`http://localhost:8081/getAllHotels`,)
            .then(res => {
                setHotels(res.data);
                setAmount(res.data.length);
            })
            .catch(err => console.log(err));
    }


    return (
        <div className='font-app search-room'>
            <Header />
            <div className='m-auto max-w-[1188px]'>
                <div className='h-[1000px] mt-[160px]'>
                    <div className='text-[20px] font-bold'>Tìm thấy {amount} khách sạn</div>
                    <div className='grid grid-cols-8 gap-6 mt-4'>
                        <div className='shadow1 col-span-2 bg-white rounded-[10px] px-4'>
                            <div className='relative h-[60px] border-b-[1px] border-[#EDF2F7]'>
                                <span className='absolute top-[50%] translate-y-[-50%] text-[16px] font-bold'>Bộ lọc</span>
                                <span onClick={handleCancelFilter} className='absolute top-[50%] translate-y-[-50%] right-0 text-[16px] text-[#00B6F3] cursor-pointer'>Xóa tất cả lọc</span>
                            </div>

                            {renderCheckboxesRank()}

                            <div className='py-5 border-b-[1px] border-[#EDF2F7]'>
                                <h1 className='text-[16px] font-bold mb-3'>Người dùng đánh giá</h1>
                                <div>
                                    {rateCheckboxes.map((checkbox, index) => (
                                        <RateCheckbox
                                            key={index}
                                            label={checkbox.label}
                                            isChecked={checkbox.isChecked}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    ))}

                                </div>
                            </div>
                            <button
                                onClick={handleSubmitFilter}
                                className="w-full h-[50px] mt-3 items-center font-[600] bg-[#FF3366] text-[#fff] rounded-[8px] text-[16px]">
                                Lọc tìm kiếm
                            </button>


                        </div>


                        <div className='col-span-6  rounded-[10px]'>
                            <div className='shadow1 box-filter flex flex-row py-2 px-4 rounded-[10px] bg-white gap-2'>
                                <div>Sắp xếp:</div>
                                <div className={`font-bold ${selectedSpanId === 'span1' ? 'bg-[#FF3366] text-white' : 'bg-white text-black'
                                    }`}
                                    onClick={() => { handleClick('span1'); getAllHotel(); }}>Xem tất cả</div>
                                <div className={`font-bold ${selectedSpanId === 'span5' ? 'bg-[#FF3366] text-white' : 'bg-white text-black'
                                    }`}
                                    onClick={() => { handleClick('span5'); sortCateDESC(); }}>Xếp hạng sao</div>
                                <div className={`font-bold ${selectedSpanId === 'span6' ? 'bg-[#FF3366] text-white' : 'bg-white text-black'
                                    }`}
                                    onClick={() => { handleClick('span6'); sortRatingDESC(); }}>Đánh giá cao nhất</div>
                            </div>



                            {hotels.map((data, index) => (
                                <div className='shadow2 text-[17px] grid grid-cols-8 bg-white mt-8 rounded-[10px] h-[220px] p-[16px] gap-4' key={index}>
                                    <div className='col-span-3 overflow-auto'>
                                        <ShowImageHotel id={data.Hotel_id} />
                                    </div>

                                    <div className='col-span-5 relative'>
                                        <div>
                                            <Tag text={"Sát biển"} bgColor={"#FFBC39"} />
                                            <Tag text={"Miễn phí phụ thu trẻ em"} bgColor={"#8547EC"} />
                                        </div>

                                        <div className='font-bold text-[24px] leading-10'>
                                            {data.Hotel_Name}
                                        </div>

                                        <div className=''>
                                            <RatingStars numStars={data.Category_id} />
                                        </div>

                                        <div className='flex leading-10 gap-1'>
                                            <Umbrella1 classIcon={faUmbrellaBeach} />
                                            <span className='text-[#33C0ED]'>{formattedValue(data.Hotel_Rating)}</span>
                                            <span>{CheckRating(data.Hotel_Rating)}</span>
                                            <CountReviews id={data.Hotel_id} />
                                        </div>

                                        <div>
                                            <Location classIcon={faLocationDot} />
                                            <span>{data.Hotel_Location}</span>
                                        </div>

                                        <button
                                            onClick={() => goDetail(data.Hotel_id)}
                                            className="absolute right-0 bottom-0 w-[130px] h-[40px] items-center font-[600] bg-[#FF3366] text-[#fff] rounded-[8px] text-[16px]">
                                            Xem chi tiết
                                        </button>


                                    </div>
                                </div>
                            ))}


                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchHotel