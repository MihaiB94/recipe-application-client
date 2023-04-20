import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import axiosInstance from '../../config';
import './register.css';
import '../../style.css';

export default function Register() {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Validate input
      if (!email || !password || !confirmPassword) {
         setError('Please fill in all fields.');
         return;
      }

      if (password !== confirmPassword) {
         setError('Passwords do not match.');
         return;
      }

      // Clear error message
      setError('');
      setIsLoading(true); // set loading to true before making the API call
      setError('');
      try {
         const res = await axiosInstance.post('/authentication/register', {
            username: username.toLowerCase(), // Convert username to lowercase
            email: email.toLowerCase(), // Convert email to lowercase
            password,
            confirmPassword
         });
         // save JWT token to local storage
         const token = res.data.token; // Get the token value from the response
         Cookies.set('token', token, { httpOnly: false, expires: 365 });
         setIsLoading(false);
         setError('');

         res.data && window.location.replace('/account/status');
      } catch (err) {
         if (err.response) {
            setError(err.response.data.message); // Update error message to show only the "message" field from the response
         } else {
            setError(
               error.response?.data?.message ??
                  'An error occurred while registering. Please try again.'
            );
         }
         setIsLoading(false); // set loading to false after API call completes
      }
   };

   return (
      <div className="register">
         {isLoading ? (
            <div className="loading-spinner-container">
               <div className="loading-msg">Please Wait!</div>
               <div className="loading-spinner">
                  <BeatLoader color={'#000'} />
               </div>
            </div>
         ) : (
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
                              onChange={(e) =>
                                 setConfirmPassword(e.target.value)
                              }
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
                        {error && (
                           <p className="register-error">{error.message}</p>
                        )}
                     </form>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
