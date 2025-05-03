import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation, Autoplay } from 'swiper/modules';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const Sliders = () => {
    const axiosPublic = useAxiosPublic()
    const { data: slides = [] } = useQuery({
        queryKey: ['slides'],
        queryFn: async () => {
            const res = await axiosPublic.get('/addvertise/success')
            return res.data
        }
    })

    return (
        <div className='mx-auto w-11/12'>
            <div className="text-center my-10">
                <h1 className="text-2xl md:text-4xl font-bold ">
                Limited-Time Health Deals – Shop Smart, Stay Healthy!__
                </h1>
                <p className="mt-4 text-lg md:text-xl ">
              Don’t miss out—grab your discounts before they’re gone! Stay fit, save more, and shop with confidence at HealthRex Store.


                </p>

            </div>
            <Swiper
                speed={7000}
                spaceBetween={10}
                loop={Infinity}
                autoplay={{
                    delay: 10,
                    pauseOnMouseEnter: true




                }}
               
                navigation={true}
                modules={[Navigation, Autoplay]}
                style={{ zIndex: '0' }}
                breakpoints={{
                    640: {
                        slidesPerView: 1, // 1 slide on mobile screens
                    },
                    768: {
                        slidesPerView: 2, // 2 slides on tablets
                    },
                    1024: {
                        slidesPerView: 3, // 3 slides on larger screens
                    },
                }}


                className=" w-full h-[200px] md:h-[200px]">
                {
                    slides?.map(slide => <SwiperSlide key={slide._id}>
                        <img src={slide?.image} className=' w-full bg-cover  object-center h-full ' alt="" />
                    </SwiperSlide>)
                }
            </Swiper>
        </div >
    );
};

export default Sliders;