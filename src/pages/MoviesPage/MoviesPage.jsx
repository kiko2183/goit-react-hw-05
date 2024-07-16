import React, { useState, useEffect } from 'react';
import { searchMovies } from '../../api/tmdb';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query) {
      searchMovies(query).then(setMovies);
    }
  }, [query]);

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} placeholder="Search movies..." />
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
