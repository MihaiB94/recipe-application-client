import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import './navbar.css';
import { ReactComponent as ReactLogo } from './logo.svg';
import { useContext } from 'react';
import { ContextAPI } from '../../contextAPI/ContextAPI';
import { useState } from 'react';

export default function NavBar() {
   const navigate = useNavigate();
   const { user, dispatch } = useContext(ContextAPI);
   const [q, setQ] = useState('');
   // const [expanded, setExpanded] = useState(false);
   const inputRef = useRef(null);
   const location = useLocation();

   const nav = useRef(null);
   // const searchIcon = useRef(null);

   // const toggleSearch = () => {
   //    nav.current.classList.toggle('openSearch');
   //    nav.current.classList.remove('openNav');
   //    if (nav.current.classList.contains('openSearch')) {
   //       return searchIcon.current.classList.replace('uil-search', 'uil-times');
   //    } else if (searchIcon.current) {
   //       searchIcon.current.classList.replace('uil-times', 'uil-search');
   //    }
   // };
   useEffect(() => {
      inputRef.current.value = '';
      return () => {
         setQ('');
      };
   }, [location]);

   const openNav = () => {
      nav.current.classList.add('openNav');
      nav.current.classList.remove('openSearch');
      // searchIcon.current.classList.replace('uil-times', 'uil-search');
   };

   const closeNav = () => {
      nav.current.classList.remove('openNav');
   };

   // Closing search bar when clicking outside the search bar
   // useEffect(() => {
   //    const handleClick = (event) => {
   //       setExpanded(false);
   //    };

   //    document.addEventListener("click", handleClick);

   //    return () => {
   //       document.removeEventListener("click", handleClick);
   //    };
   // }, []);

   const handleClickClear = () => {
      // 👇️ clear input value
      setQ('');
   };

   const handleLogout = () => {
      dispatch({ type: 'LOGOUT' });
   };

   // const openSearch = () => {
   //    document.getElementById('myOverlay').style.display = 'block';
   // };

   // const closeSearch = () => {
   //    document.getElementById('myOverlay').style.display = 'none';
   // };

   const showDialog = () => {
      document.getElementById('dialog').classList.add('show');
      const scrollY =
         document.documentElement.style.getPropertyValue('--scroll-y');
      const body = document.body;
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}`;
   };

   const closeDialog = () => {
      const body = document.body;
      const scrollY = body.style.top;
      body.style.position = '';
      body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      document.getElementById('dialog').classList.remove('show');
   };

   window.addEventListener('scroll', () => {
      document.documentElement.style.setProperty(
         '--scroll-y',
         `${window.scrollY}px`
      );
   });

   const input = document.querySelector('input');

   const checkEmptyInput = (e) => {
      if (input.value.length === 0) {
         e.stopPropagation();
         e.preventDefault();
      } else {
         navigate(`/search?q=${q}`);
         setQ('');
      }
   };

   return (
      <nav className="nav" ref={nav}>
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

               <li className="nav-link" onClick={closeNav}>
                  <Link to="/" className="navigation-link-a">
                     Home
                  </Link>
               </li>
               {/* <li className="nav-link" onClick={closeNav}>
                  <Link to="/about">About</Link>
               </li> */}
               <li className="nav-link" onClick={closeNav}>
                  <Link to="/contact" className="navigation-link-a">
                     Contact
                  </Link>
               </li>
               <li className="nav-link" onClick={closeNav}>
                  <Link to="/addRecipe" className="navigation-link-a">
                     Add recipe
                  </Link>
               </li>
               <li className="nav-link" onClick={closeNav}>
                  <Link to="/favorites" className="navigation-link-a">
                     Favorites
                  </Link>
               </li>

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
                           checkEmptyInput(e);

                           closeDialog();
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
                              navigate(`/search?q=${q}`);
                              setQ('');
                              closeDialog();
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
                        {/* <div className="bookmark">
                           <i className="fa-regular fa-bookmark bookmark-icon-empty user-icon"></i>
                           <i className="fa-solid fa-bookmark bookmark-icon-full user-icon"></i>
                        </div> */}

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
