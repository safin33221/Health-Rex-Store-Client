import React, { useEffect, useState } from "react";

const progressData = [
    { title: "Customer Satisfaction", value: 95, color: "bg-blue-500" },
    { title: "Authenticity Guarantee", value: 100, color: "bg-green-500" },
    { title: "Fast Delivery Service", value: 90, color: "bg-yellow-500" },
    { title: "Affordable Pricing", value: 85, color: "bg-red-500" },
];

const WhyChooseUs = () => {
    const [progress, setProgress] = useState(
        progressData.map(() => 0) 
    );

    useEffect(() => {
        
        setTimeout(() => {
            setProgress(progressData.map((item) => item.value));
        }, 2000);
    }, []);

    return (
        <div className="bg-bsae-100 py-12">
            <div className="w-11/12 mx-auto ">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold">
                    Why Choose Us?
                    </h1>
                    <p className="mt-4 text-lg md:text-xl ">
                    We are committed to delivering <strong>quality, trust, and affordability</strong> to our customers. Here’s what makes us stand out:
                    </p>

                </div>
                
                <div className="space-y-6">
                    {progressData.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-between mb-2">
                                <span className=" font-semibold">{item.title}</span>
                                <span className="text-gray-700">{progress[index]}%</span>
                            </div>
                            <div className="w-full bg-gray-300 rounded-full h-4">
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
