import React,{ useState } from 'react'
import bannerImg from "../assets/homepage.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRectangleXmark
} from "@fortawesome/free-solid-svg-icons";

const XMark = ({ classIcon }) => {
    const iconSize = {
        width: "22px",
        height: "22px",
        cursor: "pointer",
    };

    return (
        <FontAwesomeIcon icon={classIcon} style={iconSize} />
    );
};


const onClickXMark = () => {
    var banners = document.getElementsByClassName("banner");
    if (banners.length > 0) {
      banners[0].style.display = 'none';
    }
  };


const BannerAd = () => {
  return (
    <div className='banner relative block top-[530px] z-49 m-auto max-w-[1188px] h-[100px] bg-slate-400 mb-10'>
      <img className='object-cover w-full h-full' src={bannerImg} alt='Banner' />
      <div className='absolute top-0 right-0' onClick={onClickXMark}>
        <XMark classIcon={faRectangleXmark} />
      </div>
    </div>
  )
}

export default BannerAd