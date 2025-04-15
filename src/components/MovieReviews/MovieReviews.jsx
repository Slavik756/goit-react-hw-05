import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../tmdb';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await fetchMovieReviews(movieId);
        setReviews(fetchedReviews);
      } catch {
        setReviews([]);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <div className={styles.reviews}>
      <ul>
        {reviews.map(review => (
          <li key={review.id} className={styles.review}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
