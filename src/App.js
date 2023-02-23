import React, { useContext } from 'react';

import NavBar from './components/navbar/NavBar';
import Home from './pages/home/Index';
import RecipePage from './pages/recipePage/RecipePage';
import AddRecipe from './pages/addRecipe/AddRecipe';
import UserProfile from './pages/userProfile/UserProfile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ContextAPI } from './contextAPI/ContextAPI';
import Search from './pages/Search';
import './colorPalette.css';
import Favorites from './pages/favorites/Favorites';

function App() {
   const { user } = useContext(ContextAPI);
   return (
      <Router>
         <NavBar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={user ? <Home /> : <Register />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route
               path="/userProfile"
               element={user ? <UserProfile /> : <Register />}
            />
            <Route
               path="/addRecipe"
               element={user ? <AddRecipe /> : <Register />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/favorites" element={<Favorites />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/recipes/:recipeId" element={<RecipePage />} />
            <Route path="/search" element={<Search />} />
         </Routes>
         <Footer />
      </Router>
   );
}

export default App;
