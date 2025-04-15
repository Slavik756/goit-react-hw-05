import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchValue = form.elements.search.value.trim();
    if (searchValue) {
      setSearchParams({ query: searchValue });
    }
  };

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await searchMovies(query);
        setMovies(result);
      } catch {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className={styles.moviesPage}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
