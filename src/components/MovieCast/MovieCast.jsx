import styles from './MovieCast.module.css';

const MovieCast = ({ cast }) => {
  return (
    <div className={styles.cast}>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id} className={styles.actor}>
            <img 
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} 
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