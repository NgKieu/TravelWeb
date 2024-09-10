import axios from 'axios'
import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faPencil
} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

const IconUser = ({ classIcon }) => {
    const iconSize = {
        width: "16px",
        height: "16px",
        marginRight: "5px",
    };

    return (
        <span>
            <FontAwesomeIcon icon={classIcon} style={iconSize} />
        </span>
    );
};

const IconDate = ({ classIcon }) => {
    const iconSize = {
        width: "16px",
        height: "16px",
        marginRight: "5px",
    };

    return (
        <span>
            <FontAwesomeIcon icon={classIcon} style={iconSize} />
        </span>
    );
};

const Tag = ({ text, bgColor }) => {
    return (
        <div className={`text-[#fff] text-[14px] w-fit h-full px-3 font-[600] bg-[${bgColor}] rounded-md mr-3`}>
            {text}
        </div>
    )
}

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
    if(rating == 0) return ''
}

const formattedValue = (num) => {
    if(num){
        return num.toFixed(1);
    }
}

const ShowReviews = ({ idHotel }) => {
    const [review, setReview] = useState([])

    axios
        .post('http://localhost:8081/showReviews', {
            idHotel: idHotel,
        })
        .then(res => {
            setReview(res.data)
        })
        .catch(err => console.log(err));

    const Delete = (idReview) => {
        Swal.fire({
            title: 'Bạn có muốn xóa bình luận này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Tôi muốn xóa!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post('http://localhost:8081/deleteReviews', {
                        idReview: idReview,
                    })
                    .then(res => {
                        axios
                        .post('http://localhost:8081/showReviews', {
                            idHotel: idHotel,
                        })
                        .then(res => {
                            setReview(res.data)
                        })
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            }
        })
    }
    return (
        <div className='relative w-[1188px] font-app mx-auto'>
            {
                review.map((data, i) => (
                    <div className='grid grid-cols-4 pt-[50px] border-t-[1px]' key={i}>
                        <div className='col-span-1'>
                            <div className='font-bold leading-8'><IconUser classIcon={faUser} /><span>{data.User_Name}</span> </div>
                            <div className=''><IconDate classIcon={faPencil} /><span>{data.DateCreate}</span> </div>
                        </div>
                        <div className='col-span-3'>
                            <div className='flex items-center font-bold'><Tag text={formattedValue(data.Rating)} bgColor={"#FF3366"} /><span>{CheckRating(data.Rating)}</span></div>
                            <div className='mt-2'>{data.Comment}</div>
                        </div>
                        <div className='col-span-3'></div>
                        {
                            localStorage.getItem('idUser') == data.User_id 
                            ? (<div onClick={() => Delete(data.Review_id)} className='flex justify-end col-span-1 cursor-pointer'>Xóa</div>)
                            : null
                        }
                        
                    </div>
                ))
            }

        </div>
    )
}

export default ShowReviews