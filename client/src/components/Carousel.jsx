import React, { useCallback, useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";


function Carousel() {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    

    const goLink = useCallback(() => {
        window.open("https://mytour.vn/uu-dai/top-khach-san-gia-tot-gan-bien?utm_source=web&utm_medium=homepage&utm_campaign=deal_bien_2023");
      });

    useEffect(() => {
        ShowImages();
    }, []);

    function ShowImages() {
        const fetchImages = async () => {
            try {
                const response = await axios.post('http://localhost:8081/showanhnen');
                const imageData = response.data;
                setImages(imageData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchImages();
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };
    return (
        <div className="w-[1188px] relative m-auto top-[530px]">
        <Slider {...settings}>
          {images.length > 0 ? (
            images.map((image, i) => (
              <div key={i}>
                <img alt="" className="slick-item-img" src={`../assets/${image.Images_url}`} onClick={goLink}/>
              </div>
            ))
          ) : (
            <p>No images found.</p>
          )}
        </Slider>
      </div>
    )
}
export default Carousel