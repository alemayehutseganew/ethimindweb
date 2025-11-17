import React, { useState, useEffect } from 'react';
import { siteformsAPI } from '../../services/api';
import './Forms.css';

export default function ContactForm({ product, onClose }) {
  const [showForm, setShowForm] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    subject: product ? `Inquiry about ${product.name}` : '', 
    message: product ? `I'm interested in learning more about ${product.name}. Please send me more information.` : '', 
    phone: '' 
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  // Auto-fill subject and message when product is provided
  useEffect(() => {
    if (product) {
      setForm(prev => ({
        ...prev,
        subject: `Inquiry about ${product.name}`,
        message: `I'm interested in learning more about ${product.name}. Please send me more information about pricing, features, and implementation.`
      }));
    }
  }, [product]);

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim() || form.name.length < 2) newErrors.name = 'Name must be at least 2 characters.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Please provide a valid email.';
    if (!form.subject.trim() || form.subject.length < 3) newErrors.subject = 'Subject must be at least 3 characters.';
    if (!form.message.trim() || form.message.length < 10) newErrors.message = 'Message must be at least 10 characters.';
    if (form.phone && !/^[+]?[0-9\s\-()]+$/.test(form.phone)) newErrors.phone = 'Invalid phone format.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setStatus('loading');
    
    // Add product information to form data if available
    const formData = product ? {
      ...form,
      product_name: product.name,
      product_price: product.price,
      product_features: product.features.join(', ')
    } : form;

    const { data, error } = await siteformsAPI.createContact(formData);
    
    if (error) {
      setStatus('error');
      if (error.body && typeof error.body === 'object') {
        setErrors(error.body);
      }
    } else {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '', phone: '' });
      setErrors({});
      setTimeout(() => {
        setShowForm(false);
        if (onClose) onClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    setShowForm(false);
    if (onClose) onClose();
  };

  if (!showForm) return null;

  return (
    <div className="form-container">
      <div className="form-overlay" onClick={handleClose}>
        <div className={"form-card" + (minimized ? ' minimized' : '')} onClick={(e) => e.stopPropagation()}>
          <div className="form-header" onClick={() => minimized && setMinimized(false)}>
            <div className="form-title">
              <h3>Contact Us</h3>
              {product && (
                <p className="product-context">Regarding: {product.name}</p>
              )}
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <button
                type="button"
                className="minimize-btn"
                onClick={() => {
                  const next = !minimized;
                  setMinimized(next);
                  try { localStorage.setItem('contactFormMinimized', next ? '1' : '0'); } catch(e){}
                }}
                aria-label={minimized ? 'Restore form' : 'Minimize form'}
              >
                <svg className="arrow-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button 
                type="button"
                className="close-btn" 
                onClick={handleClose}
                aria-label="Close form"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          {!minimized && (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input 
                  id="name"
                  type="text"
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  placeholder="Your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input 
                  id="email"
                  type="email"
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="your.email@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone (optional)</label>
                <input 
                  id="phone"
                  type="tel"
                  name="phone" 
                  value={form.phone} 
                  onChange={handleChange} 
                  placeholder="+251 91 234 5678"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input 
                  id="subject"
                  type="text"
                  name="subject" 
                  value={form.subject} 
                  onChange={handleChange} 
                  placeholder="What is this about?"
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && <span className="error-text">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea 
                  id="message"
                  name="message" 
                  value={form.message} 
                  onChange={handleChange} 
                  placeholder="Please tell us more about your inquiry... (min 10 characters)"
                  rows="5"
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
          
          {!minimized && status === 'success' && (
            <p className="status-success">✓ Message sent! We'll get back to you shortly.</p>
          )}
          {!minimized && status === 'error' && (
            <p className="status-error">✗ Submission failed. Please try again or contact support.</p>
          )}
        </div>
      </div>
    </div>
  );
}