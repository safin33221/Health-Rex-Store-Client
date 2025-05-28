import React from "react";
import { ShieldCheck, HeartHandshake, Globe, Star, Users } from "lucide-react";

const missionData = [
    {
        title: "Customer First Approach",
        description:
            "We prioritize customer health by offering genuine medicines and expert healthcare advice.",
        icon: <HeartHandshake size={28} />,
        borderColor: "border-blue-500",
    },
    {
        title: "100% Authentic Products",
        description:
            "Our platform guarantees only certified and FDA-approved medicines.",
        icon: <ShieldCheck size={28} />,
        borderColor: "border-green-500",
    },
    {
        title: "Global Healthcare Standards",
        description:
            "We ensure international-quality healthcare solutions for all users.",
        icon: <Globe size={28} />,
        borderColor: "border-indigo-500",
    },
    {
        title: "Trusted by 1000+ Users",
        description:
            "With thousands of satisfied customers, we continue to grow and innovate.",
        icon: <Users size={28} />,
        borderColor: "border-yellow-500",
    },
    {
        title: "4.9/5 Star Reviews",
        description:
            "Our customers love us! We maintain top ratings through quality service.",
        icon: <Star size={28} />,
        borderColor: "border-pink-500",
    },
];

const OurMission = () => {
    return (
        <div className="bg-base-100 py-12">
            <div className="w-11/12 mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Our Mission & Trust Factor
                    </h1>
                    <p className="mt-4 text-lg md:text-xl">
                        At HealthRex Store, our mission is to make quality healthcare
                        accessible to everyone while ensuring trust and reliability.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {missionData.map((item, index) => (
                        <div
                            key={index}
                            className={`rounded-xl border-l-4 ${item.borderColor} bg-white shadow-sm p-4 transition hover:shadow-md`}
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-2xl mt-1">{item.icon}</span>
                                <div>
                                    <h3 className="text-md md:text-lg font-bold mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurMission;
