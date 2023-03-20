import React, { useState, useEffect, useContext } from 'react';
import { axiosInstance } from '../../config';
import { ContextAPI } from '../../contextAPI/ContextAPI';
import Recipe from '../../components/recipe/Recipe';

import jwt_decode from 'jwt-decode';
const Favorites = () => {
   const [favorites, setFavorites] = useState([]);
   const [error, setError] = useState(null);
   const { user, dispatch } = useContext(ContextAPI);
   const decodedToken = jwt_decode(user.token);
   useEffect(() => {
      axiosInstance
         .get(`https://recipe-aplication-api.onrender.com/server/users/${user.id}/favorites`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
         })
         .then((res) => setFavorites(res.data))
         .catch((err) => setError(err));
   }, []);

   return (
      <div className="recipes">
         <div className="recipes-container">
            {error && <p>{error.message}</p>}
            {favorites.map((recipe) => (
               <Recipe key={recipe._id} recipe={recipe} />
            ))}
         </div>
      </div>
   );
};

export default Favorites;
