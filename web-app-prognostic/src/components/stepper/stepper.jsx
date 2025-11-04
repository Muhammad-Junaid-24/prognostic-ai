import React from "react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="bg-[#F8F8F8] w-full mx-auto py-4 flex justify-between items-center">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`relative w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
              currentStep > index
                ? "bg-[#252525] border-[#252525]"
                : currentStep === index
                ? "bg-[#252525] border-[#252525]"
                : "bg-[#2525254D] border-[#252525]"
            } border-2`}
          >
            {/* Tick for current active and completed steps */}
            {currentStep > index ? (
              <span className="text-white font-bold text-lg">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>

          {/* Step Label */}
          <div className="ml-4 text-sm font-medium">{step}</div>

          {/* Dashed Connector */}
          {index < steps.length - 1 && (
            <div className="mx-2">
              <div
                className="w-[2rem] h-[5px] border-t-[5px] border-dashed"
                style={{
                  borderTopColor: "#A9A9A9",
                }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
