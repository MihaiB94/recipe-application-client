import React from 'react';
import './pagination.css';

const Pagination = ({
   totalRecipes,
   recipesPerPage,
   setCurrentPage,
   currentPage,
   nextPage,
   prevPage,

   totalPages
}) => {
   let pages = [];
   for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
      pages.push(i);
   }

   const getPageNumbers = () => {
      const pageNumbers = [];
      const maxVisiblePages = 5; // Number of pages to show, excluding the first and last pages

      if (totalPages <= maxVisiblePages) {
         // If total pages is less than or equal to the maxVisiblePages, show all page numbers
         pageNumbers.push(...pages);
      } else {
         const leftPageBound = Math.max(2, currentPage - 2);
         const rightPageBound = Math.min(currentPage + 2, totalPages - 1);

         pageNumbers.push(1); // Always show the first page

         if (leftPageBound > 2) {
            // If there are more than 2 pages between the first page and the current page, show ellipsis
            pageNumbers.push('...');
         }

         for (let i = leftPageBound; i <= rightPageBound; i++) {
            pageNumbers.push(i);
         }

         if (rightPageBound < totalPages - 1) {
            // If there are more than 2 pages between the last page and the current page, show ellipsis
            pageNumbers.push('...');
         }

         pageNumbers.push(totalPages); // Always show the last page
      }

      return pageNumbers;
   };

   return (
      <div className="pagination">
         <div className="pagination-container">
            <div className="row">
               <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
               >
                  First
               </button>
               <button onClick={prevPage} disabled={currentPage === 1}>
                  Previous
               </button>
            </div>

            <div className="row">
               {getPageNumbers().map((page, index) => {
                  return (
                     <button
                        key={index}
                        onClick={() =>
                           typeof page === 'number'
                              ? setCurrentPage(page)
                              : null
                        }
                        className={page === currentPage ? 'active' : ''}
                        disabled={typeof page !== 'number'}
                     >
                        {page}
                     </button>
                  );
               })}
            </div>

            <div className="row">
               <button onClick={nextPage} disabled={currentPage === totalPages}>
                  Next
               </button>
               <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
               >
                  Last
               </button>
            </div>
         </div>
      </div>
   );
};

export default Pagination;
