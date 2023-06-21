import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Recipe from '../../components/recipe/Recipe';
import SimpleSearchBar from '../../components/searchBar/SimpleSearchBar';

import axiosInstance from '../../config';
import './search.css';

export default function Search() {
   const [recipes, setRecipes] = useState([]);
   const [error, setError] = useState(null);
   const query = useLocation().search;
   // console.log(query);

   useEffect(() => {
      const fetchRecipes = async () => {
         const res = await axiosInstance.get(`/recipes/search${query}`);
         setRecipes(res.data);
         // console.log(res.data);
      };
      fetchRecipes();
   }, [query]);

   return (
      <div className="recipes search-recipes">
         <div className="recipes-container">
            {error && <p>{error.message}</p>}
            {Array.isArray(recipes) && recipes.length === 0 && (
               <div className="recipe-not-found">
                  <div className="no-result-found">
                     {' '}
                     0 results found for your search.
                  </div>
                  <div className="subtitle">
                     {' '}
                     Please try another search term
                  </div>
                  <div className="search-bar">
                     <SimpleSearchBar />
                  </div>
               </div>
            )}
            {Array.isArray(recipes) &&
               recipes.map((r) => <Recipe key={r.id} recipe={r} />)}
         </div>
      </div>
   );
}
