import React, { useState } from 'react';
import { FiSearch, FiSend } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './DashboardHeader.css';

function DashboardHeader({ onSendMoney, showSendButton = true }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search:', searchQuery);
  };

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <form className="header-search" onSubmit={handleSearch}>
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <kbd className="search-shortcut">⌘K</kbd>
        </form>

        <div className="header-actions">
          {showSendButton && (
            <button 
              className="btn btn-primary header-send-btn"
              onClick={onSendMoney || (() => navigate('/client/virement'))}
            >
              <FiSend />
              <span>Envoyer de l'argent</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
