import React, { useState, useEffect } from 'react';
import { usersAPI } from '../../services/api';
import { useLanguage } from '../LanguageConverter/LanguageContext';
import './AuthModule.css';

const AuthModule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { t } = useLanguage();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  // Check if user is already logged in
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data } = await usersAPI.getProfile();
      if (data) {
        setUser(data);
      }
    } catch (error) {
      // User not logged in
      setUser(null);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginForm.email) newErrors.email = t('emailRequired');
    if (!loginForm.password) newErrors.password = t('passwordRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!registerForm.firstName) newErrors.firstName = t('firstNameRequired');
    if (!registerForm.lastName) newErrors.lastName = t('lastNameRequired');
    if (!registerForm.email) newErrors.email = t('emailRequired');
    if (!registerForm.password) newErrors.password = t('passwordRequired');
    if (registerForm.password.length < 6) newErrors.password = t('passwordMinLength');
    if (registerForm.password !== registerForm.passwordConfirm) newErrors.passwordConfirm = t('passwordsMustMatch');
    if (!registerForm.agreeToTerms) newErrors.agreeToTerms = t('agreeToTermsRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await usersAPI.login(loginForm.email, loginForm.password);
      
      if (error) {
        setMessage(t('loginFailed'));
      } else {
        setUser(data);
        setIsOpen(false);
        setMessage('');
        setLoginForm({ email: '', password: '' });
      }
    } catch (error) {
      setMessage(t('loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await usersAPI.register({
        email: registerForm.email,
        username: registerForm.email.split('@')[0],
        password: registerForm.password,
        password_confirm: registerForm.passwordConfirm,
        first_name: registerForm.firstName,
        last_name: registerForm.lastName
      });

      if (error) {
        setMessage(t('registrationFailed'));
      } else {
        setUser(data);
        setIsOpen(false);
        setMessage('');
        setRegisterForm({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirm: '',
          agreeToTerms: false
        });
        setActiveTab('login');
      }
    } catch (error) {
      setMessage(t('registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await usersAPI.logout();
      setUser(null);
      setIsOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthModule = () => {
    setIsOpen(!isOpen);
    setMessage('');
    setErrors({});
  };

  return (
    <div className="auth-module">
      {/* Auth Toggle Button */}
      <button 
        className="auth-toggle"
        onClick={toggleAuthModule}
        aria-label={user ? t('accountMenu') : t('loginOrRegister')}
      >
        {user ? (
          <div className="user-avatar">
            <span className="avatar-icon">👤</span>
            <span className="user-name">
              {user.first_name || user.email.split('@')[0]}
            </span>
            <span className="dropdown-arrow">▼</span>
          </div>
        ) : (
          <div className="guest-state">
            <span className="auth-icon">🔐</span>
            <span className="auth-text">{t('signIn')}</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        )}
      </button>

      {/* Auth Dropdown */}
      {isOpen && (
        <div className="auth-dropdown">
          {user ? (
            // User is logged in - show account menu
            <div className="account-menu">
              <div className="user-info">
                <div className="user-avatar-large">
                  <span className="avatar-icon-large">👤</span>
                </div>
                <div className="user-details">
                  <h4>{user.first_name} {user.last_name}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
              
              <div className="account-actions">
                <button className="account-btn">
                  <span className="btn-icon">📊</span>
                  {t('dashboard')}
                </button>
                <button className="account-btn">
                  <span className="btn-icon">🛒</span>
                  {t('orders')}
                </button>
                <button className="account-btn">
                  <span className="btn-icon">⚙️</span>
                  {t('settings')}
                </button>
                <button 
                  className="account-btn logout-btn"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  <span className="btn-icon">🚪</span>
                  {loading ? t('loggingOut') : t('logout')}
                </button>
              </div>
            </div>
          ) : (
            // User is not logged in - show auth forms
            <div className="auth-forms">
              <div className="auth-tabs">
                <button
                  className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => setActiveTab('login')}
                >
                  {t('login')}
                </button>
                <button
                  className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                  onClick={() => setActiveTab('register')}
                >
                  {t('register')}
                </button>
              </div>

              {message && (
                <div className="auth-message error">
                  {message}
                </div>
              )}

              {/* Login Form */}
              {activeTab === 'login' && (
                <form className="auth-form" onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="login-email">{t('email')}</label>
                    <input
                      id="login-email"
                      type="email"
                      name="email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="your@email.com"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="login-password">{t('password')}</label>
                    <input
                      id="login-password"
                      type="password"
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      className={errors.password ? 'error' : ''}
                      placeholder={t('enterPassword')}
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                  </div>

                  <div className="form-options">
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      {t('rememberMe')}
                    </label>
                    <a href="/forgot-password" className="forgot-link">
                      {t('forgotPassword')}
                    </a>
                  </div>

                  <button 
                    type="submit" 
                    className="auth-submit-btn"
                    disabled={loading}
                  >
                    {loading ? t('signingIn') : t('signIn')}
                  </button>

                  <div className="auth-divider">
                    <span>{t('orContinueWith')}</span>
                  </div>

                  <div className="social-auth">
                    <button type="button" className="social-btn google-btn">
                      <span className="social-icon">🔍</span>
                      Google
                    </button>
                    <button type="button" className="social-btn github-btn">
                      <span className="social-icon">💻</span>
                      GitHub
                    </button>
                  </div>
                </form>
              )}

              {/* Register Form */}
              {activeTab === 'register' && (
                <form className="auth-form" onSubmit={handleRegister}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="register-firstName">{t('firstName')}</label>
                      <input
                        id="register-firstName"
                        type="text"
                        name="firstName"
                        value={registerForm.firstName}
                        onChange={handleRegisterChange}
                        className={errors.firstName ? 'error' : ''}
                        placeholder={t('enterFirstName')}
                      />
                      {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="register-lastName">{t('lastName')}</label>
                      <input
                        id="register-lastName"
                        type="text"
                        name="lastName"
                        value={registerForm.lastName}
                        onChange={handleRegisterChange}
                        className={errors.lastName ? 'error' : ''}
                        placeholder={t('enterLastName')}
                      />
                      {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="register-email">{t('email')}</label>
                    <input
                      id="register-email"
                      type="email"
                      name="email"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="your@email.com"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="register-password">{t('password')}</label>
                    <input
                      id="register-password"
                      type="password"
                      name="password"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      className={errors.password ? 'error' : ''}
                      placeholder={t('enterPassword')}
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="register-passwordConfirm">{t('confirmPassword')}</label>
                    <input
                      id="register-passwordConfirm"
                      type="password"
                      name="passwordConfirm"
                      value={registerForm.passwordConfirm}
                      onChange={handleRegisterChange}
                      className={errors.passwordConfirm ? 'error' : ''}
                      placeholder={t('confirmPassword')}
                    />
                    {errors.passwordConfirm && <span className="error-text">{errors.passwordConfirm}</span>}
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={registerForm.agreeToTerms}
                        onChange={handleRegisterChange}
                        className={errors.agreeToTerms ? 'error' : ''}
                      />
                      <span>
                        {t('iAgreeTo')} <a href="/terms">{t('termsOfService')}</a> {t('and')} <a href="/privacy">{t('privacyPolicy')}</a>
                      </span>
                    </label>
                    {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="auth-submit-btn"
                    disabled={loading}
                  >
                    {loading ? t('creatingAccount') : t('createAccount')}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthModule;