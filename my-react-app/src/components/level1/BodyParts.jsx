import React, { useState, useEffect } from "react";

// Body part configuration - images from public folder
const bodyPartsConfig = {
  1: {
    name: "डोके",
    part: "head",
    image: "/body-parts/head.png",
    description: "एक मजेदार चेहरा सुरु करा! 😊",
    instruction: "डोके जोडण्यासाठी क्लिक करा!",
    emoji: "👶",
    color: "bg-gradient-to-r from-pink-400 to-purple-400"
  },
  2: {
    name: "मध्य भाग",
    part: "torso",
    image: "/body-parts/torso.png",
    description: "हातांसह शरीर जोडा! 🤗",
    instruction: "मध्य भाग जोडण्यासाठी क्लिक करा!",
    emoji: "👕",
    color: "bg-gradient-to-r from-blue-400 to-green-400"
  },
  3: {
    name: "खालचा भाग",
    part: "lowerBody",
    image: "/body-parts/lower-body.png",
    description: "पाय आणि पाऊल पूर्ण करा! 👖",
    instruction: "खालचा भाग जोडण्यासाठी क्लिक करा!",
    emoji: "👖",
    color: "bg-gradient-to-r from-yellow-400 to-orange-400"
  }
};

// Character themes (optional - for different characters)
const characterThemes = {
  1: { name: "मजेदार मित्र", bgColor: "bg-gradient-to-b from-blue-100 to-purple-100" },
  2: { name: "सुपर हिरो", bgColor: "bg-gradient-to-b from-red-100 to-yellow-100" },
  3: { name: "अंतराळ मित्र", bgColor: "bg-gradient-to-b from-indigo-100 to-cyan-100" }
};

