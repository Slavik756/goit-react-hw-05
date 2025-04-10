import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWUzODBiMDAzMDA5YzQzODc4NzRiY2E1N2U0Y2U4NyIsIm5iZiI6MTc0NDIzODAzMC4yOTYsInN1YiI6IjY3ZjZmNWNlMWJjNjM5NTY2YWQ5NDJmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ucWu47uIBCYNyof29r1azwVL5PaqCMSuzEKQEtFtKM0';  // Замість цього вставте ваш API токен
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return res.data.results;
};

export const searchMovies = async (query) => {
  const res = await axios.get(`${BASE_URL}/search/movie?query=${query}`, options);
  return res.data.results;
};

export const fetchMovieDetails = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return res.data;
};

export const fetchMovieCredits = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
  return res.data.cast;
};

export const fetchMovieReviews = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
  return res.data.results;
};

export const getImageUrl = (path) => `${IMAGE_URL}${path}`;
