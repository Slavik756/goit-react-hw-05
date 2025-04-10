import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits, fetchMovieReviews } from '../../tmdb';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const details = await fetchMovieDetails(movieId);
        setMovie(details);
        const credits = await fetchMovieCredits(movieId);
        setCast(credits);
        const movieReviews = await fetchMovieReviews(movieId);
        setReviews(movieReviews);
      } catch {
        setError('Failed to fetch movie data.');
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(-1); 
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className={styles.movieDetailsPage}>
      {movie && (
        <>
          <button onClick={handleGoBack} className={styles.goBackButton}>Go back</button>
          <h1>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.moviePoster}
          />
          <p>{movie.overview}</p>

          <h2>Cast</h2>
          <MovieCast cast={cast} />

          <h2>Reviews</h2>
          <MovieReviews reviews={reviews} />
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
