import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../api/tmdb';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const previousLocation = useRef(location.state?.from);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return null;

  return (
    <div>
      <button>
        <Link to={previousLocation.current || '/'}>Go back</Link>
      </button>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
      <p>User Score: {movie.vote_average}</p>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
