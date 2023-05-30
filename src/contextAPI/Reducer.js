const LoginReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN_START':
         return {
            user: null,
            isFetching: true,
            error: null,
            errorMessage: null // Reset error message to null
         };

      case 'LOGIN_SUCCESS':
         return {
            user: action.payload,
            isFetching: false,
            error: null,
            errorMessage: null // Reset error message to null
         };

      case 'LOGIN_FAILURE':
         return {
            user: null,
            isFetching: false,
            error: true,
            errorMessage: action.error // Set error message to the action error
         };

      case 'LOGOUT':
         return {
            user: null,
            isFetching: false,
            error: false,
            success: false, // Reset success to false
            errorMessage: null // Reset error message to null
         };

      case 'UPDATE_START':
         return {
            ...state,
            isFetching: true,
            success: false, // Reset success to false
            error: false, // Reset error to false
            errorMessage: null // Reset error message to null
         };

      case 'UPDATE_SUCCESS':
         return {
            user: action.payload,
            isFetching: false,
            error: false,
            success: true, // Set success to true
            errorMessage: null // Reset error message to null
         };

      case 'UPDATE_FAILURE':
         return {
            user: state.user,
            isFetching: false,
            error: true,
            success: false, // Reset success to false
            errorMessage: null // Reset error message to null
         };

      case 'UPDATE_USER':
         return { ...state, user: action.payload };

      case 'UPDATE_USER_ROLE':
         return {
            ...state,
            user: {
               ...state.user,
               role: action.payload
            }
         };

      default:
         return state;
   }
};

export default LoginReducer;
