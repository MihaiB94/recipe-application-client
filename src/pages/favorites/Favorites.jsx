import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../config';
import { ContextAPI } from '../../contextAPI/ContextAPI';
import Recipe from '../../components/recipe/Recipe';
import RecipesPage from '../recipesPage/RecipesPage';
import './favorites.css';
const Favorites = () => {
   const [favorites, setFavorites] = useState([]);
   const [error, setError] = useState(null);
   const { user, dispatch } = useContext(ContextAPI);

   useEffect(() => {
      if (user && user.id) {
         axiosInstance
            .get(
               `https://recipe-aplication-api.onrender.com/server/users/${user.id}/favorites`,
               {
                  headers: {
                     Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
               }
            )
            .then((res) => setFavorites(res.data))
            .catch((err) => setError(err));
      }
   }, [user]);

   return (
      <div className="recipes favorites-recipes">
         <div className="recipes-container">
            {error && <p>{error.message}</p>}
            {Array.isArray(favorites) && favorites.length === 0 && (
               <p className="no-favorites">
                  You do not have any favorite recipes yet. Go back to&nbsp;{' '}
                  <Link to="/" className="">
                     Home Page
                  </Link>
               </p>
            )}
            {Array.isArray(favorites) &&
               favorites.map((recipe) => (
                  <Recipe key={recipe._id} recipe={recipe} />
               ))}
         </div>
      </div>
   );
};

export default Favorites;
