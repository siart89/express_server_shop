import React from 'react';
import { BookReadOnlyStars, ROStarWrapper } from './bookCardStyles';

const BookRating = () => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div>
      <ROStarWrapper>
        {stars.map((item) => (
          <BookReadOnlyStars key={item}>
            <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="icon" d="M13.5 0L16.5309 8.98278H26.3393L18.4042 14.5344L21.4351 23.5172L13.5 17.9656L5.5649 23.5172L8.59584 14.5344L0.660737 8.98278H10.4691L13.5 0Z" fill="rgba(209, 209, 209, 0.6)" />
            </svg>

          </BookReadOnlyStars>
        ))}
      </ROStarWrapper>
    </div>
  );
};

export default BookRating;
