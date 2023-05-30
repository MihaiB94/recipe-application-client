import { createContext, useEffect, useReducer, useState } from 'react';
import LoginReducer from './Reducer';
import axiosInstance from '../config';

let userString = localStorage.getItem('user');
let user = null;
if (userString && userString !== 'undefined') {
   try {
      user = JSON.parse(userString);
   } catch (err) {
      console.error('Error parsing user JSON:', err);
   }
}

const INITIAL_STATE = {
   user,
   isFetching: false,
   error: null,
   errorMessage: null // New property for error message
};

export const ContextAPI = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE);
   const [accessToken, setAccessToken] = useState(
      localStorage.getItem('accessToken')
   );
   const [isTokenRenewing, setIsTokenRenewing] = useState(false);

   const refreshToken = async () => {
      try {
         setIsTokenRenewing(true); // Set the flag to indicate token renewal is ongoing

         const response = await axiosInstance.post(
            '/token/refresh-token',
            null,
            {
               withCredentials: true
            }
         );

         const newAccessToken = response.data.accessToken;

         if (newAccessToken) {
            setAccessToken(newAccessToken);
            localStorage.setItem('accessToken', newAccessToken);
         }
      } catch (error) {
         localStorage.removeItem('accessToken'); // Remove the expired token from local storage
         localStorage.removeItem('user'); // Remove the user data from local storage
         dispatch({ type: 'LOGOUT' }); // Dispatch a logout action to clear the user state
         // Handle the error when refreshing the access token
      } finally {
         setIsTokenRenewing(false); // Reset the flag after token renewal process
      }
   };

   useEffect(() => {
      const requestInterceptor = axiosInstance.interceptors.request.use(
         (config) => {
            const updatedConfig = { ...config };
            const currentAccessToken = localStorage.getItem('accessToken');
            if (currentAccessToken) {
               updatedConfig.headers[
                  'Authorization'
               ] = `Bearer ${currentAccessToken}`;
            }
            return updatedConfig;
         },
         (error) => {
            return Promise.reject(error);
         }
      );

      return () => {
         axiosInstance.interceptors.request.eject(requestInterceptor);
      };
   }, []);

   useEffect(() => {
      const checkTokenValidity = async () => {
         if (!accessToken) {
            return; // Skip token validity check if accessToken is not available
         }

         const currentTime = Math.floor(Date.now() / 1000);
         const tokenParts = accessToken.split('.');
         const encodedPayload = tokenParts[1];
         const decodedToken = JSON.parse(
            Buffer.from(encodedPayload, 'base64').toString('utf-8')
         );

         // Renew the access token if it is about to expire (within the next 60 seconds)
         if (
            decodedToken.exp - currentTime <= 10 &&
            !isTokenRenewing &&
            state.user
         ) {
            await refreshToken(); // Renew the access token only if not currently renewing and user data is available
         }
      };

      const interval = setInterval(checkTokenValidity, 10000); // Check token validity every 10 seconds

      return () => {
         clearInterval(interval); // Clean up the interval on component unmount
      };
   }, [accessToken, isTokenRenewing, state.user]);

   useEffect(() => {
      localStorage.setItem('user', JSON.stringify(state.user));
   }, [state.user]);

   return (
      <ContextAPI.Provider
         value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            errorMessage: state.errorMessage,
            dispatch,
            refreshToken
         }}
      >
         {children}
      </ContextAPI.Provider>
   );
};
