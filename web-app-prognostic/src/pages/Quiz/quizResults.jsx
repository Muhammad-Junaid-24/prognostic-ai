import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import clientsAI from "../../assets/newIcons/brandingDark.png";
import { getQuizResults } from "services/actions/quiz";
import { Fireworks } from "@fireworks-js/react";

const QuizResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const payload = {
    email: queryParams.get("email"),
    website: queryParams.get("website"),
    // firstName: queryParams.get("firstName"),
    // lastName: queryParams.get("lastName"),
    fullName: queryParams.get("fullName"),
    campaignId: queryParams.get("campaignId"),
  };

  const hasCalledApi = useRef(false);

  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState(null);
  const [displayedSections, setDisplayedSections] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentSectionText, setCurrentSectionText] = useState("");
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentTitleText, setCurrentTitleText] = useState("");
  const [showFireworks, setShowFireworks] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const fetchQuizResultsAndGenerateEmails = async () => {
    try {
      const quizResults = await getQuizResults(payload);
      setApiData(quizResults.content);
      setLoading(false);
      setShowFireworks(true);
      setShowStreak(true);

      setTimeout(() => {
        setShowFireworks(false);
        setShowStreak(false);
      }, 3000);

      // await generateEmailsForSubmission(payload);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasCalledApi.current) {
      fetchQuizResultsAndGenerateEmails();
      hasCalledApi.current = true;
    }
  }, []);

  const loadingMessages = [
    "Discovering patterns and connections...",
    "Analyzing your responses...",
    "Generating personalized insights...",
    "Preparing your custom recommendations...",
  ];

  useEffect(() => {
    if (loading) {
      const messageInterval = setInterval(() => {
        setLoadingMessageIndex((prev) =>
          prev === loadingMessages.length - 1 ? 0 : prev + 1
        );
      }, 5000);

      return () => clearInterval(messageInterval);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && apiData && currentSectionIndex < apiData.length) {
      const currentSection = apiData[currentSectionIndex];
      const fullTitle = currentSection.title || "";
      const fullContent = currentSection.content;

      if (currentTitleIndex < fullTitle.length) {
        const timeout = setTimeout(() => {
          setCurrentTitleText((prev) => prev + fullTitle[currentTitleIndex]);
          setCurrentTitleIndex((prev) => prev + 1);
        }, 20);
        return () => clearTimeout(timeout);
      }

      if (currentTextIndex < fullContent.length) {
        const timeout = setTimeout(() => {
          setCurrentSectionText((prev) => prev + fullContent[currentTextIndex]);
          setCurrentTextIndex((prev) => prev + 1);
        }, 20);
        return () => clearTimeout(timeout);
      } else if (currentTextIndex >= fullContent.length) {
        const delay = setTimeout(() => {
          setDisplayedSections((prev) => [
            ...prev,
            {
              ...currentSection,
              title: currentTitleText,
              content: currentSectionText,
            },
          ]);
          setCurrentSectionIndex((prev) => prev + 1);
          setCurrentTextIndex(0);
          setCurrentTitleIndex(0);
          setCurrentTitleText("");
          setCurrentSectionText("");
        }, 300);
        return () => clearTimeout(delay);
      }
    }
  }, [
    loading,
    apiData,
    currentTextIndex,
    currentTitleIndex,
    currentSectionIndex,
    currentSectionText,
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {showFireworks && (
        <Fireworks
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 999,
            pointerEvents: "none",
          }}
          options={{
            rocketsPoint: {
              min: 0,
              max: 100,
            },
            opacity: 0.5,
            explosion: 8,
            intensity: 30,
            friction: 0.97,
          }}
        />
      )}

      {showStreak && (
        <div className="fixed bottom-60 left-1/2 transform -translate-x-1/2 z-[1000] animate-fade-in-out">
          <div className="bg-white rounded-lg px-6 py-2 shadow-lg flex items-center gap-2">
            <span className="text-prog-blue font-semibold">Streak: 3</span>
            <span role="img" aria-label="fire">
              🔥
            </span>
          </div>
        </div>
      )}

      <img
        width={200}
        height={200}
        src={clientsAI}
        alt="clientsAI"
        className="mb-4"
      />
      {loading ? (
        <>
          <div className="w-full max-w-4xl">
            <div className="bg-prog-blue text-white text-center py-6 rounded-t-lg">
              <h1 className="text-2xl font-semibold">
                Quantum Analysis In Process
              </h1>
            </div>
            <div className="bg-white p-12 rounded-b-lg flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-prog-blue border-t-transparent rounded-full animate-spin mb-8"></div>
              <p
                className="text-gray-600 text-lg transition-all duration-500 animate-slide-up"
                key={loadingMessageIndex}
              >
                {loadingMessages[loadingMessageIndex]}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {displayedSections.map((section, index) => (
            <React.Fragment key={index}>
              <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                {index === 0 && (
                  <div className="bg-prog-blue text-white text-center py-6">
                    <h1 className="text-xl font-semibold">{section.header}</h1>
                  </div>
                )}
                <div className="p-8 text-center">
                  {section.title && (
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                      {section.title}
                    </h2>
                  )}
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {section.content}
                  </p>
                  {index === apiData.length - 1 &&
                    section.ctaText &&
                    section.ctaLink && (
                      <a
                        href={section.ctaLink}
                        className="mt-6 inline-block bg-prog-blue text-white px-6 py-3 rounded-lg text-lg hover:bg-[#003580]"
                      >
                        {section.ctaText}
                      </a>
                    )}
                </div>
              </div>
              {index < displayedSections.length - 1 && (
                <div className="relative h-16 flex justify-center">
                  <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-prog-blue rounded-full"></div>
                  <div className="h-full w-0.5 bg-prog-blue"></div>
                </div>
              )}
            </React.Fragment>
          ))}

          {currentSectionIndex < apiData.length && (
            <>
              {displayedSections.length > 0 && (
                <div className="relative h-16 flex justify-center">
                  <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-prog-blue rounded-full"></div>
                  <div className="h-full w-0.5 bg-prog-blue"></div>
                </div>
              )}
              <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden mb-4">
                {currentSectionIndex === 0 && (
                  <div className="bg-prog-blue text-white text-center py-6">
                    <h1 className="text-2xl font-semibold">
                      {apiData[currentSectionIndex].header}
                    </h1>
                  </div>
                )}
                <div className="p-8 text-center">
                  {apiData[currentSectionIndex].title && (
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                      {currentTitleText}
                    </h2>
                  )}
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {currentSectionText}
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default QuizResults;
