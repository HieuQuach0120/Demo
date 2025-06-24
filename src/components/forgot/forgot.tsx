import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../../service/ForgotService";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './forgot.css';

const Forgot = () => {
  const [hovered, setHovered] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError('Invalid email! Please enter a valid email address.');
    } else {
      setError('');
      setTimeout( () => {
        alert('Sending the code to your email.');
      }, 50);

    }
    };

  return (
    <div className="forgot-container">
      <form className="forgot-wrapper" onSubmit={handleSubmit}>
        <div className="lock-icon">
          <FontAwesomeIcon icon={faLock} />
        </div>
        <h2>Forgot Password?</h2>
        <p>You can reset your password here.</p>

        <div className='mb-3'>
          <FontAwesomeIcon className="email-icon" icon={faEnvelope} />
          <input
            type='text'
            id='email'
            className='form-control'
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
        </div>

        <button
          type='submit'
          id="reset-password-button"
          className='btn btn-primary w-100'
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Reset Password
        </button>
        {error && (
            <div className="error">
              {error}
            </div>
          )}
      </form>
    </div>
  );
};

export default Forgot;
