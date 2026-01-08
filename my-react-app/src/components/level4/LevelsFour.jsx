import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import quiz from "../../assets/audio/quiz.mp3"
const LevelFour = ({ onLevelComplete }) => {
  const [step, setStep] = useState(1); // 1: Select person, 2: Quiz, 3: Results
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
    const navigate = useNavigate();


    const audioRef = React.useRef(null);
      
        const playAudio = () => {
          if (audioRef.current) {
            audioRef.current.pause();     // restart audio
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
        };

  function handleClick(){
        navigate('/level5')
  }

  // People available for quiz
  const people = [
    { id: 1, name: 'आई', emoji: '👩', relationship: 'कुटुंब' },
    { id: 2, name: 'वडील', emoji: '👨', relationship: 'कुटुंब' },
    { id: 3, name: 'आजी', emoji: '👵', relationship: 'कुटुंब' },
    { id: 4, name: 'आजोबा', emoji: '👴', relationship: 'कुटुंब' },
    { id: 5, name: 'भाऊ', emoji: '👦', relationship: 'कुटुंब' },
    { id: 6, name: 'बहीण', emoji: '👧', relationship: 'कुटुंब' },
    { id: 7, name: 'शेजारी काका', emoji: '🧑', relationship: 'अपरिचित' },
    { id: 8, name: 'रक्षक काका', emoji: '💂', relationship: 'रक्षक' },
    { id: 9, name: 'शिक्षिका', emoji: '👩‍🏫', relationship: 'शिक्षक' },
    { id: 10, name: 'मित्र', emoji: '🧒', relationship: 'मित्र' },
    { id: 11, name: 'अनोळखी व्यक्ती', emoji: '🙍', relationship: 'अपरिचित' },
    { id: 12, name: 'डॉक्टर आंटी', emoji: '👩‍⚕️', relationship: 'डॉक्टर' },
  ];

  // Quiz questions for different body parts
  const questions = [
    {
      id: 1,
      bodyPart: 'डोके',
      emoji: '🧠',
      correctAnswers: {
        'आई': 'होय',
        'वडील': 'होय',
        'आजी': 'होय',
        'आजोबा': 'होय',
        'भाऊ': 'होय',
        'बहीण': 'होय',
        'शेजारी काका': 'नाही',
        'रक्षक काका': 'नाही',
        'शिक्षिका': 'नाही',
        'मित्र': 'नाही',
        'अनोळखी व्यक्ती': 'नाही',
        'डॉक्टर आंटी': 'होय'
      },
      explanation: {
        होय: 'कुटुंबातील सदस्य आणि डॉक्टर डोक्यावर सुरक्षितपणे स्पर्श करू शकतात.',
        नाही: 'अपरिचित, मित्र, शिक्षक आणि रक्षकांनी डोक्यावर स्पर्श करू नये.'
      }
    },
    {
      id: 2,
      bodyPart: 'खांदा',
      emoji: '💪',
      correctAnswers: {
        'आई': 'होय',
        'वडील': 'होय',
        'आजी': 'होय',
        'आजोबा': 'होय',
        'भाऊ': 'होय',
        'बहीण': 'होय',
        'शेजारी काका': 'नाही',
        'रक्षक काका': 'आपत्कालीन परिस्थितीत',
        'शिक्षिका': 'होय',
        'मित्र': 'होय',
        'अनोळखी व्यक्ती': 'नाही',
        'डॉक्टर आंटी': 'होय'
      },
      explanation: {
        होय: 'कुटुंब, मित्र आणि शिक्षक खांद्यावर सुरक्षित स्पर्श करू शकतात.',
        नाही: 'अपरिचित व्यक्तींनी खांद्यावर स्पर्श करू नये.',
        'आपत्कालीन परिस्थितीत': 'रक्षक फक्त आपत्कालीन परिस्थितीत स्पर्श करू शकतात.'
      }
    },
    {
      id: 3,
      bodyPart: 'छाती',
      emoji: '❤️',
      correctAnswers: {
        'आई': 'होय',
        'वडील': 'नाही',
        'आजी': 'होय',
        'आजोबा': 'नाही',
        'भाऊ': 'नाही',
        'बहीण': 'होय',
        'शेजारी काका': 'नाही',
        'रक्षक काका': 'नाही',
        'शिक्षिका': 'नाही',
        'मित्र': 'नाही',
        'अनोळखी व्यक्ती': 'नाही',
        'डॉक्टर आंटी': 'होय'
      },
      explanation: {
        होय: 'मुलींच्या छातीवर फक्त स्त्री कुटुंब सदस्य आणि डॉक्टर स्पर्श करू शकतात.',
        नाही: 'पुरुष कुटुंब सदस्य, मित्र, शिक्षक आणि इतरांनी छातीवर स्पर्श करू नये.'
      }
    },
    {
      id: 4,
      bodyPart: 'पोट',
      emoji: '🩹',
      correctAnswers: {
        'आई': 'होय',
        'वडील': 'नाही',
        'आजी': 'होय',
        'आजोबा': 'नाही',
        'भाऊ': 'नाही',
        'बहीण': 'होय',
        'शेजारी काका': 'नाही',
        'रक्षक काका': 'नाही',
        'शिक्षिका': 'नाही',
        'मित्र': 'नाही',
        'अनोळखी व्यक्ती': 'नाही',
        'डॉक्टर आंटी': 'होय'
      },
      explanation: {
        होय: 'मुलींच्या पोटावर फक्त स्त्री कुटुंब सदस्य आणि डॉक्टर स्पर्श करू शकतात.',
        नाही: 'पोट हा संवेदनशील भाग आहे, फक्त विशिष्ट व्यक्तींचाच स्पर्श सुरक्षित आहे.'
      }
    },
    {
      id: 5,
      bodyPart: 'हात',
      emoji: '🤚',
      correctAnswers: {
        'आई': 'होय',
        'वडील': 'होय',
        'आजी': 'होय',
        'आजोबा': 'होय',
        'भाऊ': 'होय',
        'बहीण': 'होय',
        'शेजारी काका': 'नाही',
        'रक्षक काका': 'आपत्कालीन परिस्थितीत',
        'शिक्षिका': 'होय',
        'मित्र': 'होय',
        'अनोळखी व्यक्ती': 'नाही',
        'डॉक्टर आंटी': 'होय'
      },
      explanation: {
        होय: 'हात हा सामान्य स्पर्शासाठी सुरक्षित भाग आहे.',
        नाही: 'अपरिचित व्यक्तींनी हातावर सुद्धा स्पर्श करू नये.',
        'आपत्कालीन परिस्थितीत': 'रक्षक फक्त आवश्यकतेनुसार स्पर्श करू शकतात.'
      }
    },
    {
      id: 6,
      bodyPart: 'खाजगी भाग',
      emoji: '🛡️',
      correctAnswers: {
        'आई': 'नाही',
        'वडील': 'नाही',
        'आजी': 'नाही',
        'आजोबा': 'नाही',
        'भाऊ': 'नाही',
        'बहीण': 'नाही',
        'शेजारी काका': 'नाही',
        'रक्षक काका': 'नाही',
        'शिक्षिका': 'नाही',
        'मित्र': 'नाही',
        'अनोळखी व्यक्ती': 'नाही',
        'डॉक्टर आंटी': 'वैद्यकीय गरजेसाठी'
      },
      explanation: {
        नाही: 'खाजगी भागांवर कोणाचाही स्पर्श सुरक्षित नाही.',
        'वैद्यकीय गरजेसाठी': 'फक्त डॉक्टर वैद्यकीय गरजेसाठी आणि संरक्षकांच्या उपस्थितीत स्पर्श करू शकतात.'
      }
    }
  ];

  // Handle person selection
  const handlePersonSelect = (person) => {
    setSelectedPerson(person);
    setStep(2);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setQuizCompleted(false);
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    if (!selectedPerson || showFeedback) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswers[selectedPerson.name];
    const isCorrect = answer === correctAnswer;

    setIsCorrectAnswer(isCorrect);
    setShowFeedback(true);

    // Update answers array
    const newAnswer = {
      questionId: currentQuestion.id,
      userAnswer: answer,
      correctAnswer: correctAnswer,
      isCorrect: isCorrect
    };
    setAnswers([...answers, newAnswer]);

    // Update score if correct
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Move to next question after delay
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setQuizCompleted(true);
        setStep(3);
      }
    }, 2000);
  };

  // Restart quiz with same person
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    setShowFeedback(false);
    setStep(2);
  };

  // Select new person
  const handleSelectNewPerson = () => {
    setSelectedPerson(null);
    setStep(1);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setQuizCompleted(false);
  };

  // Calculate percentage
  const percentage = Math.round((score / questions.length) * 100);

  // Get result message based on score
  const getResultMessage = () => {
    if (percentage >= 90) return 'उत्कृष्ट! तुम्हाला स्पर्श सुरक्षेची पूर्ण माहिती आहे! 🎉';
    if (percentage >= 70) return 'खूप छान! तुम्ही बर्याच गोष्टी जाणता. 👍';
    if (percentage >= 50) return 'चांगले! पण आणखी शिकण्याची गरज आहे. 📚';
    return 'काही गोष्टी शिकणे आवश्यक आहे. पुन्हा प्रयत्न करा! 💪';
  };

  // Get result color
  const getResultColor = () => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Get result emoji
  const getResultEmoji = () => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 70) return '⭐';
    if (percentage >= 50) return '📖';
    return '🔄';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">
            स्पर्शज्ञान - स्तर ४
          </h1>
          <p className="text-lg md:text-xl text-pink-600">
            स्पर्श सुरक्षा क्विझ
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-4">
            <div className={`px-4 py-2 rounded-full ${step === 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <span className="font-bold">१. व्यक्ती निवडा</span>
            </div>
            <div className="text-gray-400">→</div>
            <div className={`px-4 py-2 rounded-full ${step === 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <span className="font-bold">२. क्विझ सोडवा</span>
            </div>
            <div className="text-gray-400">→</div>
            <div className={`px-4 py-2 rounded-full ${step === 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <span className="font-bold">३. निकाल पहा</span>
            </div>
          </div>
        </div>

        {/* STEP 1: Select Person */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
              क्विझसाठी व्यक्ती निवडा
            </h2>
            
            <div className="mb-6">
              <div className="bg-blue-50 p-4 rounded-xl mb-4">
                <p className="text-blue-700 text-center">
                  <span className="font-bold">सूचना:</span> प्रथम एक व्यक्ती निवडा. नंतर त्या व्यक्तीसाठी 
                  स्पर्श सुरक्षेवर प्रश्न सोडवायला मिळतील.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {people.map(person => (
                <button
                  key={person.id}
                  onClick={() => handlePersonSelect(person)}
                  className="group relative p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex flex-col items-center">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {person.emoji}
                    </div>
                    <div className="font-bold text-lg text-gray-800 mb-1">
                      {person.name}
                    </div>
                    <div className={`text-sm px-3 py-1 rounded-full ${person.relationship === 'कुटुंब' ? 'bg-green-100 text-green-800' : person.relationship === 'अपरिचित' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                      {person.relationship}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold animate-pulse">
                    ?
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center bg-purple-50 p-4 rounded-xl">
                <span className="text-3xl mr-3">👆</span>
                <div className="text-left">
                  <p className="font-bold text-purple-700">व्यक्ती निवडण्याची सूचना</p>
                  <p className="text-sm text-gray-600">वरपैकी कोणतीही व्यक्ती क्लिक करा</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Quiz */}
        {step === 2 && selectedPerson && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {/* Selected Person Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-4xl mr-4">{selectedPerson.emoji}</div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-800">तुम्ही निवडलेली व्यक्ती</h3>
                    <p className="text-gray-600">{selectedPerson.name} ({selectedPerson.relationship})</p>
                  </div>
                </div>
                <button
                  onClick={handleSelectNewPerson}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full text-sm font-bold transition-all"
                >
                  बदला 🔄
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>प्रगती: {currentQuestionIndex + 1}/{questions.length}</span>
                <span>गुण: {score}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current Question */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center bg-yellow-50 p-4 rounded-full mb-4">
                  <span className="text-4xl mr-3">{questions[currentQuestionIndex].emoji}</span>
                  <h2 className="text-2xl font-bold text-gray-800">
                    प्रश्न {currentQuestionIndex + 1}: {questions[currentQuestionIndex].bodyPart}
                  </h2>
                </div>
                
                <div className="bg-white p-6 rounded-xl border-2 border-purple-200 shadow-lg">
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                    "{selectedPerson.name} {questions[currentQuestionIndex].bodyPart}वर स्पर्श करू शकतात का?"
                  </p>
                  
                  {/* Answer Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <button
                      onClick={() => handleAnswerSelect('होय')}
                      disabled={showFeedback}
                      className={`p-6 rounded-xl border-2 text-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                        showFeedback 
                          ? questions[currentQuestionIndex].correctAnswers[selectedPerson.name] === 'होय'
                            ? 'bg-green-100 border-green-500 text-green-800 animate-pulse'
                            : 'bg-gray-100 border-gray-300 text-gray-500'
                          : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 hover:border-green-500 hover:bg-green-100 text-green-700'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <span className="text-3xl mr-3">✅</span>
                        <span className="text-2xl">होय</span>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleAnswerSelect('नाही')}
                      disabled={showFeedback}
                      className={`p-6 rounded-xl border-2 text-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                        showFeedback 
                          ? questions[currentQuestionIndex].correctAnswers[selectedPerson.name] === 'नाही'
                            ? 'bg-red-100 border-red-500 text-red-800 animate-pulse'
                            : 'bg-gray-100 border-gray-300 text-gray-500'
                          : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300 hover:border-red-500 hover:bg-red-100 text-red-700'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <span className="text-3xl mr-3">❌</span>
                        <span className="text-2xl">नाही</span>
                      </div>
                    </button>
                  </div>

                  {/* Special Cases Buttons */}
                  {questions[currentQuestionIndex].correctAnswers[selectedPerson.name] === 'आपत्कालीन परिस्थितीत' && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleAnswerSelect('आपत्कालीन परिस्थितीत')}
                        disabled={showFeedback}
                        className={`p-4 w-full rounded-xl border-2 text-lg font-bold transition-all duration-300 ${
                          showFeedback 
                            ? 'bg-yellow-100 border-yellow-500 text-yellow-800 animate-pulse'
                            : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 hover:border-yellow-500 hover:bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <span className="text-2xl mr-3">⚠️</span>
                          <span>आपत्कालीन परिस्थितीत</span>
                        </div>
                      </button>
                    </div>
                  )}

                  {questions[currentQuestionIndex].correctAnswers[selectedPerson.name] === 'वैद्यकीय गरजेसाठी' && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleAnswerSelect('वैद्यकीय गरजेसाठी')}
                        disabled={showFeedback}
                        className={`p-4 w-full rounded-xl border-2 text-lg font-bold transition-all duration-300 ${
                          showFeedback 
                            ? 'bg-blue-100 border-blue-500 text-blue-800 animate-pulse'
                            : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300 hover:border-blue-500 hover:bg-blue-100 text-blue-700'
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <span className="text-2xl mr-3">🏥</span>
                          <span>वैद्यकीय गरजेसाठी</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`mt-6 p-6 rounded-xl border-2 ${
                  isCorrectAnswer ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
                }`}>
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">
                      {isCorrectAnswer ? '🎉' : '💡'}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${isCorrectAnswer ? 'text-green-700' : 'text-red-700'}`}>
                        {isCorrectAnswer ? 'बरोबर उत्तर!' : 'चूक उत्तर!'}
                      </h3>
                      <p className="text-gray-700 mb-2">
                        {questions[currentQuestionIndex].explanation[questions[currentQuestionIndex].correctAnswers[selectedPerson.name]]}
                      </p>
                      <div className="flex items-center mt-3">
                        <span className="text-sm font-medium text-gray-600">
                          योग्य उत्तर: <span className="font-bold">{questions[currentQuestionIndex].correctAnswers[selectedPerson.name]}</span>
                        </span>
                        {isCorrectAnswer ? (
                          <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                            +१ गुण
                          </span>
                        ) : (
                          <span className="ml-4 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold">
                            शिका आणि पुढे जा
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Next Question Countdown */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mr-3"></div>
                      <span className="text-purple-600 font-medium">
                        पुढचा प्रश्न लोड होत आहे...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Results */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center mb-8">
              <div className="inline-block p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                <span className="text-6xl">{getResultEmoji()}</span>
              </div>
              <h2 className="text-3xl font-bold text-purple-800 mb-2">क्विझ पूर्ण!</h2>
              <p className="text-gray-600">{selectedPerson?.name} साठी तुमचे निकाल</p>
            </div>

            {/* Score Card */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-300">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0">
                    <div className="flex items-center mb-4">
                      <div className="text-5xl mr-4">{selectedPerson?.emoji}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{selectedPerson?.name}</h3>
                        <p className="text-gray-600">{selectedPerson?.relationship}</p>
                      </div>
                    </div>
                    <p className="text-lg text-gray-700">
                      तुम्ही {questions.length} पैकी <span className="font-bold text-2xl">{score}</span> प्रश्नांना बरोबर उत्तर दिले.
                    </p>
                  </div>
                  
                  <div className="relative">
                    <div className="text-center">
                      <div className="relative w-48 h-48 mx-auto mb-4">
                        {/* Circular Progress */}
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="96"
                            cy="96"
                            r="84"
                            stroke="#e5e7eb"
                            strokeWidth="12"
                            fill="none"
                          />
                          <circle
                            cx="96"
                            cy="96"
                            r="84"
                            stroke="url(#gradient)"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${percentage * 5.28} 528`}
                            className="transition-all duration-1000"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-5xl font-bold ${getResultColor()}`}>
                            {percentage}%
                          </span>
                          <span className="text-gray-600 mt-2">यशस्वी</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result Message */}
                <div className={`mt-6 p-4 rounded-xl text-center ${percentage >= 70 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <p className="text-xl font-bold mb-2">{getResultMessage()}</p>
                  <p className="text-gray-700">
                    {percentage >= 70 
                      ? 'तुम्हाला स्पर्श सुरक्षेची उत्तम समज आहे!' 
                      : 'आणखी सराव करा आणि ज्ञान वाढवा!'}
                  </p>
                </div>
              </div>
            </div>

            {/* Answers Review */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-purple-700 mb-4">तुमची उत्तरे</h3>
              <div className="space-y-4">
                {answers.map((answer, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-xl border-2 ${answer.isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-2xl mr-4">
                          {questions.find(q => q.id === answer.questionId)?.emoji}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">
                            {questions.find(q => q.id === answer.questionId)?.bodyPart}
                          </p>
                          <p className="text-sm text-gray-600">
                            तुमचे उत्तर: <span className={`font-bold ${answer.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                              {answer.userAnswer}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="text-3xl">
                        {answer.isCorrect ? '✅' : '❌'}
                      </div>
                    </div>
                    {!answer.isCorrect && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-700">
                          <span className="font-bold">योग्य उत्तर:</span> {answer.correctAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleRestartQuiz}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <span className="text-2xl mr-3">🔄</span>
                पुन्हा सुरू करा
              </button>
              
              <button
                onClick={handleSelectNewPerson}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <span className="text-2xl mr-3">👤</span>
                नवीन व्यक्ती निवडा
              </button>
              
              <button
                onClick={()=>handleClick()}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <span className="text-2xl mr-3">🚀</span>
                पुढील स्तरावर जा
              </button>
            </div>
          </div>
        )}

            <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={playAudio}
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    🔊 ऐका
                  </button>
        
                  <audio ref={audioRef} src={quiz} />
        
                  </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>COEP स्पर्शज्ञान प्रकल्प • बाल सुरक्षा शिक्षण क्विझ</p>
          <p className="mt-1">ज्ञान आहे तर सुरक्षा आहे!</p>
        </div>
      </div>
    </div>
  );
};

export default LevelFour;