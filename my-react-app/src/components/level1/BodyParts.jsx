import React, { useState, useEffect } from "react";

const bodyPartsConfig = {
  1: {
    name: "डोके",
    image: "/body-parts/head.png",
    description: "एक मजेदार चेहरा सुरू करा!",
    emoji: "👶",
    color: "bg-gradient-to-r from-pink-400 to-purple-400"
  },
  2: {
    name: "मध्य भाग",
    image: "/body-parts/torso.png",
    description: "हातांसह शरीर जोडा!",
    emoji: "👕",
    color: "bg-gradient-to-r from-blue-400 to-green-400"
  },
  3: {
    name: "खालचा भाग",
    image: "/body-parts/lower-body.png",
    description: "पाय आणि पाऊल पूर्ण करा!",
    emoji: "👖",
    color: "bg-gradient-to-r from-yellow-400 to-orange-400"
  }
};

export default function BodyParts({ step }) {
  const [currentPart, setCurrentPart] = useState(bodyPartsConfig[1]);
  const [screenHeight, setScreenHeight] = useState(0);
  const [isPortrait, setIsPortrait] = useState(true);

  // Detect screen orientation and size
  useEffect(() => {
    const updateScreenInfo = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      setScreenHeight(height);
      setIsPortrait(width < 768 || height > width);
    };
    
    updateScreenInfo();
    window.addEventListener('resize', updateScreenInfo);
    return () => window.removeEventListener('resize', updateScreenInfo);
  }, []);

  // Update current part based on step
  useEffect(() => {
    if (step >= 1 && step <= 3) {
      setCurrentPart(bodyPartsConfig[step]);
    }
  }, [step]);

  // Calculate progress percentage - FIXED LOGIC
  const calculateProgress = () => {
    if (step >= 3) {
      return 100; // When step is 3 or completed, show 100%
    }
    return Math.round(((step - 1) / 3) * 100);
  };

  // Calculate image size based on screen
  const getImageSize = () => {
    if (screenHeight < 600) return "max-h-[120px]";
    if (screenHeight < 700) return "max-h-[150px]";
    if (screenHeight < 800) return "max-h-[180px]";
    return "max-h-[200px]";
  };

  // Get progress status text
  const getProgressText = () => {
    if (step > 3) return 'पूर्ण! 🎉';
    if (step === 3) return 'पायरी ३ / ३';
    return `पायरी ${step} / ३`;
  };

  return (
    <div className="h-full w-full flex flex-col">
      
      {/* Game Header - Compact */}
      <div className="flex-shrink-0 pt-1 pb-2">
        <h1 className="text-base sm:text-lg font-bold text-purple-700 text-center">
          तुमचा मित्र तयार करा! 🧩
        </h1>
        <p className="text-gray-600 text-center text-[10px] sm:text-xs">
          ३ पायऱ्या पूर्ण करा
        </p>
      </div>

      {/* Progress Indicator - Very Compact */}
      <div className="flex-shrink-0 mb-2">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${
              step >= 3 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {getProgressText()}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-600">
              {calculateProgress()}% पूर्ण
            </div>
          </div>
        </div>
        
        {/* Mini Progress Bar - FIXED */}
        <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              calculateProgress() === 100 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                : 'bg-gradient-to-r from-green-400 to-blue-500'
            }`}
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center">
        
        {/* Character Display */}
        <div className="flex-1 flex items-center justify-center w-full px-2">
          {step > 0 && step <= 3 ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex-1 flex items-center justify-center w-full">
                <img
                  src={currentPart.image}
                  alt={currentPart.name}
                  className={`${getImageSize()} w-auto object-contain ${step === 3 ? 'animate-bounce' : 'animate-pulse'}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/200x200/cccccc/ffffff?text=${encodeURIComponent(currentPart.name)}`;
                  }}
                />
              </div>
              
              {/* Current Part Info */}
              <div className={`px-3 py-2 rounded-lg ${currentPart.color} w-full mt-2`}>
                <h3 className="text-white font-bold text-sm text-center">
                  {currentPart.name}
                </h3>
                <p className="text-white/90 text-xs text-center mt-0.5">
                  {currentPart.description}
                </p>
              </div>
            </div>
          ) : step > 3 ? (
            <div className="text-center w-full">
              <div className="text-4xl mb-3 animate-bounce">🎉</div>
              <h3 className="text-base font-bold text-gray-800 mb-1">
                मित्र तयार झाला!
              </h3>
              <p className="text-xs text-gray-600">
                १००% पूर्ण!
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-2">🤔</div>
              <h3 className="text-sm font-bold text-gray-600">
                सुरू करायला तयार?
              </h3>
            </div>
          )}
        </div>

        {/* Step Indicators - Horizontal */}
        <div className="flex-shrink-0 mt-2 w-full px-2">
          <div className="flex justify-between">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center">
                <div className={`
                  w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
                  text-xs sm:text-sm font-bold border-2 transition-all duration-300
                  ${step >= num ? 'border-white' : 'border-gray-300'}
                  ${num === step
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 scale-110'
                    : step > num
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                      : step >= 3
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                        : 'bg-gray-200'
                  }
                `}>
                  {step >= num ? '✓' : bodyPartsConfig[num].emoji}
                </div>
                <span className="text-[9px] sm:text-xs font-medium mt-0.5">
                  {bodyPartsConfig[num].name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Game Instructions */}
      <div className="flex-shrink-0 mt-2 px-2">
        <div className={`rounded-lg p-2 ${
          calculateProgress() === 100 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <p className={`text-xs flex items-center gap-1 ${
            calculateProgress() === 100 
              ? 'text-green-800' 
              : 'text-yellow-800'
          }`}>
            <span className="text-sm">
              {calculateProgress() === 100 ? '✅' : '💡'}
            </span>
            {calculateProgress() === 100 
              ? 'सर्व पायऱ्या पूर्ण! मित्र तयार झाला!'
              : step > 0 && step <= 3 
                ? `${currentPart.name} जोडा!`
                : "सुरू करण्यासाठी पहिला भाग निवडा!"
            }
          </p>
        </div>
      </div>

      {/* Completion Modal */}
      {step > 3 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-4 rounded-xl shadow-2xl mx-3 max-w-xs w-full">
            <div className="text-center">
              <div className="text-5xl mb-3">🏆</div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                तुम्ही यशस्वी! 🎉
              </h2>
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                </div>
                <p className="text-sm text-green-600 mt-1">१००% पूर्ण</p>
              </div>
              <button
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg text-sm w-full"
                onClick={() => window.location.reload()}
              >
                पुन्हा खेळा! 🔄
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}