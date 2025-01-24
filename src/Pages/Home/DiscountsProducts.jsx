import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import moment from 'moment';
import useAuth from '../../Hooks/useAuth';


const DiscountsProducts = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/discount-products')
            return res.data
        }
    })
    const handleAddToCart = data => {
        const cartInfo = {
            medicineId: data._id,
            itemName: data.itemName,
            company: data.company,
            pricePerUnit: data.pricePerUnit,
            discountPercentage: data.discountPercentage,
            time: moment().format('LLL'),
            email: user?.email,
            quantity: 1

        }
        axiosSecure.post('/carts', cartInfo)
            .then(res => {
                if (res.data.insertedId) {

                    toast.success(`${cartInfo.itemName} has been added to your cart.`, {
                        position: "top-right",
                        autoClose: 1000,


                    });
                } else {
                    toast.error(res.data.message, {
                        position: "top-right",
                        autoClose: 1000,


                    });
                }
            })
    }
    return (
        <div>
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Discounted Products__
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-600">
                    Grab these amazing deals on your favorite medicines. Limited time offers!
                </p>
            </div>
            <Swiper
                spaceBetween={20}

                speed={2500}
                loop={Infinity}



                autoplay={{
                    delay: 0,
                    stopOnLastSlide: true,
                    pauseOnMouseEnter: true,



                }}





                modules={[Autoplay]}
                breakpoints={{
                    640: {
                        slidesPerView: 1, // 1 slide on mobile screens
                    },
                    768: {
                        slidesPerView: 2, // 2 slides on tablets
                    },
                    1024: {
                        slidesPerView: 4, // 3 slides on larger screens
                    },
                }}
                className="mySwiper my-10 py-10 "
            >
                {
                    products.map(product => <SwiperSlide key={product._id}>
                        <div className="bg-white h-full shadow-lg rounded-lg overflow-hidden border border-secondary hover:shadow-2xl  transition-all duration-300">
                            <div className="relative">
                                <img src={product.image} alt={product.itemName} className="w-full h-40 object-cover" />
                                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-lg">
                                    {product.discountPercentage}% OFF
                                </span>
                            </div>
                            <div className="p-2 flex gap-5 items-center ">
                                <div>
                                    <h1 className="text-xl font-bold text-gray-800 mb-2">{product.itemName}</h1>
                                    <p className="text-sm text-gray-600 mb-2">
                                        <span className="font-semibold">Mass Unit:</span> {product.massUnit}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-2">
                                        <span className="font-semibold">Price Per Unit:</span> <span className="text-red-500 font-bold">{product.pricePerUnit} tk</span>
                                    </p>

                                </div>

                                <div>
                                    <button onClick={() => handleAddToCart(product)}
                                        className="  bg-primary hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition duration-300">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                    </SwiperSlide>)
                }


            </Swiper>
        </div>
    );
};

export default DiscountsProducts;