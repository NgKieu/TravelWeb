import React from 'react'
import Header from './Header'
import Video from './Video'
import Carousel from '../../components/Carousel'
import SearchRoom from './SearchRoom'
import HotelNoSale from './HotelNoSale'
import BannerAd from '../../components/BannerAd'
import '../../index.css'
import Footer from './Footer'



const Home = () => {
    return (
        <div className='font-app m-auto w-full'>
            <Header/>
            <Video/>
            <SearchRoom/>
            <Carousel/>
            {/* <BannerAd/> */}
            <HotelNoSale/>
            <Footer/>
            
        </div>
    )
}

export default Home
