import React, { useState } from "react";

const OTPInput = ({ length = 6, onChange }) => {
    const [otp, setOtp] = useState(Array(length).fill(""));

    const handleChange = (e, index) => {
        const { value } = e.target;
        
        // Handle pasting
        if (e.nativeEvent.inputType === "insertFromPaste") {
            const pastedData = e.clipboardData?.getData("text") || value;
            const pastedDataArray = pastedData.slice(0, length).split("");
            
            if (pastedDataArray.every(char => /^\d$/.test(char))) {
                const newOtp = Array(length).fill("");
                pastedDataArray.forEach((digit, idx) => {
                    if (idx < length) {
                        newOtp[idx] = digit;
                    }
                });
                setOtp(newOtp);
                onChange(newOtp.join(""));
                
                // Focus the last filled input or the next empty one
                const focusIndex = Math.min(length - 1, pastedDataArray.length);
                document.getElementById(`otp-input-${focusIndex}`).focus();
                return;
            }
        }

        // Regular single digit input handling
        if (!/^\d$/.test(value) && value !== "") return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        onChange(newOtp.join(""));

        if (value && index < length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handlePaste = (e, index) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text");
        const pastedDataArray = pastedData.slice(0, length).split("");
        
        if (pastedDataArray.every(char => /^\d$/.test(char))) {
            const newOtp = Array(length).fill("");
            pastedDataArray.forEach((digit, idx) => {
                if (idx < length) {
                    newOtp[idx] = digit;
                }
            });
            setOtp(newOtp);
            onChange(newOtp.join(""));
            
            const focusIndex = Math.min(length - 1, pastedDataArray.length);
            document.getElementById(`otp-input-${focusIndex}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "") {
            if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
        }
    };

    return (
        <div className="flex space-x-2">
            {Array(length)
                .fill("")
                .map((_, index) => (
                    <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength="1"
                        value={otp[index]}
                        onChange={(e) => handleChange(e, index)}
                        onPaste={(e) => handlePaste(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-16 text-2xl text-center font-bold bg-[#F0F4F8] rounded-md focus:outline-none focus:border-prog-blue focus:ring-0 bg-white"
                    />
                ))}
        </div>
    );
};

export default OTPInput;
