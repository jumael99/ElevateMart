import AdminFooter from "@/components/Admin/Admin-Footer";
import AdminNavbar from "@/components/Admin/Admin-Nabvar";
import Sidebar from "@/components/Admin/Admin-Sidebar";
import React from "react";
import products from "@/static/products";

const store = () => {
    const editHandler = (p_name) => {
        console.log(p_name);
    };

    const deleteHandler = (p_name) => {
        console.log(p_name);
    };
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-10 text-black">
                <h1 className="text-2xl font-bold mb-6">Products Dashboard</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-800 text-white text-left">
                                <th className="py-3 px-4">Image</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Category</th>
                                <th className="py-3 px-4">Stock</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) =>
                                product.countInStock > 0 ? (
                                    <tr
                                        key={product.id}
                                        className="border-t border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-3 px-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-16 w-16 object-cover rounded-full"
                                            />
                                        </td>
                                        <td className="py-3 px-4">{product.name}</td>
                                        <td className="py-3 px-4">{product.category}</td>
                                        <td className="py-3 px-4">{product.countInStock}</td>
                                        <td className="py-3 px-4 flex space-x-2">
                                            <button
                                                type="button"
                                                className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                                                onClick={() => editHandler(product.name)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                                                onClick={() => deleteHandler(product.name)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={product.id} className="border-t bg-red-200">
                                        <td className="py-3 px-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-16 w-16 object-cover rounded-full"
                                            />
                                        </td>
                                        <td className="py-3 px-4">{product.name}</td>
                                        <td className="py-3 px-4">{product.category}</td>
                                        <td className="py-3 px-4">{product.countInStock}</td>
                                        <td className="py-3 px-4 flex space-x-2">
                                            <button
                                                type="button"
                                                className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                                                onClick={() => editHandler(product.name)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                                                onClick={() => deleteHandler(product.name)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default store;
