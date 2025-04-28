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
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { data: products = [],isPending } = useQuery({
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
    if(isPending) return
    return (
        <div className='px-12 mx-auto'>
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
                style={{zIndex:'0'}}




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
                        <div className=" h-full shadow-lg rounded-lg overflow-hidden border  hover:shadow-2xl  transition-all duration-300">
                            <div className="relative">
                                <img src={product.image} alt={product.itemName} className="w-full h-40 object-cover bg-contain" />
                                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-lg">
                                    {product.discountPercentage}% OFF
                                </span>
                            </div>
                            <div className="p-2 flex gap-2 justify-between items-center ">
                                <div>
                                    <h1 className="text-xl font-bold mb-2">{product.itemName}</h1>
                                    <p className="text-sm  mb-2">
                                        <span className="font-semibold">Mass Unit:</span> {product.massUnit}
                                    </p>
                                    <p className="text-sm  mb-2">
                                        <span className="font-semibold">Price Per Unit:</span> <span className="text-red-500 font-bold">{product.pricePerUnit} tk</span>
                                    </p>

                                </div>

                                <div>
                                    <button onClick={() => handleAddToCart(product)}
                                        className="btn text-sm font-semibold transition duration-300 border-2">
                                        <FaCartArrowDown/>
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