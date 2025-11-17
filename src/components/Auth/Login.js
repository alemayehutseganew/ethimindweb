import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus(null);
      return;
    }
    
    setErrors({});
    setStatus('loading');
    
    try {
      const response = await fetch('/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]')?.value || '',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(data));
        setTimeout(() => navigate('/'), 2000);
      } else {
        setStatus('error');
        if (data.email) setErrors({ email: data.email[0] });
        if (data.password) setErrors(prev => ({ ...prev, password: data.password[0] }));
        if (data.non_field_errors) setErrors(prev => ({ ...prev, general: data.non_field_errors[0] }));
      }
    } catch (error) {
      setStatus('error');
      setErrors({ general: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Sign In</h2>
          <p>Welcome back to ETHIMIND</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {errors.general && <div className="error-banner">{errors.general}</div>}
          
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              aria-label="Email address"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              aria-label="Password"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            {status === 'loading' ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {status === 'success' && <p className="status-success">✓ Login successful! Redirecting...</p>}
        {status === 'error' && <p className="status-error">✗ Login failed. Please check your credentials.</p>}

        <div className="auth-footer">
          <p>Don't have an account? <a href="/register">Sign up here</a></p>
          <p><a href="/forgot-password">Forgot your password?</a></p>
        </div>
      </div>
    </div>
  );
}
