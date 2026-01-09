import React, { useState, useEffect, useRef } from "react";
import info5 from "../../assets/audio/info5.mp3";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

const LevelFive = () => {
  const [currentSection, setCurrentSection] = useState("intro");
  const [flippedCards, setFlippedCards] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const audioRef = React.useRef(null);
  const certificateRef = React.useRef(null);

  // Get user name from localStorage on component mount
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
    } else {
      setUserName("मित्रा");
    }
  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Module sections - updated to include certificate
  const sections = {
    intro: "परिचय",
    privateParts: "खाजगी अवयव",
    goodBadTouch: "चांगला-वाईट स्पर्श",
    pocsoLaw: "POCSO कायदा",
    helpNumbers: "मदत क्रमांक",
    scenario: "परिस्थिती",
    ending: "समापन",
    certificate: "प्रमाणपत्र"
  };

  // Private body parts information
  const privatePartsInfo = [
    {
      name: "डोके",
      emoji: "👶",
      description: "हे तुमचे डोके आहे. याची काळजी घ्या.",
      private: false
    },
    {
      name: "हात",
      emoji: "✋",
      description: "हे तुमचे हात आहेत. यांनी मदत करा.",
      private: false
    },
    {
      name: "पोट",
      emoji: "🫄",
      description: "खाजगी अवयव - स्वच्छ राखा",
      private: true,
      warning: true
    },
    {
      name: "गुडघे",
      emoji: "🦵",
      description: "हे तुमचे गुडघे आहेत.",
      private: false
    },
    {
      name: "पाय",
      emoji: "🦶",
      description: "हे तुमचे पाय आहेत.",
      private: false
    },
    {
      name: "खासगी भाग",
      emoji: "🔒",
      description: "स्विमसूटने झाकलेले भाग - तुमचेच आहेत!",
      private: true,
      warning: true
    }
  ];

  // Good touch vs Bad touch cards
  const touchCards = [
    {
      id: 1,
      type: "good",
      title: "चांगला स्पर्श",
      examples: [
        "आईची माया",
        "वडिलांचे प्रेम",
        "शिक्षकांची प्रोत्साहन",
        "डॉक्टरची औषधोपचार (माता-पित्याच्या हजेरीत)"
      ],
      emoji: "🤗",
      color: "from-green-400 to-emerald-500"
    },
    {
      id: 2,
      type: "bad",
      title: "वाईट स्पर्श",
      examples: [
        "खाजगी अवयवांवर स्पर्श",
        "लपवून स्पर्श करणे",
        "'कोणाला सांगू नको' असे म्हणणे",
        "अस्वस्थ करणारा स्पर्श"
      ],
      emoji: "✋",
      color: "from-red-400 to-pink-500"
    },
    {
      id: 3,
      type: "confused",
      title: "संभ्रमित स्पर्श",
      examples: [
        "लाज वाटणे",
        "वाईट वाटणे",
        "गोंधळ वाटणे",
        "सुरक्षित वाटत नसणे"
      ],
      emoji: "😕",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  // POCSO Law information
  const pocsoInfo = {
    title: "POCSO कायदा - तुमचे संरक्षण कवच",
    points: [
      "भारत सरकारने २०१२ मध्ये बनवलेला कायदा",
      "मुलांचे लैंगिक अत्याचारापासून संरक्षण",
      "१८ वर्षाखालील सर्व मुलांना संरक्षण",
      "गुन्हेगारांना कठोर शिक्षा",
      "विशेष न्यायालये मुलांच्या सोयीसाठी",
      "मुलांचे बयान विशेष पद्धतीने घेणे"
    ],
    emoji: "🛡️",
    note: "हा कायदा तुमची मदत करण्यासाठी आहे, तुम्ही एकटे नाही."
  };

  // Help numbers
  const helpNumbers = [
    {
      number: "1098",
      name: "बाल हेल्पलाईन",
      description: "मुलांसाठी 24 तास मदत",
      emoji: "📞",
      features: ["विनामूल्य", "गोपनीय", "24/7 उपलब्ध"],
      color: "from-blue-400 to-cyan-400"
    },
    {
      number: "112",
      name: "आपत्कालीन मदत",
      description: "कोणत्याही आपत्तीत मदत",
      emoji: "🚨",
      features: ["सर्व आपत्तींसाठी", "जलद प्रतिसाद", "संपूर्ण भारत"],
      color: "from-red-400 to-orange-400"
    },
    {
      number: "",
      name: "विश्वासू प्रौढ",
      description: "आपल्या जवळचे लोक",
      emoji: "👨‍👩‍👧‍👦",
      features: ["आई-वडील", "शिक्षक", "कुटुंबातील मोठे"],
      color: "from-green-400 to-emerald-400"
    }
  ];

  // Safety scenarios
  const scenarios = [
    {
      id: 1,
      situation: "एक व्यक्ती तुमचे खाजगी अवयव स्पर्श करत आहे",
      options: [
        { text: "मोठ्याने 'नाही' म्हणा", correct: true },
        { text: "ताबडतोब पळून जा", correct: true },
        { text: "विश्वासू प्रौढांना सांगा", correct: true },
        { text: "कुणाला न सांगता शांत रहा", correct: false }
      ]
    },
    {
      id: 2,
      situation: "कोणी तुम्हाला 'कोणाला सांगू नको' असे म्हणत आहे",
      options: [
        { text: "विश्वासू प्रौढांना सांगा", correct: true },
        { text: "1098 वर कॉल करा", correct: true },
        { text: "त्यांचे म्हणणे मानून घ्या", correct: false },
        { text: "आपल्या मित्रांना सांगा", correct: true }
      ]
    }
  ];

  // Handle card flip
  const handleCardFlip = (cardId) => {
    if (!flippedCards.includes(cardId)) {
      setFlippedCards([...flippedCards, cardId]);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
  };

  // Navigation functions
  const goToNext = () => {
    const sectionOrder = Object.keys(sections);
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex < sectionOrder.length - 1) {
      setCurrentSection(sectionOrder[currentIndex + 1]);
    }
  };

  const goToPrev = () => {
    const sectionOrder = Object.keys(sections);
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sectionOrder[currentIndex - 1]);
    }
  };

  // Download certificate as PNG
  const downloadCertificatePNG = () => {
    const certificateElement = certificateRef.current;

    if (!certificateElement) return;

    // Temporarily adjust for image capture
    const originalWidth = certificateElement.style.width;
    const originalHeight = certificateElement.style.height;

    certificateElement.style.width = '1200px';
    certificateElement.style.height = 'auto';

    html2canvas(certificateElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fef3c7',
      logging: false,
    }).then(canvas => {
      // Restore original styles
      certificateElement.style.width = originalWidth;
      certificateElement.style.height = originalHeight;

      const link = document.createElement('a');
      link.download = `स्पर्शज्ञान-प्रमाणपत्र-${userName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  // Print certificate function
  const printCertificate = () => {
    const certificateElement = certificateRef.current;
    if (!certificateElement) return;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('कृपया पॉप-अप ब्लॉकर डिसेबल करा आणि पुन्हा प्रयत्न करा');
      return;
    }

    // Get the certificate HTML
    const certificateHTML = certificateElement.innerHTML;

    // Create print document with proper styling
    const printDocument = `
      <!DOCTYPE html>
      <html lang="mr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>स्पर्शज्ञान प्रमाणपत्र - ${userName}</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          @media print {
            body {
              margin: 0;
              padding: 0;
              background-color: #fef3c7 !important;
            }
            .certificate-container {
              width: 100% !important;
              height: 100vh !important;
              margin: 0 !important;
              padding: 0 !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            .certificate-content {
              transform: scale(0.95) !important;
              transform-origin: center !important;
            }
            .no-print {
              display: none !important;
            }
          }
          @page {
            margin: 0;
            size: A4 landscape;
          }
          body {
            font-family: 'Arial', 'Noto Sans Devanagari', sans-serif;
            background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        </style>
      </head>
      <body>
        <div class="certificate-container">
          <div class="certificate-content">
            ${certificateHTML}
          </div>
        </div>
        <script>
          // Auto-print when window loads
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            }, 500);
          };
          
          // Fallback close after 10 seconds
          setTimeout(function() {
            window.close();
          }, 10000);
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(printDocument);
    printWindow.document.close();
  };

  // Render Intro Screen
  const renderIntro = () => (
    <div className="h-full flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-6">
        <div className="text-6xl mb-4 animate-bounce">👩‍🏫</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-2">
          सुरक्षा शिकूया!
        </h1>
        <p className="text-gray-600">
          "घेऊया शिक्षणाचे धन, रोग अज्ञानापासून लांब"
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 max-w-md">
        <h2 className="text-lg font-semibold text-blue-800 mb-3">
          या मॉड्यूलमध्ये तुम्ही शिकणार:
        </h2>
        <ul className="text-left space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>तुमचे खाजगी अवयव ओळखणे</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>चांगला-वाईट स्पर्श समजणे</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>POCSO कायद्याची माहिती</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>मदत क्रमांक जाणून घेणे</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>योग्य कृती करणे शिकणे</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500">🏆</span>
            <span className="font-semibold">प्रमाणपत्र मिळवणे</span>
          </li>
        </ul>
      </div>

      <button
        onClick={() => setCurrentSection("privateParts")}
        className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        सुरू करा! 🚀
      </button>
    </div>
  );

  // Render Private Parts Section
  const renderPrivateParts = () => (
    <div className="h-full flex flex-col p-4">
      <h1 className="text-xl sm:text-2xl font-bold text-blue-800 text-center mb-4">
        तुमचे शरीर - तुमचा अधिकार 👤
      </h1>
      <p className="text-gray-600 text-center text-sm mb-6">
        तुमचे शरीर तुमचेच आहे! खाजगी भागांची ओळख करून घ्या.
      </p>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {privatePartsInfo.map((part, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-3 rounded-xl ${part.private
                ? part.warning
                  ? 'bg-red-50 border-2 border-red-300'
                  : 'bg-pink-50 border-2 border-pink-300'
                : 'bg-blue-50 border-2 border-blue-200'
                }`}
            >
              <div className="text-3xl mb-2">{part.emoji}</div>
              <h3 className={`font-bold text-sm text-center ${part.private ? 'text-red-700' : 'text-blue-700'
                }`}>
                {part.name}
              </h3>
              <p className="text-xs text-gray-600 text-center mt-1">
                {part.description}
              </p>
              {part.private && part.warning && (
                <div className="mt-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                  🔒 खाजगी
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
          <h3 className="font-bold text-orange-800 mb-2">💡 महत्वाचे:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• स्विमसूटने झाकलेले भाग खाजगी आहेत</li>
            <li>• कोणालाही तुमची परवानगी न घेता स्पर्श करण्याचा अधिकार नाही</li>
            <li>• खाजगी भाग स्वच्छ राखा</li>
            <li>• अस्वस्थ वाटल्यास ताबडतोब सांगा</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentSection("intro")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm"
        >
          ← मागे
        </button>
        <button
          onClick={() => setCurrentSection("goodBadTouch")}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm"
        >
          पुढे →
        </button>
      </div>
    </div>
  );

  // Render Good Bad Touch Section
  const renderGoodBadTouch = () => (
    <div className="h-full flex flex-col p-4">
      <h1 className="text-xl sm:text-2xl font-bold text-blue-800 text-center mb-4">
        स्पर्श ओळखा - सुरक्षित रहा ✋
      </h1>
      <p className="text-gray-600 text-center text-sm mb-6">
        चांगला-वाईट स्पर्श ओळखणे शिका
      </p>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 mb-6">
          {touchCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardFlip(card.id)}
              className={`cursor-pointer transition-all duration-300 ${flippedCards.includes(card.id) ? 'opacity-75' : ''
                }`}
            >
              <div className={`bg-gradient-to-r ${card.color} rounded-xl p-4 shadow-lg`}>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{card.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{card.title}</h3>
                    {flippedCards.includes(card.id) ? (
                      <ul className="mt-2 space-y-1">
                        {card.examples.map((example, idx) => (
                          <li key={idx} className="text-white/90 text-sm flex items-start gap-1">
                            <span>•</span> {example}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-white/80 text-sm">टॅप करून जाणून घ्या</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
          <h3 className="font-bold text-purple-800 mb-2">🎯 लक्षात ठेवा:</h3>
          <p className="text-sm text-gray-700">
            तुम्हाला अस्वस्थ वाटत असेल तर <span className="font-bold text-red-600">'नाही'</span> म्हणण्याचा तुम्हाला पूर्ण अधिकार आहे!
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentSection("privateParts")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm"
        >
          ← मागे
        </button>
        <button
          onClick={() => setCurrentSection("pocsoLaw")}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm"
        >
          पुढे →
        </button>
      </div>
    </div>
  );

  // Render POCSO Law Section
  const renderPOCSOLaw = () => (
    <div className="h-full flex flex-col p-4">
      <h1 className="text-xl sm:text-2xl font-bold text-blue-800 text-center mb-4">
        {pocsoInfo.title} {pocsoInfo.emoji}
      </h1>
      <p className="text-gray-600 text-center text-sm mb-6">
        "भारतात POCSO कायदा मुलांचे संरक्षण करण्यासाठी आहे"
      </p>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border-2 border-blue-300">
          <div className="flex items-start gap-3">
            <div className="text-3xl">{pocsoInfo.emoji}</div>
            <div>
              <h3 className="font-bold text-blue-800 mb-2">तुमचे संरक्षण कवच:</h3>
              <ul className="space-y-2">
                {pocsoInfo.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <h4 className="font-bold text-green-800 mb-2">कायद्याची मुख्य गोष्टी:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• मुलांचे वय १८ वर्षांखालील</li>
              <li>• सर्व प्रकारचे लैंगिक अत्याचार गुन्हा</li>
              <li>• विशेष न्यायालये</li>
              <li>• मुलांसाठी सोयीस्कर प्रक्रिया</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
            <h4 className="font-bold text-amber-800 mb-2">तुम्ही काय करू शकता:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• अत्याचार झाल्यास ताबडतोब सांगा</li>
              <li>• पुरावे सुरक्षित ठेवा</li>
              <li>• विश्वासू प्रौढांना सांगा</li>
              <li>• हेल्पलाइनवर कॉल करा</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200">
          <p className="text-sm text-gray-700 text-center font-medium">
            "कोणताही अवैध/असुरक्षित वर्तन चुकीचे आहे आणि ते थांबवण्यासाठी कायदा आहे"
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentSection("goodBadTouch")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm"
        >
          ← मागे
        </button>
        <button
          onClick={() => setCurrentSection("helpNumbers")}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm"
        >
          पुढे →
        </button>
      </div>
    </div>
  );

  // Render Help Numbers Section
  const renderHelpNumbers = () => (
    <div className="h-full flex flex-col p-4">
      <h1 className="text-xl sm:text-2xl font-bold text-blue-800 text-center mb-4">
        मदत क्रमांक - तुमची सुरक्षा 📞
      </h1>
      <p className="text-gray-600 text-center text-sm mb-6">
        कोणत्याही वेळी मदत मागण्यास संकोच करू नका
      </p>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 mb-6">
          {helpNumbers.map((help, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${help.color} rounded-xl p-4 shadow-lg`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{help.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white text-xl">
                      {help.number} {help.number && "•"} {help.name}
                    </h3>
                    {help.number && (
                      <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs">
                        24/7
                      </span>
                    )}
                  </div>
                  <p className="text-white/90 text-sm mb-2">{help.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {help.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-white/30 text-white px-2 py-0.5 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 mb-4">
          <h3 className="font-bold text-green-800 mb-2">📝 मदत मागताना:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• आपले नाव आणि वय सांगा</li>
            <li>• घडलेल्या गोष्टीचे तपशील सांगा</li>
            <li>• आपली स्थिती सांगा</li>
            <li>• मदतीचा प्रकार सांगा</li>
            <li>• कोणत्या ठिकाणी आहात ते सांगा</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border border-red-200">
          <p className="text-sm text-red-700 font-medium text-center">
            ⚠️ गरज पडल्यास ताबडतोब मदत मागा! ⚠️
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentSection("pocsoLaw")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm"
        >
          ← मागे
        </button>
        <button
          onClick={() => setCurrentSection("scenario")}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm"
        >
          परिस्थिती पहा →
        </button>
      </div>
    </div>
  );

  // Render Scenario Section
  const renderScenario = () => (
    <div className="h-full flex flex-col p-4">
      <h1 className="text-xl sm:text-2xl font-bold text-blue-800 text-center mb-4">
        योग्य निवड करा 🎯
      </h1>
      <p className="text-gray-600 text-center text-sm mb-6">
        परिस्थितीनुसार योग्य कृती निवडा
      </p>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">👧</div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">परिस्थिती:</h3>
              <p className="text-gray-700 text-sm">
                "एक मुलगी अस्वस्थ वाटते. कोणी तिच्याशी चुकीच्या पद्धतीने वागत आहे..."
              </p>
            </div>
          </div>

          {/* Warning symbol for unsafe situation */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">⚠️</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <h3 className="font-bold text-gray-800">तुम्ही काय कराल?</h3>

          {scenarios[0].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${selectedAnswer === index
                ? option.correct
                  ? 'bg-green-100 border-2 border-green-400'
                  : 'bg-red-100 border-2 border-red-400'
                : 'bg-white hover:bg-gray-50 border border-gray-200'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedAnswer === index
                  ? option.correct
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-gray-200'
                  }`}>
                  {selectedAnswer === index && (option.correct ? '✓' : '✗')}
                </div>
                <span className="font-medium">{option.text}</span>
              </div>
            </button>
          ))}
        </div>

        {showFeedback && selectedAnswer !== null && (
          <div className={`rounded-xl p-4 mb-4 animate-pulse ${scenarios[0].options[selectedAnswer].correct
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
            }`}>
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {scenarios[0].options[selectedAnswer].correct ? '🏆' : '💡'}
              </span>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">
                  {scenarios[0].options[selectedAnswer].correct
                    ? 'छान! योग्य निर्णय!'
                    : 'चला योग्य उत्तर पाहू:'}
                </h4>
                <p className="text-sm text-gray-700">
                  {scenarios[0].options[selectedAnswer].correct
                    ? 'तुम्ही योग्य कृती निवडली. ताबडतोब मदत मागणे महत्वाचे आहे.'
                    : 'अस्वस्थ वाटल्यास ताबडतोब "ना" म्हणा आणि विश्वासू प्रौढांना सांगा.'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
          <h4 className="font-bold text-purple-800 mb-2">💭 विचार करा:</h4>
          <p className="text-sm text-gray-700">
            कोणत्याही अत्याचारासाठी तुम्ही एकटे नाही. मदत नेहमी उपलब्ध आहे.
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentSection("helpNumbers")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm"
        >
          ← मागे
        </button>
        <button
          onClick={() => setCurrentSection("ending")}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm"
        >
          समापन पहा →
        </button>
      </div>
    </div>
  );

  // Render Ending Section
  const renderEnding = () => (
    <div className="h-full flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md">
        <div className="relative mb-6">
          <div className="text-6xl mb-2">👧</div>
          <div className="absolute -top-2 -right-4 text-4xl">🛡️</div>
          <div className="absolute -bottom-2 -left-4 text-4xl">🌟</div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-4">
          तू शूर आहेस! 💪
        </h1>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 mb-6 border-2 border-purple-200">
          <p className="text-lg text-gray-800 mb-3 font-bold">
            "तू शूर आहेस, कायदा तुझ्यासोबत आहे."
          </p>
          <p className="text-gray-600 text-sm">
            आता तुला माहिती आहे की तू एकटी नाहीस
            आणि मदत नेहमी उपलब्ध आहे.
          </p>
        </div>

        {/* What you learned */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white p-3 rounded-xl text-center border border-blue-200 shadow-sm">
            <div className="text-2xl mb-1">🔒</div>
            <span className="text-xs font-medium">खाजगी अवयव</span>
          </div>
          <div className="bg-white p-3 rounded-xl text-center border border-green-200 shadow-sm">
            <div className="text-2xl mb-1">✋</div>
            <span className="text-xs font-medium">स्पर्श ओळख</span>
          </div>
          <div className="bg-white p-3 rounded-xl text-center border border-purple-200 shadow-sm">
            <div className="text-2xl mb-1">🛡️</div>
            <span className="text-xs font-medium">POCSO कायदा</span>
          </div>
          <div className="bg-white p-3 rounded-xl text-center border border-red-200 shadow-sm">
            <div className="text-2xl mb-1">📞</div>
            <span className="text-xs font-medium">मदत क्रमांक</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setCurrentSection("certificate")}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
          >
            🏆 प्रमाणपत्र मिळवा
          </button>
          <button
            onClick={() => { navigate('/') }}
            className="w-full px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold rounded-full hover:scale-105 transition-transform"
          >
            पुन्हा खेळा 🔄
          </button>
        </div>
      </div>
    </div>
  );

  // Render Certificate Section
  const renderCertificate = () => (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-50 flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-800 mb-2">
            🎉 तुमचे प्रमाणपत्र 🎉
          </h1>
          
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">
            स्पर्शज्ञान कार्यक्रम यशस्वीरित्या पूर्ण केल्याबद्दल अभिनंदन!
          </p>
        </div>

        {/* Certificate Container */}
        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden border-4 sm:border-6 md:border-8 border-yellow-300 mb-4 sm:mb-6">
          {/* Certificate Design */}
          <div
            ref={certificateRef}
            className="p-3 sm:p-6 md:p-8 bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-50 min-h-[60vh] sm:min-h-[70vh] flex flex-col relative"
            style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(251, 191, 36, 0.1) 0%, transparent 55%), radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.1) 0%, transparent 55%)'
            }}
          >
            {/* Decorative Border Pattern */}
            <div className="absolute top-0 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-400"></div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-t-2 sm:border-t-3 md:border-t-4 border-l-2 sm:border-l-3 md:border-l-4 border-amber-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-t-2 sm:border-t-3 md:border-t-4 border-r-2 sm:border-r-3 md:border-r-4 border-amber-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-b-2 sm:border-b-3 md:border-b-4 border-l-2 sm:border-l-3 md:border-l-4 border-amber-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-b-2 sm:border-b-3 md:border-b-4 border-r-2 sm:border-r-3 md:border-r-4 border-amber-400"></div>

            {/* Certificate Content */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-1 sm:px-4 md:px-6">
              {/* Certificate Header */}
              <div className="text-center mb-3 sm:mb-6 md:mb-8">
                <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 mb-1 sm:mb-2 tracking-wide">
                  प्रमाणपत्र
                </div>

                 <div className="text-center order-3">
                   
                    <div className="text-xs text-gray-600 mt-1">
                      <img width={200} height={200} src="/body-parts/sparshdnyan.png" alt="Description" />
                    </div>
                  </div>

                <div className="text-xs sm:text-sm md:text-lg lg:text-xl text-amber-700 mb-2 sm:mb-3">
                  स्पर्शज्ञान बाल सुरक्षा प्रशिक्षण
                </div>
                <div className="h-0.5 sm:h-1 w-3/4 mx-auto bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
              </div>

              {/* Main Certificate Body */}
              <div className="text-center w-full max-w-2xl">
                <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-3 sm:mb-6">
                  या प्रमाणपत्राने प्रमाणित केले जाते की
                </p>

                {/* Name Display */}
                <div className="my-3 sm:my-6 md:my-8 lg:my-10">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-purple-800 mb-1 sm:mb-2 px-2 sm:px-4 py-2 sm:py-3 md:py-4 lg:py-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl md:rounded-2xl border border-purple-200 shadow-inner">
                    {userName}
                  </div>
                  <div className="w-3/4 mx-auto h-0.5 sm:h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-1 sm:mt-2 md:mt-3 lg:mt-4"></div>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-gray-800 mb-3 sm:mb-6 leading-relaxed px-1 sm:px-2">
                  यांनी "स्पर्शज्ञान - शरीर ओळखा" या बाल सुरक्षा प्रशिक्षण कार्यक्रमात
                  सर्व विषय यशस्वीरित्या पूर्ण केले आहेत.
                </p>

                {/* Achievement Details */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 mb-3 sm:mb-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">
                    📚 कार्यक्रमात समाविष्ट विषय:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
                    <div className="flex items-start gap-1 sm:gap-2">
                      <span className="text-green-500 text-sm sm:text-base">✓</span>
                      <span className="text-left">शरीराचे खाजगी अवयव</span>
                    </div>
                    <div className="flex items-start gap-1 sm:gap-2">
                      <span className="text-green-500 text-sm sm:text-base">✓</span>
                      <span className="text-left">चांगला-वाईट स्पर्श ओळख</span>
                    </div>
                    <div className="flex items-start gap-1 sm:gap-2">
                      <span className="text-green-500 text-sm sm:text-base">✓</span>
                      <span className="text-left">POCSO कायद्याची माहिती</span>
                    </div>
                    <div className="flex items-start gap-1 sm:gap-2">
                      <span className="text-green-500 text-sm sm:text-base">✓</span>
                      <span className="text-left">मदत क्रमांक आणि सुरक्षा</span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                  <p className="text-xs sm:text-sm text-gray-700 italic px-2 sm:px-4 font-medium">
                    "तुमचे शरीर - तुमचा अधिकार, तुमची सुरक्षा - तुमची जबाबदारी"
                  </p>
                </div>
              </div>

              {/* Certificate Footer */}
              <div className="w-full border-t border-amber-300 pt-2 sm:pt-4 md:pt-6 mt-2 sm:mt-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 md:gap-8">
                  {/* Date */}
                  <div className="text-center sm:text-left order-2 sm:order-1">
                    <div className="font-bold text-gray-800 text-xs sm:text-sm">दिनांक:</div>
                    <div className="text-gray-700 text-xs sm:text-sm">
                      {new Date().toLocaleDateString('mr-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>

                  {/* Signature */}
                  <div className="text-center order-1 sm:order-2 mb-2 sm:mb-0">
                    <div className="font-bold text-gray-800 text-xs sm:text-sm mb-1">सही</div>
                    <div className="w-16 sm:w-20 h-0.5 bg-gray-800 mx-auto mb-1"></div>
                    <div className="text-gray-700 font-semibold text-xs sm:text-sm">स्पर्शज्ञान प्रकल्प</div>
                  </div>

                  {/* Seal */}
                 
                </div>
              </div>

              {/* Watermark */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold opacity-10 -z-10 pointer-events-none select-none rotate-[-15deg]">
                सुरक्षा
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center mb-4 sm:mb-6">
          <button
            onClick={printCertificate}
            className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-1 sm:gap-2 hover:from-green-600 hover:to-emerald-700"
          >
            <span className="text-lg">🖨️</span>
            <span className="text-xs sm:text-sm md:text-base">प्रिंट करा</span>
          </button>



          <button
            onClick={() => navigate('/')}
            className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg sm:rounded-xl hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-1 sm:gap-2 hover:from-purple-600 hover:to-pink-600"
          >
            <span className="text-lg">🏠</span>
            <span className="text-xs sm:text-sm md:text-base">मुख्य पृष्ठ</span>
          </button>

          <button
            onClick={() => setCurrentSection("ending")}
            className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-bold rounded-lg sm:rounded-xl hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-1 sm:gap-2 hover:from-gray-600 hover:to-gray-800"
          >
            <span className="text-lg">←</span>
            <span className="text-xs sm:text-sm md:text-base">मागे</span>
          </button>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg p-2 sm:p-3 md:p-4 inline-block max-w-lg">
            <p className="text-xs text-gray-700 flex items-center justify-center gap-1 sm:gap-2">
              <span className="text-red-500 text-sm">ℹ️</span>
              प्रिंट करण्यासाठी बटण दाबा, प्रिंट डायलॉगमध्ये "मार्जिन" → "काहीही नाही" निवडा आणि "प्रिंट" दाबा.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render function
  const renderContent = () => {
    switch (currentSection) {
      case "intro": return renderIntro();
      case "privateParts": return renderPrivateParts();
      case "goodBadTouch": return renderGoodBadTouch();
      case "pocsoLaw": return renderPOCSOLaw();
      case "helpNumbers": return renderHelpNumbers();
      case "scenario": return renderScenario();
      case "ending": return renderEnding();
      case "certificate": return renderCertificate();
      default: return renderIntro();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 overflow-auto">
      {/* Only show progress bar for main sections, not for certificate */}
      {currentSection !== "intro" && currentSection !== "ending" && currentSection !== "certificate" && (
        <div className="px-4 pt-4 pb-2 max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-600">
              {sections[currentSection]}
            </span>
            <span className="text-xs text-gray-500">
              {Object.keys(sections).indexOf(currentSection)}/{Object.keys(sections).length - 3}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-1 rounded-full transition-all duration-500"
              style={{
                width: `${((Object.keys(sections).indexOf(currentSection)) / (Object.keys(sections).length - 3)) * 100}%`
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`${currentSection === "certificate" ? "" : "max-w-md mx-auto"} px-2 sm:px-4`}>
        {renderContent()}
      </div>

      {/* Bottom Info - Hide for certificate */}
      {currentSection !== "certificate" && currentSection !== "intro" && (
        <div className="px-4 py-3 max-w-md mx-auto">
          <p className="text-center text-xs text-gray-500">
            "घेऊया शिक्षणाचे धन, रोग अज्ञानापासून लांब"
          </p>
        </div>
      )}

      {/* Audio button for intro */}
      {currentSection === "intro" && (
        <div className="mt-4 ml-4 flex justify-between items-center max-w-md mx-auto">
          <button
            onClick={playAudio}
            className="text-sm text-purple-600 hover:text-purple-800"
          >
            🔊 ऐका
          </button>
          <audio ref={audioRef} src={info5} />
        </div>
      )}

      {/* Footer - Hide for certificate */}
      {currentSection !== "certificate" && (
        <div className="mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 text-center text-gray-500 text-sm max-w-md mx-auto">
          <p>COEP Sparshadhyan प्रकल्प • Child Safety Education Platform</p>
        </div>
      )}
    </div>
  );
};

export default LevelFive;