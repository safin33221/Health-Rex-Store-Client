import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';



// import required modules
import { EffectCards } from 'swiper/modules';


const Testimonials = () => {
    const axiosPublic = useAxiosPublic()
    const { data: testimonials = [],isPending } = useQuery({
        queryKey: ['Testimonials'],
        queryFn: async () => {
            const res = await axiosPublic.get("/customerTestimonials")
            return res.data
        }
    })
   if(isPending) return
    return (
        <div className='w-11/12 mx-auto pb-10 my-12 '>
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold">
                    What Our Customers Say__
                </h1>
                <p className="mt-4 text-lg md:text-xl ">
                Real Stories from Real People
                </p>
            </div>
            <Swiper className='mySwiper h-52 overflow-hidden z-40'
                spaceBetween={20}

                speed={2500}
                loop={Infinity}



                autoplay={{
                    delay: 0,
                    reverseDirection: true,
                    stopOnLastSlide: true,
                    pauseOnMouseEnter: true,



                }}





                modules={[Autoplay]}
                breakpoints={{
                    640: {
                        slidesPerView: 2, // 1 slide on mobile screens
                    },
                    768: {
                        slidesPerView: 4, // 2 slides on tablets
                    },
                    1024: {
                        slidesPerView: 5, // 3 slides on larger screens
                    },
                }}



            >

                {
                    testimonials.map((review) => (
                        <SwiperSlide>
                            <figure
                                className='relative  cursor-pointer h-full mx-auto  rounded-xl border p-4 bg-base-200  hover:shadow-2xl transition-all duration-300  overflow-hidden '
                            >
                                <div className="flex flex-row items-center gap-2">

                                    <div className="flex flex-col">
                                        <figcaption className="text-sm font-medium ">
                                            {review.name}
                                        </figcaption>
                                        {/* <p className="text-xs font-medium dark:text-white/40">{username}</p> */}
                                    </div>
                                </div>
                                <blockquote className="mt-2 text-sm">{review.testimonial}</blockquote>
                            </figure>
                        </SwiperSlide>

                    ))
                }

            </Swiper>
        </div>
    );
};

export default Testimonials;