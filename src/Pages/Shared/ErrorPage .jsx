import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <div className="max-w-md p-6 bg-white rounded-2xl shadow-lg">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <h2 className="text-2xl font-semibold mt-4 text-gray-800">
                    Oops! Page Not Found
                </h2>
                <p className="mt-2 text-gray-600">
                    The page you are looking for doesn’t exist or has been moved.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 px-6 py-2 bg-primary text-white text-lg font-medium rounded-lg  hover:shadow-xl transition"
                >
                    Back to Home
                </button>
            </div>
            
        </div>
    );
};

export default ErrorPage;
