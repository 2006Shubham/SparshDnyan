import { useNavigate } from 'react-router-dom';

function NextLevel() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/level3');
  };

  return (
    <button 
      onClick={handleClick}
      className="flex items-center justify-center space-x-3 mt-4 border-2 border-purple-400 rounded-xl bg-gradient-to-r from-purple-300 to-purple-400 px-6 py-3 hover:from-purple-400 hover:to-purple-500 hover:scale-105 active:scale-95 transition-all duration-200 shadow hover:shadow-lg"
    >
      <span className="text-2xl">🚀</span>
      <span className="font-semibold text-purple-900">पुढील स्तरावर जा</span>
      <span className="text-2xl">✨</span>
    </button>
  );
}

export default NextLevel;