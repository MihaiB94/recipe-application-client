import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useContext, useState, useEffect } from 'react';

import axiosInstance from '../../config';
import { ContextAPI } from '../../contextAPI/ContextAPI';

import './login.css';
import '../../style/generalStyle.css';
import '../../style/form/generalForm.css';
import '../../style/form/messageBelowBtn.css';

export default function Login() {
   const userRef = useRef();
   const passwordRef = useRef();
   const { dispatch, isFetching } = useContext(ContextAPI);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');

   const [navbarHeight, setNavbarHeight] = useState(0);
   const [footerHeight, setFooterHeight] = useState(0);
   const formHeight = `calc(100vh - ${navbarHeight}px - ${footerHeight}px)`;

   useEffect(() => {
      const footer = document.querySelector('.footer');
      const navbar = document.querySelector('.nav');

      if (navbar) {
         setNavbarHeight(navbar.offsetHeight);
      }

      if (footer) {
         setFooterHeight(footer.offsetHeight);
      }
   }, []);

   const submitForm = async (e) => {
      e.preventDefault();
      dispatch({ type: 'LOGIN_START' });
      setIsLoading(true);
      setError('');

      try {
         const res = await axiosInstance.post(
            '/authentication/login',
            {
               username: userRef.current.value.trim().toLowerCase(),
               password: passwordRef.current.value
            },
            {
               withCredentials: true
            }
         );

         console.log(res.data);
         const { accessToken } = res.data;
         localStorage.setItem('accessToken', accessToken);

         dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });

         // Include token in headers for subsequent requests
         axiosInstance.defaults.headers.common[
            'Authorization'
         ] = `Bearer ${accessToken}`;
      } catch (err) {
         dispatch({ type: 'LOGIN_FAILURE', error: err.response.data.message });
         setError(err.response.data.message);
         setIsLoading(false);
      }
   };

   return (
      <div className="general-form" style={{ height: formHeight }}>
         <div className="general-form-container">
            <div className="general-form-box-wrapper">
               <div className="form-header">
                  <h1>Sign In</h1>
               </div>
               <div className="general-form-form-wrapper">
                  <form className="general-form-form" onSubmit={submitForm}>
                     <div className="general-form-group">
                        <label
                           className="general-form-label"
                           htmlFor="username"
                        >
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
                     <div className="general-form-group">
                        <label
                           className="general-form-label"
                           htmlFor="password"
                        >
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

                     {/* {isLoading ? (
                        <div className="general-form-group">
                           <div className="login-spinner">
                              <PropagateLoader color={'#000'} />
                           </div>
                        </div>
                     ) : ( */}
                     <div className="general-form-group">
                        <button
                           className="general-form-btn"
                           type="submit"
                           disabled={isFetching}
                        >
                           Login
                        </button>
                     </div>
                     {/* )} */}

                     {error && <p className="general-form-error">{error}</p>}

                     <div className="message-under-btn">
                        <Link
                           className="link message-under-btn-link"
                           to="/resetpassword"
                        >
                           Forgot your password?
                        </Link>
                     </div>
                     <div className="message-under-btn">
                        <p>Do not have an account yet?</p>
                        <Link
                           className="link message-under-btn-link "
                           to="/register"
                        >
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
