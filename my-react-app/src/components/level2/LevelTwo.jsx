import React, { useState, useEffect } from 'react';

const Level2 = ({ onLevelComplete }) => {
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [activePerson, setActivePerson] = useState(null);
  const [touchFeedback, setTouchFeedback] = useState(null);
  const [highlightedBodyPart, setHighlightedBodyPart] = useState(null);
  
  // Update window height on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Body parts with safety information
  const bodyParts = [
    { id: 'head', name: 'डोके', emoji: '🧠', safeFor: ['family', 'doctor'], position: { top: '10%', left: '50%' } },
    { id: 'shoulder', name: 'खांदा', emoji: '💪', safeFor: ['family', 'friends', 'teacher'], position: { top: '25%', left: '30%' } },
    { id: 'chest', name: 'छाती', emoji: '❤️', safeFor: ['family', 'doctor'], position: { top: '30%', left: '50%' } },
    { id: 'stomach', name: 'पोट', emoji: '🩹', safeFor: ['family', 'doctor'], position: { top: '45%', left: '50%' } },
    { id: 'arm', name: 'हात', emoji: '🤚', safeFor: ['family', 'friends', 'teacher', 'guard'], position: { top: '40%', left: '15%' } },
    { id: 'leg', name: 'पाय', emoji: '🦵', safeFor: ['family', 'friends', 'teacher', 'guard'], position: { top: '70%', left: '30%' } },
    { id: 'private', name: 'खाजगी अवयव', emoji: '🛡️', safeFor: ['doctor'], position: { top: '55%', left: '50%' } },
    { id: 'back', name: 'पाठ', emoji: '🔙', safeFor: ['family', 'doctor'], position: { top: '35%', left: '70%' } },
  ];

  // People with their relationship types and touch permissions
  const people = [
    { 
      id: 1, 
      name: 'आई', 
      emoji: '👩', 
      relationship: 'family',
      description: 'आईचा स्पर्श सुरक्षित आहे, पण खाजगी अवयवांवर नाही.',
      safeTouches: ['head', 'shoulder', 'chest', 'stomach', 'arm', 'leg', 'back'],
      unsafeTouches: ['private']
    },
    { 
      id: 2, 
      name: 'वडील', 
      emoji: '👨', 
      relationship: 'family',
      description: 'वडिलांचा स्पर्श सुरक्षित आहे, पण खाजगी अवयवांवर नाही.',
      safeTouches: ['head', 'shoulder', 'arm', 'leg', 'back'],
      unsafeTouches: ['chest', 'stomach', 'private']
    },
    { 
      id: 3, 
      name: 'आजी', 
      emoji: '👵', 
      relationship: 'family',
      description: 'आजीचा स्पर्श सुरक्षित आहे, पण खाजगी अवयवांवर नाही.',
      safeTouches: ['head', 'shoulder', 'chest', 'stomach', 'arm', 'leg', 'back'],
      unsafeTouches: ['private']
    },
    { 
      id: 4, 
      name: 'आजोबा', 
      emoji: '👴', 
      relationship: 'family',
      description: 'आजोबांचा स्पर्श सुरक्षित आहे, पण खाजगी अवयवांवर नाही.',
      safeTouches: ['head', 'shoulder', 'arm', 'leg', 'back'],
      unsafeTouches: ['chest', 'stomach', 'private']
    },
    { 
      id: 5, 
      name: 'भाऊ', 
      emoji: '👦', 
      relationship: 'family',
      description: 'भावाचा हातावर, खांद्यावर स्पर्श सुरक्षित आहे.',
      safeTouches: ['head', 'shoulder', 'arm', 'leg'],
      unsafeTouches: ['chest', 'stomach', 'private', 'back']
    },
    { 
      id: 6, 
      name: 'बहीण', 
      emoji: '👧', 
      relationship: 'family',
      description: 'बहिणीचा स्पर्श सुरक्षित आहे, पण खाजगी अवयवांवर नाही.',
      safeTouches: ['head', 'shoulder', 'chest', 'stomach', 'arm', 'leg', 'back'],
      unsafeTouches: ['private']
    },
    { 
      id: 7, 
      name: 'शेजारी', 
      emoji: '🧑', 
      relationship: 'stranger',
      description: 'शेजाऱ्यांचा कोणताही स्पर्श सुरक्षित नाही.',
      safeTouches: [],
      unsafeTouches: ['head', 'shoulder', 'chest', 'stomach', 'arm', 'leg', 'private', 'back']
    },
    { 
      id: 8, 
      name: 'शपाई', 
      emoji: '💂', 
      relationship: 'guard',
      description: 'रक्षकांचा स्पर्श फक्त आपत्कालीन परिस्थितीत.',
      safeTouches: ['arm'],
      unsafeTouches: ['head', 'shoulder', 'chest', 'stomach', 'leg', 'private', 'back']
    },
    { 
      id: 9, 
      name: 'शिक्षक', 
      emoji: '👩‍🏫', 
      relationship: 'teacher',
      description: 'शिक्षकांचा स्पर्श फक्त खांद्यावर, हातावर.',
      safeTouches: ['shoulder', 'arm'],
      unsafeTouches: ['head', 'chest', 'stomach', 'leg', 'private', 'back']
    },
    { 
      id: 10, 
      name: 'मित्र', 
      emoji: '🧒', 
      relationship: 'friends',
      description: 'मित्रांचा स्पर्श फक्त हातावर, खांद्यावर.',
      safeTouches: ['shoulder', 'arm'],
      unsafeTouches: ['head', 'chest', 'stomach', 'leg', 'private', 'back']
    },
    { 
      id: 11, 
      name: 'अनोळखी', 
      emoji: '🙍', 
      relationship: 'stranger',
      description: 'अनोळखी व्यक्तीचा कोणताही स्पर्श धोकादायक.',
      safeTouches: [],
      unsafeTouches: ['head', 'shoulder', 'chest', 'stomach', 'arm', 'leg', 'private', 'back']
    },
    { 
      id: 12, 
      name: 'डॉक्टर', 
      emoji: '👩‍⚕️', 
      relationship: 'doctor',
      description: 'डॉक्टरांचा स्पर्श फक्त वैद्यकीय गरजेसाठी.',
      safeTouches: ['head', 'chest', 'stomach', 'arm', 'leg', 'private', 'back'],
      unsafeTouches: []
    },
  ];

  const handlePersonClick = (person) => {
    if (selectedPeople.includes(person.id)) {
      // If already selected, remove from circle
      setSelectedPeople(selectedPeople.filter(id => id !== person.id));
      if (activePerson === person.id) {
        setActivePerson(null);
        setTouchFeedback(null);
      }
      setFeedback('');
    } else {
      // Add to circle
      setSelectedPeople([...selectedPeople, person.id]);
      setFeedback(`${person.name} विश्वासाच्या वर्तुळात समाविष्ट केले. आता त्यांवर क्लिक करून स्पर्श तपासा.`);
    }
  };

  const handlePersonInCircleClick = (personId) => {
    const person = people.find(p => p.id === personId);
    if (!person) return;
    
    setActivePerson(personId);
    setTouchFeedback(null);
    setHighlightedBodyPart(null);
    
    // Show initial touch information
    setFeedback(`${person.name}: ${person.description}`);
  };

  const checkTouchSafety = (personId, bodyPartId) => {
    const person = people.find(p => p.id === personId);
    if (!person) return;
    
    const isSafe = person.safeTouches.includes(bodyPartId);
    const bodyPart = bodyParts.find(bp => bp.id === bodyPartId);
    
    setHighlightedBodyPart(bodyPartId);
    
    if (isSafe) {
      setTouchFeedback({
        type: 'safe',
        message: `✅ ${person.name} चा ${bodyPart.name} वरचा स्पर्श सुरक्षित आहे.`,
        person: person.name,
        bodyPart: bodyPart.name
      });
    } else {
      setTouchFeedback({
        type: 'danger',
        message: `⛔ ${person.name} चा ${bodyPart.name} वरचा स्पर्श सुरक्षित नाही!`,
        person: person.name,
        bodyPart: bodyPart.name
      });
    }
  };

  const handleCheckCircle = () => {
    const trustedRelationships = ['family', 'doctor', 'teacher', 'guard', 'friends'];
    const selectedTrusted = selectedPeople.filter(id => {
      const person = people.find(p => p.id === id);
      return trustedRelationships.includes(person.relationship);
    }).length;
    
    const selectedStrangers = selectedPeople.filter(id => {
      const person = people.find(p => p.id === id);
      return person.relationship === 'stranger';
    }).length;
    
    if (selectedTrusted >= 6 && selectedStrangers === 0) {
      setFeedback('अभिनंदन! तुम्ही तुमचे विश्वासाचे वर्तुळ योग्यरित्या तयार केले आहे! 🎉');
      setTimeout(() => {
        if (onLevelComplete) onLevelComplete();
      }, 2000);
    } else if (selectedStrangers > 0) {
      setFeedback('काही निवड केलेल्या लोकांना तुमच्या विश्वासाच्या वर्तुळात नसावे. पुन्हा प्रयत्न करा!');
    } else {
      setFeedback('तुम्ही आणखी काही विश्वासू लोकांना तुमच्या वर्तुळात समाविष्ट करू शकता.');
    }
  };

  const handleReset = () => {
    setSelectedPeople([]);
    setActivePerson(null);
    setTouchFeedback(null);
    setHighlightedBodyPart(null);
    setFeedback('');
  };

  // Calculate dynamic height
  const containerHeight = Math.max(windowHeight - 20, 650);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 p-2 md:p-4" style={{ height: containerHeight }}>
      {/* Main Container */}
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-purple-800">स्पर्शज्ञान</h1>
            <p className="text-sm md:text-base text-pink-600">स्तर २: सुरक्षित स्पर्श तपासणी</p>
          </div>
          <div className="bg-white rounded-lg shadow px-4 py-2">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mr-2">
                <span className="text-sm">👧</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-800">स्पर्श तपासा</h3>
                <p className="text-xs text-gray-600">व्यक्ती + शरीर अवयव निवडा</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 border-l-4 border-pink-500 p-3 rounded-r-lg shadow-sm mb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-purple-800 mb-1">कसे खेळायचे?</h3>
                <ol className="text-sm text-gray-700 list-decimal pl-5 space-y-1">
                  <li>डावीकडील व्यक्ती निवडा (वर्तुळात जातील)</li>
                  <li>वर्तुळातील व्यक्तीवर क्लिक करा</li>
                  <li>मुलगीच्या शरीरावरील अवयव निवडा</li>
                  <li>तो स्पर्श सुरक्षित की नाही ते पहा</li>
                  <li>किमान ६ विश्वासू व्यक्ती निवडा</li>
                </ol>
              </div>
              <button 
                onClick={() => setShowInstructions(false)}
                className="bg-pink-500 text-white px-3 py-1 rounded-lg hover:bg-pink-600 transition text-sm ml-2"
              >
                झालं
              </button>
            </div>
          </div>
        )}

        {/* Feedback Area */}
        <div className="mb-3">
          {feedback && (
            <div className={`p-3 rounded-lg text-center font-medium ${feedback.includes('अभिनंदन') ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-yellow-100 text-yellow-800 border border-yellow-300'}`}>
              <div className="flex items-center justify-center">
                {feedback.includes('अभिनंदन') && <span className="text-xl mr-2">🎉</span>}
                <span className="text-sm md:text-base">{feedback}</span>
              </div>
            </div>
          )}
          
          {touchFeedback && (
            <div className={`mt-2 p-3 rounded-lg text-center font-bold ${touchFeedback.type === 'safe' ? 'bg-green-100 text-green-800 border-2 border-green-400' : 'bg-red-100 text-red-800 border-2 border-red-400'}`}>
              <div className="flex items-center justify-center">
                <span className="text-2xl mr-2">{touchFeedback.type === 'safe' ? '✅' : '⛔'}</span>
                <span className="text-lg">{touchFeedback.message}</span>
              </div>
              {touchFeedback.type === 'danger' && (
                <p className="text-sm text-red-600 mt-1 font-normal">"नाही" म्हणा आणि ताबडतोब मदतीला हाक मारा!</p>
              )}
            </div>
          )}
        </div>

        {/* Main Game Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          {/* Left Panel - People Selection */}
          <div className="bg-white rounded-xl shadow p-4 lg:col-span-1 overflow-hidden">
            <div className="h-full flex flex-col">
              <h3 className="text-lg font-bold text-purple-700 mb-3 text-center">व्यक्ती निवडा</h3>
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-3">
                  {people.map(person => (
                    <button
                      key={person.id}
                      onClick={() => handlePersonClick(person)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 ${selectedPeople.includes(person.id) 
                        ? 'bg-blue-50 border-2 border-blue-500 shadow-sm' 
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                      } ${activePerson === person.id ? 'ring-2 ring-purple-400 ring-offset-1' : ''}`}
                      title={person.description}
                    >
                      <div className="text-2xl md:text-3xl mb-1">{person.emoji}</div>
                      <div className="font-bold text-sm text-gray-800">{person.name}</div>
                      <div className={`text-xs mt-1 px-2 py-1 rounded-full ${getRelationshipColor(person.relationship)}`}>
                        {getRelationshipText(person.relationship)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Selection Stats */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedPeople.filter(id => {
                        const person = people.find(p => p.id === id);
                        return person && person.relationship !== 'stranger';
                      }).length}
                    </div>
                    <div className="text-xs text-green-700">विश्वासू</div>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {selectedPeople.filter(id => {
                        const person = people.find(p => p.id === id);
                        return person && person.relationship === 'stranger';
                      }).length}
                    </div>
                    <div className="text-xs text-red-700">अपरिचित</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Girl Body and Circle */}
          <div className="bg-white rounded-xl shadow p-4 lg:col-span-2 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-purple-700">स्पर्श तपासणी</h3>
                {activePerson && (
                  <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    <span className="text-sm text-blue-700">
                      निवडले: {people.find(p => p.id === activePerson)?.name}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Girl Body */}
                <div className="relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border-2 border-purple-200 p-4">
                  <h4 className="text-center font-bold text-purple-800 mb-2">मुलगीचे शरीर</h4>
                  
                  {/* Girl Body Illustration */}
                  <div className="relative h-64 md:h-72 mx-auto">
                    {/* Body Outline */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-40 h-64">
                        {/* Head */}
                        <div className={`absolute w-16 h-16 rounded-full bg-pink-100 border-4 ${highlightedBodyPart === 'head' ? 'border-yellow-400 bg-yellow-100' : 'border-pink-300'} top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center`}>
                          <span className="text-xl">👧</span>
                        </div>
                        
                        {/* Neck */}
                        <div className="absolute w-4 h-4 bg-pink-100 top-16 left-1/2 transform -translate-x-1/2"></div>
                        
                        {/* Shoulders */}
                        <div className={`absolute w-32 h-8 rounded-full bg-pink-100 border-2 ${highlightedBodyPart === 'shoulder' ? 'border-yellow-400 bg-yellow-100' : 'border-pink-300'} top-20 left-1/2 transform -translate-x-1/2`}></div>
                        
                        {/* Chest */}
                        <div className={`absolute w-20 h-12 bg-pink-100 border-2 ${highlightedBodyPart === 'chest' ? 'border-yellow-400 bg-yellow-100' : 'border-pink-300'} top-28 left-1/2 transform -translate-x-1/2 rounded-lg`}></div>
                        
                        {/* Stomach */}
                        <div className={`absolute w-16 h-12 bg-pink-100 border-2 ${highlightedBodyPart === 'stomach' ? 'border-yellow-400 bg-yellow-100' : 'border-pink-300'} top-40 left-1/2 transform -translate-x-1/2 rounded-lg`}></div>
                        
                        {/* Private Area (with shield) */}
                        <div className={`absolute w-12 h-8 bg-red-50 border-2 ${highlightedBodyPart === 'private' ? 'border-red-400 bg-red-100' : 'border-red-300'} top-52 left-1/2 transform -translate-x-1/2 rounded-lg flex items-center justify-center`}>
                          <span className="text-lg">🛡️</span>
                        </div>
                        
                        {/* Arms */}
                        <div className={`absolute w-24 h-4 bg-pink-100 border-2 ${highlightedBodyPart === 'arm' ? 'border-yellow-400 bg-yellow-100' : 'border-pink-300'} top-32 left-0 rounded-r-full`}></div>
                        <div className={`absolute w-24 h-4 bg-pink-100 border-2 ${highlightedBodyPart === 'arm' ? 'border-yellow-400 bg-yellow-100' : 'border-pink-300'} top-32 right-0 rounded-l-full`}></div>
                        
                        {/* Legs */}
                        <div className={`absolute w-8 h-24 bg-pink-100 border-2 ${highlightedBodyPart === 'leg' ? 'border-yellow-400 bg-yellow-100' : 'border-pink-300'} top-56 left-1/4 rounded-b-full`}></div>
                        <div className={`absolute w-8 h-24 bg-pink-100 border-2 ${highlightedBodyPart === 'leg' ? 'border-yellow-400 bg-yellow-100' : 'border-pink-300'} top-56 right-1/4 rounded-b-full`}></div>
                        
                        {/* Back indicator */}
                        <div className={`absolute w-20 h-24 bg-pink-50 border-2 ${highlightedBodyPart === 'back' ? 'border-yellow-400 bg-yellow-100' : 'border-pink-200'} top-24 left-1/2 transform -translate-x-1/2 rounded-lg`}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg opacity-60">🔙</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Body Part Labels */}
                    <div className="absolute top-4 right-4 space-y-1">
                      {bodyParts.map(part => (
                        <button
                          key={part.id}
                          onClick={() => activePerson && checkTouchSafety(activePerson, part.id)}
                          disabled={!activePerson}
                          className={`flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all ${highlightedBodyPart === part.id ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-white border border-gray-300'} ${!activePerson ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 hover:shadow'}`}
                        >
                          <span className="mr-2">{part.emoji}</span>
                          {part.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Instruction for body parts */}
                  <div className="text-center mt-2">
                    <p className="text-sm text-gray-600">
                      {activePerson 
                        ? 'वरील शरीर अवयवांवर क्लिक करून स्पर्श तपासा' 
                        : 'प्रथम वर्तुळातील व्यक्ती निवडा'}
                    </p>
                  </div>
                </div>
                
                {/* Circle Visualization */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-4">
                  <h4 className="text-center font-bold text-purple-800 mb-2">विश्वासाचे वर्तुळ</h4>
                  
                  <div className="relative h-64 md:h-72">
                    {/* Circle Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-64 h-64">
                        {/* Outer Circle */}
                        <div className="absolute inset-0 border-4 border-dashed border-blue-300 rounded-full"></div>
                        
                        {/* Inner Circle */}
                        <div className="absolute inset-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                          <div className="text-center">
                            <div className="text-4xl mb-1">👧</div>
                            <div className="font-bold text-purple-800">मी</div>
                          </div>
                        </div>
                        
                        {/* Selected People in Circle */}
                        {selectedPeople.map((personId, index) => {
                          const person = people.find(p => p.id === personId);
                          if (!person) return null;
                          
                          const totalSelected = selectedPeople.length;
                          const angle = (index * 2 * Math.PI) / totalSelected;
                          const radius = 100;
                          const x = Math.cos(angle) * radius;
                          const y = Math.sin(angle) * radius;
                          
                          return (
                            <button
                              key={person.id}
                              onClick={() => handlePersonInCircleClick(person.id)}
                              className={`absolute transition-all duration-500 z-10 transform -translate-x-1/2 -translate-y-1/2 ${activePerson === person.id ? 'ring-4 ring-yellow-400 ring-offset-2' : ''}`}
                              style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                              }}
                            >
                              <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-lg ${getPersonBgColor(person.relationship)} border-2 ${activePerson === person.id ? 'border-yellow-500' : 'border-white'}`}>
                                <div className="text-lg">{person.emoji}</div>
                                <div className="text-xs font-bold mt-1">{person.name}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Empty Circle Message */}
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
                  
                  {/* Circle Instructions */}
                  <div className="text-center mt-2">
                    <p className="text-sm text-gray-600">
                      वर्तुळातील व्यक्तीवर क्लिक करा, मग शरीर अवयव निवडा
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                  <button
                    onClick={handleCheckCircle}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center"
                  >
                    <span className="mr-2">✓</span>
                    वर्तुळ तपासा
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center"
                  >
                    <span className="mr-2">↺</span>
                    पुन्हा सुरू करा
                  </button>
                  
                  <button
                    onClick={() => setShowInstructions(!showInstructions)}
                    className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center"
                  >
                    <span className="mr-2">ℹ️</span>
                    {showInstructions ? 'सूचना लपवा' : 'सूचना दाखवा'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Legend */}
        <div className="mt-3 pt-2 border-t border-gray-300">
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span className="text-gray-700">कुटुंब</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
              <span className="text-gray-700">शिक्षक/मित्र</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
              <span className="text-gray-700">डॉक्टर/रक्षक</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span className="text-gray-700">अपरिचित</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
              <span className="text-gray-700">निवडलेली व्यक्ती</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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

export default Level2;