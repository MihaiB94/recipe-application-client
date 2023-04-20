import { useEffect, useState } from 'react';
import axiosInstance from '../../config';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './adviseAccountConfirm.css';

const RegisterStatus = () => {
   const [message, setMessage] = useState('');

   useEffect(() => {
      const token = Cookies.get('token');
      if (!token) {
         setMessage('You need to be logged in to view this page1.');
         return;
      }

      const getRegisterStatus = async () => {
         try {
            await axiosInstance.get(
               `/authentication/account/status?token=${token}`
            );
            setMessage(
               `Your account has been verified successfully. You can proceed to `
            );
         } catch (err) {
            if (
               err.response &&
               err.response.status === 400 &&
               err.response.data.message === 'Account not verified'
            ) {
               setMessage(
                  'Your account is not verified. Please check your email for verification instructions.'
               );
            } else {
               setMessage('An error occurred. Please try again later.');
            }
         }
      };

      getRegisterStatus();

      // Poll the server every 5 seconds to check if the user is verified
      const intervalId = setInterval(() => {
         getRegisterStatus();
      }, 5000);

      return () => {
         clearInterval(intervalId);
      };
   }, []);

   return (
      <div className="account-status">
         <p className="account-status-message">{message}</p>
         {message ===
            'Your account has been verified successfully. You can proceed to ' && (
            <Link to="/login" className="account-status-message-link">
               login
            </Link>
         )}
      </div>
   );
};

export default RegisterStatus;
