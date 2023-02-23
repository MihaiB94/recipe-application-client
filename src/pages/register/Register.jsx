import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config';
import './register.css';

export default function Register() {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      try {
         const res = await axiosInstance.post('/authentication/register', {
            username,
            email,
            password,
            confirmPassword
         });
         res.data && window.location.replace('/login');
      } catch (err) {
         if (err.response) {
            setError(err.response.data);
         } else {
            setError({
               message: 'An error occurred while registering. Please try again.'
            });
         }
      }
   };

   return (
      <div className="register">
         <div className="register-container">
            <div className="register-box-wrapper">
               <div className="form-header">
                  <h1>Register Account</h1>
               </div>
               <div className="login-form-wrapper">
                  <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <label className="register-label" htmlFor="username">
                           Username
                        </label>
                        <input
                           type="text"
                           id="username"
                           name="username"
                           required="required"
                           onChange={(e) => setUsername(e.target.value)}
                        />
                     </div>

                     <div className="form-group">
                        <label className="register-label" htmlFor="email">
                           Email Address
                        </label>
                        <input
                           type="email"
                           id="email"
                           name="email"
                           required="required"
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </div>

                     <div className="form-group">
                        <label className="register-label" htmlFor="password">
                           Password
                        </label>
                        <input
                           type="password"
                           id="password"
                           name="password"
                           required="required"
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>
                     <div className="form-group">
                        <label htmlFor="confirmPassword">
                           Confirm Password
                        </label>
                        <input
                           type="password"
                           id="confirmPassword"
                           name="confirmPassword"
                           required="required"
                           onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                     </div>

                     <div className="form-group">
                        <button className="register-btn" type="submit">
                           Register
                        </button>
                     </div>

                     <div className="acc-register">
                        <p> Already have an account?</p>
                        <Link className="link register-option" to="/login">
                           Login
                        </Link>
                     </div>
                     {error && <p className="register-error">{error}</p>}
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
