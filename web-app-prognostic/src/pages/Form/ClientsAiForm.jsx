import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const ClientsAiFormPage = () => {
    const { search } = useLocation();
    const { companySlug } = useParams();
    const queryParams = new URLSearchParams(search);
    const typeFormId = queryParams.get("typeFormId");

    const displayCompanyName = companySlug
        ? companySlug.replace(/-ClientsAi$/i, "")
        : "";

    useEffect(() => {
        if (!document.querySelector('script[src="https://embed.typeform.com/next/embed.js"]')) {
            const script = document.createElement("script");
            script.src = "https://embed.typeform.com/next/embed.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div className="flex items-center flex-col justify-center min-h-screen w-screen bg-gray-100">
            <div className="w-full max-w-[800px] bg-white rounded-[15px] overflow-hidden shadow-md">
                <div className="bg-[#252525] text-white p-5 text-center text-2xl font-bold">
                    {displayCompanyName && <span>{displayCompanyName}</span>}
                </div>

                <div className="h-[500px] relative">
                    {typeFormId ? (
                        <div data-tf-widget={typeFormId} className="w-full h-full"></div>
                    ) : (
                        <p className="p-5">Typeform ID not provided in URL parameters.</p>
                    )}
                </div>

                
            </div>
            <div className="flex w-full max-w-[800px] justify-end p-4">
                    <a
                        href="https://app.clients.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#252525] text-white text-xs py-1 px-3 rounded font-normal shadow-md"
                    >
                        Clients.ai Enabled
                    </a>
                </div>
        </div>
    );
};

export default ClientsAiFormPage;
