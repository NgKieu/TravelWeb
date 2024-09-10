import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';


const IconSearch = ({ classIcon }) => {
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


const SearchRoom = () => {
  const navigate = useNavigate();

  const [selectedSpanId, setSelectedSpanId] = useState('span1');

  const handleClick = (spanId) => {
    setSelectedSpanId(spanId);
  };



  const [showPeopleBox, setShowPeopleBox] = useState(false);
  const [people, setPeople] = useState(1); // Initial number of people
  const [room, setRoom] = useState(1); // Initial number of rooms

  const decreaseCountRoom = () => {
    if (room > 1) {
      setRoom(room - 1);
    }
  };

  const increaseCountRoom = () => {
    setRoom(room + 1);
    setPeople(people + 1);
  };

  const decreaseCountPeople = () => {
    if (people > 1) {
      setPeople(people - 1);
    }
  };

  const increaseCountPeople = () => {
    setPeople(people + 1);
  };

  const handleInputClick = () => {
    setShowPeopleBox(true);


    // Automatically hide the box after 3 seconds
    setTimeout(() => {
      setShowPeopleBox(false);
    }, 5000);
  };

  const handleSearch = () => {
    localStorage.setItem('numRoomSearch', room);
    localStorage.setItem('numPeopleSearch', people);
    localStorage.setItem('inputSearch', document.getElementById('input-Location').value);
    if(document.getElementById('input-Location').value !== ''){
      navigate('/hotel');
    }
  };
  


  return (
    <div className='relative max-w-[1188px] h-[116px] rounded-[8px] top-[184px] mx-auto border-none bg-white'>
      <div className='mx-auto w-full text-center space-x-14 h-[48px] border-b p-[10.5px] cursor-pointer'>
        <span
          className={`text-[18px] font-[600] ${selectedSpanId === 'span1' ? 'text-[#FF3366]' : ''
            }`}
          onClick={() => handleClick('span1')}
        >
          Khách sạn
        </span>
      </div>

      <div className='grid grid-cols-12 h-[68px] items-center'>
        <div className='col-span-6 py-auto px-6 border-r-2'>
          <div className='grid grid-rows-2 '>
            <div className='text-[14px]'>Địa điểm</div>
            <input id='input-Location' className='placeholder-slate-400 focus:outline-none text-[17px] bg-white font-bold' placeholder='Thành phố, khách sạn, điểm đến'></input>
          </div>
        </div>

        <div className='col-span-4 py-auto px-6'>
          <div className='grid grid-rows-2 '>
            <div className='text-[14px]'>Số khách</div>
            <input onClick={handleInputClick} readOnly className='text-[17px] font-[600] outline-none' value={room + " phòng, " + people + " người lớn"}></input>
          </div>
        </div>
        <div className='col-span-2 px-1'>
          <button onClick={handleSearch} id='btn-search-home-page' className='w-full h-[58px] font-[600] bg-[#FF3366] text-[#fff] rounded-[8px] text-[18px] hover:bg-[#c00c39] ease-in-out duration-300 '>
            <IconSearch classIcon={faMagnifyingGlass} />
          </button>
        </div>
      </div>


      {showPeopleBox && (
        <div className='absolute w-[350px] h-[130px] p-1 bg-white grid grid-cols-6 text-[22px] items-center rounded-[10px] px-[20px] left-[593px] top-[125px]'>
          <div className='col-span-3 text-left pl-[6px]'>Số phòng:</div>
          <div className='col-span-1 p-auto flex items-center justify-center align-middle'>
            <button onClick={decreaseCountRoom} className='w-[40px] h-[40px] border-[#FF3366] border-[1px] text-[#FF3366] rounded-[100px] flex items-center justify-center'>
              -
            </button>
          </div>

          <div className='col-span-1 text-center'>{room}</div>
          <div className='col-span-1 p-auto flex items-center justify-center'>
            <button onClick={increaseCountRoom} className='w-[40px] h-[40px] border-[#FF3366] border-[1px] text-[#FF3366] rounded-[100px] flex items-center justify-center'>
              +
            </button>
          </div>

          <div className='col-span-3 text-left pl-[6px]'>Số người:</div>
          <div className='col-span-1 p-auto flex items-center justify-center'>
            <button onClick={decreaseCountPeople} className='w-[40px] h-[40px] border-[#FF3366] border-[1px] text-[#FF3366] rounded-[100px] flex items-center justify-center'>
              -
            </button>
          </div>

          <div className='col-span-1 text-center'>{people}</div>
          <div className='col-span-1 p-auto flex items-center justify-center'>
            <button onClick={increaseCountPeople} className='w-[40px] h-[40px] border-[#FF3366] border-[1px] text-[#FF3366] rounded-[100px] flex items-center justify-center'>
              +
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SearchRoom;