import React from "react";
import { ShieldCheck, HeartHandshake, Globe, Star, Users } from "lucide-react";

const missionData = [
    {
        title: "Customer First Approach",
        description:
            "We prioritize customer health by offering genuine medicines and expert healthcare advice.",
        icon: <HeartHandshake size={40} className="text-blue-500" />,
    },
    {
        title: "100% Authentic Products",
        description:
            "Our platform guarantees only certified and FDA-approved medicines.",
        icon: <ShieldCheck size={40} className="text-green-500" />,
    },
    {
        title: "Global Healthcare Standards",
        description:
            "We ensure international-quality healthcare solutions for all users.",
        icon: <Globe size={40} className="text-indigo-500" />,
    },
    {
        title: "Trusted by 1000+ Users",
        description:
            "With thousands of satisfied customers, we continue to grow and innovate.",
        icon: <Users size={40} className="text-yellow-500" />,
    },
    {
        title: "4.9/5 Star Reviews",
        description:
            "Our customers love us! We maintain top ratings through quality service.",
        icon: <Star size={40} className="text-orange-500" />,
    },
];

const OurMission = () => {
    return (
        <div className="bg-base-100 py-12">
            <div className="w-11/12 mx-auto ">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Our Mission & Trust Factor
                    </h1>
                    <p className="mt-4 text-lg md:text-xl ">
                        At HealthRex Store, our mission is to make quality healthcare
                        accessible to everyone while ensuring trust and reliability.
                    </p>

                </div>


                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-6">
                    {missionData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-base-200 backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 text-center"
                        >
                            <div className="flex justify-center mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold  mb-2">
                                {item.title}
                            </h3>
                            <p className="">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurMission;
