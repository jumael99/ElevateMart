// frontend/components/ProductDetails.js

import React from "react";
// import products from "@/static/products";  

const ProductDetails = ({ productId }) => {
  const product = products.find((p) => p._id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>; // Handle case where product is not found
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative h-96">
          <img
            src={product.image}
            alt="Product"
            className="absolute inset-0 w-full h-full object-fill"
          />
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            {product.name}
          </h1>
          <div className="flex items-center mb-4">
            {/* Star rating or other product metadata */}
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
              In stock {product.countInStock}
            </span>
          </div>

          <div className="flex items-center justify-center">
            <button className="w-[40%]  bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
