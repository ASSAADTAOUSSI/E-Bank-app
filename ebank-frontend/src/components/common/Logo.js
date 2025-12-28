import React from 'react';
import './Logo.css';

function Logo({ size = 'medium', showText = true }) {
  const sizeMap = {
    small: { width: 32, height: 32, fontSize: '1rem' },
    medium: { width: 48, height: 48, fontSize: '1.5rem' },
    large: { width: 64, height: 64, fontSize: '2rem' }
  };

  const dimensions = sizeMap[size] || sizeMap.medium;

  return (
    <div className="logo-container">
      <div 
        className="logo-icon"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoShieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="logoInnerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          
          <path d="M256 80L200 110V180C200 240 220 280 256 320C292 280 312 240 312 180V110L256 80Z" fill="url(#logoShieldGradient)"/>
          <path d="M256 120L220 140V180C220 220 235 250 256 280C277 250 292 220 292 180V140L256 120Z" fill="url(#logoInnerGradient)"/>
          <path d="M200 200H280V220H220V240H280V260H220V280H280V300H200V200Z" fill="white"/>
          <circle cx="256" cy="360" r="30" fill="#059669"/>
          <circle cx="256" cy="360" r="20" fill="#10b981"/>
          <path d="M246 350L256 360L266 350" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <path d="M246 370L256 360L266 370" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
        </svg>
      </div>
      {showText && (
        <span 
          className="logo-text"
          style={{ fontSize: dimensions.fontSize }}
        >
          eBank
        </span>
      )}
    </div>
  );
}

export default Logo;
