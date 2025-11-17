import React, { useState } from 'react';
import './Newsletter.css';
import { useLanguage } from '../LanguageConverter/LanguageContext';
import { newsletterAPI } from '../../services/api';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage(t('pleaseEnterEmail'));
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage(t('invalidEmail'));
      return;
    }
    
    setStatus('loading');
    setMessage('');
    
    try {
      console.log('Submitting email:', email);
      
      // Call the API - it returns { data, error }
      const result = await newsletterAPI.subscribe(email);
      console.log('API Result:', result);
      
      if (result.error) {
        // Handle API error
        setStatus('error');
        const error = result.error;
        
        // Extract error message from different possible formats
        let errorMessage = t('subscriptionFailed');
        
        if (error.body) {
          // Error from your API error handler
          if (typeof error.body === 'string') {
            errorMessage = error.body;
          } else if (error.body.email) {
            // Django serializer error format: { "email": ["error message"] }
            errorMessage = Array.isArray(error.body.email) 
              ? error.body.email[0] 
              : error.body.email;
          } else if (error.body.detail) {
            // DRF detail error
            errorMessage = error.body.detail;
          } else if (error.body.message) {
            errorMessage = error.body.message;
          } else if (typeof error.body === 'object') {
            // Try to get first error message from object
            const firstKey = Object.keys(error.body)[0];
            if (firstKey) {
              const firstError = error.body[firstKey];
              errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
            }
          }
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        setMessage(errorMessage);
        
      } else {
        // Success case
        setStatus('success');
        setMessage(t('thankYouForSubscribing'));
        setEmail('');
      }
      
    } catch (err) {
      // This should rarely happen since your apiCall catches errors
      console.error('Unexpected error in handleSubmit:', err);
      setStatus('error');
      setMessage(t('subscriptionFailed'));
    }
  };

  // Reset form function
  const handleReset = () => {
    setStatus('idle');
    setMessage('');
    setEmail('');
  };

  if (status === 'success') {
    return (
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-success">
              <div className="newsletter-success-icon">✅</div>
              <h4>{t('success')}</h4>
              <p>{message}</p>
              <button 
                onClick={handleReset}
                className="btn btn-secondary"
                style={{ marginTop: '1rem' }}
              >
                {t('subscribeAgain')}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h3>{t('stayUpdated')}</h3>
            <p>{t('newsletterDescription')}</p>
          </div>
          <form 
            className={`newsletter-form ${status === 'loading' ? 'loading' : ''} ${status === 'error' ? 'error' : ''}`}
            onSubmit={handleSubmit}
          >
            <div className="input-group">
              <input
                type="email"
                placeholder={t('enterEmail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                className={status === 'error' ? 'error' : ''}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={status === 'loading' || !email.trim()}
              >
                {status === 'loading' ? (
                  <>
                    <span className="spinner"></span>
                    {t('subscribing')}...
                  </>
                ) : (
                  t('subscribe')
                )}
              </button>
            </div>
            {message && (
              <div className={`newsletter-message ${status === 'error' ? 'error' : 'info'}`}>
                {message}
              </div>
            )}
            <p className="newsletter-note">
              {t('privacyNote')}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;