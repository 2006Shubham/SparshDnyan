import React from 'react';
import { useCertificate } from '../../context/CertificateContext';
import { useNavigate } from 'react-router-dom';

const CompletionScreen = () => {
  const { getCertificateData, setShowCertificate } = useCertificate();
  const navigate = useNavigate();
  
  const certificate = getCertificateData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        
        {/* Main Certificate Container */}
        <div className="relative">
          {/* Certificate Card with beautiful design */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-yellow-400 relative">
            
            {/* Top decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-3 rounded-full font-bold text-lg shadow-xl z-10">
              🏆 प्रमाणपत्र 🏆
            </div>
            
            {/* Certificate Content */}
            <div className="p-8 pt-16">
              
              {/* Header Section */}
              <div className="text-center mb-10">
                <div className="flex justify-center items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-6 shadow-lg">
                    <span className="text-4xl text-white">🛡️</span>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-blue-800 mb-2">
                      स्पर्शज्ञान
                    </h1>
                    <p className="text-xl text-gray-600">बाल सुरक्षा शिक्षण प्रकल्प</p>
                    <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-2"></div>
                  </div>
                </div>
              </div>

              {/* Award Section */}
              <div className="text-center mb-12">
                <p className="text-2xl text-gray-700 mb-8">
                  ह्या प्रमाणपत्राने गौरवपूर्वक सूचित केले जाते की
                </p>
                
                {/* Student Name in beautiful box */}
                <div className="relative mb-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-2xl transform rotate-1"></div>
                  <div className="relative bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-2xl border-4 border-yellow-300 shadow-lg">
                    <h2 className="text-5xl font-bold text-purple-800 mb-2">
                      {certificate.studentName || "विद्यार्थी"}
                    </h2>
                    <p className="text-xl text-gray-700">यांनी यशस्वीरित्या पूर्ण केले</p>
                  </div>
                </div>

                {/* Course Details */}
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-2xl border-4 border-blue-300 shadow-inner mb-10">
                  <h3 className="text-3xl font-bold text-blue-800 mb-4">
                    संपूर्ण सुरक्षा प्रशिक्षण कार्यक्रम
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    सर्व ५ स्तरांचे सुरक्षा शिक्षण यशस्वीरित्या पूर्ण करून 
                    बाल सुरक्षेच्या सर्व संकल्पनांवर प्रभुत्व मिळवले.
                  </p>
                </div>
              </div>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center mb-10">
                <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
                <div className="mx-6">
                  <div className="text-4xl">⭐</div>
                </div>
                <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
              </div>

              {/* Certificate Details */}
              <div className="mb-12">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-lg text-gray-500 mb-2">प्रमाणपत्र क्रमांक</div>
                    <div className="text-2xl font-bold text-blue-600 bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                      {certificate.id || `SD-${Date.now()}`}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg text-gray-500 mb-2">दिनांक</div>
                    <div className="text-2xl font-bold text-purple-600 bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
                      {certificate.completionDate || new Date().toLocaleDateString('mr-IN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-4 border-green-300 mb-12">
                <h4 className="text-2xl font-bold text-green-800 mb-4 text-center">🎯 प्राप्त झालेली कौशल्ये</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">खाजगी अवयव ओळख</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">सुरक्षित स्पर्श समज</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">POCSO कायदा ज्ञान</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">मदत क्रमांक ज्ञान</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">योग्य निर्णय क्षमता</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">आत्मविश्वास वाढ</span>
                  </div>
                </div>
              </div>

              {/* Signature Section */}
              <div className="flex justify-between items-end border-t-2 border-gray-300 pt-10">
                <div className="text-center">
                  <div className="text-xl text-gray-500 mb-2">प्रदानकर्ता</div>
                  <div className="text-3xl font-bold text-gray-800">COEP स्पर्शज्ञान</div>
                  <div className="text-lg text-gray-600">बाल सुरक्षा प्रकल्प संघ</div>
                </div>
                
                <div className="text-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl mb-2">
                      स्प
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xl text-gray-500 mb-2">मुख्य सल्लागार</div>
                  <div className="text-2xl font-bold text-gray-800">शिक्षण विभाग</div>
                  <div className="text-lg text-gray-600">महाराष्ट्र शासन</div>
                </div>
              </div>

              {/* Certificate Footer */}
              <div className="mt-12 text-center">
                <p className="text-lg text-gray-600 italic">
                  "ज्ञान हेच बालकाचे सर्वोत्तम संरक्षण आहे"
                </p>
                <div className="text-sm text-gray-500 mt-4">
                  या प्रमाणपत्राने तुमचे सुरक्षा ज्ञान आणि कौशल्ये मान्य केली जातात
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl shadow-xl">
            ★
          </div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl shadow-xl">
            ★
          </div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl shadow-xl">
            ★
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl shadow-xl">
            ★
          </div>
        </div>

        {/* Action Buttons (Only navigation) */}
        <div className="mt-12 space-y-6 max-w-md mx-auto">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-5 rounded-xl text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
          >
            🏠 मुख्यपृष्ठावर जा
          </button>

          <button
            onClick={() => navigate('/certificates/all')}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-5 rounded-xl text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
          >
            📜 सर्व प्रमाणपत्रे पहा
          </button>

          <div className="text-center mt-8">
            <p className="text-gray-600 text-lg">
              🎊 अभिनंदन! तुम्ही सुरक्षा ज्ञानाचा एक महत्त्वाचा टप्पा पार केला आहे!
            </p>
          </div>
        </div>

        {/* Celebration Message */}
        <div className="mt-10 text-center">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-300">
            <p className="text-lg text-gray-800 font-medium">
              "तुमचे हे प्रमाणपत्र तुमच्या सुरक्षा ज्ञानाचा सन्मानपूर्वक पुरावा आहे. 
              तुमचे कौटुंबिक सदस्य, शिक्षक आणि मित्रांसोबत याचा अभिमानाने वाटा करा!"
            </p>
          </div>
        </div>
      </div>

      {/* Floating Celebration Elements */}
      <div className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none z-[-1] overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              fontSize: `${Math.random() * 24 + 16}px`,
              opacity: 0.4,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            {['🌟', '✨', '⭐', '🎖️', '🏅', '🎗️'][i % 6]}
          </div>
        ))}
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
          }
          33% { 
            transform: translateY(-15px) rotate(5deg); 
          }
          66% { 
            transform: translateY(5px) rotate(-5deg); 
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CompletionScreen;