import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useContext, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import './login.css';
import '../../style.css';

import { axiosInstance } from '../../config';
import { ContextAPI } from '../../contextAPI/ContextAPI';

export default function Login() {
   const userRef = useRef();
   const passwordRef = useRef();
   const { dispatch, isFetching, error } = useContext(ContextAPI);
   const [isLoading, setIsLoading] = useState(false);

   const submitForm = async (e) => {
      e.preventDefault();
      dispatch({ type: 'LOGIN_START' });
      setIsLoading(true); // set loading to true before making the API call
      try {
         const res = await axiosInstance.post('/authentication/login', {
            username: userRef.current.value.trim(),
            password: passwordRef.current.value
         });
         // save JWT token to local storage
         localStorage.setItem('token', res.data.token);
         
         dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      } catch (err) {
         dispatch({ type: 'LOGIN_FAILURE', error: err.response.data });
      }
   };

   return (
      <div className="login">
         {isLoading ? (
            <div className="loading-spinner-container">
               <div className="loading-msg">Please Wait!</div>
               <div className="loading-spinner">
                  <BeatLoader color={'#000'} />
               </div>
            </div>
         ) : (
            <div className="login-container">
               <div className="login-box-wrapper">
                  <div className="form-header">
                     <h1>Account Login</h1>
                  </div>
                  <div className="login-form-wrapper">
                     <form className="login-form" onSubmit={submitForm}>
                        <div className="form-group">
                           <label className="login-label" htmlFor="username">
                              Username
                           </label>
                           <input
                              id="username"
                              type="text"
                              name="username"
                              required="required"
                              ref={userRef}
                           />
                        </div>
                        <div className="form-group">
                           <label className="login-label" htmlFor="password">
                              Password
                           </label>
                           <input
                              id="password"
                              type="password"
                              name="password"
                              required="required"
                              ref={passwordRef}
                           />
                        </div>

                        <div className="form-group">
                           <button
                              className="login-btn"
                              type="submit"
                              disabled={isFetching}
                           >
                              Login
                           </button>
                        </div>

                        {error && (
                           <p className="login-error-message">{error}</p>
                        )}
                        <div className="acc-login">
                           <p>Do not have an account yet?</p>
                           <Link className="link login-option" to="/register">
                              Register
                           </Link>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
