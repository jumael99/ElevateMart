import React, { useState, useEffect } from 'react';
import { useCreateReviewMutation, useUpdateReviewMutation } from '../store/slices/api/reviewApiSlice';
import { toast } from 'react-toastify';

const ReviewForm = ({ productId, review = null }) => {
  const [rating, setRating] = useState(review ? review.rating : 0);
  const [comment, setComment] = useState(review ? review.comment : '');
  const [createReview] = useCreateReviewMutation();
  const [updateReview] = useUpdateReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting review:', { productId, rating, comment });

    if (rating === 0 || comment.trim() === '') {
      toast.error('Please fill in both rating and comment');
      return;
    }

    try {
      if (review) {
        const result = await updateReview({ id: review._id, rating, comment });
        console.log('Update result:', result);
      } else {
        const result = await createReview({ productId, rating, comment });
        console.log('Create result:', result);
        onReviewSubmitted();
      }
      setRating(0);
      setComment('');
    } catch (error) {
      toast.error(review ? 'Failed to update review' : 'Failed to add review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">{review ? 'Edit Review' : 'Add a Review'}</h2>
      
      {/* Rating */}
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Rating</label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((r) => (
            <svg
              key={r}
              onClick={() => setRating(r)}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 cursor-pointer ${r <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 17l-5 3l1-5l-4-4l5-0.5L12 3l2 5.5L19 9l-4 4l1 5l-5-3z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Write your review here..."
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
      >
        {review ? 'Update Review' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
