import React from 'react';
import { useGetReviewsQuery, useDeleteReviewMutation } from '../store/slices/api/reviewApiSlice';
import { useSelector } from 'react-redux';
import ReviewForm from './ReviewForm';

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewsList = ({ productId }) => {
  const { data: reviews, error, isLoading } = useGetReviewsQuery(productId);
  const [deleteReview] = useDeleteReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
      } catch (error) {
        console.error('Failed to delete review:', error);
      }
    }
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading reviews...</p>;
  if (error) return <p className="text-center text-red-600">Error loading reviews: {error.message}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Reviews</h2>
      {reviews && reviews.length === 0 ? (
        <p className="text-gray-600 italic">No reviews yet</p>
      ) : (
        reviews && reviews.map((review) => (
          <div key={review._id} className="mb-6 border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">{review.user.name}</h3>
              <p className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center mb-2">
              <StarRating rating={review.rating} />
              <span className="ml-2 text-gray-600">({review.rating})</span>
            </div>
            <p className="text-gray-700 mb-3">{review.comment}</p>
            {userInfo && userInfo._id === review.user._id && (
              <div className="flex items-center">
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-red-600 hover:text-red-800 transition duration-300 mr-4"
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