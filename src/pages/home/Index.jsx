import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

import Header from '../../components/header/Header';
import Recipes from '../../components/recipes/Recipes';
import Categories from '../../components/categories/Categories';
import './index.css';
import axiosInstance from '../../config';
import { useLocation } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';

export default function Index() {
   const recipesPerPageNum = 30;
   const [recipes, setRecipes] = useState([]);
   const { search } = useLocation();
   const [currentPage, setCurrentPage] = useState(1);
   const [recipesPerPage, setRecipesPerPage] = useState(recipesPerPageNum);

   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      const fetchRecipes = async () => {
         try {
            const res = await axiosInstance.get('/recipes' + search);
            setRecipes(res.data);
            console.log(res);
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchRecipes();
   }, [search]);

   console.log('isLoading', isLoading); // add this to check the value of isLoading

   const lastRecipeIndex = currentPage * recipesPerPage;
   const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
   const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex);
   const totalPages = Math.ceil(recipes.length / recipesPerPageNum);
   const nextPage = () => setCurrentPage((prev) => prev + 1);
   const prevPage = () => setCurrentPage((prev) => prev - 1);

   return (
      <React.Fragment>
         <div className="box-shad">
            <div className="box-shad-container">
               <Header />
               <Categories />

               <div className="home-page">
                  <Recipes recipes={currentRecipes} isLoading={isLoading} />

                  <Pagination
                     totalRecipes={recipes.length}
                     recipesPerPage={recipesPerPage}
                     setCurrentPage={setCurrentPage}
                     currentPage={currentPage}
                     nextPage={nextPage}
                     prevPage={prevPage}
                     currentRecipes={currentRecipes}
                     totalPages={totalPages}
                  />
               </div>
            </div>
         </div>
      </React.Fragment>
   );
}
