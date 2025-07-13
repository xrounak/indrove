import React, { useState } from 'react';
import styles from './FeedbackForm.module.css';

export default function FeedbackForm({ onSubmit, onCancel }) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit(rating, message);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`${styles.star} ${i <= rating ? styles.starActive : ''}`}
          onClick={() => setRating(i)}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Rate this freelancer</h4>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.ratingSection}>
          <label className={styles.label}>Rating</label>
          <div className={styles.starsContainer}>
            {renderStars()}
            <span className={styles.ratingText}>
              {rating > 0 ? `${rating} out of 5 stars` : 'Click to rate'}
            </span>
          </div>
        </div>
        
        <div className={styles.messageSection}>
          <label htmlFor="message" className={styles.label}>
            Review Message (Optional)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your experience with this freelancer..."
            className={styles.textarea}
            rows={4}
          />
        </div>
        
        <div className={styles.actions}>
          <button 
            type="button" 
            onClick={onCancel}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={rating === 0}
            className={styles.submitBtn}
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
} 