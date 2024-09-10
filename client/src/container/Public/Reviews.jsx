import React, { useState } from 'react';
import '../../index.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";



const Reviews = ({ idHotel }) => {
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();


  const handleStarClick = (selectedStar) => {
    setRating(selectedStar);
  };

  const addReviews = () => {
    if (document.getElementById('cmt').value == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bạn chưa nhập nội dung bình luận!',
      })
    }
    else {
      axios
        .post('http://localhost:8081/insertReviews', {
          idHotel: idHotel,
          idUser: localStorage.getItem('idUser'),
          rating: rating,
          comment: document.getElementById('cmt').value
        })
        .then(res => {
          document.getElementById('cmt').value = "";
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Đã tải lên bình luận',
            showConfirmButton: false,
            timer: 1500,
          })
        })
        .catch(err => console.log(err));
    }

  }

  return (
    <div className='relative w-[1188px] mx-auto border-t-[1px] pt-2 border-[#FF3366]'>
      <span className='text-[18px] mr-3'>Đánh giá: </span>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-[20px] mr-[2px] ${rating >= star ? 'text-[#FF3366]' : ''}`}
          onClick={() => handleStarClick(star)}
        >
          ★
        </span>
      ))}
      <div>
        <div className='text-[18px] mr-3 leading-9'>Viết bình luận: </div>
        <textarea id='cmt' className='w-full h-[150px] shadow2 rounded-[8px] p-2'>
        </textarea>
        <div className='w-full flex justify-end mt-2'>
          <button onClick={() => addReviews()} className="w-[104px] h-[40px] items-center font-[600] bg-[#FF3366] text-[#fff] rounded-[8px] text-[14px]">
            Gửi bình luận
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
