import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowImageHotel = ({ id }) => {

    const [image, setImage] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/showImageHotels/${id}`)
            .then((res) => {
                setImage(res.data)
            })
            .catch((err) => console.log(err));
    }, [id]);

    // Render the 'image' data in your component's JSX
    return (
        <div>
            {image.map((data, i) => (
                <div key={i}>
                    <div className='mb-1'><img className='rounded-[8px] h-[185px] w-full object-cover' src={`../../assets/${data.Image_URL}`} alt={`Image ${i}`} /></div>
                </div>
            ))}
        </div>
    );
};

export default ShowImageHotel;