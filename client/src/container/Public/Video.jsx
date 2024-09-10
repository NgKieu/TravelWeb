
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constaint";

const Video = () => {

  const navigate = useNavigate();



  // eslint-disable-next-line react-hooks/exhaustive-deps
  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
  });
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:8081/showvideohome")
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  return (
    <div className="relative top-[96px]">
      {videos.length > 0 && (
        <video
          className="w-full h-[460px] object-none absolute"
          autoPlay
          loop
          muted
        >
          <source src={`/assets/${videos[0].Video_clip}`} type="video/mp4" ></source>
        </video>
      )}
      <h1 className="absolute z-20 text-[28px] max-w-[566px] text-[#fff] top-[240px] left-[364px] font-[600] leading-[36px]">
        Nhanh chóng đăng nhập để đặt phòng khách sạn ngay hôm nay
      </h1>
      {
        localStorage.getItem('idUser') != null ? null : (<button onClick={goLogin} className="absolute z-20 top-[328px] left-[364px] w-[198px] h-[44px] items-center font-[600] bg-[#FF3366] text-[#fff] rounded-[8px] text-[18px] hover:bg-[#c00c39] ease-in-out duration-300 ">
          Đăng nhập/Đăng ký
        </button>)
      }

    </div>
  );
};

export default Video;