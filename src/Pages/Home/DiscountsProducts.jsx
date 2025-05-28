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
import { FaCartArrowDown } from 'react-icons/fa';


const DiscountsProducts = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { data: products = [], isPending } = useQuery({
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
    if (isPending) return
    return (
        <div className=' px-6 md:px-12 mx-auto m-5'>
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold">
                    Discounted Products__
                </h1>
                <p className="mt-4 text-lg md:text-xl ">
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
                style={{ zIndex: '0' }}
                modules={[Autoplay]}
                breakpoints={{
                    640: {
                        slidesPerView: 2, // 1 slide on mobile screens
                    },
                    768: {
                        slidesPerView: 3, // 2 slides on tablets
                    },
                    1024: {
                        slidesPerView: 5, // 3 slides on larger screens
                    },
                }}
                className="mySwiper my-10 py-10 h-full "
            >
                {
                    products.map(product => <SwiperSlide key={product._id}>
                        <div className="h-full group relative overflow-hidden border border-gray-200 bg-white/70 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300">
                            {/* Product Image */}
                            <div className="relative w-full h-44 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.itemName}
                                    className="w-full h-full bg-cover object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <span className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-400 text-white text-xs px-2 py-1 rounded-full shadow-sm font-semibold">
                                    {product.discountPercentage}% OFF
                                </span>
                            </div>

                            {/* Product Content */}
                            <div className="p-4 flex flex-col justify-between h-[calc(100%-11rem)]">
                                <div>
                                    <h2 className="text-lg font-extrabold text-gray-800 mb-1">{product.itemName}</h2>
                                    <p className="text-xs text-gray-600 mb-1">
                                        <span className="font-semibold text-gray-700">Mass Unit:</span> {product.massUnit}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-semibold text-gray-700">Price:</span>{' '}
                                        <span className="text-red-600 font-bold">{product.pricePerUnit} ৳</span>
                                    </p>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="flex items-center gap-2 text-sm px-4 py-2 bg-green-700 hover:bg-green-700 text-white font-semibold  transition duration-300 shadow-sm"
                                    >
                                        <FaCartArrowDown className="text-base" />
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