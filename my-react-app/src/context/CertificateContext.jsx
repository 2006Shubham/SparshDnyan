import React, { createContext, useState, useContext } from 'react';

const CertificateContext = createContext();

export const CertificateProvider = ({ children }) => {
  const [hasCompletedAllLevels, setHasCompletedAllLevels] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [studentName, setStudentName] = useState("Student");

  // Mark completion when level 5 is done
  const markCompletion = (name = "Student") => {
    setHasCompletedAllLevels(true);
    setStudentName(name);
    setShowCertificate(true);
    return true;
  };

  // Simple certificate data
  const getCertificateData = () => {
    return {
      id: `SD-${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN'),
      studentName: studentName,
      completionDate: new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  };

  return (
    <CertificateContext.Provider value={{
      hasCompletedAllLevels,
      markCompletion,
      showCertificate,
      setShowCertificate,
      getCertificateData,
      studentName,
      setStudentName
    }}>
      {children}
    </CertificateContext.Provider>
  );
};

export const useCertificate = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificate must be used within CertificateProvider');
  }
  return context;
};