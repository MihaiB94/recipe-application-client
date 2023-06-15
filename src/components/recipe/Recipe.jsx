import React from 'react';
import './recipe.css';
import { Link } from 'react-router-dom';

export default function Recipe({ recipe }) {
   return (
      <div className="recipe" key={recipe._id}>
         <Link to={`/recipes/${recipe._id}`} className="link">
            <img src={recipe.image_url} className="recipe-img" alt="recipe" />
         </Link>
         <div className="recipe-info">
            <div className="recipe-categories">
               <span className="recipe-category"> {recipe.categories}</span>
            </div>
            <span className="recipe-title">{recipe.title}</span>
            <hr />
            <span className="publish-date">
               {new Date(recipe.createdAt).toDateString()}
            </span>
         </div>
      </div>
   );
}
