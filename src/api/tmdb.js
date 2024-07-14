import axios from 'axios';
import { API_TOKEN } from '../config';

const BASE_URL = 'https://api.themoviedb.org/3';

const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
    headers: {
      Authorization: API_TOKEN,
    },
  });
  return response.data.results;
};

const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      query,
    },
    headers: {
      Authorization: API_TOKEN,
    },
  });
  return response.data.results;
};

const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    headers: {
      Authorization: API_TOKEN,
    },
  });
  return response.data;
};

const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    headers: {
      Authorization: API_TOKEN,
    },
  });
  return response.data.cast;
};

const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    headers: {
      Authorization: API_TOKEN,
    },
  });
  return response.data.results;
};

export { fetchTrendingMovies, searchMovies, fetchMovieDetails, fetchMovieCredits, fetchMovieReviews };
