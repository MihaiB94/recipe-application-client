import { useMemo, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import './navbar.css';
import { ReactComponent as ReactLogo } from './logo.svg';
import { useContext } from 'react';
import { ContextAPI } from '../../contextAPI/ContextAPI';
import { useState } from 'react';
import SearchBar from '../searchBar/SearchBar';

export default function NavBar(props) {
   const { user, dispatch } = useContext(ContextAPI);
   const navRef = useRef(null);

   const openNav = useCallback(() => {
      navRef.current.classList.add('openNav');
      navRef.current.classList.remove('openSearch');
   }, []);

   const closeNav = useCallback(() => {
      navRef.current.classList.remove('openNav');
   }, []);

   useEffect(() => {
      // Add event listener to the document to close the navbar when clicking outside of it
      const handleClickOutside = (event) => {
         if (navRef.current && !navRef.current.contains(event.target)) {
            closeNav();
         }
      };
      document.addEventListener('click', handleClickOutside);
      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   }, [closeNav]);

   const handleLogout = useCallback(() => {
      dispatch({ type: 'LOGOUT' });
   }, [dispatch]);

   // Memoize the navigation links so that they are not recomputed on every render
   const navLinks = useMemo(() => {
      return [
         {
            to: '/',
            label: 'Home'
         },
         // {
         //   to: '/about',
         //   label: 'About',
         // },
         {
            to: '/contact',
            label: 'Contact'
         },
         {
            to: '/addRecipe',
            label: 'Add recipe'
         },
         {
            to: '/favorites',
            label: 'Favorites'
         }
      ];
   }, []);

   return (
      <nav className="nav" ref={navRef}>
         <div className="nav-container">
            <i className="uil uil-bars navOpenBtn" onClick={openNav}></i>

            <Link className="logo-container" to="/">
               {' '}
               <ReactLogo className="logo"> </ReactLogo>
            </Link>

            <ul className="nav-links">
               <i
                  className="uil uil-times navCloseBtn closeIcon"
                  onClick={closeNav}
               ></i>

               {navLinks.map((link, index) => (
                  <li className="nav-link" key={index} onClick={closeNav}>
                     <Link to={link.to} className="navigation-link-a">
                        {link.label}
                     </Link>
                  </li>
               ))}

               <div className="user-icons">
                  {user ? (
                     <>
                        <div className="prof-pic">
                           <Link to="/userProfile">
                              <img
                                 className="profile-pic"
                                 src={user.profilePic}
                                 alt=""
                              />
                           </Link>
                        </div>

                        <div className="link-logout">
                           <li className="link logout" onClick={handleLogout}>
                              {user && ''}
                              <i className="fa-solid fa-right-from-bracket logout-icon">
                                 <span>Logout</span>
                              </i>
                           </li>
                        </div>
                     </>
                  ) : (
                     <>
                        <div className="reg-log">
                           <Link className="nav-link log-reg-link" to="/login">
                              Sign In
                           </Link>

                           <Link
                              className="nav-link log-reg-link"
                              to="/register"
                           >
                              Sign Up
                           </Link>
                        </div>
                     </>
                  )}
               </div>
            </ul>

            <div className="icons">
               <SearchBar />

               <div className="user-icons">
                  {user ? (
                     <>
                        <Link to="/userProfile">
                           <img
                              className="profile-pic"
                              src={user.profilePic}
                              alt=""
                           />
                        </Link>

                        <li className="link logout" onClick={handleLogout}>
                           {user && ''}
                           <i className="fa-solid fa-right-from-bracket logout-icon user-icon">
                              <span>Sign Out</span>
                           </i>
                        </li>
                     </>
                  ) : (
                     <>
                        <div className="reg-log">
                           <Link
                              className="reg-log-link login-link"
                              to="/login"
                           >
                              Sign In
                           </Link>

                           <Link
                              className="reg-log-link register-link"
                              to="/register"
                           >
                              Sign Up
                           </Link>
                        </div>
                     </>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
}
