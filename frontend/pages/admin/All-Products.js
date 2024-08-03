import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Admin/Admin-Sidebar";
import { useDeleteProductMutation, useFetchAllProductsQuery } from "@/store/slices/api/productApiSlice";
import { toastManager } from "@/utils/toastManager";
import "react-quill/dist/quill.snow.css";
import AddProduct from "./Add-Product";
import { withAuth } from "@/utils/withAuth";

const allProducts = () => {
    const { data: productsData } = useFetchAllProductsQuery();
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editProduct, setEditProduct] = useState();
     const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (productsData) {
            setProducts(productsData);
        }
    }, [productsData]);
    console.log(productsData);

    const handleEdit = (product) => {
        setEditProduct(product);
        setIsEditing(true);
    };

    const handleEditComplete = () => {
        setIsEditing(false);
        setEditProduct(null);
    };

    const handleDelete = async (id) => {
        const toastID = toastManager.loading("Please wait...");
        try {
            await deleteProduct(id).unwrap();
            toastManager.updateStatus(toastID, {
                render: "Product deleted successfully",
                type: "success",
            });
            resetForm();
        } catch (error) {
            toastManager.updateStatus(toastID, {
                render: error?.data?.message || "Error deleting product",
                type: "error",
            });
        }
    };
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-10 text-black">
                {!isEditing && (
                    <div className="container mx-auto px-4 py-8">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    Product List
                                </h2>
                            </div>
                            <div className="overflow-x-auto text-center">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-100">
                                        <tr className="text-center">
                                            <th className="py-3 px-4">Image</th>
                                            <th className="py-3 px-4">Name</th>
                                            <th className="py-3 px-4">Price</th>
                                            <th className="py-3 px-4 ">Stock</th>
                                            <th className="py-3 px-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.length > 0 ? (
                                            products.map((product) => (
                                                <tr
                                                    key={product._id}
                                                    className="border-b hover:bg-gray-50"
                                                >
                                                    <td className="py-4 px-4">
                                                        {console.log(product)}
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="h-16 w-16 object-cover rounded"
                                                        />
                                                    </td>
                                                    <td className="py-4 px-4">{product.name}</td>
                                                    <td className="py-4 px-4">
                                                        ${product.price.toFixed(2)}
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        {product.quantity}
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <button
                                                            onClick={() => handleEdit(product)}
                                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(product._id)
                                                            }
                                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className=" py-5 text-center text-gray-500"
                                                >
                                                    No products found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {isEditing && (
                    <AddProduct
                        editing={isEditing}
                        product={editProduct}
                        onEditComplete={handleEditComplete}
                    />
                )}
            </div>
        </div>
    );
};

//export default allProducts;
export default withAuth(allProducts, { requireLogin: true, requireAdmin: true });
