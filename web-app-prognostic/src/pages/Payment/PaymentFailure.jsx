import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-red-500 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3m0 4h.01M12 5.05V4m6.364 4.636l-.707-.707M21 12h-1.05M5.636 5.636l.707.707M4 12H2.95M5.636 18.364l-.707-.707M12 19v1.05"
                    />
                </svg>
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Payment Failed
                </h1>
                <p className="text-gray-600 mb-6">
                    Unfortunately, your payment could not be processed. Please try again.
                </p>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                    onClick={() => navigate("/payment-setup")}
                >
                    Go to Payment
                </button>
            </div>
        </div>
    );
};

export default PaymentFailure;
