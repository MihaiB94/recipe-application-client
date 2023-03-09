import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { ContextAPI } from '../../contextAPI/ContextAPI';

export const handleFavorites = async (e) => {
   const { user, dispatch } = useContext(ContextAPI);
   const [recipe, setRecipe] = useState({});

   if (!user) {
      return;
   }

   if (user.favorites.includes(recipe._id)) {
      try {
         const res = await fetch(
            `http://localhost:3000/users/${user._id}/favorites/${recipe._id}`,
            {
               method: 'DELETE'
            }
         );
         if (!res.ok) {
            const errorMessage = await res.json();
            console.error(errorMessage.message);
            return;
         }
         const newUser = await res.json();
         dispatch({
            type: 'UPDATE_USER',
            payload: Object.assign({}, user, newUser)
         });
      } catch (error) {
         console.error(error);
      }
      return;
   }

   try {
      const res = await fetch(
         `http://localhost:3000/users/${user._id}/favorites/${recipe._id}`,
         {
            method: 'PUT'
         }
      );
      if (!res.ok) {
         const errorMessage = await res.json();
         console.error(errorMessage.message);
         return;
      }
      const newUser = await res.json();
      dispatch({
         type: 'UPDATE_USER',
         payload: Object.assign({}, user, newUser)
      });
   } catch (error) {
      console.error(error);
   }
};

//This only check if the recipeId is not in the favorites array then add it.
// const handleClick = async (e) => {
//    if (!user) {
//       return;
//    }
//    if (user.favorites.includes(recipe._id)) {
//       console.log('Recipe already in favorites');
//       return;
//    }
//    try {
//       const res = await fetch(
//          `http://localhost:3000/users/${user._id}/favorites/${recipe._id}`,
//          {
//             method: 'PUT'
//          }
//       );
//       if (!res.ok) {
//          const errorMessage = await res.json();
//          console.error(errorMessage.message);
//          return;
//       }
//       const newUser = await res.json();
//       dispatch({
//          type: 'UPDATE_USER',
//          payload: Object.assign({}, user, newUser)
//       });
//    } catch (error) {
//       console.error(error);
//    }
// };

// };
