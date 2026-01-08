import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextLevel from './NextLevel';
import faithCircleAudio from "../../assets/audio/faithcircle.mp3";
import testTouch from "../../assets/audio/testTouch.mp3";

const Level2 = ({ onLevelComplete }) => {
  const navigate = useNavigate();
  
  
  const [audioSrc, setAudioSrc] = useState(faithCircleAudio);
  const [step, setStep] = useState(1); // 1: Create circle, 2: Test touch safety
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);
  
  // Touch testing state
  const [currentTestPerson, setCurrentTestPerson] = useState(null);
  const [testedPeople, setTestedPeople] = useState([]);
  const [touchResults, setTouchResults] = useState({});
  const [currentBodyPart, setCurrentBodyPart] = useState(null);
  const [testingComplete, setTestingComplete] = useState(false);


  function handleClick() {
    navigate('/level3');
  }

  const audioRef = React.useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();     // restart audio
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  // Complete circle creation
  const handleCompleteCircle = () => {
    const trustedRelationships = ['family', 'doctor', 'teacher', 'guard', 'friends'];

    const selectedTrusted = selectedPeople.filter(id => {
      const person = people.find(p => p.id === id);
      return person && trustedRelationships.includes(person.relationship);
    }).length;

    // 👇 NEW PART (only this is added)
    setAudioSrc(testTouch);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    const selectedStrangers = selectedPeople.filter(id => {
      const person = people.find(p => p.id === id);
      return person && person.relationship === 'stranger';
    }).length;
    
    if (selectedStrangers > 0) {
      setFeedback('काही निवड केलेल्या लोकांना तुमच्या विश्वासाच्या वर्तुळात नसावे. पुन्हा प्रयत्न करा!');
    } else if (selectedTrusted < 5) {
      setFeedback(`किमान ५ विश्वासू लोकांना तुमच्या वर्तुळात समाविष्ट करा. (सध्या ${selectedTrusted} आहेत)`);
    } else {
      setFeedback('उत्कृष्ट! तुमचे विश्वासाचे वर्तुळ तयार झाले आहे. आता स्पर्श तपासणीसाठी पुढे जा.');
      // Reset testing state
      setTestedPeople([]);
      setTouchResults({});
      setCurrentTestPerson(null);
      setCurrentBodyPart(null);
      setTestingComplete(false);
      
      setTimeout(() => setStep(2), 1500);
    }
  };

  // Reset circle
  const handleResetCircle = () => {
    setSelectedPeople([]);
    setFeedback('');
    setCurrentTestPerson(null);
    setTestedPeople([]);
    setTouchResults({});
    setCurrentBodyPart(null);
    setTestingComplete(false);
  };

  // Start touch test for a person
  const startTouchTest = (personId) => {
    const person = people.find(p => p.id === personId);
    if (!person) return;
    
    setCurrentTestPerson(personId);
    setCurrentBodyPart(null);
    setFeedback(`${person.name} चा स्पर्श तपासणी सुरू करा. शरीराच्या भागांवर क्लिक करून तपासा.`);
  };

  // Check if touch is safe for current person and body part
  const checkTouchSafety = (bodyPartId) => {
    if (!currentTestPerson) return;
    
    const person = people.find(p => p.id === currentTestPerson);
    const bodyPart = bodyParts.find(bp => bp.id === bodyPartId);
    
    setCurrentBodyPart(bodyPartId);
    
    const rules = touchRules[person.name];
    const isSafe = rules.safe.includes(bodyPartId);
    
    // Create result object
    const result = {
      personId: currentTestPerson,
      personName: person.name,
      bodyPartId: bodyPartId,
      bodyPartName: bodyPart.name,
      isSafe: isSafe,
      emoji: isSafe ? '✅' : '⛔',
      explanation: isSafe ? rules.safeExplanation : rules.unsafeExplanation
    };
    
    // Update results
    setTouchResults(prev => ({
      ...prev,
      [`${currentTestPerson}-${bodyPartId}`]: result
    }));
    
    // Add person to tested list if not already
    if (!testedPeople.includes(currentTestPerson)) {
      setTestedPeople([...testedPeople, currentTestPerson]);
    }
    
    // Show feedback
    if (isSafe) {
      setFeedback(`✅ ${person.name} चा ${bodyPart.name} वरचा स्पर्श सुरक्षित आहे. ${rules.safeExplanation}`);
    } else {
      setFeedback(`⛔ ${person.name} चा ${bodyPart.name} वरचा स्पर्श सुरक्षित नाही! ${rules.unsafeExplanation}`);
    }
  };

  // Complete testing for current person
  const completePersonTest = () => {
    if (!currentTestPerson) return;
    
    const person = people.find(p => p.id === currentTestPerson);
    setFeedback(`${person.name} ची स्पर्श तपासणी पूर्ण झाली. दुसर्या व्यक्तीची तपासणी करा.`);
    setCurrentTestPerson(null);
    setCurrentBodyPart(null);
  };

  // Check if all people have been tested
  const checkAllTested = () => {
    return selectedPeople.every(personId => testedPeople.includes(personId));
  };

  // Complete the level
  const handleCompleteLevel = () => {
    if (checkAllTested()) {
      setFeedback('अभिनंदन! तुम्ही सर्व व्यक्तींची स्पर्श तपासणी पूर्ण केली आहे! 🎉');
      setTestingComplete(true);
      setTimeout(() => {
        if (onLevelComplete) onLevelComplete();
      }, 3000);
    } else {
      setFeedback('कृपया सर्व व्यक्तींची स्पर्श तपासणी पूर्ण करा.');
    }
  };

  // Get results for a specific person
  const getPersonResults = (personId) => {
    return Object.values(touchResults).filter(result => result.personId === personId);
  };

  // Calculate test progress
  const testProgress = selectedPeople.length > 0 
    ? Math.round((testedPeople.length / selectedPeople.length) * 100)
    : 0;

  // Handle person selection for circle
  const handlePersonSelect = (person) => {
    if (selectedPeople.includes(person.id)) {
      setSelectedPeople(selectedPeople.filter(id => id !== person.id));
      setFeedback(`${person.name} वर्तुळातून काढले.`);
    } else {
      setSelectedPeople([...selectedPeople, person.id]);
      setFeedback(`${person.name} वर्तुळात समाविष्ट केले.`);
    }
  };

  // Body parts with safety information
  const bodyParts = [
    { id: 'head', name: 'डोके', emoji: '🧠', safeFor: ['family', 'doctor'], isSensitive: false },
    { id: 'shoulder', name: 'खांदा', emoji: '💪', safeFor: ['family', 'friends', 'teacher'], isSensitive: false },
    { id: 'chest', name: 'छाती', emoji: '❤️', safeFor: ['family', 'doctor'], isSensitive: true },
    { id: 'stomach', name: 'पोट', emoji: '🩹', safeFor: ['family', 'doctor'], isSensitive: true },
    { id: 'arm', name: 'हात', emoji: '🤚', safeFor: ['family', 'friends', 'teacher', 'guard'], isSensitive: false },
    { id: 'leg', name: 'पाय', emoji: '🦵', safeFor: ['family', 'friends', 'teacher', 'guard'], isSensitive: false },
    { id: 'private', name: 'खाजगी भाग', emoji: '🛡️', safeFor: ['doctor'], isSensitive: true },
    { id: 'back', name: 'पाठ', emoji: '🔙', safeFor: ['family', 'doctor'], isSensitive: true },
  ];

  // People with their relationship types
  const people = [
    { id: 1, name: 'आई', emoji: '👩', relationship: 'family' },
    { id: 2, name: 'वडील', emoji: '👨', relationship: 'family' },
    { id: 3, name: 'आजी', emoji: '👵', relationship: 'family' },
    { id: 4, name: 'आजोबा', emoji: '👴', relationship: 'family' },
    { id: 5, name: 'भाऊ', emoji: '👦', relationship: 'family' },
    { id: 6, name: 'बहीण', emoji: '👧', relationship: 'family' },
    { id: 7, name: 'शेजारी', emoji: '🧑', relationship: 'stranger' },
    { id: 8, name: 'शिपाई', emoji: '💂', relationship: 'guard' },
    { id: 9, name: 'शिक्षक', emoji: '👩‍🏫', relationship: 'teacher' },
    { id: 10, name: 'मित्र', emoji: '🧒', relationship: 'friends' },
    { id: 11, name: 'अनोळखी', emoji: '🙍', relationship: 'stranger' },
    { id: 12, name: 'डॉक्टर', emoji: '👩‍⚕️', relationship: 'doctor' },
  ];

  // Touch safety rules - Detailed rules for each person
  const touchRules = {
    'आई': {
      safe: ['head', 'shoulder', 'chest', 'stomach', 'arm', 'leg', 'back'],
      unsafe: ['private'],
      description: 'आईचा स्पर्श बहुतेक भागांवर सुरक्षित आहे, पण खाजगी भागांवर नाही.',
      safeExplanation: 'आई तुमच्या काळजीसाठी स्पर्श करू शकते.',
      unsafeExplanation: 'खाजगी भागांवर कोणाचाही स्पर्श स्वीकार्य नाही.'
    },
    'वडील': {
      safe: ['head', 'shoulder', 'arm', 'leg'],
      unsafe: ['chest', 'stomach', 'private', 'back'],
      description: 'वडिलांचा स्पर्श काही भागांवर सुरक्षित आहे.',
      safeExplanation: 'वडील तुमचे मार्गदर्शन करण्यासाठी स्पर्श करू शकतात.',
      unsafeExplanation: 'गोपनीय भागांवर स्पर्श स्वीकार्य नाही.'
    },
    'आजी': {
      safe: ['head', 'shoulder', 'arm', 'leg', 'back'],
      unsafe: ['chest', 'stomach', 'private'],
      description: 'आजीचा स्पर्श बहुतेक भागांवर सुरक्षित आहे.',
      safeExplanation: 'आजी तुमची काळजी घेण्यासाठी स्पर्श करू शकते.',
      unsafeExplanation: 'गोपनीय भागांवर स्पर्श स्वीकार्य नाही.'
    },
    'आजोबा': {
      safe: ['head', 'shoulder', 'arm', 'leg'],
      unsafe: ['chest', 'stomach', 'private', 'back'],
      description: 'आजोबांचा स्पर्श काही भागांवर सुरक्षित आहे.',
      safeExplanation: 'आजोबा तुमचे मार्गदर्शन करण्यासाठी स्पर्श करू शकतात.',
      unsafeExplanation: 'गोपनीय भागांवर स्पर्श स्वीकार्य नाही.'
    },
    'भाऊ': {
      safe: ['shoulder', 'arm', 'leg'],
      unsafe: ['head', 'chest', 'stomach', 'private', 'back'],
      description: 'भावाचा स्पर्श मर्यादित भागांवर सुरक्षित आहे.',
      safeExplanation: 'भाऊ खेळण्यासाठी किंवा मदतीसाठी स्पर्श करू शकतो.',
      unsafeExplanation: 'गोपनीय भागांवर स्पर्श स्वीकार्य नाही.'
    },
    'बहीण': {
      safe: ['head', 'shoulder', 'arm', 'leg', 'back'],
      unsafe: ['chest', 'stomach', 'private'],
      description: 'बहिणीचा स्पर्श बहुतेक भागांवर सुरक्षित आहे.',
      safeExplanation: 'बहीण तुमची मदत करण्यासाठी स्पर्श करू शकते.',
      unsafeExplanation: 'गोपनीय भागांवर स्पर्श स्वीकार्य नाही.'
    },
    'शेजारी': {
      safe: [],
      unsafe: ['head', 'shoulder', 'chest', 'stomach', 'arm', 'leg', 'private', 'back'],
      description: 'शेजाऱ्यांचा कोणताही स्पर्श सुरक्षित नाही.',
      safeExplanation: '',
      unsafeExplanation: 'अपरिचित व्यक्तींचा स्पर्श नेहमी धोकादायक.'
    },
    'शिपाई': {
      safe: ['arm'],
      unsafe: ['head', 'shoulder', 'chest', 'stomach', 'leg', 'private', 'back'],
      description: 'रक्षकांचा स्पर्श फक्त आपत्कालीन परिस्थितीत.',
      safeExplanation: 'फक्त गरजेच्या वेळी हातावर स्पर्श करू शकतात.',
      unsafeExplanation: 'गोपनीय भागांवर स्पर्श कधीही स्वीकार्य नाही.'
    },
    'शिक्षक': {
      safe: ['shoulder', 'arm'],
      unsafe: ['head', 'chest', 'stomach', 'leg', 'private', 'back'],
      description: 'शिक्षकांचा स्पर्श फक्त विशिष्ट भागांवर.',
      safeExplanation: 'शैक्षणिक मार्गदर्शनासाठी खांदा/हातावर स्पर्श करू शकतात.',
      unsafeExplanation: 'इतर भागांवर स्पर्श स्वीकार्य नाही.'
    },
    'मित्र': {
      safe: ['shoulder', 'arm'],
      unsafe: ['head', 'chest', 'stomach', 'leg', 'private', 'back'],
      description: 'मित्रांचा स्पर्श फक्त हातावर, खांद्यावर.',
      safeExplanation: 'मैत्रीच्या बंधनासाठी हातावर/खांद्यावर स्पर्श करू शकतात.',
      unsafeExplanation: 'गोपनीय भागांवर स्पर्श स्वीकार्य नाही.'
    },
    'अनोळखी': {
      safe: [],
      unsafe: ['head', 'shoulder', 'chest', 'stomach', 'arm', 'leg', 'private', 'back'],
      description: 'अनोळखी व्यक्तीचा कोणताही स्पर्श धोकादायक.',
      safeExplanation: '',
      unsafeExplanation: 'अज्ञात व्यक्तींकडून कोणताही स्पर्श धोकादायक.'
    },
    'डॉक्टर': {
      safe: ['head', 'chest', 'stomach', 'arm', 'leg', 'private', 'back'],
      unsafe: [],
      description: 'डॉक्टरांचा स्पर्श फक्त वैद्यकीय गरजेसाठी.',
      safeExplanation: 'वैद्यकीय तपासणीसाठी सर्व भागांवर स्पर्श करू शकतात.',
      unsafeExplanation: ''
    },
  };

  // Helper functions
  const getRelationshipColor = (relationship) => {
    switch(relationship) {
      case 'family': return 'bg-green-100 text-green-800';
      case 'friends': return 'bg-blue-100 text-blue-800';
      case 'teacher': return 'bg-blue-100 text-blue-800';
      case 'doctor': return 'bg-purple-100 text-purple-800';
      case 'guard': return 'bg-purple-100 text-purple-800';
      case 'stranger': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelationshipText = (relationship) => {
    switch(relationship) {
      case 'family': return 'कुटुंब';
      case 'friends': return 'मित्र';
      case 'teacher': return 'शिक्षक';
      case 'doctor': return 'डॉक्टर';
      case 'guard': return 'रक्षक';
      case 'stranger': return 'अपरिचित';
      default: return 'इतर';
    }
  };

  const getPersonBgColor = (relationship) => {
    switch(relationship) {
      case 'family': return 'bg-green-200';
      case 'friends': return 'bg-blue-200';
      case 'teacher': return 'bg-blue-200';
      case 'doctor': return 'bg-purple-200';
      case 'guard': return 'bg-purple-200';
      case 'stranger': return 'bg-red-200';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-3">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-purple-800">स्पर्शज्ञान</h1>
            <p className="text-sm md:text-base text-pink-600">स्तर २: सुरक्षित स्पर्श</p>
          </div>
          
          {/* Step Indicator */}
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <div className={`px-3 py-1 rounded-full ${step === 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <span className="text-sm font-bold">१. वर्तुळ तयार करा</span>
            </div>
            <div className="text-gray-400">→</div>
            <div className={`px-3 py-1 rounded-full ${step === 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <span className="text-sm font-bold">२. स्पर्श तपासा</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 border-l-4 border-pink-500 p-3 rounded-r-lg mb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-purple-800 text-sm mb-1">
                  {step === 1 ? 'विश्वासाचे वर्तुळ तयार करा' : 'सुरक्षित स्पर्श तपासा'}
                </h3>
                <p className="text-xs text-gray-700">
                  {step === 1 
                    ? 'तुमच्या आयुष्यातील विश्वासू लोकांना निवडा (किमान ५). अजनबी लोकांना निवडू नका.'
                    : 'वर्तुळातील प्रत्येक व्यक्तीसाठी, शरीराच्या वेगवेगळ्या भागांवर स्पर्श सुरक्षित आहे का ते तपासा.'
                  }
                </p>
              </div>
              <button 
                onClick={() => setShowInstructions(false)}
                className="bg-pink-500 text-white px-2 py-1 rounded text-xs ml-2"
              >
                झालं
              </button>
            </div>
          </div>
        )}

        {/* Feedback Area */}
        {feedback && (
          <div className={`p-3 rounded-lg text-center font-medium mb-4 ${feedback.includes('अभिनंदन') ? 'bg-green-100 text-green-800 border border-green-300' : feedback.includes('⛔') ? 'bg-red-100 text-red-800 border border-red-300' : feedback.includes('✅') ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-blue-100 text-blue-800 border border-blue-300'}`}>
            {feedback}
          </div>
        )}

        {/* STEP 1: Create Circle */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-xl font-bold text-purple-700 mb-4 text-center">तुमचे विश्वासाचे वर्तुळ तयार करा</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* People Selection */}
              <div>
                <h3 className="text-lg font-bold text-purple-700 mb-3 text-center">व्यक्ती निवडा</h3>
                <div className="grid grid-cols-4 gap-3">
                  {people.map(person => (
                    <button
                      key={person.id}
                      onClick={() => handlePersonSelect(person)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${selectedPeople.includes(person.id) 
                        ? 'bg-blue-100 border-2 border-blue-500 shadow-md' 
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-2xl mb-1">{person.emoji}</div>
                      <div className="font-bold text-sm text-gray-800">{person.name}</div>
                      <div className={`text-xs mt-1 px-2 py-0.5 rounded-full ${getRelationshipColor(person.relationship)}`}>
                        {getRelationshipText(person.relationship)}
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Selection Stats */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedPeople.length}</div>
                      <div className="text-xs text-gray-600">एकूण निवड</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedPeople.filter(id => {
                          const person = people.find(p => p.id === id);
                          return person && person.relationship !== 'stranger';
                        }).length}
                      </div>
                      <div className="text-xs text-gray-600">विश्वासू</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {selectedPeople.filter(id => {
                          const person = people.find(p => p.id === id);
                          return person && person.relationship === 'stranger';
                        }).length}
                      </div>
                      <div className="text-xs text-gray-600">अपरिचित</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Circle Visualization */}
              <div>
                <h3 className="text-lg font-bold text-purple-700 mb-3 text-center">तुमचे विश्वासाचे वर्तुळ</h3>
                
                <div className="relative h-72">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      {/* Outer Circle */}
                      <div className="absolute inset-0 border-4 border-dashed border-blue-300 rounded-full"></div>
                      
                      {/* Inner Circle */}
                      <div className="absolute inset-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                        <div className="text-center">
                          <div className="text-4xl mb-2">👧</div>
                          <div className="font-bold text-lg text-purple-800">मी</div>
                          <div className="text-xs text-gray-600 mt-1">सुरक्षित रहा</div>
                        </div>
                      </div>
                      
                      {/* Selected People */}
                      {selectedPeople.map((personId, index) => {
                        const person = people.find(p => p.id === personId);
                        if (!person) return null;
                        
                        const totalSelected = selectedPeople.length;
                        const angle = (index * 2 * Math.PI) / totalSelected;
                        const radius = 90;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        
                        return (
                          <div
                            key={person.id}
                            className="absolute transition-all duration-500 z-10 transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                              left: `calc(50% + ${x}px)`,
                              top: `calc(50% + ${y}px)`,
                            }}
                          >
                            <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-full shadow ${getPersonBgColor(person.relationship)} border-2 border-white`}>
                              <div className="text-base">{person.emoji}</div>
                              <div className="text-[10px] font-bold">{person.name}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Empty State */}
                  {selectedPeople.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="text-3xl mb-2">👈</div>
                        <p className="text-yellow-700 font-medium">व्यक्ती निवडा</p>
                        <p className="text-yellow-600 text-sm">ते येथे वर्तुळात दिसतील</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Step 1 Actions */}
                <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleCompleteCircle}
                    disabled={selectedPeople.length < 5}
                    className={`px-6 py-2 rounded-full font-bold text-sm shadow transition-all ${selectedPeople.length >= 5 ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    वर्तुळ पूर्ण करा
                  </button>
                  
                  <button
                    onClick={handleResetCircle}
                    className="px-6 py-2 rounded-full font-bold text-sm bg-gray-500 hover:bg-gray-600 text-white shadow transition-all"
                  >
                    पुन्हा सुरू करा
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Touch Testing */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-purple-700">स्पर्श सुरक्षितता तपासणी</h2>
              {!testingComplete && (
                <div className="bg-blue-50 px-3 py-1 rounded-full">
                  <span className="text-sm font-bold text-blue-700">
                    प्रगती: {testedPeople.length}/{selectedPeople.length} ({testProgress}%)
                  </span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Selected People List for Testing */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-bold text-purple-700 mb-3 text-center">तुमच्या वर्तुळातील लोक</h3>
                <p className="text-sm text-gray-600 mb-4 text-center">प्रत्येक व्यक्तीवर क्लिक करून त्यांचा स्पर्श तपासा</p>
                
                <div className="space-y-3 max-h-96 overflow-y-auto p-2">
                  {selectedPeople.map(personId => {
                    const person = people.find(p => p.id === personId);
                    if (!person) return null;
                    
                    const isTesting = currentTestPerson === personId;
                    const isTested = testedPeople.includes(personId);
                    const personResults = getPersonResults(personId);
                    
                    return (
                      <div
                        key={person.id}
                        className={`p-3 rounded-lg border transition-all cursor-pointer ${isTesting ? 'bg-yellow-50 border-2 border-yellow-400' : isTested ? 'bg-green-50 border border-green-300' : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'}`}
                        onClick={() => startTouchTest(person.id)}
                      >
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{person.emoji}</div>
                          <div className="flex-1">
                            <div className="font-bold text-gray-800 flex items-center">
                              {person.name}
                              {isTesting && <span className="ml-2 text-xs bg-yellow-500 text-white px-2 py-0.5 rounded animate-pulse">तपासणी सुरू</span>}
                              {isTested && !isTesting && <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded">✅ पूर्ण</span>}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {touchRules[person.name].description}
                            </div>
                          </div>
                          <div className={`px-2 py-1 text-xs rounded-full ${getRelationshipColor(person.relationship)}`}>
                            {getRelationshipText(person.relationship)}
                          </div>
                        </div>
                        
                        {/* Show test results if tested */}
                        {isTested && personResults.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <div className="text-xs text-gray-700 mb-1">
                              <span className="font-bold">तपासणी निकाल:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {personResults.slice(0, 4).map(result => (
                                <div
                                  key={result.bodyPartId}
                                  className={`px-2 py-0.5 text-xs rounded ${result.isSafe ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                >
                                  {result.emoji} {result.bodyPartName}
                                </div>
                              ))}
                              {personResults.length > 4 && (
                                <div className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">
                                  +{personResults.length - 4}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Testing Completion Status */}
                {checkAllTested() && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-300">
                    <div className="text-center">
                      <div className="text-xl mb-2">🎉 सर्व तपासणी पूर्ण!</div>
                      <p className="text-sm text-green-800 mb-3">
                        तुम्ही सर्व व्यक्तींची स्पर्श तपासणी पूर्ण केली आहे.
                      </p>
                      <button
                        onClick={handleCompleteLevel}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold text-sm"
                      >
                        पातळी पूर्ण करा
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Current Person Testing Area */}
              <div className="lg:col-span-2">
                {currentTestPerson ? (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-purple-700">
                          {people.find(p => p.id === currentTestPerson)?.name} ची स्पर्श तपासणी
                        </h3>
                        <p className="text-sm text-gray-600">
                          शरीराच्या भागांवर क्लिक करून तपासा की {people.find(p => p.id === currentTestPerson)?.name} चा स्पर्श सुरक्षित आहे का
                        </p>
                      </div>
                      <button
                        onClick={completePersonTest}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-bold"
                      >
                        ✅ तपासणी पूर्ण करा
                      </button>
                    </div>
                    
                    {/* Body Parts Testing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Body Visualization */}
                      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg border-2 border-purple-200 p-4">
                        <div className="text-center mb-4">
                          <div className="text-5xl mb-2">👧</div>
                          <div className="font-bold text-lg text-purple-800">तुमचे शरीर</div>
                          <div className="text-sm text-gray-600">भागांवर क्लिक करून स्पर्श तपासा</div>
                        </div>
                        
                        {/* Body Parts Grid */}
                        <div className="grid grid-cols-4 gap-3">
                          {bodyParts.map(part => {
                            const resultKey = `${currentTestPerson}-${part.id}`;
                            const result = touchResults[resultKey];
                            const isTested = !!result;
                            
                            return (
                              <button
                                key={part.id}
                                onClick={() => checkTouchSafety(part.id)}
                                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${currentBodyPart === part.id ? 'ring-2 ring-yellow-400 ring-offset-2' : ''} ${isTested ? (result.isSafe ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400') : 'bg-white border border-gray-300 hover:bg-gray-50'}`}
                              >
                                <div className="text-2xl mb-1">{part.emoji}</div>
                                <div className="font-bold text-sm text-gray-800">{part.name}</div>
                                {isTested && (
                                  <div className={`text-xs mt-1 px-2 py-0.5 rounded-full ${result.isSafe ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                    {result.emoji} {result.isSafe ? 'सुरक्षित' : 'धोकादायक'}
                                  </div>
                                )}
                                {part.isSensitive && !isTested && (
                                  <div className="text-xs mt-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                                    🛡️ संवेदनशील
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Results Display */}
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200 p-4">
                        <h4 className="text-lg font-bold text-blue-800 mb-3 text-center">तपासणी निकाल</h4>
                        
                        {currentBodyPart ? (
                          <div className="space-y-4">
                            {/* Current Test Result */}
                            {(() => {
                              const resultKey = `${currentTestPerson}-${currentBodyPart}`;
                              const result = touchResults[resultKey];
                              const person = people.find(p => p.id === currentTestPerson);
                              const bodyPart = bodyParts.find(bp => bp.id === currentBodyPart);
                              
                              if (result) {
                                return (
                                  <div className={`p-4 rounded-lg ${result.isSafe ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                                    <div className="flex items-center justify-center mb-2">
                                      <div className="text-3xl mr-3">{person.emoji}</div>
                                      <div className="text-3xl">+</div>
                                      <div className="text-3xl ml-3">{bodyPart.emoji}</div>
                                    </div>
                                    <div className="text-center">
                                      <div className={`text-2xl font-bold mb-2 ${result.isSafe ? 'text-green-700' : 'text-red-700'}`}>
                                        {result.isSafe ? '✅ सुरक्षित स्पर्श' : '⛔ धोकादायक स्पर्श'}
                                      </div>
                                      <div className="text-lg font-bold mb-2">
                                        {person.name} → {bodyPart.name}
                                      </div>
                                      <div className="text-sm text-gray-700 mb-3">
                                        {result.explanation}
                                      </div>
                                      <div className={`text-xs px-3 py-1 rounded-full inline-block ${result.isSafe ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                        {result.isSafe ? 'हा स्पर्श स्वीकार्य आहे' : 'हा स्पर्श टाळावा'}
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div className="text-center p-8">
                                    <div className="text-4xl mb-4">❓</div>
                                    <p className="text-gray-700 mb-2">
                                      {person.name} चा {bodyPart.name} वरचा स्पर्श सुरक्षित आहे का?
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      वरील बटणावर क्लिक करून तपासा
                                    </p>
                                  </div>
                                );
                              }
                            })()}
                            
                            {/* All Results for Current Person */}
                            <div>
                              <h5 className="font-bold text-blue-800 mb-2">सर्व तपासणी निकाल:</h5>
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {getPersonResults(currentTestPerson).map(result => (
                                  <div
                                    key={result.bodyPartId}
                                    className={`flex items-center p-2 rounded ${result.isSafe ? 'bg-green-50' : 'bg-red-50'}`}
                                  >
                                    <div className="text-xl mr-2">{result.emoji}</div>
                                    <div className="flex-1">
                                      <div className="font-medium">{result.bodyPartName}</div>
                                      <div className="text-xs text-gray-600">{result.explanation}</div>
                                    </div>
                                    <div className={`px-2 py-1 text-xs rounded ${result.isSafe ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                      {result.isSafe ? 'सुरक्षित' : 'धोकादायक'}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-8">
                            <div className="text-5xl mb-4">👆</div>
                            <p className="text-gray-700 mb-2">
                              शरीराच्या भागांवर क्लिक करून सुरुवात करा
                            </p>
                            <p className="text-sm text-gray-600">
                              प्रत्येक भागावर क्लिक करून तपासा की स्पर्श सुरक्षित आहे का
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300">
                    <div className="text-6xl mb-4">👈</div>
                    <h3 className="text-xl font-bold text-purple-800 mb-2">स्पर्श तपासणी सुरू करा</h3>
                    <p className="text-gray-700 mb-4">
                      डावीकडील कोणत्याही व्यक्तीवर क्लिक करून तिच्या स्पर्शाची तपासणी सुरू करा.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-2xl mb-2">✅</div>
                        <div className="font-bold text-sm text-green-700">सुरक्षित स्पर्श</div>
                        <div className="text-xs text-gray-600">स्वीकार्य भागावर स्पर्श</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-2xl mb-2">⛔</div>
                        <div className="font-bold text-sm text-red-700">धोकादायक स्पर्श</div>
                        <div className="text-xs text-gray-600">टाळावयाचे स्पर्श</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-2 rounded-full font-bold text-sm bg-blue-500 hover:bg-blue-600 text-white shadow transition-all"
                  >
                    ↶ वर्तुळात परत जा
                  </button>
                  
                  <button
                    onClick={() => {
                      setCurrentTestPerson(null);
                      setTestedPeople([]);
                      setTouchResults({});
                      setCurrentBodyPart(null);
                      setTestingComplete(false);
                      setFeedback('सर्व तपासणी पुन्हा सुरू केली.');
                    }}
                    className="px-6 py-2 rounded-full font-bold text-sm bg-gray-500 hover:bg-gray-600 text-white shadow transition-all"
                  >
                    🔄 सर्व तपासणी पुन्हा करा
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <NextLevel/>

        {/* Global Actions */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={playAudio}
            className="text-sm text-purple-600 hover:text-purple-800"
          >
            🔊 ऐका
          </button>

          <audio ref={audioRef} src={audioSrc} />

          <div className="text-xs text-gray-500">
            COEP Sparshadhyan प्रकल्प
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level2;