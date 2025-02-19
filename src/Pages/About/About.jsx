import React from 'react';
import about from '../../assets/about.avif'

const About = () => {
    const ourStoryData = [
        {
            title: "The Problem We Noticed",
            description:
                "Finding authentic medicines was difficult. People struggled with price comparisons & availability.",
            icon: "❌",
        },
        {
            title: "The Idea Behind HealthRex Store",
            description:
                "We created a digital pharmacy that delivers certified medicines with expert healthcare guidance.",
            icon: "💡",
        },
        {
            title: "Building a Trusted Healthcare Platform",
            description:
                "100% Genuine Medicines, Fast Delivery, and Secure Transactions make us unique.",
            icon: "🛡️",
        },
        {
            title: "Our Journey So Far",
            description:
                "Orders Delivered: 10,000+ | Healthcare Experts: 50+ | Serving 100+ Cities.",
            icon: "🚀",
        },
        {
            title: "Our Future Vision",
            description:
                "We aim to expand services, introduce AI-powered consultations, and offer subscription-based medicine refills.",
            icon: "🌍",
        },
    ];
    return (
        <div className=''>
            <div className='flex items-center mt-24 w-full m-4'>
                <div className='m-4 rounded-xl mx-auto flex-1'>
                    <img src={about} alt="" className='rounded-xl' />
                </div>
                <div className='m-5 flex-1'>
                    < h1 className='text-3xl font-bold '>Our Story – How We Started</h1>
                    <p>At HealthRex Store, we believe that access to quality healthcare should be simple, affordable, and hassle-free. Our journey began with a simple yet powerful vision: to bridge the gap between people and essential medicines by bringing authentic pharmaceutical products right to their doorstep.

                        The idea for HealthRex Store was born when we noticed a common struggle—many people face difficulties finding trusted medicines, comparing prices, and ensuring quality. Whether it’s elderly patients needing regular prescriptions or busy individuals seeking quick healthcare solutions, the traditional way of buying medicines often felt inconvenient and time-consuming.

                        Determined to make healthcare more accessible, we assembled a team of pharmacy experts, tech professionals, and customer service specialists to create a platform that offers certified medicines, fast delivery, and expert healthcare guidance—all in one place.

                       </p>
                </div>
            </div>

            <div className="py-10 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-5 gap-6 px-5 mx-auto">
                {ourStoryData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-base-100 p-6 rounded-2xl border  shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2"
                    >
                        <div className="text-4xl mb-4 text-blue-500 text-center">{item.icon}</div>
                        <h3 className="text-xl font-bold ">
                            {item.title}
                        </h3>
                        <p className="">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;