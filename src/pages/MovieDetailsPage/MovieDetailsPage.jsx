import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../../api/tmdb";
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const ref = useRef(location.state?.from || "/");

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.movieDetails}>
      <button>
        <Link to={ref.current}>Go back</Link>
      </button>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Genres: {movie.genres.map(genre => genre.name).join(", ")}</p>
      <p>User Score: {movie.vote_average}</p>
      <nav>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
