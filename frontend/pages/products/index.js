import Filter from "@/components/Filter";
import ProductCard from "@/components/ProductCard";
import products from "@/static/products";
import React from "react";

const Products = () => {
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
                    {products &&
                        products.map((product) => (
                            <ProductCard productData={product} key={product._id} />
                        ))}
                </div>
                
            </div>
        </>
    );
};

export default Products;
