//Search Bar Component
import React from 'react'
import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { GenreFilter } from './components/GenreFilter';
import { MoviePagination } from './components/MoviePagination';
import { ResetButton } from './components/ResetButton';
import { DisplayMovie } from './components/DisplayMovie';
import './App.css';

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(12); // Change the number of movies per page here
  const [genreFilter, setGenreFilter] = useState('');
  const [searchText, setSearchText] = useState('');

  //Fetching Data from JSON File in Public Folder
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

  //Call Back Functions
  const updateMovies = (newMovies) => {
    setMovies(newMovies);
  };

  const updateCurrentPage = (newPage) => {
    setCurrentPage(newPage);
  };

  const updateGenreFilter = (newFilter) => {
    setGenreFilter(newFilter);
  };

  const updateSearchText = (newText) => {
    setSearchText(newText);
  };

  //Pagination Variables
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div className='p-5 bg-white'>
      <h1 className="text-center mb-4">Movie Tracking System</h1>
      <SearchBar initialMovies = {initialMovies} updateMovies={updateMovies} updateCurrentPage= {updateCurrentPage} genreFilter={genreFilter} searchText={searchText} updateSearchText={updateSearchText} />
      <GenreFilter initialMovies = {initialMovies} updateMovies={updateMovies} updateGenreFilter={updateGenreFilter} updateCurrentPage= {updateCurrentPage} genreFilter={genreFilter} />
      <ResetButton initialMovies = {initialMovies} updateMovies={updateMovies} updateSearchText={updateSearchText} updateGenreFilter={updateGenreFilter} />
      <MoviePagination movies={movies} currentPage={currentPage} moviesPerPage={moviesPerPage} updateCurrentPage= {updateCurrentPage} />
      <DisplayMovie currentMovies={currentMovies} updateCurrentPage= {updateCurrentPage}/>
      <MoviePagination movies={movies} currentPage={currentPage} moviesPerPage={moviesPerPage} updateCurrentPage= {updateCurrentPage} />
    </div>
  )
}

export default App;
