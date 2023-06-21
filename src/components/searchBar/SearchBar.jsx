import { useCallback } from 'react';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBar.css';

const SearchBar = () => {
   const navigate = useNavigate();
   const [q, setQ] = useState('');
   const inputRef = useRef(null);

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

   return (
      <div className="search-input">
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

               <span className="closebtn" onClick={closeDialog} title="Close">
                  x
               </span>

               <input
                  className="search-input-modal"
                  ref={inputRef}
                  value={q}
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
      </div>
   );
};

export default SearchBar;
