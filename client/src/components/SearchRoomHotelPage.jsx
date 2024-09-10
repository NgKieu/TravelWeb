import React, { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faMoon } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"


const IconSearch = ({classIcon}) => {
  const iconSize = {
      width: '20px',
      height: '20px',
  };

  return (
      <span>
          <FontAwesomeIcon icon={classIcon} style={iconSize} />
      </span>
  );
};

const IconMoon = ({classIcon}) => {
  const iconSize = {
      width: '13px',
      height: '13px',
  };

  return (
      <span>
          <FontAwesomeIcon icon={classIcon} style={iconSize} />
      </span>
  );
};

const SearchRoomHotelPage = () => {  
    var arr= window.location.href.split('/');
    var n = arr.length - 1;
    const [detailHotel, setdetailHotel] = useState([])    
    useEffect(() => {
        axios.get(`http://localhost:8081/detailHotel/${arr[n]}`,)
        .then(res => setdetailHotel(res.data))
        .catch(err => console.log(err));
    }, [])

    return (
        <div className='box-search-detail-hotel relative max-w-[1188px] min-h-[116px] rounded-[8px] top-[184px] mx-auto border-none bg-white'>
            {
                detailHotel.map((data, i) => (
                    <div className='grid grid-cols-12 h-[68px] items-center border border-[#CBD5E0] rounded-[8px]' key={i}>
                        <div className='col-span-3 py-auto px-6 border-r-2'>
                            <div className='grid grid-rows-2 '>
                            <div className='text-[14px]'>Địa điểm</div>
                            <input className='placeholder-slate-400 focus:outline-none text-[17px] font-[600] bg-white' value={data.Hotel_Name}></input>
                            </div>
                        </div>
                        <div className='col-span-2 py-auto px-6 border-r-2'>
                            <div className='grid grid-rows-2 '>
                            <div className='text-[14px]'>Ngày đến</div>
                            <div className='text-[17px] font-[600]'>CN, 25 tháng 9</div>
                            </div>
                        </div>
                        <div className='col-span-1 mx-auto'>
                            <span>1</span>
                            <IconMoon classIcon={faMoon}/>
                        </div>
                        <div className='col-span-2 py-auto px-6 border-r-2 border-l-2'>
                            <div className='grid grid-rows-2 '>
                                <div className='text-[14px]'>Ngày về</div>
                                <div className='text-[17px] font-[600]'>T2, 26 tháng 9</div>
                            </div>
                        </div>
                        <div className='col-span-3 py-auto px-6'>
                            <div className='grid grid-rows-2 '>
                            <div className='text-[14px]'>Số phòng, số khách</div>
                            <div className='text-[17px] font-[600]'>1 phòng, 2 người lớn, 0 trẻ em</div>
                            </div>
                        </div>
                        <div className='col-span-1 px-1'>
                            <button className='w-full h-[58px] font-[600] bg-[#FF3366] text-[#fff] rounded-[8px] text-[18px] hover:bg-[#c00c39] ease-in-out duration-300 '>
                            <IconSearch classIcon={faMagnifyingGlass}/>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
        // <div>
        //     {
        //         detailHotel.map((data, i) => (
        //             <div>{data.Hotel_Name}</div>
        //         ))
        //     }
        // </div>
    );
    // return (
    //     <div>
    //       {detailHotel.map((data, i) => (
    //         <div key={i}>
    //           {data.Hotel_Name}
    //         </div>
    //       ))}
    //     </div>
    //   );
}

export default SearchRoomHotelPage