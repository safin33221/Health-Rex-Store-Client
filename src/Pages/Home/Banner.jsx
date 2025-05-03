import React from 'react';

const Banner = () => {
    return (
        <div className='h-[300px]'>

            <div className='w-11/12 m-auto'>
                <div className='md:w-1/2 w-full my-10 space-y-4 '>
                    <h1 className='text-2xl md:text-4xl font-semibold'><span className='text-[#2E8B57] font-bold text-2xl md:text-5xl'>Fast, Reliable & Affordable</span>
                        <br />
                        Medicines Delivered to Your Doorstep</h1>
                    <p className='text-sm md:text-xl'>
                        Shop from a wide range of genuine healthcare products with confidence. From everyday essentials to prescription drugs, HealthRex Store brings pharmacy convenience to your fingertips—anytime, anywhere.
                    </p>
                    <button className='btn btn-lg'>
                        🛒 Shop Now
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Banner;