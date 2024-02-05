import React from 'react';

export const DisplayMovie = ( {currentMovies} ) => {
  return (
    <>
      <div>    
      <div className='container'>
        <div className="row">
            {currentMovies.length > 0 ? currentMovies.map((movie) => (
                <div key={movie.imdbId} className="col-md-3 p-4">
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
            )) : <div style={{minWidth: "1300px"}}> <p className="text-center text-dark bg-info p-5">No Results Found</p> </div>}
        </div>
      </div>
      
    </div>
  </>
  );
};
