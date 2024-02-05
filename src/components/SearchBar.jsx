import React from 'react';

export const SearchBar = ( {initialMovies, updateMovies, updateCurrentPage, genreFilter, searchText, updateSearchText } ) => {

  //Function filters the movies based on the search text
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
    <div className="container">
    <div className="row mb-3 justify-content-center">
        <div className="col-md-6 col-lg-4">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control rounded-pill text-center"
                    placeholder="Search Movies"
                    aria-label="Search Movies"
                    aria-describedby="search-button"
                    value={searchText}
                    onChange={(e) => {
                        updateSearchText(e.target.value);
                        searchMovies();
                    }}
                />
            </div>
        </div>
    </div>
</div>

  )
}
