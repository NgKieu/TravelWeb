import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDumbbell,
    faBellConcierge,
    faCartFlatbedSuitcase,
    faWifi,
    faMugHot,
    faUtensils,
    faPersonSwimming
} from "@fortawesome/free-solid-svg-icons";
import '../../src/index.css'

const IconLicense = ({ classIcon }) => {
    const iconSize = {
        width: "48px",
        height: "48px",
        color: "#1FB4FF"
    };

    return (
        <div>
            <FontAwesomeIcon icon={classIcon} style={iconSize} />
        </div>
        
    );
};



const License = () => {
  return (
    <div className='max-w-[1188px] mt-10 h-[280px]'>
        <span className='text-[20px] font-bold'>Tiện nghi khách sạn</span>
        <div className='mt-3 box-license w-full grid grid-cols-7 text-center rounded-[10px] '>
            <div className=' col-span-1  py-12'>
                <div className=''>
                    <IconLicense classIcon={faDumbbell}/>
                    <div className=' '>GYM</div>
                </div>
                
            </div>
            <div className=' col-span-1 h-[198px] py-12'>
                <div className=''>
                    <IconLicense classIcon={faBellConcierge}/>
                    <div className=' '>Lễ tân 24h</div>
                </div>
                
            </div>
            <div className=' col-span-1 h-[198px] py-12'>
                <div className=''>
                    <IconLicense classIcon={faCartFlatbedSuitcase}/>
                    <div className=' '>Giữ hành lý</div>
                </div>
                
            </div>
            <div className=' col-span-1 h-[198px] py-12'>
                <div className=''>
                    <IconLicense classIcon={faWifi}/>
                    <div className=' '>Internet miễn phí</div>
                </div>
                
            </div>
            <div className=' col-span-1 h-[198px] py-12'>
                <div className=''>
                    <IconLicense classIcon={faMugHot}/>
                    <div className=' '>Quán cafe</div>
                </div>
                
            </div>
            <div className=' col-span-1 h-[198px] py-12'>
                <div className=''>
                    <IconLicense classIcon={faUtensils}/>
                    <div className=' '>Dùng bữa trong ngày</div>
                </div>
                
            </div>
            <div className=' col-span-1 h-[198px] py-12'>
                <div className=''>
                    <IconLicense classIcon={faPersonSwimming}/>
                    <div className=' '>Hồ bơi ngoài trời</div>
                </div>
                
            </div>

        </div>
    </div>
  )
}

export default License