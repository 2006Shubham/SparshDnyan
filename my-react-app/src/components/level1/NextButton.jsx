import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NextButton({ step, setStep }) {
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const navigate = useNavigate(); // ✅ correct hook

  const handleClick = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      setShowCompletionModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowCompletionModal(false);
  };

  const handleNextLevel = () => {
    setShowCompletionModal(false);
    navigate("/level2"); // ✅ correct navigation
  };

  const getButtonText = () => {
    return step < 3 ? "पुढे" : "पातळी पूर्ण";
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`mt-6 px-8 py-3 text-white text-lg font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300 ${
          step < 3
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700 animate-pulse"
        }`}
      >
        {getButtonText()}
      </button>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gradient-to-r from-green-300 via-yellow-300 to-orange-300 p-8 rounded-3xl shadow-2xl max-w-md mx-4 animate-scaleIn">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                अभिनंदन! 🏆
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                तुम्ही ही पातळी यशस्वीरित्या पूर्ण केली!
              </p>

              <div className="flex gap-4">
                <button
                  onClick={handleNextLevel}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:scale-105 transition"
                >
                  पुढील पातळी
                </button>

                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-gray-700 text-white font-bold rounded-xl hover:scale-105 transition"
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
