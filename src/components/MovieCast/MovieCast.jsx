import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../tmdb';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const credits = await fetchMovieCredits(movieId);
        setCast(credits);
      } catch {
        setCast([]);
      }
    };
    fetchCast();
  }, [movieId]);

  if (cast.length === 0) return <p>No cast information available.</p>;

  return (
    <div className={styles.cast}>
      <ul>
        {cast.map(actor => (
          <li key={actor.id} className={styles.actor}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className={styles.image}
            />
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
