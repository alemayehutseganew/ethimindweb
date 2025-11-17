import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    email: '', 
    username: '',
    first_name: '',
    last_name: '',
    password: '', 
    password_confirm: '' 
  });
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

    // Username validation
    if (!form.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (form.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (form.username.trim().length > 30) {
      newErrors.username = 'Username must not exceed 30 characters';
    }

    // First name validation
    if (!form.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    } else if (form.first_name.trim().length < 2) {
      newErrors.first_name = 'First name must be at least 2 characters';
    } else if (form.first_name.trim().length > 50) {
      newErrors.first_name = 'First name must not exceed 50 characters';
    }

    // Last name validation
    if (!form.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    } else if (form.last_name.trim().length < 2) {
      newErrors.last_name = 'Last name must be at least 2 characters';
    } else if (form.last_name.trim().length > 50) {
      newErrors.last_name = 'Last name must not exceed 50 characters';
    }
    
    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (form.password.length > 128) {
      newErrors.password = 'Password must not exceed 128 characters';
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = 'Password must contain at least one number';
    }
    
    // Password confirm validation
    if (!form.password_confirm) {
      newErrors.password_confirm = 'Please confirm your password';
    } else if (form.password !== form.password_confirm) {
      newErrors.password_confirm = 'Passwords do not match';
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
      const response = await fetch('/api/users/register/', {
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
        // Handle server validation errors
        Object.keys(data).forEach(key => {
          setErrors(prev => ({ ...prev, [key]: data[key][0] || 'Validation error' }));
        });
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
          <h2>Create Account</h2>
          <p>Join ETHIMIND community</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {errors.general && <div className="error-banner">{errors.general}</div>}
          
          <div className="form-group">
            <label htmlFor="register-email">Email Address</label>
            <input
              id="register-email"
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
            <label htmlFor="register-username">Username</label>
            <input
              id="register-username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
              aria-label="Username"
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="register-first">First Name</label>
              <input
                id="register-first"
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="First name"
                aria-label="First name"
                className={errors.first_name ? 'input-error' : ''}
              />
              {errors.first_name && <span className="error-text">{errors.first_name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="register-last">Last Name</label>
              <input
                id="register-last"
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Last name"
                aria-label="Last name"
                className={errors.last_name ? 'input-error' : ''}
              />
              {errors.last_name && <span className="error-text">{errors.last_name}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              aria-label="Password"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="register-confirm">Confirm Password</label>
            <input
              id="register-confirm"
              type="password"
              name="password_confirm"
              value={form.password_confirm}
              onChange={handleChange}
              placeholder="Confirm your password"
              aria-label="Confirm password"
              className={errors.password_confirm ? 'input-error' : ''}
            />
            {errors.password_confirm && <span className="error-text">{errors.password_confirm}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            {status === 'loading' ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {status === 'success' && <p className="status-success">✓ Account created! Redirecting...</p>}
        {status === 'error' && <p className="status-error">✗ Registration failed. Please check your information.</p>}

        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Sign in here</a></p>
        </div>
      </div>
    </div>
  );
}
