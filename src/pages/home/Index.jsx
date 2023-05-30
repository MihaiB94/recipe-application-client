import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import RecipesPage from '../recipesPage/RecipesPage';
import Categories from '../../components/categories/Categories';
import './index.css';

export default function Index() {
   return (
      <React.Fragment>
         <div className="box-shad">
            <div className="box-shad-container">
               <Header />
               <Categories />
               <RecipesPage />
            </div>
         </div>
      </React.Fragment>
   );
}
