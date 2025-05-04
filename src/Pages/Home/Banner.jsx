import React from 'react';
import Lottie from "lottie-react";
import bannerAnimation from '../../assets/animation/Animation - 1746265150979.json'
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className=' m-auto mt-10 md:mt-20'>

            <div className='w-11/12 m-auto md:flex  h-full'>
                <div className='md:w-1/2 w-full my-10 space-y-4 h-full: '>
                    <h1 className='text-xl md:text-4xl font-semibold'><span className='text-[#  ] font-extrabold bold text-4xl md:text-5xl'>Fast, Reliable & Affordable</span>
                        <br />
                        Medicines Delivered to Your Doorstep</h1>
                    <p className='text-sm md:text-xl'>
                        Shop from a wide range of genuine healthcare products with confidence. From everyday essentials to prescription drugs, HealthRex Store brings pharmacy convenience to your fingertips—anytime, anywhere.
                    </p>
                  <Link to={`/shop`}>
                  <button  className='py-4     px-12   bg-[#2E8B57] text-white '>
                        🛒 Shop Now
                    </button>
                  </Link>
                </div>
                <div className=' w-8/12 mx-auto md:w-1/2'>
                    <Lottie animationData={bannerAnimation}
                        loop={true}
                        className="md:w-9/12 mx-auto"
                    ></Lottie>
                </div>
            </div>

        </div>
    );
};

export default Banner;