import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../../service/ForgotService";
import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons';


const Forgot = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  backgroundColor: '#f8f9fa'
                }}
    >
      <form style={{
                      backgroundColor: '#fff',
                      padding: '40px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                      textAlign: 'center',
                      maxWidth: '350px',
                      width: '100%',
                    }}>
        <div style={{ fontSize: '80px',
                      justifyContent: 'center',
                      display: 'flex',
                      height: '110px',
                      
                      }} 
        >
          <FontAwesomeIcon icon={faLock} />
        </div>
        <h2>Forgot Password?</h2>
      <p>
        You can reset your password here.
      </p>
      
        <div className='mb-3' style={{position: 'relative',
                                      maxWidth: '300px'
                                    }}>
          <FontAwesomeIcon icon={faEnvelope} 
            style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                    color: '#888',
                  }}
          />
          <input
            type='email'
            id='email'
            className='form-control'
            placeholder=' Email address'
            required
            style={{
              paddingLeft: '40px',
              borderRadius: '4px',
              borderColor: '#ccc',
              boxShadow: 'none',
            }}
          />
        </div>
        <button type='submit'
                className='btn btn-primary w-100' 
                style={{backgroundColor:  hovered ? '#c3e6cb' : '#337ab7',
                        transition: 'background-color 0.3s, color 0.3s',
                        color:  hovered ? 'black' : 'white',
                }}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default Forgot;
