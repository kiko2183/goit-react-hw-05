import React, { useEffect, useState } from 'react';
import { useParams, Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/tmdb';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location?.state?.from ?? '/');
  };

  if (!movie) return null;

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.button}>Go back</button>
      <div className={styles.details}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className={styles.image} />
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p><strong>User Score:</strong> {movie.vote_average}</p>
          <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <div className={styles.links}>
        <Link to="cast" className={styles.link}>Cast</Link>
        <Link to="reviews" className={styles.link}>Reviews</Link>
      </div>
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;