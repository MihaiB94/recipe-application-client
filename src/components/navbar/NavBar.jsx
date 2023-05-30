import { useMemo, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import './navbar.css';
import { ReactComponent as ReactLogo } from './logo.svg';
import { useContext } from 'react';
import { ContextAPI } from '../../contextAPI/ContextAPI';
import { useState } from 'react';

export default function NavBar(props) {
   const navigate = useNavigate();
   const { user, dispatch } = useContext(ContextAPI);
   const [q, setQ] = useState('');
   const inputRef = useRef(null);
   const location = useLocation();
   const navRef = useRef(null);

   useEffect(
      (location) => {
         inputRef.current.value = '';
         return () => {
            setQ('');
         };
      },
      [location]
   );

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
   }, []);

   const openNav = useCallback(() => {
      navRef.current.classList.add('openNav');
      navRef.current.classList.remove('openSearch');
   }, []);

   const closeNav = useCallback(() => {
      navRef.current.classList.remove('openNav');
   }, []);

   const handleLogout = useCallback(() => {
      dispatch({ type: 'LOGOUT' });
   }, [dispatch]);

   const showDialog = useCallback(() => {
      document.getElementById('dialog').classList.add('show');
      const scrollY =
         document.documentElement.style.getPropertyValue('--scroll-y');
      const body = document.body;
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}`;
   }, []);

   const closeDialog = useCallback(() => {
      const body = document.body;
      const scrollY = body.style.top;
      body.style.position = '';
      body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      document.getElementById('dialog').classList.remove('show');
   }, []);

   const handleSearch = useCallback(() => {
      navigate(`/search?q=${q}`);
      setQ('');
      closeDialog();
   }, [q, navigate, closeDialog]);

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
               <i
                  id="show"
                  className="uil-search search-icon tooltip bottom"
                  onClick={showDialog}
               >
                  {' '}
                  <span className="tooltip-content">Search</span>
               </i>

               <div id="dialog">
                  <div className="search-input-container">
                     <i
                        className="fa-solid fa-magnifying-glass search-btn-modal"
                        onClick={(e) => {
                           handleSearch();
                        }}
                        title="Search"
                     ></i>

                     <span
                        className="closebtn"
                        onClick={closeDialog}
                        title="Close"
                     >
                        x
                     </span>

                     <input
                        className="search-input-modal"
                        ref={inputRef}
                        onChange={(e) => setQ(e.target.value)}
                        onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                              handleSearch();
                           }
                        }}
                        type="text"
                        placeholder="Type to Search..."
                     />
                  </div>
               </div>

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
