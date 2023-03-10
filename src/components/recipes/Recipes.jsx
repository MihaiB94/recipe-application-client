import React, { useState } from 'react';
import Recipe from '../recipe/Recipe';
import { BeatLoader } from 'react-spinners';
import './recipes.css';
import '../../style.css';

export default function Recipes({ recipes, isLoading }) {
   return (
      <div className="recipes">
         <div className="recipes-container">
            {isLoading ? (
               <div className="loading-spinner-container">
                  <div className="loading-msg">Loading recipes!</div>
                  <div className="loading-spinner">
                     <BeatLoader color={'#000'} />
                  </div>
               </div>
            ) : (
               recipes.map((r) => <Recipe key={r._id} recipe={r} />)
            )}
         </div>
      </div>
   );
}
