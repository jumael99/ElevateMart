import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Admin/Admin-Sidebar";
import dynamic from "next/dynamic";
import { useUploadProductImageMutation } from "@/store/slices/api/uploadsApiSlice";
import {
  useCreateNewProductMutation,
  useFetchAllProductsQuery,
  useUpdateProductByIdMutation,
  useDeleteProductMutation,
} from "@/store/slices/api/productApiSlice";
import { useFetchAllCategoriesQuery } from "@/store/slices/api/categoryApiSlice";
import { toastManager } from "@/utils/toastManager";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { withAuth } from "@/utils/withAuth";
import { useFetchAllSubCategoriesQuery } from "@/store/slices/api/subcategoryApiSlice";

const Products = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    image: null,
    imagePreview: "",
    quantity: "",
    discount: "",
    discountValidTime: "",
    categoryId: "",
    subCategoryId: "",
  });

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createNewProduct] = useCreateNewProductMutation();
  const { data: productsData } = useFetchAllProductsQuery();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  // const [currentProductId, setCurrentProductId] = useState(null);
  const { data: categoriesData } = useFetchAllCategoriesQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const { data: subCategoriesData } = useFetchAllSubCategoriesQuery();
  const [updateProduct] = useUpdateProductByIdMutation();

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
    if (productsData) {
      setProducts(productsData);
    }
    if (subCategoriesData) {
      setSubCategories(subCategoriesData);
    }
  }, [categoriesData, productsData, subCategoriesData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      price: "",
      description: "",
      image: null,
      imagePreview: "",
      quantity: "",
      discount: "",
      discountValidTime: "",
      categoryId: "",
      subCategoryId: "",
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastID = toastManager.loading("Please wait...");
    try {
      const imageForm = new FormData();
      if (formData.image && formData.image instanceof File) {
        imageForm.append("image", formData.image);
        const data = await uploadProductImage(imageForm).unwrap();
        imageForm.append("imageURL", data.image);
      }

      const productData = {
        id: isEditing ? formData.id : undefined,
        name: formData.name,
        price: formData.price,
        description: formData.description,
        image: imageForm.get("imageURL") || formData.image,
        quantity: formData.quantity,
        discount: formData.discount,
        discountValidTime: formData.discountValidTime,
        categoryId: formData.categoryId,
        subCategoryId: formData.subCategoryId,
      };

      if (!isEditing) {
        await createNewProduct(productData).unwrap();
        toastManager.updateStatus(toastID, {
          render: "Product created successfully",
          type: "success",
        });
      } else {
        await updateProduct(productData).unwrap();
        toastManager.updateStatus(toastID, {
          render: "Product updated successfully",
          type: "success",
        });
      }
    } catch (error) {
      toastManager.updateStatus(toastID, {
        render: error?.data?.message || "Error. Something went wrong!",
        type: "error",
      });
    } finally {
      resetForm();
    }
  };

  const handleEdit = (product) => {
    setFormData({
      id: product._id,
      name: product?.name,
      price: product?.price,
      description: product?.description,
      image: product?.image,
      imagePreview: product?.image,
      quantity: product?.quantity,
      discount: product?.discount,
      discountValidTime: new Date(product.discountValidTime)
        .toISOString()
        .slice(0, 16),
      categoryId: product?.category?._id,
      subCategoryId: product?.subCategory?._id,
    });
    setIsEditing(true);
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
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2
            className={`text-xl font-semibold mb-4 ${
              isEditing ? "text-blue-500" : "text-green-500"
            }`}
          >
            <span className={`border-b-2 border-green pb-1`}>
              {isEditing ? "Edit Product" : "Add Product"}
            </span>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Product Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter product price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="quantity"
                >
                  Product Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter product quantity"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="discount"
                >
                  Product Discount
                </label>
                <input
                  id="discount"
                  name="discount"
                  type="number"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="Enter product discount"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="discountValidTime"
                >
                  Discount Valid Time
                </label>
                <input
                  id="discountValidTime"
                  name="discountValidTime"
                  type="datetime-local"
                  value={formData.discountValidTime}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="categoryId"
                >
                  Category
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="subCategoryId"
                >
                  Sub Category
                </label>
                <select
                  id="subCategoryId"
                  name="subCategoryId"
                  value={formData.subCategoryId}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Sub Category</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Product Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formData.imagePreview && (
                  <img
                    src={formData.imagePreview}
                    alt="Product Preview"
                    className="h-32 w-32 object-cover mt-2"
                  />
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Product Description
                </label>
                <ReactQuill
                  id="description"
                  value={formData.description}
                  onChange={(value) =>
                    setFormData({ ...formData, description: value })
                  }
                  placeholder="Enter product description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`bg-${isEditing ? "blue" : "green"}-500 hover:bg-${
                  isEditing ? "blue" : "green"
                }-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              >
                {isEditing ? "Update Product" : "Add Product"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Image</th>
                <th className="py-2">Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td className="py-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 object-cover"
                      />
                    </td>
                    <td className="py-2">{product.name}</td>
                    <td className="py-2">{product.price}</td>
                    <td className="py-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-2 text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Products, { requireLogin: true, requireAdmin: true });
