import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FiLogOut, FiLock, FiChevronDown, FiUser, FiMoon, FiSun } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import ChangePasswordModal from './ChangePasswordModal';
import './Sidebar.css';

function Sidebar({ navItems, userRole }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      logout();
    }
  };

  return (
    <>
      <aside className="modern-sidebar">
        <div className="sidebar-content">
          {/* Logo Section */}
          <div className="sidebar-logo">
            <Logo size="medium" showText={true} />
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="sidebar-link"
                end={item.exact || false}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            
            {/* Theme Toggle */}
            <div className="theme-toggle-wrapper">
              <button 
                className="theme-toggle-btn"
                onClick={toggleTheme}
                title={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
                aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
              >
                <div className="theme-toggle-icon">
                  {theme === 'light' ? <FiMoon /> : <FiSun />}
                </div>
                <span className="theme-toggle-text">
                  {theme === 'light' ? 'Mode sombre' : 'Mode clair'}
                </span>
              </button>
            </div>
          </nav>

          {/* User Profile Section */}
          <div className="sidebar-footer">
            <div 
              className="sidebar-user"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-avatar">
                <FiUser />
              </div>
              <div className="user-info">
                <div className="user-name">{user?.login || 'Utilisateur'}</div>
                <div className="user-email">{userRole === 'AGENT_GUICHET' ? 'Agent' : 'Client'}</div>
              </div>
              <FiChevronDown className={`user-dropdown ${showUserMenu ? 'open' : ''}`} />
            </div>

            {showUserMenu && (
              <div className="user-menu">
                <button
                  className="user-menu-item"
                  onClick={() => {
                    setShowPasswordModal(true);
                    setShowUserMenu(false);
                  }}
                >
                  <FiLock />
                  <span>Changer mot de passe</span>
                </button>
                <button
                  className="user-menu-item"
                  onClick={handleLogout}
                >
                  <FiLogOut />
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </>
  );
}

export default Sidebar;
