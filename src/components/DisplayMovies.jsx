import React, { useState, useEffect } from 'react';

export const DisplayMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [initialMovies, setInitialMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(12); // Change the number of movies per page here

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('movies.json');
        const data = await response.json();
        setMovies(data);
        setInitialMovies(data); // Save initial movies for reset
      } catch (error) {
        console.error('Error Fetching data:', error);
      }
    }

    fetchData();
  }, []);

  function searchMovies() {
      setCurrentPage(1);
      let filteredMovies = initialMovies.filter((movie) => {
          // Ensure movie.Title is a string and not undefined
          if (typeof movie.Title === 'string' && typeof searchText === 'string') {
              return movie.Title.toLowerCase().includes(searchText.toLowerCase());
          } else {
              return false; // Exclude this movie from the filtered results
          }
      });

      if (genreFilter) {
        filteredMovies = filteredMovies.filter((movie) =>
            movie.Genre.toLowerCase().includes(genreFilter.toLowerCase())
        );
      }

      setMovies(filteredMovies);
  }



  const handleGenreChange = (event) => {
    setCurrentPage(1);
    const selectedGenre = event.target.value;
    setGenreFilter(selectedGenre);

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

    setMovies(filteredMovies);
  };

  function resetMovies() {
    setSearchText('');
    setGenreFilter('');
    setMovies(initialMovies);
  }

  // Pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className='m-3 p-5 d-flex flex-column align-items-center'>
      <h1 className="text-center mb-5">Movie Tracking System</h1>
      <div className="row mb-3 w-50">
          <div className="col">
              <input
                  type="text"
                  className="form-control text-center"
                  placeholder="Search Movies"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    searchMovies();
                  }}
              />
          </div>
      </div>

      <div className='row mb-3 w-50'>
          <div className="col">
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

      <div className='row mb-5'>
          <div className="col d-flex justify-content-center">
              <button className="btn btn-secondary" onClick={resetMovies}>Reset</button>
          </div>
      </div>
      
      <nav className="pagination-nav d-flex justify-content-center">
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
              if (index < 10 && currentPage <= 7) {
                return (
                  <li key={index} className='page-item'>
                    <button onClick={() => paginate(index + 1)} className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}>
                      {index + 1}
                    </button>
                  </li>
                );
              } else if (index >= currentPage - 4 && index <= currentPage + 5) {
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

      <div className='container'>
        <div className="row mb-5">
            {currentMovies.map((movie) => (
                <div key={movie.imdbId} className="col-md-3 mb-4 p-4">
                    <div className="card h-100">
                        <img
                            src={movie.Poster}
                            className="card-img-top img-fluid"
                            alt={movie.Title}
                            style={{ objectFit: 'cover', height: '300px' }}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{movie.Title}</h5>
                            <p className="card-text">IMDB Score: {movie['IMDB Score']}</p>
                            <p className="card-text">Genre: {movie.Genre}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <nav className="pagination-nav d-flex justify-content-center">
          <ul className='pagination'>
            {currentPage !== 1 && (
              <li className='page-item'>
                <button onClick={() => paginate(1)} className='page-link'>
                  Scroll to First Page
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
              if (index < 10 && currentPage <= 7) {
                return (
                  <li key={index} className='page-item'>
                    <button onClick={() => paginate(index + 1)} className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}>
                      {index + 1}
                    </button>
                  </li>
                );
              } else if (index >= currentPage - 4 && index <= currentPage + 5) {
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
                  Last Page
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
      
    </div>
  </>
  );
};
