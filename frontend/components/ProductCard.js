import React from 'react'
import Link from "next/link";

const ProductCard = (data) => {
  const { name, image, _id, price, countInStock } = data.productData;
  const productName = name.replace(/\s+/g, " ");
  return (
      <div className="w-full h-[430px] bg-white rounded-lg shadow-md p-3  relative cursor-pointer text-black transition-all duration-300 ease-in hover:translate-y-1.5">
          <Link href={`/products/${productName}`}>
              <img src={image} alt={_id} className="w-full h-[200px] object-full" />
          </Link>
          <Link href={`/products/${productName}`}>
              <h4 className="py-3 font-semibold text-start">
                  <span className="hidden sm:inline">
                      {name.length > 30 ? name.slice(0, 30) + "..." : name}
                  </span>
                  <span className="inline sm:hidden ">{name}</span>
              </h4>
          </Link>
          <div className="flex justify-between items-center mt-2">
              <h4>
                  {price && countInStock > 0 ? (
                      <div className="font-semibold">
                          <span className="text-2xl">{price}</span>
                          <span className="text-3xl ml-1">৳</span>
                      </div>
                  ) : (
                      <div className="font-semibold text-red-600">
                          <del className="text-2xl">{price}</del>
                          <span className="text-3xl ml-1">৳</span>
                      </div>
                  )}
              </h4>
              <h4 className="px-2 text-xl">
                  {countInStock === 0 ? (
                      <span className="text-red-600 text-base font-semibold">Out of stock</span>
                  ) : countInStock < 10 ? (
                      <div>
                          <span className="text-red-600 text-base font-semibold pr-2">
                              Low Stock
                          </span>
                          <span className="text-xl font-semibold">{countInStock}</span>
                      </div>
                  ) : (
                      <div>
                          <span className="text-green-600 text-base font-semibold pr-2">
                              In Stock
                          </span>
                          <span className="text-xl font-semibold">{countInStock}</span>
                      </div>
                  )}
              </h4>
          </div>
          <div className="flex justify-end mt-4 sm:mt-6">
              <button
                  className="w-[30%] py-2 px-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors duration-300 disabled:bg-slate-300"
                  disabled={countInStock === 0}
              >
                  Add to Cart
              </button>
          </div>
      </div>
  );
}

export default ProductCard
