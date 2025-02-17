import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Fqa = () => {
    const axiosPublic = useAxiosPublic()
    const [activeIndex, setActiveIndex] = useState(null);
    const { data: faqs = [], isPending } = useQuery({
        queryKey: ['fqa'],
        queryFn: async () => {
            const res = await axiosPublic.get('fqa')
            return res.data.slice(0,5)
        }
    })
    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    if(isPending) return
    return (
        <div className="max-w-4xl mx-auto my-8 p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-lg shadow-sm"
                    >
                        <button
                            className="w-full flex justify-between items-center p-4 text-left text-gray-800 font-semibold hover:bg-gray-100 focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span>{faq.question}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 transform ${activeIndex === index ? "rotate-180" : ""
                                    } transition-transform`}
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
                        {activeIndex === index && (
                            <div className="p-4 text-gray-600 bg-gray-50">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Fqa;
