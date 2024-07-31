import React, { useEffect, useState } from 'react';
import { useGetReviewsQuery, useDeleteReviewMutation } from '../store/slices/api/reviewApiSlice';
import { useSelector } from 'react-redux';
import ReviewForm from './ReviewForm';


const ReviewsList = ({ productId }) => {
  const { data: reviews, error, isLoading } = useGetReviewsQuery(productId);
  const [deleteReview] = useDeleteReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user.user);

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
      } catch (error) {
        console.error('Failed to delete review:', error);
      }
    }
  };

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  return (
    <div className="text-black max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      {reviews && reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews && reviews.map((review) => (
          <div key={review._id} className="mb-4 border-b pb-4">
            <h3 className="text-lg font-semibold">{review.user.name}</h3>
            <p className="text-gray-600">Rating: {review.rating} Star{review.rating > 1 ? 's' : ''}</p>
            <p>{review.comment}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
            {userInfo && user._id === review.user._id && (
              <div className="mt-2">
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-red-600 mr-2"
                >
                  Delete
                </button>
                <ReviewForm productId={productId} review={review} />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsList;

