import { useState, useEffect } from "react";
import Body from "./BodyParts";
import InfoCard from "./InfoCard";
import NextButton from "./NextButton";

export default function LevelOne() {
  const [step, setStep] = useState(1);
  const [screenHeight, setScreenHeight] = useState(0);
  const [isPortrait, setIsPortrait] = useState(true);

  // Detect screen orientation
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

  return (
    <div 
      className="bg-gradient-to-b from-blue-100 to-green-100 overflow-hidden"
      style={{ 
        height: `${screenHeight}px`,
        maxHeight: `${screenHeight}px`
      }}
    >
      <div className={`h-full flex ${isPortrait ? 'flex-col' : 'flex-row'} p-2 sm:p-3`}>
        
        {/* Game Header */}
        {isPortrait && (
          <div className="flex-shrink-0 mb-1">
            <h1 className="text-base sm:text-lg font-bold text-blue-800 text-center">
              स्पर्शज्ञान – शरीर ओळखा
            </h1>
            <p className="text-gray-600 text-center text-xs">
              खेळून शिका
            </p>
          </div>
        )}

        {/* Left Section - Game Area */}
        <div className={`flex-1 min-h-0 ${isPortrait ? 'mb-2' : 'mr-2'}`}>
          {!isPortrait && (
            <div className="mb-1">
              <h1 className="text-base sm:text-lg font-bold text-blue-800">
                स्पर्शज्ञान – शरीर ओळखा
              </h1>
            </div>
          )}
          <div className="h-full bg-white/70 rounded-xl p-1 sm:p-2">
            <Body step={step} />
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className={`flex flex-col ${isPortrait ? 'gap-2' : 'gap-3'} ${isPortrait ? 'w-full' : 'w-56 lg:w-64'} flex-shrink-0`}>
          
          {/* Info Card */}
          <div className="flex-1 min-h-0">
            <InfoCard step={step} isPortrait={isPortrait} />
          </div>
          
          {/* Next Button */}
          <div className="flex-shrink-0">
            <NextButton step={step} setStep={setStep} isPortrait={isPortrait} />
          </div>
          
        </div>

      </div>
    </div>
  );
}