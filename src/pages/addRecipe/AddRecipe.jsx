import axiosInstance from '../../config';
import React, { Component, useReducer } from 'react';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { ContextAPI } from '../../contextAPI/ContextAPI';
import './addRecipe.css';
import TextareaAutosize from 'react-textarea-autosize';
import '../../style/generalStyle.css';
import { BeatLoader } from 'react-spinners';

export default function AddRecipe() {
   const [title, setTitle] = useState('');
   const [categories, setCategories] = useState([]);

   const [cats, setCats] = useState([]);
   const [description, setDescription] = useState('');
   const [ingredients, setIngredients] = useState([]);
   const [preparation_steps, setPreparation_steps] = useState([]);
   const [file, setFile] = useState(null);

   const IngLabel = document.getElementById('ing-label');
   const StepLabel = document.getElementById('step-label');

   const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
   const [error, setError] = useState('');
   const { user, dispatch } = useContext(ContextAPI);
   const [isLoading, setIsLoading] = useState(true);
   let accessToken = localStorage.getItem('accessToken');

   useEffect(() => {
      const fetchCats = async () => {
         const res = await axiosInstance.get('/categories');
         setCats(res.data);
      };
      fetchCats();
   }, []);
   const handleSubmit = async (e) => {
      e.preventDefault();

      console.log(accessToken);
      if (!accessToken) {
         // Redirect the user to the login page or show an error message
         window.location.replace('/login');
         return;
      }

      // Create a new FormData object
      const formData = new FormData();
      formData.append('username', user.username);
      formData.append('title', title);
      formData.append('categories', categories);
      formData.append('description', description);
      formData.append('ingredients', JSON.stringify(ingredients));
      formData.append('preparation_steps', JSON.stringify(preparation_steps));
      formData.append('userId', user.id);

      // If an image file is selected, append it to the FormData object
      if (file) {
         const filename = Date.now() + '-' + file.name;
         formData.append('file', file, filename);
      }

      // Make a POST request to create a new recipe
      try {
         // checkTokenExpiration();
         const response = await axiosInstance.post('/recipes', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
               Authorization: `Bearer ${accessToken}`
            }
         });

         window.location.replace('/recipes/' + response.data._id);
      } catch (error) {
         console.error(error.response.data);
         const message = error.response.data.message.split(', ');
         setError(message);
      }
   };

   // Creating dynamically input field or Ingredients
   const addIngredient = (e) => {
      e.preventDefault();
      setIngredients([...ingredients, '']);
   };

   // Set the changed state
   const handleChangeIng = (e, index) => {
      ingredients[index] = e.target.value;
      setIngredients([...ingredients]);
   };

   // Creating dynamically input field or Preparation steps
   const addStep = (e) => {
      e.preventDefault();
      setPreparation_steps([...preparation_steps, '']);
   };

   // Set the changed state
   const handleChangeStep = (e, index) => {
      preparation_steps[index] = e.target.value;
      setPreparation_steps([...preparation_steps]);
   };

   let optionItems = cats.map((cat, index) => (
      <option key={index}>{cat}</option>
   ));

   return (
      <div className="add-recipe-wrapper">
         <form className="add-form-wrapper" onSubmit={handleSubmit}>
            <div className="add-form-item up-inputs">
               {file && (
                  <img
                     className="addImage"
                     src={URL.createObjectURL(file)}
                     alt=""
                  />
               )}
               <div>
                  <label htmlFor="fileInput" className="recipeAddBtn">
                     Add image
                  </label>
                  <input
                     type="file"
                     id="fileInput"
                     onChange={(e) => {
                        setFile(e.target.files[0]);
                     }}
                  />
               </div>
            </div>

            <div className="add-form-item up-inputs">
               <input
                  type="text"
                  placeholder=" "
                  className="add-form-input"
                  onChange={(e) => setTitle(e.target.value)}
                  required
               />
               <label className="add-form-label">Title:</label>
            </div>

            <div id="editor" className="add-form-item up-inputs ">
               <TextareaAutosize
                  placeholder=" "
                  className="add-form-input"
                  name="message"
                  minRows={5}
                  onChange={(e) => setDescription(e.target.value)}
                  required
               />
               <label className="add-form-label">Description:</label>
            </div>

            <div className="add-form-item">
               <div className="select-cat">
                  {isLoading ? (
                     <div className="loading-spinner-container">
                        <BeatLoader size={13} color={'#000'} />
                     </div>
                  ) : (
                     <select
                        className="selectOption"
                        onChange={(e) => setCategories(e.target.value)}
                        defaultValue="default"
                     >
                        <option value="default" disabled hidden>
                           Select an Option
                        </option>
                        {optionItems}
                     </select>
                  )}
               </div>
            </div>

            <div className="add-form-item up-inputs ">
               {ingredients.map((ingredient, index) => {
                  return (
                     <input
                        placeholder=" "
                        key={index}
                        className="add-form-input ingredient-input"
                        onChange={(e) => handleChangeIng(e, index)}
                        value={ingredient}
                        required
                     />
                  );
               })}
               <label id="ing-label" className="add-form-label hidden">
                  Ingredients:
               </label>
               <button
                  className="recipeAddBtn"
                  id="add-recipe-ing"
                  onClick={(e) => {
                     addIngredient(e);
                     IngLabel.classList.remove('hidden');
                  }}
               >
                  Add Ingredient
               </button>
            </div>

            <div className="add-form-item up-inputs ">
               {preparation_steps.map((step, index) => {
                  return (
                     <TextareaAutosize
                        placeholder=" "
                        key={index}
                        rows={4}
                        className="add-form-input steps-input"
                        onChange={(e) => handleChangeStep(e, index)}
                        value={step}
                        required
                     />
                  );
               })}
               <label id="step-label" className="add-form-label hidden ">
                  Steps
               </label>
               <button
                  className="recipeAddBtn"
                  id="add-recipe-steps"
                  onClick={(e) => {
                     addStep(e);
                     StepLabel.classList.remove('hidden');
                  }}
               >
                  Add Preparation Step
               </button>
            </div>

            <button className=" recipeAddBtn addSubmit" type="submit">
               Submit Recipe
            </button>

            {error && (
               <ul className="add-form-item error">
                  {Array.isArray(error) ? (
                     error.map((errorMessage, index) => (
                        <li key={index} className="common-error-message">
                           {errorMessage}
                        </li>
                     ))
                  ) : (
                     <li className="common-error-message">{error}</li>
                  )}
               </ul>
            )}
         </form>
      </div>
   );
}
