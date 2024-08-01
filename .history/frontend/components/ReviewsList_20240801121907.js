import React, { useState } from 'react';
import { useGetReviewsQuery, useDeleteReviewMutation, useUpdateReviewMutation } from '../store/slices/api/reviewApiSlice';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { FaStar, FaRegStar } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const ReviewsList = ({ productId }) => {
  const { data: reviews, error, isLoading } = useGetReviewsQuery(productId);
  const [deleteReview] = useDeleteReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({ rating: '', comment: '' });
  const [visibleReviews, setVisibleReviews] = useState(2);
  const user = useSelector((state) => state.user.user);

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId).unwrap();
        toast.success('Review deleted successfully');
      } catch (error) {
        toast.error('Failed to delete review');
      }
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review._id);
    setEditForm({ rating: review.rating, comment: review.comment });
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setEditForm({ rating: '', comment: '' });
  };

  const handleSaveEdit = async (reviewId) => {
    try {
      await updateReview({ id: reviewId, ...editForm }).unwrap();
      setEditingReview(null);
      toast.success('Review updated successfully');
    } catch (error) {
      console.error('Failed to update review:', error);
      toast.error('Failed to update review');
    }
  };

  const handleShowMore = () => {
    setVisibleReviews((prev) => prev + 2);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  return (
    <div className="text-black w-[100%] mx-auto text-left py-10">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      {reviews && reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews && reviews.slice(0, visibleReviews).map((review) => (
          <div key={review._id} className="mb-4 border-b pb-4">
            {editingReview === review._id ? (
              <div>
                <h3 className="text-lg font-semibold">{review.user.name}</h3>
                <input
                  type="number"
                  value={editForm.rating}
                  onChange={(e) => setEditForm({ ...editForm, rating: e.target.value })}
                  className="border p-1 mb-2 w-full"
                  min="1"
                  max="5"
                />
                <textarea
                  value={editForm.comment}
                  onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                  className="border p-1 mb-2 w-full"
                />
                <button onClick={() => handleSaveEdit(review._id)} className="text-blue-600 mr-2">Save</button>
                <button onClick={handleCancelEdit} className="text-gray-600">Cancel</button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold">{review.user.name}</h3>
                <div className="text-yellow-500 flex">
                  {renderStars(review.rating)}
                </div>
                <p>{review.comment}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                {user && user._id === review.user._id && (
                  <div className="mt-2">
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="text-red-600 mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(review)}
                      className="text-blue-600 mr-2"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
      {reviews && visibleReviews < reviews.length && (
        <button
          onClick={handleShowMore}
          className="mt-1 bg-blue-500 text-white py-2 px-3 rounded"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default ReviewsList;
