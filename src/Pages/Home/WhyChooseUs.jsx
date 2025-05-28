import React, { useEffect, useState } from "react";

const progressData = [
    { title: "Customer Satisfaction", value: 95, color: "bg-blue-500" },
    { title: "Authenticity Guarantee", value: 100, color: "bg-green-500" },
    { title: "Fast Delivery Service", value: 90, color: "bg-yellow-500" },
    { title: "Affordable Pricing", value: 85, color: "bg-red-500" },
];

const WhyChooseUs = () => {
    const [progress, setProgress] = useState(progressData.map(() => 0));

    useEffect(() => {
        const timeout = setTimeout(() => {
            setProgress(progressData.map((item) => item.value));
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="bg-base-100 py-16">
            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left Side - Text Section */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        Why Choose Us?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 mb-6">
                        We are committed to delivering <strong>quality</strong>, <strong>trust</strong>, and <strong>affordability</strong> to our customers. Here’s what makes us stand out from others in the industry.
                    </p>
                    <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition duration-300">
                        Learn More
                    </button>
                </div>

                {/* Right Side - Progress Bars */}
                <div className="space-y-6">
                    {progressData.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold text-gray-700">{item.title}</span>
                                <span className="text-gray-700">{progress[index]}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className={`${item.color} h-4 rounded-full transition-all duration-2000`}
                                    style={{ width: `${progress[index]}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
