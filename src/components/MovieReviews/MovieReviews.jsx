import styles from './MovieReviews.module.css';

const MovieReviews = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      <h2>Reviews</h2>
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
