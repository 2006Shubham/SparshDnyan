import React, { useRef } from 'react';
import { useCertificate } from '../../context/CertificateContext';
import './Certificate.css';

const Certificate = ({ certificateData, isPreview = false }) => {
  const certificateRef = useRef(null);
  
  const certificateDesign = {
    border: "20px solid transparent",
    borderImage: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1) 1",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: "40px",
    position: "relative",
    maxWidth: "800px",
    margin: "0 auto"
  };

  const handleDownload = async () => {
    // Implement download logic
    console.log("Downloading certificate:", certificateData.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `SparshDnyan Certificate - ${certificateData.title}`,
        text: `I completed ${certificateData.title} and earned ${certificateData.credits} credits!`,
        url: window.location.href
      });
    }
  };

  return (
    <div 
      className={`certificate-container ${isPreview ? 'preview-mode' : ''}`}
      ref={certificateRef}
      style={certificateDesign}
    >
      {/* Decorative Corner Elements */}
      <div className="corner top-left">✨</div>
      <div className="corner top-right">🏆</div>
      <div className="corner bottom-left">🛡️</div>
      <div className="corner bottom-right">⭐</div>
      
      {/* Certificate Content */}
      <div className="certificate-header">
        <h1>Certificate of Achievement</h1>
        <h2>SparshDnyan Child Safety Education</h2>
      </div>
      
      <div className="certificate-body">
        <p className="presentation-text">
          This certifies that
        </p>
        
        <div className="learner-name">
          <h3>{certificateData.userName || "Learner"}</h3>
        </div>
        
        <p className="achievement-text">
          has successfully completed the {certificateData.title} module
          with excellence and demonstrated understanding of {certificateData.topic}.
        </p>
        
        <div className="details-section">
          <div className="detail-item">
            <strong>Date:</strong> {new Date(certificateData.date).toLocaleDateString('en-IN')}
          </div>
          <div className="detail-item">
            <strong>Credits Earned:</strong> {certificateData.credits}
          </div>
          <div className="detail-item">
            <strong>Certificate ID:</strong> {certificateData.id}
          </div>
          <div className="detail-item">
            <strong>Level:</strong> {certificateData.level}
          </div>
        </div>
        
        <div className="signature-section">
          <div className="signature">
            <p>_________________________</p>
            <p>SparshDnyan Team</p>
            <p>Child Safety Educators</p>
          </div>
          
          <div className="seal">
            <div className="seal-circle">
              <span>SD</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons (only in full view) */}
      {!isPreview && (
        <div className="certificate-actions">
          <button onClick={handleDownload} className="btn-download">
            📥 Download Certificate
          </button>
          <button onClick={handleShare} className="btn-share">
            🔗 Share Achievement
          </button>
          <button onClick={() => window.print()} className="btn-print">
            🖨️ Print Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default Certificate;