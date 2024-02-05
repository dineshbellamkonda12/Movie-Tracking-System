import React from 'react'

export const ResetButton = ( {initialMovies, updateMovies, updateSearchText, updateGenreFilter} ) => {

//Function to reset Searched results and Genre Filters
function resetMovies() {
    updateSearchText('');
    updateGenreFilter('');
    updateMovies(initialMovies);
}

return (
    <div>
      <div className='row mb-5'>
        <div className="col d-flex justify-content-center">
            <button className="btn btn-secondary custom-btn" onClick={resetMovies}>Reset</button>
        </div>
      </div>
    </div>
  )
}
