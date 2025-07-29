import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../../service/AuthService";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './forgot.css';

const Forgot = () => {
  const [hovered, setHovered] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError('Invalid email! Please enter a valid email address.');

      return;
    } 

    const result = await forgotPassword(email.trim()); //call API
    if (result.success) {
      setError("");     
      setTimeout( () => {
        alert("Your new password is: 123456aA@");
      },50)
    } else {
    }  
      setError(result.message);
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
