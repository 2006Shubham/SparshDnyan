import React, { useState } from 'react';
import { useCertificate } from '../../context/CertificateContext';

const MasterCertificateModal = () => {
  const { 
    showCertificateModal, 
    setShowCertificateModal, 
    currentCertificate 
  } = useCertificate();
  
  const [isDownloading, setIsDownloading] = useState(false);

  if (!showCertificateModal || !currentCertificate) return null;

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Create simple text certificate
    const certText = `
╔══════════════════════════════════════════╗
║         🏆 MASTER CERTIFICATE 🏆         ║
║    SparshDnyan Child Safety Education    ║
╚══════════════════════════════════════════╝

AWARDED TO: ${currentCertificate.userName}

ACHIEVEMENT: ${currentCertificate.title}

COMPLETION DETAILS:
• Levels Completed: ${currentCertificate.levelsCompleted}/5
• Overall Score: ${currentCertificate.score}%
• Total Credits: ${currentCertificate.credits}
• Completion Date: ${currentCertificate.completionDate}

THIS CERTIFIES COMPREHENSIVE COMPLETION OF
ALL CHILD SAFETY EDUCATION MODULES WITH
EXCELLENT UNDERSTANDING AND MASTERY.

CERTIFICATE ID: ${currentCertificate.id}
ISSUE DATE: ${new Date().toLocaleDateString('en-IN')}

"Empowering children with safety knowledge"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();
    
    const blob = new Blob([certText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SparshDnyan_Master_Certificate_${currentCertificate.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setTimeout(() => {
      alert('✅ Master Certificate Downloaded!');
      setIsDownloading(false);
    }, 500);
  };

  const handleShare = () => {
    const shareText = `🏆 I earned the MASTER CERTIFICATE from SparshDnyan! 🎓\nCompleted all 5 levels with ${currentCertificate.score}% score!\nTotal Credits: ${currentCertificate.credits}\nCertificate ID: ${currentCertificate.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'SparshDnyan Master Certificate',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText)
        .then(() => alert('Certificate details copied! 📋'))
        .catch(() => alert('Could not copy.'));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border-4 border-amber-400">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎓</div>
          <h2 className="text-2xl font-bold text-amber-800">MASTER CERTIFICATE</h2>
          <p className="text-amber-600">SparshDnyan Child Safety Education</p>
        </div>
        
        {/* Certificate Content */}
        <div className="bg-white/90 rounded-xl p-5 mb-6 border-2 border-amber-300">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            {currentCertificate.title}
          </h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Student:</span>
              <span className="font-bold">{currentCertificate.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Score:</span>
              <span className="font-bold text-green-600">{currentCertificate.score}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Credits:</span>
              <span className="font-bold text-blue-600">{currentCertificate.credits}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Levels:</span>
              <span className="font-bold">{currentCertificate.levelsCompleted}/5</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 text-center border-t border-amber-200 pt-3">
            Completed all modules with excellence
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {isDownloading ? 'Downloading...' : '📥 Download Certificate'}
          </button>
          
          <button 
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all"
          >
            📢 Share Achievement
          </button>
          
          <button 
            onClick={() => setShowCertificateModal(false)}
            className="w-full bg-gray-600 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition-all"
          >
            Close
          </button>
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Certificate ID: {currentCertificate.id}</p>
        </div>
      </div>
    </div>
  );
};

export default MasterCertificateModal;