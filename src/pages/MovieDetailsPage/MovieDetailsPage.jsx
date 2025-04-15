import React, { useEffect, useState, useRef } from "react";
import {
  useParams,
  useNavigate,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { fetchMovieDetails } from "../../tmdb";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setMovie(details);
      } catch {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.movieDetailsPage}>
      <button
        onClick={() => navigate(backLinkRef.current)}
        className={styles.goBackButton}
      >
        Go back
      </button>

      {movie && (
        <>
          <h1>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.moviePoster}
          />
          <p>{movie.overview}</p>

          <div className={styles.additionalInfo}>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link to="cast" state={{ from: backLinkRef.current }}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to="reviews" state={{ from: backLinkRef.current }}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <Outlet />
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
