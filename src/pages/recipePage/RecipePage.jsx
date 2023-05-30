import React from 'react';
import './recipePage.css';
import SingleRecipe from '../singleRecipe/SingleRecipe';
export default function RecipePage() {
   return (
      <div className="recipe-page">
         <SingleRecipe />
      </div>
   );
}
