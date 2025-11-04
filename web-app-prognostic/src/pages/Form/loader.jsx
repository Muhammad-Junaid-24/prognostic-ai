import React, { useEffect, useState } from "react";
import { quantum, grid, helix } from "ldrs";
import Logo from "assets/newIcons/brandingDark.png";

quantum.register();
grid.register();
helix.register();

const ModalWithLoader = ({ isOpen, onClose }) => {
  const [loaderStep, setLoaderStep] = useState(0);
  const [messageStep, setMessageStep] = useState(0);

  const messages = [
    "Fetching data using AI",
    "Scraping data for you",
    "Just a moment",
    "Almost there",
  ];

  useEffect(() => {
    let loaderInterval, messageInterval;

    if (isOpen) {
      loaderInterval = setInterval(() => {
        setLoaderStep((prevStep) => (prevStep + 1) % 3);
      }, 15000);

      messageInterval = setInterval(() => {
        setMessageStep((prevStep) => (prevStep + 1) % messages.length);
      }, 15000); 
    }

    return () => {
      clearInterval(loaderInterval);
      clearInterval(messageInterval);
    };
  }, [isOpen]);

  const LoaderComponent = () => {
    switch (loaderStep) {
      case 0:
        return <l-quantum size="65" speed="1.75" color="#252525" />;
      case 1:
        return <l-grid size="80" speed="1.5" color="#252525" />;
      case 2:
        return <l-helix size="65" speed="2.5" color="#252525" />;
      default:
        return <div>Loading...</div>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[30%] h-[35%] rounded-lg shadow-lg flex flex-col justify-center items-center gap-12">
        <img
          src={Logo}
          alt="Logo"
          className="w-44 h-auto invert-0 mt-8"
        />
        <div className="flex flex-col justify-center items-center gap-[70px] mb-8">
        <LoaderComponent />
        <p className="text-xl text-center text-[#2D2D2F] font-semibold">
          {messages[messageStep]}
        </p>
        </div>
       
      </div>
    </div>
  );
};

export default ModalWithLoader;
