import { useState, useEffect, useRef } from "react";
import Body from "./BodyParts";
import InfoCard from "./InfoCard";
import NextButton from "./NextButton";

import headAudio from "../../assets/audio/head.mp3";
import torsoAudio from "../../assets/audio/torso.mp3";
import lowerAudio from "../../assets/audio/lower.mp3";

export default function LevelOne() {
  const [step, setStep] = useState(0); // 0 = before GetStarted
  const [screenHeight, setScreenHeight] = useState(0);
  const [isPortrait, setIsPortrait] = useState(true);
  const [userName, setUserName] = useState("");

  const audioRef = useRef(null);
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [showNameInput, setShowNameInput] = useState(false);

  // Detect screen orientation
  useEffect(() => {
    const updateScreenInfo = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      setScreenHeight(height);
      setIsPortrait(width < 768 || height > width);
    };

    updateScreenInfo();
    window.addEventListener("resize", updateScreenInfo);
    return () => window.removeEventListener("resize", updateScreenInfo);
  }, []);

  // Check if name already exists in localStorage on component mount
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  // Play audio for current step
  const playStepAudio = (currentStep) => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    if (currentStep === 1) audioRef.current.src = headAudio;
    else if (currentStep === 2) audioRef.current.src = torsoAudio;
    else if (currentStep === 3) audioRef.current.src = lowerAudio;

    audioRef.current.play().catch(() => console.log("Audio blocked"));
  };

  // Handle Get Started
  const handleGetStarted = () => {
    setShowGetStarted(false);
    setShowNameInput(true);
  };

  // Handle Name Submission
  const handleNameSubmit = () => {
    if (!userName.trim()) {
      alert("कृपया तुमचे नाव प्रविष्ट करा");
      return;
    }
    
    // Save to localStorage for global access
    localStorage.setItem("userName", userName.trim());
    
    setShowNameInput(false);
    setStep(1); // start with head
    playStepAudio(1);
  };

  // Handle NextButton click
  const handleNextClick = () => {
    if (step < 3) {
      const nextStep = step + 1;
      setStep(nextStep);
      playStepAudio(nextStep);
    }
  };

  return (
    <div
      className="bg-gradient-to-b from-blue-100 to-green-100 overflow-hidden"
      style={{ height: `${screenHeight}px`, maxHeight: `${screenHeight}px` }}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {/* Get Started Modal */}
      {showGetStarted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-xs mx-3 w-full text-center">
            <h2 className="text-lg font-bold mb-4">स्पर्शज्ञान – शरीर ओळखा</h2>
            <p className="text-sm text-gray-700 mb-6">खेळ सुरू करण्यासाठी क्लिक करा</p>
            <button
              onClick={handleGetStarted}
              className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Name Input Modal */}
      {showNameInput && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-xs mx-3 w-full text-center">
            <h2 className="text-lg font-bold mb-4">तुमचे नाव प्रविष्ट करा</h2>
            <p className="text-sm text-gray-700 mb-4">खेळ वैयक्तिकृत करण्यासाठी</p>
            
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="तुमचे नाव"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              autoFocus
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowNameInput(false);
                  setShowGetStarted(true);
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-400 transition-colors"
              >
                मागे
              </button>
              <button
                onClick={handleNameSubmit}
                className="flex-1 px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
              >
                सुरू करा
              </button>
            </div>
            
            {userName.trim() === "" && (
              <p className="text-red-500 text-sm mt-3">कृपया नाव प्रविष्ट करा</p>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`h-full flex ${isPortrait ? "flex-col" : "flex-row"} p-2 sm:p-3`}>
        {/* Header */}
        {isPortrait && !showGetStarted && !showNameInput && (
          <div className="flex-shrink-0 mb-1">
            <h1 className="text-base sm:text-lg font-bold text-blue-800 text-center">
              स्पर्शज्ञान – शरीर ओळखा
            </h1>
            <p className="text-gray-600 text-center text-xs">खेळून शिका</p>
            {userName && (
              <p className="text-green-700 text-center text-sm font-medium mt-1">
                नमस्कार, {userName}!
              </p>
            )}
          </div>
        )}

        {/* Game Area */}
        <div className={`flex-1 min-h-0 ${isPortrait ? "mb-2" : "mr-2"}`}>
          {!isPortrait && !showGetStarted && !showNameInput && (
            <div className="mb-1 flex justify-between items-center">
              <div>
                <h1 className="text-base sm:text-lg font-bold text-blue-800">
                  स्पर्शज्ञान – शरीर ओळखा
                </h1>
                {userName && (
                  <p className="text-green-700 text-sm font-medium">
                    नमस्कार, {userName}!
                  </p>
                )}
              </div>
            </div>
          )}
          <div className="h-full bg-white/70 rounded-xl p-1 sm:p-2">
            {step > 0 && <Body step={step} />}
          </div>
        </div>

        {/* Controls */}
        {!showGetStarted && !showNameInput && (
          <div className={`flex flex-col ${isPortrait ? "gap-2 w-full" : "gap-3 w-56 lg:w-64"} flex-shrink-0`}>
            <div className="flex-1 min-h-0">
              <InfoCard step={step} isPortrait={isPortrait} />
            </div>
            <div className="flex-shrink-0">
              <NextButton step={step} setStep={handleNextClick} isPortrait={isPortrait} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}