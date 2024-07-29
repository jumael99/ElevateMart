// components/ReviewsList.js
import React from 'react';
import { useGetReviewsQuery } from '../store/slices/api/reviewApiSlice';

const ReviewsList = ({ productId }) => {
  const { data: reviews, error, isLoading } = useGetReviewsQuery(productId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="mb-4">
            <h3 className="text-lg font-semibold">{review.user.name}</h3>
            <p className="text-gray-600">Rating: {review.rating} Star{review.rating > 1 ? 's' : ''}</p>
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsList;
