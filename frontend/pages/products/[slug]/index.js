import { useFetchProductBySlugQuery } from "@/store/slices/api/productApiSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import React from "react";
import ReviewsList from "@/components/ReviewsList";
import ReviewForm from "@/components/ReviewForm";
import { useCanReviewProductQuery } from "@/store/slices/api/reviewApiSlice";

const ProductDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: product, error, isLoading } = useFetchProductBySlugQuery(slug);
  const { data: canReview } = useCanReviewProductQuery(product?._id, {
    skip: !product || !userInfo,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const addToCartFunction = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative h-96">
          <img
            src={product.image || "/placeholder-image.jpg"}
            alt="Product"
            className="absolute inset-0 w-full h-full object-fill"
          />
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            {product.name}
          </h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {"★★★★☆".split("").map((star, index) => (
                <span key={index}>{star}</span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">{product.numReviews}</span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-700">
              ${product.price}
            </span>
          </div>

          <div className="mb-6">
            <span className="font-semibold text-gray-700">Availability:</span>
            <span className="ml-2 text-green-600">
              In stock {product.countInStock}{" "}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={addToCartFunction}
              className="w-[40%] bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
        <ReviewsList productId={product._id} />
        {userInfo && (
          <>
            <h3 className="text-xl font-bold mt-8 mb-4">Add Your Review</h3>
            <ReviewForm productId={product._id} />
          </>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;