import React from 'react';

export const SearchBar = ( {initialMovies, updateMovies, updateCurrentPage, genreFilter, searchText, updateSearchText } ) => {

  function searchMovies() {
    updateCurrentPage(1);
    let filteredMovies = initialMovies.filter((movie) => {
        if (typeof movie.Title === 'string' && typeof searchText === 'string') {
            return movie.Title.toLowerCase().includes(searchText.toLowerCase());
        } else {
            return false;
        }
    });

    if (genreFilter) {
      filteredMovies = filteredMovies.filter((movie) =>
          movie.Genre.toLowerCase().includes(genreFilter.toLowerCase())
      );
    }

    updateMovies(filteredMovies);
}

  return (
    <div>
        <div className="row mb-3 w-auto">
          <div className="col">
              <input
                  type="text"
                  className="form-control text-center"
                  placeholder="Search Movies"
                  value={searchText}
                  onChange={(e) => {
                    updateSearchText(e.target.value);
                    searchMovies();
                  }}
              />
          </div>
      </div>
    </div>
  )
}
