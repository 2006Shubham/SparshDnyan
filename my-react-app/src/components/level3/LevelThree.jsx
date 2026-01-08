import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reflex from "../../assets/audio/reflex.mp3"

const LevelThree = ({ onLevelComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  // Dummy image path - replace this with your actual image path
  const imagePath = "/body-parts/step.png";

  const audioRef = React.useRef(null);
  
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();     // restart audio
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    };

  
  const handleButtonClick = () => {
    setIsLoading(true);
    setError(null);

    navigate('/level4')
    
    // Simulate loading/processing
    setTimeout(() => {
      setIsLoading(false);
      if (onLevelComplete) {
        onLevelComplete();
      }
    }, 1000);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">
            स्पर्शज्ञान - स्तर ३
          </h1>
          
        </div>

        {/* Main Content - Full Width Image */}
        <div className="mb-8">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-300">
            {/* Image Container */}
            <div className="w-full h-auto min-h-[60vh] bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center">
              
              {/* Actual Image */}
              <img 
                src={imagePath}
                alt="Safety Education Illustration"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Image failed to load:", imagePath);
                  setError("Image could not be loaded. Please check the image path.");
                  // Fallback UI if image fails to load
                  e.target.style.display = 'none';
                }}
              />
              
              {/* Fallback UI if image doesn't exist */}
{error && (
  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
    <div className="text-6xl mb-4">🖼️</div>
    <div className="text-2xl font-bold text-purple-800 mb-2">
      Image Preview
    </div>
    <div className="text-gray-600 mb-4">
      Placeholder for main illustration
    </div>
    <div className="bg-white/80 p-4 rounded-lg">
      <p className="text-red-600 font-medium">{error}</p>
      <p className="text-sm text-gray-600 mt-2">
        Expected image path:
        <code className="bg-gray-100 px-2 py-1 rounded">
          {imagePath}
        </code>
      </p>
    </div>
  </div>
)}
            
            {/* Image Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="text-white ">
                <h2 className="text-xl font-bold mb-1">सुरक्षा शिक्षण चित्रण</h2>
                <p className="text-sm opacity-90">मुलांसाठी परस्परसंवादी शिकण्याचा अनुभव</p>
              </div>
            </div>
          </div>
          
          {/* Image Path Info (for debugging) */}
          <div className="mt-2 text-center">
            <p className="text-sm text-gray-500">
                
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={handleButtonClick}
            disabled={isLoading}
            className={`
              relative px-10 py-5 rounded-2xl text-xl font-bold
              shadow-lg hover:shadow-xl transform hover:scale-105 
              transition-all duration-300
              ${isLoading 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
              }
            `}
          >


            {/* Button Content */}
            <div  className="flex items-center justify-center space-x-3">
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>प्रक्रिया सुरू आहे...</span>
                </>
              ) : (
                <>
                  <span className="text-2xl">🚀</span>
                  <span>पुढील स्तरावर जा</span>
                  <span className="text-2xl">✨</span>
                </>
              )}
            </div>

         
            {/* Button Effects */}
            {!isLoading && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            )}
          </button>
          
          {/* Button Description */}
          <p className="mt-4 text-gray-600 max-w-md mx-auto">
            तुमच्या सुरक्षा शिक्षण प्रवासातील पुढील टप्प्यावर जाण्यासाठी बटणावर क्लिक करा.
          </p>
        </div>

         <div className="mt-4 flex justify-between items-center">
          <button
            onClick={playAudio}
            className="text-sm text-purple-600 hover:text-purple-800"
          >
            🔊 ऐका
          </button>

          <audio ref={audioRef} src={reflex} />

          </div>
        
        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>COEP Sparshadhyan प्रकल्प • Child Safety Education Platform</p>
        
        </div>
      </div>
    </div>
     </div>
  );
 
};

export default LevelThree;