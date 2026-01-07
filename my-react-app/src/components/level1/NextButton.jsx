import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NextButton({ step, setStep, isPortrait }) {
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else if (step === 3) {
      setShowCompletionModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowCompletionModal(false);
  };

  const handleNextLevel = () => {
    setShowCompletionModal(false);
   
    alert("पुढील पातळीकडे जात आहे...");
     navigate('/level2')
  };

  const getButtonText = () => {
    if (step < 3) {
      return "पुढे";
    } else if (step === 3) {
      return "पातळी पूर्ण";
    }
  };

  const getButtonClass = () => {
    const baseClass = "w-full text-white font-bold rounded-lg shadow hover:opacity-90 transition-all duration-300";
    
    if (isPortrait) {
      return `${baseClass} px-4 py-3 text-sm ${step < 3 ? 'bg-green-600' : 'bg-blue-600 animate-pulse'}`;
    }
    
    return `${baseClass} px-6 py-3 text-base ${step < 3 ? 'bg-green-600' : 'bg-blue-600 animate-pulse'}`;
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={getButtonClass()}
      >
        {getButtonText()}
      </button>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-4 rounded-xl shadow-2xl max-w-xs mx-3 w-full">
            <div className="text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                अभिनंदन! 🏆
              </h2>
              <p className="text-sm text-gray-700 mb-4">
                तुम्ही ही पातळी यशस्वीरित्या पूर्ण केली!
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleNextLevel}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg text-sm"
                >
                  पुढील पातळी
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-600 text-white font-bold rounded-lg text-sm"
                >
                  बंद करा
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}