export default function BodyParts({ step }) {
  const [currentPart, setCurrentPart] = useState(bodyPartsConfig[1]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [characterTheme, setCharacterTheme] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);
  const [screenHeight, setScreenHeight] = useState(0);

  // Get screen height on mount and resize
  useEffect(() => {
    const updateHeight = () => {
      setScreenHeight(window.innerHeight);
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Update current part based on step
  useEffect(() => {
    if (step >= 1 && step <= 3) {
      setIsAnimating(true);
      setCurrentPart(bodyPartsConfig[step]);

      // Stop animation after 0.5s
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);

      return () => clearTimeout(timer);
    }

    // Random character theme when complete
    if (step > 3) {
      setCharacterTheme(Math.floor(Math.random() * 3) + 1);
    }
  }, [step]);

  // Auto-hide instructions after 5 seconds
  useEffect(() => {
    if (showInstructions) {
      const timer = setTimeout(() => {
        setShowInstructions(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showInstructions]);

  return (
    <div 
      className={`w-full overflow-hidden transition-all duration-500 ${characterThemes[characterTheme].bgColor}`}
      style={{ height: `${screenHeight}px` }}
    >
      <div className="h-full flex flex-col max-w-6xl mx-auto p-3 sm:p-4 md:p-5">
        
        {/* Progress Tracker - Compact */}
        <div className="mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-700 whitespace-nowrap">
                तुमचा मित्र तयार करा! 🧩
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                ३ पायऱ्या पूर्ण करून तुमचा मित्र तयार करा! 👶
              </p>
            </div>
            <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base whitespace-nowrap ${
              step >= 3 
                ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                : 'bg-blue-100 text-blue-700 border-2 border-blue-300'
            }`}>
              {step >= 3 ? 'पूर्ण! 🎉' : `पायरी ${step} / ३`}
            </div>
          </div>

          {/* Compact Progress Steps */}
          <div className="relative px-2">
            {/* Connecting Line */}
            <div className="absolute top-4 sm:top-5 left-0 right-0 h-2 sm:h-3 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full z-0"></div>

            {/* Progress Fill */}
            <div
              className="absolute top-4 sm:top-5 left-0 h-2 sm:h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full z-0 transition-all duration-700"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>

            {/* Step Circles */}
            <div className="flex justify-between relative z-10">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div className={`
                    w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 
                    rounded-full flex items-center justify-center 
                    text-lg sm:text-xl md:text-2xl
                    border-3 sm:border-4 transition-all duration-500 mb-2
                    ${step >= num
                        ? 'scale-105 sm:scale-110 border-white shadow-md sm:shadow-lg'
                        : 'border-gray-200'
                      }
                    ${num === step
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400 animate-bounce'
                        : step > num
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200'
                      }
                  `}>
                    {step > num ? (
                      <span className="text-white text-sm sm:text-base md:text-xl">✓</span>
                    ) : (
                      <span className="text-xs sm:text-base">{bodyPartsConfig[num].emoji}</span>
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="text-center">
                    <span className={`font-bold text-xs sm:text-sm md:text-base ${
                      step >= num ? 'text-gray-800' : 'text-gray-400'
                    }`}>
                      {bodyPartsConfig[num].name}
                    </span>
                    <div className={`text-xs px-2 py-0.5 rounded-full mt-0.5 ${
                      num === step 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {step > num ? 'झाले! ✓' : num === step ? 'चालू' : 'पुढे'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Building Area - Flexible Height */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 md:gap-6 overflow-hidden">
          {/* Character Display - Takes most space */}
          <div className="flex-1 min-h-0">
            <div className="bg-gradient-to-b from-blue-50/80 to-purple-50/80 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border-4 border-white h-full flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* Display Current Body Part */}
                {step > 0 && step <= 3 ? (
                  <div className={`
                    transition-all duration-700 ease-out w-full flex justify-center
                    ${isAnimating ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}
                  `}>
                    <img
                      src={currentPart.image}
                      alt={currentPart.name}
                      className="max-h-[40vh] sm:max-h-[45vh] md:max-h-72 w-auto object-contain drop-shadow-xl animate-float"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/400x300/${currentPart.color.split('-')[2]}/FFFFFF?text=${encodeURIComponent(currentPart.name)}`;
                      }}
                    />
                  </div>
                ) : step > 3 ? (
                  <div className="text-center w-full">
                    <div className="relative">
                      <img
                        src={bodyPartsConfig[3].image}
                        alt="Complete Character"
                        className="max-h-[40vh] sm:max-h-[45vh] md:max-h-72 w-auto object-contain drop-shadow-xl animate-bounce"
                      />
                      <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-2xl sm:text-4xl animate-spin">🌟</div>
                      <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 text-2xl sm:text-4xl animate-ping">✨</div>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-4">
                      मित्र तयार झाला! 🎉
                    </h3>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl md:text-6xl mb-4 animate-bounce">🤔</div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-600">
                      सुरु करायला तयार आहात?
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500">
                      सुरु करण्यासाठी पहिला भाग क्लिक करा!
                    </p>
                  </div>
                )}

                {/* Character Name Tag */}
                {step > 0 && (
                  <div className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-bold text-base sm:text-lg shadow-lg">
                    {characterThemes[characterTheme].name}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Current Part Information - Compact Side Panel */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-white h-full">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-purple-700 mb-2">
                  चालू भाग
                </h3>
                <div className={`px-4 py-3 rounded-2xl mb-4 ${currentPart.color}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl">{currentPart.emoji}</span>
                    <div>
                      <h4 className="font-bold text-white text-lg sm:text-xl">
                        {currentPart.name}
                      </h4>
                      <p className="text-white/90 text-sm">
                        {currentPart.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Stats */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">प्रगती:</span>
                  <span className="font-bold text-blue-600">
                    {Math.round(((step - 1) / 3) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Instructions - Auto-hiding */}
              {showInstructions && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl animate-fadeIn">
                  <p className="text-sm text-yellow-800 flex items-center gap-2">
                    <span className="text-lg">💡</span>
                    {currentPart.instruction}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Celebration - Fullscreen Modal */}
      {step > 3 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fadeIn">
          <div className="bg-gradient-to-r from-yellow-300 via-green-300 to-blue-300 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-xs sm:max-w-md mx-4 animate-scaleIn">
            <div className="text-center">
              <div className="text-4xl sm:text-6xl mb-4 animate-bounce">🏆</div>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">
                तुम्ही यशस्वी! 🎉
              </h2>
              <p className="text-sm sm:text-lg text-gray-700 mb-6">
                तुम्ही एक पूर्ण मित्र तयार केला! अप्रतिम कामगिरी!
              </p>
              <button
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base sm:text-xl rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg w-full"
                onClick={() => window.location.reload()}
              >
                पुन्हा खेळा! 🔄
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}