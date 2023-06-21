import { useCallback } from 'react';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './simpleSearchBar.css';

const SimpleSearchBar = () => {
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
      <div class="simple-search-bar">
         <input
            className="search-input"
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
         <button class="search-btn">
            <i
               class="fas fa-search"
               onClick={(e) => {
                  handleSearch();
               }}
               title="Search"
            ></i>
         </button>
      </div>
   );
};

export default SimpleSearchBar;
