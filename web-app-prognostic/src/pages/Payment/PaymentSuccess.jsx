import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-prog-blue mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-6.219-8.564"
                    />
                </svg>
                <h1 className="text-2xl font-bold text-prog-blue-600 mb-4">
                    Payment Successful!
                </h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your payment! Your account has been created successfully. 
                    Please login to access your account and start your journey with us.
                </p>
                <button
                    className="bg-prog-blue text-white py-2 px-4 rounded-md hover:bg-prog-blue-600 transition"
                    onClick={handleNavigate}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
