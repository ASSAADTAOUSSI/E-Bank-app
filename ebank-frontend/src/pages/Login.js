import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiLogIn, FiLock, FiUser, FiShield, FiCreditCard, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import Logo from '../components/common/Logo';
import './Login.css';

function Login() {
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { login } = useAuth();

  const features = [
    {
      title: "Gestion bancaire simplifiée",
      description: "Accédez à tous vos comptes et opérations en un seul endroit",
      icon: <FiCreditCard />
    },
    {
      title: "Transactions sécurisées",
      description: "Vos opérations sont protégées par les dernières technologies de sécurité",
      icon: <FiShield />
    },
    {
      title: "Suivi en temps réel",
      description: "Consultez vos soldes et historiques de transactions instantanément",
      icon: <FiTrendingUp />
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(credentials);
    } catch (err) {
      setError(err.response?.data?.message || 'Login ou mot de passe erronés');
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <div className="login-container">
      {/* Left Side - Promotional */}
      <div className="login-left">
        <div className="login-left-content">
          <div className="login-logo-section">
            <Logo size="large" showText={true} />
            <p className="login-tagline">La banque en ligne moderne et sécurisée</p>
          </div>

          <div className="login-feature-carousel">
            <div className="carousel-indicator">
              <span>{currentSlide + 1}/{features.length}</span>
              <div className="carousel-controls">
                <button 
                  type="button"
                  className="carousel-arrow" 
                  onClick={prevSlide}
                  aria-label="Précédent"
                >
                  <FiArrowRight style={{ transform: 'rotate(180deg)' }} />
                </button>
                <button 
                  type="button"
                  className="carousel-arrow" 
                  onClick={nextSlide}
                  aria-label="Suivant"
                >
                  <FiArrowRight />
                </button>
              </div>
            </div>

            <div className="feature-slide">
              <div className="feature-icon">{features[currentSlide].icon}</div>
              <h2 className="feature-title">{features[currentSlide].title}</h2>
              <p className="feature-description">{features[currentSlide].description}</p>
            </div>

            <div className="carousel-dots">
              {features.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Aller à la slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-right">
        <div className="login-right-background">
          <div className="login-pattern"></div>
          <div className="login-pattern"></div>
          <div className="login-pattern"></div>
        </div>
        
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-welcome">
              Bienvenue sur <span className="login-brand">eBank</span>
            </h1>
            <p className="login-subtitle">La banque en ligne par excellence</p>
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">
                Renseignez votre identifiant
                <span className="info-icon" title="Votre identifiant de connexion">ℹ️</span>
              </label>
              <div className="input-with-icon">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  className="form-input"
                  value={credentials.login}
                  onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
                  placeholder="Ex. agent"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  className="form-input"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Connexion...' : (
                <>
                  <FiLogIn />
                  Se connecter
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="login-help-text">Compte par défaut: agent / agent123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;