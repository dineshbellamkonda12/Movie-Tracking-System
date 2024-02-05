import React from 'react';

export const GenreFilter = ( {initialMovies, updateMovies, updateGenreFilter, updateCurrentPage, genreFilter, searchText} ) => {

  //Function to Filter the Genres
  const handleGenreChange = (event) => {
    updateCurrentPage(1);
    const selectedGenre = event.target.value;
    updateGenreFilter(selectedGenre);

    let filteredMovies = initialMovies;

    if (selectedGenre) {
      filteredMovies = initialMovies.filter((movie) =>
        movie.Genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    } else {
      filteredMovies = initialMovies;
    }

    if (searchText) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    updateMovies(filteredMovies);
  };

  return (
    <div>
        <div className='row mb-3 justify-content-center'>
          <div className="col-md-6 col-lg-4">
              <select
                  className="form-select text-center"
                  onChange={handleGenreChange}
                  value={genreFilter}
              >
                  <option value="">All Genres</option>
                  <option value="Animation">Animation</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Action">Action</option>
                  <option value="Family">Family</option>
              </select>
          </div>
      </div>
    </div>
  )
}
