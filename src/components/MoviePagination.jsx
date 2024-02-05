import React from 'react';

export const MoviePagination = ( {movies, currentPage, moviesPerPage, updateCurrentPage} ) => {

  const paginate = (pageNumber) => updateCurrentPage(pageNumber);

  //Pagination
  return (
    <div>
        <nav className="pagination-nav d-flex justify-content-center mt-1">
          <ul className='pagination'>
            {currentPage !== 1 && (
              <li className='page-item'>
                <button onClick={() => paginate(1)} className='page-link'>
                  First
                </button>
              </li>
            )}
            {currentPage !== 1 && (
              <li className='page-item'>
                <button onClick={() => paginate(currentPage - 1)} className='page-link'>
                  Previous
                </button>
              </li>
            )}
            {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }).map((_, index) => {
              if (index < 3 && currentPage <= 3) {
                return (
                  <li key={index} className='page-item'>
                    <button onClick={() => paginate(index + 1)} className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}>
                      {index + 1}
                    </button>
                  </li>
                );
              } else if (index >= currentPage - 3 && index <= currentPage + 5) {
                return (
                  <li key={index} className='page-item'>
                    <button onClick={() => paginate(index + 1)} className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}>
                      {index + 1}
                    </button>
                  </li>
                );
              } else if (index === Math.ceil(movies.length / moviesPerPage) - 1) {
                return (
                  <li key={index} className='page-item'>
                    <button onClick={() => paginate(index + 1)} className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}>
                      {index + 1}
                    </button>
                  </li>
                );
              }
              return null;
            })}
            {currentPage !== Math.ceil(movies.length / moviesPerPage) && (
              <li className='page-item'>
                <button onClick={() => paginate(currentPage + 1)} className='page-link'>
                  Next
                </button>
              </li>
            )}
            {currentPage !== Math.ceil(movies.length / moviesPerPage) && (
              <li className='page-item'>
                <button onClick={() => paginate(Math.ceil(movies.length / moviesPerPage))} className='page-link'>
                  Last
                </button>
              </li>
            )}
          </ul>
        </nav>
    </div>
  )
}
