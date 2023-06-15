import React, { useEffect, useState } from 'react';
import Recipes from '../../components/recipes/Recipes';
import axiosInstance from '../../config';
import { useLocation } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';

export default function Index() {
   const recipesPerPageNum = 10;
   const [recipes, setRecipes] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [recipesPerPage, setRecipesPerPage] = useState(recipesPerPageNum);
   const { search } = useLocation();
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      const fetchRecipes = async () => {
         try {
            const res = await axiosInstance.get('/recipes' + search);
            const sortedRecipes = res.data.sort((a, b) => {
               return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setRecipes(sortedRecipes);
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchRecipes();
   }, [search]);

   const lastRecipeIndex = currentPage * recipesPerPage;
   const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
   const currentRecipes = recipes.slice(firstRecipeIndex, lastRecipeIndex);
   const totalPages = Math.ceil(recipes.length / recipesPerPageNum);
   const nextPage = () => {
      setCurrentPage((prev) => prev + 1);
   };

   const prevPage = () => setCurrentPage((prev) => prev - 1);

   return (
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
   );
}
