// pages/ProductPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import ReviewForm from '../components/ReviewForm';
import ReviewsList from '../components/ReviewsList';

const ProductPage = () => {
  const { productId } = useParams();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold mb-4">Product Details</h1>
      <ProductDetails/>
      {/* <div className='text-black'>jkahfa</div> */}
      <ReviewForm productId={productId} />
      <ReviewsList productId={productId} />
    </div>
  );
};

export default ProductPage;
