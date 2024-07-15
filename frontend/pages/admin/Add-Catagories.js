import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Admin/Admin-Sidebar';  
import axios from 'axios';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

// Set the base URL for axios
axios.defaults.baseURL = 'http://localhost:5001/api';  

const Categories = () => {
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryDescription: ''
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

   const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      categoryDescription: value
    });
  };

   const validate = () => {
    let tempErrors = {};
    if (!formData.categoryName) tempErrors.categoryName = 'Category Name is required';
    if (!formData.categoryDescription) tempErrors.categoryDescription = 'Category Description is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const { categoryName, categoryDescription } = formData;
        const newCategory = { name: categoryName, description: categoryDescription };

        if (isEditing) {
           await axios.put(`/categories/${currentCategoryId}`, newCategory);
          console.log('Category updated:', newCategory);
        } else {
          // Add new category
          const response = await axios.post('/categories', newCategory);
          console.log('New category added:', response.data);
        }
        
        fetchCategories();  
        resetForm(); 
      } catch (error) {
        console.error('Error saving category:', error);
      }
    }
  };

   const handleEdit = (category) => {
    setFormData({
      categoryName: category.name,
      categoryDescription: category.description
    });
    setIsEditing(true);
    setCurrentCategoryId(category._id);
  };

   const handleDelete = async (id) => {
    try {
      await axios.delete(`/categories/${id}`);
      fetchCategories();  
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

   const resetForm = () => {
    setFormData({
      categoryName: '',
      categoryDescription: ''
    });
    setErrors({});
    setIsEditing(false);
    setCurrentCategoryId(null);
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Assuming Sidebar component is correctly implemented */}
      <div className="flex-1 p-10 text-black">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            <span className="text-green-500 border-b-2 border-black-500 pb-1">
              {isEditing ? 'Edit Category' : 'Add Category'}
            </span>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
                  Category Name
                </label>
                <input
                  id="categoryName"
                  name="categoryName"
                  type="text"
                  value={formData.categoryName}
                  onChange={handleChange}
                  placeholder="Enter category name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.categoryName && <p className="text-red-500 text-xs italic">{errors.categoryName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryDescription">
                  Category Description
                </label>
                <ReactQuill
                  value={formData.categoryDescription}
                  onChange={handleDescriptionChange}
                  placeholder="Enter category description"
                  className="bg-white mb-4"
                />
                {errors.categoryDescription && <p className="text-red-500 text-xs italic">{errors.categoryDescription}</p>}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isEditing ? 'Update Category' : 'Add Category'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            <span className="text-green-500 border-b-2 border-black-500 pb-1">
              Categories-List :
            </span>
          </h2>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{category.name}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" dangerouslySetInnerHTML={{ __html: category.description }}></td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleEdit(category)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
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

export default Categories;
