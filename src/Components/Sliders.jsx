import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation, Autoplay,Pagination } from 'swiper/modules';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const Sliders = () => {
    const axiosPublic = useAxiosPublic()
    const { data: slides } = useQuery({
        queryKey: ['slides'],
        queryFn: async () => {
            const res = await axiosPublic.get('https://medicing-selling-server-side.vercel.app/addvertise/success')
            return res.data
        }
    })

    return (
        <div className='w-full'>
            <Swiper 
            navigation={true} modules={[Navigation,Autoplay,Pagination]}
                speed={5000}
                loop={Infinity}
                autoplay={{
                    delay: 10,
                    pauseOnMouseEnter:true
                    



                }}
               
                className=" w-full ">
                {
                    slides?.map(slide => <SwiperSlide key={slide._id}><img src={slide?.image} className='w-full' alt="" /></SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Sliders;