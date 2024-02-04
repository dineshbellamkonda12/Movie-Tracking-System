import React from 'react'

export const ResetButton = ( {initialMovies, updateMovies, updateSearchText, updateGenreFilter} ) => {

function resetMovies() {
    updateSearchText('');
    updateGenreFilter('');
    updateMovies(initialMovies);
}

return (
    <div>
      <div className='row mb-5'>
        <div className="col d-flex justify-content-center">
            <button className="btn btn-secondary" onClick={resetMovies}>Reset</button>
        </div>
      </div>
    </div>
  )
}
