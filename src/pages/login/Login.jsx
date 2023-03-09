import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useContext } from 'react';
import './login.css';

import { axiosInstance } from '../../config';
import { ContextAPI } from '../../contextAPI/ContextAPI';

export default function Login() {
   const userRef = useRef();
   const passwordRef = useRef();
   const { dispatch, isFetching, error } = useContext(ContextAPI);

   const submitForm = async (e) => {
      e.preventDefault();
      dispatch({ type: 'LOGIN_START' });
      try {
         const res = await axiosInstance.post('/authentication/login', {
            username: userRef.current.value.trim(),
            password: passwordRef.current.value
         });

         dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      } catch (err) {
         dispatch({ type: 'LOGIN_FAILURE', error: err.response.data });
      }
   };

   return (
      <div className="login">
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

                     {error && <p className="login-error-message">{error}</p>}
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
      </div>
   );
}
