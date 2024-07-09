import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Admin/Admin-Sidebar';
import axios from 'axios';

const Products = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productSlug: '',
    productPrice: '',
    productDescription: '',
    productImage: null,
    productImagePreview: '',
    productQuantity: '',
    productDiscount: '',
    productDiscountValidTime: '',
    categoryId: '',
    subCategoryId: ''
  });

  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');  
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get('/api/subcategories'); 
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');  
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      productImage: file,
      productImagePreview: URL.createObjectURL(file)
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.productName) tempErrors.productName = 'Product Name is required';
    if (!formData.productPrice) tempErrors.productPrice = 'Product Price is required';
    if (!formData.productDescription) tempErrors.productDescription = 'Product Description is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }

        if (isEditing) {
          await axios.put(`/api/products/${currentProductId}`, formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });  
        } else {
          await axios.post('/api/products', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }); 
        }
        fetchProducts();
        resetForm();
      } catch (error) {
        console.error('Error saving product:', error);
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      productName: product.name,
      productSlug: product.slug,
      productPrice: product.price,
      productDescription: product.description,
      productImage: null,
      productImagePreview: product.image,
      productQuantity: product.quantity,
      productDiscount: product.discount,
      productDiscountValidTime: product.discountValidTime,
      categoryId: product.categoryId,
      subCategoryId: product.subCategoryId
    });
    setIsEditing(true);
    setCurrentProductId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);  
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      productName: '',
      productSlug: '',
      productPrice: '',
      productDescription: '',
      productImage: null,
      productImagePreview: '',
      productQuantity: '',
      productDiscount: '',
      productDiscountValidTime: '',
      categoryId: '',
      subCategoryId: ''
    });
    setErrors({});
    setIsEditing(false);
    setCurrentProductId(null);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 text-black">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                  Product Name
                </label>
                <input
                  id="productName"
                  name="productName"
                  type="text"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.productName && <p className="text-red-500 text-xs italic">{errors.productName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
                  Product Price
                </label>
                <input
                  id="productPrice"
                  name="productPrice"
                  type="number"
                  value={formData.productPrice}
                  onChange={handleChange}
                  placeholder="Enter product price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.productPrice && <p className="text-red-500 text-xs italic">{errors.productPrice}</p>}
              </div>
             
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productQuantity">
                  Product Quantity
                </label>
                <input
                  id="productQuantity"
                  name="productQuantity"
                  type="number"
                  value={formData.productQuantity}
                  onChange={handleChange}
                  placeholder="Enter product quantity"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDiscount">
                  Product Discount
                </label>
                <input
                  id="productDiscount"
                  name="productDiscount"
                  type="number"
                  value={formData.productDiscount}
                  onChange={handleChange}
                  placeholder="Enter product discount"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDiscountValidTime">
                  Discount Valid Time
                </label>
                <input
                  id="productDiscountValidTime"
                  name="productDiscountValidTime"
                  type="datetime-local"
                  value={formData.productDiscountValidTime}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryId">
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subCategoryId">
                  Sub-Category
                </label>
                <select
                  id="subCategoryId"
                  name="subCategoryId"
                  value={formData.subCategoryId}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Sub-Category</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
            
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productImage">
                  Product Image
                </label>
                <input
                  id="productImage"
                  name="productImage"
                  type="file"
                  onChange={handleImageChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.productImage && <p className="text-red-500 text-xs italic">{errors.productImage}</p>}
                {formData.productImagePreview && (
                  <img src={formData.productImagePreview} alt="Product Preview" className="mt-4 w-32 h-32 object-cover" />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">
                  Product Description
                </label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.productDescription && <p className="text-red-500 text-xs italic">{errors.productDescription}</p>}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isEditing ? 'Update Product' : 'Add Product'}
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
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">Name</th>
                <th className="py-2 px-4 border-b border-gray-200">Price</th>
                <th className="py-2 px-4 border-b border-gray-200">Category</th>
                <th className="py-2 px-4 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border-b border-gray-200">{product.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{product.price}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{product.categoryId?.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
