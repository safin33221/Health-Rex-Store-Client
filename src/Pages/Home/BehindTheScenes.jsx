import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Package, Truck, Home } from "lucide-react";

const steps = [
    {
        title: "Browse Our Products",
        description:
            "Explore our wide range of authentic healthcare products available at your fingertips.",
        icon: <ShoppingCart size={40} className="text-blue-500" />,
    },
    {
        title: "Place Your Order",
        description:
            "Choose your items, add them to the cart, and securely place your order with just a few clicks.",
        icon: <Package size={40} className="text-green-500" />,
    },
    {
        title: "Fast Delivery",
        description:
            "We ensure swift and reliable delivery, bringing your healthcare products right to your doorstep.",
        icon: <Truck size={40} className="text-yellow-500" />,
    },
    {
        title: "Enjoy Better Health",
        description:
            "Use your high-quality medicines to improve your health and get back to living life to the fullest.",
        icon: <Home size={40} className="text-red-500" />,
    },
];

const BehindTheScenes = () => {

    return (
        <div className="bg-base-100 py-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold">
                    How We Work: Behind the Scenes
                    </h1>
                    <p className="mt-4 text-lg md:text-xl ">
                    Discover the simple and transparent steps we follow to get you the best healthcare products.
                    </p>

                </div>
                

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                    {steps.map((step, index) => (
                        <div key={index}
                            className={`p-6 max-w-xs bg-base-200 shadow-md rounded-xl transition-all duration-500 cursor-pointer  text-center`}
                          
                        >
                            <div className="mb-4 ">{step.icon}</div>
                            <h4 className="text-lg font-semibold  mb-2">{step.title}</h4>
                            <p className="">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BehindTheScenes;
