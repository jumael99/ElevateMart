import Filter from "@/components/Filter";
import ProductCard from "@/components/ProductCard";
import products from "@/static/products";
import React, { useState } from "react";

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage  = 8;
    const showProducts = products.slice(0,25);

    const lastProduct = currentPage * productsPerPage;
    const firstProduct = lastProduct - productsPerPage;
    const perPageProducts = showProducts.slice(firstProduct, lastProduct);

    const totalPages = Math.ceil(showProducts.length / productsPerPage);

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <>
            <div className="w-[100%] mx-auto text-center py-10">
                <div className="text-black">
                    <h1 className="text-3xl font-semibold">Your Desired Products</h1>
                    <p className="text-lg p-3">Fulfilling Wishes, Delivering Quality</p>
                </div>
            </div>
            <div className="w-[80%] h-min-screen mx-auto text-center">
                <Filter />
                <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-2 lg:grid-cols-3 xl:gap-[50px] w-full my-16">
                    {perPageProducts &&
                        perPageProducts.map((product) => (
                            <ProductCard productData={product} key={product._id} />
                        ))}
                </div>
            </div>

            <div className="mt-12 flex justify-center items-center space-x-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    <span className="mr-1"></span> Previous
                </button>

                <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
                    <span className="text-blue-800 font-bold mr-2">Page</span>
                    <span className="bg-blue-100 text-blue-800 font-bold rounded-full px-3 py-1">
                        {currentPage}
                    </span>
                    <span className="text-gray-600 mx-2">of</span>
                    <span className="bg-gray-100 text-gray-800 font-bold rounded-full px-3 py-1">
                        {totalPages}
                    </span>
                </div>

                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Next <span className="ml-1"></span>
                </button>
            </div>
        </>
    );
};

export default Products;
