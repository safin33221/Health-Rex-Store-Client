import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Slide1 from '../assets/sliders/1.png'
import Slide2 from '../assets/sliders/2.png'
import Slide3 from '../assets/sliders/3.png'
import Slide4 from '../assets/sliders/4.png'
import Slide5 from '../assets/sliders/5.png'
import Slide6 from '../assets/sliders/6.png'
import Slide7 from '../assets/sliders/7.png'
import Slide8 from '../assets/sliders/8.png'
import Slide9 from '../assets/sliders/9.png'



// import required modules
import { Navigation } from 'swiper/modules';

const Sliders = () => {
    return (
        <div className=''>
            <Swiper navigation={true} modules={[Navigation]} className="  ">
                <SwiperSlide><img src={Slide1} alt="" /></SwiperSlide>
                <SwiperSlide><img src={Slide2} alt="" /></SwiperSlide>
                <SwiperSlide><img src={Slide3} alt="" /></SwiperSlide>
                <SwiperSlide><img src={Slide4} alt="" /></SwiperSlide>
                <SwiperSlide><img src={Slide5} alt="" /></SwiperSlide>
                <SwiperSlide><img src={Slide6} alt="" /></SwiperSlide>
                <SwiperSlide><img src={Slide7} alt="" /></SwiperSlide>
                <SwiperSlide><img src={Slide8} alt="" /></SwiperSlide>
                <SwiperSlide><img src={Slide9} alt="" /></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Sliders;