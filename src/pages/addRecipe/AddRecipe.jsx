import { axiosInstance } from '../../config';
import React, { Component } from 'react';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { ContextAPI } from '../../contextAPI/ContextAPI';
import './addRecipe.css';
import TextareaAutosize from 'react-textarea-autosize';

export default function AddRecipe() {
   const [image_url, setImage_url] = useState('');
   const [title, setTitle] = useState('');
   const [categories, setCategories] = useState([]);

   const [cats, setCats] = useState([]);
   const [description, setDescription] = useState('');
   const [ingredients, setIngredients] = useState([]);
   const [preparation_steps, setPreparation_steps] = useState([]);
   const [file, setFile] = useState(null);
   const { user, dispatch } = useContext(ContextAPI);

   const IngLabel = document.getElementById('ing-label');
   const StepLabel = document.getElementById('step-label');

   useEffect(() => {
      const fetchCats = async () => {
         const res = await axiosInstance.get('/categories');
         setCats(res.data);
      };
      fetchCats();
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const newRecipe = {
         username: user.username,
         // image_url,
         title,
         categories,
         description,
         ingredients,
         preparation_steps,
         userId: user._id // add the user ID to the recipe object
      };

      if (file) {
         const data = new FormData();
         const filename = Date.now() + file.name;
         data.append('name', filename);
         data.append('file', file);
         newRecipe.image_url = filename;
         try {
            await axiosInstance.post('/upload', data);
         } catch (err) {}
      }

      try {
         const res = await axiosInstance.post('/recipes', newRecipe);
         window.location.replace('/recipes/' + res.data._id);
      } catch (error) {}
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
      <option key={index}>{cat.category_name}</option>
   ));
   // let options = cats.map((cat) => {
   //    console.log(cat);
   //    return cat;
   // });

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
                        console.log(e.target.files[0]);
                     }}
                  />
               </div>
            </div>

            {/* <div className="add-form-item up-inputs">
               <input
                  type="text"
                  placeholder=" "
                  className="add-form-input"
                  autoFocus={true}
                  onChange={(e) => setImage_url(e.target.value)}
                  required
               />
               <label className="add-form-label">Image URL address:</label>
            </div> */}

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

            <div id="editor" className="add-form-item ">
               <TextareaAutosize
                  className="add-form-input"
                  name="message"
                  minRows={5}
                  onChange={(e) => setDescription(e.target.value)}
                  required
               />
               <label className="add-form-label">Description:</label>
            </div>

            <div className="add-form-item ">
               <div className="select-cat">
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
                        key={index}
                        rows={4}
                        className="add-form-input steps-input"
                        onChange={(e) => handleChangeStep(e, index)}
                        value={step}
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
         </form>
      </div>
   );
}
