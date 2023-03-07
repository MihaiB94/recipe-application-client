import { useState } from 'react';
import { axiosInstance } from '../config';

const useMutation = ({ url, method = 'POST' }) => {
   const [state, setState] = useState({
      isLoading: false,
      error: ''
   });

   const fn = async (data) => {
      setState((prev) => ({
         ...prev,
         isLoading: true
      }));

      axiosInstance({ url, method, data })
         .then(() => {
            setState({
               isLoading: false,
               error: ''
            });
         })
         .catch((err) => {
            setState({
               isLoading: false,
               error: err
            });
         });
   };
   return { mutate: fn, ...state };
};

export default useMutation;
