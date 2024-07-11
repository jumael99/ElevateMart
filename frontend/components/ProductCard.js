import React from "react";
import Link from "next/link";

const ProductCard = (data) => {
    const { name, image, _id, price, countInStock } = data.productData;
    const productName = name.replace(/\s+/g, " ");

    return (
        <div className="w-[90%] mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
                <Link href={`/products/${productName}`} className="block">
                    <img
                        src={image}
                        alt={_id}
                        className="w-full h-64 object-full transition-transform duration-300 hover:scale-105"
                    />
                </Link>
                <div className="absolute top-0 right-0 bg-white px-2 py-1 m-2 rounded-full shadow-md">
                    <span className="text-sm font-bold text-gray-700">{countInStock} left</span>
                </div>
            </div>
            <div className="p-4">
                <Link href={`/products/${productName}`} className="block">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                        {name.length > 30 ? name.slice(0, 30) + "..." : name}
                    </h4>
                </Link>
                <div className="flex justify-between items-end mb-4">
                    <div className="text-2xl font-extrabold text-gray-800">
                        {price}
                        <span className="ml-1 text-sm">৳</span>
                    </div>
                    <div
                        className={`text-sm font-semibold ${
                            countInStock === 0
                                ? "text-red-500"
                                : countInStock < 10
                                ? "text-orange-500"
                                : "text-green-500"
                        }`}
                    >
                        {countInStock === 0
                            ? "Out of stock"
                            : countInStock < 10
                            ? "Low stock"
                            : "In stock"}
                    </div>
                </div>
                <button
                    className={`w-full py-2 px-4 rounded-full font-bold text-white transition-all duration-300 ${
                        countInStock === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-slate-700 hover:bg-slate-500 hover:shadow-lg"
                    }`}
                    disabled={countInStock === 0}
                >
                    {countInStock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;