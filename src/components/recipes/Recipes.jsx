import React from 'react';
import Recipe from '../recipe/Recipe';
import { PulseLoader } from 'react-spinners';
import './recipes.css';
import '../../style/generalStyle.css';

export default function Recipes({ recipes, isLoading }) {
   return (
      <div className="recipes">
         <div className="recipes-container">
            {isLoading ? (
               <div className="loading-spinner-container">
                  <div className="loading-msg">Loading recipes!</div>
                  <div className="loading-spinner">
                     <PulseLoader color={'#000'} />
                  </div>
               </div>
            ) : recipes.length === 0 ? (
               <div className="no-recipes-msg">No recipes found!</div>
            ) : (
               recipes.map((r) => <Recipe key={r._id} recipe={r} />)
            )}
         </div>
      </div>
   );
}
