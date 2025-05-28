import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Fqa = () => {
    const axiosPublic = useAxiosPublic();
    const [activeIndex, setActiveIndex] = useState(null);

    const { data: faqs = [], isPending } = useQuery({
        queryKey: ['fqa'],
        queryFn: async () => {
            const res = await axiosPublic.get('fqa');
            return res.data.slice(0, 5);
        }
    });

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (isPending) return null;

    return (
        <div className="w-11/12 mx-auto my-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left Column: FAQ */}
            <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center md:text-left">
                    🤔 Frequently Asked Questions
                </h2>

                <div className="space-y-5">
                    {faqs.map((faq, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div
                                key={index}
                                className={`transition-all duration-300 rounded-lg border-2 ${isActive ? "border-blue-500 bg-white shadow-lg" : "border-gray-300 bg-gray-50 hover:border-blue-300"} overflow-hidden`}
                            >
                                <button
                                    className="w-full flex justify-between items-center p-5 text-left text-lg font-semibold text-gray-800 group"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span>{faq.question}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-6 w-6 transform transition-transform duration-300 ${isActive ? "rotate-180 text-blue-500 scale-110" : "text-gray-500 group-hover:text-blue-400"}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.707a1 1 0 011.414 0L10 11.414l3.293-3.707a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <div
                                    className={`transition-all duration-300 ease-in-out px-5 pt-0 pb-5 text-gray-700 ${isActive ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
                                >
                                    {faq.answer}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right Column: Illustration or CTA */}
            <div className="text-center md:text-left">
                <img
                    src="https://cdn.dribbble.com/users/18730/screenshots/14779847/media/859b21f87a56eea5cd283c061a6b27f9.gif"
                    alt="FAQ Illustration"
                    className="w-full max-w-sm mx-auto md:mx-0"
                />
                <h3 className="text-2xl font-bold mt-6">Still have questions?</h3>
                <p className="text-gray-600 mt-2">
                    Our support team is here to help you 24/7. Feel free to reach out anytime.
                </p>
                <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default Fqa;
